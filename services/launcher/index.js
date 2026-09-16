import express from 'express';
import crypto from 'node:crypto';

const app = express();
app.use(express.json({ limit: '32kb' }));

const PRIVATE_KEY = process.env.LAUNCHER_PRIVATE_KEY;
const SESSION_SECRET = process.env.SESSION_SECRET;
const LAUNCH_BASE_URL = process.env.LAUNCH_BASE_URL;
const LAUNCH_TTL = Math.min(Number(process.env.LAUNCH_TTL_SECONDS || 60), 120);

function b64url(value) { return Buffer.from(value).toString('base64url'); }
function parseCookies(header = '') { return Object.fromEntries(header.split(';').map((part) => part.trim().split('=' )).filter(([k, v]) => k && v).map(([k, ...v]) => [k, decodeURIComponent(v.join('='))])); }
function verifySession(value) {
  if (!SESSION_SECRET || !value) return null;
  const [payload, sig] = value.split('.');
  if (!payload || !sig) return null;
  const expected = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest();
  const actual = Buffer.from(sig, 'base64url');
  if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return session.exp > Math.floor(Date.now() / 1000) ? session : null;
  } catch { return null; }
}
function signRs256(payload) {
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT', kid: process.env.LAUNCHER_KEY_ID || 'launcher-key' }));
  const body = b64url(JSON.stringify(payload));
  const input = `${header}.${body}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(input);
  signer.end();
  return `${input}.${signer.sign(PRIVATE_KEY).toString('base64url')}`;
}

app.get('/health', (_req, res) => res.json({ ok: true, service: 'launcher' }));

app.post('/launcher/request', (req, res) => {
  if (!PRIVATE_KEY || !SESSION_SECRET || !LAUNCH_BASE_URL) return res.status(503).json({ error: 'launcher_not_configured' });
  if (process.env.LAUNCH_BLOCKED === '1') return res.status(503).json({ error: 'launches_blocked' });
  const cookies = parseCookies(req.headers.cookie || '');
  const session = verifySession(cookies.session);
  if (!session) return res.status(401).json({ error: 'no_session' });
  const gameId = typeof req.body?.game_id === 'string' ? req.body.game_id.trim() : '';
  if (!gameId || !/^[A-Za-z0-9._:-]{1,128}$/.test(gameId)) return res.status(400).json({ error: 'invalid_game_id' });
  const now = Math.floor(Date.now() / 1000);
  const payload = { sub: session.sub, name: session.name, game_id: gameId, session_id: crypto.randomUUID(), iat: now, exp: now + LAUNCH_TTL, region: process.env.LAUNCH_REGION || 'eu' };
  const token = signRs256(payload);
  const url = new URL('/play', LAUNCH_BASE_URL);
  url.searchParams.set('token', token);
  console.log('launch.issued', { actor: session.sub, game_id: gameId, exp: payload.exp });
  res.json({ launch_url: url.toString(), token, expires_in: LAUNCH_TTL });
});

const PORT = Number(process.env.PORT || 8081);
app.listen(PORT, () => console.log(`Launcher listening on ${PORT}`));
