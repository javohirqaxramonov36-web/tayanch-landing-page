/* =========================================================================
   ga4.js — GA4 asosiy page-view kuzatuvi (Prompt 3, QISM 0)
   -------------------------------------------------------------------------
   - Measurement ID FAQAT site-config.js (window.SITE_CONFIG.ga4MeasurementId)
     dan o'qiladi. Hech qachon qo'lda hardcoded qilinmasin.
   - Agar ID kiritilmagan bo'lsa (placeholder "BU YERGA GA4 ID QO'YILADI")
     yoki noto'g'ri formatda bo'lsa, bu skript JIMIY o'tib ketadi — sahifa
     tezligiga ta'sir qilmaydi va hech qanday xatolik chiqarmaydi.
   - Konversiya event'lari (ariza, Telegram tugmasi, kurs karta, narxlash CTA)
     BU YERDA EMAS — ular keyingi promptlarda (QISM 2) qo'shiladi.
   - Asinxron yuklash: googletagmanager script'i `async` bilan qo'shiladi,
     shuning uchun sahifa render tezligiga ta'sir qilmaydi.
   - gtag('config', id) chaqiruvi GA4'ga standart page_view ni avtomatik
     yuboradi — alohida page_view event yozish shart emas.
   ========================================================================= */
(function (global) {
    'use strict';

    /* site-config.js (bu fayldan OLDIN yuklanishi shart) SITE_CONFIG ni
       globalga qo'yadi. Mavjud emasligi holatini xavfsiz ushlab o'tamiz. */
    var cfg = global.SITE_CONFIG;
    if (!cfg || typeof cfg.isGa4Configured !== 'function' || !cfg.isGa4Configured()) {
        return; // ID yo'q yoki noto'g'ri — hech narsa qilmaymiz
    }

    var measurementId = cfg.ga4MeasurementId;

    /* Standart GA4 (gtag.js) bootstrap. dataLayer avvalroq e'lon qilinishi
       kerak; gtag.js yuklanganda navbatdagi chaqiruvlarni qayta ishlaydi. */
    global.dataLayer = global.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    global.gtag = gtag;
    gtag('js', new Date());
    gtag('config', measurementId);

    /* googletagmanager script'ini async qo'shamiz (bloklamaslik uchun). */
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    (document.head || document.documentElement).appendChild(s);
})(window);
