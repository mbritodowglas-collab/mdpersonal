---
layout: null
permalink: /sw.js
---
const VERSION   = 'v8';                   // <-- sobe SEMPRE ao publicar
const APP_CACHE = `mdp-app-${VERSION}`;
const IMG_CACHE = `mdp-img-${VERSION}`;

// Prefixo para GitHub Pages ou raiz
const BASE = '{{ site.baseurl | default: "" }}';

// App Shell mínimo
const APP_SHELL = [
  `${BASE}/`,
  `${BASE}/utilitarios/`,
  `${BASE}/assets/css/style.css`,
  `${BASE}/manifest.webmanifest`,
  `${BASE}/assets/img/icons/icon-192.png`,
  `${BASE}/assets/img/icons/icon-512.png`,
  `${BASE}/assets/img/icons/maskable-512.png`
];

// Instala (pré-cache básico)
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(APP_CACHE).then(c => c.addAll(APP_SHELL)));
});

// Ativa (limpa versões antigas)
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

// Fetch
self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  const same = url.origin === self.location.origin;

  // HTML (navegação): network-first com timeout
  if (req.mode === 'navigate') {
    e.respondWith(networkFirstWithTimeout(req, APP_CACHE, 1500));
    return;
  }

  // CSS/JS internos: stale-while-revalidate
  if (same && (req.destination === 'style' || req.destination === 'script')) {
    e.respondWith(staleWhileRevalidate(req, APP_CACHE));
    return;
  }

  // Imagens internas: cache-first
  if (same && req.destination === 'image') {
    e.respondWith(cacheFirst(req, IMG_CACHE));
    return;
  }

  // Outros: deixa seguir a rede
});

// ===== Helpers =====
async function networkFirstWithTimeout(req, cacheName, ms=1500){
  const cache = await caches.open(cacheName);
  const timer = new Promise((_, rej) => setTimeout(()=>rej(new Error('timeout')), ms));
  try {
    const fresh = await Promise.race([fetch(req, { cache:'no-store' }), timer]);
    cache.put(req, fresh.clone());
    return fresh;
  } catch {
    const cached = await cache.match(req);
    return cached || fetch(req);
  }
}

async function staleWhileRevalidate(req, cacheName){
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  const fetching = fetch(req).then(res => { if(res.ok) cache.put(req, res.clone()); return res; });
  return cached || fetching;
}

async function cacheFirst(req, cacheName){
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  if (cached) { fetch(req).then(res => res.ok && cache.put(req, res.clone())); return cached; }
  const fresh = await fetch(req);
  if (fresh.ok) cache.put(req, fresh.clone());
  return fresh;
}
