// How to revise: Owner = Identity/security contractor. Replace demo state/session stores with durable encrypted storage and implement verified token exchange/JWKS before production.
const express=require('express'); const crypto=require('crypto'); const app=express(); app.use(express.json());
const pending=new Map();
const b64=b=>Buffer.from(b).toString('base64url'); const rnd=()=>b64(crypto.randomBytes(32));
app.get('/auth/start',(req,res)=>{
 const redirect_uri=req.query.redirect_uri, state=req.query.state||rnd(), nonce=req.query.nonce||rnd();
 if(!redirect_uri||!/^https:\/\//i.test(redirect_uri)) return res.status(400).json({error:'invalid_redirect_uri'});
 const verifier=rnd(), challenge=b64(crypto.createHash('sha256').update(verifier).digest());
 pending.set(state,{verifier,nonce,redirect_uri,product:req.query.product,returnURL:req.query.returnURL,expires:Date.now()+300000});
 const u=new URL(process.env.OIDC_AUTHORIZATION_ENDPOINT||'https://idp.example.invalid/authorize');
 [['response_type','code'],['client_id',process.env.OIDC_CLIENT_ID||'REPLACE'],['redirect_uri',redirect_uri],['scope','openid profile'],['state',state],['nonce',nonce],['code_challenge',challenge],['code_challenge_method','S256']].forEach(([k,v])=>u.searchParams.set(k,v));
 res.redirect(u.toString());
});
app.get('/auth/callback',(req,res)=>{
 const p=pending.get(req.query.state); if(!p||p.expires<Date.now()) return res.status(400).json({error:'invalid_state'}); if(!req.query.code) return res.status(400).json({error:'missing_code'});
 // Production gate: exchange code; validate ID-token signature/iss/aud/exp/nonce against JWKS; then create server session.
 const sessionId=rnd(); res.cookie('ai_os_session',sessionId,{httpOnly:true,secure:true,sameSite:'strict',maxAge:3600000});
 res.json({status:'SESSION_STUB_CREATED',session_id:sessionId});
});
app.get('/health',(req,res)=>res.json({ok:true,service:'auth-gateway'}));
app.listen(process.env.PORT||8080);