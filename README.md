<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Bilâd-ı Mütenâfise</title>
<style>
*{box-sizing:border-box}
body{font-family:'Segoe UI',system-ui,sans-serif;background:#07090f;color:#c9d1d9;margin:0}
.app{max-width:1100px;margin:0 auto;padding:10px}
header{padding:10px 12px;background:linear-gradient(90deg,#111820,#1a2330);border:1px solid #2a3542;border-radius:10px}
header h1{color:#f0c040;font-size:14px;margin:0 0 6px;letter-spacing:1px}
.stats{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:12px}
.stats b{color:#f0c040}
nav{display:flex;flex-wrap:wrap;gap:4px;margin:8px 0}
nav button{flex:1 1 auto;padding:8px 6px;border:1px solid #2a3542;background:#111820;color:#c9d1d9;cursor:pointer;border-radius:6px;font-size:12px}
nav button.active{background:#f0c040;color:#07090f;font-weight:bold;border-color:#f0c040}
nav>button{min-width:0;flex:1 1 14%;display:flex;flex-direction:column;align-items:center;gap:1px;font-size:10px;padding:5px 2px;white-space:nowrap}
nav>button i{font-style:normal;font-size:17px;line-height:1.1}
.subnav{flex:1 1 100%;display:flex;gap:4px;margin-top:2px}
.subnav button{background:#0d131b;font-size:12px;padding:6px 4px;color:#8b98a8}
.subnav button.on{background:#1a2330;color:#f0c040;border-color:#f0c040;font-weight:bold}
main{background:#111820;border:1px solid #2a3542;border-radius:10px;padding:12px;min-height:420px}
.panel{margin-bottom:14px}
.panel h2{font-size:12px;color:#58a6ff;margin:0 0 8px;text-transform:uppercase;letter-spacing:1px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
.card{background:#0d131b;border:1px solid #2a3542;border-radius:8px;padding:10px;margin-bottom:8px}
.grid .card{margin-bottom:0}
.card h3{margin:0 0 4px;font-size:13px;color:#f0c040}
.card p{margin:3px 0;font-size:12px;color:#8b949e;line-height:1.45}
.card .big{font-size:20px;color:#e6edf3;font-weight:600}
.card.locked{opacity:.5}.card.glow{border-color:#f0c040}
.owner{font-size:10px;padding:1px 6px;border-radius:8px;background:#1a2330;color:#58a6ff;font-weight:normal;margin-left:4px}
.btns{display:flex;flex-wrap:wrap;gap:4px;margin-top:6px}
button.act{background:#238636;color:#fff;border:none;padding:6px 10px;border-radius:5px;cursor:pointer;font-size:12px;line-height:1.3;text-align:left}
button.act small{opacity:.8;font-size:10px}
button.act:hover{filter:brightness(1.15)}
button.act:disabled{background:#2a3542;color:#6e7681;cursor:not-allowed}
button.act.sm{padding:2px 6px;font-size:10px}
button.danger{background:#da3633}button.gold{background:#9e6a03}button.purple{background:#6f42c1}button.blue{background:#1f6feb}
.log{height:170px;overflow-y:auto;font-size:12px;background:#06090d;border:1px solid #2a3542;border-radius:7px;padding:8px;font-family:monospace;line-height:1.5}
.log.tall{height:60vh}
.log div{border-bottom:1px solid #111820;padding:2px 0}
.ok{color:#3fb950}.bad{color:#f85149}.warn{color:#d29922}.info{color:#58a6ff}.dim{color:#6e7681}
.bar{background:#1a2330;height:8px;border-radius:5px;overflow:hidden;margin:4px 0}
.bar>div{height:100%;background:#f0c040}
.q{background:#0d131b;border:1px solid #2a3542;border-left:3px solid #58a6ff;border-radius:6px;padding:7px 9px;margin:5px 0;font-size:12px}
.q.bad{border-left-color:#f85149}
.al{padding:8px 10px;border-radius:7px;margin:0 0 6px;font-size:12px;border:1px solid}
.al.bad{background:#2a1214;border-color:#da3633}.al.warn{background:#2a2112;border-color:#9e6a03}.al.info{background:#102033;border-color:#1f6feb}
#alerts{margin-top:8px}
.hint{font-size:11px;color:#6e7681;margin:6px 0}
select,input[type=number]{background:#06090d;color:#c9d1d9;border:1px solid #2a3542;border-radius:5px;padding:6px;font-size:13px}
input[type=number]{width:70px}
select{width:100%;margin:6px 0}
.row{display:flex;flex-wrap:wrap;gap:10px;margin:8px 0}
table{width:100%;border-collapse:collapse;font-size:12px}td{padding:6px 4px;border-bottom:1px solid #1a2330;vertical-align:middle}td.num{text-align:right}
input[type=range]{width:60%;vertical-align:middle}
#toasts{position:fixed;right:10px;bottom:10px;display:flex;flex-direction:column;gap:6px;z-index:50;max-width:80vw}
.toast{background:#111820;border:1px solid #2a3542;border-left:3px solid #58a6ff;padding:8px 12px;border-radius:6px;font-size:12px}
.toast.ok{border-left-color:#3fb950}.toast.bad{border-left-color:#f85149}.toast.warn{border-left-color:#d29922}
.modal{position:fixed;inset:0;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;z-index:60;padding:14px}
.modal .box{background:#111820;border:1px solid #2a3542;border-radius:10px;padding:14px;max-width:560px;width:100%}
.modal h3{margin:0 0 8px;color:#f0c040;font-size:14px}
.bar2{background:#da3633;height:10px;border-radius:5px;overflow:hidden;margin:4px 0}.bar2>div{height:100%;background:#1f6feb}
label{font-size:12px;color:#8b949e}
</style>
</head>
<body>
<div class="app">
<header><h1>🌍 BİLÂD-I MÜTENÂFİSE</h1>
<div class="stats"><span>💰 <b id="hMoney"></b></span><span>🥇 <b id="hGold"></b></span><span>⚡ <b id="hEn"></b></span><span>⭐ Sv <b id="hLvl"></b></span><span>📍 <b id="hLoc"></b></span><span id="hDay"></span></div></header>
<nav id="nav"></nav>
<div id="alerts"></div>
<main id="main"></main>
<div id="modal-root"></div>
<div id="toasts"></div>
</div>
<script>
"use strict";
/* ================= SABİTLER ================= */
const $=id=>document.getElementById(id);
const MIN=60e3,HOUR=3600e3,DAY=86400e3;
const SPEED=Math.max(1,+(new URLSearchParams(location.search).get('hiz'))||1); // test: ?hiz=60
const SAVE='rrreal_v2', OFFLINE_CAP=3*DAY, PROTECT=36*HOUR;
const ELECT=24*HOUR, ELECT_LEN=2*HOUR, REVIEW=HOUR, WAR_PREP=20*MIN, WAR_LEN=3*HOUR;
const flr=Math.floor, clamp=(x,a,b)=>Math.max(a,Math.min(b,x)), rnd=(a,b)=>a+Math.random()*(b-a), pick=a=>a[flr(Math.random()*a.length)];
const fmt=n=>Math.round(n).toLocaleString('tr-TR');
const f1=n=>(Math.round(n*10)/10).toLocaleString('tr-TR');
const fmtT=t=>new Date(t).toLocaleString('tr-TR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});
function fmtDur(ms){ms=Math.max(0,ms);const s=flr(ms/1000),d=flr(s/86400),h=flr(s%86400/3600),m=flr(s%3600/60),sc=s%60;
  return d?`${d}g ${h}sa`:h?`${h}sa ${m}dk`:m?`${m}dk ${String(sc).padStart(2,'0')}sn`:`${sc}sn`;}

const RES=['gold','oil','ore','uranium','diamonds'];
const RES_N={gold:'Altın',oil:'Petrol',ore:'Maden',uranium:'Uranyum',diamonds:'Elmas'};
const RES_I={gold:'🥇',oil:'🛢️',ore:'⛏️',uranium:'☢️',diamonds:'💎'};
const PRICE0={gold:800,oil:28,ore:20,uranium:900,diamonds:1500};
const YIELD={gold:0.2,oil:1,ore:1.2};                 // kamu fabrikası verimi (uranyum/elmas yalnızca özel fabrikada)
const DRAIN={gold:1,oil:0.1,ore:0.08,uranium:3,diamonds:3}; // üretilen birim başına rezerv düşüşü
const PRIV_BASE={gold:0.6,oil:6,ore:7,uranium:0.15,diamonds:0.15};
const PERKS={str:'Güç',edu:'Eğitim',end:'Dayanıklılık'};
const PERK_D={str:'Savaş hasarı, kamu fabrikası verimi, üretim maliyeti −',edu:'Maksimum iş deneyimi, savaş hasarı, üretim maliyeti −',end:'İş enerji gideri −, depo +%1/puan, savaş alfa-hasarı'};

const BUILD={ // bölge binaları (kanunla, devlet bütçesiyle)
  hospital:{n:'Hastane',i:'🏥',idx:'h',d:'Sağlık indeksi +1'},
  school:{n:'Okul',i:'🏫',idx:'e',d:'Eğitim indeksi +1 (öğrenme hızlanır)'},
  base:{n:'Askeri Üs',i:'🎖️',idx:'m',d:'Askeri indeks +1 (savunma)'},
  house:{n:'Konut Fonu',i:'🏘️',idx:'d',d:'Gelişmişlik indeksi +1 (vergi geliri)'},
  power:{n:'Enerji Santrali',i:'⚡',d:'Uranyum/elmas fabrikası için gerekli'},
  airport:{n:'Havalimanı',i:'🛫',d:'Hava savaşı açar'},
  port:{n:'Liman',i:'⚓',d:'Deniz savaşı açar (kıyı bölgesi)'},
  missile:{n:'Füze Sistemi',i:'🚀',d:'Füze hasarı/savunma'},
  spaceport:{n:'Uzay Üssü',i:'🛰️',d:'Ay savaşı açar'},
  academy:{n:'Askeri Akademi',i:'🏛️',d:'Saldırı hasarı +%5/seviye'},
  library:{n:'Kütüphane',i:'📚',d:'Öğrenme süresi −%5/seviye'}
};
const IDX_B=['hospital','school','base','house'];
const ITEMS={ // üretilebilir eşyalar
  tank:{n:'Tank',i:'🚜',type:'land',money:5000,ore:60,oil:25,time:6*MIN,dmg:1.0},
  fighter:{n:'Savaş Uçağı',i:'✈️',type:'air',money:12000,ore:90,oil:60,time:10*MIN,dmg:1.4},
  bomber:{n:'Ağır Bombardıman',i:'🛩️',type:'air',money:25000,ore:140,oil:90,diamonds:3,time:15*MIN,dmg:2.5},
  ship:{n:'Savaş Gemisi',i:'🚢',type:'naval',money:20000,ore:160,oil:70,time:14*MIN,dmg:1.8},
  battleship:{n:'Zırhlı Gemi',i:'⛴️',type:'naval',money:45000,ore:250,oil:150,diamonds:6,time:25*MIN,dmg:3.5},
  missile:{n:'Balistik Füze',i:'🚀',type:'land',money:60000,oil:100,uranium:6,diamonds:2,time:30*MIN,dmg:6,needs:'missile'},
  moontank:{n:'Ay Tankı',i:'🛸',type:'space',money:50000,ore:200,uranium:5,time:20*MIN,dmg:4},
  station:{n:'Uzay İstasyonu',i:'🛰️',type:'space',money:120000,uranium:12,diamonds:6,time:40*MIN,dmg:8}
};
const WTYPE={land:'Kara',naval:'Deniz',air:'Hava',space:'Uzay'};
const GOVS={republic:'Başkanlık Cumhuriyeti',dictatorship:'Diktatörlük'};

/* ================= HARİTA ================= */
// [ad, devlet, kıyı, ay, idx(h,m,e,d), rezerv(gold,oil,ore,uranium,diamonds)]
const REG0=[
 ['Başkent Bölgesi','A',0,0,[5,4,5,6],[60,80,200,0,0]],
 ['Verimli Ova','A',0,0,[4,3,4,5],[0,60,160,0,0]],
 ['Dağlık Sınır','A',0,0,[3,5,3,3],[140,30,260,6,0]],
 ['Güney Kıyısı','A',1,0,[4,3,4,5],[0,120,90,0,8]],
 ['Doğu Madeni','A',0,0,[3,4,3,4],[90,40,320,10,0]],
 ['Kuzey Limanı','K',1,0,[4,5,4,5],[0,90,120,0,0]],
 ['Buzul Ovası','K',0,0,[3,4,3,3],[40,150,100,0,0]],
 ['Çelik Şehri','K',0,0,[4,6,4,6],[0,40,330,4,0]],
 ['Kutup Üssü','K',0,0,[2,8,2,2],[0,200,80,14,0]],
 ['Doğu Platosu','D',0,0,[3,5,3,4],[60,110,180,0,0]],
 ['Petrol Havzası','D',0,0,[4,5,4,6],[0,380,60,0,0]],
 ['Kervan Kenti','D',0,0,[4,4,5,7],[0,50,140,0,12]],
 ['Çöl Sınırı','D',0,0,[2,6,2,3],[20,160,100,8,0]],
 ['Güney Limanı','G',1,0,[4,6,4,6],[0,100,110,0,10]],
 ['Vaha','G',0,0,[4,3,4,5],[100,20,80,0,0]],
 ['Çöl Kapısı','G',0,0,[3,7,3,4],[30,130,150,5,0]],
 ['Altın Dağları','G',0,0,[3,5,3,3],[320,10,200,0,16]],
 ['Batı Ovası','B',0,0,[5,3,5,6],[0,70,130,0,0]],
 ['Liman Kenti','B',1,0,[5,4,5,7],[0,60,110,0,6]],
 ['Sanayi Havzası','B',0,0,[4,4,5,7],[0,50,300,8,0]],
 ['Elmas Vadisi','B',0,0,[3,3,3,4],[60,20,90,6,26]],
 ['Ay Üssü Alfa','O',0,1,[1,3,2,2],[0,0,300,18,10]],
 ['Ay Üssü Beta','O',0,1,[1,3,2,2],[160,0,420,12,30]]
];
const EDGES=[[0,1],[0,2],[0,4],[0,5],[1,3],[1,17],[2,4],[2,9],[3,13],[4,10],[5,6],[5,7],[6,7],[6,8],[7,9],[9,10],[9,11],[10,11],[10,12],[11,15],[13,14],[13,15],[14,15],[14,16],[17,18],[17,19],[18,19],[19,20],[8,6]];
const STATE_N={A:'Anadolu Cumhuriyeti',K:'Kuzey Federasyonu',D:'Doğu Birliği',G:'Güney Emirliği',B:'Batı Cumhuriyeti',O:'Ay Kolonisi'};
const AI_S=['K','D','G','B','O'];
const AI_BASE={K:{rel:-15,aggr:0.9},D:{rel:-25,aggr:1.0},G:{rel:-35,aggr:1.2},B:{rel:5,aggr:0.7},O:{rel:0,aggr:0.2}};
const PARTY0=[
  {id:'halk',n:'Halk Partisi',supp:34,pref:{tax:0.6,build:0.5,explore:0.4,transfer:-0.6,war:-0.4,treaty:0.6,gov:-0.8,autonomy:0.2}},
  {id:'ulus',n:'Ulusal Birlik',supp:30,pref:{tax:-0.4,build:0.2,explore:0.5,transfer:-0.2,war:0.7,treaty:-0.3,gov:0.1,autonomy:-0.5}},
  {id:'ozgur',n:'Özgürlük ve Piyasa',supp:22,pref:{tax:-0.7,build:0.1,explore:0.6,transfer:-0.5,war:0.1,treaty:0.4,gov:-0.6,autonomy:0.6}},
  {id:'yesil',n:'Yeşil Gelecek',supp:14,pref:{tax:0.3,build:0.6,explore:-0.6,transfer:-0.4,war:-0.8,treaty:0.7,gov:-0.7,autonomy:0.4}}
];

/* ================= DURUM ================= */
let S=null;
function newState(){
  const t=Date.now();
  const regions=REG0.map((r,i)=>({id:i,n:r[0],state:r[1],coast:!!r[2],moon:!!r[3],adj:[],
    idx:{h:r[4][0],m:r[4][1],e:r[4][2],d:r[4][3]},
    res:Object.fromEntries(RES.map((k,j)=>[k,{c:r[5][j],m:r[5][j],dm:0,dmEnd:0}])),
    b:{},bq:[],auto:false,gov:null}));
  EDGES.forEach(e=>{regions[e[0]].adj.push(e[1]);regions[e[1]].adj.push(e[0]);});
  const rel={};['A'].concat(AI_S).forEach(a=>{rel[a]={};['A'].concat(AI_S).forEach(b=>{if(a!==b)rel[a][b]=0;});});
  AI_S.forEach(k=>{rel.A[k]=rel[k].A=AI_BASE[k].rel;});
  AI_S.forEach(a=>AI_S.forEach(b=>{if(a!==b)rel[a][b]=rnd(-30,10);}));
  const states={A:{n:STATE_N.A,gov:'republic',leader:'Başkan Koç',leaderMe:false,parlSize:100,
      parties:PARTY0.map(p=>Object.assign({members:0,leaderName:''},p,{pref:Object.assign({},p.pref)})),
      budget:{money:150000,gold:10,oil:200,ore:300,uranium:0,diamonds:0},
      tax:{inc:10,gold:10,oil:10,ore:10,uranium:10,diamonds:10},
      min:{econ:null,foreign:null},nextElection:t+ELECT,election:null,warScore:0,rulingParty:'halk',
      treaty:{mil:{},emb:{},mig:{}},truce:{}}};
  AI_S.forEach(k=>{states[k]={n:STATE_N[k],aggr:AI_BASE[k].aggr,next:t+rnd(6,14)*HOUR,truce:{},bonus:1};});
  return {v:2,startT:t,t:t,savedReal:t,live:false,dirty:true,seq:1,
    me:{name:'Sen',level:1,xp:0,str:30,edu:30,end:30,learn:null,boost:null,boostCd:0,
      energy:100,loc:0,res:0,resSince:t-DAY,travel:null,money:40000,
      stor:{gold:0,oil:100,ore:100,uranium:0,diamonds:0},items:Object.fromEntries(Object.keys(ITEMS).map(k=>[k,0])),
      craftQ:[],party:null,partyLead:false,paper:null,facs:[],hits:0,works:0,lastLobby:0,lastCamp:0,lastVote:0},
    regions:regions,states:states,rel:rel,laws:[],wars:[],
    prices:Object.assign({},PRICE0),nextPrice:t+10*MIN,mods:[],nextEvent:t+rnd(5,9)*HOUR,
    protectUntil:t+PROTECT,log:[],news:[]};
}
function load(){try{const d=localStorage.getItem(SAVE);if(!d)return null;const s=JSON.parse(d);return s&&s.v===2&&s.regions?s:null;}catch(e){return null;}}
function save(){if(window.__noSave)return;try{S.savedReal=Date.now();const c=Object.assign({},S);delete c.dirty;delete c.live;localStorage.setItem(SAVE,JSON.stringify(c));}catch(e){}}
function L(m,c=''){S.log.unshift({t:S.t,m:m,c:c});if(S.log.length>200)S.log.pop();S.dirty=true;
  if(S.live&&typeof toast==='function')toast(m,c);}
function news(m){S.news.unshift({t:S.t,m:m});if(S.news.length>60)S.news.pop();S.dirty=true;}

/* ================= YARDIMCILAR ================= */
const ME=()=>S.me, A=()=>S.states.A;
const regOf=s=>S.regions.filter(r=>r.state===s);
const nameOf=s=>S.states[s]?S.states[s].n:s;
function perk(k){let v=S.me[k];if(S.me.boost&&S.me.boost.perk===k&&S.me.boost.end>S.t)v+=100;return v;}
const craftBonus=()=>Math.min(50,Math.sqrt(perk('str'))+Math.sqrt(perk('edu')));
function energyCost(){if(S.me.admin)return 0;const e=perk('end');return e>=50?5:Math.max(5,Math.round(10-(e-30)/4));}
const storCap=()=>S.me.admin?1e7:Math.floor(2000*(1+S.me.end/100)*(1+0.25*(((S.me.inv||{}).depo)||0)));
const myReg=()=>S.regions[S.me.loc];
const homeReg=()=>S.regions[S.me.res];
function levelB(r,b){return r.b[b]||0;}
function totalB(r,except){return Object.keys(r.b).reduce((a,k)=>a+(k===except?0:r.b[k]),0);}
function hasB(state,b){return regOf(state).some(r=>levelB(r,b)>0);}
function xpNeed(l){return 80+l*30;}
function addXP(n){const m=S.me;n*=1+0.08*(((m.inv||{}).akad)||0);m.xp+=n;while(m.xp>=xpNeed(m.level)){m.xp-=xpNeed(m.level);m.level++;L(`⭐ Seviye ${m.level}!`,'ok');}}
function hopsTo(from,to){if(from===to)return 0;const seen={[from]:0},q=[from];
  while(q.length){const c=q.shift();for(const n of S.regions[c].adj){if(seen[n]===undefined){seen[n]=seen[c]+1;if(n===to)return seen[n];q.push(n);}}}return 99;}
function isMine(r){return r.state==='A';}
function powerOf(s){ // devletin askeri gücü (vatandaşlar/yapay zekâ)
  const days=(S.t-S.startT)/DAY;
  const base=regOf(s).reduce((a,r)=>a+r.idx.m*7+totalB(r,'house')*2,0);
  const g=s==='A'?1:(1+0.015*days)*(S.states[s].bonus||1);
  return base*g+((typeof BOTAGG!=='undefined'&&BOTAGG.st[s])?BOTAGG.st[s].str*0.0035:0);
}
function relTo(x,y){return S.rel[x]&&S.rel[x][y]!==undefined?S.rel[x][y]:0;}
function addRel(x,y,d){if(x===y)return;S.rel[x][y]=clamp(S.rel[x][y]+d,-100,100);S.rel[y][x]=S.rel[x][y];}
function atWar(s){return S.wars.filter(w=>w.state!=='done'&&(w.att===s||w.def===s));}
function adjacentStates(s){const o=new Set();regOf(s).forEach(r=>r.adj.forEach(a=>{const st=S.regions[a].state;if(st!==s)o.add(st);}));return Array.from(o);}
function modF(k){let f=1;S.mods.forEach(m=>{if(m.kind===k&&m.end>S.t)f*=m.f;});return f;}

/* ================= KARAKTER ================= */
function learnTimeMs(perkName,gold){
  const L=S.me[perkName]+1,E=homeReg().idx.e>=11?20:homeReg().idx.e;
  let T=(1-E/50)*L*L*(gold?0.72:9.6);
  if(L<=100)T*=0.5;if(L<=50)T*=0.5;
  T*=Math.max(0.5,1-0.05*levelB(homeReg(),'library'));
  return Math.max(30,T)*1000;
}
function learnCost(perkName,gold){const L=S.me[perkName]+1;return gold?Math.max(1,flr(L/8)):L*60;}
function addStor(res,amt){const cap=storCap(),cur=S.me.stor[res],ok=Math.min(amt,Math.max(0,cap-cur));S.me.stor[res]+=ok;return ok;}
function stateTax(state,res){return state==='A'?A().tax[res]/100:0.1;}
function regionAllows(r){ // çalışma izni
  if(r.state==='A')return true;
  if(relTo('A',r.state)<-50)return false;
  return true;
}
function workAmount(res,region){
  const m=S.me;
  return (3+m.level*0.05+perk('str')*0.12)*(YIELD[res]||0)*(1+region.idx.d*0.02)*modF('work');
}
function doWork(res){
  if(S.me.jail>S.t)return 'Hapistesin ('+fmtDur(S.me.jail-S.t)+').';
  const m=S.me,r=myReg();
  if(m.travel)return 'Yoldasın.';
  if(!YIELD[res])return 'Bu kaynak yalnızca özel fabrikada üretilir.';
  if(!regionAllows(r))return 'Bu bölgede çalışma iznin yok.';
  if(r.res[res].c<=0)return `${r.n} bölgesinde ${RES_N[res]} rezervi bitti.`;
  const ec=energyCost();if(m.energy<ec)return 'Yetersiz enerji.';
  m.energy-=ec;
  let amt=workAmount(res,r)*((typeof evtMult==='function')?evtMult():1)*(1+0.05*(((m.inv||{}).fab)||0));const take=Math.min(amt,r.res[res].c/DRAIN[res]);amt=take;
  const tax=stateTax(r.state,res),t=amt*tax,net=amt-t;
  const ok=addStor(res,net);
  r.res[res].c=Math.max(0,r.res[res].c-amt*DRAIN[res]);
  if(r.state==='A')A().budget[res]+=t;
  m.works++;addXP(3+perk('edu')/25);
  return {amt:net,lost:net-ok,tax:t};
}
function drinkEnergy(){const m=S.me;if(m.stor.gold<2)return 'Yetersiz altın (2).';m.stor.gold-=2;m.energy=Math.min(200,m.energy+50);return true;}

/* ================= EKONOMİ ================= */
const TAXR=()=>(S.me.admin||typeof MP==='undefined')?0:MP.rate/100;
function buyRes(res,n){const t=TAXR(),p=S.prices[res]*1.1,c=Math.ceil(p*n*(1+t));if(S.me.money<c)return 'Yetersiz para.';
  const ok=Math.min(n,Math.max(0,storCap()-S.me.stor[res]));if(ok<=0)return 'Depo dolu.';
  const cc=Math.ceil(p*ok),tax=Math.ceil(cc*t);S.me.money-=cc+tax;S.me.taxPaid=(S.me.taxPaid||0)+tax;S.me.stor[res]+=ok;S.me.buys=(S.me.buys||0)+1;S.prices[res]*=1+ok*0.0003/Math.max(1,PRICE0[res]/100);return {n:ok,c:cc,tax:tax};}
function sellRes(res,n){n=Math.min(n,Math.floor(S.me.stor[res]*100)/100);if(n<=0)return 'Satacak kaynak yok.';
  const t=TAXR(),g0=Math.floor(S.prices[res]*0.9*n),tax=Math.floor(g0*t),g=g0-tax;S.me.stor[res]-=n;S.me.money+=g;S.me.sells=(S.me.sells||0)+1;S.me.taxPaid=(S.me.taxPaid||0)+tax;S.prices[res]*=1-n*0.0003/Math.max(1,PRICE0[res]/100);S.prices[res]=Math.max(S.prices[res],PRICE0[res]*0.5);return {n:n,g:g,tax:tax};}
function itemCost(k,n){const b=1-craftBonus()/100,I=ITEMS[k],o={money:Math.ceil(I.money*b*n)};RES.forEach(r=>{if(I[r])o[r]=Math.ceil(I[r]*b*n);});return o;}
function facRate(f){return PRIV_BASE[f.res]*f.level*(1+perk('edu')/200)*modF('work');}
function facCost(res,level){return {gold:10*level+(res==='uranium'||res==='diamonds'?10:0),money:30000*level};}

/* ================= ZAMAN / SİMÜLASYON ================= */
function integrate(ms){
  const h=ms/HOUR,m=S.me;
  if(typeof botsTick==='function')botsTick(ms);
  if(typeof powerTick==='function')powerTick(h);
  if(m.energy<100)m.energy=Math.min(100,m.energy+(30+4*(((m.inv||{}).house)||0))*h); // içecekle 100 üstüne çıkan enerji korunur
  // özel fabrikalar
  m.facs.forEach(f=>{const r=S.regions[f.region];if(!r||r.res[f.res].c<=0||r.state!==f.owner)return;
    const prod=Math.min(facRate(f)*h,r.res[f.res].c/DRAIN[f.res]);
    const tax=stateTax(r.state,f.res);f.stock=Math.min(f.stock+prod*(1-tax),facRate(f)*24);
    r.res[f.res].c=Math.max(0,r.res[f.res].c-prod*DRAIN[f.res]);
    if(r.state==='A')A().budget[f.res]+=prod*tax;});
  // devlet geliri (vatandaşlar)
  const a=A();let inc=0;regOf('A').forEach(r=>{inc+=r.idx.d*3000*(a.tax.inc/100)*(1+0.1*levelB(r,'house'));
    // yapay zekâ işçileri kaynak çıkarır
    RES.forEach(k=>{if(r.res[k].c>0&&YIELD[k]!==undefined){const p=r.res[k].m*0.0015*h*(r.idx.d/5);a.budget[k]+=p*a.tax[k]/100*5;r.res[k].c=Math.max(0,r.res[k].c-p*DRAIN[k]*0.2);}});});
  a.budget.money+=inc*h;
  // savaş hasarı (yapay zekâ vatandaşlar)
  S.wars.forEach(w=>{if(w.state!=='on')return;
    const ra=rnd(0.8,1.2),rd=rnd(0.8,1.2);
    const rr=S.regions[w.region];
    const acad=regOf(w.att).reduce((x,r)=>x+levelB(r,'academy'),0);
    const pa=powerOf(w.att)*5*(1+0.05*acad);
    const pd=powerOf(w.def)*5*1.25*(1+0.03*totalB(rr,'house')); // savunan taraf avantajlı
    w.dA+=pa*ra*h;w.dD+=pd*rd*h;});
}
function nextEventTime(){
  let n=Infinity;const mm=x=>{if(x&&x<n)n=x;};
  const m=S.me;
  if(m.learn)mm(m.learn.end);if(m.boost)mm(m.boost.end);if(m.travel)mm(m.travel.arrive);if(m.craftQ.length)mm(m.craftQ[0].end);
  S.regions.forEach(r=>{if(r.bq.length)mm(r.bq[0].end);RES.forEach(k=>mm(r.res[k].dmEnd));});
  S.laws.forEach(l=>{if(l.status==='pending')mm(l.end);});
  S.wars.forEach(w=>{if(w.state==='prep')mm(w.start);else if(w.state==='on')mm(w.end);});
  if(A().gov!=='dictatorship'){if(A().election)mm(A().election.end);else mm(A().nextElection);}
  AI_S.forEach(k=>mm(S.states[k].next));
  mm(S.nextPrice);mm(S.nextEvent);S.mods.forEach(x=>mm(x.end));
  return n;
}
function processEvents(t){
  const m=S.me;
  if(m.learn&&m.learn.end<=t){m[m.learn.perk]++;L(`📈 ${PERKS[m.learn.perk]} ${m[m.learn.perk]} seviyesine ulaştı.`,'ok');m.learn=null;}
  if(m.boost&&m.boost.end<=t){L(`⏱️ ${PERKS[m.boost.perk]} güçlendiricisi bitti.`,'info');m.boost=null;}
  if(m.travel&&m.travel.arrive<=t){m.loc=m.travel.to;L(`🧳 ${S.regions[m.loc].n} bölgesine vardın.`,'ok');m.travel=null;}
  while(m.craftQ.length&&m.craftQ[0].end<=t){const b=m.craftQ.shift();m.items[b.k]+=b.n;L(`🔧 ${b.n} ${ITEMS[b.k].n} üretildi.`,'ok');}
  S.regions.forEach(r=>{
    while(r.bq.length&&r.bq[0].end<=t){const b=r.bq.shift();completeBuilding(r,b.b);}
    RES.forEach(k=>{const x=r.res[k];if(x.dmEnd&&x.dmEnd<=t){x.dmEnd=0;x.m=Math.max(x.c,x.m-x.dm);x.dm=0;}});});
  S.laws.forEach(l=>{if(l.status==='pending'&&l.end<=t)resolveLaw(l);});
  S.wars.forEach(w=>{if(w.state==='prep'&&w.start<=t)startWar(w);else if(w.state==='on'&&w.end<=t)endWar(w);});
  S.wars=S.wars.filter(w=>w.state!=='done'||t-w.end<12*HOUR);
  electionTick(t);
  AI_S.forEach(k=>{if(S.states[k].next<=t)aiAct(k);});
  while(S.nextPrice<=t){for(const k of RES){const b=PRICE0[k];let p=S.prices[k];p+=(b-p)*0.05+p*rnd(-0.02,0.02);S.prices[k]=clamp(p,b*0.5,b*2.2);}S.nextPrice+=10*MIN;}
  if(S.nextEvent<=t){randomEvent();S.nextEvent=t+rnd(5,9)*HOUR;}
  S.mods=S.mods.filter(x=>x.end>t);
  // devlet bakımı: diktatör ayaklanması
  const a=A();if(a.gov==='dictatorship'&&a.leaderMe&&t-(a.lastUp||S.startT)>DAY){a.lastUp=t;
    if(Math.random()<0.18+Math.max(0,(a.tax.inc-10))*0.01){a.gov='republic';a.leaderMe=false;a.leader='Başkan Yılmaz';a.parlSize=100;L('🔥 Halk ayaklandı! Diktatörlük yıkıldı, cumhuriyet yeniden kuruldu.','bad');
      news('Halk ayaklanması rejimi devirdi.');}}
}
function randomEvent(){
  const e=pick(['boom','crash','quake','oil','strike','aid','scandal']);
  if(e==='boom'){const k=pick(RES);S.prices[k]=Math.min(PRICE0[k]*2.2,S.prices[k]*1.35);news(`${RES_N[k]} fiyatları yükseldi.`);}
  else if(e==='crash'){const k=pick(RES);S.prices[k]=Math.max(PRICE0[k]*0.5,S.prices[k]*0.7);news(`${RES_N[k]} fiyatları düştü.`);}
  else if(e==='quake'){const r=pick(S.regions.filter(x=>!x.moon));const k=pick(['h','m','e','d']);if(r.idx[k]>1){r.idx[k]--;news(`${r.n} bölgesinde deprem: bir indeks düştü.`);if(r.state==='A')L(`🌋 ${r.n} bölgesinde deprem! İndeks düştü.`,'bad');}}
  else if(e==='oil'){const r=pick(regOf('A'));r.res.oil.c+=40;r.res.oil.m+=40;L(`🛢️ ${r.n} bölgesinde yeni petrol damarı (+40 rezerv).`,'ok');}
  else if(e==='strike'){S.mods.push({kind:'work',f:0.7,end:S.t+3*HOUR});L('✊ Genel grev! 3 saat üretim %30 düştü.','bad');}
  else if(e==='aid'){const k=pick(AI_S.filter(x=>x!=='O'));addRel('A',k,8);A().budget.money+=15000;L(`🤝 ${nameOf(k)} bütçeye 15.000₺ yardım yaptı.`,'ok');}
  else{const a=A();a.parties.forEach(p=>{p.supp=Math.max(1,p.supp+rnd(-2,2));});L('📰 Siyasi skandal: partilerin desteği değişti.','info');}
}

/* ================= BİNALAR ================= */
function completeBuilding(r,b){
  r.b[b]=(r.b[b]||0)+1;
  const B=BUILD[b];if(B.idx)r.idx[B.idx]=Math.min(11,r.idx[B.idx]+1);
  if(r.state==='A')L(`🏗️ ${r.n}: ${B.n} tamamlandı.`,'ok');
  news(`${nameOf(r.state)} — ${r.n}: ${B.n} tamamlandı.`);
}
function buildCost(r,b){const lv=(r.b[b]||0)+r.bq.filter(x=>x.b===b).length;return 120000*(lv+1);}
function buildTime(r,b){const lv=(r.b[b]||0)+r.bq.filter(x=>x.b===b).length;return (lv+1)*HOUR;}

/* ================= KANUNLAR / PARLAMENTO ================= */
const LAW_K={tax:'Vergi',build:'Bina inşası',explore:'Kaynak keşfi',deep:'Derin arama',transfer:'Bütçe transferi',war:'Savaş ilanı',treaty:'Anlaşma',gov:'Hükümet şekli',autonomy:'Özerklik'};
const LAW_CAT={tax:'eco',build:'eco',explore:'eco',deep:'eco',transfer:'eco',war:'war',treaty:'foreign',gov:'gov',autonomy:'misc'};
function seatsOf(){
  const a=A(),o={};if(!a.parlSize){a.parties.forEach(p=>o[p.id]=0);return o;}
  const tot=a.parties.reduce((x,p)=>x+Math.max(0,p.supp),0)||1;let used=0;const rem=[];
  a.parties.forEach(p=>{const sh=p.supp/tot;if(sh<0.01){o[p.id]=0;return;}const q=a.parlSize*sh;o[p.id]=Math.floor(q);used+=o[p.id];rem.push([p.id,q-Math.floor(q)]);});
  rem.sort((x,y)=>y[1]-x[1]);for(let i=0;used<a.parlSize&&rem.length;i++,used++)o[rem[i%rem.length][0]]++;
  return o;
}
function lawText(k,g){
  if(k==='tax')return `Vergi: gelir %${g.inc}, altın %${g.gold}, petrol %${g.oil}, maden %${g.ore}, uranyum %${g.uranium}, elmas %${g.diamonds}`;
  if(k==='build')return `${S.regions[g.region].n}: ${BUILD[g.b].n} inşa edilsin`;
  if(k==='explore')return `${S.regions[g.region].n}: yeni ${RES_N[g.res]} keşfi`;
  if(k==='deep')return `${S.regions[g.region].n}: ${RES_N[g.res]} derin arama (24 saat)`;
  if(k==='transfer')return `Bütçeden ${fmt(g.amt)} ${g.res==='money'?'₺':RES_N[g.res]} oyuncuya aktarılsın`;
  if(k==='war')return `${S.regions[g.region].n} bölgesine ${WTYPE[g.type]} savaşı ilanı`;
  if(k==='treaty')return `${nameOf(g.state)} ile ${({mil:'askeri anlaşma',emb:'ambargo',mig:'göç anlaşması'})[g.kind]}`;
  if(k==='gov')return g.to==='dictatorship'?'Diktatörlük ilan edilsin':'Cumhuriyete dönülsün';
  if(k==='autonomy')return `${S.regions[g.region].n} özerk bölge olsun`;
  return k;
}
function proposeLaw(kind,args,by){
  const a=A();
  const id=S.seq++;const L0={id:id,kind:kind,args:args,by:by||'me',start:S.t,end:S.t+REVIEW,status:'pending',pro:0,txt:lawText(kind,args)};
  S.laws.unshift(L0);if(S.laws.length>40)S.laws.pop();
  const mine=by==='me';
  const dict=a.gov==='dictatorship'&&a.leaderMe&&mine&&kind!=='gov';
  const early=mine&&a.leaderMe&&a.gov==='republic'&&(LAW_CAT[kind]==='war'||false);
  const econ=mine&&(a.min.econ==='me'||a.leaderMe)&&LAW_CAT[kind]==='eco';
  const forn=mine&&(a.min.foreign==='me'||a.leaderMe)&&LAW_CAT[kind]==='foreign';
  if(dict||early||econ||forn){resolveLaw(L0,true);}
  else L(`🏛️ Kanun teklifi verildi: ${L0.txt}. Oylama ${fmtDur(REVIEW)} sonra.`,'info');
  return L0;
}
function lawSupport(l){
  const a=A(),seats=seatsOf();let pro=0,tot=0;
  a.parties.forEach(p=>{
    const s=seats[p.id]||0;tot+=s;
    let like=0.5+0.5*(p.pref[l.kind]||0);
    if(p.id==='me')like=l.by==='me'?1:0.5;
    if(l.by==='me'&&S.me.party===p.id)like=1;
    if(l.by==='leader'&&p.id===a.rulingParty)like=Math.min(1,like+0.3);
    like=clamp(like+(l.lobby||0),0,1);
    pro+=s*like;});
  return {pro:pro,tot:tot,pct:tot?pro/tot:0};
}
function resolveLaw(l,instant){
  if(l.status!=='pending')return;
  const a=A();
  let pass,pct=1;
  if(instant)pass=true;
  else{const s=lawSupport(l);pct=s.pct;l.pro=Math.round(pct*100);
    pass=pct>(l.kind==='gov'&&l.args.to==='dictatorship'?0.8:0.5);}
  l.status=pass?'passed':'failed';
  if(!pass){L(`🏛️ Kanun reddedildi (%${l.pro} evet): ${l.txt}`,'warn');return;}
  const err=execLaw(l);
  if(err){l.status='failed';L(`🏛️ Kanun uygulanamadı (${err}): ${l.txt}`,'warn');}
  else{L(`🏛️ Kanun kabul edildi${instant?'':' (%'+l.pro+' evet)'}: ${l.txt}`,'ok');news(`Yasa kabul edildi: ${l.txt}`);}
}
function execLaw(l){
  const a=A(),g=l.args;
  if(l.kind==='tax'){['inc','gold','oil','ore','uranium','diamonds'].forEach(k=>{a.tax[k]=clamp(+g[k],0,40);});return null;}
  if(l.kind==='build'){const r=S.regions[g.region];if(r.state!=='A')return 'bölge artık bizim değil';
    const c=buildCost(r,g.b);if(a.budget.money<c)return 'bütçe yetersiz';
    if((r.b[g.b]||0)+r.bq.filter(x=>x.b===g.b).length>=(BUILD[g.b].idx?(11-r.idx[BUILD[g.b].idx]):5))return 'en üst seviye';
    if(g.b==='port'&&!r.coast)return 'kıyı bölgesi değil';
    a.budget.money-=c;const st=r.bq.length?r.bq[r.bq.length-1].end:S.t;r.bq.push({b:g.b,start:st,end:st+buildTime(r,g.b)});return null;}
  if(l.kind==='explore'){const r=S.regions[g.region];if(r.state!=='A')return 'bölge bizim değil';if(r.res[g.res].m>0)return 'bu kaynak zaten var';
    if(a.budget.money<80000)return 'bütçe yetersiz';a.budget.money-=80000;r.res[g.res].m=30;r.res[g.res].c=30;return null;}
  if(l.kind==='deep'){const r=S.regions[g.region];if(r.state!=='A')return 'bölge bizim değil';
    if(a.budget.money<60000||a.budget.gold<5)return 'bütçe yetersiz (60.000₺ + 5 altın)';
    if(regOf('A').some(x=>RES.some(k=>x.res[k].dmEnd>S.t)))return 'zaten bir derin arama sürüyor';
    a.budget.money-=60000;a.budget.gold-=5;const x=r.res[g.res];const add=Math.round(Math.max(10,x.m*0.5));x.dm=add;x.m+=add;x.c+=add;x.dmEnd=S.t+24*HOUR;return null;}
  if(l.kind==='transfer'){const have=g.res==='money'?a.budget.money:a.budget[g.res];if(have<g.amt)return 'bütçe yetersiz';
    if(g.res==='money'){a.budget.money-=g.amt;S.me.money+=g.amt;}else{a.budget[g.res]-=g.amt;addStor(g.res,g.amt);}return null;}
  if(l.kind==='war'){return declareWar('A',g.region,g.type,true);}
  if(l.kind==='treaty'){const k=g.kind,s=g.state;
    if(k==='mil'){a.treaty.mil[s]=S.t+72*HOUR;addRel('A',s,25);}
    else if(k==='mig'){a.treaty.mig[s]=S.t+72*HOUR;addRel('A',s,10);}
    else{a.treaty.emb[s]=S.t+72*HOUR;addRel('A',s,-20);}return null;}
  if(l.kind==='gov'){
    if(g.to==='dictatorship'){if(!a.leaderMe)return 'diktatör olmak için başkan olmalısın';a.gov='dictatorship';a.parlSize=0;a.lastUp=S.t;L('👑 Diktatörlük ilan edildi: kanunlar anında çıkar, seçim yok.','warn');}
    else{a.gov='republic';a.parlSize=100;a.nextElection=S.t+ELECT;}
    return null;}
  if(l.kind==='autonomy'){const r=S.regions[g.region];if(r.state!=='A')return 'bölge bizim değil';r.auto=true;return null;}
  return 'bilinmeyen kanun';
}

/* ================= SEÇİM ================= */
function partyShare(){ // parti desteği (pp) + gazete
  const a=A(),m=S.me;
  return a.parties.map(p=>{let s=Math.max(0,p.supp);
    if(p.id==='me'&&m.paper)s+=m.paper.subs/200;
    if(typeof BOTAGG!=='undefined')s+=(BOTAGG.party[p.id]||0)*0.015;
    if(p.id===a.rulingParty){s-=Math.max(0,a.tax.inc-10)*0.5;s+=a.warScore*2;}
    return {id:p.id,s:Math.max(0.1,s+rnd(-1.5,1.5))};});
}
function electionTick(t){
  const a=A();
  if(a.gov==='dictatorship'){return;}
  if(!a.election&&a.nextElection<=t){a.election={start:t,end:t+ELECT_LEN};L('🗳️ Seçim başladı! Oy ver ya da kampanya yap. Sonuçlar 2 saat sonra.','info');news('Seçim başladı.');}
  else if(a.election&&a.election.end<=t){
    const sh=partyShare(),tot=sh.reduce((x,y)=>x+y.s,0);
    // oyuncunun oyu küçük bir ek
    if(S.me.votedFor){const x=sh.find(y=>y.id===S.me.votedFor);if(x)x.s+=S.me.level*0.05;}
    S.me.votedFor=null;
    const tot2=sh.reduce((x,y)=>x+y.s,0);
    a.parties.forEach(p=>{const x=sh.find(y=>y.id===p.id);p.supp=Math.max(0.5,x.s/tot2*100);});
    const win=sh.slice().sort((x,y)=>y.s-x.s)[0];const wp=a.parties.find(p=>p.id===win.id);
    a.rulingParty=win.id;a.warScore*=0.3;
    const mine=win.id==='me'&&S.me.partyLead;
    a.leaderMe=mine;a.leader=mine?S.me.name:('Başkan '+pick(['Aydın','Demir','Kaya','Şahin','Erdem','Polat']));
    a.min.econ=mine?'me':null;a.min.foreign=null;
    L(`🗳️ Seçim sonucu: ${wp.n} %${Math.round(win.s/tot2*100)} ile kazandı. Başkan: ${a.leader}.`,mine?'ok':'info');
    news(`Seçimi ${wp.n} kazandı; başkan ${a.leader}.`);
    a.election=null;a.nextElection=t+ELECT;
  }
}

/* ================= SAVAŞ ================= */
function warTypes(att,r){ // saldırgan devletin bu bölgeye açabileceği savaş türleri
  const o=[];
  if(r.moon){if(hasB(att,'spaceport'))o.push('space');return o;}
  const adj=r.adj.some(x=>S.regions[x].state===att);
  if(adj)o.push('land');
  if(hasB(att,'airport')&&(adj||true))o.push('air');
  if(r.coast&&hasB(att,'port'))o.push('naval');
  return o;
}
function declareWar(att,rid,type,pay){
  const r=S.regions[rid];if(!r)return 'bölge yok';
  if(r.state===att)return 'kendi bölgen';
  if(S.wars.some(w=>w.state!=='done'&&w.region===rid))return 'bu bölgede zaten savaş var';
  if(S.wars.some(w=>w.state!=='done'&&w.att===att))return 'zaten bir savaşın var';
  if(!warTypes(att,r).includes(type))return 'bu savaş türü açık değil';
  const def=r.state;
  if(S.states[att]&&S.states[att].truce&&S.states[att].truce[def]>S.t)return 'ateşkes sürüyor';
  if(att==='A'){const a=A();if(a.treaty.mil[def]>S.t)return 'askeri anlaşma var';
    if(pay){if(a.budget.money<50000||a.budget.gold<3)return 'bütçe yetersiz (50.000₺ + 3 altın)';a.budget.money-=50000;a.budget.gold-=3;}
    if(S.t<S.protectUntil)S.protectUntil=S.t;}
  const w={id:S.seq++,att:att,def:def,region:rid,type:type,start:S.t+WAR_PREP,end:S.t+WAR_PREP+WAR_LEN,dA:0,dD:0,state:'prep',mine:0};
  S.wars.push(w);addRel(att,def,-35);
  if(att==='A'){L(`⚔️ ${S.regions[rid].n} (${nameOf(def)}) için ${WTYPE[type]} savaşı ilan edildi! Başlangıç: ${fmtT(w.start)}`,'bad');}
  else if(def==='A'){L(`⚠️ ${nameOf(att)} ${S.regions[rid].n} bölgemize ${WTYPE[type]} savaşı ilan etti! Başlangıç: ${fmtT(w.start)}`,'bad');}
  news(`${nameOf(att)}, ${nameOf(def)}'e ${S.regions[rid].n} için ${WTYPE[type]} savaşı ilan etti.`);
  return null;
}
function startWar(w){w.state='on';if(w.att==='A'||w.def==='A')L(`⚔️ ${S.regions[w.region].n} savaşı başladı! Vur (enerji 10) ya da eşya kullan.`,'bad');}
function endWar(w){
  w.state='done';
  const r=S.regions[w.region],attWin=w.dA>w.dD;
  const involved=w.att==='A'||w.def==='A';
  const a=A();
  if(attWin){
    const others=regOf(w.def).length;
    if(others<=1){ // başkent düşmez
      if(involved)L(`🛡️ ${r.n} son bölge: savunma, başkenti kurtardı!`,'ok');
      news(`${nameOf(w.def)} son bölgesini savundu.`);
    }else{
      r.state=w.att;Object.keys(r.b).forEach(b=>{r.b[b]=Math.max(0,r.b[b]-1);});r.bq=[];r.auto=false;
      S.me.facs=S.me.facs.filter(f=>f.region!==r.id||r.state===f.owner);
      if(S.me.res===r.id&&r.state!=='A'){/* ikamet bölgesini kaybetti */}
      if(involved)L(`${w.att==='A'?'🏆':'💥'} ${r.n}: ${nameOf(w.att)} kazandı (${fmt(w.dA)} / ${fmt(w.dD)}).`,w.att==='A'?'ok':'bad');
      news(`${nameOf(w.att)}, ${r.n} bölgesini ${nameOf(w.def)}'den aldı.`);
    }
  }else{
    if(involved)L(`${w.def==='A'?'🛡️':'💀'} ${r.n}: ${nameOf(w.def)} savundu (${fmt(w.dA)} / ${fmt(w.dD)}).`,w.def==='A'?'ok':'bad');
    news(`${nameOf(w.def)}, ${r.n} bölgesini savundu.`);
  }
  if(involved){const ourWin=(w.att==='A')===attWin;a.warScore+=ourWin?1:-1;
    if(w.mine>0){addXP(40);L(`🎖️ Savaşa ${fmt(w.mine)} hasarla katkı yaptın (+40 XP).`,'ok');}}
  const sa=S.states[w.att],sd=S.states[w.def];
  if(sa&&sa.truce)sa.truce[w.def]=S.t+6*HOUR;if(sd&&sd.truce)sd.truce[w.att]=S.t+6*HOUR;
  if(w.att==='A'&&A().truce)A().truce[w.def]=S.t+6*HOUR;
  if(w.def==='A'&&sa)sa.truce.A=S.t+48*HOUR;
  if(sa)sa.cool=S.t+24*HOUR;if(sd)sd.cool=Math.max(sd.cool||0,S.t+12*HOUR);
}
function hitDamage(item){
  const m=S.me;
  let d=10+perk('str')*0.5+perk('edu')*0.25+perk('end')*0.15;
  if(item)d+=ITEMS[item].dmg*40;
  d*=(1+m.level/100);
  const e=perk('end'),cap=100+m.level*2+(e>=50?20:0)+(e>=75?20:0)+(e>=100?20:0)+(item?ITEMS[item].dmg*40:0);
  d=Math.min(d,cap);
  if(homeReg().state==='A'&&S.t-m.resSince>6*HOUR)d*=1.1;   // anavatan bonusu
  return d;
}
function doHit(wid,item){
  const w=S.wars.find(x=>x.id===wid),m=S.me;
  if(!w||w.state!=='on')return 'Savaş aktif değil.';
  if(w.att!=='A'&&w.def!=='A')return 'Bu savaşta devletin yok.';
  if(m.travel)return 'Yoldasın.';
  if(m.jail>S.t)return 'Hapistesin.';
  if(item){if(ITEMS[item].type!==w.type)return 'Bu eşya bu savaş türünde kullanılamaz.';if(m.items[item]<1)return 'Eşyan yok.';
    if(ITEMS[item].needs&&!hasB('A',ITEMS[item].needs))return 'Füze Sistemi binası gerekli.';}
  if(m.energy<10)return 'Yetersiz enerji (10).';
  m.energy-=10;if(item)m.items[item]--;
  const d=hitDamage(item);
  if(w.att==='A')w.dA+=d;else w.dD+=d;
  w.mine+=d;m.dmg=(m.dmg||0)+d;m.hits++;addXP(6);
  return d;
}
function aiAct(k){
  const s=S.states[k];s.next=S.t+rnd(3,6)*HOUR;
  // yapay zekâ gelişimi ve ilişki sürüklenmesi
  s.bonus=(s.bonus||1)*(1+rnd(0,0.004));
  AI_S.concat(['A']).forEach(o=>{if(o===k)return;const base=o==='A'?AI_BASE[k].rel:(o==='O'?0:-24);S.rel[k][o]=clamp(S.rel[k][o]+(base-S.rel[k][o])*0.08+rnd(-3,3),-100,100);S.rel[o][k]=S.rel[k][o];});
  if(k==='O')return;
  if(atWar(k).length)return;
  if(s.cool>S.t)return;
  if(regOf(k).length===0)return;
  // hedef devlet
  const cand=adjacentStates(k).filter(x=>x!=='O');
  if(!cand.length)return;
  const tgt=cand.sort((x,y)=>S.rel[k][x]-S.rel[k][y])[0];
  if(S.rel[k][tgt]>-20)return;
  if(Math.random()>0.15*s.aggr)return;
  if(s.truce&&s.truce[tgt]>S.t)return;
  if(tgt==='A'){
    if(S.t<S.protectUntil)return;
    if(A().treaty.mil[k]>S.t)return;
    if(powerOf(k)<powerOf('A')*0.8)return;
  }else{if(atWar(tgt).length)return;if(powerOf(k)<powerOf(tgt)*0.9)return;}
  // hedef bölge: sınırdaki en zayıf bölge
  const regs=regOf(tgt).filter(r=>r.adj.some(x=>S.regions[x].state===k));
  if(!regs.length)return;
  const r=regs.sort((x,y)=>(x.idx.m+totalB(x))-(y.idx.m+totalB(y)))[0];
  const types=warTypes(k,r);if(!types.length)return;
  declareWar(k,r.id,types[0],false);
}

/* ================= SİMÜLASYON DÖNGÜSÜ ================= */
function advance(to){
  processEvents(S.t);
  let guard=0;
  while(S.t<to&&guard++<400000){
    const step=Math.min(to,S.t+MIN,Math.max(nextEventTime(),S.t+1));
    integrate(step-S.t);S.t=step;processEvents(S.t);
  }
}
/* ================= EYLEMLER ================= */
const ACT={};
const UI={tab:'char',lawKind:'tax',lastWork:null};
function msg(m,c='bad'){toast(m,c);}
function res(r,okMsg){if(typeof r==='string'){msg(r);return false;}if(okMsg)msg(okMsg,'ok');return true;}
const isLeader=()=>A().leaderMe;
const myParty=()=>A().parties.find(p=>p.id===S.me.party);

ACT.tab=d=>{UI.tab=d.t;};
ACT.learn=d=>{
  const m=S.me;if(m.learn)return msg('Zaten bir şey öğreniyorsun.');
  const gold=d.g==='1',c=learnCost(d.p,gold);
  if(gold){if(m.stor.gold<c)return msg(`Yetersiz altın (${c}).`);m.stor.gold-=c;}else{if(m.money<c)return msg(`Yetersiz para (${fmt(c)}₺).`);m.money-=c;}
  const T=learnTimeMs(d.p,gold);m.learn={perk:d.p,start:S.t,end:S.t+T};
  L(`📚 ${PERKS[d.p]} ${m[d.p]+1} seviyesi için öğrenme başladı (${fmtDur(T)}).`,'info');
};
ACT.boost=d=>{
  const m=S.me;if(m.boost&&m.boost.end>S.t)return msg('Zaten aktif bir güçlendirici var.');
  if(S.t<m.boostCd)return msg(`Güçlendirici ${fmtDur(m.boostCd-S.t)} sonra kullanılabilir.`);
  const gold=d.g==='1';
  if(gold){if(m.stor.gold<25)return msg('Yetersiz altın (25).');m.stor.gold-=25;}else{if(m.money<30000)return msg('Yetersiz para (30.000₺).');m.money-=30000;}
  const dur=gold?20*HOUR:2*HOUR;m.boost={perk:d.p,end:S.t+dur};m.boostCd=S.t+12*HOUR;
  L(`💪 ${PERKS[d.p]} +100 güçlendirici ${fmtDur(dur)} aktif.`,'ok');
};
ACT.drink=()=>{const r=drinkEnergy();if(res(r,'⚡ +50 enerji'))L('⚡ Enerji içeceği içildi.','info');};
ACT.work=d=>{
  const n=+d.n||1;let tot=0,lost=0,err=null;
  for(let i=0;i<n;i++){const r=doWork(d.r);if(typeof r==='string'){err=r;break;}tot+=r.amt;lost+=r.lost;}
  if(tot>0){UI.lastWork=`${RES_I[d.r]} +${f1(tot)} ${RES_N[d.r]}${lost>0.001?` (depo dolu: ${f1(lost)} kayıp)`:''}`;msg(UI.lastWork,'ok');}
  if(err)msg(err);
};
ACT.workAll=d=>{let i=0;while(i<60){const r=doWork(d.r);if(typeof r==='string'){if(!i)msg(r);break;}i++;}if(i){UI.lastWork=`${i} kez çalıştın.`;msg(UI.lastWork,'ok');}};
ACT.buy=d=>{const r=buyRes(d.r,+d.n);res(r,'🛒 Alındı');};
ACT.sell=d=>{const r=sellRes(d.r,d.n==='all'?1e9:+d.n);res(r,'💰 Satıldı');};
ACT.craft=d=>{
  const k=d.k,n=+d.n,I=ITEMS[k],c=itemCost(k,n),m=S.me;
  if(I.needs&&!hasB('A',I.needs))return msg(`${BUILD[I.needs].n} binası gerekli (devlette).`);
  if(m.money<c.money)return msg('Yetersiz para.');
  for(const r of RES)if(c[r]&&m.stor[r]<c[r])return msg(`Yetersiz ${RES_N[r]}.`);
  m.money-=c.money;RES.forEach(r=>{if(c[r])m.stor[r]-=c[r];});
  m.crafts=(m.crafts||0)+1;
  const last=m.craftQ.length?m.craftQ[m.craftQ.length-1].end:S.t;m.craftQ.push({k:k,n:n,start:last,end:last+I.time*n});
  L(`🔧 ${n} ${I.n} üretime alındı (${fmtDur(I.time*n)}).`,'info');
};
ACT.facBuild=d=>{
  const r=myReg(),res0=d.r,m=S.me;
  if(r.res[res0].m<=0)return msg('Bu bölgede bu kaynak yok.');
  if((res0==='uranium'||res0==='diamonds')&&levelB(r,'power')<1)return msg('Bu bölgede Enerji Santrali olmalı.');
  if(m.facs.some(f=>f.region===r.id&&f.res===res0))return msg('Bu bölgede bu kaynak için zaten fabrikan var.');
  if(m.facs.length>=6)return msg('En fazla 6 fabrika.');
  const c=facCost(res0,1);if(m.stor.gold<c.gold||m.money<c.money)return msg(`Gerekli: ${c.gold} altın + ${fmt(c.money)}₺`);
  m.stor.gold-=c.gold;m.money-=c.money;m.facs.push({id:S.seq++,res:res0,region:r.id,owner:r.state,level:1,stock:0});
  L(`🏭 ${r.n}: özel ${RES_N[res0]} fabrikası kuruldu.`,'ok');
};
ACT.facUp=d=>{
  const f=S.me.facs.find(x=>x.id===+d.id),m=S.me;if(!f||f.level>=10)return;
  const c=facCost(f.res,f.level+1);if(m.stor.gold<c.gold||m.money<c.money)return msg(`Gerekli: ${c.gold} altın + ${fmt(c.money)}₺`);
  m.stor.gold-=c.gold;m.money-=c.money;f.level++;msg('Fabrika yükseltildi.','ok');
};
ACT.facCollect=d=>{
  const f=S.me.facs.find(x=>x.id===+d.id);if(!f)return;
  const ok=addStor(f.res,f.stock);f.stock-=ok;msg(`+${f1(ok)} ${RES_N[f.res]} depoya alındı.`,'ok');
};
ACT.travel=d=>{
  const m=S.me,to=+d.to,r=S.regions[to];
  if(m.travel)return msg('Zaten yoldasın.');
  if(r.moon){if(!hasB('A','spaceport'))return msg('Ay için Uzay Üssü gerekli (devlet kanunuyla).');}
  const h=r.moon?3:hopsTo(m.loc,to);if(h>=99)return msg('Yol yok.');
  const cost=r.moon?20000:500*h;if(m.money<cost)return msg(`Yol ücreti ${fmt(cost)}₺.`);
  if(S.regions[to].state!=='A'&&relTo('A',r.state)<-70)return msg('Sınır kapalı (ilişkiler çok kötü).');
  m.money-=cost;m.travel={to:to,start:S.t,arrive:S.t+(r.moon?2*HOUR:h*20*MIN)};
  L(`🧳 ${r.n} bölgesine yola çıktın (${fmtDur(m.travel.arrive-S.t)}).`,'info');
};
ACT.resid=()=>{
  const m=S.me,r=myReg();if(m.travel)return msg('Yoldasın.');if(m.res===r.id)return msg('Zaten buradasın.');
  if(r.moon)return msg('Ay üssünde ikamet edilemez.');
  if(r.state!=='A'&&relTo('A',r.state)<-30)return msg('Bu devletle ilişkiler kötü; ikamet verilmez.');
  m.res=r.id;m.resSince=S.t;L(`🏠 ${r.n} bölgesine yerleştin. (Anavatan bonusu için 6 saat beklemelisin.)`,'ok');
};
ACT.createParty=()=>{
  const m=S.me,n=($('partyName')||{}).value||'';
  if(m.party)return msg('Zaten bir partidesin.');if(m.level<10)return msg('Parti kurmak için seviye 10 gerekli.');
  if(n.trim().length<3)return msg('Parti adı yaz.');if(m.money<20000)return msg('Yetersiz para (20.000₺).');
  m.money-=20000;A().parties.push({id:'me',n:n.trim().slice(0,28),supp:1,pref:{},members:1});m.party='me';m.partyLead=true;
  L(`🗳️ "${n.trim()}" partisini kurdun.`,'ok');
};
ACT.joinParty=d=>{const m=S.me;if(m.party)return msg('Önce partinden ayrıl.');if(m.level<5)return msg('Seviye 5 gerekli.');m.party=d.p;m.partyLead=false;L('🗳️ Bir partiye katıldın.','ok');};
ACT.leaveParty=()=>{const m=S.me,a=A();if(m.party==='me'){a.parties=a.parties.filter(p=>p.id!=='me');}m.party=null;m.partyLead=false;L('Partiden ayrıldın.','info');};
ACT.campaign=()=>{
  const m=S.me,p=myParty();if(!p)return msg('Önce bir partiye gir.');if(S.t<m.lastCamp+HOUR)return msg(`Kampanya için ${fmtDur(m.lastCamp+HOUR-S.t)} bekle.`);
  if(m.money<10000)return msg('Yetersiz para (10.000₺).');m.money-=10000;m.lastCamp=S.t;
  p.supp+=0.4+m.level*0.01;L(`📣 Kampanya yaptın: ${p.n} desteği arttı (%${f1(p.supp)}).`,'ok');
};
ACT.vote=d=>{const a=A();if(!a.election)return msg('Şu an seçim yok.');if(S.me.level<5)return msg('Oy için seviye 5 gerekli.');S.me.votedFor=d.p;msg('Oyun kaydedildi.','ok');};
ACT.lawkind=d=>{};
ACT.propose=()=>{
  const k=UI.lawKind,g={},v=id=>{const e=$(id);return e?e.value:'';};
  if(S.me.level<5)return msg('Kanun teklifi için seviye 5 gerekli.');
  if(k==='tax'){['inc','gold','oil','ore','uranium','diamonds'].forEach(x=>g[x]=+v('lw_'+x));if(Object.values(g).some(x=>isNaN(x)||x<0||x>40))return msg('Oranlar 0–40 arasında olmalı.');}
  else if(k==='build'){g.region=+v('lw_region');g.b=v('lw_b');}
  else if(k==='explore'||k==='deep'){g.region=+v('lw_region');g.res=v('lw_res');}
  else if(k==='transfer'){g.res=v('lw_res');g.amt=+v('lw_amt');if(!(g.amt>0))return msg('Miktar gir.');}
  else if(k==='war'){g.region=+v('lw_region');g.type=v('lw_type');if(isNaN(g.region))return msg('Hedef seç.');}
  else if(k==='treaty'){g.state=v('lw_state');g.kind=v('lw_kind');}
  else if(k==='gov'){g.to=v('lw_to');if(g.to==='dictatorship'&&!isLeader())return msg('Diktatör olmak için önce seçimle başkan olmalısın.');}
  else if(k==='autonomy'){g.region=+v('lw_region');}
  if(S.laws.some(l=>l.status==='pending'&&l.kind===k&&JSON.stringify(l.args)===JSON.stringify(g)))return msg('Bu teklif zaten oylamada.');
  proposeLaw(k,g,'me');
};
ACT.lobby=d=>{
  const l=S.laws.find(x=>x.id===+d.id);if(!l||l.status!=='pending')return;
  if((l.lobbyN||0)>=3)return msg('En fazla 3 lobi yapılabilir.');if(S.me.money<20000)return msg('Yetersiz para (20.000₺).');
  S.me.money-=20000;l.lobby=(l.lobby||0)+0.08;l.lobbyN=(l.lobbyN||0)+1;msg('Lobi yapıldı: milletvekillerinin desteği arttı.','ok');
};
ACT.minister=d=>{if(!isLeader())return msg('Yalnızca başkan bakan atayabilir.');const a=A();a.min[d.m]=a.min[d.m]==='me'?null:'me';msg(a.min[d.m]==='me'?'Kendini atadın.':'Görevden alındın.','ok');};
ACT.hit=d=>{const r=doHit(+d.w,d.item||null);if(typeof r==='string')return msg(r);msg(`💥 ${fmt(r)} hasar!`,'ok');};
ACT.hitAll=d=>{let n=0,tot=0;while(n<30){const r=doHit(+d.w,d.item||null);if(typeof r==='string'){if(!n)msg(r);break;}tot+=r;n++;}if(n)msg(`💥 ${n} vuruş, toplam ${fmt(tot)} hasar.`,'ok');};
ACT.declare=()=>{
  const rid=+($('wRegion')||{}).value,type=($('wType')||{}).value;if(isNaN(rid))return msg('Hedef seç.');
  const a=A();
  if(S.t<S.protectUntil&&!confirm('Savaş ilan edersen acemilik korumasını kaybedersin. Devam?'))return;
  if(isLeader()){const l=proposeLaw('war',{region:rid,type:type},'me');if(l.status==='failed')msg('Savaş ilanı başarısız (bütçe/koşul).');}
  else proposeLaw('war',{region:rid,type:type},'me');
};
ACT.paperCreate=()=>{
  const m=S.me,n=($('paperName')||{}).value||'';if(m.paper)return msg('Zaten gazeten var.');if(n.trim().length<3)return msg('Gazete adı yaz.');
  if(m.stor.gold<10)return msg('Yetersiz altın (10).');m.stor.gold-=10;m.paper={name:n.trim().slice(0,28),subs:10,last:0,posts:0};L(`📰 "${n.trim()}" gazetesini kurdun.`,'ok');
};
ACT.paperPost=()=>{
  const m=S.me,p=m.paper;if(!p)return;if(S.t<p.last+HOUR)return msg(`Yeni makale için ${fmtDur(p.last+HOUR-S.t)} bekle.`);
  const add=Math.round(15+m.level*2+perk('edu')*0.3);p.subs+=add;p.last=S.t;p.posts++;addXP(5);
  msg(`📰 Makale yayınlandı: +${add} abone (toplam ${fmt(p.subs)}).`,'ok');
};
ACT.save=()=>{save();msg('Kaydedildi','ok');};
ACT.reset=()=>{if(!confirm('Tüm ilerleme silinecek. Emin misiniz?'))return;localStorage.removeItem(SAVE);S=newState();S.live=true;UI.tab='char';render();};

/* ================= ARAYÜZ ================= */
const TABS=[['char','👤 Karakter'],['work','⛏️ Çalış'],['store','🏦 Depo/Pazar'],['craft','🔧 Üretim'],['map','🗺️ Bölgeler'],['world','🌍 Dünya'],['state','🏛️ Devlet'],['party','🗳️ Parti'],['war','⚔️ Savaş'],['paper','📰 Gazete'],['mkt','🛒 Oyuncu Pazarı'],['lb','🏆 Sıralama'],['chat','💬 Sohbet'],['log','📜 Günlük'],['net','🌐 Online']];
function toast(m,c){const t=document.createElement('div');t.className='toast '+(c||'');t.textContent=m;$('toasts').appendChild(t);setTimeout(()=>t.remove(),4200);}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const cd=end=>`<b data-cd="${end}">${fmtDur(end-S.t)}</b>`;
const pb=(a,b)=>`<div class="bar"><div data-pb="${a},${b}" style="width:${clamp((S.t-a)/(b-a)*100,0,100)}%"></div></div>`;
const card=(t,body,cls)=>`<div class="card ${cls||''}"><h3>${t}</h3>${body}</div>`;
const btn=(label,attrs,cls,dis)=>`<button class="act ${cls||''}" ${dis?'disabled':''} ${attrs}>${label}</button>`;
const sel=(id,opts,val)=>`<select id="${id}">${opts.map(o=>`<option value="${o[0]}" ${String(o[0])===String(val)?'selected':''}>${esc(o[1])}</option>`).join('')}</select>`;
const roleName=()=>isLeader()?(A().gov==='dictatorship'?'👑 Diktatör':'🎖️ Başkan'):(A().min.econ==='me'?'💼 Ekonomi Bakanı':(A().min.foreign==='me'?'🌐 Dışişleri Bakanı':'Vatandaş'));

const GROUPS=[
  ['home','🏠 Ana',[['char','Karakter'],['work','Çalış'],['craft','Üretim'],['quest','Görevler']]],
  ['eco','💰 Ekonomi',[['store','Depo'],['mkt','Oyuncu Pazarı']]],
  ['world','🌍 Dünya',[['world','Harita'],['sw','Ortak'],['map','Bölgeler'],['war','Savaş']]],
  ['pol','🏛️ Siyaset',[['state','Devlet'],['party','Parti'],['paper','Gazete']]],
  ['soc','👥 Sosyal',[['chat','Sohbet'],['lb','Sıralama']]],
  ['menu','⚙️ Menü',[['guide','Rehber'],['log','Günlük'],['net','Hesap']]]];
const groupOf=t=>GROUPS.find(g=>g[2].some(x=>x[0]===t))||(t==='adm'?['adm','👑 Yönetici',[['adm','Panel']]]:GROUPS[0]);
function renderNav(){
  const all=(MP.role==='admin'?[['adm','👑 Yönetici',[['adm','Panel']]]]:[]).concat(GROUPS);
  const qb=(typeof questBadge==='function')?questBadge():0;const cg=groupOf(UI.tab),unread=(typeof CHAT!=='undefined')?((CHAT.unread||0)+(CHAT.dmUnread||0)):0;
  let h=all.map(g=>`<button class="${g[0]===cg[0]?'active':''}" data-a="tab" data-t="${g[0]===cg[0]?UI.tab:g[2][0][0]}"><i>${g[1].split(' ')[0]}</i>${g[1].split(' ').slice(1).join(' ')}${g[0]==='home'&&qb?` <span class="owner" style="background:#da3633;color:#fff">${qb}</span>`:''}${g[0]==='soc'&&unread?` <span class="owner" style="background:#da3633;color:#fff">${unread}</span>`:''}</button>`).join('');
  if(cg[2].length>1)h+=`<div class="subnav">${cg[2].map(t=>`<button class="${UI.tab===t[0]?'on':''}" data-a="tab" data-t="${t[0]}">${t[1]}${t[0]==='quest'&&qb?` <span class="owner" style="background:#da3633;color:#fff">${qb}</span>`:''}${t[0]==='chat'&&unread?` <span class="owner" style="background:#da3633;color:#fff">${unread}</span>`:''}</button>`).join('')}</div>`;
  $('nav').innerHTML=h;
}
function alerts(){
  const a=[],m=S.me;
  S.wars.filter(w=>w.state!=='done'&&(w.att==='A'||w.def==='A')).forEach(w=>{
    const t=w.state==='prep'?`başlamasına ${cd(w.start)}`:`bitmesine ${cd(w.end)}`;
    a.push(`<div class="al bad">⚔️ <b>${S.regions[w.region].n}</b> (${WTYPE[w.type]}): ${nameOf(w.att)} → ${nameOf(w.def)} — ${t} ${w.state==='on'?`<button class="act sm danger" data-a="tab" data-t="war">Savaşa git</button>`:''}</div>`);});
  if(A().election)a.push(`<div class="al info">🗳️ Seçim sürüyor! Bitişine ${cd(A().election.end)} — <button class="act sm blue" data-a="tab" data-t="party">Oy ver</button></div>`);
  const homeTab=['char','work','craft','quest'].includes(UI.tab);
  if(homeTab&&S.t<S.protectUntil)a.push(`<div class="al info">🛡️ Acemilik koruması: ${cd(S.protectUntil)} (kimse devletine saldıramaz)</div>`);
  if(S.ann&&S.ann.m)a.push(`<div class="al info">📣 <b>Duyuru:</b> ${esc(S.ann.m)}</div>`);
  if(S.evt&&S.evt.until>S.t)a.push(`<div class="al warn">🎉 ${EVT[S.evt.k].n}: bitişine ${cd(S.evt.until)}</div>`);
  if(homeTab&&!m.learn)a.push(`<div class="al warn">📚 Öğrenme boşta! Karakter sekmesinden bir perk geliştir.</div>`);
  if(m.travel)a.push(`<div class="al info">🧳 Yoldasın: ${S.regions[m.travel.to].n}, varışa ${cd(m.travel.arrive)}</div>`);
  if(typeof swAlerts==='function')swAlerts().forEach(x=>a.push(x));
  $('alerts').innerHTML=a.join('');
}
function bar(v,max,color){return `<div class="bar"><div style="width:${clamp(v/max*100,0,100)}%;background:${color||'#f0c040'}"></div></div>`;}

function tutCard(){
  if(S.tut||S.me.level>=4)return '';
  return `<div class="card" style="border-color:#f0c040;margin-bottom:10px"><h3>👋 Hoş geldin! Nasıl başlanır?</h3>
  <p>1) <b>Çalış</b> sekmesinde bir kaynak seç ve çalış: para ve altın kazanırsın.<br>2) <b>Karakter</b>'de bir yeteneği geliştirmeye başla (öğrenme arka planda sürer).<br>3) <b>Ekonomi</b>'de kaynaklarını sat, <b>Siyaset</b>'ten partiye katıl.<br>4) <b>Sosyal</b>'de sohbet et, sıralamaya bak.</p>
  ${btn('Anladım, gizle','data-a="tutOff"','gold')}</div>`;
}
ACT.tutOff=()=>{S.tut=1;};
function tabChar(){
  const m=S.me,hr=homeReg();
  let h=tutCard()+`<div class="panel"><h2>👤 Karakter</h2><div class="grid">
  ${card('Seviye <span data-live="level"></span>',bar(m.xp,xpNeed(m.level))+`<p>XP ${fmt(m.xp)} / ${fmt(xpNeed(m.level))}</p><p>${roleName()}${m.party?` · ${esc(myParty()?myParty().n:'')}`:''}</p>`)}
  ${card('⚡ Enerji','<div class="big"><span data-live="energy"></span></div><p>Saatte +30 (100\'e kadar). İçecekle üstü korunur.</p>'+btn('Enerji içeceği (2 altın) +50','data-a="drink"','gold')) }
  ${card('📍 Konum',`<p>Bulunduğun: <b>${esc(myReg().n)}</b> (${nameOf(myReg().state)})</p><p>İkamet: <b>${esc(hr.n)}</b> · ${fmtDur(S.t-m.resSince)}</p><p class="dim">Eğitim indeksi ${hr.idx.e} (öğrenme hızı)${levelB(hr,'library')?` · Kütüphane ${levelB(hr,'library')}`:''}</p>`)}
  </div></div>
  <div class="panel"><h2>📈 Yetenekler (aynı anda biri öğrenilir)</h2><div class="grid">`;
  for(const k in PERKS){
    const v=perk(k),boosted=v!==m[k],lr=m.learn&&m.learn.perk===k;
    const tm=learnTimeMs(k,false),tg=learnTimeMs(k,true);
    h+=card(`${PERKS[k]}: <b>${v}</b>${boosted?` <small class="ok">(+100 güçlendirici)</small>`:''}`,
      `<p class="dim">${PERK_D[k]}</p>`+(lr?`<p>Öğreniliyor → ${m[k]+1}: ${cd(m.learn.end)}</p>${pb(m.learn.start,m.learn.end)}`:
      `<div class="btns">${btn(`Para: ${fmt(learnCost(k,false))}₺<br><small>${fmtDur(tm)}</small>`,`data-a="learn" data-p="${k}" data-g="0"`,'',m.learn||m.money<learnCost(k,false))}
      ${btn(`Altın: ${learnCost(k,true)}<br><small>${fmtDur(tg)}</small>`,`data-a="learn" data-p="${k}" data-g="1"`,'gold',m.learn||m.stor.gold<learnCost(k,true))}</div>`));
  }
  h+=`</div></div><div class="panel"><h2>💪 Güçlendirici (+100 puan)</h2><div class="card">`;
  if(m.boost&&m.boost.end>S.t)h+=`<p>Aktif: ${PERKS[m.boost.perk]} +100 — ${cd(m.boost.end)}</p>`;
  else if(S.t<m.boostCd)h+=`<p class="dim">Yeniden kullanılabilir: ${cd(m.boostCd)}</p>`;
  else h+=Object.keys(PERKS).map(k=>`<div class="btns"><b style="min-width:110px">${PERKS[k]}</b>${btn('2 saat · 30.000₺',`data-a="boost" data-p="${k}" data-g="0"`,'',m.money<30000)}${btn('20 saat · 25 altın',`data-a="boost" data-p="${k}" data-g="1"`,'gold',m.stor.gold<25)}</div>`).join('');
  h+=`</div></div><div class="panel"><h2>📊 Değerler</h2><div class="card"><table>
  <tr><td>Üretim bonusu</td><td class="num">%${f1(craftBonus())} maliyet indirimi</td></tr>
  <tr><td>İş başına enerji</td><td class="num">${energyCost()}</td></tr>
  <tr><td>Depo kapasitesi</td><td class="num">${fmt(storCap())} (kaynak başına)</td></tr>
  <tr><td>Savaş vuruşu (eşyasız)</td><td class="num">${fmt(hitDamage(null))} hasar</td></tr>
  <tr><td>Rütbe</td><td class="num">${rankName()} <small class="dim">(${fmt(m.dmg||0)} hasar)</small></td></tr>
  <tr><td>Toplam vuruş / iş</td><td class="num">${m.hits} / ${m.works}</td></tr></table></div></div>`;
  return h;
}

function tabWork(){
  const m=S.me,r=myReg();
  let h=`<div class="panel"><h2>⛏️ Çalış — ${esc(r.n)}</h2><p class="hint">Kamu fabrikalarında altın, petrol ve maden çıkarırsın. Uranyum ve elmas yalnızca <b>özel fabrikada</b> üretilir (Üretim sekmesi). Her iş ${energyCost()} enerji harcar. Üretim vergisi devlet bütçesine gider.</p>`;
  if(m.travel)h+='<div class="al info">Yoldasın; çalışamazsın.</div>';
  if(r.moon)h+='<div class="al warn">Ay üssünde kamu fabrikası yok.</div>';
  h+='<div class="grid">';
  ['gold','oil','ore'].forEach(k=>{
    const x=r.res[k],amt=workAmount(k,r),tax=stateTax(r.state,k);
    const dis=m.travel||r.moon||x.c<=0||m.energy<energyCost()||!regionAllows(r);
    h+=card(`${RES_I[k]} ${RES_N[k]}`,`<p>İş başına ≈ <b>${f1(amt*(1-tax))}</b> (vergi %${Math.round(tax*100)})</p><p>Rezerv: <b>${f1(x.c)}</b> / ${f1(x.m)}${x.dm?` <small class="ok">(derin arama +${x.dm})</small>`:''}</p>${bar(x.c,Math.max(1,x.m),'#3fb950')}<p class="dim">Piyasa: ${fmt(S.prices[k])}₺</p>
      <div class="btns">${btn('Çalış',`data-a="work" data-r="${k}" data-n="1"`,'',dis)}${btn('×5',`data-a="work" data-r="${k}" data-n="5"`,'',dis)}${btn('Tüm enerji',`data-a="workAll" data-r="${k}"`,'gold',dis)}</div>`);
  });
  h+=`</div>${UI.lastWork?`<p class="ok" style="margin-top:8px">${esc(UI.lastWork)}</p>`:''}`;
  h+=`<div class="card" style="margin-top:10px"><h3>Bu bölgedeki özel kaynaklar</h3><p>${['uranium','diamonds'].map(k=>`${RES_I[k]} ${RES_N[k]}: ${f1(r.res[k].c)}/${f1(r.res[k].m)}`).join(' · ')}</p></div></div>`;
  return h;
}

function tabStore(){
  const m=S.me;
  let h=`<div class="panel"><h2>🏦 Depo</h2><div class="card"><p>Para: <b><span data-live="money"></span></b> · Kaynak başına kapasite: ${fmt(storCap())}</p><table>`;
  RES.forEach(k=>{const p=S.prices[k];
    h+=`<tr><td>${RES_I[k]} ${RES_N[k]}<br><small class="dim">${fmt(p)}₺ <span class="${p>=PRICE0[k]?'bad':'ok'}">(${p>=PRICE0[k]?'▲':'▼'}${Math.abs(Math.round((p/PRICE0[k]-1)*100))}%)</span></small></td>
    <td class="num"><b data-live="st_${k}"></b></td><td>${btn('Al 10',`data-a="buy" data-r="${k}" data-n="10"`)} ${btn('Al 100',`data-a="buy" data-r="${k}" data-n="100"`)}
    ${btn('Sat 10',`data-a="sell" data-r="${k}" data-n="10"`,'gold')} ${btn('Hepsi',`data-a="sell" data-r="${k}" data-n="all"`,'gold')}</td></tr>`;});
  h+=`</table><p class="hint">Alış: piyasa +%10, satış: piyasa −%10. Fiyatlar 10 dakikada bir değişir; büyük işlemler fiyatı oynatır.</p></div></div>
  <div class="panel"><h2>🎒 Eşyalar</h2><div class="card"><p>${Object.keys(ITEMS).map(k=>`${ITEMS[k].i} ${ITEMS[k].n}: <b>${m.items[k]}</b>`).join(' · ')}</p></div></div>`;
  if(typeof invPanel==='function')h+=invPanel();
  return h;
}

function tabCraft(){
  const m=S.me;
  let h=`<div class="panel"><h2>🔧 Eşya üretimi</h2><p class="hint">Üretim maliyeti güç ve eğitim ile %${f1(craftBonus())} düşer. Eşyalar savaşta vuruşlara ek hasar verir (her vuruşta 1 adet harcanır).</p><div class="grid">`;
  Object.keys(ITEMS).forEach(k=>{
    const I=ITEMS[k],c=itemCost(k,1);
    const need=I.needs&&!hasB('A',I.needs);
    const can=!need&&m.money>=c.money&&RES.every(r=>!c[r]||m.stor[r]>=c[r]);
    h+=card(`${I.i} ${I.n} <span class="owner">${WTYPE[I.type]}</span>`,`<p>Hasar +${I.dmg*40} · Stok: <b>${m.items[k]}</b></p><p class="dim">${fmt(c.money)}₺${RES.filter(r=>c[r]).map(r=>` · ${c[r]} ${RES_N[r]}`).join('')} · ${fmtDur(I.time)}</p>${need?`<p class="bad">${BUILD[I.needs].n} gerekli</p>`:''}
      <div class="btns">${btn('×1',`data-a="craft" data-k="${k}" data-n="1"`,'',!can)}${btn('×5',`data-a="craft" data-k="${k}" data-n="5"`,'',!can||m.money<c.money*5)}</div>`);
  });
  h+='</div>';
  if(m.craftQ.length){h+='<h2 style="margin-top:12px">⏳ Üretim sırası</h2>';m.craftQ.forEach(b=>{h+=`<div class="q">${b.n} ${ITEMS[b.k].n} — ${cd(b.end)}${pb(b.start,b.end)}</div>`;});}
  h+=`</div><div class="panel"><h2>🏭 Özel fabrikalar</h2><p class="hint">Altınla kurulur; saatte kaynak üretir (uranyum/elmas için bölgede Enerji Santrali gerekir). Üretimin %10'u (veya yasadaki oran) bölge devletine vergi gider. Depoya el ile toplarsın.</p>`;
  const r=myReg();
  h+=`<div class="card"><h3>Yeni fabrika — ${esc(r.n)}</h3><div class="btns">${RES.map(k=>{const c=facCost(k,1);return btn(`${RES_I[k]} ${RES_N[k]}<br><small>${c.gold} altın + ${fmt(c.money)}₺</small>`,`data-a="facBuild" data-r="${k}"`,'',r.res[k].m<=0||r.moon);}).join('')}</div></div>`;
  m.facs.forEach(f=>{const rg=S.regions[f.region],c=facCost(f.res,f.level+1),rate=facRate(f);
    h+=`<div class="card"><h3>${RES_I[f.res]} ${RES_N[f.res]} fabrikası — ${esc(rg.n)} <span class="owner">sv ${f.level}</span></h3><p>Hız ≈ ${f1(rate)}/sa · Stok: <b>${f1(f.stock)}</b> (en çok ${f1(rate*24)})${rg.state!==f.owner?' <b class="bad">bölge el değiştirdi</b>':''}</p>
      <div class="btns">${btn('Depoya al',`data-a="facCollect" data-id="${f.id}"`,'',f.stock<=0)}${btn(`Yükselt (${c.gold} altın + ${fmt(c.money)}₺)`,`data-a="facUp" data-id="${f.id}"`,'gold',f.level>=10)}</div></div>`;});
  return h+'</div>';
}

function tabMap(){
  const m=S.me;
  let h=`<div class="panel"><h2>🗺️ Dünya haritası</h2><p class="hint">İndeksler: ❤️ sağlık · 🎖️ askeri · 🎓 eğitim · 🏘️ gelişmişlik (1–11). Rezerv: şimdiki/en çok. Gezmek yol ücreti ve süre ister.</p>`;
  ['A','K','D','G','B','O'].forEach(s=>{
    const regs=regOf(s);if(!regs.length)return;
    h+=`<h2 style="margin-top:12px">${s==='A'?'🏠 ':''}${nameOf(s)} <span class="dim">(${regs.length} bölge${s!=='A'?` · ilişki ${Math.round(relTo('A',s))}`:''})</span></h2><div class="grid">`;
    regs.forEach(r=>{
      const here=m.loc===r.id,home=m.res===r.id;
      const bl=Object.keys(r.b).filter(k=>r.b[k]>0).map(k=>`${BUILD[k].i}${r.b[k]}`).join(' ');
      const hops=hopsTo(m.loc,r.id);
      h+=card(`${esc(r.n)} ${here?'📍':''}${home?'🏠':''}${r.auto?' <span class="owner">özerk</span>':''}`,
        `<p>❤️${r.idx.h} 🎖️${r.idx.m} 🎓${r.idx.e} 🏘️${r.idx.d}${r.coast?' · 🌊 kıyı':''}${r.moon?' · 🌙 Ay':''}</p>
        <p class="dim">${RES.filter(k=>r.res[k].m>0).map(k=>`${RES_I[k]}${fmt(r.res[k].c)}/${fmt(r.res[k].m)}`).join(' ')||'Kaynak yok'}</p>
        <p>${bl||'<span class="dim">Bina yok</span>'}${r.bq.length?` · ⏳ ${BUILD[r.bq[0].b].n} ${cd(r.bq[0].end)}`:''}</p>
        <div class="btns">${here?btn('🏠 Buraya yerleş',`data-a="resid"`,'',home||r.moon):btn(`🧳 Git (${r.moon?'2sa':hops*20+'dk'})`,`data-a="travel" data-to="${r.id}"`,'',!!m.travel||hops>=99&&!r.moon)}</div>`,here?'glow':'');
    });
    h+='</div>';
  });
  return h+'</div>';
}

function lawFormFields(){
  const k=UI.lawKind,a=A();
  const regs=(sts)=>S.regions.filter(r=>sts.includes(r.state)).map(r=>[r.id,`${r.n} (${nameOf(r.state)})`]);
  const own=regs(['A']);
  if(k==='tax')return ['inc','gold','oil','ore','uranium','diamonds'].map(x=>`<label>${x==='inc'?'Gelir':RES_N[x]} %<input type="number" id="lw_${x}" min="0" max="40" value="${a.tax[x]}"></label>`).join(' ');
  if(k==='build')return sel('lw_region',own)+sel('lw_b',Object.keys(BUILD).map(b=>[b,`${BUILD[b].i} ${BUILD[b].n} — ${BUILD[b].d}`]));
  if(k==='explore'||k==='deep')return sel('lw_region',own)+sel('lw_res',RES.map(r=>[r,RES_N[r]]));
  if(k==='transfer')return sel('lw_res',[['money','Para'],...RES.map(r=>[r,RES_N[r]])])+`<input type="number" id="lw_amt" min="1" placeholder="Miktar">`;
  if(k==='war'){const t=[];S.regions.forEach(r=>{if(r.state!=='A')warTypes('A',r).forEach(ty=>t.push([r.id+'|'+ty,r]));});
    return `<p class="hint">Hedef ve tür aşağıdaki Savaş sekmesinde seçilir.</p>`;}
  if(k==='treaty')return sel('lw_state',AI_S.filter(s=>s!=='O').map(s=>[s,nameOf(s)]))+sel('lw_kind',[['mil','Askeri anlaşma (+ilişki, saldırmazlık)'],['mig','Göç anlaşması'],['emb','Ambargo']]);
  if(k==='gov')return sel('lw_to',[['dictatorship','Diktatörlük (%80 oy gerekir)'],['republic','Cumhuriyet']]);
  if(k==='autonomy')return sel('lw_region',own);
  return '';
}
function tabState(){
  const a=A(),m=S.me,seats=seatsOf();
  let h=`<div class="panel"><h2>🏛️ ${nameOf('A')}</h2><div class="grid">
  ${card('Yönetim',`<p>${GOVS[a.gov]}</p><p>Başkan: <b>${esc(a.leader)}</b>${a.rulingParty?` <span class="owner">${esc((a.parties.find(p=>p.id===a.rulingParty)||{n:''}).n)}</span>`:''}</p><p>Sen: <b>${roleName()}</b></p><p class="dim">${a.gov==='dictatorship'?'Kanunlar anında çıkar. Seçim yok; halk ayaklanabilir.':`Sonraki seçim: ${a.election?'şimdi':cd(a.nextElection)}`}</p>`)}
  ${card('💰 Bütçe',`<p>${fmt(a.budget.money)}₺</p><p class="dim">${RES.map(k=>`${RES_I[k]} ${f1(a.budget[k])}`).join(' · ')}</p>`)}
  ${card('📊 Vergiler',`<p>Gelir %${a.tax.inc}</p><p class="dim">${RES.map(k=>`${RES_I[k]} %${a.tax[k]}`).join(' ')}</p>`)}
  ${card('👥 Bakanlar',`<p>Ekonomi: ${a.min.econ==='me'?'<b>Sen</b>':'Yapay zekâ'}<br>Dışişleri: ${a.min.foreign==='me'?'<b>Sen</b>':'Yapay zekâ'}</p>${isLeader()?`<div class="btns">${btn(a.min.econ==='me'?'Ekonomiden ayrıl':'Ekonomi bakanı ol','data-a="minister" data-m="econ"')}${btn(a.min.foreign==='me'?'Dışişlerinden ayrıl':'Dışişleri bakanı ol','data-a="minister" data-m="foreign"')}</div>`:'<p class="dim">Başkan atar.</p>'}`)}
  </div></div>
  <div class="panel"><h2>📜 Kanun teklifi</h2><div class="card"><p class="hint">Kanunlar 1 saat incelenir; meclis oyuyla (>%50) kabul edilir. Diktatörlük %80 ister. Başkan/bakan kendi alanındaki kanunları anında geçirir. Lobi (20.000₺) oyları artırır.</p>
  ${sel('lawKind',Object.keys(LAW_K).map(k=>[k,LAW_K[k]]),UI.lawKind).replace('<select','<select data-chg="lawKind"')}
  <div class="row">${lawFormFields()}</div>${UI.lawKind==='war'?'':btn('Teklif ver','data-a="propose"','blue')}</div>`;
  const pend=S.laws.filter(l=>l.status==='pending'),done=S.laws.filter(l=>l.status!=='pending').slice(0,8);
  h+=`<h2 style="margin-top:12px">Oylamadaki kanunlar</h2>`;
  if(!pend.length)h+='<p class="dim">Yok.</p>';
  pend.forEach(l=>{const s=lawSupport(l);h+=`<div class="q">${esc(l.txt)}<br><small>${l.by==='me'?'Senin teklifin':'Meclis'} · tahmini destek %${Math.round(s.pct*100)} · oylama ${cd(l.end)}</small> ${btn('Lobi (20.000₺)',`data-a="lobby" data-id="${l.id}"`,'gold sm')}</div>`;});
  h+=`<h2 style="margin-top:12px">Son kanunlar</h2>`;
  done.forEach(l=>{h+=`<div class="q ${l.status==='failed'?'bad':''}">${l.status==='passed'?'✅':'❌'} ${esc(l.txt)}${l.pro?` (%${l.pro})`:''}</div>`;});
  h+=`</div><div class="panel"><h2>🌐 Dış ilişkiler</h2><div class="grid">`;
  AI_S.filter(s=>regOf(s).length).forEach(s=>{
    h+=card(nameOf(s),`<p>İlişki: <b class="${relTo('A',s)>=0?'ok':'bad'}">${Math.round(relTo('A',s))}</b> · Güç ${fmt(powerOf(s))}</p><p class="dim">${a.treaty.mil[s]>S.t?'🤝 Askeri anlaşma '+fmtDur(a.treaty.mil[s]-S.t)+' · ':''}${a.treaty.mig[s]>S.t?'🧳 Göç anlaşması · ':''}${a.treaty.emb[s]>S.t?'⛔ Ambargo':''}</p>`);});
  return h+'</div></div>'+(typeof govPanel==='function'?govPanel():'');
}

function tabParty(){
  const a=A(),m=S.me,seats=seatsOf();
  let h=`<div class="panel"><h2>🗳️ Meclis (${a.gov==='dictatorship'?'feshedildi':a.parlSize+' sandalye'})</h2>`;
  if(a.election)h+=`<div class="al info">Seçim sürüyor — bitişine ${cd(a.election.end)}. ${m.votedFor?'Oyun: '+esc((a.parties.find(p=>p.id===m.votedFor)||{n:''}).n):'Oy vermedin.'}</div>`;
  else if(a.gov!=='dictatorship')h+=`<p class="hint">Sonraki seçim: ${cd(a.nextElection)} (her 24 saatte bir; 2 saat sürer).</p>`;
  h+='<div class="grid">';
  a.parties.slice().sort((x,y)=>y.supp-x.supp).forEach(p=>{
    const tot=a.parties.reduce((x,y)=>x+y.supp,0);
    h+=card(`${esc(p.n)} ${p.id===a.rulingParty?'<span class="owner">iktidar</span>':''}${p.id===m.party?' <span class="owner">partin</span>':''}`,
     `<p>Destek %${f1(p.supp/tot*100)} · Sandalye <b>${seats[p.id]||0}</b></p>${bar(p.supp,tot,p.id==='me'?'#58a6ff':'#f0c040')}
      <div class="btns">${a.election?btn('🗳️ Oy ver',`data-a="vote" data-p="${p.id}"`,'blue',m.level<5):''}${!m.party&&p.id!=='me'?btn('Katıl',`data-a="joinParty" data-p="${p.id}"`,'',m.level<5):''}</div>`);
  });
  h+='</div></div><div class="panel"><h2>🚩 Partin</h2><div class="card">';
  if(m.party){const p=myParty();h+=`<p><b>${esc(p?p.n:'')}</b> ${m.partyLead?'(lideri sensin)':''}</p><p class="dim">Kampanya (10.000₺, saatte bir) desteği artırır. Gazete aboneleri seçimde ek destek sağlar. Partin birinci olur ve lideri sensen <b>başkan</b> olursun.</p>
    <div class="btns">${btn('📣 Kampanya yap',`data-a="campaign"`,'blue')}${btn('Partiden ayrıl',`data-a="leaveParty"`,'danger')}</div>`;}
  else h+=`<p class="hint">Parti kurmak için seviye 10 ve 20.000₺ gerekir; mevcut partiye katılmak için seviye 5.</p><div class="row"><input type="text" id="partyName" placeholder="Parti adı" maxlength="28" style="flex:1;padding:8px;background:#06090d;color:#c9d1d9;border:1px solid #2a3542;border-radius:5px">${btn('Parti kur (20.000₺)','data-a="createParty"','gold',m.level<10)}</div>`;
  return h+'</div></div>';
}

function tabWar(){
  const m=S.me,a=A();
  let h=`<div class="panel"><h2>⚔️ Savaşlar</h2><p class="hint">Savaş 20 dk hazırlıkla başlar, 3 saat sürer. Her vuruş 10 enerji harcar; eşya vuruşa ek hasar katar. Süre bitince daha çok hasar veren taraf kazanır; kazanan saldırgan bölgeyi alır. Savunan taraf %25 avantajlıdır; son bölge asla düşmez.</p>`;
  const mine=S.wars.filter(w=>w.state!=='done'&&(w.att==='A'||w.def==='A')),others=S.wars.filter(w=>w.state!=='done'&&w.att!=='A'&&w.def!=='A');
  if(!mine.length)h+='<p class="dim">Devletin şu an savaşta değil. Aşağıdaki antrenman savaşıyla pratik yapabilirsin.</p>';
  const warCard=(w,fight)=>{
    const r=S.regions[w.region],tot=w.dA+w.dD||1;
    let c=`<p>${nameOf(w.att)} → ${nameOf(w.def)} · ${WTYPE[w.type]} · ${w.state==='prep'?'başlamasına '+cd(w.start):'bitişine '+cd(w.end)}</p>
      <div class="bar2"><div data-war="${w.id}" style="width:${w.dA/tot*100}%"></div></div><p class="dim"><span data-wl="${w.id}">${fmt(w.dA)} / ${fmt(w.dD)}</span> (saldırgan / savunan)${w.mine?` · senin katkın ${fmt(w.mine)}`:''}</p>`;
    if(fight&&w.state==='on'){
      const items=Object.keys(ITEMS).filter(k=>ITEMS[k].type===w.type&&m.items[k]>0);
      c+=`<div class="btns">${btn(`💥 Vur (${fmt(hitDamage(null))})`,`data-a="hit" data-w="${w.id}"`,'danger')}${btn('Tüm enerji',`data-a="hitAll" data-w="${w.id}"`,'danger')}
      ${items.map(k=>btn(`${ITEMS[k].i} ${ITEMS[k].n} ×${m.items[k]} (${fmt(hitDamage(k))})`,`data-a="hit" data-w="${w.id}" data-item="${k}"`,'purple')).join('')}</div>`;}
    return card(`${esc(r.n)} ${w.att==='A'?'<span class="owner">saldırıyoruz</span>':w.def==='A'?'<span class="owner">savunuyoruz</span>':''}`,c,w.state==='on'&&(w.att==='A'||w.def==='A')?'glow':'');};
  h+='<div class="grid">'+mine.map(w=>warCard(w,true)).join('')+'</div>';
  // ilan formu
  const cand=[];S.regions.forEach(r=>{if(r.state!=='A'&&!r.moon){const t=warTypes('A',r);if(t.length)cand.push([r.id,`${r.n} (${nameOf(r.state)}) — ${t.map(x=>WTYPE[x]).join('/')}`]);}else if(r.moon){const t=warTypes('A',r);if(t.length)cand.push([r.id,`${r.n} — Ay`]);}});
  const selR=UI.wRegion!==undefined?UI.wRegion:(cand[0]&&cand[0][0]);
  const reg=S.regions[selR],types=reg?warTypes('A',reg):[];
  h+=`<h2 style="margin-top:12px">📣 Savaş ilanı</h2><div class="card">`;
  if(!cand.length)h+='<p class="dim">Saldırılabilir bölge yok. Komşu bölge gerekir (kara); havalimanı/liman/uzay üssü yapılırsa yeni türler açılır.</p>';
  else{h+=`<div class="row">${sel('wRegion',cand,selR).replace('<select','<select data-chg="wRegion"')}${sel('wType',types.map(t=>[t,WTYPE[t]]))}</div>
    <p class="dim">Maliyet: 50.000₺ + 3 altın (devlet bütçesi). ${isLeader()?'Başkan olduğun için anında ilan edilir.':'Başkan değilsen meclis oylar (Devlet sekmesi).'} Saldırgan olursan acemilik korumasını kaybedersin.</p>${btn('⚔️ Savaş ilan et','data-a="declare"','danger')}`;}
  h+='</div>';
  if(others.length){h+='<h2 style="margin-top:12px">🌍 Dünyadaki savaşlar</h2><div class="grid">'+others.map(w=>warCard(w,false)).join('')+'</div>';}
  if(typeof trPanel==='function')h+=trPanel();
  return h+'</div>';
}

function tabPaper(){
  const m=S.me,p=m.paper;
  let h=`<div class="panel"><h2>📰 Gazete</h2>`;
  if(!p)h+=`<div class="card"><p class="hint">Gazete kur (10 altın); makale yayınla, abone kazan. Aboneler seçimde partine destek olur (200 abone ≈ %1).</p><div class="row"><input type="text" id="paperName" placeholder="Gazete adı" maxlength="28" style="flex:1;padding:8px;background:#06090d;color:#c9d1d9;border:1px solid #2a3542;border-radius:5px">${btn('Kur (10 altın)','data-a="paperCreate"','gold')}</div></div>`;
  else h+=`<div class="card"><h3>${esc(p.name)}</h3><p>Abone: <b>${fmt(p.subs)}</b> · Makale: ${p.posts}</p><p class="dim">${S.t<p.last+HOUR?'Yeni makale: '+cd(p.last+HOUR):'Makale yazabilirsin.'}</p>${btn('✍️ Makale yayınla','data-a="paperPost"','',S.t<p.last+HOUR)}</div>`;
  h+=`<h2 style="margin-top:12px">🗞️ Dünya haberleri</h2><div class="log tall">${S.news.map(n=>`<div>[${fmtT(n.t)}] ${esc(n.m)}</div>`).join('')||'<div class="dim">Haber yok.</div>'}</div></div>`;
  return h;
}
function tabLog(){
  return `<div class="panel"><h2>📜 Günlük</h2><div class="log tall">${S.log.map(l=>`<div class="${l.c}">[${fmtT(l.t)}] ${esc(l.m)}</div>`).join('')||'<div class="dim">Boş.</div>'}</div>
  <div class="btns" style="margin-top:10px">${btn('💾 Kaydet','data-a="save"')}${btn('🗑️ Sıfırla','data-a="reset"','danger')}</div>
  <p class="hint">Oyun gerçek zamanlıdır ve sayfa kapalıyken de ilerler (en fazla 3 gün). Otomatik kaydedilir. Cihaza özeldir.</p></div>`;
}

function render(){
  renderNav();alerts();
  const fn={char:tabChar,work:tabWork,store:tabStore,craft:tabCraft,map:tabMap,state:tabState,party:tabParty,war:tabWar,paper:tabPaper,log:tabLog,net:tabNet,adm:tabAdm,world:tabWorld,chat:tabChat,mkt:tabMkt,lb:tabLb,quest:tabQuest,sw:tabSW,guide:tabGuide}[UI.tab];
  const keep={},act=document.activeElement&&document.activeElement.id;
  $('main').querySelectorAll('input[id],select[id]').forEach(e=>{keep[e.id]=e.value;});
  $('main').innerHTML=(typeof isBanned==='function'&&isBanned())?banScreen():fn();
  for(const id in keep){const e=$(id);if(e&&$('main').contains(e)&&e.tagName!=='SELECT'||(e&&e.tagName==='SELECT'&&[...e.options].some(o=>o.value===keep[id])))e.value=keep[id];}
  if(act&&$(act)&&$('main').contains($(act)))$(act).focus();
  if(typeof afterRender==='function')afterRender();
  tickUI();
}
function liveVals(){
  const m=S.me,o={energy:fmt(m.energy)+'/100',money:fmt(m.money)+'₺',level:m.level};
  RES.forEach(k=>o['st_'+k]=f1(m.stor[k]));return o;
}
function tickUI(){
  if(typeof lbTimer==='function')lbTimer();
  if(typeof questTick==='function')questTick();
  if(typeof socialTick==='function')socialTick();
  if(UI.tab==='world'&&typeof wmDraw==='function')wmDraw();
  const v=liveVals(),m=S.me;
  $('hMoney').textContent=v.money;$('hEn').textContent=fmt(m.energy);$('hLvl').textContent=m.level;
  $('hGold').textContent=f1(m.stor.gold);$('hLoc').textContent=myReg().n;$('hDay').textContent='Gün '+(flr((S.t-S.startT)/DAY)+1);
  document.querySelectorAll('[data-live]').forEach(e=>{const k=e.dataset.live;if(v[k]!==undefined)e.textContent=v[k];});
  document.querySelectorAll('[data-cd]').forEach(e=>{e.textContent=fmtDur(+e.dataset.cd-S.t);});
  document.querySelectorAll('[data-pb]').forEach(e=>{const[a,b]=e.dataset.pb.split(',').map(Number);e.style.width=clamp((S.t-a)/(b-a)*100,0,100)+'%';});
  document.querySelectorAll('[data-war]').forEach(e=>{const w=S.wars.find(x=>x.id===+e.dataset.war);if(w){const t=w.dA+w.dD||1;e.style.width=(w.dA/t*100)+'%';
    const l=document.querySelector(`[data-wl="${w.id}"]`);if(l)l.textContent=fmt(w.dA)+' / '+fmt(w.dD);}});
}
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-a]');if(!b||b.disabled)return;
  const f=ACT[b.dataset.a];if(!f)return;
  f(b.dataset);S.dirty=true;
  if(!['save','reset'].includes(b.dataset.a))save();
  if(S.dirty){S.dirty=false;render();}
});
document.addEventListener('change',e=>{
  const c=e.target.dataset&&e.target.dataset.chg;if(!c)return;
  if(c==='lawKind')UI.lawKind=e.target.value;if(c==='wRegion')UI.wRegion=+e.target.value;
  render();
});

/* ================= BAŞLAT ================= */
function offlineModal(since,secs){
  const items=S.log.filter(l=>l.t>since).reverse();
  $('modal-root').innerHTML=`<div class="modal"><div class="box"><h3>⏰ Siz yokken (${fmtDur(secs*1000)})</h3><div class="log tall">${items.map(l=>`<div class="${l.c}">[${fmtT(l.t)}] ${esc(l.m)}</div>`).join('')||'<div class="dim">Önemli bir şey olmadı.</div>'}</div><button class="act" onclick="this.closest('.modal').remove()">Tamam</button></div></div>`;
}
function init(){
  MP.loadCfg();S=load()||newState();S.adm=S.adm||{claimed:{},collected:0};S.bots=S.bots||[];if(typeof botMigrate==='function')botMigrate();S.me.taxPaid=S.me.taxPaid||0;
  const real=Date.now(),away=clamp(real-(S.savedReal||real),0,OFFLINE_CAP);
  S.live=false;const since=S.t;
  if(away>2*MIN)advance(S.t+away);
  S.live=true;S.savedReal=real;
  if(away>2*MIN)offlineModal(since,away/1000);
  S.dirty=false;render();
  let last=Date.now();
  setInterval(()=>{const n=Date.now(),dt=(n-last)*SPEED;last=n;advance(S.t+dt);
    if(S.dirty){S.dirty=false;render();}else{tickUI();alerts();}},1000);
  setInterval(save,10000);mpWrap();if(MP.cfg)MP.connect();setInterval(()=>MP.sync(),15000);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)save();});
  window.addEventListener('pagehide',save);
}
/* ================= DÜNYA HARİTASI (sadeleştirilmiş kıyı çizgileri, boylam,enlem) ================= */
const GP=s=>{const a=s.trim().split(/[\s,]+/).map(Number),o=[];for(let i=0;i<a.length;i+=2)o.push([a[i],a[i+1]]);return o;};
const LAND=[
// Avrasya
GP(`-5.6 36.0 -6.3 36.8 -7.4 37.2 -8.9 37.0 -8.8 38.5 -9.5 38.8 -8.8 40.5 -8.9 42.0 -9.3 43.0 -8.0 43.7 -5.8 43.6 -1.8 43.4 -1.2 44.6 -1.2 46.2 -2.3 47.2 -4.5 47.8 -4.7 48.5 -3.0 48.8 -1.6 48.7 -1.2 49.7 0.2 49.4 1.6 50.2 2.5 51.1 4.0 51.8 4.8 53.0 6.8 53.5 8.5 53.6 8.6 55.0 8.1 56.8 10.6 57.7 10.3 56.2 9.8 55.0 10.9 54.0 12.5 54.4 14.2 53.9 16.5 54.5 18.6 54.7 19.8 54.5 21.0 55.2 21.1 56.8 22.5 57.7 24.3 57.2 24.4 58.4 23.5 59.2 24.9 59.5 28.0 59.5 29.8 60.0 28.5 60.5 26.0 60.4 23.0 59.9 21.4 60.7 21.5 61.5 21.3 63.0 25.3 65.0 25.4 65.5 24.0 65.8 22.2 65.6 21.5 64.5 19.0 63.2 17.2 62.0 17.2 60.7 18.8 60.0 18.9 59.4 17.5 58.7 16.7 57.2 16.2 56.3 14.4 55.4 12.9 55.4 12.6 56.2 11.8 57.7 11.1 59.0 10.6 59.6 9.0 58.7 7.0 58.1 5.6 58.9 5.2 61.0 5.0 62.1 6.8 62.9 9.2 63.7 10.9 64.8 12.5 66.0 14.3 67.5 16.0 68.7 18.5 69.5 21.0 70.0 25.0 71.1 28.0 71.0 31.0 70.4 33.0 69.4 36.0 69.1 40.0 67.8 41.0 66.5 38.0 66.1 34.5 66.7 33.0 66.2 34.7 64.3 37.0 63.9 40.0 64.6 44.0 66.2 44.2 68.3 46.5 67.7 50.0 68.0 53.5 68.4 59.0 68.7 60.5 69.8 66.0 69.2 68.5 68.2 68.0 70.5 72.5 72.8 75.0 72.0 73.0 69.5 77.0 68.5 80.0 72.0 84.0 73.5 88.0 75.0 95.0 76.0 104.0 77.7 112.0 76.0 113.5 74.0 125.0 73.5 130.0 71.0 140.0 72.5 150.0 71.5 160.0 69.8 170.0 70.0 180 69.0 180 65.5 178.0 64.5 177.0 62.5 173.0 61.5 170.0 60.0 166.0 60.0 163.0 59.0 163.0 57.0 162.0 56.0 162.5 54.5 160.0 53.0 158.5 52.8 156.7 51.0 156.0 53.0 155.8 56.0 155.0 59.0 160.0 61.0 156.0 61.5 152.0 59.5 148.5 59.3 143.0 59.3 138.0 56.5 135.0 54.7 137.5 53.7 140.5 53.5 141.4 52.2 140.5 50.0 140.0 48.5 138.5 46.0 135.5 43.8 133.0 42.7 131.0 42.6 129.7 41.0 129.5 40.0 128.0 38.5 129.4 37.0 129.4 35.3 127.0 34.5 126.3 34.7 126.5 36.5 125.0 37.8 125.0 39.4 122.5 39.0 121.5 40.0 120.0 40.0 118.0 39.0 117.5 38.5 119.0 37.2 122.5 37.3 122.0 36.8 120.5 36.0 119.0 34.5 121.0 32.2 122.0 31.2 121.8 29.5 120.5 27.5 119.5 25.5 117.5 23.5 114.5 22.3 111.0 21.5 110.0 20.8 108.5 21.8 106.7 20.5 105.8 19.0 107.0 16.5 108.8 15.0 109.4 12.0 109.0 11.0 107.0 10.4 105.0 8.6 104.8 10.0 103.0 10.6 102.5 12.2 100.9 13.4 100.0 13.4 99.2 10.0 100.3 8.4 101.3 6.8 103.4 4.8 103.5 2.5 104.2 1.4 103.4 1.3 101.5 2.8 100.4 5.2 98.5 8.2 98.3 10.5 98.5 13.0 97.7 16.5 95.5 15.7 94.5 16.2 94.3 19.0 92.5 20.8 91.8 22.2 90.5 22.0 88.0 21.6 86.5 20.2 85.0 19.5 83.0 17.5 81.5 16.0 80.3 13.5 80.2 10.5 79.8 10.2 79.2 9.2 78.2 8.9 77.5 8.1 76.5 9.0 75.5 11.8 74.8 13.0 73.5 16.0 72.8 19.0 72.7 21.5 70.5 20.8 69.0 22.3 70.0 23.0 68.5 23.7 67.0 24.8 64.0 25.2 61.5 25.2 58.5 25.6 57.3 26.8 56.3 27.1 54.5 26.6 52.5 27.5 51.0 29.0 50.2 30.2 48.6 29.9 48.0 30.0 47.8 29.0 48.5 28.0 49.5 27.0 50.5 26.0 51.2 24.6 51.6 25.5 52.5 24.2 54.5 24.5 56.0 26.0 56.4 24.8 58.5 23.8 59.8 22.4 58.5 20.4 57.5 19.0 55.5 17.5 52.2 15.9 49.0 14.4 45.0 12.8 43.4 12.7 43.0 14.5 42.7 16.5 41.0 19.5 39.0 22.5 37.5 25.0 35.5 28.0 35.0 29.5 34.2 31.3 35.0 32.8 35.9 34.2 36.0 35.8 35.5 36.8 34.0 36.2 32.5 36.1 30.5 36.4 29.0 36.7 27.5 37.0 27.2 38.3 26.3 39.5 26.2 40.0 26.1 40.6 24.5 40.8 23.7 40.2 22.9 40.5 23.3 39.3 22.9 38.5 24.0 38.0 23.2 36.5 22.5 36.5 21.7 37.0 21.2 38.3 20.4 39.5 19.5 41.0 19.4 42.3 18.5 42.6 17.0 43.5 15.5 44.5 14.5 45.2 13.7 45.5 12.4 45.3 12.5 44.2 13.6 43.5 14.2 42.2 15.8 41.9 16.2 41.3 18.5 40.2 17.2 40.4 16.5 39.0 15.7 38.0 15.8 40.0 14.0 41.2 12.3 41.8 11.0 42.5 10.2 43.7 8.8 44.4 7.5 43.8 6.2 43.1 4.8 43.4 3.2 43.2 3.1 42.2 1.0 41.2 0.0 39.8 -0.5 38.3 -1.5 37.5 -2.2 36.7 -4.4 36.7`),
// Afrika
GP(`-5.3 35.8 -3.0 35.3 -1.5 35.1 0.0 35.8 2.5 36.8 5.0 36.8 8.0 37.0 9.8 37.3 10.5 36.8 11.0 36.5 10.3 35.6 11.1 35.2 10.2 34.0 11.5 33.1 13.0 32.9 15.2 32.4 15.7 31.4 18.5 30.2 20.0 31.0 20.1 32.2 21.5 32.9 23.0 32.6 25.0 31.7 28.0 31.1 30.5 31.4 32.3 31.3 34.2 31.3 34.9 29.5 34.3 27.9 33.6 28.4 32.6 29.9 33.6 27.5 34.9 25.5 35.8 23.5 37.0 21.0 37.2 18.8 38.5 18.0 39.5 15.5 41.0 14.0 42.5 12.8 43.2 11.8 44.0 10.5 47.0 11.2 51.2 11.8 51.0 10.4 49.5 6.5 48.0 4.5 45.5 2.0 43.0 -0.5 41.5 -2.0 40.0 -4.0 39.0 -6.0 38.8 -7.8 39.5 -10.0 40.5 -11.0 40.5 -14.5 40.7 -16.0 36.0 -18.5 35.0 -20.5 35.4 -23.5 33.0 -25.5 32.8 -26.5 32.5 -28.5 31.0 -30.0 29.0 -32.0 27.0 -33.5 25.5 -34.0 23.0 -34.0 20.0 -34.8 18.5 -34.0 18.2 -32.0 17.2 -30.0 15.0 -27.0 14.5 -23.0 12.0 -18.5 11.8 -16.0 13.5 -12.5 13.5 -10.5 12.2 -6.0 12.3 -5.0 9.8 -2.5 9.3 -0.5 9.5 1.0 9.8 3.5 8.5 4.5 6.5 4.3 5.0 5.3 2.5 6.3 0.5 5.8 -2.0 4.8 -4.5 5.2 -7.5 4.4 -9.5 5.5 -12.5 7.5 -13.5 9.5 -15.0 11.0 -16.8 12.5 -17.5 14.7 -16.5 17.5 -16.0 20.0 -17.0 21.0 -16.0 23.5 -14.5 26.0 -13.0 28.0 -10.0 29.5 -9.8 31.0 -9.5 32.5 -7.0 34.0 -5.9 35.8`),
// Kuzey Amerika
GP(`-168.0 65.6 -164.0 66.5 -162.0 68.0 -156.5 71.3 -150.0 70.5 -141.0 69.7 -135.0 69.0 -128.0 70.0 -122.0 69.5 -115.0 68.0 -108.0 68.0 -100.0 67.8 -96.0 68.0 -94.5 71.0 -91.0 69.5 -86.0 68.0 -82.5 69.0 -81.0 67.0 -86.5 66.0 -87.5 64.0 -90.5 62.5 -93.0 61.0 -94.5 59.0 -92.5 57.0 -88.0 56.5 -82.5 55.0 -82.0 52.8 -79.5 51.5 -79.0 54.0 -77.5 55.5 -77.0 58.0 -78.0 60.0 -77.5 62.4 -73.0 62.0 -70.0 61.0 -69.0 59.0 -65.0 59.8 -64.5 57.5 -61.5 56.0 -60.0 54.0 -57.5 53.0 -55.5 51.5 -57.0 51.0 -59.5 50.2 -64.5 50.0 -67.5 49.0 -69.5 47.8 -65.5 48.8 -64.0 48.8 -64.5 46.5 -61.0 45.5 -60.0 46.0 -61.5 45.0 -63.5 44.5 -66.0 43.5 -67.0 44.8 -70.0 43.7 -70.7 42.5 -70.0 41.7 -72.0 41.2 -74.0 40.5 -74.0 39.0 -75.5 38.0 -76.0 36.8 -75.5 35.3 -77.5 34.5 -79.0 33.5 -81.0 32.0 -81.4 30.5 -80.5 28.0 -80.0 26.0 -80.5 25.2 -81.5 25.8 -82.5 27.5 -82.7 29.0 -84.0 30.0 -86.0 30.3 -88.0 30.4 -89.5 29.8 -91.0 29.3 -93.5 29.7 -95.5 28.7 -97.3 27.0 -97.5 25.0 -97.8 22.5 -97.2 20.5 -96.0 19.0 -94.5 18.2 -92.0 18.7 -91.0 19.0 -90.4 21.0 -87.0 21.5 -87.5 19.5 -88.2 16.5 -88.5 15.8 -84.0 15.8 -83.2 14.8 -83.6 12.0 -83.5 10.5 -82.0 9.0 -80.5 9.3 -79.0 9.5 -77.5 8.7 -77.3 7.5 -78.0 7.2 -80.0 7.4 -81.5 8.0 -83.0 8.3 -85.7 10.0 -87.0 13.0 -90.0 13.8 -92.5 14.5 -95.0 16.0 -97.0 15.8 -101.0 17.3 -105.0 19.5 -105.5 21.5 -106.5 23.5 -109.0 26.0 -112.0 29.0 -114.5 31.5 -116.5 32.5 -117.2 32.6 -120.5 34.4 -122.5 37.5 -124.2 40.3 -124.5 43.0 -124.0 46.2 -124.7 48.4 -125.5 50.0 -128.0 51.5 -130.0 54.0 -132.0 55.5 -135.0 57.5 -137.0 58.5 -140.0 59.7 -144.0 60.0 -148.0 60.5 -151.5 59.2 -154.0 58.5 -157.5 57.0 -162.0 55.0 -158.0 56.8 -157.5 58.5 -160.0 59.0 -162.0 59.8 -165.0 60.5 -165.0 62.5 -161.0 64.5 -166.0 64.5`),
// Güney Amerika
GP(`-77.3 8.0 -75.5 10.8 -72.0 12.2 -71.0 11.0 -70.0 12.2 -68.0 10.6 -64.0 10.6 -62.0 10.7 -61.0 8.5 -57.5 6.5 -55.0 5.8 -52.5 5.0 -51.0 3.5 -50.0 1.0 -50.0 -0.5 -47.5 -0.8 -44.5 -2.5 -41.0 -2.9 -38.0 -4.0 -35.2 -5.5 -35.0 -8.0 -37.0 -11.5 -39.0 -13.5 -39.2 -17.5 -40.5 -20.5 -42.0 -23.0 -44.0 -23.2 -46.5 -24.0 -48.5 -26.0 -48.8 -28.5 -50.5 -31.0 -52.5 -33.5 -54.8 -34.7 -56.5 -34.8 -58.5 -34.0 -57.0 -36.0 -57.5 -38.2 -62.0 -39.0 -62.5 -41.0 -65.0 -41.0 -64.5 -43.0 -65.5 -45.0 -67.5 -46.5 -66.0 -48.0 -68.5 -50.0 -69.0 -52.0 -68.5 -53.5 -66.5 -55.0 -71.0 -54.8 -74.0 -52.0 -75.5 -47.5 -74.5 -43.5 -73.5 -39.5 -73.5 -37.0 -71.5 -32.0 -71.5 -28.0 -70.5 -23.5 -70.2 -18.5 -72.0 -17.0 -76.0 -14.0 -77.5 -11.0 -79.5 -7.5 -81.2 -5.0 -80.0 -3.0 -80.7 -1.0 -80.0 0.5 -78.8 1.8 -77.5 4.0 -77.4 6.5`),
// Avustralya
GP(`113.5 -22.0 114.0 -26.5 115.0 -30.0 115.0 -33.5 118.0 -35.0 122.0 -34.0 126.0 -32.5 131.0 -31.5 134.0 -32.8 137.5 -35.0 138.0 -33.0 139.0 -34.8 140.5 -37.8 144.0 -38.4 146.5 -39.0 148.0 -37.8 150.0 -37.0 151.5 -33.5 153.0 -31.0 153.5 -28.0 153.0 -25.0 150.5 -22.5 149.0 -20.5 146.5 -19.0 145.5 -15.0 143.5 -14.0 142.5 -10.8 141.5 -13.0 141.5 -17.0 140.0 -17.7 137.0 -15.8 135.5 -14.7 136.5 -12.2 132.5 -11.5 130.5 -12.5 129.0 -14.8 127.0 -14.0 125.0 -15.5 123.5 -17.0 121.5 -19.5 118.5 -20.5 116.0 -20.7`),
// Grönland
GP(`-73.0 78.5 -68.0 80.0 -60.0 82.0 -45.0 83.0 -25.0 83.5 -18.0 81.5 -20.0 79.0 -19.0 76.0 -21.5 73.5 -22.0 70.5 -24.5 69.5 -32.0 68.0 -38.5 65.5 -41.0 63.0 -43.0 60.0 -47.0 60.8 -50.0 63.0 -53.5 66.5 -54.0 69.5 -56.0 71.5 -60.0 75.5 -68.0 76.5`),
// adalar
GP(`-80 73.5 -72 71 -68 69 -62 66.5 -64.5 63.5 -68 62.5 -72 64 -75 65.5 -77 67.5 -73 68.5 -80 70 -85 70 -89 72.5 -85 73.7`),
GP(`-118 73 -105 73 -101 69.5 -111 68.7 -118 70.5`),
GP(`-90 76.5 -78 76.5 -62 81.5 -75 83 -92 81 -96 77.5`),
GP(`-59.3 47.7 -56 51.6 -53.5 49.5 -52.7 47.5 -55.5 46.8`),
GP(`-85 21.9 -80 23.2 -74.2 20.2 -77.5 19.9 -80.5 22`),
GP(`-74.4 18.4 -72 19.8 -68.4 18.6 -71.5 17.8 -74.2 18.2`),
GP(`-24 65.5 -22 66.4 -16 66.3 -13.5 65 -18 63.4 -22.5 63.8`),
GP(`-5.7 50.1 -3 50.6 1.4 51.2 1.7 52.7 0.2 53.5 -0.2 54.5 -1.6 55.6 -2 57 -3.5 57.7 -4 58.6 -5.5 58.5 -5.8 57 -5.5 56 -4.8 55.2 -3.3 54.9 -3 53.4 -4.5 53.2 -4.2 52 -5.2 51.7 -3.2 51.4 -4.5 51`),
GP(`-10 51.7 -6 52.2 -6 53.7 -5.5 54.6 -7.5 55.2 -8.5 54.2 -10 53.5 -9.8 52.2`),
GP(`130.9 34 132.5 34.3 135 34.6 135.8 33.5 138 34.6 140 35 140.9 36.8 141.9 39.5 141.5 41.4 140 40 139.5 38 137 37 136 35.7 132.5 35.5 131 34.5`),
GP(`140 42 141.5 43.2 143.5 42.9 145.5 43.3 144 44 142 45.4 141.5 44 140.4 43.2`),
GP(`129.8 33 131 33.8 131.8 32.5 131 31.2 130.2 31.3 129.7 32.7`),
GP(`132.5 33.2 134 34.2 134.5 33.6 133 32.8`),
GP(`142 46 143.5 49 143.2 52.5 142 54.2 142 51`),
GP(`120.1 23 121 25.2 122 25 121 22`),
GP(`120.5 18.3 122.2 18.5 122 16 121.5 14 124 13 123 13.5 120.7 14.5`),
GP(`122 7 125.5 9.5 126.5 7 125.5 5.8 123 7.7`),
GP(`109 1.5 111 2 113 3.5 115 5 117.5 7 119 5.2 118 4 117.7 1 116 -3 114 -4 111 -3 110 -1.5 109 1`),
GP(`95.3 5.6 98 4 100 1.5 103.5 -1 106 -3.2 105.8 -5.8 103 -4 100.5 -2 98.5 0 97 2.8`),
GP(`105.2 -6.8 108 -6.5 111 -6.5 114.5 -7.8 114 -8.8 108 -7.8 106 -7.3`),
GP(`119.8 0.5 120.8 1.2 124.5 1.5 125 1.2 122.5 0.5 121.5 -1 123.3 -1 122 -3 122.5 -5 121 -4.5 120.5 -2.5 119.5 -3.5 118.8 -2.8 119.8 -0.5`),
GP(`131 -0.8 134 -1 137.5 -1.5 141 -2.6 145.5 -4.5 147.5 -6.2 150 -10.5 147 -10 144 -8 142.5 -9.3 140 -8 138 -8.3 137.8 -5.5 134.5 -4 132.5 -3.5 133 -2.2`),
GP(`79.8 9.8 81.8 7.5 81 6 80 6 79.7 8`),
GP(`144.7 -40.7 148.3 -40.9 148 -43.2 146 -43.6 145.2 -42`),
GP(`172.7 -34.5 175 -36.5 178.5 -37.7 177 -39.5 175.2 -41.5 174.5 -39.8 173.8 -39.2 174.7 -37`),
GP(`172.7 -40.5 174.2 -41.8 171.2 -44.5 169 -46.6 166.5 -46 168 -44 170.5 -42.5`),
GP(`49.3 -12 50.5 -15.5 49.5 -17.5 47.5 -24.5 44 -25 43.3 -22 44.4 -19.5 44 -16.8 46 -15.8 47.5 -14.8`),
GP(`11 79 17 80.2 27 80 22 77.5 16 76.6`),
GP(`51.5 71.5 55 70.7 58 71.5 62 75.5 68 77 63 76.3 56 74 53 72.5`),
GP(`32.3 35 33.5 35.4 34.5 35.7 34 34.9 32.8 34.6`),
GP(`23.5 35.3 26.3 35.2 26 35 24 35`),
GP(`12.5 38 15.6 38.3 15.1 36.7 13 37.5`),
GP(`8.2 41 9.7 40.9 9.6 39.2 8.5 39 8.4 40.3`),
GP(`-114.7 31.5 -115.8 30 -114.5 28.5 -112.5 26.5 -110.2 23 -109.5 23.3 -111 26 -112.8 28.5 -114.5 31`)
];
const WATER=[
GP(`28.0 41.1 29.2 41.2 31.5 41.2 33.0 42.0 35.0 42.0 36.8 41.3 38.5 40.9 40.0 41.0 41.5 41.5 41.6 42.5 40.0 43.5 38.0 44.5 37.5 45.2 36.0 45.0 35.3 45.1 33.5 44.5 32.5 45.4 33.7 46.0 31.5 46.5 30.5 45.8 29.7 45.3 28.7 44.0 28.0 43.0 27.8 42.0`),
GP(`47 45 49 46.5 51 47 53 46.5 53.2 45 51.2 44.5 50.5 44 52.5 42 53 40.5 53.8 39 53 37.2 51 36.6 50.2 37.5 49 38.5 49 40.5 50 40.5 49.5 41.5 47.8 43 47.2 44`)
];
// Doğal Dünya (Natural Earth 1) izdüşümü
function proj(lon,lat){
  const l=lon*Math.PI/180,p=lat*Math.PI/180,p2=p*p,p4=p2*p2;
  const x=l*(0.8707-0.131979*p2+p4*(-0.013791+p4*(0.003971*p2-0.001529*p4)));
  const y=p*(1.007226+p2*(0.015085+p4*(-0.044475+0.028874*p2-0.005916*p4)));
  return [x*160+500,-y*160+260];
}
const GEO_W=1000,GEO_H=520;
// bölge kimliği → [boylam, enlem] (ay üsleri için null)
const REG_LL=[[32.9,39.9],[35.4,37.1],[42.8,38.4],[30.7,36.9],[39.5,39.7],[30.3,59.9],[66,63],[60.6,56.8],[100,71],[52,35],[50,27.5],[67,39.6],[86,43],[31,30.8],[29,25.5],[43,17],[28,-26],[2.3,47.5],[-74,40.7],[-87.6,41.9],[-55,-10],null,null];
const MOON_XY=[[0.30,0.5],[0.70,0.5]]; // ay kutusu içi oransal konumlar
const GEO={land:null,water:null,pts:[],cells:[]};
function geoInit(){
  if(GEO.land)return;
  GEO.land=new Path2D();LAND.forEach(poly=>{poly.forEach((p,i)=>{const q=proj(p[0],p[1]);i?GEO.land.lineTo(q[0],q[1]):GEO.land.moveTo(q[0],q[1]);});GEO.land.closePath();});
  GEO.water=new Path2D();WATER.forEach(poly=>{poly.forEach((p,i)=>{const q=proj(p[0],p[1]);i?GEO.water.lineTo(q[0],q[1]):GEO.water.moveTo(q[0],q[1]);});GEO.water.closePath();});
  GEO.pts=REG_LL.map(ll=>ll?proj(ll[0],ll[1]):null);
  // Voronoi hücreleri (yarım düzlem kırpma)
  const ids=GEO.pts.map((p,i)=>p?i:-1).filter(i=>i>=0);
  GEO.cells=[];
  ids.forEach(i=>{
    let poly=[[0,0],[GEO_W,0],[GEO_W,GEO_H],[0,GEO_H]];const a=GEO.pts[i];
    ids.forEach(j=>{if(j===i||!poly.length)return;const b=GEO.pts[j];
      const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2,nx=b[0]-a[0],ny=b[1]-a[1];
      const d=p=>(p[0]-mx)*nx+(p[1]-my)*ny; // <=0: i tarafı
      const out=[];
      for(let k=0;k<poly.length;k++){const P=poly[k],Q=poly[(k+1)%poly.length],dp=d(P),dq=d(Q);
        if(dp<=0)out.push(P);
        if((dp<0&&dq>0)||(dp>0&&dq<0)){const t=dp/(dp-dq);out.push([P[0]+(Q[0]-P[0])*t,P[1]+(Q[1]-P[1])*t]);}}
      poly=out;});
    GEO.cells[i]=poly;});
}
/* ================= DÜNYA HARİTASI SEKMESİ ================= */
const SCOL={A:'#f0c040',K:'#4aa3ff',D:'#ff6b5e',G:'#3fb950',B:'#b48cff',O:'#7fe0e0'};
const WM={cv:null,ctx:null,w:0,h:0,dpr:1,sig:'',ptrs:new Map(),moved:0,pinch:0};
UI.wv={k:1,tx:0,ty:0,init:false};UI.wsel=null;
const MOONBOX=()=>({x:8,y:WM.h-62,w:132,h:54});
function wmInit(){
  if(WM.cv)return;
  const cv=document.createElement('canvas');cv.style.cssText='display:block;touch-action:none;width:100%;cursor:grab';
  WM.cv=cv;WM.ctx=cv.getContext('2d');
  cv.addEventListener('pointerdown',e=>{cv.setPointerCapture(e.pointerId);WM.ptrs.set(e.pointerId,{x:e.offsetX,y:e.offsetY});WM.moved=0;if(WM.ptrs.size===2)WM.pinch=wmPinchDist();});
  cv.addEventListener('pointermove',e=>{
    const p=WM.ptrs.get(e.pointerId);if(!p)return;const nx=e.offsetX,ny=e.offsetY;
    if(WM.ptrs.size===1){UI.wv.tx+=nx-p.x;UI.wv.ty+=ny-p.y;WM.moved+=Math.abs(nx-p.x)+Math.abs(ny-p.y);p.x=nx;p.y=ny;wmClamp();wmDraw(true);}
    else if(WM.ptrs.size===2){p.x=nx;p.y=ny;const d=wmPinchDist(),pts=[...WM.ptrs.values()];
      if(WM.pinch>0&&d>0)wmZoomAt((pts[0].x+pts[1].x)/2,(pts[0].y+pts[1].y)/2,d/WM.pinch);WM.pinch=d;WM.moved+=10;}});
  const up=e=>{const had=WM.ptrs.has(e.pointerId);WM.ptrs.delete(e.pointerId);
    if(had&&WM.ptrs.size===0&&WM.moved<8){const id=wmHit(e.offsetX,e.offsetY);if(id!==null){UI.wsel=id;S.dirty=true;render();}}};
  cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',e=>{WM.ptrs.delete(e.pointerId);});
  cv.addEventListener('wheel',e=>{e.preventDefault();wmZoomAt(e.offsetX,e.offsetY,e.deltaY<0?1.25:0.8);},{passive:false});
  window.addEventListener('resize',()=>{if(UI.tab==='world')wmFit();});
}
const wmPinchDist=()=>{const p=[...WM.ptrs.values()];return p.length<2?0:Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);};
function wmClamp(){const v=UI.wv,s=WM.w/1000*v.k;v.tx=clamp(v.tx,WM.w-1000*s-60,60);v.ty=clamp(v.ty,WM.h-GEO_H*s-60,60);}
function wmZoomAt(cx,cy,f){const v=UI.wv,nk=clamp(v.k*f,0.8,14),r=nk/v.k;v.tx=cx-(cx-v.tx)*r;v.ty=cy-(cy-v.ty)*r;v.k=nk;wmClamp();wmDraw(true);}
function wmView(mode){
  geoInit();const v=UI.wv,s0=WM.w/1000;
  if(mode==='all'){v.k=Math.max(1,WM.h/(430*s0));v.tx=(WM.w-1000*s0*v.k)/2;v.ty=-30*s0*v.k;}
  else{const p=GEO.pts[UI.wsel!==null&&GEO.pts[UI.wsel]?UI.wsel:0];v.k=3.2;v.tx=WM.w/2-p[0]*s0*v.k;v.ty=WM.h/2-p[1]*s0*v.k;}
  wmClamp();wmDraw(true);
}
function wmFit(){
  const wrap=$('wmWrap');if(!wrap||!WM.cv)return;
  const w=Math.max(280,Math.min(1100,wrap.clientWidth||340)),h=Math.round(Math.max(w*0.5,Math.min(w*1.1,360)));
  if(w===WM.w&&h===WM.h&&UI.wv.init){wmDraw(true);return;}
  WM.w=w;WM.h=h;WM.dpr=Math.min(2,window.devicePixelRatio||1);
  WM.cv.width=w*WM.dpr;WM.cv.height=h*WM.dpr;WM.cv.style.height=h+'px';
  if(!UI.wv.init){UI.wv.init=true;wmView('all');}else{wmClamp();wmDraw(true);}
}
function afterRender(){
  if(UI.tab!=='world')return;
  wmInit();const wrap=$('wmWrap');if(wrap){wrap.appendChild(WM.cv);wmFit();}
}
function wmPos(id){const p=GEO.pts[id],v=UI.wv,s=WM.w/1000*v.k;
  if(p)return [p[0]*s+v.tx,p[1]*s+v.ty];
  const b=MOONBOX(),f=MOON_XY[id-21];return [b.x+b.w*f[0],b.y+b.h*0.62];}
function wmHit(x,y){
  geoInit();let best=null,bd=22;
  S.regions.forEach(r=>{const q=wmPos(r.id),d=Math.hypot(q[0]-x,q[1]-y);if(d<bd){bd=d;best=r.id;}});
  return best;
}
function wmDraw(force){
  if(!WM.cv||!document.body.contains(WM.cv)||!WM.w)return;
  geoInit();
  const v=UI.wv,s=WM.w/1000*v.k;
  const agg=(typeof BOTAGG!=='undefined')?BOTAGG:{reg:[],st:{}};
  const sig=[S.regions.map(r=>r.state+(agg.reg[r.id]||0)).join(','),S.wars.filter(w=>w.state!=='done').map(w=>w.id+w.state[0]).join(','),UI.wsel,S.me.loc,S.me.res,(typeof SW!=='undefined'?SW.sig:''),v.k.toFixed(2),Math.round(v.tx),Math.round(v.ty),WM.w,WM.h].join('|');
  if(!force&&sig===WM.sig)return;WM.sig=sig;
  const c=WM.ctx,w=WM.w,h=WM.h;
  c.setTransform(WM.dpr,0,0,WM.dpr,0,0);c.fillStyle='#08121c';c.fillRect(0,0,w,h);
  // enlem/boylam ızgarası
  c.save();c.translate(v.tx,v.ty);c.scale(s,s);
  c.lineWidth=0.5/s;c.strokeStyle='#ffffff10';
  for(let lat=-60;lat<=80;lat+=20){c.beginPath();for(let lon=-180;lon<=180;lon+=10){const q=proj(lon,lat);lon===-180?c.moveTo(q[0],q[1]):c.lineTo(q[0],q[1]);}c.stroke();}
  for(let lon=-180;lon<=180;lon+=30){c.beginPath();for(let lat=-60;lat<=80;lat+=10){const q=proj(lon,lat);lat===-60?c.moveTo(q[0],q[1]):c.lineTo(q[0],q[1]);}c.stroke();}
  c.fillStyle='#1c2a37';c.fill(GEO.land);c.lineWidth=0.8/s;c.strokeStyle='#37506a';c.stroke(GEO.land);
  // etki alanları
  const R=95,ids=S.regions.filter(r=>GEO.pts[r.id]).map(r=>r.id);
  c.save();c.clip(GEO.land);
  ids.forEach(i=>{const cell=GEO.cells[i],p=GEO.pts[i];if(!cell||cell.length<3)return;
    c.save();c.beginPath();cell.forEach((q,k)=>k?c.lineTo(q[0],q[1]):c.moveTo(q[0],q[1]));c.closePath();c.clip();
    c.beginPath();c.arc(p[0],p[1],R,0,6.2832);c.fillStyle=(SCOL[S.regions[i].state]||'#888')+'8c';c.fill();c.restore();});
  // sınırlar
  ids.forEach(i=>{const cell=GEO.cells[i],p=GEO.pts[i];if(!cell)return;
    for(let k=0;k<cell.length;k++){const P=cell[k],Q=cell[(k+1)%cell.length],mx=(P[0]+Q[0])/2,my=(P[1]+Q[1])/2;
      if(Math.hypot(mx-p[0],my-p[1])>R)continue;
      let nx=-(Q[1]-P[1]),ny=Q[0]-P[0];const l=Math.hypot(nx,ny)||1;nx/=l;ny/=l;if(nx*(mx-p[0])+ny*(my-p[1])<0){nx=-nx;ny=-ny;}
      const tx=mx+nx*1.5,ty=my+ny*1.5;let bj=-1,bd=1e9;ids.forEach(j=>{const d=Math.hypot(GEO.pts[j][0]-tx,GEO.pts[j][1]-ty);if(d<bd){bd=d;bj=j;}});
      if(bj===i||bj<0)continue;
      const diff=S.regions[bj].state!==S.regions[i].state;
      c.beginPath();c.moveTo(P[0],P[1]);c.lineTo(Q[0],Q[1]);c.lineWidth=(diff?1.8:0.5)/s;c.strokeStyle=diff?'#ffffffcc':'#ffffff22';c.stroke();}});
  c.restore();
  c.fillStyle='#08121c';c.fill(GEO.water);c.lineWidth=0.6/s;c.strokeStyle='#37506a';c.stroke(GEO.water);
  // komşuluk çizgileri
  c.lineWidth=0.7/s;c.strokeStyle='#ffffff33';c.setLineDash([3/s,3/s]);
  EDGES.forEach(e=>{const a=GEO.pts[e[0]],b=GEO.pts[e[1]];if(a&&b){c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke();}});
  c.setLineDash([]);
  // savaş okları
  S.wars.filter(x=>x.state!=='done').forEach(x=>{const t=GEO.pts[x.region];if(!t)return;
    let bp=null,bd=1e9;regOf(x.att).forEach(r=>{const p=GEO.pts[r.id];if(p){const d=Math.hypot(p[0]-t[0],p[1]-t[1]);if(d<bd){bd=d;bp=p;}}});
    if(bp){c.beginPath();c.moveTo(bp[0],bp[1]);c.lineTo(t[0],t[1]);c.lineWidth=2/s;c.strokeStyle=x.state==='on'?'#ff3b30':'#ff9500';c.setLineDash([6/s,4/s]);c.stroke();c.setLineDash([]);}});
  c.restore();
  // devlet adları
  if(s<1.6){c.textAlign='center';c.font='bold 11px system-ui';
    Object.keys(STATE_N).forEach(st=>{const rs=regOf(st).filter(r=>GEO.pts[r.id]);if(!rs.length)return;
      let x=0,y=0;rs.forEach(r=>{const q=wmPos(r.id);x+=q[0];y+=q[1];});x/=rs.length;y/=rs.length;
      c.lineWidth=3;c.strokeStyle='#08121cdd';c.strokeText(STATE_N[st].split(' ')[0].toUpperCase(),x,y-16);c.fillStyle=SCOL[st];c.fillText(STATE_N[st].split(' ')[0].toUpperCase(),x,y-16);});}
  // ay kutusu
  const mb=MOONBOX();c.fillStyle='#0d1823';c.strokeStyle='#37506a';c.lineWidth=1;c.beginPath();c.roundRect?c.roundRect(mb.x,mb.y,mb.w,mb.h,8):c.rect(mb.x,mb.y,mb.w,mb.h);c.fill();c.stroke();
  c.fillStyle='#8b949e';c.font='10px system-ui';c.textAlign='left';c.fillText('🌙 AY',mb.x+8,mb.y+14);
  // işaretçiler
  S.regions.forEach(r=>{
    const [x,y]=wmPos(r.id);if(x<-30||y<-30||x>w+30||y>h+30)return;
    const pop=agg.reg[r.id]||0,rad=5+Math.min(8,Math.sqrt(pop)*0.22),sel=UI.wsel===r.id;
    const war=S.wars.some(q=>q.state!=='done'&&q.region===r.id);
    if(war){c.beginPath();c.arc(x,y,rad+5,0,6.2832);c.lineWidth=2;c.strokeStyle='#ff3b30';c.stroke();}
    c.beginPath();c.arc(x,y,rad,0,6.2832);c.fillStyle=SCOL[r.state]||'#888';c.fill();c.lineWidth=sel?3:1.5;c.strokeStyle=sel?'#ffffff':'#08121c';c.stroke();
    if(typeof SW!=='undefined'&&SW.regs[r.id]){const o=SW.regs[r.id].o;c.beginPath();c.moveTo(x,y-rad-2);c.lineTo(x,y-rad-14);c.lineWidth=1.5;c.strokeStyle='#fff';c.stroke();c.beginPath();c.moveTo(x,y-rad-14);c.lineTo(x+9,y-rad-10);c.lineTo(x,y-rad-6);c.closePath();c.fillStyle=swHue(o);c.fill();}
    if(S.me.res===r.id){c.beginPath();c.arc(x,y,rad+3,0,6.2832);c.lineWidth=1.5;c.strokeStyle='#ffffff';c.stroke();}
    if(S.me.loc===r.id){c.font='13px system-ui';c.textAlign='center';c.fillStyle='#fff';c.fillText('📍',x,y-rad-3);}
    if(s>=1.5||sel){const nm=r.moon?r.n.replace('Ay Üssü ',''):r.n;c.font='11px system-ui';c.textAlign='center';c.lineWidth=3;c.strokeStyle='#08121ccc';c.strokeText(nm,x,y+rad+12);c.fillStyle='#e6edf3';c.fillText(nm,x,y+rad+12);}
  });
}
function tabWorld(){
  const m=S.me,agg=(typeof BOTAGG!=='undefined')?BOTAGG:{reg:[],st:{},party:{}};
  const id=UI.wsel!==null?UI.wsel:m.loc,r=S.regions[id];
  let h=`<div class="panel"><h2>🌍 Dünya haritası — kim nereye hâkim</h2>
  <div id="wmWrap" style="border:1px solid #2a3542;border-radius:8px;overflow:hidden;background:#08121c"></div>
  <div class="btns"><button class="act sm" data-a="mapZoom" data-d="in">＋</button><button class="act sm" data-a="mapZoom" data-d="out">－</button><button class="act sm blue" data-a="mapZoom" data-d="all">🌍 Tüm dünya</button><button class="act sm gold" data-a="mapZoom" data-d="home">🎯 Seçili bölgeye yakınlaş</button></div>
  <p class="hint">Sürükle: kaydır · iki parmak / tekerlek: yakınlaş · bölgeye dokun: ayrıntı. Daire büyüklüğü o bölgedeki yapay zekâ nüfusunu, beyaz sınırlar devlet sınırlarını, kırmızı halka savaşı gösterir.</p>`;
  const bl=Object.keys(r.b).filter(k=>r.b[k]>0).map(k=>`${BUILD[k].i}${BUILD[k].n} ${r.b[k]}`).join(' · ')||'Bina yok';
  const here=m.loc===r.id,hops=hopsTo(m.loc,r.id);
  h+=`<div class="card glow"><h3>${esc(r.n)} <span class="owner" style="background:${SCOL[r.state]}33;color:${SCOL[r.state]}">${esc(nameOf(r.state))}</span></h3>
  <p>❤️${r.idx.h} 🎖️${r.idx.m} 🎓${r.idx.e} 🏘️${r.idx.d}${r.coast?' · 🌊 kıyı':''}${r.moon?' · 🌙 Ay':''} · Nüfus (yapay zekâ): <b>${fmt(agg.reg[r.id]||0)}</b></p>
  ${(typeof SW!=='undefined'&&SW.regs[r.id])?`<p>🏛️ Vali: <b style="color:${swHue(SW.regs[r.id].o)}">${esc(SW.regs[r.id].on)}</b></p>`:''}
  <p class="dim">${RES.filter(k=>r.res[k].m>0).map(k=>`${RES_I[k]}${fmt(r.res[k].c)}/${fmt(r.res[k].m)}`).join(' ')||'Kaynak yok'}</p><p>${bl}</p>
  <div class="btns">${here?btn('🏠 Buraya yerleş','data-a="resid"','',m.res===r.id||r.moon):btn(`🧳 Git (${r.moon?'2sa':hops*20+'dk'})`,`data-a="travel" data-to="${r.id}"`,'',!!m.travel||(hops>=99&&!r.moon))}</div></div>`;
  h+=`<h2 style="margin-top:12px">Devletler</h2><div style="overflow-x:auto"><table><tr><th align=left>Devlet</th><th>Bölge</th><th>Nüfus</th><th>Güç</th><th>Durum</th></tr>`;
  Object.keys(STATE_N).forEach(st=>{const rs=regOf(st);const wr=atWar(st);
    h+=`<tr><td><span style="color:${SCOL[st]}">●</span> ${esc(STATE_N[st])}${st==='A'?' (sen)':''}</td><td class="num">${rs.length}</td><td class="num">${fmt((agg.st[st]||{}).n||0)}</td><td class="num">${fmt(powerOf(st))}</td><td class="${wr.length?'bad':'dim'}">${rs.length?(wr.length?'⚔️ savaşta':'barış'):'yıkıldı'}</td></tr>`;});
  h+='</table></div>';
  const ps=A().parties.map(p=>[p,(agg.party||{})[p.id]||0]).filter(x=>x[1]>0);
  if(ps.length)h+=`<p class="hint">Anadolu'daki yapay zekâ vatandaşların parti dağılımı: ${ps.map(x=>`${esc(x[0].n)} ${fmt(x[1])}`).join(' · ')}</p>`;
  return h+'</div>';
}
ACT.mapZoom=d=>{
  if(!WM.w)return;
  if(d.d==='in')wmZoomAt(WM.w/2,WM.h/2,1.5);else if(d.d==='out')wmZoomAt(WM.w/2,WM.h/2,1/1.5);
  else wmView(d.d);
  S.dirty=false;
};

const RANKS=[[0,'Nefer'],[5e3,'Onbaşı'],[2e4,'Çavuş'],[8e4,'Teğmen'],[3e5,'Yüzbaşı'],[1e6,'Binbaşı'],[4e6,'Kaymakam'],[1.5e7,'Miralay'],[6e7,'Mirliva'],[2.5e8,'Ferik'],[1e9,'Müşir']];
function rankName(){const d=S.me.dmg||0;let n=RANKS[0][1];RANKS.forEach(r=>{if(d>=r[0])n=r[1];});return n;}
/* ================= ÇOK OYUNCULU / YÖNETİCİ (Firebase REST) ================= */
const MPK='rrmp_cfg';
const DEF_KEY='AIzaSyAIiq1id4NzzuYS8JXnIFaSfRjqutf8fIg',DEF_URL='https://oyun-f483d-default-rtdb.europe-west1.firebasedatabase.app';
const MP={cfg:null,auth:null,role:'player',owner:null,rate:5,ok:false,err:'',connecting:false,
  players:{},feed:[],sel:null,q:[],lastSync:0,busy:false};
const RULES_BLOCK=`    "rrgame": {
      "cfg": {
        ".read": "auth != null",
        "owner": { ".write": "auth != null && !data.exists() && newData.val() === auth.uid" },
        "taxRate": { ".write": "auth != null && root.child('rrgame/cfg/owner').val() === auth.uid" },
        "announce": { ".write": "auth != null && root.child('rrgame/cfg/owner').val() === auth.uid" },
        "event": { ".write": "auth != null && root.child('rrgame/cfg/owner').val() === auth.uid" },
        "season": { ".write": "auth != null && root.child('rrgame/cfg/owner').val() === auth.uid" }
      },
      "bans": {
        ".read": "auth != null && root.child('rrgame/cfg/owner').val() === auth.uid",
        "$uid": {
          ".read": "auth != null && auth.uid === $uid",
          ".write": "auth != null && root.child('rrgame/cfg/owner').val() === auth.uid"
        }
      },
      "players": {
        ".read": "auth != null && root.child('rrgame/cfg/owner').val() === auth.uid",
        "$uid": { ".write": "auth != null && auth.uid === $uid && !root.child('rrgame/bans/' + auth.uid + '/ban').exists()" }
      },
      "board": {
        ".read": "auth != null",
        ".write": "auth != null && root.child('rrgame/cfg/owner').val() === auth.uid",
        "$uid": { ".write": "auth != null && auth.uid === $uid && !root.child('rrgame/bans/' + auth.uid + '/ban').exists()" }
      },
      "feed": {
        ".read": "auth != null && root.child('rrgame/cfg/owner').val() === auth.uid",
        ".write": "auth != null"
      },
      "gifts": {
        "$uid": {
          ".read": "auth != null && auth.uid === $uid",
          "$g": { ".write": "auth != null && ((root.child('rrgame/cfg/owner').val() === auth.uid && !data.exists()) || (auth.uid === $uid && !newData.exists()))" }
        }
      },
      "chat": {
        ".read": "auth != null",
        ".write": "auth != null && root.child('rrgame/cfg/owner').val() === auth.uid",
        "$m": {
          ".write": "auth != null && ((!data.exists() && newData.child('uid').val() === auth.uid && !root.child('rrgame/bans/' + auth.uid + '/chat').exists() && !root.child('rrgame/bans/' + auth.uid + '/ban').exists()) || (data.exists() && !newData.exists() && root.child('rrgame/cfg/owner').val() === auth.uid))",
          ".validate": "newData.hasChildren(['u','m','t','uid']) && newData.child('m').isString() && newData.child('m').val().length > 0 && newData.child('m').val().length <= 200"
        }
      },
      "pchat": {
        "$pid": {
          ".read": "auth != null",
          "$m": {
            ".write": "auth != null && ((!data.exists() && newData.child('uid').val() === auth.uid && !root.child('rrgame/bans/' + auth.uid + '/chat').exists() && !root.child('rrgame/bans/' + auth.uid + '/ban').exists()) || (data.exists() && !newData.exists() && root.child('rrgame/cfg/owner').val() === auth.uid))",
            ".validate": "newData.hasChildren(['u','m','t','uid']) && newData.child('m').isString() && newData.child('m').val().length > 0 && newData.child('m').val().length <= 200"
          }
        }
      },
      "dm": {
        "$pair": {
          ".read": "auth != null && $pair.contains(auth.uid)",
          "$m": {
            ".write": "auth != null && $pair.contains(auth.uid) && !data.exists() && newData.child('uid').val() === auth.uid && !root.child('rrgame/bans/' + auth.uid + '/chat').exists() && !root.child('rrgame/bans/' + auth.uid + '/ban').exists()",
            ".validate": "newData.hasChildren(['u','m','t','uid']) && newData.child('m').isString() && newData.child('m').val().length > 0 && newData.child('m').val().length <= 200"
          }
        }
      },
      "dminbox": {
        "$uid": {
          ".read": "auth != null && auth.uid === $uid",
          "$from": { ".write": "auth != null && $from === auth.uid" }
        }
      },
      "world": {
        ".read": "auth != null",
        "regions": {
          "$i": {
            ".write": "auth != null && !root.child('rrgame/bans/' + auth.uid + '/ban').exists() && ((!data.exists() && newData.child('o').val() === auth.uid) || (data.exists() && data.child('o').val() === auth.uid) || (newData.child('w').exists() && root.child('rrgame/world/wars/' + newData.child('w').val() + '/win').val() === newData.child('o').val() && (root.child('rrgame/world/wars/' + newData.child('w').val() + '/i').val() + '') === $i))"
          }
        },
        "wars": {
          "$id": {
            ".write": "auth != null && !root.child('rrgame/bans/' + auth.uid + '/ban').exists() && !data.exists() && newData.child('a').val() === auth.uid",
            ".validate": "newData.hasChildren(['i','a','d','t0','t1','dA','dD'])",
            "dA": { ".write": "auth != null && !root.child('rrgame/bans/' + auth.uid + '/ban').exists() && now >= root.child('rrgame/world/wars/' + $id + '/t0').val() && now <= root.child('rrgame/world/wars/' + $id + '/t1').val() + 5000 && newData.val() > data.val()" },
            "dD": { ".write": "auth != null && !root.child('rrgame/bans/' + auth.uid + '/ban').exists() && now >= root.child('rrgame/world/wars/' + $id + '/t0').val() && now <= root.child('rrgame/world/wars/' + $id + '/t1').val() + 5000 && newData.val() > data.val()" },
            "ps": { "$uid": { ".write": "auth != null && auth.uid === $uid && now >= root.child('rrgame/world/wars/' + $id + '/t0').val() && now <= root.child('rrgame/world/wars/' + $id + '/t1').val() + 5000" } },
            "win": { ".write": "auth != null && !data.exists() && now > root.child('rrgame/world/wars/' + $id + '/t1').val() && (newData.val() === root.child('rrgame/world/wars/' + $id + '/a').val() || newData.val() === root.child('rrgame/world/wars/' + $id + '/d').val())" }
          }
        }
      },
      "market": {
        ".read": "auth != null",
        "$id": {
          ".write": "auth != null && ((!data.exists() && newData.child('s').val() === auth.uid && !root.child('rrgame/bans/' + auth.uid + '/ban').exists()) || (data.exists() && !newData.exists() && ((data.child('s').val() === auth.uid && !root.child('rrgame/claims/' + $id).exists()) || root.child('rrgame/claims/' + $id + '/b').val() === auth.uid)))",
          ".validate": "newData.hasChildren(['s','sn','r','q','p','t']) && newData.child('q').isNumber() && newData.child('q').val() > 0 && newData.child('q').val() <= 1000000 && newData.child('p').isNumber() && newData.child('p').val() > 0 && (newData.child('r').val() === 'gold' || newData.child('r').val() === 'oil' || newData.child('r').val() === 'ore' || newData.child('r').val() === 'uranium' || newData.child('r').val() === 'diamonds')"
        }
      },
      "claims": {
        "$id": {
          ".read": "auth != null",
          ".write": "auth != null && !data.exists() && newData.child('b').val() === auth.uid && root.child('rrgame/market/' + $id).exists()"
        }
      },
      "settle": {
        "$uid": {
          ".read": "auth != null && auth.uid === $uid",
          "$k": { ".write": "auth != null && ((!data.exists() && newData.exists()) || (auth.uid === $uid && !newData.exists()))" }
        }
      },
      "saves": {
        "$uid": {
          ".read": "auth != null && auth.uid === $uid",
          ".write": "auth != null && auth.uid === $uid"
        }
      }
    }`;
const FULL_RULES='{\n  "rules": {\n'+RULES_BLOCK+'\n  }\n}';
MP.loadCfg=()=>{try{const d=JSON.parse(localStorage.getItem(MPK)||'null');if(d){MP.cfg=d.cfg;MP.auth=d.auth;}}catch(e){}};
MP.saveCfg=()=>{try{localStorage.setItem(MPK,JSON.stringify({cfg:MP.cfg,auth:MP.auth}));}catch(e){}};
MP.token=async()=>{
  const a=MP.auth;if(a&&a.idToken&&Date.now()<a.exp-60000)return a.idToken;
  if(a&&a.refresh){
    try{const r=await fetch('https://securetoken.googleapis.com/v1/token?key='+MP.cfg.key,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'grant_type=refresh_token&refresh_token='+encodeURIComponent(a.refresh)});
      const j=await r.json();if(j.id_token){MP.auth={uid:j.user_id,idToken:j.id_token,refresh:j.refresh_token,exp:Date.now()+(+j.expires_in)*1000};MP.saveCfg();return MP.auth.idToken;}}catch(e){}
  }
  throw new Error('Giriş yapılmadı: kullanıcı adı ve şifrenle giriş yap ya da kayıt ol.');
};
MP.fb=async(method,path,body,query)=>{
  const t=await MP.token();
  const u=MP.cfg.url.replace(/\/+$/,'')+'/rrgame/'+path+'.json?'+(query?query+'&':'')+'auth='+encodeURIComponent(t);
  const r=await fetch(u,{method:method,headers:body!==undefined?{'Content-Type':'application/json'}:undefined,body:body!==undefined?JSON.stringify(body):undefined});
  if(!r.ok){let m='';try{m=(await r.json()).error||'';}catch(e){}throw new Error('Sunucu '+r.status+(m?': '+m:'')+(r.status===401?' (kurallar eklenmemiş olabilir)':''));}
  return r.json();
};
MP.uid=()=>MP.auth&&MP.auth.uid;
MP.mail=u=>{u=String(u||'').trim().toLowerCase();return u.indexOf('@')>0?u:u.replace(/[^a-z0-9._-]/g,'')+'@bilad.example.com';};
MP.idt=async(ep,body)=>{
  const r=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:'+ep+'?key='+MP.cfg.key,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  const j=await r.json();
  if(!j.idToken){const m=(j.error&&j.error.message)||'';
    throw new Error(/EMAIL_EXISTS/.test(m)?'Bu kullanıcı adı alınmış.':/INVALID_LOGIN|INVALID_PASSWORD|EMAIL_NOT_FOUND|INVALID_CREDENTIAL/.test(m)?'Kullanıcı adı ya da şifre hatalı.':/WEAK_PASSWORD/.test(m)?'Şifre en az 6 karakter olmalı.':/OPERATION_NOT_ALLOWED|CONFIGURATION_NOT_FOUND/.test(m)?'Firebase\'de Email/Password girişi kapalı (Authentication → Sign-in method → Email/Password → Etkinleştir).':'Giriş başarısız: '+(m||'bilinmeyen'));}
  return j;
};
MP.setAuth=(j,user)=>{MP.auth={uid:j.localId,idToken:j.idToken,refresh:j.refreshToken,exp:Date.now()+(+j.expiresIn)*1000,user:user};MP.saveCfg();};
MP.account=async(mode,user,pass)=>{   // mode: login | register | link
  user=String(user||'').trim().toLowerCase();
  if(user.indexOf('@')>0){if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(user))throw new Error('Geçerli bir e-posta gir.');}
  else if(!/^[a-z0-9._-]{3,20}$/.test(user))throw new Error('Kullanıcı adı 3-20 karakter olmalı (harf, rakam, . _ -) ya da bir e-posta gir.');
  if(String(pass||'').length<6)throw new Error('Şifre en az 6 karakter olmalı.');
  const email=MP.mail(user);let j;
  if(mode==='link'){const t=await MP.token();j=await MP.idt('update',{idToken:t,email:email,password:pass,returnSecureToken:true});j.localId=j.localId||MP.uid();}
  else j=await MP.idt(mode==='register'?'signUp':'signInWithPassword',{email:email,password:pass,returnSecureToken:true});
  MP.setAuth(j,user);
};
/* bulut kaydı: hesap hangi telefonda açılırsa oyun devam eder */
MP.cloudSnap=()=>{const c=Object.assign({},S);delete c.dirty;delete c.live;c.savedReal=Date.now();return JSON.stringify(c);};
MP.cloudSave=async(force)=>{
  if(!MP.ok||!MP.auth||S.mpUid!==MP.uid())return;
  const gap=(S.me&&S.me.admin)?120000:45000;
  if(!force&&Date.now()-(MP.lastCloud||0)<gap)return;
  MP.lastCloud=Date.now();
  await MP.fb('PUT','saves/'+MP.uid(),{t:Date.now(),d:MP.cloudSnap()});
};
MP.cloudPull=async()=>{   // girişten sonra: bu hesabın bulut kaydı varsa sor, yükle
  const uid=MP.uid();if(!uid)return;
  if(S.mpUid===uid)return;
  let c=null;try{c=await MP.fb('GET','saves/'+uid);}catch(e){}
  if(c&&c.d){
    if(confirm('Bu hesabın bulutta kayıtlı oyunu var. Yüklensin mi?\n\nTamam: bulut kaydını yükle (bu telefondaki oyun silinir)\nİptal: bu telefondaki oyunu bu hesaba bağla')){
      try{const o=JSON.parse(c.d);o.mpUid=uid;localStorage.setItem(SAVE,JSON.stringify(o));window.__noSave=true;location.reload();return 'reload';}catch(e){MP.err='Bulut kaydı okunamadı.';}
    }
  }
  S.mpUid=uid;save();
};
MP.connect=async()=>{
  if(!MP.cfg||!MP.cfg.key||!MP.cfg.url)return;
  MP.connecting=true;MP.err='';
  try{
    await MP.token();
    MP.owner=await MP.fb('GET','cfg/owner');
    const r=await MP.fb('GET','cfg/taxRate');MP.rate=(typeof r==='number'&&r>=0&&r<=90)?r:5;
    MP.role=(MP.owner&&MP.owner===MP.uid())?'admin':'player';
    MP.ok=true;
    if(await MP.cloudPull()==='reload')return;
    if(MP.role==='admin'){MP.makeAdmin();if(S.botN===undefined)botSetCount(6);}
    S.me.name=MP.cfg.name||S.me.name;
    await MP.sync();
  }catch(e){MP.ok=false;MP.err=String(e.message||e);}
  MP.connecting=false;S.dirty=true;
};
MP.claim=async()=>{
  try{
    if(!MP.ok)await MP.connect();
    if(!MP.ok)return;
    if(MP.owner&&MP.owner!==MP.uid())return MP.err='Bu dünyanın zaten bir yöneticisi var.';
    await MP.fb('PUT','cfg/owner',MP.uid());await MP.fb('PUT','cfg/taxRate',MP.rate);
    MP.owner=MP.uid();MP.role='admin';MP.makeAdmin();toast('👑 Artık yöneticisin (game master).','ok');
  }catch(e){MP.err=String(e.message||e);}
  S.dirty=true;
};
MP.makeAdmin=()=>{
  const m=S.me;if(m.admin)return;
  m.admin=true;if(!S.botN&&S.botN!==0)botSetCount(6);m.str=m.edu=m.end=100;m.level=Math.max(m.level,100);m.energy=100;m.money=Math.max(m.money,1e9);
  RES.forEach(r=>m.stor[r]=Math.max(m.stor[r],100000));m.learn=null;
  L('👑 Yönetici (game master) olarak atandın: tüm yetenekler dolu, enerji harcamazsın. Pazar vergileri sana ödenir.','ok');
};
MP.summary=()=>{
  const m=S.me,p=S.parties?null:null,a=A(),pt=a.parties.find(x=>x.id===m.party);
  return {name:m.name,lv:m.level,xp:Math.round(m.xp),money:Math.round(m.money),str:m.str,edu:m.edu,end:m.end,
    energy:Math.round(m.energy),loc:myReg().n,res:homeReg().n,party:pt?pt.n:'',role:roleName(),
    stor:Object.fromEntries(RES.map(r=>[r,Math.round(m.stor[r]*10)/10])),items:Object.assign({},m.items),
    facs:m.facs.length,works:m.works||0,hits:m.hits||0,learn:m.learn?PERKS[m.learn.perk]:'',paper:m.paper?m.paper.name:'',
    tax:Math.round(m.taxPaid||0),seen:Date.now(),admin:!!m.admin};
};
MP.sync=async()=>{
  if(!MP.ok||MP.busy)return;MP.busy=true;
  try{
    const uid=MP.uid();
    await MP.fb('PUT','players/'+uid,MP.summary());
    try{await MP.cloudSave();}catch(e){}
    try{await adminSync();}catch(e){}
    // olay akışı
    const ev=MP.q.splice(0,30);
    if(ev.length){const o={};ev.forEach((e,i)=>o[e.t+'_'+uid.slice(0,5)+'_'+i]=e);await MP.fb('PATCH','feed',o);}
    // vergi oranı (oyuncu)
    const r=await MP.fb('GET','cfg/taxRate');if(typeof r==='number'&&r>=0&&r<=90)MP.rate=r;
    // hediyeler
    const g=await MP.fb('GET','gifts/'+uid);
    if(g&&typeof g==='object'){for(const id in g){const x=g[id];
      if(x){if(+x.money>0)S.me.money+=+x.money;if(+x.gold>0)S.me.stor.gold=Math.min(storCap(),S.me.stor.gold+ +x.gold);
        L(`🎁 Yöneticiden hediye: ${x.money?fmt(x.money)+'₺ ':''}${x.gold?x.gold+' altın ':''}${x.msg?'— '+String(x.msg).slice(0,80):''}`,'ok');}
      await MP.fb('DELETE','gifts/'+uid+'/'+id);}S.dirty=true;}
    if(MP.role==='admin'){
      const pl=await MP.fb('GET','players');MP.players=pl||{};
      try{await admBansLoad();}catch(e){}
      const fd=await MP.fb('GET','feed',undefined,'orderBy=%22%24key%22&limitToLast=120');
      MP.feed=fd?Object.keys(fd).sort().reverse().map(k=>fd[k]):[];
      let got=0;S.adm=S.adm||{claimed:{},collected:0};
      for(const id in MP.players){if(id===uid)continue;const t=+MP.players[id].tax||0,c=S.adm.claimed[id]||0;
        if(t>c){got+=t-c;S.adm.claimed[id]=t;}else if(t<c)S.adm.claimed[id]=t;}
      if(got>0){S.me.money+=got;S.adm.collected+=got;L(`💰 Pazar vergisi geliri: +${fmt(got)}₺`,'ok');}
      S.dirty=true;
    }
    if(typeof socialSync==='function')await socialSync();
    MP.lastSync=Date.now();MP.err='';
  }catch(e){MP.err=String(e.message||e);}
  MP.busy=false;
  if(['net','adm'].includes(UI.tab))S.dirty=true;
};
MP.ev=(m)=>{if(!MP.ok)return;MP.q.push({t:Date.now(),u:S.me.name,m:m});if(MP.q.length>80)MP.q.shift();};

/* eylemleri izle: durum imzası değiştiyse olay akışına yaz */
const MP_LBL={work:'çalıştı',workAll:'çalıştı (tüm enerji)',buy:'pazardan aldı',sell:'pazara sattı',craft:'üretim başlattı',facBuild:'fabrika kurdu',facUp:'fabrika yükseltti',
  learn:'öğrenmeye başladı',boost:'güçlendirici kullandı',travel:'yola çıktı',resid:'ikamet değiştirdi',createParty:'parti kurdu',joinParty:'partiye katıldı',leaveParty:'partiden ayrıldı',
  campaign:'kampanya yaptı',vote:'oy kullandı',propose:'kanun teklif etti',lobby:'lobi yaptı',hit:'savaşta vurdu',hitAll:'savaşta vurdu (tüm enerji)',declare:'savaş ilan etti',paperCreate:'gazete kurdu',paperPost:'makale yazdı',drink:'enerji içti',minister:'bakanlık değiştirdi'};
const mpSig=()=>{const m=S.me;return JSON.stringify([m.money,m.stor,m.items,m.learn&&m.learn.perk,m.boost&&m.boost.end,m.travel&&m.travel.to,m.res,m.party,S.laws.length,m.hits,m.works,m.facs.length,m.paper&&m.paper.posts,m.craftQ.length,m.votedFor,m.lastCamp,m.energy]);};
function mpWrap(){
  Object.keys(MP_LBL).forEach(k=>{const f=ACT[k];if(!f)return;
    ACT[k]=function(d){d=d||{};const a=mpSig();const r=f(d);if(mpSig()!==a){
      const det=[d.r?RES_N[d.r]:'',d.k?(ITEMS[d.k]||{n:d.k}).n:'',d.p&&PERKS[d.p]?PERKS[d.p]:'',d.n&&d.n!=='all'?'×'+d.n:'',d.n==='all'?'hepsini':'',d.to!==undefined&&S.regions[+d.to]?S.regions[+d.to].n:''].filter(Boolean).join(' ');
      MP.ev(`${MP_LBL[k]}${det?' · '+det:''}`);}return r;};});
}

/* ---- eylemler ---- */
ACT.mpConnect=()=>{
  const g=id=>(($(id)||{}).value||'').trim();
  const old=MP.cfg||{};
  MP.cfg={key:g('mpKey')||old.key,url:g('mpUrl')||old.url,name:(g('mpName')||old.name||'Oyuncu').slice(0,20)};
  if(!MP.cfg.key||!/^https:\/\//.test(MP.cfg.url))return msg('apiKey ve https:// ile başlayan databaseURL gerekli.');
  MP.saveCfg();MP.connect();
};
MP.doAuth=async(mode)=>{
  const g=id=>(($(id)||{}).value||'').trim();
  const old=MP.cfg||{};
  MP.cfg={key:g('mpKey')||old.key||DEF_KEY,url:g('mpUrl')||old.url||DEF_URL,name:(g('mpName')||String(g('mpUser')||'').split('@')[0]||old.name||'Oyuncu').slice(0,20)};
  MP.err='';MP.connecting=true;S.dirty=true;render();
  try{
    await MP.account(mode,g('mpUser'),($('mpPass')||{}).value||'');
    MP.saveCfg();MP.connecting=false;
    if(mode==='link'){S.mpUid=MP.uid();save();toast('Hesabın şifreyle korundu: artık her telefondan girebilirsin.','ok');}
    await MP.connect();
  }catch(e){MP.err=String(e.message||e);}
  MP.connecting=false;S.dirty=true;render();
};
ACT.mpLogin=()=>{MP.doAuth('login');};
ACT.mpOwner=async()=>{   // e-postayla kayıt ol + yönetici ol (tek adım)
  const g=id=>(($(id)||{}).value||'').trim();
  const em=g('mpUser').toLowerCase();
  if(em.indexOf('@')<1){MP.err='Yönetici hesabı için gerçek bir e-posta adresi yaz (şifreni unutursan buraya sıfırlama gelir).';S.dirty=true;render();return;}
  if(!confirm('Bu e-postayla YÖNETİCİ (game master) hesabı kurulacak. Yalnızca bir kez yapılır; sonra her telefondan bu e-posta ve şifreyle girersin. Devam?'))return;
  await MP.doAuth('register');
  if(MP.ok&&MP.role!=='admin'){
    if(MP.owner&&MP.owner!==MP.uid()){MP.err='Bu oyunun zaten bir yöneticisi var. Yönetici sensen "Giriş yap"ı kullan.';}
    else await MP.claim();
  }
  S.dirty=true;render();
};
ACT.mpForgot=async()=>{
  const em=((($('mpUser')||{}).value)||'').trim().toLowerCase();
  if(em.indexOf('@')<1){MP.err='Şifre sıfırlama yalnızca e-postayla açılan hesaplarda çalışır. E-postanı kullanıcı kutusuna yaz.';S.dirty=true;render();return;}
  try{
    const c=MP.cfg||{key:DEF_KEY};
    const r=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key='+(c.key||DEF_KEY),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({requestType:'PASSWORD_RESET',email:em})});
    const j=await r.json();
    if(j.error)throw new Error(/EMAIL_NOT_FOUND/.test(j.error.message)?'Bu e-postayla hesap yok.':j.error.message);
    msg('📧 Şifre sıfırlama bağlantısı e-postana gönderildi (spam klasörüne de bak).','ok');
  }catch(e){MP.err=String(e.message||e);S.dirty=true;render();}
};
ACT.mpRegister=()=>{MP.doAuth('register');};
ACT.mpLink=()=>{MP.doAuth('link');};
ACT.mpLogout=async()=>{
  if(!confirm('Çıkış yapılsın mı? Oyunun hesabında bulutta durur; başka telefonda aynı kullanıcı adıyla devam edebilirsin.'))return;
  try{await MP.cloudSave(true);}catch(e){}
  MP.ok=false;MP.auth=null;MP.role='player';MP.saveCfg();S.mpUid=null;save();msg('Çıkış yapıldı.','ok');S.dirty=true;render();
};
ACT.mpOff=()=>{try{MP.cloudSave(true);}catch(e){}MP.ok=false;MP.cfg=null;MP.auth=null;MP.role='player';try{localStorage.removeItem(MPK);}catch(e){}msg('Bağlantı kesildi (oyun yerelde devam eder).','ok');};
ACT.mpClaim=()=>{MP.claim();};
ACT.mpSync=()=>{MP.sync();};
ACT.mpCopy=()=>{
  let ok=false;
  try{const t=document.createElement('textarea');t.value=FULL_RULES;t.style.cssText='position:fixed;left:0;top:0;opacity:0';document.body.appendChild(t);t.focus();t.select();t.setSelectionRange(0,t.value.length);ok=document.execCommand('copy');t.remove();}catch(e){}
  if(ok){msg('Kurallar kopyalandı.','ok');return;}
  try{if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(FULL_RULES).then(()=>msg('Kurallar kopyalandı.','ok'),()=>rulesModal());return;}}catch(e){}
  rulesModal();
};
function rulesModal(){
  $('modal-root').innerHTML=`<div class="modal"><div class="box"><h3>Firebase kuralları</h3><p class="hint">Metne dokun, tümünü seç ve kopyala (basılı tut → Tümünü seç → Kopyala). Sonra Firebase'de Tüzük sekmesine yapıştır.</p><textarea id="rulesTa" readonly style="width:100%;height:46vh;background:#06090d;color:#c9d1d9;border:1px solid #2a3542;border-radius:6px;font-size:11px;font-family:monospace;padding:8px">${esc(FULL_RULES)}</textarea><div class="btns"><button class="act" onclick="var t=document.getElementById('rulesTa');t.focus();t.select();t.setSelectionRange(0,t.value.length);try{document.execCommand('copy')}catch(e){}">Tümünü seç</button><button class="act danger" onclick="this.closest('.modal').remove()">Kapat</button></div></div></div>`;
}
ACT.mpTax=async()=>{
  const v=+($('mpRate')||{}).value;if(isNaN(v)||v<0||v>90)return msg('Oran 0–90 arasında olmalı.');
  try{await MP.fb('PUT','cfg/taxRate',v);MP.rate=v;msg('Vergi oranı %'+v+' yapıldı.','ok');}catch(e){msg(String(e.message));}S.dirty=true;render();
};
ACT.mpSel=d=>{MP.sel=d.id;};
ACT.mpGift=async()=>{
  const id=MP.sel;if(!id)return msg('Önce bir oyuncu seç.');
  const money=+($('gfMoney')||{}).value||0,gold=+($('gfGold')||{}).value||0,m=(($('gfMsg')||{}).value||'').slice(0,80);
  if(money<=0&&gold<=0)return msg('Para veya altın miktarı gir.');
  const bt=botById(id);if(bt){bt.m+=Math.max(0,money);bt.g+=Math.max(0,gold);return msg('🎁 Yapay zekâ oyuncuya verildi.','ok');}
  try{await MP.fb('POST','gifts/'+id,{money:money,gold:gold,msg:m});msg('🎁 Hediye gönderildi.','ok');}catch(e){msg(String(e.message));}
};
ACT.mpClearFeed=async()=>{try{await MP.fb('DELETE','feed');MP.feed=[];msg('Olay akışı temizlendi.','ok');}catch(e){msg(String(e.message));}S.dirty=true;render();};

/* ---- sekmeler ---- */
const ago=t=>{const s=Math.max(0,(Date.now()-t)/1000);return s<90?'çevrimiçi':s<3600?Math.round(s/60)+' dk önce':s<86400?Math.round(s/3600)+' sa önce':Math.round(s/86400)+' gün önce';};
function tabNet(){
  const c=MP.cfg||{key:DEF_KEY,url:DEF_URL,name:S.me.name};
  const inp='style="width:100%;padding:8px;background:#06090d;color:#c9d1d9;border:1px solid #2a3542;border-radius:5px;margin:4px 0"';
  let h=`<div class="panel"><h2>⚙️ Hesap ve bağlantı</h2>
  <div class="card"><p>Durum: ${MP.connecting?'bağlanıyor…':MP.ok?`<b class="ok">bağlı</b> · rol: <b>${MP.role==='admin'?'👑 Yönetici':'Oyuncu'}</b> · pazar vergisi %${MP.rate}`:'<b class="dim">bağlı değil (tek başına oynuyorsun)</b>'}</p>
  ${MP.err?`<p class="bad">${esc(MP.err)}</p>`:''}
  <label>Oyuncu adın (oyunda görünen)</label><input type="text" id="mpName" ${inp} value="${esc(c.name||'')}" maxlength="20">
  ${MP.auth&&MP.auth.user?`<p>Hesap: <b>${esc(MP.auth.user)}</b> ${MP.role==='admin'?'👑':''}</p>`:`<div class="card"><h3>${MP.auth?'Hesabını şifreyle koru':'Hesap'}</h3>${MP.auth?'<p class="dim">Bu telefondaki bağlantı şifresiz (anonim). Kullanıcı adı ve şifre koyarsan yönetici/oyuncu hakların kaybolmaz ve her telefondan girebilirsin.</p>':'<p class="dim">Kullanıcı adı ve şifre ile giriş yap; hesabın ve oyunun her telefonda seninle gelir.</p>'}
  <label>Kullanıcı adı ya da e-posta</label><input type="text" id="mpUser" ${inp} autocapitalize="off" autocomplete="username" spellcheck="false" maxlength="80">
  <label>Şifre</label><input type="password" id="mpPass" ${inp} autocomplete="current-password">
  <div class="btns">${MP.auth?btn('🔒 Hesabı koru','data-a="mpLink"','gold'):btn('Giriş yap','data-a="mpLogin"','blue')+btn('Kayıt ol (oyuncu)','data-a="mpRegister"')+btn('👑 Yönetici hesabı kur','data-a="mpOwner"','gold')+btn('Şifremi unuttum','data-a="mpForgot"','sm')}</div><p class="hint">Yönetici hesabını bir kez <b>e-postayla</b> kur; sonra her telefondan aynı e-posta ve şifreyle girersin. Şifreni unutursan e-postana sıfırlama gelir.</p></div>`}
  <div class="btns">${MP.auth&&MP.auth.user&&!MP.ok?btn('Bağlan','data-a="mpConnect"','blue'):''}${MP.ok&&MP.role!=='admin'&&!MP.owner?btn('👑 Yönetici ol (ilk kişi)','data-a="mpClaim"','gold'):''}${MP.ok?btn('Şimdi eşitle','data-a="mpSync"'):''}${MP.auth&&MP.auth.user?btn('Çıkış','data-a="mpLogout"'):''}${MP.cfg?btn('Bağlantıyı kes','data-a="mpOff"','danger'):''}</div></div>
  <details class="card"><summary>⚙️ Gelişmiş (sunucu ayarı ve kurulum)</summary>
  <label>Firebase apiKey</label><input type="text" id="mpKey" ${inp} value="${esc(c.key)}" autocapitalize="off" spellcheck="false">
  <label>databaseURL</label><input type="text" id="mpUrl" ${inp} value="${esc(c.url)}" placeholder="https://....firebasedatabase.app" autocapitalize="off" spellcheck="false">
  <div class="card"><h3>Kurulum (bir kez)</h3><p>1) Firebase konsolunda <b>Authentication → Sign-in method → Email/Password</b> girişini aç (Anonymous gerekmez).<br>2) <b>Realtime Database → Kurallar</b> bölümündeki her şeyi sil, aşağıdaki "Kuralları kopyala" ile kopyalanan metni yapıştır ve Yayınla (bu veritabanı yalnızca bu oyun için).<br>3) Yönetici sen olacaksan önce sen kayıt olup "Yönetici ol"a bas; yönetici hesabı kaybolduysa Realtime Database'de <b>rrgame → cfg → owner</b> düğümünü silip yeniden "Yönetici ol" de; diğerleri sonra bağlansın. Aynı apiKey ve databaseURL'yi oyunculara ver.</p>
  <div class="btns">${btn('Kuralları kopyala','data-a="mpCopy"','gold')}</div><pre style="font-size:10px;max-height:200px;overflow:auto;background:#06090d;padding:8px;border-radius:6px;white-space:pre-wrap">${esc(FULL_RULES)}</pre>
  <p class="hint">Not: istemci tabanlı olduğu için bilgisayar bilen bir oyuncu kendi verisini değiştirebilir; arkadaş oyunu için yeterlidir.</p></details>
  </div>`;
  return h;
}
function tabAdm(){
  const rows=Object.keys(MP.players).map(id=>Object.assign({id:id},MP.players[id])).sort((a,b)=>b.seen-a.seen).concat(botRows(25));
  const on=rows.filter(r=>Date.now()-r.seen<90000).length;
  let h=`<div class="panel"><h2>👑 Game Master Paneli</h2><div class="grid">
  ${card('🤖 Yapay zekâ oyuncular',`<div class="row" style="margin:4px 0"><input type="number" id="botN" min="0" max="5000" value="${S.botN||0}" style="width:90px"></div><div class="btns">${btn('Uygula','data-a="botCount"','gold')}${[100,500,1000,2500,5000].map(n=>btn(n,`data-a="botCount" data-n="${n}"`,'sm')).join('')}</div><p class="dim">Şu an ${fmt(S.botN||0)} · Bölgelere dağılır, partiye girer, çalışır, vergi öder, devletlerin gücünü belirler.</p>`)}
  ${card('💰 Vergi geliri',`<div class="big">${fmt(S.adm?S.adm.collected:0)}₺</div><p class="dim">Tüm oyuncuların pazar işlemlerinden</p>`)}
  ${card('👥 Oyuncular',`<div class="big">${rows.length}</div><p>${on} çevrimiçi</p>`)}
  ${card('📊 Pazar vergisi',`<div class="row" style="margin:4px 0"><input type="number" id="mpRate" min="0" max="90" value="${MP.rate}"> <span>%</span></div>${btn('Oranı kaydet','data-a="mpTax"','gold')}<p class="dim">Her alım ve satımda oyuncudan kesilir.</p>`)}
  </div></div><div class="panel"><h2>Oyuncular</h2><div style="overflow-x:auto"><table><tr><th align=left>Oyuncu</th><th>Sv</th><th>💰</th><th>🥇</th><th>Güç/Eği/Day</th><th>Konum</th><th>Vergi</th><th>Durum</th></tr>`;
  rows.forEach(r=>{h+=`<tr style="${MP.sel===r.id?'background:#1a2330':''}"><td><button class="act sm ${r.admin?'gold':''}" data-a="mpSel" data-id="${r.id}">${r.bot?'🤖 ':''}${esc(r.name)}${r.admin?' 👑':''}</button></td><td class="num">${r.lv}</td><td class="num">${fmt(r.money)}</td><td class="num">${f1(r.stor?r.stor.gold:0)}</td><td class="num">${r.str}/${r.edu}/${r.end}</td><td>${esc(r.loc||'')}</td><td class="num">${fmt(r.tax||0)}</td><td class="${Date.now()-r.seen<90000?'ok':'dim'}">${ago(r.seen)}</td></tr>`;});
  h+=`</table></div>${rows.length?'':'<p class="dim">Henüz oyuncu yok. Oyunculara apiKey + databaseURL ver.</p>'}</div>`;
  const s=MP.players[MP.sel]||botRowById(MP.sel);
  if(s){h+=`<div class="panel"><h2>🔍 ${esc(s.name)}</h2><div class="grid">
    ${card('Karakter',`<p>Seviye ${s.lv} (${s.xp} xp) · ${esc(s.role||'')}</p><p>Güç ${s.str} · Eğitim ${s.edu} · Dayanıklılık ${s.end}</p><p>Enerji ${s.energy} · Öğreniyor: ${esc(s.learn||'—')}</p>`)}
    ${card('Konum',`<p>Şu an: ${esc(s.loc)}</p><p>İkamet: ${esc(s.res)}</p><p>Parti: ${esc(s.party||'—')} · Gazete: ${esc(s.paper||'—')}</p>`)}
    ${card('Depo',`<p>💰 ${fmt(s.money)}₺</p><p class="dim">${RES.map(r=>`${RES_I[r]} ${f1((s.stor||{})[r]||0)}`).join(' · ')}</p><p class="dim">${Object.keys(s.items||{}).filter(k=>s.items[k]>0).map(k=>`${ITEMS[k].i} ${s.items[k]}`).join(' · ')||'Eşya yok'}</p>`)}
    ${card('Etkinlik',`<p>İş: ${s.works} · Savaş vuruşu: ${s.hits} · Fabrika: ${s.facs}</p><p>Ödediği vergi: <b>${fmt(s.tax||0)}₺</b></p>`)}
    </div><div class="card" style="margin-top:8px"><h3>🎁 Hediye gönder</h3><div class="row" style="margin:4px 0"><input type="number" id="gfMoney" min="0" placeholder="Para"><input type="number" id="gfGold" min="0" placeholder="Altın"><input type="text" id="gfMsg" placeholder="Not" maxlength="80" style="flex:1;padding:6px;background:#06090d;color:#c9d1d9;border:1px solid #2a3542;border-radius:5px"></div>${btn('Gönder','data-a="mpGift"','gold')}</div></div>`;}
  h+=`<div class="panel"><h2>📡 Canlı olay akışı</h2><div class="log tall">${MP.feed.concat(S.botFeed||[]).sort((a,b)=>b.t-a.t).slice(0,150).map(e=>`<div>[${new Date(e.t).toLocaleTimeString('tr-TR')}] <b>${e.b?'🤖 ':''}${esc(e.u||'?')}</b> ${esc(e.m)}</div>`).join('')||'<div class="dim">Henüz olay yok.</div>'}</div><div class="btns" style="margin-top:8px">${btn('Akışı temizle','data-a="mpClearFeed"','danger')}</div></div>`;
  if(typeof adminExtra==='function')h+=adminExtra();
  return h;
}

/* ================= SOHBET + OYUNCU PAZARI (Firebase) ================= */
const CHAT={msgs:[],err:'',last:0,sig:'',lastSend:0,unread:0,ch:'g',dm:null,inbox:{},dmUnread:0,gen:[]};
const MK={list:[],err:'',last:0,sig:'',busy:false};
function chatSeen(){try{return localStorage.getItem('rrchat_seen')||'';}catch(e){return '';}}
function chatMark(k){try{localStorage.setItem('rrchat_seen',k);}catch(e){}}
const rulesHint=e=>/401|403|ermission/i.test(String(e&&e.message||e))?'Firebase kuralları güncel değil: Menü › Hesap bölümünden "Kuralları kopyala" ile yeni kuralları yayınla.':String(e&&e.message||e);
const pairKey=(a,b)=>[a,b].sort().join('_');
function chatPath(ch){
  ch=ch||CHAT.ch;
  if(ch==='p'&&S.me.party)return 'pchat/'+S.me.party;
  if(ch==='d'&&CHAT.dm)return 'dm/'+pairKey(MP.uid(),CHAT.dm.id);
  return 'chat';
}
function dmSeen(){try{return JSON.parse(localStorage.getItem('rrdm_seen')||'{}');}catch(e){return {};}}
function dmMark(peer,t){try{const o=dmSeen();o[peer]=t;localStorage.setItem('rrdm_seen',JSON.stringify(o));}catch(e){}}
async function chatPoll(){
  if(!MP.ok)return;CHAT.last=Date.now();
  try{
    const onTab=UI.tab==='chat',path=onTab?chatPath():'chat';
    const d=await MP.fb('GET',path,undefined,'orderBy=%22%24key%22&limitToLast=60');
    const keys=d?Object.keys(d).sort():[];const arr=keys.map(k=>Object.assign({k:k},d[k]));CHAT.err='';
    const last=keys.length?keys[keys.length-1]:'';
    if(onTab&&CHAT.ch==='d'&&CHAT.dm)dmMark(CHAT.dm.id,Date.now());
    if(onTab){CHAT.msgs=arr;if(path==='chat'){if(last)chatMark(last);CHAT.unread=0;}}
    else{CHAT.gen=arr;const sn=chatSeen();CHAT.unread=keys.filter(k=>k>sn).length;if(!sn&&last)chatMark(last),CHAT.unread=0;}
    // özel mesaj kutusu
    let dmu=0;try{const ib=await MP.fb('GET','dminbox/'+MP.uid())||{};CHAT.inbox=ib;const sn=dmSeen();
      Object.keys(ib).forEach(p=>{if(!(sn[p]>=ib[p].t)&&!(onTab&&CHAT.ch==='d'&&CHAT.dm&&CHAT.dm.id===p))dmu++;});}catch(e){}
    CHAT.dmUnread=dmu;
    const sig=path+keys.length+':'+last+':'+CHAT.unread+':'+dmu;
    if(sig!==CHAT.sig){CHAT.sig=sig;S.dirty=true;}
  }catch(e){CHAT.err=rulesHint(e);if(UI.tab==='chat')S.dirty=true;}
}
async function mkPoll(){
  if(!MP.ok)return;MK.last=Date.now();
  try{
    const d=await MP.fb('GET','market');
    MK.list=d?Object.keys(d).map(k=>Object.assign({id:k},d[k])).filter(x=>x&&x.r&&x.q>0&&x.p>0).sort((a,b)=>a.p-b.p):[];MK.err='';
    const sig=MK.list.map(x=>x.id+x.q+x.p).join(',');if(sig!==MK.sig){MK.sig=sig;if(UI.tab==='mkt')S.dirty=true;}
  }catch(e){MK.err=rulesHint(e);if(UI.tab==='mkt')S.dirty=true;}
}
async function settleFlush(){ // bekleyen ödemeleri (alıcı → satıcı) gönder
  const q=S.me.psettle||[];if(!q.length||!MP.ok)return;
  for(const x of q.slice()){try{await MP.fb('PUT','settle/'+x.to+'/'+x.id,{amt:x.amt,r:x.r,q:x.q,bn:x.bn,t:x.t});S.me.psettle=S.me.psettle.filter(y=>y.id!==x.id);}catch(e){}}
}
async function settleCollect(){ // satıcı: gelen ödemeleri tahsil et
  if(!MP.ok)return;
  try{
    const d=await MP.fb('GET','settle/'+MP.uid());if(!d||typeof d!=='object')return;
    S.me.settled=S.me.settled||{};
    for(const k in d){const x=d[k];if(!x)continue;
      if(!S.me.settled[k]){
        const tax=S.me.admin?0:Math.floor(x.amt*MP.rate/100);
        S.me.money+=x.amt-tax;S.me.taxPaid=(S.me.taxPaid||0)+tax;S.me.settled[k]=1;
        L(`🛒 ${x.bn||'Bir oyuncu'} senden ${x.q} ${RES_N[x.r]||x.r} aldı: +${fmt(x.amt-tax)}₺${tax?` (vergi ${fmt(tax)}₺)`:''}`,'ok');S.dirty=true;}
      try{await MP.fb('DELETE','settle/'+MP.uid()+'/'+k);}catch(e){}}
    const ks=Object.keys(S.me.settled);if(ks.length>300)ks.slice(0,150).forEach(k=>delete S.me.settled[k]);
  }catch(e){}
}
async function socialSync(){if(typeof lbPush==='function')await lbPush();await settleFlush();await settleCollect();if(typeof swPoll==='function')await swPoll();if(UI.tab!=='chat'&&Date.now()-CHAT.last>25000)await chatPoll();}
function socialTick(){
  if(!MP.ok)return;
  if(UI.tab==='chat'&&Date.now()-CHAT.last>(CHAT.last?4000:0))chatPoll();
  if((UI.tab==='sw'||UI.tab==='world')&&typeof swPoll==='function'&&Date.now()-SW.last>5000)swPoll();
  if(UI.tab==='mkt'&&Date.now()-MK.last>6000){mkPoll();settleCollect();}
}
/* ---- eylemler ---- */
ACT.chatSend=async()=>{
  const el=$('chatMsg');const m=((el&&el.value)||'').trim().slice(0,200);
  if(!MP.ok)return msg('Önce Menü › Hesap bölümünden giriş yap.');if(!m)return;
  if(MP.ban&&MP.ban.chat&&!S.me.admin)return msg('Yönetici seni susturdu.');
  if(CHAT.ch==='d'&&!CHAT.dm)return msg('Önce mesajlaşacağın kişiyi seç.');
  if(CHAT.ch==='p'&&!S.me.party)return msg('Parti sohbeti için bir partiye katıl.');
  if(Date.now()-CHAT.lastSend<1500)return msg('Biraz yavaş.');CHAT.lastSend=Date.now();
  const key=Date.now()+'_'+MP.uid().slice(0,6),body={u:S.me.name,m:m,t:Date.now(),uid:MP.uid(),ad:S.me.admin?1:0};
  if(S.me.admin&&CHAT.ch==='g'&&($('chatAnn')||{}).checked)body.a=1;
  const path=chatPath();if(el)el.value='';
  try{
    await MP.fb('PUT',path+'/'+key,body);S.me.msgs=(S.me.msgs||0)+1;
    if(CHAT.ch==='d')await MP.fb('PUT','dminbox/'+CHAT.dm.id+'/'+MP.uid(),{u:S.me.name,t:Date.now()});
    CHAT.msgs.push(Object.assign({k:key},body));if(CHAT.ch==='g')chatMark(key);S.dirty=true;render();}
  catch(e){msg(rulesHint(e));if(el)el.value=m;}
};
ACT.chatCh=d=>{CHAT.ch=d.c;CHAT.msgs=[];CHAT.last=0;CHAT.sig='';if(d.c==='d'&&!LB.rows.length&&typeof lbPoll==='function')lbPoll();};
ACT.dmOpen=d=>{
  const id=d.id||($('dmPick')||{}).value;if(!id)return;
  const row=(LB.rows||[]).find(r=>r.id===id),ib=CHAT.inbox[id];
  CHAT.dm={id:id,name:d.name||(row&&row.name)||(ib&&ib.u)||'Oyuncu'};CHAT.ch='d';CHAT.msgs=[];CHAT.last=0;CHAT.sig='';dmMark(id,Date.now());
};
ACT.dmBack=()=>{CHAT.dm=null;CHAT.msgs=[];};
ACT.chatDel=async d=>{try{await MP.fb('DELETE',chatPath()+'/'+d.k);CHAT.msgs=CHAT.msgs.filter(x=>x.k!==d.k);S.dirty=true;render();}catch(e){msg(rulesHint(e));}};
ACT.chatClear=async()=>{if(!S.me.admin)return;try{await MP.fb('DELETE','chat');CHAT.msgs=[];S.dirty=true;render();msg('Sohbet temizlendi.','ok');}catch(e){msg(rulesHint(e));}};
ACT.mkSell=async()=>{
  if(!MP.ok)return msg('Önce Menü › Hesap bölümünden giriş yap.');
  const r=($('mkRes')||{}).value,q=Math.floor(+($('mkQty')||{}).value),p=+($('mkPrice')||{}).value;
  if(!RES.includes(r))return msg('Kaynak seç.');if(!(q>=1))return msg('Miktar en az 1 olmalı.');if(!(p>0))return msg('Birim fiyat gir.');
  if(S.me.stor[r]<q)return msg(`Depoda yeterli ${RES_N[r]} yok.`);
  if(MK.list.filter(x=>x.s===MP.uid()).length>=8)return msg('En fazla 8 ilanın olabilir.');
  const id=Date.now()+'_'+MP.uid().slice(0,6);
  S.me.stor[r]-=q;
  try{await MP.fb('PUT','market/'+id,{s:MP.uid(),sn:S.me.name,r:r,q:q,p:Math.round(p*100)/100,t:Date.now()});
    MK.list.push({id:id,s:MP.uid(),sn:S.me.name,r:r,q:q,p:Math.round(p*100)/100,t:Date.now()});MK.list.sort((a,b)=>a.p-b.p);
    MP.ev(`pazara ilan koydu · ${RES_N[r]} ×${q} @ ${fmt(p)}₺`);msg('İlan verildi.','ok');}
  catch(e){S.me.stor[r]+=q;msg(rulesHint(e));}
  S.dirty=true;render();
};
ACT.mkCancel=async d=>{
  const x=MK.list.find(y=>y.id===d.id);if(!x||x.s!==MP.uid())return;
  try{await MP.fb('DELETE','market/'+x.id);S.me.stor[x.r]+=x.q;MK.list=MK.list.filter(y=>y.id!==x.id);msg('İlan geri çekildi.','ok');}
  catch(e){msg('İlan zaten satılmış olabilir; ödeme kısa süre içinde gelir.');mkPoll();}
  S.dirty=true;render();
};
ACT.mkBuy=async d=>{
  const x=MK.list.find(y=>y.id===d.id);if(!x)return msg('İlan bulunamadı.');
  if(!MP.ok)return;if(x.s===MP.uid())return msg('Kendi ilanını alamazsın.');
  const total=Math.round(x.q*x.p);
  if(S.me.money<total)return msg(`Yetersiz para (${fmt(total)}₺).`);
  if(S.me.stor[x.r]+x.q>storCap())return msg('Depon bu miktarı almaya yetmiyor.');
  try{await MP.fb('PUT','claims/'+x.id,{b:MP.uid(),bn:S.me.name,t:Date.now()});}
  catch(e){MK.list=MK.list.filter(y=>y.id!==x.id);S.dirty=true;render();return msg(/401|403|ermission/i.test(e.message)?'Bu ilan başkası tarafından alındı ya da geri çekildi.':rulesHint(e));}
  S.me.money-=total;S.me.stor[x.r]+=x.q;
  S.me.psettle=S.me.psettle||[];S.me.psettle.push({to:x.s,id:x.id,amt:total,r:x.r,q:x.q,bn:S.me.name,t:Date.now()});
  MK.list=MK.list.filter(y=>y.id!==x.id);
  L(`🛒 ${x.sn} oyuncusundan ${x.q} ${RES_N[x.r]} aldın (−${fmt(total)}₺).`,'ok');MP.ev(`${x.sn} oyuncusundan satın aldı · ${RES_N[x.r]} ×${x.q} (${fmt(total)}₺)`);
  try{await MP.fb('DELETE','market/'+x.id);}catch(e){}
  settleFlush();S.dirty=true;render();
};
/* ---- sekmeler ---- */
function tabChat(){
  let h=`<div class="panel"><h2>💬 Sohbet</h2>`;
  if(!MP.ok)return h+'<div class="al warn">Sohbet için Menü › Hesap bölümünden giriş yap.</div></div>';
  const m=S.me;
  if(CHAT.ch==='p'&&!m.party)CHAT.ch='g';
  h+=`<div class="btns" style="margin-bottom:8px">${btn('🌍 Genel','data-a="chatCh" data-c="g"',CHAT.ch==='g'?'gold':'')}${m.party?btn('🗳️ Parti','data-a="chatCh" data-c="p"',CHAT.ch==='p'?'gold':''):''}${btn('✉️ Özel'+(CHAT.dmUnread?` (${CHAT.dmUnread})`:''),'data-a="chatCh" data-c="d"',CHAT.ch==='d'?'gold':'')}</div>`;
  if(CHAT.err)h+=`<div class="al bad">${esc(CHAT.err)}</div>`;
  if(CHAT.ch==='d'&&!CHAT.dm){
    const sn=dmSeen(),ib=Object.keys(CHAT.inbox).map(k=>Object.assign({id:k},CHAT.inbox[k])).sort((a,b)=>b.t-a.t);
    const others=(LB.rows||[]).filter(r=>r.id!==MP.uid()&&!r.adm||(r.adm&&r.id!==MP.uid()));
    h+=`<div class="card"><h3>Yeni özel mesaj</h3><div class="row">${sel('dmPick',[['','Kişi seç…']].concat(others.map(r=>[r.id,r.name+' (Sv '+r.lv+')'])),'')}${btn('Aç','data-a="dmOpen"','blue')}</div>${others.length?'':'<p class="dim">Henüz başka oyuncu görünmüyor (Sosyal › Sıralama sekmesini bir kez aç).</p>'}</div>`;
    h+='<h2 style="margin-top:10px">Konuşmalar</h2>';
    if(!ib.length)h+='<p class="dim">Henüz özel mesajın yok.</p>';
    ib.forEach(x=>{h+=`<div class="q"><b>${esc(x.u)}</b> ${sn[x.id]>=x.t?'':'<span class="owner" style="background:#da3633;color:#fff">yeni</span>'} <small class="dim">${new Date(x.t).toLocaleString('tr-TR')}</small> ${btn('Aç',`data-a="dmOpen" data-id="${x.id}" data-name="${esc(x.u)}"`,'sm')}</div>`;});
    return h+'</div>';
  }
  if(CHAT.ch==='d')h+=`<div class="btns">${btn('← Konuşmalar','data-a="dmBack"','sm')}<b style="padding:6px">✉️ ${esc(CHAT.dm.name)}</b></div>`;
  if(CHAT.ch==='p')h+=`<p class="dim">Parti kanalı: ${esc(myParty()?myParty().n:'')} üyeleri</p>`;
  h+=`<div class="log tall" id="chatBox">${CHAT.msgs.map(x=>`<div class="${x.a?'warn':''}">[${new Date(x.t).toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit'})}] ${x.a?'📢 ':''}<b style="color:${x.ad?'#f0c040':(x.uid===MP.uid()?'#3fb950':'#58a6ff')}">${esc(x.u)}${x.ad?' 👑':''}</b>: ${esc(x.m)}${S.me.admin&&CHAT.ch!=='d'?` <button class="act sm danger" data-a="chatDel" data-k="${x.k}">sil</button>`:''}</div>`).join('')||'<div class="dim">Henüz mesaj yok.</div>'}</div>
  <div class="row" style="margin-top:8px"><input type="text" id="chatMsg" maxlength="200" placeholder="Mesaj yaz…" style="flex:1;padding:9px;background:#06090d;color:#c9d1d9;border:1px solid #2a3542;border-radius:5px">${btn('Gönder','data-a="chatSend"','blue')}</div>`;
  if(S.me.admin&&CHAT.ch==='g')h+=`<div class="btns"><label><input type="checkbox" id="chatAnn"> 📢 Duyuru olarak gönder</label>${btn('Sohbeti temizle','data-a="chatClear"','danger sm')}</div>`;
  return h+'<p class="hint">Mesajlar birkaç saniyede bir yenilenir. Küfür ve reklam yasak; yönetici genel ve parti mesajlarını silebilir. Özel mesajları yalnızca iki taraf okuyabilir.</p></div>';
}
function tabMkt(){
  const m=S.me;
  let h=`<div class="panel"><h2>🛒 Oyuncu pazarı</h2>`;
  if(!MP.ok)return h+'<div class="al warn">Oyuncu pazarı için Menü › Hesap bölümünden giriş yap.</div></div>';
  if(MK.err)h+=`<div class="al bad">${esc(MK.err)}</div>`;
  h+=`<p class="hint">Oyuncular kaynaklarını kendi fiyatıyla satar. Satışta %${MP.rate} pazar vergisi satıcıdan kesilir (yöneticiye gider). İlan verince kaynak emanete alınır; geri çekersen iade edilir. İlanlar bütün lot halinde satın alınır.</p>
  <div class="card"><h3>Yeni ilan</h3><div class="row" style="margin:4px 0">${sel('mkRes',RES.map(r=>[r,`${RES_I[r]} ${RES_N[r]} (depoda ${f1(m.stor[r])})`]))}<input type="number" id="mkQty" min="1" placeholder="Miktar"><input type="number" id="mkPrice" min="0" step="any" placeholder="Birim fiyat ₺"></div><p class="dim">Devlet pazarı fiyatı: ${RES.map(r=>`${RES_I[r]}${fmt(S.prices[r])}₺`).join(' ')}</p>${btn('İlan ver','data-a="mkSell"','gold')}</div>`;
  const mine=MK.list.filter(x=>x.s===MP.uid()),others=MK.list.filter(x=>x.s!==MP.uid());
  if(mine.length){h+='<h2 style="margin-top:12px">İlanların</h2>';mine.forEach(x=>{h+=`<div class="q">${RES_I[x.r]} ${x.q} ${RES_N[x.r]} × ${fmt(x.p)}₺ = <b>${fmt(x.q*x.p)}₺</b> ${btn('Geri çek',`data-a="mkCancel" data-id="${x.id}"`,'sm danger')}</div>`;});}
  h+='<h2 style="margin-top:12px">Satıştaki ilanlar</h2>';
  if(!others.length)h+='<p class="dim">Şu an başka oyuncudan ilan yok.</p>';
  others.forEach(x=>{const t=Math.round(x.q*x.p);h+=`<div class="q">${RES_I[x.r]} <b>${x.q} ${RES_N[x.r]}</b> × ${fmt(x.p)}₺ = <b>${fmt(t)}₺</b><br><small>${esc(x.sn)} · devlet fiyatı ${fmt(S.prices[x.r])}₺ ${x.p<S.prices[x.r]?'<span class="ok">(ucuz)</span>':'<span class="bad">(pahalı)</span>'}</small> ${btn('Satın al',`data-a="mkBuy" data-id="${x.id}"`,'sm blue',m.money<t)}</div>`;});
  return h+'</div>';
}
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target&&e.target.id==='chatMsg'){e.preventDefault();ACT.chatSend();}});
/* ================= VALİLİK, DARBE, SIRALAMA ================= */
const LB={rows:[],sort:'lv',last:0,err:'',sig:''};
/* ---- vali: bölge hazinesi ---- */
function powerTick(h){
  const a=A();
  regOf('A').forEach(r=>{if(r.gov!=='me')return;
    const inc=r.idx.d*3000*(a.tax.inc/100)*(1+0.1*levelB(r,'house')),take=Math.min(a.budget.money,inc*0.4*h);
    if(take>0){a.budget.money-=take;r.treas=(r.treas||0)+take;}});
}
const myGovs=()=>regOf('A').filter(r=>r.gov==='me');
ACT.govAppoint=d=>{
  if(!isLeader())return msg('Yalnızca başkan vali atayabilir.');
  const r=S.regions[+d.id];if(!r||r.state!=='A')return;
  if(myGovs().length>=3)return msg('En fazla 3 bölgenin valisi olabilirsin.');
  r.gov='me';r.treas=r.treas||0;L(`🏙️ ${r.n} bölgesine vali olarak atandın.`,'ok');
};
ACT.govDismiss=d=>{const r=S.regions[+d.id];if(!r||r.gov!=='me')return;r.gov=null;L(`${r.n} valiliğinden ayrıldın.`,'info');};
ACT.govFund=d=>{const r=S.regions[+d.id];if(!r||r.gov!=='me')return;if(S.me.money<100000)return msg('Yetersiz para.');S.me.money-=100000;r.treas=(r.treas||0)+100000;msg('Bölge hazinesine 100.000₺ aktarıldı.','ok');};
ACT.govBuild=d=>{
  const r=S.regions[+d.id];if(!r||r.gov!=='me'||r.state!=='A')return msg('Bu bölgenin valisi değilsin.');
  const b=($('govB_'+r.id)||{}).value;if(!BUILD[b])return;
  if(r.bq.length>=3)return msg('İnşaat sırası dolu.');
  const c=Math.floor(buildCost(r,b)*0.6);if((r.treas||0)<c)return msg(`Bölge hazinesi yetersiz (${fmt(c)}₺).`);
  r.treas-=c;const st=r.bq.length?r.bq[r.bq.length-1].end:S.t;r.bq.push({b:b,start:st,end:st+buildTime(r,b)});
  L(`🏗️ ${r.n}: ${BUILD[b].n} inşaatı vali kararıyla başladı.`,'ok');
};
function govPanel(){
  const a=A(),regs=regOf('A');
  let h=`<div class="panel"><h2>🏙️ Valilikler</h2><p class="hint">Başkan bölgelere vali atar. Vali, bölgenin gelirinin %40'ını bölge hazinesinde biriktirir (devlet bütçesinden ayrılır), meclis oylaması beklemeden bina yaptırır ve inşaat %40 ucuza gelir. Hazineye kendi paranı da bağışlayabilirsin.</p><div class="grid">`;
  regs.forEach(r=>{
    const mine=r.gov==='me';
    h+=card(esc(r.n)+(mine?' <span class="owner">valisin</span>':''),
      `<p>Vali: ${mine?'<b>Sen</b>':'Yapay zekâ'}${mine?` · Hazine: <b>${fmt(r.treas||0)}₺</b>`:''}</p>`+
      (mine?`<div class="row" style="margin:4px 0">${sel('govB_'+r.id,Object.keys(BUILD).map(b=>[b,`${BUILD[b].i} ${BUILD[b].n} (${fmt(Math.floor(buildCost(r,b)*0.6))}₺)`]))}</div><div class="btns">${btn('İnşa ettir',`data-a="govBuild" data-id="${r.id}"`,'blue')}${btn('Bağış 100.000₺',`data-a="govFund" data-id="${r.id}"`,'gold sm',S.me.money<100000)}${btn('Valilikten ayrıl',`data-a="govDismiss" data-id="${r.id}"`,'danger sm')}</div>`
       :(isLeader()?btn('Kendimi vali ata',`data-a="govAppoint" data-id="${r.id}"`,'gold sm'):'<p class="dim">Başkan atar.</p>')));
  });
  return h+'</div></div>'+coupPanel();
}
/* ---- darbe ---- */
function coupChance(){
  const m=S.me,a=A(),tot=a.parties.reduce((x,p)=>x+Math.max(0,p.supp),0)||1,mp=a.parties.find(p=>p.id===m.party);
  const share=mp?Math.max(0,mp.supp)/tot:0;
  const army=regOf('A').reduce((x,r)=>x+r.idx.m,0)/Math.max(1,regOf('A').length);
  return clamp(0.06+Math.min(0.25,(m.dmg||0)/4e6)+share*0.5+Math.min(0.05,(m.paper?m.paper.subs:0)/8000)+(m.level>=30?0.05:0)-Math.max(0,army-5)*0.015,0.04,0.65);
}
ACT.coup=()=>{
  const m=S.me,a=A();
  if(isLeader())return msg('Zaten devletin başındasın.');
  if(m.level<10)return msg('Darbe için seviye 10 gerekli.');if(!m.party)return msg('Darbe için bir partide olmalısın.');
  if(m.jail>S.t)return msg('Hapistesin.');if(S.t<(m.coupCd||0))return msg(`Yeni girişim için ${fmtDur(m.coupCd-S.t)} bekle.`);
  if(a.gov==='dictatorship'&&false)return;
  if(m.money<250000)return msg('Darbe için 250.000₺ gerekli.');
  if(!confirm('Darbe girişimi: 250.000₺ harcanır, başarısız olursan hapse düşersin. Devam?'))return;
  m.money-=250000;m.coupCd=S.t+24*HOUR;const p=coupChance();
  if(Math.random()<p){
    a.leaderMe=true;a.leader=m.name;a.rulingParty=m.party;a.warScore=0;
    news(`⚔️ DARBE! ${m.name} iktidarı ele geçirdi.`);L(`⚔️ Darbe başarılı! ${nameOf('A')} artık senin yönetiminde.`,'ok');addXP(200);
    A().parties.forEach(q=>{if(q.id!==m.party)q.supp*=0.9;});
  }else{
    const loss=Math.floor(m.money*0.2);m.money-=loss;m.jail=S.t+3*HOUR;
    news(`🚨 ${m.name} darbe girişiminde yakalandı.`);L(`🚨 Darbe başarısız! ${fmt(loss)}₺ el konuldu, 3 saat hapistesin.`,'bad');
  }
};
function coupPanel(){
  const m=S.me;
  let h='<div class="panel"><h2>⚔️ Darbe</h2><div class="card">';
  if(isLeader())return h+'<p>Zaten iktidardasın.</p></div></div>';
  h+=`<p class="hint">Seçimi beklemeden iktidarı almaya çalışırsın. Başarı şansı rütben, partinin gücü, gazete abonelerin ve ordunun gücüne bağlıdır. Başarısız olursan paranın %20'si el konur ve 3 saat hapse girersin.</p>
  <p>Tahmini başarı şansın: <b>%${Math.round(coupChance()*100)}</b> · Maliyet: 250.000₺ · Şartlar: seviye 10, bir partiye üyelik</p>`;
  if(m.jail>S.t)h+=`<p class="bad">Hapistesin: ${cd(m.jail)}</p>`;
  else if(S.t<(m.coupCd||0))h+=`<p class="dim">Yeni girişim: ${cd(m.coupCd)}</p>`;
  h+=btn('⚔️ Darbe girişimi','data-a="coup"','danger',m.level<10||!m.party||m.money<250000||m.jail>S.t||S.t<(m.coupCd||0));
  return h+'</div></div>';
}
/* ---- sıralama tablosu ---- */
async function lbPush(){
  if(!MP.ok)return;
  try{await MP.fb('PUT','board/'+MP.uid(),{name:S.me.name,lv:S.me.level,money:Math.round(S.me.money),dmg:Math.round(S.me.dmg||0),rank:rankName(),tax:Math.round(S.me.taxPaid||0),adm:S.me.admin?1:0,seen:Date.now()});}catch(e){}
}
async function lbPoll(){
  if(!MP.ok)return;LB.last=Date.now();
  try{
    const d=await MP.fb('GET','board');const rows=d?Object.keys(d).map(k=>Object.assign({id:k},d[k])):[];
    LB.rows=rows;LB.err='';const sig=rows.length+':'+rows.map(r=>r.lv+'/'+r.money).join(',');if(sig!==LB.sig){LB.sig=sig;if(UI.tab==='lb')S.dirty=true;}
  }catch(e){LB.err=/401|403|ermission/i.test(e.message)?'Firebase kuralları güncel değil: Menü › Hesap bölümünden "Kuralları kopyala" ile yenile.':e.message;if(UI.tab==='lb')S.dirty=true;}
}
const lbTimer=()=>{if(UI.tab==='lb'&&MP.ok&&Date.now()-LB.last>8000)lbPoll();};
ACT.lbSort=d=>{LB.sort=d.s;};
function tabLb(){
  const keys={lv:['Seviye','lv'],money:['Servet','money'],dmg:['Savaş hasarı','dmg'],tax:['Ödenen vergi','tax']};
  let rows=LB.rows.filter(r=>!r.adm).map(r=>Object.assign({},r));
  const me=rows.find(r=>r.id===(MP.uid&&MP.uid()));
  if(me){me.lv=S.me.level;me.money=Math.round(S.me.money);me.dmg=Math.round(S.me.dmg||0);me.rank=rankName();me.tax=Math.round(S.me.taxPaid||0);}
  else if(!S.me.admin)rows.push({id:'me',name:S.me.name,lv:S.me.level,money:Math.round(S.me.money),dmg:Math.round(S.me.dmg||0),rank:rankName(),tax:Math.round(S.me.taxPaid||0)});
  if(S.me.admin&&typeof botRows==='function')botRows(50).forEach(b=>rows.push({id:b.id,name:'🤖 '+b.name,lv:b.lv,money:b.money,dmg:0,rank:'—',tax:b.tax}));
  const k=keys[LB.sort][1];rows.sort((a,b)=>(b[k]||0)-(a[k]||0));
  const myId=MP.ok?MP.uid():'me';
  let h=`<div class="panel"><h2>🏆 Sıralama</h2><div class="btns">${Object.keys(keys).map(s=>btn(keys[s][0],`data-a="lbSort" data-s="${s}"`,LB.sort===s?'gold sm':'sm')).join('')}</div>`;
  if(!MP.ok)h+='<div class="al warn" style="margin-top:8px">Diğer oyuncuları görmek için Menü › Hesap bölümünden giriş yap. Şimdilik sadece sen görünüyorsun.</div>';
  if(LB.err)h+=`<div class="al bad">${esc(LB.err)}</div>`;
  const pos=rows.findIndex(r=>r.id===myId||r.id==='me');
  if(pos>=0)h+=`<p class="hint">Senin sıran: <b>${pos+1}</b> / ${rows.length}</p>`;
  h+='<table style="margin-top:6px"><tr><th>#</th><th align=left>Oyuncu</th><th>Rütbe</th><th>Sv</th><th>'+keys[LB.sort][0]+'</th></tr>';
  rows.slice(0,50).forEach((r,i)=>{const mine=r.id===myId||r.id==='me';
    h+=`<tr style="${mine?'background:#1a2330':''}"><td>${i+1}</td><td>${esc(r.name)}${mine?' (sen)':''}</td><td class="dim">${esc(r.rank||'')}</td><td class="num">${r.lv}</td><td class="num"><b>${fmt(r[k]||0)}</b></td></tr>`;});
  return h+'</table></div>';
}
/* ================= YÖNETİCİ ARAÇLARI + OYUNCU TARAFI (duyuru, olay, sezon, ceza) ================= */
const EVT={
  gold_rush:{n:'⛏️ Altın Çağı',d:'Çalışma kazancı ×2',h:true},
  price_up:{n:'📈 Fiyat patlaması',d:'Seçilen kaynağın fiyatı +%35',r:true},
  price_down:{n:'📉 Fiyat çöküşü',d:'Seçilen kaynağın fiyatı −%30',r:true},
  energy:{n:'⚡ Enerji bayramı',d:'Herkesin enerjisi dolar (+50)'},
  money:{n:'💰 Devlet yardımı',d:'Herkese para (miktarı yaz)',v:true}
};
const evtMult=()=>(S.evt&&S.evt.k==='gold_rush'&&S.evt.until>S.t)?2:1;
function applyEvent(e){
  const m=S.me,k=e.k;if(!EVT[k])return;
  const nm=EVT[k].n;
  if(k==='gold_rush'){S.evt={k:k,until:S.t+Math.max(1,+e.h||2)*HOUR};L(`🎉 ${nm}: ${+e.h||2} saat boyunca çalışma kazancı iki katı!`,'ok');}
  else if(k==='price_up'&&PRICE0[e.r]){S.prices[e.r]=Math.min(PRICE0[e.r]*2.2,S.prices[e.r]*1.35);L(`📈 ${RES_N[e.r]} fiyatı yükseldi!`,'ok');}
  else if(k==='price_down'&&PRICE0[e.r]){S.prices[e.r]=Math.max(PRICE0[e.r]*0.5,S.prices[e.r]*0.7);L(`📉 ${RES_N[e.r]} fiyatı düştü!`,'warn');}
  else if(k==='energy'){m.energy=Math.max(m.energy,Math.min(150,m.energy+50));L('⚡ Enerji bayramı: enerjin yükseldi!','ok');}
  else if(k==='money'){const v=Math.max(0,Math.min(1e6,+e.v||0));m.money+=v;L(`💰 Devlet yardımı: ${fmt(v)}₺ hesabına yattı.`,'ok');}
  S.dirty=true;
}
/* ---- oyuncu: sunucudan gelenler ---- */
async function adminSync(){
  if(!MP.ok)return;
  const c=await MP.fb('GET','cfg')||{};
  const m=S.me;
  if(c.announce&&c.announce.id){
    S.ann=c.announce;
    if(m.annSeen!==c.announce.id){m.annSeen=c.announce.id;toast('📣 '+c.announce.m,'ok');L('📣 Duyuru: '+c.announce.m,'ok');S.dirty=true;}
  }else if(S.ann){S.ann=null;S.dirty=true;}
  if(c.event&&c.event.id&&m.evtSeen!==c.event.id){
    m.evtSeen=c.event.id;
    if(Date.now()-c.event.t<12*3600e3)applyEvent(c.event);
  }
  if(!c.season&&S.season===undefined)S.season=0;
  if(c.season){
    if(S.season===undefined){S.season=c.season;}
    else if(S.season!==c.season&&!m.admin){
      const keep={name:m.name,annSeen:m.annSeen,evtSeen:m.evtSeen};
      const mu=S.mpUid;S=newState();S.adm={claimed:{},collected:0};S.bots=[];S.mpUid=mu;S.season=c.season;S.me.name=keep.name;S.me.annSeen=keep.annSeen;S.me.evtSeen=keep.evtSeen;S.live=true;
      L('🆕 Yeni sezon başladı! Herkes sıfırdan başlıyor.','ok');save();S.dirty=true;UI.tab='char';
    }else if(m.admin&&S.season!==c.season)S.season=c.season;
  }
  try{MP.ban=await MP.fb('GET','bans/'+MP.uid())||null;}catch(e){MP.ban=null;}
  const b=MP.ban;
  if(b&&b.jail>Date.now()&&!m.admin){const u=S.t+(b.jail-Date.now());if(!(m.jail>u))m.jail=u;S.dirty=true;}
  if(b&&b.ban!==MP.banShown){MP.banShown=b.ban;S.dirty=true;}
}
function banScreen(){
  const w=MP.ban&&MP.ban.why?esc(MP.ban.why):'';
  return `<div class="panel"><h2>⛔ Hesabın askıya alındı</h2><div class="al bad">Yönetici bu hesabın oyuna katılmasını durdurdu.${w?` Sebep: <b>${w}</b>`:''}</div></div>`;
}
const isBanned=()=>!!(MP.ban&&MP.ban.ban&&MP.role!=='admin');
/* ---- yönetici eylemleri ---- */
ACT.admAnnounce=async()=>{
  const v=(($('annTxt')||{}).value||'').trim().slice(0,200);if(!v)return msg('Duyuru metnini yaz.');
  try{await MP.fb('PUT','cfg/announce',{id:String(Date.now()),m:v,t:Date.now()});S.me.annSeen=null;msg('📣 Duyuru yayınlandı.','ok');MP.sync();}catch(e){msg(rulesHint(e));}
};
ACT.admAnnClear=async()=>{try{await MP.fb('DELETE','cfg/announce');S.ann=null;msg('Duyuru kaldırıldı.','ok');}catch(e){msg(rulesHint(e));}S.dirty=true;};
ACT.admEvent=async()=>{
  const k=($('evK')||{}).value;if(!EVT[k])return;
  const e={id:String(Date.now()),k:k,t:Date.now(),r:($('evR')||{}).value||'gold',v:+($('evV')||{}).value||0,h:+($('evH')||{}).value||2};
  try{await MP.fb('PUT','cfg/event',e);S.me.evtSeen=e.id;msg('🎲 Olay tetiklendi: '+EVT[k].n,'ok');}catch(x){msg(rulesHint(x));}
};
ACT.admSeason=async()=>{
  if(!confirm('YENİ SEZON: tüm oyuncuların ilerlemesi sıfırlanır (hesaplar kalır). Emin misin?'))return;
  try{const v=Date.now();await MP.fb('PUT','cfg/season',v);S.season=v;
    try{await MP.fb('DELETE','board');await MP.fb('DELETE','chat');}catch(e){}
    msg('🆕 Yeni sezon başlatıldı. Oyuncular bir sonraki eşitlemede sıfırlanır.','ok');}catch(e){msg(rulesHint(e));}
};
ACT.admMod=async d=>{
  const id=MP.sel;if(!id||botById(id))return msg('Önce gerçek bir oyuncu seç.');
  if(id===MP.uid())return msg('Kendine uygulayamazsın.');
  let cur={};try{cur=await MP.fb('GET','bans/'+id)||{};}catch(e){}
  const k=d.k,now=Date.now();
  if(k==='mute')cur.chat=cur.chat?null:true;
  else if(k==='ban')cur.ban=cur.ban?null:true;
  else if(k==='jail1')cur.jail=now+3600e3;else if(k==='jail24')cur.jail=now+24*3600e3;else if(k==='free')cur.jail=null;
  cur.why=(($('modWhy')||{}).value||cur.why||'').slice(0,80);cur.name=(MP.players[id]||{}).name||'';
  const o={};Object.keys(cur).forEach(x=>{if(cur[x]!==null&&cur[x]!==undefined&&cur[x]!==false)o[x]=cur[x];});
  try{if(o.chat||o.ban||o.jail)await MP.fb('PUT','bans/'+id,o);else await MP.fb('DELETE','bans/'+id);MP.bans=MP.bans||{};MP.bans[id]=o;msg('Uygulandı.','ok');}
  catch(e){msg(rulesHint(e));}
  S.dirty=true;
};
async function admBansLoad(){try{MP.bans=await MP.fb('GET','bans')||{};}catch(e){}}
function adminExtra(){
  const opt=Object.keys(EVT).map(k=>`<option value="${k}">${EVT[k].n}</option>`).join('');
  const rs=RES.map(r=>`<option value="${r}">${RES_N[r]}</option>`).join('');
  const inp='style="width:100%;padding:7px;background:#06090d;color:#c9d1d9;border:1px solid #2a3542;border-radius:5px;margin:3px 0"';
  let h=`<div class="panel"><h2>📣 Duyuru ve olaylar</h2><div class="grid">
  ${card('📣 Duyuru',`<input type="text" id="annTxt" ${inp} maxlength="200" placeholder="Tüm oyunculara mesaj" value="${esc((S.ann&&S.ann.m)||'')}"><div class="btns">${btn('Yayınla','data-a="admAnnounce"','gold')}${S.ann?btn('Kaldır','data-a="admAnnClear"','sm'):''}</div>`)}
  ${card('🎲 Olay tetikle',`<select id="evK" ${inp}>${opt}</select><select id="evR" ${inp}>${rs}</select><div class="row"><input type="number" id="evV" ${inp} placeholder="Para (yardım)"><input type="number" id="evH" ${inp} placeholder="Süre (sa)" value="2"></div>${btn('Tetikle','data-a="admEvent"','gold')}<p class="dim">Altın Çağı: süre; fiyat olayları: kaynak; yardım: miktar.</p>`)}
  ${card('🆕 Sezon',`<p class="dim">Tüm oyuncuların ilerlemesini sıfırlar, hesaplar kalır. Sıralama ve sohbet temizlenir.</p>${btn('Yeni sezon başlat','data-a="admSeason"','danger')}`)}
  </div></div>`;
  const id=MP.sel;
  if(id&&!botById(id)&&id!==MP.uid()&&MP.players[id]){
    const b=(MP.bans||{})[id]||{};
    h+=`<div class="panel"><h2>🛡️ Moderasyon: ${esc(MP.players[id].name)}</h2><div class="card"><p>${b.ban?'⛔ Banlı ':''}${b.chat?'🔇 Susturulmuş ':''}${b.jail>Date.now()?'⛓️ Hapiste ':''}${!b.ban&&!b.chat&&!(b.jail>Date.now())?'<span class="dim">Ceza yok</span>':''}</p>
    <input type="text" id="modWhy" ${inp} maxlength="80" placeholder="Sebep (isteğe bağlı)" value="${esc(b.why||'')}">
    <div class="btns">${btn(b.chat?'🔊 Susturmayı kaldır':'🔇 Sustur','data-a="admMod" data-k="mute"')}${btn('⛓️ Hapis 1sa','data-a="admMod" data-k="jail1"')}${btn('⛓️ Hapis 24sa','data-a="admMod" data-k="jail24"')}${b.jail>Date.now()?btn('Hapisten çıkar','data-a="admMod" data-k="free"'):''}${btn(b.ban?'✅ Banı kaldır':'⛔ Banla','data-a="admMod" data-k="ban"','danger')}</div></div></div>`;
  }
  return h;
}
/* ================= GÜNLÜK GÖREV, GİRİŞ ÖDÜLÜ, BAŞARIM ================= */
const dayKey=()=>{try{return new Date().toLocaleDateString('sv');}catch(e){return new Date().toISOString().slice(0,10);}};
const dayNum=()=>Math.floor(new Date(dayKey()+'T00:00:00Z').getTime()/864e5);
const QPOOL=[
  {id:'work',t:'Çalış',k:'works',n:8,i:'⛏️'},
  {id:'sell',t:'Kaynak sat',k:'sells',n:3,i:'💰'},
  {id:'buy',t:'Kaynak satın al',k:'buys',n:2,i:'🛒'},
  {id:'hit',t:'Savaşta vur',k:'hits',n:2,i:'⚔️'},
  {id:'craft',t:'Eşya üret',k:'crafts',n:1,i:'🔧'},
  {id:'chat',t:'Sohbette mesaj yaz',k:'msgs',n:1,i:'💬'}];
const ACHS=[
  {id:'l5',t:'Çırak',d:'Seviye 5',f:m=>m.level>=5,g:1},{id:'l10',t:'Usta',d:'Seviye 10',f:m=>m.level>=10,g:2},
  {id:'l25',t:'Üstat',d:'Seviye 25',f:m=>m.level>=25,g:5},{id:'l50',t:'Efsane',d:'Seviye 50',f:m=>m.level>=50,g:10},
  {id:'w10',t:'İşçi',d:'10 kez çalış',f:m=>(m.works||0)>=10,g:1},{id:'w100',t:'Çalışkan',d:'100 kez çalış',f:m=>(m.works||0)>=100,g:3},
  {id:'w1k',t:'Vazgeçmez',d:'1000 kez çalış',f:m=>(m.works||0)>=1000,g:10},
  {id:'h10',t:'Savaşçı',d:'10 vuruş',f:m=>(m.hits||0)>=10,g:1},{id:'h100',t:'Komutan',d:'100 vuruş',f:m=>(m.hits||0)>=100,g:4},
  {id:'f1',t:'Sanayici',d:'İlk fabrika',f:m=>m.facs.length>=1,g:2},
  {id:'p1',t:'Siyasetçi',d:'Bir partiye katıl',f:m=>!!m.party,g:1},
  {id:'m1',t:'Milyoner',d:'1.000.000₺ biriktir',f:m=>m.money>=1e6,g:3},{id:'m10',t:'Zengin',d:'10.000.000₺ biriktir',f:m=>m.money>=1e7,g:8},
  {id:'s50',t:'Tüccar',d:'50 satış yap',f:m=>(m.sells||0)>=50,g:3},
  {id:'ld',t:'Lider',d:'Devletin başkanı ol',f:()=>isLeader(),g:10}];
function qState(){
  const m=S.me,k=dayKey();
  if(!m.q||m.q.day!==k){
    const seed=dayNum(),pool=QPOOL.slice(),pick=[];
    for(let i=0;i<3;i++){const x=pool.splice((seed*7+i*3+i*i)%pool.length,1)[0];pick.push(x.id);}
    m.q={day:k,ids:pick,base:{works:m.works||0,sells:m.sells||0,buys:m.buys||0,hits:m.hits||0,crafts:m.crafts||0,msgs:m.msgs||0},done:{}};
  }
  return m.q;
}
const qProg=q=>q.ids.map(id=>{const d=QPOOL.find(x=>x.id===id),cur=(S.me[d.k]||0)-(q.base[d.k]||0);return Object.assign({cur:Math.min(d.n,Math.max(0,cur)),done:!!q.done[id],ok:cur>=d.n},d);});
const qReward=()=>({money:2000+S.me.level*300,gold:1,xp:10+S.me.level});
ACT.qClaim=d=>{
  const q=qState(),p=qProg(q).find(x=>x.id===d.id);if(!p||!p.ok||p.done)return;
  const r=qReward();q.done[p.id]=1;S.me.money+=r.money;S.me.stor.gold=Math.min(storCap(),S.me.stor.gold+r.gold);addXP(r.xp);
  msg(`✅ Görev tamam: +${fmt(r.money)}₺, +${r.gold} altın`,'ok');
  if(q.ids.every(i=>q.done[i])){S.me.stor.gold=Math.min(storCap(),S.me.stor.gold+2);L('🏅 Bugünün tüm görevleri tamam: +2 altın bonus.','ok');}
};
function streakInfo(){
  const m=S.me,k=dayKey(),s=m.streak||{last:'',n:0};
  const y=new Date(Date.now()-864e5).toLocaleDateString('sv');
  const can=s.last!==k,n=can?((s.last===y)?s.n+1:1):s.n;
  return {can:can,n:n,day:((n-1)%7)+1};
}
const streakReward=day=>({money:1000*day+S.me.level*100,gold:day===7?10:(day>=4?2:0),en:day>=3?30:0});
ACT.dailyClaim=()=>{
  const m=S.me,i=streakInfo();if(!i.can)return;
  const r=streakReward(i.day);m.streak={last:dayKey(),n:i.n};m.money+=r.money;m.stor.gold=Math.min(storCap(),m.stor.gold+r.gold);m.energy=Math.min(150,m.energy+r.en);
  msg(`🎁 Giriş ödülü (${i.day}. gün): +${fmt(r.money)}₺${r.gold?` +${r.gold} altın`:''}${r.en?` +${r.en} enerji`:''}`,'ok');
};
let _qT=0;
function questTick(){
  if(Date.now()-_qT<3000)return;_qT=Date.now();
  const m=S.me;m.ach=m.ach||{};let got=0;
  ACHS.forEach(a=>{if(!m.ach[a.id]&&a.f(m)){m.ach[a.id]=Date.now();m.stor.gold=Math.min(storCap(),m.stor.gold+a.g);toast(`🏆 Başarım: ${a.t} (+${a.g} altın)`,'ok');L(`🏆 Başarım açıldı: ${a.t} — ${a.d} (+${a.g} altın)`,'ok');got++;}});
  if(got)S.dirty=true;
}
function questBadge(){
  try{const q=qState();let n=qProg(q).filter(p=>p.ok&&!p.done).length;if(streakInfo().can)n++;return n;}catch(e){return 0;}
}
function tabQuest(){
  const q=qState(),ps=qProg(q),si=streakInfo(),r=qReward(),m=S.me;m.ach=m.ach||{};
  let h=`<div class="panel"><h2>🎁 Günlük giriş ödülü</h2><div class="card"><p>Seri: <b>${si.n}</b> gün · Bugünkü ödül (${si.day}. gün): <b>${fmt(streakReward(si.day).money)}₺</b>${streakReward(si.day).gold?` + ${streakReward(si.day).gold} altın`:''}${streakReward(si.day).en?` + ${streakReward(si.day).en} enerji`:''}</p>
  <div class="dim">7. günde büyük ödül (10 altın). Bir gün atlarsan seri başa döner.</div>
  ${btn(si.can?'🎁 Ödülü al':'Bugün alındı ✓','data-a="dailyClaim"','gold',!si.can)}</div></div>
  <div class="panel"><h2>📋 Bugünün görevleri</h2>`;
  ps.forEach(p=>{h+=`<div class="card"><h3>${p.i} ${p.t}: ${p.cur}/${p.n}</h3>${bar(p.cur,p.n,p.done?'#3fb950':undefined)}<p class="dim">Ödül: ${fmt(r.money)}₺ + ${r.gold} altın</p>${btn(p.done?'Alındı ✓':'Ödülü al',`data-a="qClaim" data-id="${p.id}"`,'gold',!p.ok||p.done)}</div>`;});
  h+=`<p class="hint">Görevler her gün yenilenir. Üçünü de bitirirsen +2 altın bonus.</p></div><div class="panel"><h2>🏆 Başarımlar (${Object.keys(m.ach).length}/${ACHS.length})</h2><div class="grid">`;
  ACHS.forEach(a=>{const o=!!m.ach[a.id];h+=`<div class="card" style="${o?'border-color:#3fb950':'opacity:.55'}"><h3>${o?'🏆':'🔒'} ${a.t}</h3><p class="dim">${a.d}</p><p class="dim">Ödül: ${a.g} altın</p></div>`;});
  return h+'</div></div>';
}
/* ================= YATIRIMLAR (para harcama yolları) ================= */
const INV={
  house:{i:'🏠',n:'Ev',d:'Her seviye +4 enerji/saat',max:5,cost:l=>40000*Math.pow(2.2,l)},
  depo:{i:'📦',n:'Depo genişletme',d:'Her seviye kaynak kapasitesi +25%',max:5,cost:l=>25000*Math.pow(2,l)},
  akad:{i:'🎓',n:'Akademi',d:'Her seviye kazanılan XP +8%',max:5,cost:l=>60000*Math.pow(2.3,l)},
  fab:{i:'🏭',n:'Verimlilik ofisi',d:'Her seviye çalışma kazancı +5%',max:5,cost:l=>80000*Math.pow(2.4,l)}
};
const invL=k=>((S.me.inv||{})[k])||0;
const invCost=k=>Math.round(INV[k].cost(invL(k))/100)*100;
ACT.invBuy=d=>{
  const k=d.k,I=INV[k],m=S.me;if(!I)return;
  if(invL(k)>=I.max)return msg('Bu yatırım en üst seviyede.');
  const c=invCost(k);if(m.money<c)return msg(`Yetersiz para (${fmt(c)}₺).`);
  m.money-=c;m.inv=m.inv||{};m.inv[k]=invL(k)+1;
  L(`${I.i} ${I.n} seviye ${m.inv[k]} oldu (−${fmt(c)}₺).`,'ok');msg(`${I.n} geliştirildi!`,'ok');
};
function invPanel(){
  let h='<div class="panel"><h2>💼 Yatırımlar</h2><p class="hint">Paranı kalıcı güçlendirmelere harca. Seviye attıkça maliyet artar.</p><div class="grid">';
  Object.keys(INV).forEach(k=>{const I=INV[k],l=invL(k),mx=l>=I.max;
    h+=card(`${I.i} ${I.n} <small>(${l}/${I.max})</small>`,`${bar(l,I.max,'#58a6ff')}<p class="dim">${I.d}</p>${btn(mx?'Maksimum ✓':'Geliştir · '+fmt(invCost(k))+'₺',`data-a="invBuy" data-k="${k}"`,'gold',mx||S.me.money<invCost(k))}`);});
  return h+'</div></div>';
}
/* ================= ANTRENMAN SAVAŞI (risksiz, gerçek savaş yokken) ================= */
const TR_COST=5;
function trState(){
  const m=S.me;if(!m.tr)m.tr={lv:1,hp:0,max:0,wins:0};
  const t=m.tr;
  if(!(t.max>0)){t.max=Math.round(hitDamage(null)*22*(1+t.lv*0.18));t.hp=t.max;}
  return t;
}
ACT.trHit=d=>{
  const m=S.me,t=trState(),n=d&&d.n==='all'?Math.floor(m.energy/TR_COST):1;
  if(m.jail>S.t)return msg('Hapistesin.');
  if(m.travel)return msg('Yoldasın.');
  if(m.energy<TR_COST)return msg(`Yetersiz enerji (${TR_COST}).`);
  let tot=0,k=0;
  while(k<Math.max(1,n)&&m.energy>=TR_COST&&t.hp>0){
    const dm=Math.max(1,Math.round(hitDamage(null)*(0.9+Math.random()*0.2)));
    m.energy-=TR_COST;t.hp-=dm;tot+=dm;k++;m.hits=(m.hits||0)+1;m.dmg=(m.dmg||0)+dm*0.25;addXP(2);
  }
  if(t.hp<=0){
    const mo=1500*t.lv+m.level*100,xp=15+t.lv*3;
    m.money+=mo;addXP(xp);t.wins++;
    if(t.lv%5===0)m.stor.gold=Math.min(storCap(),m.stor.gold+2);
    L(`🥊 Antrenman rakibi (Sv ${t.lv}) yenildi: +${fmt(mo)}₺, +${xp} XP${t.lv%5===0?', +2 altın':''}.`,'ok');
    msg(`🥊 Rakip yenildi! +${fmt(mo)}₺`,'ok');
    t.lv=Math.min(30,t.lv+1);t.max=0;trState();
  }else msg(`💥 ${fmt(tot)} hasar (${k} vuruş)`,'ok');
};
ACT.trReset=()=>{const t=S.me.tr;if(t){t.max=0;}trState();};
function trPanel(){
  const m=S.me,t=trState(),real=S.wars.some(w=>w.state!=='done'&&(w.att==='A'||w.def==='A'));
  return `<h2 style="margin-top:12px">🥊 Antrenman savaşı</h2><div class="card">
  <p class="dim">${real?'Devletin savaşta ama antrenman da yapabilirsin. ':'Gerçek savaş yok: antrenmanla XP ve para kazan. '}Risk yok; vuruş başına ${TR_COST} enerji. Rakibi yenince seviye atlar ve ödülü büyür. Hasarın %25'i rütbe puanına eklenir.</p>
  <p><b>Rakip: Sv ${t.lv}</b> · ${t.wins} galibiyet</p>
  <div class="bar"><div style="width:${clamp(t.hp/t.max*100,0,100)}%;background:#f85149"></div></div><p class="dim">${fmt(Math.max(0,t.hp))} / ${fmt(t.max)} can · vuruş ≈ ${fmt(hitDamage(null))}</p>
  <div class="btns">${btn('🥊 Vur','data-a="trHit"','danger')}${btn('Tüm enerjiyle vur','data-a="trHit" data-n="all"','danger')}</div></div>`;
}
/* ================= ORTAK DÜNYA: bölge valileri + oyuncular arası gerçek savaş (Firebase) ================= */
const SW={regs:{},wars:{},last:0,err:'',sig:'',busy:false};
const SW_CLAIM=100000,SW_DECL=50000,SW_PREP=10*60e3,SW_LEN=60*60e3,SW_MAXREG=3;
const swHue=uid=>{let h=0;for(const c of String(uid))h=(h*31+c.charCodeAt(0))%360;return `hsl(${h},75%,60%)`;};
const swMine=()=>Object.keys(SW.regs).filter(i=>SW.regs[i]&&SW.regs[i].o===MP.uid());
const swActive=()=>Object.keys(SW.wars).map(id=>Object.assign({id:id},SW.wars[id])).filter(w=>!w.win&&w.t1+5000>Date.now());
const swWarOn=i=>swActive().find(w=>+w.i===+i);
async function swPoll(){
  if(!MP.ok||SW.busy)return;SW.busy=true;SW.last=Date.now();
  try{
    const d=await MP.fb('GET','world')||{};
    SW.regs=d.regions||{};SW.wars=d.wars||{};SW.err='';
    const now=Date.now(),me=MP.uid(),m=S.me;
    // biten savaşları sonuçlandır
    for(const id of Object.keys(SW.wars)){
      const w=SW.wars[id];if(!w||!(w.t1<now-2000))continue;
      if(!w.win){
        const win=(+w.dA>+w.dD)?w.a:w.d,nm=(+w.dA>+w.dD)?w.an:w.dn;
        try{await MP.fb('PUT','world/wars/'+id+'/win',win);w.win=win;
          await MP.fb('PUT','world/regions/'+w.i,{o:win,on:nm||'?',t:now,w:id});SW.regs[w.i]={o:win,on:nm,t:now,w:id};}catch(e){}
      }else{
        const r=SW.regs[w.i];
        if(!r||(r.w!==id&&(r.t||0)<w.t1)){try{const nm=w.win===w.a?w.an:w.dn;await MP.fb('PUT','world/regions/'+w.i,{o:w.win,on:nm||'?',t:now,w:id});SW.regs[w.i]={o:w.win,on:nm,t:now,w:id};}catch(e){}}
      }
    }
    // saldırı bildirimi
    m.swSeen=m.swSeen||{};
    swActive().forEach(w=>{if(w.d===me&&!m.swSeen[w.id]){m.swSeen[w.id]=1;const rn=(S.regions[w.i]||{}).n||'bölgen';toast(`⚠️ ${w.an} ${rn} bölgene savaş açtı!`,'bad');L(`⚠️ ${w.an}, valisi olduğun ${rn} bölgesine savaş açtı (savaş ${Math.round((w.t0-now)/60000)} dk sonra başlıyor).`,'bad');S.dirty=true;}});
    // savaş ödülleri
    m.swClaimed=m.swClaimed||{};
    Object.keys(SW.wars).forEach(id=>{const w=SW.wars[id];if(!w||!w.win||m.swClaimed[id])return;
      const p=w.ps&&w.ps[me];m.swClaimed[id]=1;if(!p||!(+p.dmg>0))return;
      const wside=w.win===w.a?'A':'D',won=p.side===wside,rn=(S.regions[w.i]||{}).n||'';
      const mo=Math.min(300000,Math.round(p.dmg*2))+(won?30000:0),g=won?3:0;
      m.money+=mo;m.stor.gold=Math.min(storCap(),m.stor.gold+g);
      L(`${won?'🏆':'🎖️'} ${rn} savaşı bitti (${won?'kazanan taraf':'kaybeden taraf'}): katkın ${fmt(p.dmg)} → +${fmt(mo)}₺${g?` +${g} altın`:''}`,won?'ok':'info');S.dirty=true;});
    const ks=Object.keys(m.swClaimed);if(ks.length>60)ks.slice(0,30).forEach(k=>{delete m.swClaimed[k];delete m.swSeen[k];});
    // vali geliri
    const mine=swMine();
    if(mine.length){
      const last=m.swInc||now,hrs=Math.min(24,Math.max(0,(now-last)/3600e3));
      if(hrs>0.02){let g=0;mine.forEach(i=>{const r=S.regions[+i];g+=1500*hrs*(1+0.1*(r?r.idx.d:5));});
        m.money+=g;m.swInc=now;if(g>=1000){L(`🏛️ Vali geliri: +${fmt(g)}₺ (${mine.length} bölge)`,'ok');S.dirty=true;}}
    }else m.swInc=now;
    const sig=Object.keys(SW.regs).map(i=>i+(SW.regs[i].o||'')).join(',')+'|'+swActive().map(w=>w.id+(+w.dA)+'/'+(+w.dD)).join(',');
    if(sig!==SW.sig){SW.sig=sig;S.dirty=true;}
  }catch(e){SW.err=rulesHint(e);if(UI.tab==='sw')S.dirty=true;}
  SW.busy=false;
}
ACT.swClaim=async d=>{
  const i=+d.i,m=S.me,r=S.regions[i];
  if(!MP.ok)return msg('Önce giriş yap (Menü › Hesap).');
  if(m.level<8)return msg('Vali olmak için seviye 8 gerekli.');
  if(m.money<SW_CLAIM)return msg(`Yetersiz para (${fmt(SW_CLAIM)}₺).`);
  if(swMine().length>=SW_MAXREG)return msg(`En fazla ${SW_MAXREG} bölgeye vali olabilirsin.`);
  if(SW.regs[i])return msg('Bu bölgenin zaten bir valisi var.');
  try{await MP.fb('PUT','world/regions/'+i,{o:MP.uid(),on:m.name,t:Date.now()});m.money-=SW_CLAIM;SW.regs[i]={o:MP.uid(),on:m.name,t:Date.now()};
    m.swInc=m.swInc||Date.now();L(`🏛️ ${r.n} bölgesinin valisi oldun (−${fmt(SW_CLAIM)}₺). Saatlik gelir kazanırsın.`,'ok');MP.ev&&MP.ev(`${r.n} bölgesine vali oldu`);msg('Vali oldun!','ok');}
  catch(e){msg(/401|403|ermission/i.test(e.message)?'Bu bölge az önce başkasına geçti ya da kurallar güncel değil.':rulesHint(e));swPoll();}
  S.dirty=true;
};
ACT.swDeclare=async d=>{
  const i=+d.i,m=S.me,r=S.regions[i],reg=SW.regs[i];
  if(!MP.ok)return msg('Önce giriş yap (Menü › Hesap).');
  if(m.level<10)return msg('Savaş açmak için seviye 10 gerekli.');
  if(!reg)return msg('Bu bölge boş; vali olabilirsin.');
  if(reg.o===MP.uid())return msg('Kendi bölgene savaş açamazsın.');
  if(swWarOn(i))return msg('Bu bölgede zaten savaş var.');
  if(m.money<SW_DECL)return msg(`Yetersiz para (${fmt(SW_DECL)}₺).`);
  const id=Date.now()+'_'+MP.uid().slice(0,6),t0=Date.now()+SW_PREP;
  const w={i:i,a:MP.uid(),an:m.name,d:reg.o,dn:reg.on,t0:t0,t1:t0+SW_LEN,dA:0,dD:0};
  try{await MP.fb('PUT','world/wars/'+id,w);m.money-=SW_DECL;SW.wars[id]=w;L(`⚔️ ${r.n} bölgesine ${reg.on} aleyhine savaş ilan ettin (−${fmt(SW_DECL)}₺). 10 dk sonra başlar, 1 saat sürer.`,'ok');
    MP.ev&&MP.ev(`${r.n} için ${reg.on} aleyhine savaş açtı`);msg('Savaş ilan edildi!','ok');}
  catch(e){msg(rulesHint(e));}
  S.dirty=true;
};
ACT.swHit=async d=>{
  const w=SW.wars[d.id],m=S.me,now=Date.now();
  if(!w)return msg('Savaş bulunamadı.');
  if(now<w.t0)return msg('Savaş henüz başlamadı.');if(now>w.t1)return msg('Savaş bitti.');
  if(m.jail>S.t)return msg('Hapistesin.');
  if(m.energy<10)return msg('Yetersiz enerji (10).');
  const side=d.side==='D'?'D':'A',dm=Math.max(1,Math.round(hitDamage(null)));
  m.energy-=10;
  try{
    await MP.fb('PUT','world/wars/'+d.id+'/d'+side,{'.sv':{increment:dm}});
    await MP.fb('PATCH','world/wars/'+d.id+'/ps/'+MP.uid(),{dmg:{'.sv':{increment:dm}},side:side,n:m.name});
    m.dmg=(m.dmg||0)+dm;m.hits=(m.hits||0)+1;addXP(6);
    w['d'+side]=(+w['d'+side]||0)+dm;msg(`💥 ${fmt(dm)} hasar`,'ok');
  }catch(e){m.energy+=10;msg(rulesHint(e));}
  S.dirty=true;
};
ACT.swRelease=async d=>{
  if(!confirm('Valiliği bırakmak istiyor musun? Bölge boşa düşer.'))return;
  try{await MP.fb('DELETE','world/regions/'+d.i);delete SW.regs[d.i];msg('Valilik bırakıldı.','ok');}catch(e){msg(rulesHint(e));}S.dirty=true;
};
function swAlerts(){
  if(!MP.ok)return [];const out=[],me=MP.uid(),now=Date.now();
  swActive().forEach(w=>{if(w.a!==me&&w.d!==me)return;const rn=(S.regions[w.i]||{}).n||'';
    out.push(`<div class="al ${w.d===me?'bad':'info'}">⚔️ Ortak savaş: <b>${esc(rn)}</b> — ${esc(w.an)} → ${esc(w.dn)} · ${now<w.t0?'başlamasına '+Math.max(1,Math.round((w.t0-now)/60000))+' dk':'bitişine '+Math.max(0,Math.round((w.t1-now)/60000))+' dk'} <button class="act sm blue" data-a="tab" data-t="sw">Git</button></div>`);});
  return out;
}
function tabSW(){
  let h=`<div class="panel"><h2>🤝 Ortak dünya — oyuncular arası</h2>`;
  if(!MP.ok)return h+'<div class="al warn">Ortak dünya için Menü › Hesap bölümünden giriş yap.</div></div>';
  if(SW.err)h+=`<div class="al bad">${esc(SW.err)}</div>`;
  const m=S.me,me=MP.uid(),now=Date.now();
  h+=`<p class="hint">Burada herkes aynı haritayı görür. Boş bir bölgeye <b>vali</b> ol (${fmt(SW_CLAIM)}₺, seviye 8): saatlik gelir kazanırsın. Başkasının bölgesine <b>savaş aç</b> (${fmt(SW_DECL)}₺, seviye 10): 10 dk hazırlık, 1 saat savaş; herkes istediği tarafa vurabilir, çok hasar veren taraf bölgeyi alır. Katkın ödül kazandırır. En fazla ${SW_MAXREG} bölgen olabilir.</p>`;
  const act=swActive();
  if(act.length){h+='<h2>Aktif savaşlar</h2><div class="grid">';
    act.forEach(w=>{const r=S.regions[w.i]||{n:'?'},tot=(+w.dA||0)+(+w.dD||0)||1,on=now>=w.t0&&now<=w.t1,my=w.ps&&w.ps[me];
      h+=card(`⚔️ ${esc(r.n)}`,`<p>${esc(w.an)} <span class="dim">→</span> ${esc(w.dn)}</p><div class="bar2"><div style="width:${(+w.dA||0)/tot*100}%"></div></div><p class="dim">${fmt(+w.dA||0)} / ${fmt(+w.dD||0)} (saldırgan / savunan)${my?` · katkın ${fmt(my.dmg)}`:''}</p><p>${on?'bitişine '+Math.max(0,Math.round((w.t1-now)/60000))+' dk':'başlamasına '+Math.max(1,Math.round((w.t0-now)/60000))+' dk'}</p>
        <div class="btns">${btn(`⚔️ Saldırgana vur (${fmt(hitDamage(null))})`,`data-a="swHit" data-id="${w.id}" data-side="A"`,'danger',!on)}${btn('🛡️ Savunana vur',`data-a="swHit" data-id="${w.id}" data-side="D"`,'blue',!on)}</div>`);});
    h+='</div>';}
  const mine=swMine();
  h+=`<h2 style="margin-top:12px">Bölgeler <span class="dim">(valiliğin: ${mine.length}/${SW_MAXREG})</span></h2><div style="overflow-x:auto"><table><tr><th align=left>Bölge</th><th align=left>Vali</th><th></th></tr>`;
  S.regions.forEach(r=>{const reg=SW.regs[r.id],war=swWarOn(r.id);
    let act2='';
    if(!reg)act2=btn('Vali ol',`data-a="swClaim" data-i="${r.id}"`,'gold sm');
    else if(reg.o===me)act2=war?'<span class="bad">savaşta</span>':btn('Bırak',`data-a="swRelease" data-i="${r.id}"`,'sm');
    else act2=war?'<span class="bad">savaşta</span>':btn('Savaş aç',`data-a="swDeclare" data-i="${r.id}"`,'danger sm');
    h+=`<tr><td>${esc(r.n)}</td><td>${reg?`<span style="color:${swHue(reg.o)}">●</span> ${esc(reg.on)}${reg.o===me?' (sen)':''}`:'<span class="dim">boş</span>'}</td><td>${act2}</td></tr>`;});
  return h+'</table></div></div>';
}
/* ================= REHBER ================= */
function tabGuide(){
  const sec=(t,b)=>`<details class="card"><summary><b>${t}</b></summary><div style="margin-top:6px">${b}</div></details>`;
  return `<div class="panel"><h2>📖 Rehber</h2><p class="hint">Oyun gerçek zamanlıdır: sayfayı kapatsan da enerjin dolar, öğrenmen ve üretimin sürer (en fazla 3 gün).</p>
  ${sec('🏠 Başlangıç','<p>1) <b>Ana › Çalış</b>: kaynak üret, para ve altın kazan.<br>2) <b>Karakter</b>: bir yeteneği öğrenmeye başla (Güç, Eğitim, Dayanıklılık).<br>3) <b>Ekonomi › Depo</b>: kaynaklarını sat, <b>Yatırımlar</b> ile kalıcı güçlen.<br>4) <b>Görevler</b>: her gün giriş ödülü ve 3 görev.</p>')}
  ${sec('💰 Ekonomi','<p>Fiyatlar zamanla oynar, alıp satınca da etkilenir. <b>Oyuncu Pazarı</b>nda kaynaklarını kendi fiyatına satarsın; yöneticiye pazar vergisi ödenir. Altın en değerli kaynaktır; enerji içeceği ve bazı eşyalar altınla alınır.</p>')}
  ${sec('⚔️ Savaş','<p><b>Antrenman savaşı</b> risksizdir: XP ve para kazanırsın, rütbene katkı yapar. <b>Devlet savaşları</b> bota karşıdır. <b>Ortak dünya</b> savaşları gerçek oyuncular arasındadır: bir bölgenin valisine savaş açarsın, herkes bir tarafa vurur, çok hasar veren taraf bölgeyi alır.</p>')}
  ${sec('🏛️ Siyaset','<p>Seviye 5\'te partiye katıl, oy ver. Devletin başkanı vergileri, yasaları ve savaşı yönetir. Yeterince güçlüysen <b>darbe</b> yapabilirsin (riskli!). Vali olduğun bölgeden saatlik gelir alırsın.</p>')}
  ${sec('👥 Sosyal','<p><b>Sohbet</b>: genel, parti kanalı ve özel mesaj. <b>Sıralama</b>: seviye, servet, hasar ve vergiye göre. Kurallara uy: küfür ve reklam yasak; yönetici susturabilir.</p>')}
  ${sec('🌍 Hesap','<p>Menü › Hesap: kullanıcı adı veya e-postayla giriş yap; oyunun hesabında bulutta durur, her telefondan devam edersin. Şifreni unutursan e-postayla sıfırlayabilirsin (e-postayla açtıysan).</p>')}</div>`;
}
/* ================= YAPAY ZEKÂ OYUNCULAR (binlerce; yönetici istemcisinde çalışır) ================= */
let BOTAGG={st:{},party:{},reg:[]};
const FN=['Kemal','Aylin','Barış','Defne','Emre','Selin','Tolga','Zeynep','Murat','Ceren','Onur','Elif','Cem','Deniz','Burak','Ece','Kaan','Melis','Yusuf','Naz'];
const SN=['Yılmaz','Kaya','Demir','Şahin','Çelik','Aydın','Arslan','Doğan','Kurt','Özdemir','Aksoy','Polat','Erdem','Koç','Güneş','Tekin','Bulut','Yıldız','Aslan','Karaca'];
const botName=i=>FN[i%20]+' '+SN[Math.floor(i/20)%20]+(i>=400?' '+(Math.floor(i/400)+1):'');
const BKEY={gold:'g',oil:'o',ore:'k'};
function botParty(){const ps=A().parties,t=ps.reduce((x,p)=>x+Math.max(1,p.supp),0);let r=Math.random()*t;for(const p of ps){r-=Math.max(1,p.supp);if(r<=0)return p.id;}return ps[0].id;}
function mkBot(i){
  const r=Math.random;let reg=r()<0.05?21+(r()<0.5?0:1):Math.floor(r()*21);
  return {i:i,r:reg,s:30,e:30,d:30,w:0,m:15000+Math.floor(r()*30000),g:0,o:0,k:0,t:0,p:'',a:r()*10*MIN,c:r()*30*MIN,l:(2+r()*5)*HOUR,v:(6+r()*18)*HOUR};
}
function botSetCount(n){
  S.bots=S.bots||[];n=Math.max(0,Math.min(5000,n|0));S.botN=n;
  while(S.bots.length<n)S.bots.push(mkBot(S.bots.length));
  while(S.bots.length>n)S.bots.pop();
  if(!n)BOTAGG={st:{},party:{},reg:[]};
}
const botLv=b=>1+Math.floor(b.w/40);
const botById=id=>{id=String(id);if(id.indexOf('bot_')!==0||!S.bots)return null;return S.bots[+id.slice(4)]||null;};
function botEv(b,m){S.botFeed=S.botFeed||[];S.botFeed.unshift({t:Date.now(),u:botName(b.i),m:m,b:1});if(S.botFeed.length>80)S.botFeed.pop();}
const r1=x=>Math.round(x*10)/10;
function botsTick(ms){
  if(!S.me||!S.me.admin||!S.bots||!S.bots.length){return;}
  const N=S.bots.length,f=Math.min(1,40/N),a=A(),regs=S.regions,rate=(typeof MP!=='undefined'?MP.rate:5)/100;
  const agg={st:{},party:{},reg:new Array(regs.length).fill(0)};
  const RS=['gold','oil','ore'];
  for(const b of S.bots){
    const reg=regs[b.r],st=reg.state;
    const x=agg.st[st]||(agg.st[st]={n:0,str:0});x.n++;x.str+=b.s;agg.reg[b.r]++;
    if(st==='A'){if(!b.p||!a.parties.some(q=>q.id===b.p))b.p=botParty();agg.party[b.p]=(agg.party[b.p]||0)+1;}else b.p='';
    b.a+=ms;b.c+=ms;b.l-=ms;b.v-=ms;
    let n=0;
    while(b.a>=10*MIN&&n<40){b.a-=10*MIN;n++;
      let rs=RS[b.i%3];if(reg.res[rs].c<=0)rs=RS.slice().sort((p,q)=>reg.res[q].m-reg.res[p].m)[0];
      let amt=(3+botLv(b)*0.05+b.s*0.12)*YIELD[rs]*(0.7+Math.random()*0.6)*(1+reg.idx.d*0.02);
      if(st==='A'){const tx=amt*a.tax[rs]/100;a.budget[rs]+=tx;amt-=tx;}
      const k=BKEY[rs];b[k]=Math.min(2000*(1+b.d/100),b[k]+amt);b.w++;}
    let m=0;
    while(b.c>=30*MIN&&m<20){b.c-=30*MIN;m++;
      for(const rs of RS){const k=BKEY[rs],have=Math.floor(b[k]);
        if(have>=(rs==='gold'?3:40)){const g0=Math.floor(S.prices[rs]*0.9*have),t=Math.floor(g0*rate);
          b.m+=g0-t;b.t+=t;b[k]-=have;S.me.money+=t;S.adm.collected+=t;
          S.prices[rs]*=1-have*0.0003*f/Math.max(1,PRICE0[rs]/100);S.prices[rs]=Math.max(S.prices[rs],PRICE0[rs]*0.5);
          if(b.i<10&&Math.random()<0.4)botEv(b,`pazara sattı · ${RES_N[rs]} ×${have}`);}}
      if(Math.random()<0.25){const rs=RS[Math.floor(Math.random()*3)],q=rs==='gold'?1:10,c=Math.ceil(S.prices[rs]*1.1*q);
        if(b.m>c*2){const t=Math.floor(c*rate);b.m-=c+t;b.t+=t;S.me.money+=t;S.adm.collected+=t;b[BKEY[rs]]+=q;
          S.prices[rs]*=1+q*0.0003*f/Math.max(1,PRICE0[rs]/100);if(b.i<10&&Math.random()<0.4)botEv(b,`pazardan aldı · ${RES_N[rs]} ×${q}`);}}
      b.m=r1(b.m);b.g=r1(b.g);b.o=r1(b.o);b.k=r1(b.k);
    }
    if(b.l<=0){b.l=(2+Math.random()*5)*HOUR;const k=['s','e','d'][Math.floor(Math.random()*3)];if(b[k]<90){b[k]++;if(b.i<10)botEv(b,`${PERKS[{s:'str',e:'edu',d:'end'}[k]]} ${b[k]} seviyesine ulaştı`);}}
    if(b.v<=0){b.v=(6+Math.random()*18)*HOUR;const adj=reg.adj;
      if(adj.length){const same=adj.filter(j=>regs[j].state===st),pool=(same.length&&Math.random()<0.7)?same:adj;const to=pool[Math.floor(Math.random()*pool.length)];
        if(!(regs[to].state!==st&&relTo('A',regs[to].state)<-60&&st==='A')){b.r=to;if(b.i<10)botEv(b,`${regs[to].n} bölgesine taşındı`);}}}
  }
  BOTAGG=agg;
}
function botRow(b){
  const reg=S.regions[b.r];
  return {id:'bot_'+b.i,bot:true,name:botName(b.i),lv:botLv(b),xp:b.w%40,money:Math.round(b.m),str:b.s,edu:b.e,end:b.d,energy:100,
    loc:reg.n,res:reg.n,party:b.p?((A().parties.find(p=>p.id===b.p)||{}).n||''):'',role:'Vatandaş (YZ) · '+nameOf(reg.state),
    stor:{gold:b.g,oil:b.o,ore:b.k,uranium:0,diamonds:0},items:{},facs:0,works:b.w,hits:0,learn:'',paper:'',tax:Math.round(b.t),seen:Date.now(),admin:false};
}
function botRows(limit){return (S.bots||[]).slice().sort((x,y)=>y.m-x.m).slice(0,limit||25).map(botRow);}
function botRowById(id){const b=botById(id);return b?botRow(b):null;}
ACT.botCount=d=>{const n=d&&d.n!==undefined?+d.n:+($('botN')||{}).value;if(isNaN(n)||n<0||n>5000)return msg('0–5000 arası bir sayı gir.');botSetCount(n);msg(`🤖 ${n} yapay zekâ oyuncu aktif.`,'ok');};

function botMigrate(){ // eski sürüm kayıtlarındaki yapay zekâ oyuncuları yeni biçime çevir
  if(!S.bots)S.bots=[];
  const bad=S.bots.some(b=>typeof b.r!=='number'||!S.regions[b.r]||typeof b.m!=='number');
  if(bad){const n=S.botN||S.bots.length||0;S.bots=[];if(S.me&&S.me.admin&&n)botSetCount(n);}
}
window.addEventListener('unhandledrejection',function(ev){
  var m=document.getElementById('alerts');if(!m)return;
  var d=document.createElement('div');d.className='al warn';
  d.textContent='⚠️ Hata: '+String(ev.reason&&ev.reason.message||ev.reason).slice(0,160);
  m.appendChild(d);setTimeout(function(){d.remove();},12000);
});

try{init();}catch(e){var m=document.getElementById("main");if(m)m.innerHTML="<pre style=\"white-space:pre-wrap;color:#f85149\">Hata: "+String(e&&e.stack||e)+"</pre>";}
window.addEventListener("error",function(ev){var m=document.getElementById("alerts");if(m&&!m.dataset.err){m.dataset.err=1;m.innerHTML+="<div class=\"al bad\">Hata: "+ev.message+"</div>";}});
</script>
</body>
</html>
