/* PWA capabilities: share target, file handlers, protocol handler, note taking, window-controls overlay, background/periodic sync */
(function () {
  function toast(t) { var d = document.createElement('div'); d.textContent = t; d.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:600;background:#0f172a;color:#fff;border:1px solid #334155;padding:10px 16px;border-radius:14px;font:14px system-ui;max-width:90vw'; document.body.appendChild(d); setTimeout(function () { d.remove(); }, 3500); }
  function modal(title, text, btns) {
    var o = document.createElement('div'), b = document.createElement('div'), h = document.createElement('h3'), p = document.createElement('pre'), r = document.createElement('div');
    o.className = 'elp-modal'; b.className = 'elp-box'; r.className = 'elp-row'; h.textContent = title; p.textContent = text;
    btns.concat([{ t: 'Bağla' }]).forEach(function (x) { var k = document.createElement('button'); k.textContent = x.t; k.onclick = function () { if (x.f) x.f(); o.remove(); }; r.appendChild(k); });
    b.appendChild(h); b.appendChild(p); b.appendChild(r); o.appendChild(b); document.body.appendChild(o);
  }
  function addNote(t) { try { var k = 'elp_w_note', c = JSON.parse(localStorage.getItem(k) || '""'); localStorage.setItem(k, JSON.stringify((c ? c + '\n\n' : '') + t)); } catch (e) {} }
  function openNotes() { var n = 0, iv = setInterval(function () { var b = document.getElementById('__wBtn'); if (b) { clearInterval(iv); b.click(); setTimeout(function () { var t = document.getElementById('wNote'); if (t) { t.focus(); t.scrollIntoView(); } }, 300); } else if (++n > 40) { clearInterval(iv); toast('Qeydlər üçün şagird kimi daxil ol'); } }, 500); }
  function start() {
    var q = new URLSearchParams(location.search);
    if (location.pathname === '/share-target') {                       // Share Target
      var txt = [q.get('title'), q.get('text'), q.get('url')].filter(Boolean).join('\n');
      history.replaceState(null, '', '/');
      modal('Paylaşılan məzmun', txt || '(boş)', [{ t: '📝 Qeydlərə əlavə et', f: function () { addNote(txt); toast('Qeydlərə əlavə olundu'); openNotes(); } }]);
    }
    if (q.get('protocol')) {                                            // Protocol Handler: web+english:ielts
      var pr = (q.get('protocol') || '').toLowerCase();
      if (pr.indexOf('ielts') > -1) { location.replace('/ielts.html'); return; }
      history.replaceState(null, '', '/'); toast('Link: ' + pr.slice(0, 60));
    }
    if (q.get('note')) { history.replaceState(null, '', '/'); openNotes(); }   // Note Taking
    if ('launchQueue' in window) launchQueue.setConsumer(function (p) {  // File Handlers (.txt, .pdf)
      if (!p.files || !p.files.length) return;
      p.files[0].getFile().then(function (f) {
        if (f.type === 'application/pdf' || /\.pdf$/i.test(f.name)) { window.open(URL.createObjectURL(f), '_blank'); return; }
        return f.text().then(function (t) { modal(f.name, t.slice(0, 20000), [{ t: '📝 Qeydlərə əlavə et', f: function () { addNote(t.slice(0, 5000)); toast('Əlavə olundu'); openNotes(); } }]); });
      });
    });
    var tb = document.createElement('div'); tb.id = 'elp-titlebar'; tb.textContent = 'English Learning Portal'; document.body.appendChild(tb);   // Window Controls Overlay
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  if ('serviceWorker' in navigator) navigator.serviceWorker.ready.then(function (r) {   // Periodic Sync
    if (r.periodicSync && navigator.permissions) navigator.permissions.query({ name: 'periodic-background-sync' }).then(function (s) { if (s.state === 'granted') r.periodicSync.register('elp-content-refresh', { minInterval: 864e5 }).catch(function () {}); }).catch(function () {});
  });
  window.elpQueueRequest = function (url, o) {                           // Background Sync helper: elpQueueRequest('/api/x', {method:'POST', body:'...'})
    o = o || {}; var c = navigator.serviceWorker && navigator.serviceWorker.controller;
    if (c) c.postMessage({ type: 'elp-queue', url: url, method: o.method, headers: o.headers, body: o.body }); return !!c;
  };
})();
