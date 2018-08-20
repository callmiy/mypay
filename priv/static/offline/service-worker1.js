importScripts("handlebars.runtime.min.js", "templates.js", "cache-static.js");

const CACHE_PREFIX = "THE-SHIFT-WORKER-THINGS";
const CACHE_NAME = `${CACHE_PREFIX}-v${CACHE_VERSION}`;
const appShellTemplate = Handlebars.templates.appShellTemplate;

const addAllToCache = data =>
  caches.open(CACHE_NAME).then(cache => cache.addAll(data));

const pageNotAvailable = () =>
  new Response("<h1>This page is not available!</h1>", {
    headers: {
      "Content-Type": "text/html"
    }
  });

const renderHtml = (staticName, templateAssigns) =>
  caches
    .match("/offline-template-assigns")
    .then(resp => resp.json())
    .then(jsonResp => {
      if (jsonResp.errors) {
        return pageNotAvailable();
      }

      const { data } = jsonResp;

      const html = appShellTemplate({
        ...data.app,
        ...(data[staticName] || {}),
        ...(templateAssigns || {})
      });

      return new Response(html, {
        headers: {
          "Content-Type": "text/html"
        }
      });
    });

const renderRoutes = {
  "/": () =>
    renderHtml("index", {
      pageMainContent: Handlebars.templates.indexTemplate(),
      pageTopMenu: Handlebars.templates.indexMenuTemplate()
    }),

  "/shifts/new": () =>
    renderHtml("shiftNew", {
      pageMainContent: Handlebars.templates.newShiftTemplate(),
      pageTopMenu: Handlebars.templates.newShiftMenuTemplate()
    })
};

self.addEventListener("install", event => {
  event.waitUntil(addAllToCache(CACHE_STATICS));
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
  let request = event.request;
  const url = new URL(request.url);

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
    if (url.search && url.search.includes("vsn=")) {
      request = new Request(request.url.replace(/\?vsn=.+$/, ""), {
        cache: request.cache,
        credentials: request.credentials,
        destination: request.destination,
        headers: request.headers,
        method: request.method,
        mode: request.mode,
        redirect: request.redirect,
        referrer: request.referrer,
        referrerPolicy: request.referrerPolicy
      });
    }

    return event.respondWith(
      caches.match(request).then(
        resp =>
          resp ||
          fetch(request).then(response => {
            const response1 = response.clone();
            event.waitUntil(
              caches
                .open(CACHE_NAME)
                .then(cache => cache.put(request, response1))
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
