const CACHE_PREFIX = "THE-SHIFT-WORKER-THINGS";
const CACHE_VERSION = 2;
const CACHE_NAME = `${CACHE_PREFIX}-v${CACHE_VERSION}`;

self.addEventListener("activate", event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .filter(
              cacheName =>
                cacheName.startsWith(CACHE_PREFIX) && cacheName !== CACHE_NAME
            )
            .map(cacheName => caches.delete(cacheName))
        )
      )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(
      resp =>
        resp ||
        fetch(event.request).then(response => {
          const response1 = response.clone();
          event.waitUntil(
            caches
              .open(CACHE_NAME)
              .then(cache => cache.put(event.request, response1))
          );

          return response;
        })
    )
  );
});

self.addEventListener("message", event => {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});
