/* IELTS content: Homework, Article/Podcast, Sample essays.  window.__IE(el, user, tab) */
(function(){
var HW='ielts_homework',SUB='ielts_submissions',UK='elp_users_v3',dbP=null;
var CSS='.ie{color:var(--color-slate-200,#e2e8f0);font-size:13px}.ie *{box-sizing:border-box}.ie h2{margin:0 0 12px;font-size:16px;font-weight:800;color:#fff}'+
'.ie .box{padding:16px;border-radius:24px;background:var(--color-slate-900,#0f172a);border:1px solid var(--color-slate-800,#1e293b)}'+
'.ie .empty{padding:24px;text-align:center;color:var(--color-slate-400,#94a3b8);background:var(--color-slate-950,#020617);border:1px solid var(--color-slate-800,#1e293b);border-radius:16px}'+
'.ie .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px}.ie .st{background:var(--color-slate-950,#020617);border:1px solid var(--color-slate-800,#1e293b);border-radius:16px;padding:10px;text-align:center}.ie .st b{display:block;font-size:20px;font-weight:900;color:var(--color-amber-300,#fcd34d)}.ie .st small{color:var(--color-slate-400,#94a3b8);font-size:11px}'+
'.ie .hw{padding:14px;margin-bottom:12px;border-radius:18px;background:var(--color-slate-950,#020617);border:1px solid var(--color-slate-800,#1e293b)}.ie .hw h3{margin:8px 0 4px;font-size:15px;color:#fff}.ie .hw p{margin:4px 0 0;color:var(--color-slate-300,#cbd5e1);line-height:1.55;white-space:pre-wrap}'+
'.ie .meta{display:flex;justify-content:space-between;gap:8px;font-size:11px;color:var(--color-slate-400,#94a3b8);font-family:ui-monospace,monospace;flex-wrap:wrap}'+
'.ie .pill{display:inline-block;font-size:10px;font-weight:800;padding:3px 9px;border-radius:999px;margin-top:8px}.ie .p-wait{background:var(--color-amber-950,#422006);color:var(--color-amber-300,#fcd34d)}.ie .p-sent{background:var(--color-blue-950,#172554);color:var(--color-blue-300,#93c5fd)}.ie .p-ok{background:var(--color-emerald-950,#022c22);color:var(--color-emerald-300,#6ee7b7)}.ie .p-late{background:var(--color-red-950,#450a0a);color:var(--color-red-300,#fca5a5)}'+
'.ie .pdf{margin-top:10px;width:100%;padding:10px;border:0;border-radius:12px;background:var(--color-slate-800,#1e293b);color:var(--color-blue-300,#93c5fd);font-weight:700;font-size:12px;cursor:pointer;text-align:left}'+
'.ie textarea{width:100%;min-height:110px;margin-top:10px;padding:10px;border-radius:12px;background:var(--color-slate-950,#020617);border:1px solid var(--color-slate-800,#1e293b);color:#fff;font:inherit;font-size:13px;resize:vertical}'+
'.ie .btn{margin-top:8px;padding:10px 16px;border:0;border-radius:12px;background:var(--color-amber-500,#f59e0b);color:var(--color-slate-950,#1c1917);font-weight:800;font-size:12px;cursor:pointer}'+
'.ie .fb{margin-top:10px;padding:10px;border-radius:12px;background:color-mix(in oklab,var(--color-emerald-950,var(--color-emerald-950,#022c22)) 60%,transparent);border:1px solid var(--color-emerald-800,#065f46);color:var(--color-emerald-200,#a7f3d0);font-size:12px;white-space:pre-wrap}'+
'.ie .es{border:1px solid var(--color-slate-800,#1e293b);border-radius:18px;margin-bottom:10px;background:var(--color-slate-950,#020617);overflow:hidden}.ie .es summary{cursor:pointer;padding:14px;font-weight:800;font-size:14px;color:#fff;list-style:none}.ie .es summary small{display:block;color:var(--color-slate-400,#94a3b8);font-weight:500;margin-top:4px;font-size:11px}'+
'.ie .es .b{padding:0 14px 14px;line-height:1.65}.ie .es .b p{margin:0 0 10px}.ie .tip{background:color-mix(in oklab,var(--color-amber-950,#451a03) 60%,transparent);border:1px solid var(--color-amber-800,#92400e);color:var(--color-amber-200,#fde68a);border-radius:12px;padding:10px;font-size:12px}'+
'.ie .res{display:block;padding:14px;margin-bottom:10px;border-radius:16px;background:var(--color-slate-950,#020617);border:1px solid var(--color-slate-800,#1e293b);text-decoration:none}.ie .res b{display:block;font-size:14px;margin-bottom:3px;color:var(--color-blue-300,#93c5fd)}.ie .res small{color:var(--color-slate-400,#94a3b8)}'+
'.ie .err{margin-bottom:10px;padding:8px 12px;border-radius:12px;background:var(--color-red-700,#b91c1c);color:#fff;font-size:12px}';
function addCss(){if(document.getElementById('__ieCss'))return;var s=document.createElement('style');s.id='__ieCss';s.textContent=CSS;document.head.appendChild(s)}
function esc(t){var d=document.createElement('div');d.textContent=t==null?'':t;return d.innerHTML}
function clean(n){return String(n||'').replace(/ IELTS$/,'')}
function loadScript(u){return new Promise(function(ok,no){var s=document.createElement('script');s.src=u;s.onload=ok;s.onerror=function(){no(new Error('Firebase yüklənmədi'))};document.head.appendChild(s)})}
function getDb(){
  if(dbP)return dbP;
  dbP=Promise.resolve().then(function(){return window.firebase&&firebase.firestore?0:loadScript('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js').then(function(){return loadScript('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js')})}).then(function(){
    var app=null;firebase.apps.forEach(function(a){if(a.name==='ielts')app=a});
    if(!app)app=firebase.initializeApp(window.__FB__,'ielts');
    return firebase.firestore(app)});
  dbP.catch(function(){dbP=null});return dbP}

function syncUser(me){
  if(window.__ieSynced===me.id)return;window.__ieSynced=me.id;
  getDb().then(function(db){
    var doc=Object.assign({},me),pw=null;
    try{var l=JSON.parse(localStorage.getItem(UK)||'[]');for(var i=0;i<l.length;i++)if(l[i].id===me.id){doc=Object.assign({},l[i],me);if(l[i].password)pw=l[i].password}}catch(e){}
    if(pw)doc.password=pw;else delete doc.password;
    doc.track='ielts';
    return db.collection('ielts_users').doc(me.id).set(doc,{merge:true})}).catch(function(e){console.warn('IELTS sync:',e.message)})}

function pdfOpen(db,id,name){
  db.collection('quizFiles').doc(id).get().then(function(sn){
    if(!sn.exists){alert('Fayl tapılmadı');return}
    var d=sn.data(),bs=atob(d.data.split(',')[1]),ar=new Uint8Array(bs.length);
    for(var i=0;i<bs.length;i++)ar[i]=bs.charCodeAt(i);
    var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([ar],{type:'application/pdf'}));
    a.download=d.name||name||'homework.pdf';a.target='_blank';document.body.appendChild(a);a.click();a.remove()
  }).catch(function(e){alert('PDF açıla bilmədi: '+e.message)})}

function homework(root,me){
  root.innerHTML='<div class="box"><h2>📝 Homework</h2><div class="empty">Yüklənir...</div></div>';
  getDb().then(function(db){
    return Promise.all([db.collection(HW).get(),db.collection(SUB).where('studentId','==',me.id).get()]).then(function(r){
      var H=[],S={};r[0].forEach(function(d){H.push(d.data())});H.sort(function(a,b){return String(b.id).localeCompare(String(a.id))});
      r[1].forEach(function(d){var s=d.data();S[s.homeworkId]=s});
      var sent=0,sum=0,gr=0;H.forEach(function(h){var s=S[h.id];if(s){sent++;if(s.score!=null&&s.score!==''){sum+=+s.score;gr++}}});
      var out='<div class="box"><h2>📝 Homework ('+H.length+')</h2><div class="stats"><div class="st"><b>'+H.length+'</b><small>Tapşırıq</small></div><div class="st"><b>'+sent+'</b><small>Göndərilib</small></div><div class="st"><b>'+(gr?(sum/gr).toFixed(1):'–')+'</b><small>Orta bal</small></div></div>';
      if(!H.length)out+='<div class="empty">Hələ IELTS tapşırığı yoxdur.</div>';
      else out+=H.map(function(h){
        var s=S[h.id],graded=s&&s.score!=null&&s.score!=='',late=h.dueDate&&!s&&new Date(h.dueDate).getTime()+864e5<Date.now(),st;
        if(graded)st='<span class="pill p-ok">✅ Qiymətləndirildi: '+esc(s.score)+'</span>';
        else if(s)st='<span class="pill p-sent">📤 Göndərilib</span>';
        else if(late)st='<span class="pill p-late">⏰ Vaxtı keçib</span>';
        else st='<span class="pill p-wait">⏳ Gözləyir</span>';
        return '<div class="hw"><div class="meta"><span>'+esc(h.subject||'IELTS')+'</span><span>Due: '+esc(h.dueDate||'—')+'</span></div><h3>'+esc(h.title)+'</h3><p>'+esc(h.description)+'</p>'+
        (h.pdf?'<button class="pdf" data-pdf="'+esc(h.id)+'" data-n="'+esc(h.pdf)+'">📎 '+esc(h.pdf)+' — aç / yüklə</button>':'')+st+
        (s&&s.feedback?'<div class="fb">💬 Müəllim: '+esc(s.feedback)+'</div>':'')+
        (graded?'':'<textarea placeholder="Cavabınızı bura yazın...">'+esc(s?s.text:'')+'</textarea><button class="btn" data-send="'+esc(h.id)+'" data-ti="'+esc(h.title)+'">'+(s?'Yenilə':'Göndər')+'</button>')+'</div>'}).join('');
      root.innerHTML=out+'</div>';
      root.onclick=function(ev){
        var b=ev.target.closest&&ev.target.closest('button');if(!b)return;
        if(b.dataset.pdf)return pdfOpen(db,b.dataset.pdf,b.dataset.n);
        if(b.dataset.send){
          var id=b.dataset.send,t=(b.parentNode.querySelector('textarea').value||'').trim();
          if(!t){alert('Cavab boşdur');return}
          var doc={id:id+'_'+me.id,homeworkId:id,homeworkTitle:b.dataset.ti||'',studentId:me.id,studentName:clean(me.name),text:t,submittedAt:new Date().toISOString()};
          b.disabled=true;b.textContent='...';
          db.collection(SUB).doc(doc.id).set(doc,{merge:true}).then(function(){homework(root,me)}).catch(function(e){b.disabled=false;b.textContent='Göndər';alert('Göndərilmədi: '+e.message+' (Firestore Rules-u yoxlayın)')})}}
    })}).catch(function(e){root.innerHTML='<div class="box"><h2>📝 Homework</h2><div class="empty">Yüklənmədi: '+esc(e.message)+'</div></div>'})}

function list(root,title,col,render,emptyMsg){
  root.onclick=null;
  root.innerHTML='<div class="box"><h2>'+title+'</h2><div class="empty">Yüklənir...</div></div>';
  getDb().then(function(db){return db.collection(col).get()}).then(function(r){
    var A=[];r.forEach(function(d){A.push(d.data())});A.sort(function(a,b){return String(b.id).localeCompare(String(a.id))});
    root.innerHTML='<div class="box"><h2>'+title+'</h2>'+(A.length?A.map(render).join(''):'<div class="empty">'+emptyMsg+'</div>')+'</div>'
  }).catch(function(e){root.innerHTML='<div class="box"><h2>'+title+'</h2><div class="empty">Yüklənmədi: '+esc(e.message)+'</div></div>'})}
function paras(t){return String(t||'').split(/\n\s*\n|\n/).filter(function(x){return x.trim()}).map(function(p){return '<p>'+esc(p)+'</p>'}).join('')}
function essays(root){
  list(root,'✍️ Sample essays','ielts_essays',function(e){
    return '<details class="es"><summary>'+esc(e.title)+(e.kind?'<small>'+esc(e.kind)+'</small>':'')+'</summary><div class="b">'+(e.question?'<p><i>'+esc(e.question)+'</i></p>':'')+paras(e.body)+(e.tip?'<div class="tip">💡 '+esc(e.tip)+'</div>':'')+'</div></details>'},'Hələ nümunə essay əlavə olunmayıb.')}
function podcasts(root){
  list(root,'🎧 Article / Podcast','ielts_materials',function(m){
    var inner='<b>'+(m.kind==='podcast'?'🎧 ':'📰 ')+esc(m.title)+'</b>'+(m.description?'<small>'+esc(m.description)+'</small>':'');
    var u=String(m.url||'');
    return /^https?:\/\//i.test(u)?'<a class="res" target="_blank" rel="noopener" href="'+esc(u)+'">'+inner+'</a>':'<div class="res">'+inner+'</div>'},'Hələ podcast və ya məqalə əlavə olunmayıb.')}

window.__IE=function(el,me,tab){
  if(!el||!me)return;
  var t=String(tab||'hw').replace(/^ie-/,'');
  if(el.__ieT===t&&el.__ieU===me.id)return;
  el.__ieT=t;el.__ieU=me.id;
  addCss();syncUser(me);
  el.classList.add('ie');
  if(t==='es'||t==='essay')essays(el);else if(t==='pod')podcasts(el);else homework(el,me)};
})();
