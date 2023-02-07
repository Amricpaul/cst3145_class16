var cacheName = 'v1';
var cacheFiles = [
    '/',
    '/index.html',
    '/css/main.css',
    '/js/lesson.js',
    '/img/'
];

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Installed');

    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching cacheFiles');
            return cache.addAll(cacheFiles);
        })
    );
});
self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            
                console.log("[ServiceWorker] Found in Cache", e.request.url, response);
                return response || fetch(e.request).then(function(response) {
                    return caches.open(cacheName).then(function(cache) {
                        cache.put(e.request.url, response.clone());
                        return response;
                    });
                });
            })
    );
});