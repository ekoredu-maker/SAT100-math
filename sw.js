/* 수능핏 서비스워커 — 앱 셸 캐시 (오프라인 동작)
   학습 기록은 캐시가 아니라 localStorage에 있으므로 이 파일이 지워도 기록은 남습니다. */
const CACHE = 'suneungfit-v2-1-0';
const ASSETS = [
  './','./index.html','./manifest.webmanifest',
  './icons/icon-180.png','./icons/icon-192.png','./icons/icon-512.png','./icons/maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* 문서는 네트워크 우선(새 버전 반영), 실패하면 캐시. 나머지는 캐시 우선. */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const isDoc = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  if (isDoc) {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put('./index.html', copy));
        return res;
      }).catch(() => caches.match('./index.html').then(r => r || caches.match('./')))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res && res.status === 200 && res.type === 'basic') {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }).catch(() => hit))
  );
});
