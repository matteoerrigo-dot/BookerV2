const CACHE_NAME = "booker-cache-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json"
];

// Installation
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activation
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

// Requête
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});