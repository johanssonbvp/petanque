// SERVICE WORKER - Optimized Version
// Copyright (c) 2026 Pär Johansson
// All rights reserved - Proprietary and Confidential
// https://petanquetraning.se
// Made with ❤️ by Pär Johansson
//
// Automatisk cache-versionering + Stale-While-Revalidate strategi

const CACHE_VERSION = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
const CACHE_NAME = `petanque-v${CACHE_VERSION}`;

// CORE FILES - Alla kritiska filer för offline-drift
const CORE_FILES = [
  './',
  './index.html',
  './manifest.json',
  './skjuttraning.html',
  './laggtraning.html',
  './tavlingssimulator.html',
  './dagbok.html',
  './precisionsskytte.html',
  './storage-manager.js',
  './lang-manager.js',
  './offline-indicator.js',
  './sw.js',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap'
];

// INSTALL - Cachea alla CORE_FILES
self.addEventListener('install', event => {
  console.log(`[SW] Installing cache: ${CACHE_NAME}`);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log(`[SW] Caching ${CORE_FILES.length} core files`);
        return cache.addAll(CORE_FILES).catch(err => {
          console.warn('[SW] Some files could not be cached:', err);
          // Cachea bara de som är möjliga
          return Promise.all(
            CORE_FILES.map(file =>
              cache.add(file).catch(() => console.warn(`[SW] Failed to cache: ${file}`))
            )
          );
        });
      })
      .then(() => self.skipWaiting())
  );
});

// ACTIVATE - Rensa gamla cache-versioner
self.addEventListener('activate', event => {
  console.log(`[SW] Activating cache: ${CACHE_NAME}`);
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        const oldCaches = cacheNames.filter(name => 
          name.startsWith('petanque-') && name !== CACHE_NAME
        );
        console.log(`[SW] Cleaning ${oldCaches.length} old cache(s)`);
        return Promise.all(
          oldCaches.map(cacheName => {
            console.log(`[SW] Deleting cache: ${cacheName}`);
            return caches.delete(cacheName);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// FETCH - Stale-While-Revalidate strategi
self.addEventListener('fetch', event => {
  const { request } = event;
  
  // Hoppa över non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Hoppa över Chrome-tillägg och annat
  if (request.url.startsWith('chrome-extension://')) {
    return;
  }

  // STRATEGI: Stale-While-Revalidate
  // 1. Returnera cached version omedelbar (om den finns)
  // 2. Samtidigt fetch uppdaterad version från nätverket
  // 3. Uppdatera cachen när nätverket svar kommer
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(request).then(cached => {
        // Start the fetch immediately
        const fetchPromise = fetch(request)
          .then(response => {
            // Validera svar
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // Cachea successful responses
            if (request.method === 'GET') {
              const clone = response.clone();
              cache.put(request, clone);
            }
            return response;
          })
          .catch(err => {
            console.warn('[SW] Fetch failed for:', request.url, err);
            // Om nätverket misslyckas, returnera cached eller offline-sida
            return cached || null;
          });

        // Returnera cached omedelbar, annars vänta på nätverket
        return cached || fetchPromise;
      });
    })
    .catch(err => {
      console.error('[SW] Cache error:', err);
      // Fallback för helt offline - returnera index.html för navigeringar
      if (request.destination === 'document' || request.mode === 'navigate') {
        return caches.match('./index.html');
      }
      return null;
    })
  );
});

// MESSAGE - Möjliggör skip waiting från klienten
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('[SW] Service Worker loaded');
