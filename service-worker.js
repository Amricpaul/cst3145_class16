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
