const CACHE_NAME = "rick-morty-v1";
const API_CACHE = "rick-morty-api-v1";

// App Shell - файлы для оффлайн работы
const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.json",
  "/192.png",
  "/512.png",
  "/vite.svg",
];

// Install event - кэшируем App Shell
self.addEventListener("install", (event) => {
  console.log("[SW] Installing service worker...");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[SW] Caching app shell");
        return cache.addAll(APP_SHELL);
      })
      .then(() => self.skipWaiting())
      .catch((error) => {
        console.error("[SW] Install failed:", error);
      })
  );
});

// Activate event - очищаем старые кэши
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating service worker...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== API_CACHE) {
              console.log("[SW] Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - обрабатываем запросы
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Навигация - возвращаем кэшированный index.html для оффлайн
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match("/index.html");
      })
    );
    return;
  }

  // API запросы к Rick and Morty API (только публичные)
  if (url.origin === "https://rickandmortyapi.com") {
    event.respondWith(
      caches.open(API_CACHE).then((cache) => {
        return fetch(request)
          .then((response) => {
            // Кэшируем успешные GET запросы
            if (request.method === "GET" && response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => {
            // Если оффлайн, возвращаем из кэша
            return cache.match(request).then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // Возвращаем оффлайн ответ
              return new Response(
                JSON.stringify({
                  results: [],
                  offline: true,
                  message: "No cached data available",
                }),
                {
                  headers: { "Content-Type": "application/json" },
                }
              );
            });
          });
      })
    );
    return;
  }

  // Статические ресурсы - Cache First
  event.respondWith(
    caches
      .match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request).then((response) => {
          // Кэшируем новые статические ресурсы
          if (
            request.method === "GET" &&
            (request.destination === "script" ||
              request.destination === "style" ||
              request.destination === "image")
          ) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        });
      })
      .catch(() => {
        // Fallback для изображений
        if (request.destination === "image") {
          return caches.match("/vite.svg");
        }
      })
  );
});
