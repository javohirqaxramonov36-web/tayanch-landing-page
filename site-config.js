/* =========================================================================
   site-config.js — YAGONA SOZLAMALAR MANBAI (single source of truth)
   -------------------------------------------------------------------------
   Loyihadagi barcha "qo'lda sinxronlashtiriladigan" qiymatlar FAQAT shu
   faylda yoziladi. Hech qanday HTML sahifada bu qiymatlar qayta
   yozilmasin — sahifalar ularni shu fayldan dinamik o'qiydi.

   Ishlatish:
     <script src="site-config.js"></script>   (BARCHA boshqa script'lardan OLDIN)

   API:
     window.SITE_CONFIG.totalCourseCount      -> son (hozirda 30)
     window.SITE_CONFIG.ga4MeasurementId      -> GA4 Measurement ID
     window.SITE_CONFIG.pricing               -> narxlash (Prompt 3 to'ldiradi)
     window.SITE_CONFIG.referralDiscountPercent -> referal chegirmasi (Prompt 17-A)

     window.SITE_CONFIG.getCourseCount()      -> tekshirilgan butun son
     window.SITE_CONFIG.applyCourseCounts()   -> DOM'dagi hisoblagichlarni yozish
     window.SITE_CONFIG.isGa4Configured()     -> GA4 ID haqiqatan kiritilganmi

   DOM bilan bog'lash (har qanday sahifada ishlaydi):
     <span data-course-count="all">30</span>
         -> "30" (faqat son)
     <span data-course-count-label="all">30 ta Kurslar</span>
         -> "30 ta Kurslar" (son + matn)
     <span data-course-count-text="all"
           data-course-count-template="{{count}} ta Kurslar Portali">...</span>
         -> shablon bo'yicha istalgan matn ({{count}} o'rniga son qo'yiladi)
     <script type="application/ld+json"> ... "numberOfItems": 30 ...
         -> ItemList blokidagi numberOfItems avtomatik yangilanadi

   KURS SONINI O'ZGARTIRISH TARTIBI:
     faqat shu fayldagi `totalCourseCount` qiymatini o'zgartiring — nav badge,
     hero statistika, katalog sarlavhasi, filter tab'i, footer, sitemap,
     robots.html va JSON-LD avtomatik yangilanadi.
   ========================================================================= */
(function (global) {
    'use strict';

    var GA4_PLACEHOLDER = "BU YERGA GA4 ID QO'YILADI";

    var SITE_CONFIG = {
        /* --- Tasdiqlangan yagona kurs soni (faqat shu yerda o'zgartiriladi) --- */
        /* Prompt 1/2/4: +5 yangi kurs (2 Matematika, 2 Fizika, 1 Startup) -> 30 + 5 = 35 */
        totalCourseCount: 35,

        /* --- Google Analytics 4 Measurement ID (masalan: "G-XXXXXXXXXX") --- */
        ga4MeasurementId: GA4_PLACEHOLDER,

        /* --- Narxlash: Prompt 3 bajarilgandan keyin to'ldiriladi --- */
        pricing: {},

        /* --- Referal chegirmasi (%): Prompt 17-Bosqich A'da to'ldiriladi --- */
        referralDiscountPercent: null
    };

    function getCourseCount() {
        var n = parseInt(SITE_CONFIG.totalCourseCount, 10);
        if (isNaN(n) || n < 0) {
            if (global.console && console.warn) {
                console.warn('[site-config] totalCourseCount notoʻgʻri:', SITE_CONFIG.totalCourseCount);
            }
            return 0;
        }
        return n;
    }

    function isGa4Configured() {
        var id = SITE_CONFIG.ga4MeasurementId;
        return typeof id === 'string' && id.length > 0 && id !== GA4_PLACEHOLDER &&
            /^G-[A-Z0-9]+$/i.test(id);
    }

    function setText(el, val) {
        if (el && el.textContent !== val) el.textContent = val;
    }

    /* JSON-LD ichidagi ItemList blokini ham yagona manbadan yangilash.
       Faqat "ItemList" bor bloklarga tegadi — boshqa JSON-LD'ga aralashmaydi. */
    function patchJsonLd(count) {
        var blocks = document.querySelectorAll('script[type="application/ld+json"]');
        for (var i = 0; i < blocks.length; i++) {
            var src = blocks[i].textContent;
            if (!/"@type"\s*:\s*"ItemList"/.test(src)) continue;
            var next = src
                .replace(/("numberOfItems"\s*:\s*)\d+/g, '$1' + count)
                .replace(/\d+\s+ta\s+bepul\s+kurslar\s+katalogi/g, count + ' ta bepul kurslar katalogi');
            if (next !== src) blocks[i].textContent = next;
        }
    }

    /* DOM'dagi barcha kurs-soni hisoblagichlarini to'ldirish.
       Istalgan paytda, bir necha marta chaqirish xavfsiz (idempotent). */
    function applyCourseCounts() {
        var count = getCourseCount();

        /* 1) data-course-count="all" — faqat son */
        var numeric = document.querySelectorAll('[data-course-count="all"]');
        for (var i = 0; i < numeric.length; i++) setText(numeric[i], String(count));

        /* 2) data-course-count-label="all" — "N ta Kurslar" */
        var labelled = document.querySelectorAll('[data-course-count-label="all"]');
        for (var j = 0; j < labelled.length; j++) {
            setText(labelled[j], count + ' ta Kurslar');
        }

        /* 3) data-course-count-text="all" — ixtiyoriy shablonli matn */
        var templated = document.querySelectorAll('[data-course-count-text="all"]');
        for (var k = 0; k < templated.length; k++) {
            var tpl = templated[k].getAttribute('data-course-count-template') || '{{count}}';
            setText(templated[k], tpl.replace(/\{\{count\}\}/g, String(count)));
        }

        /* 4) JSON-LD ItemList */
        patchJsonLd(count);

        document.documentElement.setAttribute('data-course-total', String(count));
        return count;
    }

    SITE_CONFIG.getCourseCount = getCourseCount;
    SITE_CONFIG.applyCourseCounts = applyCourseCounts;
    SITE_CONFIG.isGa4Configured = isGa4Configured;

    global.SITE_CONFIG = SITE_CONFIG;

    function ready() {
        try { applyCourseCounts(); } catch (e) {
            if (global.console && console.error) console.error('[site-config]', e);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ready);
    } else {
        ready();
    }
    /* Kontent keyinroq (script.js orqali) qo'shilgan taqdirda ham ishlashi uchun */
    global.addEventListener('load', ready);
})(window);
