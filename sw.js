self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('registro-v1').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './icon-192.png',
        './icon-512.png',
        'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Se estiver em cache, retorna o cache
      if (response) return response;

      // Se não estiver em cache, tenta buscar da internet
      return fetch(event.request).catch(() => {
        // Se a internet falhar, retorna o index.html como fallback
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
