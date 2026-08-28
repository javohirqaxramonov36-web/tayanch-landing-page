/* tayanch kill-switch SW
 * Maqsad: foydalanuvchi brauzerida qolgan eski (tayanch-v2) Service Worker'ni
 * o'zini va barcha keshlarni o'chirish orqali "o'ldirish".
 * Bu faqat eski SW tomonidan keshlangan buqli sahifani to'xtatish uchun kerak;
 * yangi sahifalar SW ro'yxatdan o'tkazilmaydi (index.html da register chaqiruvi yo'q),
 * shuning uchun sayt kelajakda SW orqali keshlanmaydi.
 */
self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil((async function () {
    // 1) Barcha keshlarni tozalash
    var keys = await caches.keys();
    await Promise.all(keys.map(function (k) { return caches.delete(k); }));
    // 2) Bu (va boshqa) SW'larni ro'yxatdan o'chirish
    try { await self.registration.unregister(); } catch (e) {}
    // 3) Ochiq sahifalarni tarmoqdan yangidan yukashga majburlash (toza sahifa)
    var clients = await self.clients.matchAll({ includeUncontrolled: true });
    clients.forEach(function (c) {
      try { c.navigate(c.url); } catch (e) {}
    });
  })());
});

// Hech narsani keshlamaslik — har doim tarmoqdan berish
self.addEventListener('fetch', function (event) {
  event.respondWith(fetch(event.request).catch(function () { return fetch(event.request); }));
});
