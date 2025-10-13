// sw.js (raiz)
const VERSION = 'v4';                  // <-- aumente SEMPRE que publicar mudanças
const APP_CACHE = `mdp-app-${VERSION}`;
const IMG_CACHE = `mdp-img-${VERSION}`;

// Arquivos “estáticos” básicos
const APP_SHELL = [
  '/',                           // homepage
  '/utilitarios/',               // lista
  '/assets/css/style.css',
  '/manifest.webmanifest',
];

// Instala e pré-cacheia o básico
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(APP_CACHE).then(c => c.addAll(APP_SHELL))
  );
});

// Ativa e remove versões antigas
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(k => ![APP_CACHE, IMG_CACHE].includes(k))
        .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Estratégias de fetch:
// - Navegação/HTML/CSS/JS: network-first (para você ver mudanças)
// - Imagens: cache-first (performance), com atualização em segundo plano
self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);

  // Só escopamos o que é do seu site (evita interferir em links externos)
  const isSameOrigin = url.origin === self.location.origin;

  // HTML (navegações)
  if (req.mode === 'navigate') {
    e.respondWith(networkFirst(req, APP_CACHE));
    return;
  }

  // CSS/JS do seu domínio
  if (isSameOrigin && (req.destination === 'style' || req.destination === 'script')) {
    e.respondWith(networkFirst(req, APP_CACHE));
    return;
  }

  // Imagens do seu domínio
  if (isSameOrigin && req.destination === 'image') {
    e.respondWith(cacheFirst(req, IMG_CACHE));
    return;
  }

  // Demais: passa direto
});

// Helpers
async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req, { cache: 'no-store' });
    cache.put(req, fresh.clone());
    return fresh;
  } catch (err) {
    const cached = await cache.match(req);
    return cached || Response.error();
  }
}
async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  if (cached) {
    // Atualiza em segundo plano
    fetch(req).then(res => res.ok && cache.put(req, res.clone()));
    return cached;
  }
  const fresh = await fetch(req);
  if (fresh.ok) cache.put(req, fresh.clone());
  return fresh;
}
