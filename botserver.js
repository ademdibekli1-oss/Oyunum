// Bilâd-ı Mütenâfise — yapay zekâ oyuncu sunucusu (GitHub Actions ile 15 dakikada bir çalışır).
// Yönetici telefonu kapalıyken de yapay zekâ oyuncuları ilerletir. Bağımlılık yok (Node 18+).
const crypto=require('crypto');
const DB_URL=(process.env.FB_URL||'https://oyun-f483d-default-rtdb.europe-west1.firebasedatabase.app').replace(/\/$/,'');
const ROOT=DB_URL+'/rrgame/botsrv';
const NOW=process.env.BS_NOW?+process.env.BS_NOW:Date.now();
const REGS=[{"s":"A","d":6,"adj":[1,2,4,5]},{"s":"A","d":5,"adj":[0,3,17]},{"s":"A","d":3,"adj":[0,4,9]},{"s":"A","d":5,"adj":[1,13]},{"s":"A","d":4,"adj":[0,2,10]},{"s":"K","d":5,"adj":[0,6,7]},{"s":"K","d":3,"adj":[5,7,8,8]},{"s":"K","d":6,"adj":[5,6,9]},{"s":"K","d":2,"adj":[6,6]},{"s":"D","d":4,"adj":[2,7,10,11]},{"s":"D","d":6,"adj":[4,9,11,12]},{"s":"D","d":7,"adj":[9,10,15]},{"s":"D","d":3,"adj":[10]},{"s":"G","d":6,"adj":[3,14,15]},{"s":"G","d":5,"adj":[13,15,16]},{"s":"G","d":4,"adj":[11,13,14]},{"s":"G","d":3,"adj":[14]},{"s":"B","d":6,"adj":[1,18,19]},{"s":"B","d":7,"adj":[17,19]},{"s":"B","d":7,"adj":[17,18,20]},{"s":"B","d":4,"adj":[19]},{"s":"O","d":2,"adj":[]},{"s":"O","d":2,"adj":[]}];
const MIN=60e3,HOUR=3600e3,DAY=86400e3,MAXAWAY=7*DAY;
const YIELD={gold:0.2,oil:1,ore:1.2},PRICE0={gold:800,oil:28,ore:20},RS=['gold','oil','ore'],KI={gold:7,oil:8,ore:9};
// bot dizisi: [i,r,s,e,d,w,m,g,o,k,t,a,c,l,v,j,x,xt,au]
const F=['i','r','s','e','d','w','m','g','o','k','t','a','c','l','v','j','x','xt','au'];
const toObj=a=>{const o={};F.forEach((k,i)=>o[k]=a[i]);return o;};
const toArr=o=>F.map(k=>o[k]);
let token=null;
async function getToken(){
  if(process.env.FB_MOCK)return null;
  const sa=JSON.parse(process.env.FB_SA||'{}');if(!sa.client_email||!sa.private_key)throw new Error('FB_SA gizli anahtarı yok ya da bozuk');
  const b=o=>Buffer.from(JSON.stringify(o)).toString('base64url'),iat=Math.floor(Date.now()/1000);
  const un=b({alg:'RS256',typ:'JWT'})+'.'+b({iss:sa.client_email,scope:'https://www.googleapis.com/auth/firebase.database https://www.googleapis.com/auth/userinfo.email',aud:'https://oauth2.googleapis.com/token',iat:iat,exp:iat+3000});
  const sig=crypto.createSign('RSA-SHA256').update(un).sign(sa.private_key,'base64url');
  const r=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion='+un+'.'+sig});
  const j=await r.json();if(!j.access_token)throw new Error('Token alınamadı: '+JSON.stringify(j).slice(0,200));return j.access_token;
}
async function fb(method,path,body){
  const u=ROOT+path+'.json'+(token?'?access_token='+token:'');
  const r=await fetch(u,{method:method,headers:{'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body)});
  const t=await r.text();if(!r.ok)throw new Error(method+' '+path+' '+r.status+' '+t.slice(0,150));
  return t?JSON.parse(t):null;
}
const rnd=Math.random;
function mkBot(i){let reg=rnd()<0.05?21+(rnd()<0.5?0:1):Math.floor(rnd()*21);
  return {i:i,r:reg,s:30,e:30,d:30,w:0,m:15000+Math.floor(rnd()*30000),g:0,o:0,k:0,t:0,a:rnd()*10*MIN,c:rnd()*30*MIN,l:(2+rnd()*5)*HOUR,v:(6+rnd()*18)*HOUR,j:NOW,x:'Yeni katıldı',xt:NOW,au:0};}
const lvOf=b=>1+Math.floor(b.w/40);
const r1=x=>Math.round(x*10)/10;
function run(bots,ms,cfg,acc){
  const rate=typeof cfg.rate==='number'?cfg.rate:5,tr=cfg.taxRes||{},pt=cfg.prodTax||{},pr=cfg.prices||PRICE0,rs=cfg.regState||REGS.map(x=>x.s),stx=cfg.stateTax||{};
  const taxFor=k=>(typeof tr[k]==='number')?tr[k]:rate;
  const price=k=>+pr[k]||PRICE0[k];
  for(const b of bots){
    const reg=REGS[b.r],st=rs[b.r]||reg.s;
    b.a+=ms;b.c+=ms;b.l-=ms;b.v-=ms;
    let n=0;
    while(b.a>=10*MIN&&n<40){b.a-=10*MIN;n++;
      const res=RS[b.i%3];
      let amt=(3+lvOf(b)*0.05+b.s*0.12)*YIELD[res]*(0.7+rnd()*0.6)*(1+reg.d*0.02)*(b.au>NOW?1.25:1);
      if(st==='A'){const tx=amt*(+stx[res]||0)/100;acc.b[res]+=tx;amt-=tx;}
      const p0=(+pt[res]||0)/100;if(p0>0){const pu=amt*p0,v=Math.floor(pu*price(res)*0.9);amt-=pu;b.t+=v;acc.money+=v;}
      const k=['g','o','k'][RS.indexOf(res)];b[k]=Math.min(2000*(1+b.d/100),b[k]+amt);b.w++;b.x='çalışıyor · '+({gold:'Altın',oil:'Petrol',ore:'Maden'})[res]+' üretti';b.xt=NOW;
    }
    let m=0;
    while(b.c>=30*MIN&&m<20){b.c-=30*MIN;m++;
      for(const res of RS){const k=['g','o','k'][RS.indexOf(res)],have=Math.floor(b[k]);
        if(have>=(res==='gold'?3:40)){const g0=Math.floor(price(res)*0.9*have),t=Math.floor(g0*taxFor(res)/100);b.m+=g0-t;b.t+=t;acc.money+=t;b[k]-=have;}}
      if(rnd()<0.25){const res=RS[Math.floor(rnd()*3)],q=res==='gold'?1:10,c=Math.ceil(price(res)*1.1*q);
        if(b.m>c*2){const t=Math.floor(c*taxFor(res)/100);b.m-=c+t;b.t+=t;acc.money+=t;b[['g','o','k'][RS.indexOf(res)]]+=q;}}
      if(!(b.au>NOW)&&rnd()<0.06&&b.m>18000){b.m-=18000;acc.money+=18000;b.au=NOW+7*DAY;b.x='⚙️ otomatik çalışma satın aldı';b.xt=NOW;}
      b.m=r1(b.m);b.g=r1(b.g);b.o=r1(b.o);b.k=r1(b.k);
    }
    if(b.l<=0){b.l=(2+rnd()*5)*HOUR;const k=['s','e','d'][Math.floor(rnd()*3)];if(b[k]<90){b[k]++;b.x='bir yeteneği '+b[k]+' seviyesine ulaştı';b.xt=NOW;}}
    if(b.v<=0){b.v=(6+rnd()*18)*HOUR;const adj=reg.adj;
      if(adj.length){const same=adj.filter(j=>(rs[j]||REGS[j].s)===st),pool=(same.length&&rnd()<0.7)?same:adj;b.r=pool[Math.floor(rnd()*pool.length)];b.x='başka bölgeye taşındı';b.xt=NOW;}}
  }
}
async function main(){
  token=await getToken();
  const cfg=await fb('GET','/cfg')||{};
  if(!cfg.on){console.log('Sunucu modu kapalı; yapacak iş yok.');return;}
  const st=await fb('GET','/state');
  if(!st||!st.b){console.log('Durum yok (yönetici sunucu modunu açmalı).');return;}
  let bots=JSON.parse(st.b).map(toObj);const acc=(await fb('GET','/acc'))||{money:0,b:{gold:0,oil:0,ore:0}};acc.b=acc.b||{gold:0,oil:0,ore:0};acc.money=+acc.money||0;
  // komutlar
  const cmds=await fb('GET','/cmd')||{};
  for(const id of Object.keys(cmds).sort()){const c=cmds[id]||{};
    if(c.k==='count'){const n=Math.max(0,Math.min(5000,c.n|0));while(bots.length<n)bots.push(mkBot(bots.length));while(bots.length>n)bots.pop();}
    else if(c.k==='gift'){const money=Math.max(0,+c.money||0),gold=Math.max(0,+c.gold||0);const set=Array.isArray(c.ids)?new Set(c.ids.map(Number)):null;bots.forEach(b=>{if(!set||set.has(b.i)){b.m+=money;b.g+=gold;}});}
    await fb('DELETE','/cmd/'+id);}
  // zaman ilerlet
  const away=Math.min(MAXAWAY,Math.max(0,NOW-(+st.t||NOW)));
  let left=away;while(left>0){const d=Math.min(left,6*HOUR);run(bots,d,cfg,acc);left-=d;}
  // otomatik büyüme
  const g=cfg.auto;let al=+st.al||NOW;
  if(g&&g.on){const per=Math.max(1,+g.h||24)*HOUR,k=Math.floor((NOW-al)/per);
    if(k>=1){al+=k*per;const room=Math.max(0,Math.min(5000,+g.cap||0)-bots.length),add=Math.min(room,Math.max(0,(+g.n||0)*k));for(let q=0;q<add;q++)bots.push(mkBot(bots.length));}}
  else al=NOW;
  acc.money=Math.round(acc.money);RS.forEach(k=>acc.b[k]=Math.round(acc.b[k]*100)/100);acc.t=NOW;
  await fb('PUT','/state',{v:1,t:NOW,n:bots.length,al:al,b:JSON.stringify(bots.map(toArr))});
  await fb('PUT','/acc',acc);
  console.log('Tamam:',bots.length,'bot,',Math.round(away/MIN),'dk ilerletildi, toplam vergi geliri',acc.money);
}
main().catch(e=>{console.error('HATA:',e.message);process.exit(1);});
