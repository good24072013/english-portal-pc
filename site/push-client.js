/* Registers this device for FCM push and saves the token to Firestore (collection fcmTokens). */
(function () {
  var VAPID = 'BA83PfC3bNpgrT0FMFozD6S7NrISajkC2Lqa7HUzrUDp898Dq_Up94VvgAYfTcodKJ_sfpeKPGsBqEfHoPc6IMc';
  var CFG = {apiKey:'AIzaSyAAskWaAnnWs0G38PK85oLcCuLUaB5Rt9Y',authDomain:'buoyant-bank-72ts5.firebaseapp.com',projectId:'buoyant-bank-72ts5',storageBucket:'buoyant-bank-72ts5.firebasestorage.app',messagingSenderId:'101144213314',appId:'1:101144213314:web:0bd52af4ca552987db3adb'};
  var DB = 'ai-studio-englishlearningp-0e6d328e-78eb-45e7-a429-ecf9d0eba278';
  var G = 'https://www.gstatic.com/firebasejs/10.12.2/';
  if (VAPID.indexOf('PASTE') === 0 || !('serviceWorker' in navigator) || !('Notification' in window)) return;
  function user() { try { return JSON.parse(localStorage.getItem('elp_current_user_session_v3') || 'null'); } catch (e) { return null; } }
  var busy = false, lastId = '';
  async function run() {
    var u = user();
    if (busy || !u || !u.id || Notification.permission !== 'granted') return;
    if (lastId === u.id) return;
    busy = true;
    try {
      var A = await import(G + 'firebase-app.js'), M = await import(G + 'firebase-messaging.js'), F = await import(G + 'firebase-firestore.js');
      var app = A.getApps().find(function (x) { return x.name === 'push'; }) || A.initializeApp(CFG, 'push');
      var reg = await navigator.serviceWorker.register('/sw.js');
      await navigator.serviceWorker.ready;
      var token = await M.getToken(M.getMessaging(app), {vapidKey: VAPID, serviceWorkerRegistration: reg});
      if (!token) return;
      await F.setDoc(F.doc(F.getFirestore(app, DB), 'fcmTokens', token), {token: token, userId: u.id, name: u.name || '', role: u.role || '', classGroup: u.classGroup || '', at: Date.now()}, {merge: true});
      lastId = u.id;
    } catch (e) { console.warn('[push]', e); } finally { busy = false; }
  }
  function ask() {
    if (Notification.permission === 'default') Notification.requestPermission().then(run); else run();
  }
  document.addEventListener('click', ask, {once: true, capture: true});
  window.addEventListener('load', function () { setTimeout(run, 2500); setInterval(run, 15000); });
})();
