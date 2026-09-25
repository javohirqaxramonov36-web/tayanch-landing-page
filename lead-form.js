/* ============================================================
   lead-form.js — TAYANCH qayta ishlatiladigan 2-qadamli
   ariza formasi komponenti (PROMPT 9)
   ------------------------------------------------------------
   - Barcha hub sahifalarga bitta komponent sifatida ulanishi uchun.
   - O'z-o'zidan yetarli: modal + mobil sticky CTA ni <body> ga
     qo'shadi (idempotent).
   - <form> ISHLATILMAYDI — script.js barcha <form> ga o'z submit
     handler'ini ulaydi, shuning uchun biz <div> + button ishlatamiz
     va qo'lda tekshiramiz (double-submit oldini olish).
   - Telegram'ga lead yuborish uchun modal.js dagi TELEGRAM_CONFIG
     dan foydalanadi (mavjud bo'lmasa, zaxira qiymat).
   ============================================================ */
(function (global) {
  'use strict';

  // modal.js dagi TELEGRAM_CONFIG dan foydalanamiz (mavjud bo'lmasa, zaxira).
  // typeof o'rniga try/catch: agar yuklash tartibi o'zgarsa TDZ xatosidan himoya qiladi.
  var TG;
  try { TG = TELEGRAM_CONFIG; } catch (e) { TG = undefined; }
  if (!TG || !TG.token) {
    TG = { token: '8961832617:AAELgbWLCXW5i8pBF4ZdXnKqjzT70Zfewys', chatId: '7751388515' };
  }

  var TELEGRAM_URL = 'https://api.telegram.org/bot' + TG.token + '/sendMessage';

  var DIRECTIONS = [
    { id: 'ielts',   label: 'IELTS',                 sub: 'Ingliz tili & Band 7.0+', icon: 'fa-solid fa-language',          match: /ielts/ },
    { id: 'sat',     label: 'SAT & Math',            sub: 'Digital SAT & Math Prep',  icon: 'fa-solid fa-chart-line',        match: /sat/ },
    { id: 'admission', label: 'Admission & Grant',   sub: 'Amerika & Yevropa',        icon: 'fa-solid fa-graduation-cap',    match: /admission/ },
    { id: 'ai',      label: 'AI Kurslari',           sub: 'ChatGPT, Midjourney',      icon: 'fa-solid fa-brain',             match: /ai-courses/ },
    { id: 'services', label: 'Xizmatlar',            sub: 'Second Brain & Sayt',      icon: 'fa-solid fa-briefcase',         match: /services/ },
    { id: 'school',  label: 'Maktab Darslari',       sub: 'Matematika, Fizika, EN',   icon: 'fa-solid fa-school',            match: /school-lessons/ }
  ];

  /* PROMPT 24: "Xizmatlar" yo'nalishi ichidagi tayyor xizmatlar (done-for-you) */
  var SERVICES = [
    { id: 'second-brain', label: 'Ikkinchi Miya',     sub: 'Obsidian bilim bazasi' },
    { id: 'website',      label: 'Sayt yasab berish', sub: 'Statik sayt (GitHub Pages)' }
  ];

  function currentDirectionId() {
    var path = (global.location && global.location.pathname) || '';
    for (var i = 0; i < DIRECTIONS.length; i++) {
      if (DIRECTIONS[i].match.test(path)) return DIRECTIONS[i].id;
    }
    return null;
  }

  function escapeHTML(str) {
    return String(str).replace(/[&<>'"]/g, function (tag) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[tag] || tag;
    });
  }

  function directionFromText(text) {
    text = (text || '').toLowerCase();
    if (text.indexOf('ielts') > -1) return 'ielts';
    if (text.indexOf('sat') > -1) return 'sat';
    if (text.indexOf('admission') > -1 || text.indexOf('kalkulyator') > -1 || text.indexOf('grant') > -1) return 'admission';
    if (text.indexOf('ai') > -1) return 'ai';
    if (text.indexOf('xizmat') > -1) return 'services';
    if (text.indexOf('maktab') > -1) return 'school';
    return null;
  }

  /* ---- Inject modal + sticky CTA into body (idempotent) ---- */
  function injectMarkup() {
    if (document.getElementById('lfLeadModal')) return;

    var dirButtons = DIRECTIONS.map(function (d) {
      return '' +
        '<button type="button" class="lf-dir-btn" data-dir="' + d.id + '" aria-pressed="false">' +
          '<span class="lf-dir-ico" aria-hidden="true"><i class="' + d.icon + '"></i></span>' +
          '<span class="lf-dir-txt"><h4>' + d.label + '</h4><p>' + d.sub + '</p></span>' +
        '</button>';
    }).join('');

    var serviceButtons = SERVICES.map(function (s) {
      return '' +
        '<button type="button" class="lf-svc-btn" data-service="' + s.id + '" aria-pressed="false">' +
          '<strong>' + s.label + '</strong><span>' + s.sub + '</span>' +
        '</button>';
    }).join('');

    var overlay = document.createElement('div');
    overlay.className = 'lf-overlay';
    overlay.id = 'lfLeadModal';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'lfModalTitle');
    overlay.innerHTML = '' +
      '<div class="lf-modal" role="document">' +
        '<button class="lf-close" id="lfCloseBtn" aria-label="Yopish">&times;</button>' +
        '<div id="lfFormWrap">' +
          '<span class="lf-badge"><i class="fa-solid fa-pen-to-square"></i> Tayanch\'ga Ariza</span>' +
          '<h3 id="lfModalTitle">Bepul maslahat oling</h3>' +
          '<p class="lf-sub">2 qadamda ariza qoldiring — Telegram orqali zudlik bilan bog\'lanamiz.</p>' +

          '<div class="lf-stepper" aria-hidden="false">' +
            '<div class="lf-step-dot lf-on" id="lfDot1"><span class="lf-num">1</span><span class="lf-label">Yo\'nalish</span></div>' +
            '<div class="lf-step-bar" id="lfBar"></div>' +
            '<div class="lf-step-dot" id="lfDot2"><span class="lf-num">2</span><span class="lf-label">Ma\'lumot</span></div>' +
          '</div>' +

          /* STEP 1 */
          '<div class="lf-panel lf-show" id="lfStep1">' +
            '<div class="lf-dir-grid" id="lfDirGrid">' + dirButtons + '</div>' +
            '<div class="lf-svc-wrap" id="lfServiceWrap" hidden>' +
              '<p class="lf-svc-title">Qaysi xizmat kerak?</p>' +
              '<div class="lf-svc-grid" id="lfServiceGrid">' + serviceButtons + '</div>' +
            '</div>' +
            '<button type="button" class="lf-btn lf-btn-primary" id="lfNextBtn" disabled>Davom etish</button>' +
          '</div>' +

          /* STEP 2 */
          '<div class="lf-panel" id="lfStep2">' +
            '<span class="lf-chosen" id="lfChosen"></span>' +
            '<div class="lf-field">' +
              '<label for="lfName">Ismingiz va Familiyangiz <span class="lf-req">*</span></label>' +
              '<input type="text" id="lfName" placeholder="Masalan: Jasur Rahimov" autocomplete="name">' +
              '<span class="lf-err" id="lfNameErr">To\'liq ism-familiyangizni kiriting</span>' +
            '</div>' +
            '<div class="lf-field">' +
              '<label for="lfContact">Telegram yoki telefon <span class="lf-req">*</span></label>' +
              '<input type="text" id="lfContact" placeholder="@username yoki +998 90 123 45 67" autocomplete="tel">' +
              '<span class="lf-hint">Telegram username (@bilan) yoki telefon raqamingiz</span>' +
              '<span class="lf-err" id="lfContactErr">Aloqa ma\'lumotini kiriting</span>' +
            '</div>' +
            '<div class="lf-actions">' +
              '<button type="button" class="lf-btn lf-btn-ghost" id="lfBackBtn">Orqaga</button>' +
              '<button type="button" class="lf-btn lf-btn-primary" id="lfSubmitBtn">Arizani yuborish</button>' +
            '</div>' +
          '</div>' +

          /* SUCCESS */
          '<div class="lf-panel" id="lfSuccess">' +
            '<div class="lf-success">' +
              '<div class="lf-check"><i class="fa-solid fa-circle-check"></i></div>' +
              '<h3>Arizangiz qabul qilindi!</h3>' +
              '<p>Tez orada Telegram orqali siz bilan bog\'lanamiz.</p>' +
              '<a href="https://t.me/tayanch_go" target="_blank" rel="noopener noreferrer" class="lf-tg"><i class="fa-brands fa-telegram"></i> Telegram kanalimiz</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    // Mobile sticky CTA
    var sticky = document.createElement('div');
    sticky.className = 'lf-sticky-cta';
    sticky.id = 'lfStickyCta';
    sticky.innerHTML = '' +
      '<div class="lf-sticky-txt"><strong>Bepul maslahat oling</strong><span>2 daqiqada ariza qoldiring</span></div>' +
      '<button type="button" class="lf-sticky-btn" id="lfStickyBtn">Arizani qoldirish</button>';
    document.body.appendChild(sticky);
    document.body.classList.add('lf-has-sticky');

    wireModal();
  }

  var state = { step: 1, direction: null, service: null };

  /* PROMPT 24: xizmat sub-tanlovini ko'rsatish/yashirish + Next tugmasini yangilash */
  function syncService() {
    var wrap = document.getElementById('lfServiceWrap');
    if (!wrap) return;
    var isServices = state.direction === 'services';
    wrap.hidden = !isServices;
    if (!isServices) state.service = null;
    var grid = document.getElementById('lfServiceGrid');
    if (grid) {
      var btns = grid.querySelectorAll('.lf-svc-btn');
      for (var i = 0; i < btns.length; i++) {
        var on = btns[i].getAttribute('data-service') === state.service;
        btns[i].classList.toggle('lf-selected', on);
        btns[i].setAttribute('aria-pressed', on ? 'true' : 'false');
      }
    }
    var next = document.getElementById('lfNextBtn');
    if (next) next.disabled = !state.direction || (isServices && !state.service);
  }

  function showStep(n) {
    state.step = n;
    var s1 = document.getElementById('lfStep1');
    var s2 = document.getElementById('lfStep2');
    var succ = document.getElementById('lfSuccess');
    var dot1 = document.getElementById('lfDot1');
    var dot2 = document.getElementById('lfDot2');
    var bar = document.getElementById('lfBar');
    if (n === 1) {
      s1.classList.add('lf-show'); s2.classList.remove('lf-show'); succ.classList.remove('lf-show');
      dot1.className = 'lf-step-dot lf-on'; dot2.className = 'lf-step-dot'; bar.className = 'lf-step-bar';
    } else if (n === 2) {
      s1.classList.remove('lf-show'); s2.classList.add('lf-show'); succ.classList.remove('lf-show');
      dot1.className = 'lf-step-dot lf-done'; dot2.className = 'lf-step-dot lf-on'; bar.className = 'lf-step-bar lf-on';
      var chosen = document.getElementById('lfChosen');
      var d = DIRECTIONS.filter(function (x) { return x.id === state.direction; })[0];
      var s = SERVICES.filter(function (x) { return x.id === state.service; })[0];
      if (chosen && d) chosen.textContent = 'Tanlangan yo\'nalish: ' + d.label + (s ? ' — ' + s.label : '');
      var nameInput = document.getElementById('lfName');
      if (nameInput) setTimeout(function () { nameInput.focus(); }, 120);
    }
  }

  function openForm(presetDir, presetService) {
    injectMarkupIfNeeded();
    var overlay = document.getElementById('lfLeadModal');
    var succ = document.getElementById('lfSuccess');
    if (succ) succ.classList.remove('lf-show');
    // reset
    state.direction = presetDir || currentDirectionId();
    state.service = presetService || null;
    var grid = document.getElementById('lfDirGrid');
    if (grid) {
      var btns = grid.querySelectorAll('.lf-dir-btn');
      for (var i = 0; i < btns.length; i++) {
        var on = (btns[i].getAttribute('data-dir') === state.direction);
        btns[i].classList.toggle('lf-selected', on);
        btns[i].setAttribute('aria-pressed', on ? 'true' : 'false');
      }
    }
    syncService();
    showStep(1);
    overlay.classList.add('lf-active');
    document.body.style.overflow = 'hidden';
  }

  function closeForm() {
    var overlay = document.getElementById('lfLeadModal');
    if (overlay) overlay.classList.remove('lf-active');
    document.body.style.overflow = '';
  }

  function formatPhone(raw) {
    var digits = raw.replace(/\D/g, '');
    if (!digits) return raw;
    if (!digits.startsWith('998')) digits = '998' + digits;
    var f = '+998';
    if (digits.length > 3) f += ' ' + digits.substring(3, 5);
    if (digits.length > 5) f += ' ' + digits.substring(5, 8);
    if (digits.length > 8) f += ' ' + digits.substring(8, 10);
    if (digits.length > 10) f += ' ' + digits.substring(10, 12);
    return f;
  }

  function submitLead() {
    var nameEl = document.getElementById('lfName');
    var contactEl = document.getElementById('lfContact');
    var nameErr = document.getElementById('lfNameErr');
    var contactErr = document.getElementById('lfContactErr');
    var name = nameEl ? nameEl.value.trim() : '';
    var contact = contactEl ? contactEl.value.trim() : '';

    var ok = true;
    if (name.length < 3) { if (nameErr) nameErr.style.display = 'block'; ok = false; }
    else if (nameErr) nameErr.style.display = 'none';

    var isPhone = /^[\d\s+()\-]+$/.test(contact) && contact.replace(/\D/g, '').length >= 7;
    if (!contact || contact.length < 4) { if (contactErr) contactErr.style.display = 'block'; ok = false; }
    else if (contactErr) contactErr.style.display = 'none';

    if (!ok) return;

    var finalContact = isPhone ? formatPhone(contact) : (contact.charAt(0) === '@' ? contact : '@' + contact);
    var dir = DIRECTIONS.filter(function (x) { return x.id === state.direction; })[0];
    var dirLabel = dir ? dir.label : 'Umumiy';
    var svc = SERVICES.filter(function (x) { return x.id === state.service; })[0];
    var svcLabel = svc ? svc.label : '';

    var btn = document.getElementById('lfSubmitBtn');
    if (btn) { btn.disabled = true; btn.textContent = 'Yuborilmoqda...'; }

    var text = '🎯 <b>Yangi ariza! (Tayanch — 2-qadamli forma)</b>\n\n' +
      '👤 <b>Ism:</b> ' + escapeHTML(name) + '\n' +
      '📞 <b>Aloqa:</b> ' + escapeHTML(finalContact) + '\n' +
      '📚 <b>Yo\'nalish:</b> ' + escapeHTML(dirLabel) + '\n' +
      (svcLabel ? '🧩 <b>Xizmat:</b> ' + escapeHTML(svcLabel) + '\n' : '') +
      '📅 <b>Vaqt:</b> ' + new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' });

    fetch(TELEGRAM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG.chatId, text: text, parse_mode: 'HTML' })
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.ok) {
          if (nameEl) nameEl.value = '';
          if (contactEl) contactEl.value = '';
          var succ = document.getElementById('lfSuccess');
          var s2 = document.getElementById('lfStep2');
          if (s2) s2.classList.remove('lf-show');
          if (succ) succ.classList.add('lf-show');
          setTimeout(closeForm, 3200);
        } else {
          throw new Error((data && data.description) || 'Xatolik');
        }
      })
      .catch(function () {
        if (contactErr) { contactErr.textContent = 'Yuborishda xatolik. Iltimos, Telegram orqali yozing.'; contactErr.style.display = 'block'; }
      })
      .finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = 'Arizani yuborish'; }
      });
  }

  function wireModal() {
    var overlay = document.getElementById('lfLeadModal');
    if (!overlay) return;

    var closeBtn = document.getElementById('lfCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeForm);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeForm(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('lf-active')) closeForm();
    });

    var grid = document.getElementById('lfDirGrid');
    if (grid) {
      grid.addEventListener('click', function (e) {
        var b = e.target.closest('.lf-dir-btn');
        if (!b) return;
        var id = b.getAttribute('data-dir');
        state.direction = id;
        var all = grid.querySelectorAll('.lf-dir-btn');
        for (var i = 0; i < all.length; i++) {
          var on = all[i].getAttribute('data-dir') === id;
          all[i].classList.toggle('lf-selected', on);
          all[i].setAttribute('aria-pressed', on ? 'true' : 'false');
        }
        syncService();
      });
    }

    var svcGrid = document.getElementById('lfServiceGrid');
    if (svcGrid) {
      svcGrid.addEventListener('click', function (e) {
        var b = e.target.closest('.lf-svc-btn');
        if (!b) return;
        state.service = b.getAttribute('data-service');
        syncService();
      });
    }

    var nextBtn = document.getElementById('lfNextBtn');
    if (nextBtn) nextBtn.addEventListener('click', function () {
      if (!state.direction) return;
      showStep(2);
    });

    var backBtn = document.getElementById('lfBackBtn');
    if (backBtn) backBtn.addEventListener('click', function () { showStep(1); });

    var submitBtn = document.getElementById('lfSubmitBtn');
    if (submitBtn) submitBtn.addEventListener('click', submitLead);

    // Enter key on step 2 inputs -> submit
    var step2 = document.getElementById('lfStep2');
    if (step2) {
      step2.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); submitLead(); }
      });
    }

    var stickyBtn = document.getElementById('lfStickyBtn');
    if (stickyBtn) stickyBtn.addEventListener('click', function () { openForm(); });
  }

  function injectMarkupIfNeeded() {
    if (!document.getElementById('lfLeadModal')) injectMarkup();
  }

  /* ---- Global triggers (idempotent) ---- */
  function bindTriggers() {
    // 1) existing .open-lead-modal-btn (ielts / admission hubs — currently dead)
    // 2) [data-open-lead] attribute
    // 3) any hub CTA whose text is clearly "apply" (Ariza Qoldirish / Yozilish) -> open in-site form
    var applyRe = /ariza qoldirish|yozilish|ro'yxat/i;

    var triggers = document.querySelectorAll('.open-lead-modal-btn, [data-open-lead]');
    triggers.forEach(function (el) {
      if (el.getAttribute('data-lf-bound')) return;
      el.setAttribute('data-lf-bound', '1');
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var preset = el.getAttribute('data-open-lead') || directionFromText(el.getAttribute('data-course') || '');
        var svc = el.getAttribute('data-service') || null;
        openForm(preset, svc);
      });
    });

    var allBtns = document.querySelectorAll('a.btn, button.btn');
    allBtns.forEach(function (el) {
      if (el.getAttribute('data-lf-bound')) return;
      var txt = (el.textContent || '').trim();
      if (applyRe.test(txt) && !/telegram'da/i.test(txt)) {
        el.setAttribute('data-lf-bound', '1');
        el.addEventListener('click', function (e) {
          e.preventDefault();
          openForm(directionFromText(txt));
        });
      }
    });
  }

  // Expose for manual use / other scripts
  global.openLeadForm = openForm;
  global.closeLeadForm = closeForm;

  function init() {
    injectMarkup();
    bindTriggers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);
