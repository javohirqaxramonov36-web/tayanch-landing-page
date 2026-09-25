/* =========================================================================
   nav.js — GLOBAL SIDEBAR CONTROLLER (Prompt 8)
   -------------------------------------------------------------------------
   • Hamburger toggle (mobil + desktop content pages)
   • Backdrop / Esc yopish
   • Aktiv link — URL manzilidan avtomatik aniqlanadi (body class/markup
     o'zgartirish shart emas)
   • Hub sahifalar (body.hub-page) — desktopda doimiy chap sidebar
   ========================================================================= */
(function (global) {
  'use strict';

  /* Hub sahifalar: desktopda doimiy sidebar ko'rsatiladi */
  var HUB_PAGES = [
    'index.html', 'ielts.html', 'sat.html', 'admission.html',
    'services.html', 'ai-courses.html', 'school-lessons.html', ''
  ];

  /* Kontent sahifalarni ular tegishli bo'lgan hub linkiga mapping qilish */
  var PAGE_TO_NAV = {
    'courses.html': 'courses.html',
    'sat-dsat.html': 'sat.html',
    'sat-mock.html': 'sat.html',
    'general-english-beginner.html': 'ielts.html',
    'admission-essay-personal-statement.html': 'admission.html',
    'personal-statement.html': 'admission.html',
    'sitemap.html': 'sitemap.html',
    'robots.html': 'robots.html'
  };

  /* Ichki sahifalar uchun breadcrumb nomlari (P13-B5) */
  var PAGE_TITLES = {
    'admission-essay-personal-statement.html': 'Personal Statement',
    'admission.html': 'Admission & Grant',
    'ai-academic-research.html': 'AI: Academic Research',
    'ai-automation-workflows.html': 'AI: Automation',
    'ai-coding-assistant.html': 'AI: Coding Assistant',
    'ai-content-creation.html': 'AI: Content Creation',
    'ai-courses.html': 'AI Kurslar',
    'ai-data-analysis.html': 'AI: Data Analysis',
    'ai-for-students.html': 'AI: Students',
    'ai-hub.html': "AI yo'nalishi",
    'ai-midjourney-visual.html': 'AI: Midjourney',
    'ai-practical-productivity.html': 'Amaliy AI',
    'ai-python-foundations.html': 'Python + AI',
    'courses.html': 'Kurslar',
    'documents.html': 'Mening hujjatlarim',
    'general-english-beginner.html': 'General English',
    'ielts-listening.html': 'IELTS Listening',
    'ielts-reading.html': 'IELTS Reading',
    'ielts-speaking.html': 'IELTS Speaking',
    'ielts-writing-task2.html': 'IELTS Writing Task 2',
    'ielts.html': 'IELTS',
    'personal-statement.html': 'Personal Statement',
    'results.html': 'Natijalar',
    'robots.html': 'Robots',
    'sat-dsat.html': 'Digital SAT',
    'sat-mock.html': 'SAT Mock',
    'sat-strategy.html': 'SAT Strategiyasi',
    'sat.html': 'SAT',
    'school-lessons.html': 'Maktab darslari',
    'services.html': 'Xizmatlar',
    'sitemap.html': 'Sitemap',
    'support.html': "Qo'llab-quvvatlash",
    'xp-store.html': "XP Do'koni"
  };

  /* P13-B5: Breadcrumb barcha ichki sahifalarga avtomatik inject qilinadi */
  function injectBreadcrumb() {
    var main = document.querySelector('main');
    if (!main) return;
    var current = (global.location.pathname || '').split('/').pop().toLowerCase();
    if (!current || current === 'index.html') return;
    var container = main.querySelector('.container') || main;
    if (container.querySelector('.breadcrumb')) return; // allaqachon mavjud (statik)
    var label = PAGE_TITLES[current];
    if (!label) {
      var h1 = main.querySelector('h1');
      label = h1 ? h1.textContent.trim() : (document.title || current);
    }
    var nav = document.createElement('nav');
    nav.className = 'breadcrumb';
    nav.setAttribute('aria-label', "Sahifa yo'li");
    var a = document.createElement('a');
    a.href = 'index.html';
    a.innerHTML = '<i class="fa-solid fa-house"></i> Bosh sahifa';
    var sep = document.createElement('span');
    sep.className = 'breadcrumb-sep';
    sep.textContent = '/';
    var cur = document.createElement('span');
    cur.className = 'breadcrumb-current';
    cur.textContent = label;
    nav.appendChild(a);
    nav.appendChild(sep);
    nav.appendChild(cur);
    container.insertBefore(nav, container.firstChild);
  }

  function pageKey() {
    var p = (global.location.pathname || '').split('/').pop();
    if (!p) p = 'index.html';
    return p;
  }

  function init() {
    var body = document.body;
    if (!body) return;

    var key = pageKey();

    var sidebar = document.getElementById('globalSidebar');
    var toggle = document.getElementById('sidebarToggle');
    var backdrop = document.getElementById('sidebarBackdrop');

    /* Hub sahifada doimiy sidebar faqat sidebar markup mavjud bo'lsa qo'shiladi */
    if (HUB_PAGES.indexOf(key) !== -1 && sidebar) body.classList.add('hub-page');

    /* P13-B5: breadcrumb barcha ichki sahifalarga avtomatik qo'shiladi */
    injectBreadcrumb();

    if (!sidebar || !toggle) return;

    var lastFocus = null;

    function open() {
      lastFocus = document.activeElement;
      body.classList.add('sidebar-open');
      body.style.overflow = 'hidden';
      toggle.setAttribute('aria-expanded', 'true');
    }
    function close() {
      body.classList.remove('sidebar-open');
      body.style.overflow = '';
      toggle.setAttribute('aria-expanded', 'false');
      if (lastFocus && typeof lastFocus.focus === 'function') {
        try { lastFocus.focus(); } catch (e) {}
      }
    }
    function isOpen() { return body.classList.contains('sidebar-open'); }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      isOpen() ? close() : open();
    });
    if (backdrop) backdrop.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) close();
    });
    /* Ichki link bosilganda (mobil) yopilsin */
    sidebar.addEventListener('click', function (e) {
      if (e.target.closest('a.sidebar-link')) close();
    });

    /* Aktiv link */
    var links = sidebar.querySelectorAll('.sidebar-link[data-nav]');
    for (var i = 0; i < links.length; i++) links[i].classList.remove('active');

    var navKey = PAGE_TO_NAV[key] || key;
    var active = sidebar.querySelector('.sidebar-link[data-nav="' + navKey + '"]');
    if (!active && key === 'index.html') {
      active = sidebar.querySelector('.sidebar-link[data-nav="index.html"]');
    }
    if (active) active.classList.add('active');
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})(window);
