// Bilâd-ı Mütenâfise service worker: önce ağ, çevrimdışıysa önbellek.
var CACHE='bilad-v5';
var FILES=['./','./index.html','./harita.js','./manifest.webmanifest','./icon-192.png?v=3','./icon-512.png?v=3'];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return Promise.all(FILES.map(function(f){return c.add(f).catch(function(){});}));}).then(function(){return self.skipWaiting();}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));
  }).then(function(){return self.clients.claim();}));
});
self.addEventListener('fetch',function(e){
  var r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return; // Firebase vb. dokunulmaz
  e.respondWith(fetch(r).then(function(res){
    var cp=res.clone();caches.open(CACHE).then(function(c){c.put(r,cp);});
    return res;
  }).catch(function(){return caches.match(r).then(function(m){return m||caches.match('./index.html');});}));
});

self.addEventListener('push',function(e){
  var d={};try{d=e.data?e.data.json():{};}catch(x){d={t:'Bilâd-ı Mütenâfise',b:e.data?e.data.text():''};}
  e.waitUntil(self.registration.showNotification(d.t||'Bilâd-ı Mütenâfise',{body:d.b||'',icon:'icon-192.png',badge:'icon-192.png',data:{u:d.u||'./'}}));
});
self.addEventListener('notificationclick',function(e){
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(cs){
    for(var i=0;i<cs.length;i++){if('focus' in cs[i])return cs[i].focus();}
    return self.clients.openWindow((e.notification.data&&e.notification.data.u)||'./');
  }));
});
