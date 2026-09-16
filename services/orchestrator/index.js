import express from 'express';
import crypto from 'node:crypto';

const app = express();
app.use(express.json({ limit: '32kb' }));

const FOUNDER_PUBLIC_KEY = process.env.FOUNDER_PUBLIC_KEY;
const ROBOTICS_PROXY_URL = process.env.ROBOTICS_PROXY_URL;
let launchBlocked = false;

function decodeJwt(token) {
  const [h, p, s] = token.split('.');
  if (!h || !p || !s) throw new Error('malformed token');
  return { header: JSON.parse(Buffer.from(h, 'base64url').toString('utf8')), payload: JSON.parse(Buffer.from(p, 'base64url').toString('utf8')), input: `${h}.${p}`, signature: Buffer.from(s, 'base64url') };
}

function verifyFounderToken(token) {
  if (!FOUNDER_PUBLIC_KEY || !token) return false;
  try {
    const jwt = decodeJwt(token);
    if (jwt.header.alg !== 'RS256') return false;
    const valid = crypto.verify('RSA-SHA256', Buffer.from(jwt.input), FOUNDER_PUBLIC_KEY, jwt.signature);
    const now = Math.floor(Date.now() / 1000);
    return valid && jwt.payload.exp > now && (jwt.payload.scope === 'orchestrator:emergency_stop' || jwt.payload.role === 'founder');
  } catch { return false; }
}

app.get('/health', (_req, res) => res.json({ ok: true, service: 'orchestrator', launch_blocked: launchBlocked }));

app.post('/orchestrator/command', async (req, res) => {
  const { action, scope } = req.body || {};
  if (action !== 'emergency_stop' || !['region', 'all'].includes(scope)) return res.status(400).json({ error: 'invalid_command' });
  const auth = req.headers.authorization || '';
  const founderToken = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!verifyFounderToken(founderToken)) return res.status(403).json({ error: 'founder_authorization_required' });
  launchBlocked = true;
  let robotics = 'not_configured';
  if (ROBOTICS_PROXY_URL) {
    try {
      const response = await fetch(`${ROBOTICS_PROXY_URL.replace(/\/$/, '')}/emergency_stop`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ scope, reason: 'orchestrator_emergency_stop' }) });
      robotics = response.ok ? 'acknowledged' : `rejected:${response.status}`;
    } catch (error) { robotics = `error:${error?.message || 'request_failed'}`; }
  }
  console.log('orchestrator.emergency_stop', { scope, robotics, ts: new Date().toISOString() });
  res.json({ status: 'stopped', scope, robotics });
});

const PORT = Number(process.env.PORT || 8084);
app.listen(PORT, () => console.log(`Orchestrator listening on ${PORT}`));
