/* Notification service worker + Firebase Cloud Messaging (push when the site is closed) */
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
var CACHE = 'elp-pwa-v4';
var SHELL = ['/', '/offline.html', '/favicon.svg', '/manifest.webmanifest', '/icons/icon-192.png', '/icons/icon-512.png',
  '/assets/index-cbvwwjx5-n4.js', '/assets/index--l5rvpqo.css', '/theme.js', '/themes.css', '/holidays.js', '/holidays.css', '/fix-layout.css',
  '/animations.css', '/animations.js', '/mobile.css', '/menu.css', '/firebase-config.js', '/init-portal-content.js', '/ielts-embed.js',
  '/widgets.js', '/push-client.js', '/pwa-extras.js', '/pwa-extras.css', '/vocabulary-data.json', '/library-data.json',
  '/widgets/word-template.json', '/widgets/word-data.json', '/widgets/tip-template.json', '/widgets/tip-data.json', '/widgets/tips.json'];
self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) { return Promise.all(SHELL.map(function (u) { return c.add(u).catch(function () {}); })); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
// Network first (so new deploys show immediately); cached copy is used only when offline.
self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET') return;
  var u = new URL(r.url);
  if (u.origin !== self.location.origin) return;
  e.respondWith(fetch(r).then(function (res) {
    if (res && res.ok && res.type === 'basic') { var cp = res.clone(); caches.open(CACHE).then(function (c) { c.put(r, cp); }); }
    return res;
  }).catch(function () {
    return caches.match(r, { ignoreSearch: true }).then(function (m) {
      if (m) return m;
      if (r.mode === 'navigate') return caches.match('/').then(function (h) { return h || caches.match('/offline.html'); });
      return Response.error();
    });
  }));
});
try {
  firebase.initializeApp({apiKey:'AIzaSyAAskWaAnnWs0G38PK85oLcCuLUaB5Rt9Y',authDomain:'buoyant-bank-72ts5.firebaseapp.com',projectId:'buoyant-bank-72ts5',storageBucket:'buoyant-bank-72ts5.firebasestorage.app',messagingSenderId:'101144213314',appId:'1:101144213314:web:0bd52af4ca552987db3adb'});
  firebase.messaging().onBackgroundMessage(function (p) {
    var d = p.data || {};
    return self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
      // site is open and visible on screen -> do not show a push (the site shows its own in-app notification)
      for (var i = 0; i < list.length; i++) { if (list[i].visibilityState === 'visible') return; }
      return self.registration.showNotification(d.title || 'English Portal', {body: d.body || '', icon: '/favicon.svg', badge: '/favicon.svg', tag: d.tag || ('elp-' + Date.now()), vibrate: [120, 60, 120]});
    });
  });
} catch (e) {}
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    for (var i = 0; i < list.length; i++) { if ('focus' in list[i]) return list[i].focus(); }
    return self.clients.openWindow((e.notification.data && e.notification.data.url) || '/');
  }));
});

/* ---------- Generic Web Push (FCM messages are shown by the Firebase handler above, so they are skipped here) ---------- */
self.addEventListener('push', function (e) {
  var p = {};
  try { p = e.data ? e.data.json() : {}; } catch (x) { try { p = { body: e.data.text() }; } catch (y) {} }
  if (p.fcmMessageId || p.from || p.notification || (p.data && p.data['firebase-messaging-msg-data'])) return;
  e.waitUntil(self.registration.showNotification(p.title || 'English Portal', { body: p.body || '', icon: '/icons/icon-192.png', badge: '/favicon.svg', tag: p.tag || 'elp-push', data: { url: p.url || '/' } }));
});

