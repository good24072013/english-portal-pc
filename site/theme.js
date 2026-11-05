/* Monthly theme switcher. Picks the theme from the device date, so the look changes by itself every month.
   Preview any month:  open the site with  ?theme=10  (number) or  ?theme=october  (name).
   Back to automatic:   open the site without ?theme.                                             */
(function () {
  var SHOW_MONTH_BADGE = true; // set to false to hide the small month label at the bottom-left
  var MONTHS = [{"key": 1, "name": "January", "emoji": "❄️", "tag": "Winter"}, {"key": 2, "name": "February", "emoji": "🌹", "tag": "Winter Rose"}, {"key": 3, "name": "March", "emoji": "🌱", "tag": "Novruz & Spring"}, {"key": 4, "name": "April", "emoji": "🌸", "tag": "Spring Bloom"}, {"key": 5, "name": "May", "emoji": "🇦🇿", "tag": "Flowers & Independence"}, {"key": 6, "name": "June", "emoji": "☀️", "tag": "Summer Sun"}, {"key": 7, "name": "July", "emoji": "🌊", "tag": "Summer Sea"}, {"key": 8, "name": "August", "emoji": "🌅", "tag": "Summer Sunset"}, {"key": 9, "name": "September", "emoji": "🎒", "tag": "Back to School"}, {"key": 10, "name": "October", "emoji": "🍂", "tag": "Autumn"}, {"key": 11, "name": "November", "emoji": "🍁", "tag": "Late Autumn"}, {"key": 12, "name": "December", "emoji": "🎄", "tag": "New Year"}];
  var q = new URLSearchParams(location.search).get('theme');
  var month = new Date().getMonth() + 1;
  if (q) {
    var n = parseInt(q, 10);
    if (n >= 1 && n <= 12) month = n;
    else MONTHS.forEach(function (m) { if (m.name.toLowerCase() === q.toLowerCase()) month = m.key; });
  }
  var info = MONTHS[month - 1];
  document.documentElement.setAttribute('data-month', String(month));
  window.addEventListener('DOMContentLoaded', function () {
    if (!SHOW_MONTH_BADGE) return;
    var b = document.createElement('div');
    b.id = 'month-badge';
    b.textContent = info.emoji + ' ' + info.name + ' \u2022 ' + info.tag;
    document.body.appendChild(b);
  });
})();
