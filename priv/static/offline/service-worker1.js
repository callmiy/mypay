importScripts("handlebars.runtime.min.js", "templates.js");

const CACHE_PREFIX = "THE-SHIFT-WORKER-THINGS";
const CACHE_VERSION = 1536930045;
const CACHE_NAME = `${CACHE_PREFIX}-v${CACHE_VERSION}`;

const appShellTemplate = Handlebars.templates.appShellTemplate;

["indexMenuTemplate", "newShiftMenuTemplate"].forEach(t =>
  Handlebars.registerPartial(t, Handlebars.templates[t])
);

// prettier-ignore
const CACHE_STATICS = ["/offline-template-assigns","/css/routes/index-32fe1edf0ea92c4f2a192542774b18a3.js","/fonts/icons-8e3c7f5520f5ae906c6cf6d7f3ddcd19.eot","/css/routes/shift.js-1994cf7c25497f720e5c7625aeaf971e.map","/img/a62ade4dc867325497238bbbe6770712-a62ade4dc867325497238bbbe6770712.svg","/css/commons-49684a02f56d76e084c5e173fa8bda1b.js","/css/components/new-meta-form-fc214593bcd73442d672e39d1526be7b.js","/js/routes/shift.js-d6f7b3839feac232d04d6d226b9653d1.map","/js/commons-021082c9c6eb39ff05c8a6f3c7ecaf23.js","/js/routes/shift-1c86e7a1a5e1a0442727a622c65eb4f2.js","/css/components/new-meta-form-411a0682b3efe95f8268e2a31ea090bb.css","/css/routes/shift-e163ce18dc1a2d8b1259508ba7fa6203.js","/fonts/outline-icons-701ae6abd4719e9c2ada3535a497b341.eot","/img/9c74e172f87984c48ddf5c8108cabe67-9c74e172f87984c48ddf5c8108cabe67.png","/fonts/brand-icons-13db00b7a34fee4d819ab7f9838cc428.eot","/fonts/icons-0ab54153eeeca0ce03978cc463b257f7.woff2","/img/f2b5ce0181c898dc5a2fe93fb0c7564a-f2b5ce0181c898dc5a2fe93fb0c7564a.svg","/css/routes/shift-1fe490da2a0f7c3b715ee8aeaa04fce4.css","/fonts/brand-icons-e8c322de9658cbeb8a774b6624167c2c.woff2","/fonts/brand-icons-a046592bac8f2fd96e994733faf3858c.woff","/img/e463db5ab162e92fd3ffcbd8ccc8d9f9-e463db5ab162e92fd3ffcbd8ccc8d9f9.svg","/css/commons-7ea0693c579488ddef6f4173f8b8edcd.css","/fonts/icons-b87b9ba532ace76ae9f6edfe9f72ded2.ttf","/fonts/outline-icons-ef60a4f6c25ef7f39f2d25a748dbecfe.woff","/css/routes/index.js-d0b81b9fb7150b5b1dd9d9901da404f1.map","/js/routes/index.js-0d8d12350cbb0e615196d623707fbe56.map","/css/commons.js-646cffd9ff0f3f4dd3e5e60f0dc73f11.map","/fonts/brand-icons-c5ebe0b32dc1b5cc449a76c4204d13bb.ttf","/fonts/icons-faff92145777a3cbaf8e7367b4807987.woff","/fonts/outline-icons-ad97afd3337e8cda302d10ff5a4026b8.ttf","/css/routes/index-7d704aec9fe069501678dd5e864ef805.css","/css/components/new-meta-form.js-df5ac48e374a5e5217e22158fb7dc122.map","/fonts/outline-icons-cd6c777f1945164224dee082abaea03a.woff2","/js/commons.js-8566645a630aaddc2ece6fd9138f0572.map","/js/routes/index-042970fb725d6ab4afa64d9a889e8a50.js","https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin"];

const addAllToCache = data =>
  caches.open(CACHE_NAME).then(cache => cache.addAll(data));

const pageNotAvailable = () =>
  new Response("<h1>This page is not available!</h1>", {
    headers: {
      "Content-Type": "text/html"
    }
  });

const renderHtml = (staticName, templateAssigns = {}) =>
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
        ...templateAssigns
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
      pageMainContent: Handlebars.templates.indexTemplate()
    }),

  "/shifts/new": () =>
    renderHtml("shiftNew", {
      pageMainContent: Handlebars.templates.newShiftTemplate()
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
                return error;
              })
        )
        .catch(error => {
          // tslint:disable-next-line:no-console
          // console.log("\n\n\nerror matching request:", error, request.clone());
        })
    );
  }
});

self.addEventListener("message", event => {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});