/* ---------- Background Sync: requests queued by the page while offline are replayed when the network returns ---------- */
function idb() { return new Promise(function (res, rej) { var q = indexedDB.open('elp-sw', 1); q.onupgradeneeded = function () { q.result.createObjectStore('outbox', { autoIncrement: true }); }; q.onsuccess = function () { res(q.result); }; q.onerror = function () { rej(q.error); }; }); }
function box(mode, fn) { return idb().then(function (d) { return new Promise(function (res, rej) { var t = d.transaction('outbox', mode), r = fn(t.objectStore('outbox')); t.oncomplete = function () { res(r && r.result); }; t.onerror = function () { rej(t.error); }; }); }); }
self.addEventListener('message', function (e) {
  var d = e.data || {};
  if (d.type !== 'elp-queue' || !d.url) return;
  var u; try { u = new URL(d.url, self.location.origin); } catch (x) { return; }
  if (u.origin !== self.location.origin) return;
  e.waitUntil(box('readwrite', function (s) { return s.add({ url: u.href, method: d.method || 'POST', headers: d.headers || {}, body: d.body || null }); })
    .then(function () { return self.registration.sync && self.registration.sync.register('elp-outbox'); }).catch(function () {}));
});
async function flushOutbox() {
  var d = await idb();
  var items = await new Promise(function (res) { var out = [], q = d.transaction('outbox', 'readonly').objectStore('outbox').openCursor(); q.onsuccess = function () { var c = q.result; if (c) { out.push({ k: c.key, v: c.value }); c.continue(); } else res(out); }; });
  for (var i = 0; i < items.length; i++) {
    var it = items[i].v, r = await fetch(it.url, { method: it.method, headers: it.headers, body: it.body });
    if (r.status >= 500) throw new Error('retry');
    await box('readwrite', function (s) { return s.delete(items[i].k); });
  }
}
self.addEventListener('sync', function (e) { if (e.tag === 'elp-outbox') e.waitUntil(flushOutbox()); });

/* ---------- Widgets (Windows 11 Widgets board / Edge): Word of the Day + Daily Tip ---------- */
function dayIdx(n) { return Math.floor(Date.now() / 864e5) % n; }
async function widgetPayload(tag) {
  var data, tpl;
  if (tag === 'word-of-day') {
    tpl = await (await fetch('/widgets/word-template.json')).text();
    var v = await (await fetch('/vocabulary-data.json')).json(), w = v[dayIdx(v.length)];
    data = { word: w.word, phonetic: w.phonetic, partOfSpeech: w.partOfSpeech, translationAz: w.translationAz, exampleEn: w.exampleEn, level: w.level };
  } else {
    tpl = await (await fetch('/widgets/tip-template.json')).text();
    var t = await (await fetch('/widgets/tips.json')).json();
    data = { title: '\uD83D\uDCA1 G\u00fcn\u00fcn m\u0259sl\u0259h\u0259ti', tip: t[dayIdx(t.length)] };
  }
  return { template: tpl, data: JSON.stringify(data) };
}
async function updateWidget(w) { try { await self.widgets.updateByTag(w.definition.tag, await widgetPayload(w.definition.tag)); } catch (e) {} }
async function updateAllWidgets() { if (!self.widgets) return; await Promise.all(['word-of-day', 'daily-tip'].map(function (t) { return self.widgets.getByTag(t).then(function (w) { return w && updateWidget(w); }); })); }
self.addEventListener('widgetinstall', function (e) {
  e.waitUntil((async function () {
    if (e.widget.definition.update && self.registration.periodicSync) { try { await self.registration.periodicSync.register(e.widget.definition.tag, { minInterval: e.widget.definition.update * 1000 }); } catch (x) {} }
    await updateWidget(e.widget);
  })());
});
self.addEventListener('widgetresume', function (e) { e.waitUntil(updateWidget(e.widget)); });
self.addEventListener('widgetuninstall', function (e) {
  if (e.widget.instances && e.widget.instances.length <= 1 && self.registration.periodicSync) e.waitUntil(self.registration.periodicSync.unregister(e.widget.definition.tag).catch(function () {}));
});
self.addEventListener('widgetclick', function (e) { if (e.action === 'open') e.waitUntil(self.clients.openWindow('/')); });

/* ---------- Periodic Background Sync: refresh content + widgets while the app is closed ---------- */
async function refreshContent() {
  var c = await caches.open(CACHE);
  await Promise.all(['/vocabulary-data.json', '/library-data.json', '/widgets/tips.json', '/'].map(function (u) { return fetch(u, { cache: 'no-cache' }).then(function (r) { if (r.ok) return c.put(u, r); }).catch(function () {}); }));
  await updateAllWidgets();
}
self.addEventListener('periodicsync', function (e) {
  if (e.tag === 'elp-content-refresh') e.waitUntil(refreshContent());
  else if (self.widgets) e.waitUntil(self.widgets.getByTag(e.tag).then(function (w) { return w && updateWidget(w); }));
});
