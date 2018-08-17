importScripts("handlebars.runtime.min.js", "templates.js");

const CACHE_PREFIX = "THE-SHIFT-WORKER-THINGS";
const CACHE_VERSION = 2;
const CACHE_NAME = `${CACHE_PREFIX}-v${CACHE_VERSION}`;
const appShellTemplate = Handlebars.templates.appShellTemplate;

const addAllToCache = data =>
  caches.open(CACHE_NAME).then(cache => cache.addAll(data));

const renderIndexPath = () =>
  caches
    .match("/offline-template-assigns")
    .then(resp => resp.json())
    .then(data => {
      const html = appShellTemplate({
        ...data,
        pageMainContent: Handlebars.templates.indexTemplate(),
        pageTopMenu: Handlebars.templates.indexMenuTemplate()
      });

      return new Response(html, {
        headers: {
          "Content-Type": "text/html"
        }
      });
    });

const renderRoutes = {
  "/": renderIndexPath
};

self.addEventListener("install", event => {
  event.waitUntil(addAllToCache(["/offline-template-assigns"]));
});

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
  const url = new URL(event.request.url);

  if (url.origin === location.origin) {
    const renderFn = renderRoutes[url.pathname];
    if (renderFn) {
      return event.respondWith(renderFn());
    }
  }

  if (
    !/sockjs-node/.test(url.pathname) &&
    !/phoenix\/live_reload/.test(url.pathname)
  ) {
    return event.respondWith(
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
  }
});

self.addEventListener("message", event => {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});
