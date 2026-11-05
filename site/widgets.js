/* Student widgets board: clock, word of the day, streak, goal, pomodoro, countdown, quote, tip, verb quiz, writing counter, band calculator, notes */
(function(){
var SK='elp_current_user_session_v3',P='elp_w_';
function sess(){try{return JSON.parse(localStorage.getItem(SK)||'null')}catch(e){return null}}
function get(k,d){try{var v=localStorage.getItem(P+k);return v==null?d:JSON.parse(v)}catch(e){return d}}
function put(k,v){try{localStorage.setItem(P+k,JSON.stringify(v))}catch(e){}}
function esc(t){var d=document.createElement('div');d.textContent=t==null?'':t;return d.innerHTML}
function day(d){d=d||new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function dayNo(){return Math.floor(Date.now()/864e5)}
var $=function(i){return document.getElementById(i)};

var CSS='#__wOv{position:fixed;inset:0;z-index:210;background:var(--color-slate-950,#020617);overflow:auto;-webkit-overflow-scrolling:touch;color:#e2e8f0;font:14px system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}'+
'#__wOv *{box-sizing:border-box}'+
'.w-head{position:sticky;top:0;z-index:2;display:flex;justify-content:space-between;align-items:center;padding:14px 18px;background:color-mix(in oklab,var(--color-slate-950,#020617) 92%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid var(--color-slate-800,#1e293b)}'+
'.w-head h1{margin:0;font-size:18px;font-weight:900;color:#fff}'+
'.w-x{width:38px;height:38px;border-radius:999px;border:0;background:var(--color-slate-800,#1e293b);color:#fff;font-size:16px;cursor:pointer}'+
'.w-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:14px;padding:16px 18px 40px;max-width:1200px;margin:0 auto}'+
'.w{position:relative;padding:16px;border-radius:24px;background:var(--color-slate-900,#0f172a);border:1px solid var(--color-slate-800,#1e293b);overflow:hidden}'+
'.w:before{content:"";position:absolute;inset:0 0 auto 0;height:3px;background:linear-gradient(90deg,var(--color-amber-500,#f59e0b),var(--color-rose-500,#f43f5e))}'+
'.w.wide{grid-column:span 2}@media(max-width:640px){.w.wide{grid-column:span 1}}'+
'.w h3{margin:0 0 10px;font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--color-slate-400,#94a3b8)}'+
'.w .big{font-size:40px;font-weight:900;color:#fff;font-variant-numeric:tabular-nums;line-height:1.1}'+
'.w .sm{font-size:12px;color:var(--color-slate-400,#94a3b8)}'+
'.w .amb{color:var(--color-amber-300,#fcd34d)}'+
'.w button.b{padding:9px 14px;border:0;border-radius:12px;background:var(--color-amber-500,#f59e0b);color:var(--color-slate-950,#1c1917);font-weight:800;font-size:12px;cursor:pointer;margin:8px 6px 0 0}'+
'.w button.g{background:var(--color-slate-800,#1e293b);color:var(--color-slate-300,#cbd5e1)}'+
'.w input,.w textarea,.w select{width:100%;padding:10px;border-radius:12px;background:var(--color-slate-950,#020617);border:1px solid var(--color-slate-800,#1e293b);color:#fff;font:inherit;font-size:13px}'+
'.w textarea{resize:vertical;min-height:110px}'+
'.w .row{display:flex;gap:8px;align-items:center}.w .row>*{flex:1}'+
'.w .dots{display:flex;gap:6px;margin-top:10px}.w .dot{flex:1;text-align:center;font-size:10px;color:var(--color-slate-400,#94a3b8)}.w .dot i{display:block;height:26px;border-radius:9px;background:var(--color-slate-800,#1e293b);margin-bottom:4px}.w .dot.on i{background:linear-gradient(var(--color-amber-300,#fcd34d),var(--color-amber-500,#f59e0b))}'+
'.w .ok{color:var(--color-emerald-300,#6ee7b7)}.w .no{color:var(--color-red-300,#fca5a5)}'+
'#__wBtn{position:fixed;right:14px;bottom:70px;z-index:96;width:52px;height:52px;border:0;border-radius:999px;background:var(--color-amber-500,#f59e0b);font-size:24px;cursor:pointer;box-shadow:0 6px 18px #0009}';
function css(){if($('__wCss'))return;var s=document.createElement('style');s.id='__wCss';s.textContent=CSS;document.head.appendChild(s)}

/* data */
var QUOTES=[['The secret of getting ahead is getting started.','Başlamaq irəli getməyin sirridir.'],['Small steps every day lead to big results.','Hər gün atılan kiçik addımlar böyük nəticələrə aparır.'],['Mistakes are proof that you are trying.','Səhvlər cəhd etdiyinizin sübutudur.'],['Do not watch the clock; do what it does. Keep going.','Saata baxma, onun etdiyini et: davam et.'],['Learning never exhausts the mind.','Öyrənmək ağlı heç vaxt yormur.'],['Practice makes progress.','Təkrar irəliləyiş gətirir.'],['You do not have to be perfect to begin.','Başlamaq üçün mükəmməl olmaq lazım deyil.'],['Every expert was once a beginner.','Hər mütəxəssis bir vaxt yeni başlayan olub.'],['Consistency beats intensity.','Davamlılıq intensivliyi üstələyir.'],['Believe you can and you are halfway there.','Bacaracağına inan, yolun yarısını getmisən.']];
var TIPS=['Present Perfect (have/has + V3) keçmişdə başlayıb indiyə təsir edən və ya təcrübəni bildirir: "I have visited Rome."','"Since" dəqiq başlanğıc nöqtəsi (since 2020), "for" müddət (for 3 years) bildirir.','Sayıla bilən isimlərlə "many/few", sayıla bilməyənlərlə "much/little" işlədilir.','"Fewer" sayıla bilənlər üçün (fewer books), "less" sayıla bilməyənlər üçün (less water).','Şərt cümləsi 2 (If I had time, I would travel) real olmayan indiki vəziyyət üçündür.','"Affect" feldir (it affects me), "effect" isimdir (a big effect).','IELTS Writing: hər paraqrafda bir əsas fikir və bir nümunə yazın.','"Used to + V1" keçmişdəki vərdişi bildirir; "be used to + V-ing" alışmış olmağı.','Passive: object + be + V3 (The report was written by Ali).','"Their" (onların), "there" (orada), "they\'re" (onlar ki, they are) fərqləndirin.','"Look forward to" sözündən sonra V-ing gəlir: "I look forward to meeting you."','Linking words: however (lakin), moreover (üstəlik), therefore (buna görə).'];
var VERBS=[['go','went','gone'],['see','saw','seen'],['take','took','taken'],['write','wrote','written'],['eat','ate','eaten'],['give','gave','given'],['speak','spoke','spoken'],['break','broke','broken'],['choose','chose','chosen'],['drive','drove','driven'],['begin','began','begun'],['drink','drank','drunk'],['know','knew','known'],['run','ran','run'],['buy','bought','bought'],['bring','brought','brought'],['think','thought','thought'],['teach','taught','taught'],['catch','caught','caught'],['sell','sold','sold'],['tell','told','told'],['understand','understood','understood'],['forget','forgot','forgotten'],['fly','flew','flown']];

/* shared timers (keep running while the panel is closed) */
var pomo={mode:'work',left:1500,run:false},wr={left:2400,run:false};
function beep(){try{var a=new (window.AudioContext||window.webkitAudioContext)(),o=a.createOscillator(),g=a.createGain();o.connect(g);g.connect(a.destination);o.frequency.value=880;g.gain.value=.15;o.start();setTimeout(function(){o.stop();a.close()},350)}catch(e){}try{navigator.vibrate&&navigator.vibrate([200,100,200])}catch(e){}}
function mmss(s){return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
setInterval(function(){
  if(pomo.run){pomo.left--;if(pomo.left<=0){beep();pomo.mode=pomo.mode==='work'?'rest':'work';pomo.left=pomo.mode==='work'?1500:300;if(pomo.mode==='rest'){var g=get('goal',{d:day(),m:0});if(g.d!==day())g={d:day(),m:0};g.m+=25;put('goal',g)}}}
  if(wr.run){wr.left--;if(wr.left<=0){wr.run=false;wr.left=0;beep()}}
  paintTimers()},1000);
function paintTimers(){
  var a=$('wPomoT');if(a){a.textContent=mmss(pomo.left);$('wPomoM').textContent=pomo.mode==='work'?'🎯 Fokus vaxtı':'☕ Fasilə'}
  var b=$('wWrT')&&($('wWrT').textContent=mmss(wr.left));
  var c=$('wClock');if(c){var n=new Date();c.textContent=n.toLocaleTimeString('az-AZ',{timeZone:'Asia/Baku',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});$('wDate').textContent=n.toLocaleDateString('az-AZ',{timeZone:'Asia/Baku',weekday:'long',day:'numeric',month:'long',year:'numeric'})}}

/* streak */
function touchStreak(){
  var s=get('streak',{last:'',count:0,best:0,days:[]}),t=day();
  if(s.last!==t){var y=new Date();y.setDate(y.getDate()-1);s.count=s.last===day(y)?s.count+1:1;s.last=t;s.best=Math.max(s.best,s.count);s.days=(s.days||[]).concat(t).slice(-30);put('streak',s)}
  return s}

function ring(p,txt){var R=44,C=2*Math.PI*R,o=C*(1-Math.min(1,p));return '<svg width="110" height="110" viewBox="0 0 110 110"><circle cx="55" cy="55" r="'+R+'" fill="none" stroke="var(--color-slate-800,#1e293b)" stroke-width="10"/><circle cx="55" cy="55" r="'+R+'" fill="none" stroke="var(--color-amber-400,#fbbf24)" stroke-width="10" stroke-linecap="round" stroke-dasharray="'+C+'" stroke-dashoffset="'+o+'" transform="rotate(-90 55 55)"/><text x="55" y="60" text-anchor="middle" fill="#fff" font-size="18" font-weight="800">'+txt+'</text></svg>'}

function build(){
  var st=touchStreak(),g=get('goal',{d:day(),m:0});if(g.d!==day()){g={d:day(),m:0};put('goal',g)}
  var gt=get('goalTarget',30),q=QUOTES[dayNo()%QUOTES.length],tip=TIPS[dayNo()%TIPS.length];
  var days=[];for(var i=6;i>=0;i--){var d=new Date();d.setDate(d.getDate()-i);days.push(d)}
  var AZ=['B','B.e','Ç.a','Ç','C.a','C','Ş'];
  var dots=days.map(function(d){var on=(st.days||[]).indexOf(day(d))>=0;return '<div class="dot'+(on?' on':'')+'"><i></i>'+['B','B.e','Ç.a','Ç','C.a','C','Ş'][d.getDay()]+'</div>'}).join('');
  var vi=VERBS[dayNo()%VERBS.length];
  return ''+
  '<div class="w"><h3>🕒 Saat · Bakı</h3><div class="big" id="wClock">--:--:--</div><div class="sm" id="wDate"></div></div>'+
  '<div class="w"><h3>🔥 Ardıcıl günlər</h3><div class="big amb">'+st.count+' <span style="font-size:16px">gün</span></div><div class="sm">Ən yaxşı: '+st.best+' gün</div><div class="dots">'+dots+'</div></div>'+
  '<div class="w"><h3>🎯 Gündəlik hədəf</h3><div class="row"><div style="flex:none" id="wRing">'+ring(g.m/gt,g.m+"/"+gt)+'</div><div><div class="sm">Bu gün öyrəndiyiniz dəqiqə</div><button class="b" data-g="5">+5</button><button class="b" data-g="10">+10</button><button class="b g" data-g="0">Sıfırla</button></div></div><div class="row" style="margin-top:8px"><div class="sm" style="flex:none">Hədəf (dəq):</div><input id="wGT" type="number" min="5" max="600" value="'+gt+'"></div></div>'+
  '<div class="w"><h3>🍅 Pomodoro</h3><div class="sm" id="wPomoM"></div><div class="big" id="wPomoT">25:00</div><button class="b" id="wPomoGo">Başla / Dayan</button><button class="b g" id="wPomoRs">Sıfırla</button></div>'+
  '<div class="w"><h3>📖 Günün sözü</h3><div id="wWord"><div class="sm">Yüklənir...</div></div></div>'+
  '<div class="w"><h3>💬 Günün sitatı</h3><div style="font-size:16px;font-weight:700;color:#fff;line-height:1.45">“'+esc(q[0])+'”</div><div class="sm" style="margin-top:8px">'+esc(q[1])+'</div></div>'+
  '<div class="w"><h3>💡 Qrammatika məsləhəti</h3><div style="line-height:1.6">'+esc(tip)+'</div></div>'+
  '<div class="w"><h3>⏳ İmtahana qalan vaxt</h3><div id="wCd"></div><input id="wCdIn" type="date" style="margin-top:8px" value="'+(get('exam','')||'')+'"><div class="sm" style="margin-top:6px">IELTS və ya digər imtahan tarixini seçin</div></div>'+
  '<div class="w"><h3>🧠 Düzensiz fel mini-quiz</h3><div class="sm">V1 → V2 (past simple) yazın</div><div class="big" style="font-size:28px;margin:6px 0" id="wVq">'+vi[0]+'</div><div class="row"><input id="wVa" placeholder="past simple..." autocomplete="off"><button class="b" id="wVc" style="flex:none;margin:0">Yoxla</button></div><div id="wVr" class="sm" style="margin-top:8px"></div><button class="b g" id="wVn">Növbəti ▶</button></div>'+
  '<div class="w wide"><h3>✍️ IELTS Writing: söz sayğacı və 40 dəq taymer</h3><textarea id="wWr" placeholder="Task 2 essay-nizi bura yazın (minimum 250 söz)...">'+esc(get('draft',''))+'</textarea><div class="row" style="margin-top:8px"><div><span class="big" style="font-size:28px" id="wWc">0</span> <span class="sm">söz</span> <span id="wWs" class="sm"></span></div><div class="big" style="font-size:28px;text-align:right" id="wWrT">40:00</div></div><button class="b" id="wWrGo">Taymer: Başla / Dayan</button><button class="b g" id="wWrRs">Sıfırla</button></div>'+
  '<div class="w"><h3>🏆 IELTS band kalkulyatoru</h3><div class="row"><input id="bL" type="number" step="0.5" min="0" max="9" placeholder="Listening"><input id="bR" type="number" step="0.5" min="0" max="9" placeholder="Reading"></div><div class="row" style="margin-top:8px"><input id="bW" type="number" step="0.5" min="0" max="9" placeholder="Writing"><input id="bS" type="number" step="0.5" min="0" max="9" placeholder="Speaking"></div><div class="big amb" id="bO" style="margin-top:10px">–</div><div class="sm">Overall band</div></div>'+
  '<div class="w"><h3>📝 Qeydlər</h3><textarea id="wNote" placeholder="Yeni sözlər, qeydlər...">'+esc(get('note',''))+'</textarea><div class="sm" id="wNs">Avtomatik saxlanılır</div></div>';
}

function wire(){
  var ov=$('__wOv'),bg=ov.querySelector('.w-grid');
  bg.addEventListener('click',function(ev){var b=ev.target.closest('button');if(!b||b.dataset.g==null)return;
    var g=get('goal',{d:day(),m:0});if(g.d!==day())g={d:day(),m:0};var v=+b.dataset.g;g.m=v?g.m+v:0;put('goal',g);$('wRing').innerHTML=ring(g.m/(get('goalTarget',30)),g.m+'/'+get('goalTarget',30))});
  $('wGT').onchange=function(){var v=Math.max(5,Math.min(600,+this.value||30));put('goalTarget',v);var g=get('goal',{d:day(),m:0});$('wRing').innerHTML=ring(g.m/v,g.m+'/'+v)};
  $('wPomoGo').onclick=function(){pomo.run=!pomo.run};
  $('wPomoRs').onclick=function(){pomo={mode:'work',left:1500,run:false};paintTimers()};
  $('wWrGo').onclick=function(){wr.run=!wr.run};
  $('wWrRs').onclick=function(){wr={left:2400,run:false};paintTimers()};
  var ta=$('wWr');function cnt(){var n=(ta.value.trim().match(/\S+/g)||[]).length;$('wWc').textContent=n;$('wWs').textContent=n>=250?'✅ 250+':'('+(250-n)+' qalıb)';put('draft',ta.value)}
  ta.oninput=cnt;cnt();
  var nt=$('wNote');nt.oninput=function(){put('note',nt.value);$('wNs').textContent='✓ Saxlandı'};
  function cd(){var v=$('wCdIn').value,el=$('wCd');if(!v){el.innerHTML='<div class="sm">Tarix seçilməyib</div>';return}
    var n=Math.ceil((new Date(v+'T00:00:00')-new Date(day()+'T00:00:00'))/864e5);
    el.innerHTML=n>0?'<div class="big amb">'+n+' <span style="font-size:16px">gün</span></div><div class="sm">≈ '+Math.ceil(n/7)+' həftə qalıb</div>':n===0?'<div class="big amb">Bu gün! 🍀</div>':'<div class="sm">Tarix keçib</div>'}
  $('wCdIn').onchange=function(){put('exam',this.value);cd()};cd();
  var vi=dayNo()%VERBS.length;
  function vq(){$('wVq').textContent=VERBS[vi][0];$('wVa').value='';$('wVr').textContent=''}
  $('wVc').onclick=function(){var a=$('wVa').value.trim().toLowerCase(),v=VERBS[vi],r=$('wVr');
    if(!a)return;r.innerHTML=a===v[1]?'<span class="ok">✅ Düzdür! '+v[0]+' – '+v[1]+' – '+v[2]+'</span>':'<span class="no">❌ Düzgün: '+v[0]+' – '+v[1]+' – '+v[2]+'</span>'};
  $('wVn').onclick=function(){vi=(vi+1)%VERBS.length;vq()};
  $('wVa').onkeydown=function(e){if(e.key==='Enter')$('wVc').click()};
  function band(){var a=['bL','bR','bW','bS'].map(function(i){return parseFloat($(i).value)});
    if(a.some(function(x){return isNaN(x)})){$('bO').textContent='–';return}
    $('bO').textContent=(Math.round(a.reduce(function(s,x){return s+x},0)/4*2)/2).toFixed(1)}
  ['bL','bR','bW','bS'].forEach(function(i){$(i).oninput=band});
  fetch('/vocabulary-data.json').then(function(r){return r.json()}).then(function(L){var w=L[dayNo()%L.length];
    $('wWord').innerHTML='<div class="big" style="font-size:30px">'+esc(w.word)+'</div><div class="sm">'+esc(w.phonetic||'')+' · '+esc(w.partOfSpeech||'')+' · '+esc(w.level||'')+'</div><div style="font-size:18px;font-weight:700;margin:8px 0" class="amb">'+esc(w.translationAz)+'</div><div style="line-height:1.5">'+esc(w.exampleEn)+'</div><div class="sm" style="margin-top:4px">'+esc(w.exampleAz||'')+'</div>'}).catch(function(){$('wWord').innerHTML='<div class="sm">Yüklənmədi</div>'});
  paintTimers()}

function open(){
  if($('__wOv'))return;css();
  var o=document.createElement('div');o.id='__wOv';
  o.innerHTML='<div class="w-head"><h1>🧩 Widget-lər</h1><button class="w-x" id="wX">✕</button></div><div class="w-grid">'+build()+'</div>';
  document.body.appendChild(o);$('wX').onclick=function(){o.remove()};wire()}

function btn(){
  var u=sess(),x=$('__wBtn'),ok=u&&u.role==='student';
  if(ok&&!x){css();x=document.createElement('button');x.id='__wBtn';x.title='Widget-lər';x.textContent='🧩';x.onclick=open;document.body.appendChild(x)}
  else if(!ok&&x){x.remove();var o=$('__wOv');if(o)o.remove()}}
setInterval(btn,1000);
})();
