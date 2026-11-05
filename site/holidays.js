/* Holiday themes. Picks a holiday theme from the device date and lays it over the monthly theme.
   Only colours + a small banner + light falling decorations. The app code is not touched.

   Preview any holiday:   open the site with  ?holiday=victory   (keys are in the list below, or open /bayramlar.html)
   Theme button (🎨, bottom-left): lets anyone pick Auto, any month or any holiday. The choice is remembered on that browser.
   Holidays OFF / ON:     ?holiday=off  /  ?holiday=on  (same as choosing in the button)

   To change something, edit the list below:
     from / to   = dates every year, "MM-DD"  (a range may cross New Year, e.g. 12-26 -> 01-02)
     years       = dates that change every year (Ramazan / Gurban Bayram) - add a new year when it is announced
     charshanba  = Novruz Tuesdays, calculated automatically every year
     priority    = bigger number wins when two holidays fall on the same day (then the shorter one wins)
     fx          = falling decorations ("AZFLAG" = small flag); empty list = no animation (used on days of remembrance) */
(function () {
  'use strict';
  var SETTINGS = { effects: true, banner: true, bannerSeconds: 10, badge: true, picker: true }; // picker:false hides the theme button
  var HOLIDAYS = [
 {
  "key": "newyear",
  "name": "Happy New Year!",
  "az": "Yeni iliniz mübarək!",
  "emoji": "🎄",
  "palette": "newyear",
  "fx": [
   "❄️",
   "🎄",
   "✨",
   "⭐"
  ],
  "priority": 0,
  "from": "12-26",
  "to": "01-02"
 },
 {
  "key": "solidarity",
  "name": "World Azerbaijanis' Solidarity Day",
  "az": "Dünya Azərbaycanlılarının Həmrəyliyi Günü",
  "emoji": "AZFLAG",
  "palette": "flag",
  "fx": [
   "AZFLAG",
   "AZFLAG",
   "✨",
   "🎉"
  ],
  "priority": 2,
  "from": "12-31",
  "to": "12-31"
 },
 {
  "key": "blackjanuary",
  "name": "In memory of the martyrs of 20 January",
  "az": "20 Yanvar şəhidlərinin xatirəsi anılır",
  "emoji": "🕯️",
  "palette": "solemn",
  "fx": [],
  "solemn": true,
  "priority": 2,
  "from": "01-20",
  "to": "01-20"
 },
 {
  "key": "womensday",
  "name": "Happy International Women's Day!",
  "az": "Beynəlxalq Qadınlar Günü mübarək!",
  "emoji": "🌷",
  "palette": "women",
  "fx": [
   "🌷",
   "🌸",
   "💐",
   "✨"
  ],
  "priority": 2,
  "from": "03-08",
  "to": "03-08"
 },
 {
  "key": "novruz",
  "name": "Happy Novruz season!",
  "az": "Novruz bayramınız mübarək!",
  "emoji": "🌱",
  "palette": "novruz",
  "fx": [
   "🌱",
   "🌷",
   "🥚",
   "✨"
  ],
  "priority": 0,
  "from": "03-01",
  "to": "03-24"
 },
 {
  "key": "su",
  "name": "Su Chershanbe - the Water festival",
  "az": "Su çərşənbəniz mübarək!",
  "emoji": "💧",
  "palette": "water",
  "fx": [
   "💧",
   "💦",
   "✨"
  ],
  "priority": 2,
  "charshanba": "su"
 },
 {
  "key": "od",
  "name": "Od Chershanbe - the Fire festival",
  "az": "Od çərşənbəniz mübarək!",
  "emoji": "🔥",
  "palette": "fire",
  "fx": [
   "🔥",
   "✨",
   "🕯️"
  ],
  "priority": 2,
  "charshanba": "od"
 },
 {
  "key": "yel",
  "name": "Yel Chershanbe - the Wind festival",
  "az": "Yel çərşənbəniz mübarək!",
  "emoji": "🍃",
  "palette": "wind",
  "fx": [
   "🍃",
   "🌬️",
   "✨"
  ],
  "priority": 2,
  "charshanba": "yel"
 },
 {
  "key": "torpaq",
  "name": "Torpaq Chershanbe - the Earth festival",
  "az": "Torpaq çərşənbəniz mübarək!",
  "emoji": "🌱",
  "palette": "earth",
  "fx": [
   "🌱",
   "🌿",
   "✨"
  ],
  "priority": 2,
  "charshanba": "torpaq"
 },
 {
  "key": "novruzbayram",
  "name": "Happy Novruz Bayram!",
  "az": "Novruz bayramınız mübarək!",
  "emoji": "🔥",
  "palette": "novruz",
  "fx": [
   "🔥",
   "🌷",
   "🥚",
   "✨",
   "🌱"
  ],
  "priority": 2,
  "from": "03-20",
  "to": "03-24"
 },
 {
  "key": "ramazan",
  "name": "Happy Ramazan Bayram!",
  "az": "Ramazan bayramınız mübarək!",
  "emoji": "🌙",
  "palette": "islamic",
  "fx": [
   "🌙",
   "✨",
   "⭐"
  ],
  "priority": 3,
  "note": "approximate dates - confirm each year",
  "years": {
   "2027": [
    [
     "03-09",
     "03-10"
    ]
   ],
   "2028": [
    [
     "02-26",
     "02-27"
    ]
   ],
   "2029": [
    [
     "02-14",
     "02-15"
    ]
   ],
   "2030": [
    [
     "02-04",
     "02-05"
    ]
   ]
  }
 },
 {
  "key": "gurban",
  "name": "Happy Gurban Bayram!",
  "az": "Qurban bayramınız mübarək!",
  "emoji": "🌙",
  "palette": "islamic",
  "fx": [
   "🌙",
   "✨",
   "⭐"
  ],
  "priority": 3,
  "note": "approximate dates - confirm each year",
  "years": {
   "2027": [
    [
     "05-16",
     "05-17"
    ]
   ],
   "2028": [
    [
     "05-05",
     "05-06"
    ]
   ],
   "2029": [
    [
     "04-24",
     "04-25"
    ]
   ],
   "2030": [
    [
     "04-14",
     "04-15"
    ]
   ]
  }
 },
 {
  "key": "genocide",
  "name": "Day of Genocide of Azerbaijanis",
  "az": "Azərbaycanlıların Soyqırımı Günü",
  "emoji": "🕯️",
  "palette": "solemn",
  "fx": [],
  "solemn": true,
  "priority": 2,
  "from": "03-31",
  "to": "03-31"
 },
 {
  "key": "victoryfascism",
  "name": "Victory Day over Fascism",
  "az": "Faşizm üzərində Qələbə Günü",
  "emoji": "🌹",
  "palette": "redstar",
  "fx": [
   "🌹",
   "⭐",
   "✨"
  ],
  "priority": 2,
  "from": "05-09",
  "to": "05-09"
 },
 {
  "key": "independence",
  "name": "Happy Independence Day (28 May)!",
  "az": "Müstəqillik Günü mübarək!",
  "emoji": "AZFLAG",
  "palette": "flag",
  "fx": [
   "AZFLAG",
   "AZFLAG",
   "✨",
   "🎉"
  ],
  "priority": 2,
  "from": "05-28",
  "to": "05-28"
 },
 {
  "key": "salvation",
  "name": "National Salvation Day",
  "az": "Milli Qurtuluş Günü",
  "emoji": "AZFLAG",
  "palette": "flag",
  "fx": [
   "AZFLAG",
   "AZFLAG",
   "✨",
   "🎉"
  ],
  "priority": 2,
  "from": "06-15",
  "to": "06-15"
 },
 {
  "key": "armedforces",
  "name": "Armed Forces Day",
  "az": "Silahlı Qüvvələr Günü",
  "emoji": "AZFLAG",
  "palette": "flag",
  "fx": [
   "AZFLAG",
   "AZFLAG",
   "⭐",
   "✨"
  ],
  "priority": 2,
  "from": "06-26",
  "to": "06-26"
 },
 {
  "key": "knowledge",
  "name": "Knowledge Day - happy new school year!",
  "az": "Bilik Günü mübarək!",
  "emoji": "📚",
  "palette": "school",
  "fx": [
   "📚",
   "✏️",
   "🎒",
   "⭐"
  ],
  "priority": 2,
  "from": "09-01",
  "to": "09-01"
 },
 {
  "key": "remembrance",
  "name": "Remembrance Day",
  "az": "Anım Günü",
  "emoji": "🕯️",
  "palette": "solemn",
  "fx": [],
  "solemn": true,
  "priority": 2,
  "from": "09-27",
  "to": "09-27"
 },
 {
  "key": "teachers",
  "name": "Happy Teachers' Day!",
  "az": "Müəllimlər Günü mübarək!",
  "emoji": "🍎",
  "palette": "school",
  "fx": [
   "🍎",
   "📚",
   "✏️",
   "✨"
  ],
  "priority": 2,
  "from": "10-05",
  "to": "10-05"
 },
 {
  "key": "restoration",
  "name": "Independence Restoration Day",
  "az": "Müstəqilliyin Bərpası Günü",
  "emoji": "AZFLAG",
  "palette": "flag",
  "fx": [
   "AZFLAG",
   "AZFLAG",
   "✨",
   "🎉"
  ],
  "priority": 2,
  "from": "10-18",
  "to": "10-18"
 },
 {
  "key": "victory",
  "name": "Happy Victory Day!",
  "az": "Zəfər Günü mübarək!",
  "emoji": "AZFLAG",
  "palette": "flag",
  "fx": [
   "AZFLAG",
   "AZFLAG",
   "🎆",
   "✨",
   "⭐"
  ],
  "priority": 2,
  "from": "11-08",
  "to": "11-08"
 },
 {
  "key": "flagday",
  "name": "State Flag Day",
  "az": "Dövlət Bayrağı Günü",
  "emoji": "AZFLAG",
  "palette": "flag",
  "fx": [
   "AZFLAG",
   "AZFLAG",
   "✨",
   "🎉"
  ],
  "priority": 2,
  "from": "11-09",
  "to": "11-09"
 },
 {
  "key": "constitution",
  "name": "Constitution Day",
  "az": "Konstitusiya Günü",
  "emoji": "📜",
  "palette": "constitution",
  "fx": [
   "📜",
   "✨",
   "⚖️"
  ],
  "priority": 2,
  "from": "11-12",
  "to": "11-12"
 },
 {
  "key": "revival",
  "name": "National Revival Day",
  "az": "Milli Dirçəliş Günü",
  "emoji": "AZFLAG",
  "palette": "flag",
  "fx": [
   "AZFLAG",
   "AZFLAG",
   "✨",
   "🎉"
  ],
  "priority": 2,
  "from": "11-17",
  "to": "11-17"
 }
];

  function addDays(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
  function md(y, s) { var p = s.split('-'); return new Date(y, +p[0] - 1, +p[1]); }
  function torpaq(y) { var d = new Date(y, 2, 19); while (d.getDay() !== 2) d = addDays(d, -1); return d; } // last Tuesday before 20 March
  function rangesFor(h, y) {
    if (h.charshanba) {
      var off = { su: -21, od: -14, yel: -7, torpaq: 0 }[h.charshanba], dt = addDays(torpaq(y), off);
      return [[dt, dt]];
    }
    if (h.years) return (h.years[String(y)] || []).map(function (r) { return [md(y, r[0]), md(y, r[1])]; });
    var s = md(y, h.from), e = md(y, h.to);
    if (e < s) return [[md(y - 1, h.from), e], [s, md(y + 1, h.to)]];
    return [[s, e]];
  }
  function pick(now) {
    var t = new Date(now.getFullYear(), now.getMonth(), now.getDate()), best = null, bestLen = 0;
    HOLIDAYS.forEach(function (h) {
      rangesFor(h, t.getFullYear()).forEach(function (r) {
        if (t < r[0] || t > r[1]) return;
        var len = (r[1] - r[0]) / 86400000, pr = h.priority || 0;
        if (!best || pr > (best.priority || 0) || (pr === (best.priority || 0) && len < bestLen)) { best = h; bestLen = len; }
      });
    });
    return best;
  }
  window.HolidayTheme = { pick: pick, holidays: HOLIDAYS };

  var MONTHS = [["\u2744\ufe0f","January"],["\ud83c\udf39","February"],["\ud83c\udf31","March"],["\ud83c\udf38","April"],["\ud83c\udf3c","May"],["\u2600\ufe0f","June"],
                ["\ud83c\udf0a","July"],["\ud83c\udf05","August"],["\ud83c\udf92","September"],["\ud83c\udf42","October"],["\ud83c\udf41","November"],["\ud83c\udf84","December"]];
  var root = document.documentElement;
  var AUTO_MONTH = root.getAttribute('data-month'); // set by theme.js (date, or ?theme=)
  var q = null, current = null, ready = false;
  try { q = new URLSearchParams(location.search).get('holiday'); } catch (e) {}

  function getChoice() { try { return localStorage.getItem('themeChoice') || 'auto'; } catch (e) { return 'auto'; } }
  function setChoice(c) { try { if (c === 'auto') localStorage.removeItem('themeChoice'); else localStorage.setItem('themeChoice', c); } catch (e) {} }
  // old switch: ?holiday=off / ?holiday=on
  if (q === 'off') { setChoice('noholiday'); }
  if (q === 'on') { setChoice('auto'); }
  function byKey(k) { var r = null; HOLIDAYS.forEach(function (x) { if (x.key === k) r = x; }); return r; }

  // ---- several themes: a saved choice can be a list "month:3,holiday:victory,month:10" ----
  // With 2 or more themes the colours are BLENDED and the falling decorations of all of them are shown together.
  function tokens(c) { return (c || '').split(',').filter(function (t) { return t; }); }
  function isSingleMode(c) { return c === 'auto' || c === 'noholiday'; }

  // what should be shown for ONE theme token: { month: number|null, holiday: object|null }
  function resolveToken(choice) {
    if (choice === 'noholiday') return { month: null, holiday: null };
    if (choice.indexOf('month:') === 0) return { month: +choice.slice(6), holiday: null };
    if (choice.indexOf('holiday:') === 0) return { month: null, holiday: byKey(choice.slice(8)) };
    return { month: null, holiday: pick(new Date()) };
  }
  function monthLabel(n) { var m = MONTHS[n - 1]; return { emoji: m[0], name: m[1] }; }
  // several themes -> one result: first theme gives the base, decorations/banner of all holidays are joined
  function mergeParts(parts) {
    var hs = [], fxAll = [], month = null;
    parts.forEach(function (p) {
      if (p.holiday) { hs.push(p.holiday); (p.holiday.fx || []).forEach(function (t) { fxAll.push(t); }); }
      if (!month && p.month) month = p.month;
    });
    var holiday = null;
    if (hs.length) {
      holiday = {
        key: hs[0].key, palette: hs[0].palette, emoji: hs[0].emoji, solemn: false,
        name: hs.map(function (h) { return h.name; }).join(' + '),
        az: hs.map(function (h) { return h.az; }).join(' \u2022 '),
        fx: fxAll
      };
    }
    return { month: month, holiday: holiday, blend: parts };
  }
  function resolve(choice) {
    var list = isSingleMode(choice) ? [] : tokens(choice);
    if (list.length < 2) return resolveToken(list.length ? list[0] : choice);
    return mergeParts(list.map(resolveToken));
  }

  // ---- colour blending (average in the OKLab colour space) ----
  var BLEND_VERSION = '20261021';
  var VARS = [];
  ['slate'].forEach(function (n) { [700, 800, 900, 950].forEach(function (k) { VARS.push('--color-' + n + '-' + k); }); });
  ['blue', 'indigo', 'purple'].forEach(function (n) { [200, 300, 400, 500, 600, 700, 800, 900, 950].forEach(function (k) { VARS.push('--color-' + n + '-' + k); }); });
  function parseOk(str) {
    var m = /oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)/.exec(str || '');
    if (!m) return null;
    var L = parseFloat(m[1]); if (m[2] === '%') L /= 100;
    return { L: L, C: parseFloat(m[3]), h: parseFloat(m[4]) * Math.PI / 180 };
  }
  function mixColors(strs) {
    var ps = strs.map(parseOk).filter(Boolean);
    if (!ps.length) return strs[0];
    var L = 0, a = 0, b = 0, C = 0, n = ps.length;
    ps.forEach(function (p) { L += p.L; a += p.C * Math.cos(p.h); b += p.C * Math.sin(p.h); C += p.C; });
    L /= n; a /= n; b /= n; C /= n;
    var chroma = (Math.sqrt(a * a + b * b) + C) / 2; // keep the colours lively when hues are far apart
    var hue = Math.atan2(b, a) * 180 / Math.PI; if (hue < 0) hue += 360;
    return 'oklch(' + (L * 100).toFixed(1) + '% ' + chroma.toFixed(3) + ' ' + hue.toFixed(1) + ')';
  }
  function clearBlend() { VARS.forEach(function (v) { root.style.removeProperty(v); }); }
  function setPartAttrs(part, baseMonth) {
    root.removeAttribute('data-holiday'); root.removeAttribute('data-holiday-theme');
    if (part.month) root.setAttribute('data-month', String(part.month)); else if (baseMonth) root.setAttribute('data-month', baseMonth);
    if (part.holiday) { root.setAttribute('data-holiday', part.holiday.key); root.setAttribute('data-holiday-theme', part.holiday.palette); }
  }
  function blendKey() { return 'themeBlend:' + BLEND_VERSION; }
  function useBlendCache(choice) {
    try {
      var c = JSON.parse(localStorage.getItem(blendKey()) || 'null');
      if (!c || c.choice !== choice) return false;
      VARS.forEach(function (v) { if (c.vars[v]) root.style.setProperty(v, c.vars[v]); });
      return true;
    } catch (e) { return false; }
  }
  function applyBlend(res) {
    clearBlend();
    if (!res.blend || res.blend.length < 2) return;
    var saved = { m: root.getAttribute('data-month'), h: root.getAttribute('data-holiday'), t: root.getAttribute('data-holiday-theme') };
    var values = res.blend.map(function (part) {
      setPartAttrs(part, AUTO_MONTH);
      var cs = getComputedStyle(root), o = {};
      VARS.forEach(function (v) { o[v] = (cs.getPropertyValue(v) || '').trim(); });
      return o;
    });
    ['data-month', 'data-holiday', 'data-holiday-theme'].forEach(function (a, i) {
      var val = [saved.m, saved.h, saved.t][i]; if (val === null) root.removeAttribute(a); else root.setAttribute(a, val);
    });
    var out = {};
    VARS.forEach(function (v) {
      out[v] = mixColors(values.map(function (o) { return o[v]; }).filter(function (x) { return x; }));
      if (out[v]) root.style.setProperty(v, out[v]);
    });
    try { localStorage.setItem(blendKey(), JSON.stringify({ choice: getChoice(), vars: out })); } catch (e) {}
  }

  function icon(tok) {
    if (tok === 'AZFLAG') { var f = document.createElement('i'); f.className = 'h-flag'; return f; }
    return document.createTextNode(tok);
  }
  function rm(id) { var e = document.getElementById(id); if (e && e.parentNode) e.parentNode.removeChild(e); }

  function banner(h, force) {
    rm('holiday-banner');
    var seenKey = 'holidayBanner:' + h.key + ':' + new Date().getFullYear();
    try { if (!force) { if (sessionStorage.getItem(seenKey)) return; sessionStorage.setItem(seenKey, '1'); } } catch (e) {}
    var b = document.createElement('div'); b.id = 'holiday-banner'; b.setAttribute('role', 'status');
    var s = document.createElement('span');
    s.appendChild(icon(h.emoji)); s.appendChild(document.createTextNode(' ' + h.name + ' '));
    var a = document.createElement('span'); a.className = 'h-az'; a.textContent = '\u2022 ' + h.az; s.appendChild(a);
    var x = document.createElement('button'); x.type = 'button'; x.setAttribute('aria-label', 'Close'); x.textContent = '\u00d7';
    function close() { b.classList.add('h-out'); setTimeout(function () { if (b.parentNode) b.parentNode.removeChild(b); }, 700); }
    x.addEventListener('click', close);
    b.appendChild(s); b.appendChild(x); document.body.appendChild(b);
    setTimeout(close, SETTINGS.bannerSeconds * 1000);
  }
  function fx(h) {
    rm('holiday-fx');
    if (!h.fx || !h.fx.length) return;
    try { if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return; } catch (e) {}
    var box = document.createElement('div'); box.id = 'holiday-fx'; box.setAttribute('aria-hidden', 'true');
    var n = (window.innerWidth || 800) < 640 ? 10 : 16;
    for (var i = 0; i < n; i++) {
      var sp = document.createElement('span'), tok = h.fx[i % h.fx.length];
      sp.appendChild(icon(tok));
      sp.style.left = Math.round(Math.random() * 96) + '%';
      sp.style.fontSize = (14 + Math.round(Math.random() * 12)) + 'px';
      sp.style.animationDuration = (10 + Math.random() * 10).toFixed(1) + 's';
      sp.style.animationDelay = '-' + (Math.random() * 18).toFixed(1) + 's';
      sp.style.setProperty('--dx', (Math.round(Math.random() * 120) - 60) + 'px');
      sp.style.setProperty('--rot', (Math.round(Math.random() * 360) - 180) + 'deg');
      box.appendChild(sp);
    }
    document.body.appendChild(box);
  }
  function badge(res) {
    var b = document.getElementById('month-badge'); if (!b) return;
    b.textContent = '';
    if (res.blend) {
      res.blend.forEach(function (p, i) {
        if (i) b.appendChild(document.createTextNode(' + '));
        if (p.holiday) { b.appendChild(icon(p.holiday.emoji)); b.appendChild(document.createTextNode(' ' + p.holiday.name)); }
        else { var ml = monthLabel(p.month || +(root.getAttribute('data-month') || 1)); b.appendChild(document.createTextNode(ml.emoji + ' ' + ml.name)); }
      });
      return;
    }
    if (res.holiday) { b.appendChild(icon(res.holiday.emoji)); b.appendChild(document.createTextNode(' ' + res.holiday.name)); return; }
    var m = +(root.getAttribute('data-month') || 1), mm = MONTHS[m - 1];
    b.appendChild(document.createTextNode(mm[0] + ' ' + mm[1]));
  }

  // put a result on the page (colours first; banner / decorations once the page body exists)
  function apply(res, force) {
    current = res;
    root.removeAttribute('data-holiday'); root.removeAttribute('data-holiday-theme');
    if (res.month) root.setAttribute('data-month', String(res.month)); else if (AUTO_MONTH) root.setAttribute('data-month', AUTO_MONTH);
    if (res.holiday) { root.setAttribute('data-holiday', res.holiday.key); root.setAttribute('data-holiday-theme', res.holiday.palette); }
    if (res.blend) { if (ready) applyBlend(res); else useBlendCache(getChoice()); } else clearBlend();
    if (!ready) return;
    rm('holiday-fx'); rm('holiday-banner');
    if (SETTINGS.badge) badge(res);
    if (res.holiday) {
      if (SETTINGS.banner) banner(res.holiday, force);
      if (SETTINGS.effects) fx(res.holiday);
    }
  }

  // first paint: ?holiday=key (preview) wins, then the saved choice, then the date
  var first = null;
  if (q && q !== 'on' && q !== 'off' && byKey(q.toLowerCase())) first = { month: null, holiday: byKey(q.toLowerCase()) };
  var forced = !!first;
  if (!first) first = resolve(getChoice());
  apply(first, forced);

  // ---- theme picker (small button, bottom-left) ----
  function buildPicker() {
    if (!SETTINGS.picker) return;
    var btn = document.createElement('button');
    btn.id = 'theme-btn'; btn.type = 'button'; btn.setAttribute('aria-label', 'Change theme'); btn.setAttribute('aria-expanded', 'false'); btn.title = 'Theme';
    btn.textContent = '\ud83c\udfa8';
    var panel = document.createElement('div');
    panel.id = 'theme-panel'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Choose theme'); panel.hidden = true;

    function head(t) { var d = document.createElement('div'); d.className = 'tp-h'; d.textContent = t; panel.appendChild(d); }
    function note(t) { var d = document.createElement('div'); d.className = 'tp-n'; d.textContent = t; panel.appendChild(d); }
    function item(choice, iconTok, label) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'tp-i'; b.setAttribute('data-choice', choice);
      var ic = document.createElement('span'); ic.className = 'tp-e'; ic.appendChild(icon(iconTok)); b.appendChild(ic);
      var tx = document.createElement('span'); tx.className = 'tp-t'; tx.textContent = label; b.appendChild(tx);
      var ck = document.createElement('span'); ck.className = 'tp-c'; ck.setAttribute('aria-hidden', 'true'); b.appendChild(ck);
      b.addEventListener('click', function () { choose(choice); });
      panel.appendChild(b);
    }
    // click = add / remove a theme. 1 theme = that theme, 2 or more = they are blended together
    function choose(choice) {
      var c = getChoice();
      if (isSingleMode(choice)) { setChoice(choice); apply(resolve(choice), true); mark(); return; }
      var list = isSingleMode(c) ? [] : tokens(c), at = list.indexOf(choice);
      if (at >= 0) list.splice(at, 1); else list.push(choice);
      if (!list.length) { setChoice('auto'); apply(resolve('auto'), true); mark(); return; }
      setChoice(list.join(','));
      apply(resolve(list.join(',')), true);
      mark();
    }
    head('Pick one theme or several');
    note('Pick 1 theme to use it. Pick 2 or more and they are blended: colours and falling decorations are mixed together. / Bir neçə tema seçsən, rənglər və yuxarıdan düşən bəzəklər birləşir.');
    head('Automatic');
    item('auto', '\u2728', 'Auto (by today\u2019s date)');
    item('noholiday', '\ud83d\udeab', 'Months only, no holidays');
    head('Months');
    MONTHS.forEach(function (m, i) { item('month:' + (i + 1), m[0], m[1]); });
    head('Holidays');
    HOLIDAYS.forEach(function (h) { item('holiday:' + h.key, h.emoji, h.name); });

    function mark() {
      var c = getChoice(), list = isSingleMode(c) ? [c] : tokens(c);
      Array.prototype.forEach.call(panel.querySelectorAll('.tp-i'), function (b) {
        var on = list.indexOf(b.getAttribute('data-choice')) >= 0; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false');
        var ck = b.querySelector('.tp-c'); if (ck) ck.textContent = on && !isSingleMode(b.getAttribute('data-choice')) ? '\u2713' : '';
      });
    }
    function open(v) {
      panel.hidden = !v; btn.setAttribute('aria-expanded', v ? 'true' : 'false');
      if (v) { mark(); var on = panel.querySelector('.tp-i.on'); if (on && on.scrollIntoView) on.scrollIntoView({ block: 'nearest' }); }
    }
    btn.addEventListener('click', function (e) { e.stopPropagation(); open(panel.hidden); });
    panel.addEventListener('click', function (e) { e.stopPropagation(); });
    document.addEventListener('click', function () { if (!panel.hidden) open(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { open(false); btn.focus(); } });
    document.body.appendChild(panel); document.body.appendChild(btn);
  }

  window.addEventListener('DOMContentLoaded', function () {
    ready = true;
    apply(current, forced);
    buildPicker();
  });
})();
