import express from 'express';
import crypto from 'node:crypto';

const app = express();
app.use(express.raw({ type: 'application/json', limit: '256kb' }));

const SECRET = process.env.ZAPIER_WEBHOOK_SECRET;
const MAX_AGE_SECONDS = Number(process.env.WEBHOOK_MAX_AGE_SECONDS || 300);

function verifySignature(raw, header) {
  if (!SECRET || !header?.startsWith('sha256=')) return false;
  const supplied = header.slice(7);
  if (!/^[a-f0-9]{64}$/i.test(supplied)) return false;
  const expected = crypto.createHmac('sha256', SECRET).update(raw).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(supplied, 'hex'));
}

app.get('/health', (_req, res) => res.json({ ok: true, service: 'mcp-webhook' }));

app.post('/mcp/webhook', async (req, res) => {
  const signature = req.get('X-Zapier-Signature');
  const raw = Buffer.isBuffer(req.body) ? req.body : Buffer.from('');
  if (!SECRET) return res.status(503).send('webhook_not_configured');
  if (!verifySignature(raw, signature)) return res.status(401).send('invalid signature');
  let payload;
  try { payload = JSON.parse(raw.toString('utf8')); } catch { return res.status(400).send('invalid json'); }
  const eventTime = Number(payload.timestamp || payload.ts || 0);
  if (eventTime && Math.abs(Math.floor(Date.now() / 1000) - eventTime) > MAX_AGE_SECONDS) return res.status(401).send('stale event');
  console.log('mcp.event', { event: payload.event || 'unknown', id: payload.id || null });
  if (payload.event === 'payment.succeeded' && process.env.SLACK_WEBHOOK) {
    try {
      await fetch(process.env.SLACK_WEBHOOK, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text: `Payment succeeded: ${payload.user?.email || 'unknown'} ${payload.amount || ''} ${payload.currency || ''}` }) });
    } catch (error) { console.warn('mcp.slack_forward_failed', error?.message || error); }
  }
  res.status(200).json({ ok: true });
});

const PORT = Number(process.env.PORT || 8082);
app.listen(PORT, () => console.log(`MCP webhook listening on ${PORT}`));
