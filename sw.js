/* AR-EMPYR8 (AE8) — Service Worker */
const CACHE_NAME = 'ae8-v3';
const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
];

/* Install: cache app shell */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

/* Activate: clean up old caches */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* Fetch: network-first with cache fallback for same-origin */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip cross-origin requests (YouTube, Leaflet CDN, etc.)
  if (url.origin !== self.location.origin) return;

  // Never cache videos — always fetch fresh from network
  if (url.pathname.match(/\.(mov|mp4|webm)$/i)) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
