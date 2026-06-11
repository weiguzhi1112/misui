// sw.js
const CACHE_NAME = 'starlight-cache-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    // 基础的 fetch 监听，PWA 安装的必要条件
    event.respondWith(fetch(event.request).catch(() => {
        return new Response('网络离线');
    }));
});