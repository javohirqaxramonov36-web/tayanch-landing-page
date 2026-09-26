/* Tayanch service worker
 * - Navigations (HTML): network-first, fall back to cache/offline -> always-fresh pages
 * - Static assets: cache-first + stale-while-revalidate (served instantly, updated in bg)
 * - On deploy: bump CACHE_VERSION below; old caches are purged on activate, and HTML is
 *   always re-fetched, so the site never serves stale pages.
 */
const CACHE_VERSION = 'tayanch-v1';
const PRECACHE = [
  './',
  'index.html',
  'manifest.json',
  'styles.css',
  'script.js',
  'site-config.js',
  'nav.js',
  'courses-data.js',
  'ga4.js',
  'sidebar.css',
  'assets/images/favicon.png',
  'assets/images/icon-192.png',
  'assets/images/icon-512.png'
];

self.addEventListener('install', function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_VERSION).then(function (cache) {
      return cache.addAll(PRECACHE).catch(function () { /* ignore individual failures */ });
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        if (key !== CACHE_VERSION) return caches.delete(key);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // let the browser handle cross-origin

  // HTML navigations: network-first so pages are never stale.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE_VERSION).then(function (cache) { cache.put(req, copy); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (cached) {
          return cached || caches.match('index.html');
        });
      })
    );
    return;
  }

  // Static assets: cache-first, then network, and refresh the cache (SWR).
  event.respondWith(
    caches.match(req).then(function (cached) {
      var network = fetch(req).then(function (res) {
        if (res && res.status === 200 && res.type === 'basic') {
          var copy = res.clone();
          caches.open(CACHE_VERSION).then(function (cache) { cache.put(req, copy); });
        }
        return res;
      }).catch(function () { return cached; });
      return cached || network;
    })
  );
});
