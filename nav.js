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

  function pageKey() {
    var p = (global.location.pathname || '').split('/').pop();
    if (!p) p = 'index.html';
    return p;
  }

  function init() {
    var body = document.body;
    if (!body) return;

    var key = pageKey();
    if (HUB_PAGES.indexOf(key) !== -1) body.classList.add('hub-page');

    var sidebar = document.getElementById('globalSidebar');
    var toggle = document.getElementById('sidebarToggle');
    var backdrop = document.getElementById('sidebarBackdrop');
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
