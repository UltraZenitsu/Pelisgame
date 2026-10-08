/* Service Worker · Juego de Películas
   - Precachea todo el juego en un caché con el número de versión (version.js).
   - Sirve desde el caché (funciona sin conexión).
   - Al cambiar version.js se instala un caché nuevo; la página avisa y, al aceptar, se activa.
   - Las partidas viven en localStorage, así que actualizar nunca las borra. */
importScripts('version.js');

const CACHE = 'jdp-' + self.APP_VERSION;
const ASSETS = [
  './',
  'index.html',
  'version.js',
  'manifest.webmanifest',
  'favicon.ico',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/maskable-192.png',
  'icons/maskable-512.png',
  'icons/apple-touch-icon.png',
  'icons/favicon-32.png',
  'fonts/lilita-one-latin-400-normal.woff2',
  'fonts/nunito-latin-700-normal.woff2',
  'fonts/nunito-latin-900-normal.woff2'
];

self.addEventListener('install', e => {
  // cache:'reload' evita que el caché HTTP del hosting nos entregue archivos viejos
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(ASSETS.map(u => c.add(new Request(u, { cache: 'reload' }))))));
});

// La página pide activar la versión nueva cuando el jugador acepta actualizar
self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('jdp-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(CACHE).then(c =>
      c.match(r, { ignoreSearch: true })
        .then(hit => hit || (r.mode === 'navigate' ? c.match('index.html') : undefined))
        .then(hit => hit || fetch(r))
    )
  );
});
