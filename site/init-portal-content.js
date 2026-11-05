// English Learning Portal Content & Quest Initializer
(function() {
  try {
    // 1. Ensure Library has all 8 complete English books
    var localLib = localStorage.getItem('elp_library_v3');
    var libItems = localLib ? JSON.parse(localLib) : [];
    if (!libItems || libItems.length === 0) {
      fetch('/library-data.json')
        .then(function(res) { return res.json(); })
        .then(function(books) {
          if (Array.isArray(books) && books.length > 0) {
            localStorage.setItem('elp_library_v3', JSON.stringify(books));
            console.log('[Portal] Seeded 8 English library books to local storage');
          }
        })
        .catch(function(err) { console.warn('[Portal] Library seed fetch error:', err); });
    }

    // 2. Ensure Vocabulary has the expanded quest words
    var localVocab = localStorage.getItem('elp_vocabulary_v3');
    var vocabItems = localVocab ? JSON.parse(localVocab) : [];
    if (!vocabItems || vocabItems.length < 20) {
      fetch('/vocabulary-data.json')
        .then(function(res) { return res.json(); })
        .then(function(words) {
          if (Array.isArray(words) && words.length > 0) {
            localStorage.setItem('elp_vocabulary_v3', JSON.stringify(words));
            console.log('[Portal] Seeded 40+ quest vocabulary words to local storage');
          }
        })
        .catch(function(err) { console.warn('[Portal] Vocab seed fetch error:', err); });
    }

    // 3. Official Writing Tasks Cache
    fetch('/official-writing.json')
      .then(function(res) { return res.json(); })
      .then(function(tasks) {
        if (Array.isArray(tasks) && tasks.length > 0) {
          window.__officialWritingTasks = tasks;
          localStorage.setItem('elp_writing_v3', JSON.stringify(tasks));
        }
      })
      .catch(function(err) { console.warn('[Portal] Writing seed error:', err); });

    // 4. Official Grammar Points Cache
    fetch('/official-grammar.json')
      .then(function(res) { return res.json(); })
      .then(function(g) {
        if (Array.isArray(g) && g.length > 0) {
          window.__officialGrammar = g;
          localStorage.setItem('elp_grammar_v3', JSON.stringify(g));
        }
      })
      .catch(function(err) { console.warn('[Portal] Grammar seed error:', err); });

    // 5. Official Exams Cache
    fetch('/official-exams.json')
      .then(function(res) { return res.json(); })
      .then(function(ex) {
        if (Array.isArray(ex) && ex.length > 0) {
          window.__officialExams = ex;
          localStorage.setItem('elp_exams_v3', JSON.stringify(ex));
        }
      })
      .catch(function(err) { console.warn('[Portal] Exams seed error:', err); });

    // 6. Direct Click Interceptor for Grammar, Reading, Listening, Quizzes & Writing
    // When the user clicks any Grammar button/card or other skill tabs, navigate straight to tests.html with that tab open!
    document.addEventListener('click', function(e) {
      var el = e.target.closest('button, a, [role="button"], div.group');
      if (!el) return;

      var text = (el.textContent || '').trim();

      // Grammar button, card or tab
      if (
        text === '✏️ Grammar' ||
        text === 'Grammar' ||
        text.indexOf('Grammar Lessons') !== -1 ||
        text.indexOf('Grammar Practice') !== -1 ||
        text.indexOf('Qrammatika Testləri') !== -1 ||
        text.indexOf('Start Grammar') !== -1 ||
        el.getAttribute('data-tab') === 'grammar'
      ) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = '/tests.html?tab=grammar';
        return;
      }

      // Reading button or tab
      if (text === '📖 Reading' || text.indexOf('Reading Practice') !== -1 || text.indexOf('Oxu Testləri') !== -1) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = '/tests.html?tab=reading';
        return;
      }

      // Listening button or tab
      if (text === '🎧 Listening' || text.indexOf('Listening Practice') !== -1 || text.indexOf('Dinləmə Testləri') !== -1) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = '/tests.html?tab=listening';
        return;
      }

      // Writing button or tab
      if (text === '✍️ Writing' || text.indexOf('Writing Lab') !== -1 || text.indexOf('Yazı Testləri') !== -1) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = '/tests.html?tab=writing';
        return;
      }

      // Quizzes & Exams button or tab
      if (text === '🎯 Quizzes' || text.indexOf('Official Exams') !== -1 || text.indexOf('Rəsmi İmtahanlar') !== -1) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = '/tests.html?tab=exams';
        return;
      }
    }, true);

    // Tests Portal buttons removed: Grammar/Reading/Listening/Writing/Exams buttons open tests.html directly (see step 6)
    function removePortalButtons(){document.querySelectorAll('.elp-tests-nav-item,#elp-tests-launcher').forEach(function(n){n.remove();});}
    window.addEventListener('DOMContentLoaded',function(){removePortalButtons();new MutationObserver(removePortalButtons).observe(document.body,{childList:true,subtree:true});});

  } catch (e) {
    console.error('[Portal] Init error:', e);
  }
})();

// IELTS students go to their own page
(function(){function chk(){try{if(location.pathname==='/ielts.html')return;var u=JSON.parse(localStorage.getItem('elp_current_user_session_v3')||'null');if(u&&u.role==='student'&&(u.track==='ielts'||/ IELTS$/.test(u.name||'')))void 0}catch(e){}}chk();setInterval(chk,600)})();

;(function(){function b(){try{var u=JSON.parse(localStorage.getItem('elp_current_user_session_v3')||'null'),x=document.getElementById('__ieBtn'),ok=u&&(u.role==='teacher'||u.role==='admin');if(ok&&!x){x=document.createElement('a');x.id='__ieBtn';x.href='/ielts-teacher.html';x.textContent='\uD83C\uDFAF IELTS Homework';x.style.cssText='position:fixed;right:14px;bottom:14px;z-index:90;background:#f59e0b;color:#1c1917;font:800 12px system-ui,sans-serif;padding:10px 14px;border-radius:999px;text-decoration:none;box-shadow:0 4px 14px #0008';document.body.appendChild(x)}else if(!ok&&x)x.remove()}catch(e){}}setInterval(b,1000)})();


;(function(){var dp=null;function hide(){var x=document.getElementById('__pwaBtn');if(x)x.remove()}
window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();dp=e;if(document.getElementById('__pwaBtn'))return;var b=document.createElement('button');b.id='__pwaBtn';b.textContent='\uD83D\uDCF2 Tətbiqi quraşdır';b.style.cssText='position:fixed;left:50%;transform:translateX(-50%);bottom:16px;z-index:95;background:#f59e0b;color:#1c1917;font:800 13px system-ui,sans-serif;padding:11px 18px;border:0;border-radius:999px;cursor:pointer;box-shadow:0 4px 14px #0008';b.onclick=function(){if(!dp)return;dp.prompt();dp.userChoice.then(function(){dp=null;hide()})};document.body.appendChild(b);setTimeout(hide,20000)});
window.addEventListener('appinstalled',hide)})();
