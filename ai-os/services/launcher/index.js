// How to revise: Owner = Identity/platform contractor. JWT private key must come from Secret Manager/KMS; add real session lookup, compliance engine, HMAC/origin controls and anomaly detection before production.
const express=require('express'); const jwt=require('jsonwebtoken'); const app=express(); app.use(express.json());
const audit=(actor,action,plan_id)=>console.log(JSON.stringify({actor,action,timestamp:new Date().toISOString(),plan_id}));
app.post('/launcher/request',(req,res)=>{
 if(!req.headers.cookie?.includes('ai_os_session=')) return res.status(401).json({error:'session_required'});
 const {game_id,region,plan_id='launcher-plan',product,origin}=req.body||{};
 if(!game_id||!region) return res.status(400).json({error:'game_id_and_region_required'});
 if(origin&&!/^https:\/\/([a-z0-9-]+\.)?example\.com$/i.test(origin)) return res.status(403).json({error:'origin_not_allowed'});
 // Compliance hard gate placeholder: age, geo, KYC/AML and responsible-gambling policy must pass.
 if(!process.env.JWT_PRIVATE_KEY) return res.status(503).json({error:'jwt_key_not_configured'});
 const session_id=req.headers.cookie.match(/ai_os_session=([^;]+)/)?.[1]||'unknown'; const now=Math.floor(Date.now()/1000);
 const payload={sub:'authenticated-user',game_id,session_id,iat:now,exp:now+120,region,kid:process.env.JWT_KID||'production-kid'};
 const token=jwt.sign(payload,process.env.JWT_PRIVATE_KEY,{algorithm:'RS256',keyid:payload.kid}); audit(payload.sub,'launcher.request',plan_id);
 res.json({launch_url:`${process.env.LAUNCH_BASE_URL||'https://launcher.example.com'}/launch?token=${encodeURIComponent(token)}`,token,expires_at:new Date(payload.exp*1000).toISOString(),product});
});
app.post('/orchestrator/command',(req,res)=>{const {action,scope,plan_id='emergency-plan'}=req.body||{}; if(action!=='emergency_stop'||!['region','all'].includes(scope)) return res.status(400).json({error:'invalid_emergency_stop'}); audit('founder-or-ops','orchestrator.emergency_stop',plan_id); res.json({accepted:true,action,scope,launches_halted:true,ops_notified:true});});
app.get('/health',(req,res)=>res.json({ok:true,service:'launcher'})); app.listen(process.env.PORT||8080);