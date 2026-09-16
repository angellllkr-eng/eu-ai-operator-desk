import express from 'express';
import crypto from 'node:crypto';

const app = express();
app.use(express.json());

const CONFIG = {
  clientId: process.env.OIDC_CLIENT_ID,
  clientSecret: process.env.OIDC_CLIENT_SECRET || '',
  redirectUri: process.env.REDIRECT_URI,
  authEndpoint: process.env.OIDC_AUTH_ENDPOINT,
  tokenEndpoint: process.env.OIDC_TOKEN_ENDPOINT,
  jwksUri: process.env.OIDC_JWKS_URI,
  issuer: process.env.OIDC_ISSUER,
  sessionSecret: process.env.SESSION_SECRET,
};

for (const [name, value] of Object.entries(CONFIG)) {
  if (!value && !['clientSecret'].includes(name)) {
    console.warn(`auth-gateway: missing ${name}; startup remains fail-closed`);
  }
}

const COOKIE = 'session';
const STATE_COOKIE = 'oidc_state';
const VERIFIER_COOKIE = 'pkce_verifier';
const NONCE_COOKIE = 'oidc_nonce';
const MAX_SESSION_AGE = 60 * 60;

function b64url(value) {
  return Buffer.from(value).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest();
}

function parseCookies(header = '') {
  return Object.fromEntries(header.split(';').map((part) => part.trim().split('=')) .filter(([k, v]) => k && v).map(([k, ...v]) => [k, decodeURIComponent(v.join('='))]));
}

function setCookie(res, name, value, maxAge = 300) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.append('Set-Cookie', `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; HttpOnly; SameSite=Strict${secure}`);
}

function clearCookie(res, name) {
  setCookie(res, name, '', 0);
}

function signSession(session) {
  if (!CONFIG.sessionSecret) throw new Error('SESSION_SECRET is required');
  const payload = b64url(JSON.stringify({ ...session, exp: Math.floor(Date.now() / 1000) + MAX_SESSION_AGE }));
  const sig = b64url(crypto.createHmac('sha256', CONFIG.sessionSecret).update(payload).digest());
  return `${payload}.${sig}`;
}

function verifySession(value) {
  if (!CONFIG.sessionSecret || !value) return null;
  const [payload, sig] = value.split('.');
  if (!payload || !sig) return null;
  const expected = crypto.createHmac('sha256', CONFIG.sessionSecret).update(payload).digest();
  const actual = Buffer.from(sig.replace(/-/g, '+').replace(/_/g, '/') + '==', 'base64');
  if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) return null;
  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return parsed.exp > Math.floor(Date.now() / 1000) ? parsed : null;
  } catch {
    return null;
  }
}

function decodeJwt(token) {
  const [h, p, s] = token.split('.');
  if (!h || !p || !s) throw new Error('malformed JWT');
  return { header: JSON.parse(Buffer.from(h, 'base64url').toString('utf8')), payload: JSON.parse(Buffer.from(p, 'base64url').toString('utf8')), signingInput: `${h}.${p}`, signature: Buffer.from(s, 'base64url') };
}

async function verifyIdToken(token, expectedNonce) {
  const decoded = decodeJwt(token);
  if (decoded.header.alg !== 'RS256' || !decoded.header.kid) throw new Error('unsupported JWT');
  const response = await fetch(CONFIG.jwksUri);
  if (!response.ok) throw new Error(`JWKS ${response.status}`);
  const jwks = await response.json();
  const jwk = jwks.keys?.find((key) => key.kid === decoded.header.kid && key.kty === 'RSA');
  if (!jwk) throw new Error('signing key not found');
  const publicKey = crypto.createPublicKey({ key: jwk, format: 'jwk' });
  const valid = crypto.verify('RSA-SHA256', Buffer.from(decoded.signingInput), publicKey, decoded.signature);
  if (!valid) throw new Error('invalid signature');
  const now = Math.floor(Date.now() / 1000);
  if (decoded.payload.iss !== CONFIG.issuer) throw new Error('invalid issuer');
  if (decoded.payload.aud !== CONFIG.clientId && !(Array.isArray(decoded.payload.aud) && decoded.payload.aud.includes(CONFIG.clientId))) throw new Error('invalid audience');
  if (!decoded.payload.exp || decoded.payload.exp <= now) throw new Error('expired token');
  if (!decoded.payload.nonce || decoded.payload.nonce !== expectedNonce) throw new Error('invalid nonce');
  return decoded.payload;
}

