// Bilâd-ı Mütenâfise — yapay zekâ oyuncu sunucusu (GitHub Actions ile 15 dakikada bir çalışır).
// Yönetici telefonu kapalıyken de yapay zekâ oyuncuları ilerletir. Bağımlılık yok (Node 18+).
const crypto=require('crypto');
const DB_URL=(process.env.FB_URL||'https://oyun-f483d-default-rtdb.europe-west1.firebasedatabase.app').replace(/\/$/,'');
const ROOT=DB_URL+'/rrgame/botsrv',EL_ROOT=DB_URL+'/rrgame/elect',DIP_ROOT=DB_URL+'/rrgame/dip';
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
async function fb(method,path,body,base){
  const u=(base||ROOT)+path+'.json'+(token?'?access_token='+token:'');
  let last=null;
  for(let i=1;i<=4;i++){
    try{
      const r=await fetch(u,{method:method,headers:body===undefined?undefined:{'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body)});
      const t=await r.text();
      if(r.status>=500||r.status===429){last=new Error(method+' '+path+' '+r.status+' '+t.slice(0,150));}
      else if(!r.ok)throw Object.assign(new Error(method+' '+path+' '+r.status+' '+t.slice(0,150)),{fatal:true});
      else return t?JSON.parse(t):null;
    }catch(e){
      if(e.fatal)throw e;
      const c=e.cause||{};
      last=new Error(method+' '+path+' ağ hatası ('+(c.code||c.message||e.message)+')');
    }
    console.log('Yeniden deneniyor ('+i+'/4): '+last.message);
    await new Promise(r=>setTimeout(r,2000*i));
  }
  throw last;
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

// ================= ORTAK BAŞKANLIK SEÇİMİ (6 ülke) =================
// Aşama: 'vote' (24 saat: adaylar, kampanya, oylar) → 'term' (48 saat: başkan görevde) → yeni seçim.
const FN=['Kemal','Aylin','Barış','Defne','Emre','Selin','Tolga','Zeynep','Murat','Ceren','Onur','Elif','Cem','Deniz','Burak','Ece','Kaan','Melis','Yusuf','Naz'];
const SN=['Yılmaz','Kaya','Demir','Şahin','Çelik','Aydın','Arslan','Doğan','Kurt','Özdemir','Aksoy','Polat','Erdem','Koç','Güneş','Tekin','Bulut','Yıldız','Aslan','Karaca'];
const botName=i=>FN[i%20]+' '+SN[Math.floor(i/20)%20]+(i>=400?' '+(Math.floor(i/400)+1):'');
const EL_STATES=['A','B','D','G','K','O'],EL_VOTE=24*HOUR,EL_TERM=48*HOUR,EL_POL=['kalkinma','ordu','egitim'],EL_NCAND=3;
async function electRun(bots,cfg){
  const rs=cfg.regState||REGS.map(x=>x.s);
  const all=(await fb('GET','',undefined,EL_ROOT))||{};
  const byId={};bots.forEach(b=>byId[b.i]=b);
  const log=[];
  for(const s of EL_STATES){
    const E=all[s]||{};
    const pool=bots.filter(b=>(rs[b.r]||(REGS[b.r]||{}).s)===s).sort((a,b)=>lvOf(b)-lvOf(a));
    if(!pool.length&&!E.phase)continue;
    const newCands=()=>{ // en güçlü 10 yapay zekâdan rastgele 3 (görevdeki yapay zekâ başkan her zaman aday)
      const top=pool.slice(0,10),pick=new Set();
      if(E.pres&&E.pres.bot&&byId[+String(E.pres.id).slice(1)])pick.add(+String(E.pres.id).slice(1));
      while(pick.size<Math.min(EL_NCAND,top.length)){pick.add(top[Math.floor(rnd()*top.length)].i);}
      const c={};pick.forEach(i=>{const b=byId[i];c['b'+i]={n:botName(i),bot:1,lv:lvOf(b),camp:0,t:NOW};});return c;
    };
    if(!E.phase||(E.phase==='term'&&NOW>=+E.end)||(E.phase==='vote'&&NOW>=+E.end&&!Object.keys(E.cand||{}).length)){
      if(!pool.length)continue;
      const cyc=(+E.cycle||0)+1,cand=newCands();
      await fb('PATCH','/'+s,{phase:'vote',start:NOW,end:NOW+EL_VOTE,cycle:cyc,cand:cand,votes:null,msg:null,pol:null},EL_ROOT);
      log.push(s+': seçim başladı #'+cyc);continue;
    }
    if(E.phase==='vote'){
      const cand=E.cand||{},ids=Object.keys(cand);
      if(NOW<+E.end){ // kampanya: yapay zekâ adaylar kendi paralarından harcar
        let ch=false;
        for(const id of ids){const c=cand[id];if(!c.bot)continue;const b=byId[+id.slice(1)];if(!b)continue;
          const sp=Math.min(Math.floor(b.m*0.02),Math.floor(rnd()*30000));if(sp>=1000&&(+c.camp||0)<1000000){b.m-=sp;c.camp=(+c.camp||0)+sp;await fb('PUT','/'+s+'/cand/'+id+'/camp',c.camp,EL_ROOT);}}
        continue;
      }
      // oylama bitti: sayım
      const nb=pool.length,W=Math.max(10,Math.ceil(nb*0.03));
      const score=id=>{const c=cand[id];return (1+Math.min(+c.camp||0,500000)/100000)*(1+Math.min(+c.lv||1,100)/200);};
      const sum=ids.reduce((a,id)=>a+score(id),0)||1;
      const votes=E.votes||{},real={};
      Object.keys(votes).forEach(u=>{const id=votes[u];if(cand[id])real[id]=(real[id]||0)+1;});
      const res=ids.map(id=>({id:id,n:cand[id].n,bot:cand[id].bot?1:0,camp:+cand[id].camp||0,rv:real[id]||0,tot:Math.round(nb*score(id)/sum)+W*(real[id]||0)}));
      res.sort((a,b)=>b.tot-a.tot||b.camp-a.camp||rnd()-0.5);
      const w=res[0],tt=res.reduce((a,x)=>a+x.tot,0)||1;
      const pol=w.bot?EL_POL[Math.floor(rnd()*EL_POL.length)]:'kalkinma';
      await fb('PATCH','/'+s,{phase:'term',end:NOW+EL_TERM,pres:{id:w.id,n:w.n,bot:w.bot,t:NOW,cycle:+E.cycle||1,tot:w.tot,pct:Math.round(w.tot/tt*100)},pol:pol,msg:null,cand:null,votes:null,
        last:{cycle:+E.cycle||1,t:NOW,top:res.slice(0,5).map(x=>({n:x.n,bot:x.bot,tot:x.tot,rv:x.rv}))}},EL_ROOT);
      log.push(s+': başkan '+w.n+' (%'+Math.round(w.tot/tt*100)+')');
    }
  }
  return log;
}

// ================= ÜLKE KARARLARI + DİPLOMASİ =================
const EL_DEC=['sefer','calis','egitim'],DEC_VOTE=6*HOUR,DEC_FX=24*HOUR,PACT_LEN=3*DAY;
async function decRun(bots,cfg){
  const rs=cfg.regState||REGS.map(x=>x.s),all=(await fb('GET','',undefined,EL_ROOT))||{},log=[];
  for(const s of EL_STATES){
    const E=all[s];if(!E||!E.pres||E.phase!=='term')continue;
    const D=E.dec,nb=bots.filter(b=>(rs[b.r]||(REGS[b.r]||{}).s)===s).length,W=Math.max(10,Math.ceil(nb*0.03));
    if(D&&D.ok===undefined&&NOW>=+D.end){
      let ry=0,rn=0;const v=E.decv||{};Object.keys(v).forEach(u=>{if(v[u]==='y')ry++;else if(v[u]==='n')rn++;});
      const by=Math.round(nb*(0.5+rnd()*0.2)),bn=nb-by,ok=(by+W*ry)>(bn+W*rn);
      await fb('PATCH','/'+s,{dec:Object.assign({},D,{ok:ok,until:ok?NOW+DEC_FX:0,yes:by+W*ry,no:bn+W*rn}),decv:null},EL_ROOT);
      log.push(s+': karar '+D.k+(ok?' kabul':' reddedildi'));continue;
    }
    if(E.pres.bot&&(!D||NOW>(+D.end||0)+12*HOUR)&&rnd()<0.25){
      const k=EL_DEC[Math.floor(rnd()*EL_DEC.length)];
      await fb('PATCH','/'+s,{dec:{k:k,start:NOW,end:NOW+DEC_VOTE,by:E.pres.id},decv:null},EL_ROOT);log.push(s+': başkan karar önerdi '+k);
    }
  }
  return log;
}
async function dipRun(bots,cfg){
  const all=(await fb('GET','',undefined,EL_ROOT))||{},D=(await fb('GET','',undefined,DIP_ROOT))||{},emb=D.emb||{},pact=D.pact||{},log=[];
  const sts=EL_STATES.filter(s=>all[s]&&all[s].pres);
  const pactOn=(a,b)=>{const x=(pact[a]||{})[b],y=(pact[b]||{})[a];return (x&&+x.acc>NOW)||(y&&+y.acc>NOW);};
  const pending=(a,b)=>{const x=(pact[a]||{})[b];return x&&!x.acc&&+x.exp>NOW;};
  for(const s of sts){
    const P=all[s].pres;if(!P.bot||all[s].phase!=='term')continue;
    for(const a of sts){if(a===s)continue;const pr=(pact[a]||{})[s];
      if(pr&&!pr.acc&&+pr.exp>NOW&&rnd()<0.6){await fb('PUT','/pact/'+a+'/'+s+'/acc',NOW+PACT_LEN,DIP_ROOT);pr.acc=NOW+PACT_LEN;log.push(s+' ittifakı '+a+' ile kabul etti');}}
    const others=sts.filter(x=>x!==s);if(!others.length)continue;
    if(rnd()<0.12){const t=others[Math.floor(rnd()*others.length)];
      if(!pactOn(s,t)&&!pending(s,t)&&!pending(t,s)){await fb('PUT','/pact/'+s+'/'+t,{t:NOW,exp:NOW+DAY},DIP_ROOT);(pact[s]=pact[s]||{})[t]={t:NOW,exp:NOW+DAY};log.push(s+' → '+t+' ittifak önerdi');}}
    if(rnd()<0.06){const t=others[Math.floor(rnd()*others.length)],e=(emb[s]||{})[t];
      if(!pactOn(s,t)&&(!e||+e.until<NOW-12*HOUR)){await fb('PUT','/emb/'+s+'/'+t,{t:NOW,until:NOW+DAY},DIP_ROOT);(emb[s]=emb[s]||{})[t]={t:NOW,until:NOW+DAY};log.push(s+' → '+t+' ambargo uyguladı');}}
  }
  return log;
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
  try{const lg=(await electRun(bots,cfg)).concat(await decRun(bots,cfg),await dipRun(bots,cfg));lg.forEach(x=>console.log('Seçim/diplomasi:',x));}catch(e){console.log('Seçim hatası:',e.message);}
  acc.money=Math.round(acc.money);RS.forEach(k=>acc.b[k]=Math.round(acc.b[k]*100)/100);acc.t=NOW;
  await fb('PUT','/state',{v:1,t:NOW,n:bots.length,al:al,b:JSON.stringify(bots.map(toArr))});
  await fb('PUT','/acc',acc);
  console.log('Tamam:',bots.length,'bot,',Math.round(away/MIN),'dk ilerletildi, toplam vergi geliri',acc.money);
}
main().catch(e=>{console.error('HATA:',e.message);process.exit(1);});
