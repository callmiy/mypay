importScripts("handlebars.runtime.min.js", "templates.js");

const CACHE_PREFIX = "THE-SHIFT-WORKER-THINGS";
const CACHE_VERSION = 1535815676;
const CACHE_NAME = `${CACHE_PREFIX}-v${CACHE_VERSION}`;

const appShellTemplate = Handlebars.templates.appShellTemplate;

["indexMenuTemplate", "newShiftMenuTemplate"].forEach(t =>
  Handlebars.registerPartial(t, Handlebars.templates[t])
);

// prettier-ignore
const CACHE_STATICS = ["/offline-template-assigns","/css/routes/index-ebf79f7d52af6a4137cf68982dce311f.js","/fonts/icons-8e3c7f5520f5ae906c6cf6d7f3ddcd19.eot","/css/routes/shift.js-42b2476c4b75a1bed0dba56cd4dd2865.map","/img/a62ade4dc867325497238bbbe6770712-a62ade4dc867325497238bbbe6770712.svg","/css/commons-a0c0a4a6c53743eb236d796c0eb9c796.js","/css/components/new-meta-form-c126facd035d86467392a08b2a8b69d6.js","/js/routes/shift.js-2436af72abd18e1d33b2e93e215c2372.map","/js/commons-bd105381bbc1d01f9bd8347419f078ec.js","/js/routes/shift-2c977d1c1aa9480ea7ab1de646e21ebd.js","/css/components/new-meta-form-1ac24bd7ae65962ed117cd9f5c876f58.css","/css/routes/shift-6cc382a288b59f6e9f1f9a95c29301d6.js","/fonts/outline-icons-701ae6abd4719e9c2ada3535a497b341.eot","/img/9c74e172f87984c48ddf5c8108cabe67-9c74e172f87984c48ddf5c8108cabe67.png","/fonts/brand-icons-13db00b7a34fee4d819ab7f9838cc428.eot","/fonts/icons-0ab54153eeeca0ce03978cc463b257f7.woff2","/img/f2b5ce0181c898dc5a2fe93fb0c7564a-f2b5ce0181c898dc5a2fe93fb0c7564a.svg","/css/routes/shift-6f8bf4b03514ba189c2b826731587984.css","/fonts/brand-icons-e8c322de9658cbeb8a774b6624167c2c.woff2","/fonts/brand-icons-a046592bac8f2fd96e994733faf3858c.woff","/img/e463db5ab162e92fd3ffcbd8ccc8d9f9-e463db5ab162e92fd3ffcbd8ccc8d9f9.svg","/css/commons-3afd1af1318001a91ab8a3b0d5ac27a4.css","/fonts/icons-b87b9ba532ace76ae9f6edfe9f72ded2.ttf","/fonts/outline-icons-ef60a4f6c25ef7f39f2d25a748dbecfe.woff","/css/routes/index.js-784367d9cff722d78af6dc706645fd00.map","/js/routes/index.js-1cd80f0686120846721c0642b9a05e5f.map","/css/commons.js-9a078523cd442a442c4700785db85e8a.map","/fonts/brand-icons-c5ebe0b32dc1b5cc449a76c4204d13bb.ttf","/fonts/icons-faff92145777a3cbaf8e7367b4807987.woff","/fonts/outline-icons-ad97afd3337e8cda302d10ff5a4026b8.ttf","/css/routes/index-fe752791b5c1cc0da2d5e033d527ef2a.css","/css/components/new-meta-form.js-e2ac5aacd17f4726d1d35d8c69d11fd9.map","/fonts/outline-icons-cd6c777f1945164224dee082abaea03a.woff2","/js/commons.js-b88ca014b3814b6578447b3c1b1be4f0.map","/js/routes/index-1a61d85c15e977fadaa4f160d99336e7.js","https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin"];

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