app.get('/health', (_req, res) => res.json({ ok: true, service: 'auth-gateway' }));

app.get('/auth/start', (req, res) => {
  if (!CONFIG.clientId || !CONFIG.redirectUri || !CONFIG.authEndpoint || !CONFIG.tokenEndpoint || !CONFIG.jwksUri || !CONFIG.issuer || !CONFIG.sessionSecret) return res.status(503).json({ error: 'auth_not_configured' });
  const state = crypto.randomBytes(32).toString('hex');
  const nonce = crypto.randomBytes(32).toString('hex');
  const verifier = b64url(crypto.randomBytes(32));
  const challenge = b64url(sha256(verifier));
  const requestedReturn = typeof req.query.returnURL === 'string' ? req.query.returnURL : '/';
  const returnURL = requestedReturn.startsWith('/') && !requestedReturn.startsWith('//') ? requestedReturn : '/';
  setCookie(res, STATE_COOKIE, state);
  setCookie(res, NONCE_COOKIE, nonce);
  setCookie(res, VERIFIER_COOKIE, verifier);
  const params = new URLSearchParams({ response_type: 'code', client_id: CONFIG.clientId, redirect_uri: CONFIG.redirectUri, scope: 'openid profile email', state, nonce, code_challenge: challenge, code_challenge_method: 'S256' });
  params.set('returnURL', returnURL);
  res.redirect(`${CONFIG.authEndpoint}?${params}`);
});

app.get('/auth/callback', async (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  try {
    if (!CONFIG.clientId || !CONFIG.redirectUri || !CONFIG.tokenEndpoint) return res.status(503).send('Auth not configured');
    if (!req.query.code || !req.query.state || req.query.state !== cookies[STATE_COOKIE]) return res.status(400).send('Invalid OAuth state');
    if (!cookies[VERIFIER_COOKIE] || !cookies[NONCE_COOKIE]) return res.status(400).send('Missing PKCE state');
    const body = new URLSearchParams({ grant_type: 'authorization_code', code: String(req.query.code), redirect_uri: CONFIG.redirectUri, client_id: CONFIG.clientId, code_verifier: cookies[VERIFIER_COOKIE] });
    if (CONFIG.clientSecret) body.set('client_secret', CONFIG.clientSecret);
    const tokenResp = await fetch(CONFIG.tokenEndpoint, { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body });
    if (!tokenResp.ok) return res.status(502).send('Token exchange failed');
    const tokenJson = await tokenResp.json();
    const verified = await verifyIdToken(tokenJson.id_token, cookies[NONCE_COOKIE]);
    const session = signSession({ sub: verified.sub, name: verified.name || 'user', email: verified.email || '', iss: verified.iss, iat: Math.floor(Date.now() / 1000) });
    setCookie(res, COOKIE, session, MAX_SESSION_AGE);
    clearCookie(res, STATE_COOKIE); clearCookie(res, NONCE_COOKIE); clearCookie(res, VERIFIER_COOKIE);
    const returnURL = typeof req.query.returnURL === 'string' && req.query.returnURL.startsWith('/') ? req.query.returnURL : '/';
    res.redirect(returnURL);
  } catch (error) {
    console.error('auth.callback.error', error);
    res.status(500).send('Auth error');
  }
});

app.get('/auth/logout', (_req, res) => { clearCookie(res, COOKIE); res.status(204).end(); });

const PORT = Number(process.env.PORT || 8080);
app.listen(PORT, () => console.log(`Auth gateway listening on ${PORT}`));
