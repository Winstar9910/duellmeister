const CACHE='duellmeister-v3';
const ASSETS=['./img/board.png','./img/monster.png','./img/spell.png','./img/trap.png','./img/icon-192.png','./img/icon-512.png','./img/icon-maskable.png'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS).catch(()=>{})).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const url=new URL(e.request.url);
  const isImg=/\.(png|jpg|jpeg|webp)$/i.test(url.pathname);
  if(isImg){ // Bilder: Cache zuerst
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{ const c=res.clone(); caches.open(CACHE).then(k=>k.put(e.request,c)).catch(()=>{}); return res; })));
    return;
  }
  // Seite, Manifest, SW: Netzwerk zuerst, Cache als Offline-Fallback
  e.respondWith(fetch(e.request).then(res=>{ const c=res.clone(); caches.open(CACHE).then(k=>k.put(e.request,c)).catch(()=>{}); return res; }).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
});
