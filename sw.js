const CACHE_NAME = 'starlight-cache-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return new Response('网络离线');
        })
    );
});

self.addEventListener('push', (event) => {
    let data = {
        title: 'Starlight',
        body: '你有一条新消息',
        icon: 'icon.png',
        badge: 'icon.png'
    };

    try {
        if (event.data) {
            const json = event.data.json();
            data.title = json.title || data.title;
            data.body = json.body || data.body;
            data.icon = json.icon || data.icon;
            data.badge = json.badge || data.badge;
        }
    } catch (error) {
    }

    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: data.icon,
            badge: data.badge,
            tag: 'starlight-message',
            renotify: true
        })
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if ('focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('./index.html');
            }
        })
    );
});