---
layout: null
permalink: /sw.js
---
const VERSION   = 'v7';  // ↑ aumente sempre que mudar algo do SW/manifest
const APP_CACHE = `mdp-app-${VERSION}`;
const IMG_CACHE = `mdp-img-${VERSION}`;

// Prefixo seguro para GitHub Pages ou raiz
const BASE = '{{ site.baseurl | default: "" }}';

// Arquivos “estáticos” básicos
const APP_SHELL = [
  `${BASE}/`,
  `${BASE}/utilitarios/`,
  `${BASE}/assets/css/style.css`,
  `${BASE}/manifest.webmanifest`,
  `${BASE}/assets/img/icons/icon-192.png`,
  `${BASE}/assets/img/icons/icon-512.png`,
  `${BASE}/assets/img/icons/maskable-512.png`
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
      Promise.all(
        keys
          .filter(k => ![APP_CACHE, IMG_CACHE].includes(k))
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Estratégias de fetch
self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;

  // Navegações (HTML)
  if (req.mode === 'navigate') {
    e.respondWith(networkFirst(req, APP_CACHE));
    return;
  }

  // CSS/JS internos
  if (isSameOrigin && (req.destination === 'style' || req.destination === 'script')) {
    e.respondWith(networkFirst(req, APP_CACHE));
    return;
  }

  // Imagens internas
  if (isSameOrigin && req.destination === 'image') {
    e.respondWith(cacheFirst(req, IMG_CACHE));
    return;
  }
  // demais: indiferente (segue a rede)
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
    fetch(req).then(res => res.ok && cache.put(req, res.clone())); // atualiza em BG
    return cached;
  }
  const fresh = await fetch(req);
  if (fresh.ok) cache.put(req, fresh.clone());
  return fresh;
}
