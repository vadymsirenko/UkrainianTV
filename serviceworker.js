const staticCacheName = 'static-cache-v1';
const dynamicCacheName = 'dynamic-cache-v1';

const staticAssets = [
    './',
    './index.html',
    //'./offline.html',
    './css/jquery.fancybox.css',
    './css/style.css',
    './ico/apple-touch-icon-48x48.png',
    './ico/apple-touch-icon-64x64.png',
    './ico/apple-touch-icon-72x72.png',
    './ico/apple-touch-icon-96x96.png',
    './ico/apple-touch-icon-128x128.png',
    './ico/apple-touch-icon-144x144.png',
    './ico/apple-touch-icon-152x152.png',
    './ico/apple-touch-icon-192x192.png',
    './ico/apple-touch-icon-256x256.png',
    './ico/apple-touch-icon-310x310.png',
    './ico/apple-touch-icon-512x512.png',
    './ico/apple-touch-icon.png',
    './ico/lang.ico',
    './ico/lock.png',
    './ico/rose.png',
    './ico/touch.png',
    './ico/Ukraine.ico',
    './ico/unlock.png',
    './img/Tryzub-svg.png',
    './img/no-image.png',
    './js/app.js',
    './js/jquery.fancybox.min.js',
    './js/main.js',
    // './video/prapor_ua.mp4'
];

self.addEventListener('install', async event => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(staticAssets);
    console.log('Service worker has been installed');
});

self.addEventListener('activate', async event => {
    const cachesKeys = await caches.keys();
    const checkKeys = cachesKeys.map(async key => {
        if (![staticCacheName, dynamicCacheName].includes(key)) {
            await caches.delete(key);
        }
    });
    await Promise.all(checkKeys);
    console.log('Service worker has been activated');
});

self.addEventListener('fetch', event => {
    console.log(`Trying to fetch ${event.request.url}`);
    event.respondWith(checkCache(event.request));
});

async function checkCache(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || checkOnline(req);
}

async function checkOnline(req) {
    const cache = await caches.open(dynamicCacheName);
    try {
        const res = await fetch(req);
        await cache.put(req, res.clone());
        return res;
    } catch (error) {
        const cachedRes = await cache.match(req);
        if (cachedRes) {
            return cachedRes;
        } else if (req.url.indexOf('.html') !== -1) {
            return caches.match('./offline.html');
        } else {
            return caches.match('./img/no-image.jpg');
        }
    }
}

addEventListener('message', ev => {
    if (ev.data === 'skipWaiting') return skipWaiting();
});

// вызов модального окна
const askUserToUpdate = reg => {
    return Modal.confirm({
        onOk: async () => {
            // вешаем обработчик изменения состояния
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                window.location.reload();
            });

            // пропускаем ожидание 
            if (reg && reg.waiting) {
                reg.waiting.postMessage({ type: 'SKIP_WAITING' });
            }
        },

        onCancel: () => {
            Modal.destroyAll();
        },
        icon: null,
        title: 'Хорошие новости! ? ',
        content:
            'Мы только что обновили версию приложения! Чтобы получить обновления, нажмите на кнопку ниже (страница перезагрузится)',
        cancelText: 'Не обновлять',
        okText: 'Обновить'
    });
};