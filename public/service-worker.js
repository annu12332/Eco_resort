const CACHE_NAME = "almaris-eco-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/favicon.ico",
    "/manifest.json",
    "/logo192.png",
    "/logo512.png",
    "/all-rooms",
    "/packages",
    "/activities",
    "/blog",
    "/offers",
    "/about"
];

// Install SW এবং cache করা
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    );
});

// Activate SW
self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});

// Fetch হলে cache চেক করা, নাহলে network
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});