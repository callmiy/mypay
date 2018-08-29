importScripts("handlebars.runtime.min.js", "templates.js");

const CACHE_PREFIX = "THE-SHIFT-WORKER-THINGS";
const CACHE_VERSION = 1535541385;
const CACHE_NAME = `${CACHE_PREFIX}-v${CACHE_VERSION}`;
const appShellTemplate = Handlebars.templates.appShellTemplate;

// prettier-ignore
const CACHE_STATICS = ["/offline-template-assigns","/css/routes/index-e0df48608474a72f293f2e0a50183f02.js","/fonts/icons-8e3c7f5520f5ae906c6cf6d7f3ddcd19.eot","/css/routes/shift.js-a1f2663222dc83723b894deaf7d350b0.map","/img/a62ade4dc867325497238bbbe6770712-a62ade4dc867325497238bbbe6770712.svg","/css/commons-f4e35c5915a81a382f7aad67877294ad.js","/css/components/new-meta-form-5607f6b56aba43a6733c574a1c5948d2.js","/js/routes/shift.js-c64b75c7134f341c0d29b897625cf1db.map","/js/commons-d42d2d44cd8e6e494a0075fe51346e7b.js","/js/routes/shift-f3d4b2ec670707ca654cd3e7c13a5ff0.js","/css/components/new-meta-form-1ac24bd7ae65962ed117cd9f5c876f58.css","/css/routes/shift-58f51005669a21941a89ea68122a2dc8.js","/fonts/outline-icons-701ae6abd4719e9c2ada3535a497b341.eot","/img/9c74e172f87984c48ddf5c8108cabe67-9c74e172f87984c48ddf5c8108cabe67.png","/fonts/brand-icons-13db00b7a34fee4d819ab7f9838cc428.eot","/fonts/icons-0ab54153eeeca0ce03978cc463b257f7.woff2","/img/f2b5ce0181c898dc5a2fe93fb0c7564a-f2b5ce0181c898dc5a2fe93fb0c7564a.svg","/css/routes/shift-decabe07084fd0a7211a9065dfcbb240.css","/fonts/brand-icons-e8c322de9658cbeb8a774b6624167c2c.woff2","/fonts/brand-icons-a046592bac8f2fd96e994733faf3858c.woff","/img/e463db5ab162e92fd3ffcbd8ccc8d9f9-e463db5ab162e92fd3ffcbd8ccc8d9f9.svg","/css/commons-c5b3d292367458d447bd6d0dac1115cb.css","/fonts/icons-b87b9ba532ace76ae9f6edfe9f72ded2.ttf","/fonts/outline-icons-ef60a4f6c25ef7f39f2d25a748dbecfe.woff","/css/routes/index.js-e1b11d46bdd73e93f2bdfeafe5c0c1e6.map","/js/routes/index.js-82f8d0817061c2f3a32e349c81d51a01.map","/css/commons.js-e5c4066764e7b1c045f7a967caf6118b.map","/fonts/brand-icons-c5ebe0b32dc1b5cc449a76c4204d13bb.ttf","/fonts/icons-faff92145777a3cbaf8e7367b4807987.woff","/fonts/outline-icons-ad97afd3337e8cda302d10ff5a4026b8.ttf","/css/routes/index-12f9db6a4028609824d1e3a6489e59cd.css","/css/components/new-meta-form.js-5d3e8014374b3d3e0e68b66100e2d56e.map","/fonts/outline-icons-cd6c777f1945164224dee082abaea03a.woff2","/js/commons.js-d612b045f50dda4e1b5c15697c6d349c.map","/js/routes/index-f96fb622bd25deefc187030fbf1cab8f.js","https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin"];

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
