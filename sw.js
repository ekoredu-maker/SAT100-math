/* 수능핏 서비스워커 — v2.2 운영 패치 포함
   학습 기록은 localStorage에 있으며 캐시 교체와 독립적으로 유지됩니다. */
const CACHE = 'suneungfit-v2-2-0';
const PATCH = './patch-v2.2.js';
const STATIC_ASSETS = [
  './manifest.webmanifest', PATCH,
  './icons/icon-180.png','./icons/icon-192.png','./icons/icon-512.png','./icons/maskable-512.png'
];

function injectPatch(html){
  if (html.includes('patch-v2.2.js')) return html;
  const tag = '<script src="./patch-v2.2.js"></script>';
  return html.includes('</body>') ? html.replace('</body>', tag + '</body>') : html + tag;
}

function htmlResponse(text, sourceHeaders){
  const headers = new Headers(sourceHeaders || {});
  headers.set('content-type','text/html; charset=utf-8');
  headers.delete('content-length');
  return new Response(injectPatch(text), {status:200, headers});
}

async function fetchPatchedIndex(){
  const res = await fetch('./index.html', {cache:'no-store'});
  if (!res.ok) throw new Error('index fetch failed');
  const text = await res.text();
  return htmlResponse(text, res.headers);
}

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(STATIC_ASSETS);
    try {
      const patched = await fetchPatchedIndex();
      await cache.put('./index.html', patched.clone());
      await cache.put('./', patched.clone());
    } catch (_) {}
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

/* 문서는 네트워크 우선 + v2.2 패치 주입, 실패 시 패치된 캐시.
   나머지 자산은 캐시 우선. */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const isDoc = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');

  if (isDoc) {
    e.respondWith((async () => {
      try {
        const res = await fetch(req);
        const text = await res.text();
        const patched = htmlResponse(text, res.headers);
        const cache = await caches.open(CACHE);
        await cache.put('./index.html', patched.clone());
        await cache.put('./', patched.clone());
        return patched;
      } catch (_) {
        const cache = await caches.open(CACHE);
        return (await cache.match('./index.html')) || (await cache.match('./')) || new Response('Offline', {status:503});
      }
    })());
    return;
  }

  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(req);
    if (hit) return hit;
    try {
      const res = await fetch(req);
      if (res && res.status === 200 && res.type === 'basic') await cache.put(req, res.clone());
      return res;
    } catch (_) {
      return hit || new Response('', {status:504});
    }
  })());
});
