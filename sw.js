// sw.js (bem simples)
const CACHE = 'mdp-v1';

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll([
      '/',                // raiz do site (o GitHub Pages ajusta para baseurl)
      // adicione caminhos críticos se quiser (CSS/JS principais). Não é obrigatório.
    ].map(p => new URL(p, self.registration.scope).toString())))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(resp =>
      resp || fetch(e.request).then(r => {
        const copy = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return r;
      }).catch(() => resp) // offline fallback
    )
  );
});
