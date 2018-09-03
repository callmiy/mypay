importScripts("handlebars.runtime.min.js", "templates.js");

const CACHE_PREFIX = "THE-SHIFT-WORKER-THINGS";
const CACHE_VERSION = 1535988426;
const CACHE_NAME = `${CACHE_PREFIX}-v${CACHE_VERSION}`;

const appShellTemplate = Handlebars.templates.appShellTemplate;

["indexMenuTemplate", "newShiftMenuTemplate"].forEach(t =>
  Handlebars.registerPartial(t, Handlebars.templates[t])
);

// prettier-ignore
const CACHE_STATICS = ["/offline-template-assigns","/css/routes/index-50cbddd00b3930df8369832edccfe000.js","/fonts/icons-8e3c7f5520f5ae906c6cf6d7f3ddcd19.eot","/css/routes/shift.js-a2c18106ee479d118786ce44e22a719c.map","/img/a62ade4dc867325497238bbbe6770712-a62ade4dc867325497238bbbe6770712.svg","/css/commons-5c80b3528a30302f5fce72cca3804031.js","/css/components/new-meta-form-c3706c81a3c39718a0347fcf31c9c7ac.js","/js/routes/shift.js-ace86e7899b6de0fdcec1314f362ab91.map","/js/commons-fa7a4ddbd2e4adcb3bdfb686978f679a.js","/js/routes/shift-66b2ff4217220427cbdf5f5fe5cb58ba.js","/css/components/new-meta-form-411a0682b3efe95f8268e2a31ea090bb.css","/css/routes/shift-4ac53ef8c2bf85cf45ffdfcddb5e89dc.js","/fonts/outline-icons-701ae6abd4719e9c2ada3535a497b341.eot","/img/9c74e172f87984c48ddf5c8108cabe67-9c74e172f87984c48ddf5c8108cabe67.png","/fonts/brand-icons-13db00b7a34fee4d819ab7f9838cc428.eot","/fonts/icons-0ab54153eeeca0ce03978cc463b257f7.woff2","/img/f2b5ce0181c898dc5a2fe93fb0c7564a-f2b5ce0181c898dc5a2fe93fb0c7564a.svg","/css/routes/shift-a207cb8ab6e6c5264a7b6deb31c81d77.css","/fonts/brand-icons-e8c322de9658cbeb8a774b6624167c2c.woff2","/fonts/brand-icons-a046592bac8f2fd96e994733faf3858c.woff","/img/e463db5ab162e92fd3ffcbd8ccc8d9f9-e463db5ab162e92fd3ffcbd8ccc8d9f9.svg","/css/commons-7ea0693c579488ddef6f4173f8b8edcd.css","/fonts/icons-b87b9ba532ace76ae9f6edfe9f72ded2.ttf","/fonts/outline-icons-ef60a4f6c25ef7f39f2d25a748dbecfe.woff","/css/routes/index.js-7e4924a955e517203bdd2d6bad86c445.map","/js/routes/index.js-5c2d46739ef6568f51f057e6be9c690a.map","/css/commons.js-e53265dca4a51e7bd547ce0b005b56dd.map","/fonts/brand-icons-c5ebe0b32dc1b5cc449a76c4204d13bb.ttf","/fonts/icons-faff92145777a3cbaf8e7367b4807987.woff","/fonts/outline-icons-ad97afd3337e8cda302d10ff5a4026b8.ttf","/css/routes/index-7d704aec9fe069501678dd5e864ef805.css","/css/components/new-meta-form.js-f43ea28be1f7181e62d63fb03a6eb113.map","/fonts/outline-icons-cd6c777f1945164224dee082abaea03a.woff2","/js/commons.js-ba6e24181d5f7aaaf5d0c3e4425d310a.map","/js/routes/index-24312c3e56427bd83f00fb775075a53c.js","https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin"];

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
