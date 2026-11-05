/* Gelismis animasiyalar: skroll-reveal (stagger ile), ripple effekti.
   Hec bir element gizli qalmasin deye: elp-pre sinfi 4 saniyeden sonra mutleq silinir. */
(function () {
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var SEL = '[class*="rounded-3xl"],[class*="rounded-2xl"],:is([class*="space-y"],[class*="grid"])>[class*="rounded-xl"]';
  var seen = new WeakSet(), queue = [], scheduled = false;

  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (list) {
    list.forEach(function (en) {
      if (en.isIntersecting) { show(en.target, 0); io.unobserve(en.target); }
    });
  }, { threshold: 0.06 }) : null;

  function show(el, d) {
    el.style.setProperty('--elp-d', d + 'ms');
    el.classList.remove('elp-pre');
    el.classList.add('elp-in');
    setTimeout(function () { el.classList.remove('elp-in'); el.style.removeProperty('--elp-d'); }, 1400);
  }

  function skip(el) {
    if (el.tagName === 'BUTTON' || el.closest('.fixed,.sticky,.absolute')) return true;
    var p = el.parentElement;
    while (p && p !== document.body) { if (seen.has(p)) return true; p = p.parentElement; }
    return false;
  }

  function flush() {
    scheduled = false;
    var n = 0, vh = window.innerHeight;
    queue.splice(0).forEach(function (root) {
      if (!root.isConnected) return;
      var found = root.matches && root.matches(SEL) ? [root] : [];
      found = found.concat([].slice.call(root.querySelectorAll(SEL)));
      found.forEach(function (el) {
        if (seen.has(el) || skip(el)) return;
        seen.add(el);
        var top = el.getBoundingClientRect().top;
        if (top < vh && top > -40 || !io) { show(el, Math.min(n++, 8) * 70); }
        else {
          el.classList.add('elp-pre'); io.observe(el);
          setTimeout(function () { el.classList.remove('elp-pre'); }, 4000);
        }
      });
    });
  }

  var last = { x: 0, y: 0, t: 0 };
  document.addEventListener('pointerdown', function (e) { last = { x: e.clientX, y: e.clientY, t: Date.now() }; }, true);
  function reveal(n) {
    var list = n.matches && n.matches('.fixed.inset-0') ? [n] : [];
    list = list.concat([].slice.call(n.querySelectorAll ? n.querySelectorAll('.fixed.inset-0') : []));
    list.forEach(function (el) {
      var fresh = Date.now() - last.t < 1500;
      el.style.setProperty('--ox', (fresh ? last.x : innerWidth / 2) + 'px');
      el.style.setProperty('--oy', (fresh ? last.y : innerHeight / 2) + 'px');
      el.classList.add('elp-reveal');
      setTimeout(function () { el.classList.remove('elp-reveal'); }, 800);
    });
  }

  function enqueue(node) {
    queue.push(node);
    if (!scheduled) { scheduled = true; requestAnimationFrame(flush); }
  }

  function start() {
    var root = document.getElementById('root');
    if (!root) return;
    new MutationObserver(function (ms) {
      ms.forEach(function (m) {
        m.addedNodes.forEach(function (n) { if (n.nodeType === 1 && !n.classList.contains('elp-ripple-wrap')) { reveal(n); enqueue(n); } });
      });
    }).observe(root, { childList: true, subtree: true });
    enqueue(root);
  }

  /* Ripple */
  document.addEventListener('pointerdown', function (e) {
    var b = e.target.closest && e.target.closest('button');
    if (!b || b.disabled || !/bg-|border/.test(b.className)) return;
    if (getComputedStyle(b).position === 'static') b.style.position = 'relative';
    var r = b.getBoundingClientRect(), s = Math.max(r.width, r.height) * 2;
    var wrap = document.createElement('span'), dot = document.createElement('span');
    wrap.className = 'elp-ripple-wrap'; dot.className = 'elp-ripple';
    dot.style.cssText = 'width:' + s + 'px;height:' + s + 'px;left:' + (e.clientX - r.left - s / 2) + 'px;top:' + (e.clientY - r.top - s / 2) + 'px';
    wrap.appendChild(dot); b.appendChild(wrap);
    setTimeout(function () { if (wrap.parentNode) wrap.parentNode.removeChild(wrap); }, 650);
  }, true);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
