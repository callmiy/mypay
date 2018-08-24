importScripts("handlebars.runtime.min.js", "templates.js");

const CACHE_PREFIX = "THE-SHIFT-WORKER-THINGS";
const CACHE_VERSION = 1535115035;
const CACHE_NAME = `${CACHE_PREFIX}-v${CACHE_VERSION}`;
const appShellTemplate = Handlebars.templates.appShellTemplate;

// prettier-ignore
const CACHE_STATICS = ["/offline-template-assigns","http://localhost:4019/css/commons.js","http://localhost:4019/css/components/new-meta-form.js","http://localhost:4019/css/routes/index.js","http://localhost:4019/css/routes/shift.js","http://localhost:4019/fonts/brand-icons.eot","http://localhost:4019/fonts/brand-icons.ttf","http://localhost:4019/fonts/brand-icons.woff","http://localhost:4019/fonts/brand-icons.woff2","http://localhost:4019/fonts/icons.eot","http://localhost:4019/fonts/icons.ttf","http://localhost:4019/fonts/icons.woff","http://localhost:4019/fonts/icons.woff2","http://localhost:4019/fonts/outline-icons.eot","http://localhost:4019/fonts/outline-icons.ttf","http://localhost:4019/fonts/outline-icons.woff","http://localhost:4019/fonts/outline-icons.woff2","http://localhost:4019/img/a62ade4dc867325497238bbbe6770712.svg","http://localhost:4019/img/9c74e172f87984c48ddf5c8108cabe67.png","http://localhost:4019/img/e463db5ab162e92fd3ffcbd8ccc8d9f9.svg","http://localhost:4019/img/f2b5ce0181c898dc5a2fe93fb0c7564a.svg","http://localhost:4019/js/commons.js","http://localhost:4019/js/routes/index.js","http://localhost:4019/js/routes/shift.js","https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin"];

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
    return event.respondWith(
      caches
        .match(request, {
          ignoreSearch: true
        })
        .then(
          resp =>
            resp ||
            fetch(request)
              .then(response => {
                const response1 = response.clone();
                event.waitUntil(
                  caches
                    .open(CACHE_NAME)
                    .then(cache => cache.put(request, response1))
                );

                return response;
              })
              .catch(error => {
                // tslint:disable-next-line:no-console
                console.log(
                  "\n\n\nerror fetching request after not found in cache:",
                  error,
                  request.clone()
                );

                return error;
              })
        )
        .catch(error => {
          // tslint:disable-next-line:no-console
          console.log("\n\n\nerror matching request:", error, request.clone());
        })
    );
  }
});

self.addEventListener("message", event => {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});
