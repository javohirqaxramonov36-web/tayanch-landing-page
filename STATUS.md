# Tayanch — Prompt Natijalari

| Sana | Prompt va nomi | Natija | Commit |
|------|---------------|--------|--------|
| 2026-09-24 | Prompt 13 — Funksiyalarni reklama qilish | B1 Hero CTA, B2 AI demo, B3 Search, B4 Badge, B5 Breadcrumb | 26b650b |
| 2026-09-24 | Prompt 13 — Funksiyalarni reklama qilish | B1 Hero CTA, B2 AI demo, B3 Search, B4 Badge, B5 Breadcrumb | 934c8d6 |
| 2026-09-25 | Prompt 13 — Breadcrumb kengaytirish (B5) | nav.js orqali 31 ichki sahifaga avtomatik breadcrumb; courses.html singan `<main>` tuzilmasi tuzatildi (hero + statik kartalar render bo'lyapti) | 1c72b64 |
| 2026-09-25 | Prompt 13 — Founder Story (B6) | Asoschi hikoyasi: 4 karta (Sabab/Qiyinchilik/Burilish/Kelajak) + quote + CTA (index.html + styles.css) | 2bc807f |
| 2026-09-25 | Prompt 24 — Xizmatlar sahifasi | 2 ta tayyor xizmat bo'limi: "Ikkinchi Miya" (1 500 000 so'm) va "Sayt yasab berish" (2 000 000 so'm) — tavsif, "Kimga mos", "Nima beriladi", namuna izohi, CTA. CTA → 2-qadamli ariza formasi xizmat oldindan tanlangan holda ochiladi. Schema.org `Service` (2 blok), meta/OG/canonical, chap sidebar. Kurslar soniga kirmaydi (`totalCourseCount` o'zgarmadi) | 075251c |
| 2026-09-25 | Regressiya — hub sidebar offseti | `styles.css` dagi `html, body { padding: 0 !important }` (commit 72d6574) `body.hub-page{padding-left}` ni bekor qilib, 6 ta hub sahifada (ielts, sat, admission, services, ai-courses, school-lessons) kontent sidebar ostida qolgan edi — tiklandi | 369fa8a |
| 2026-09-25 | Regressiya — index.html header markup | merge 24528bd da `<header class="navbar">` + `<div class="nav-container">` ochilish teglari yo'qolgan va eski sidebar markup ochilish tegisiz qaytgan edi (sahifa tepasida to'liq kenglikdagi sidebar bloki). Prompt 13 dagi header-asosli holat tiklandi + hero'ga Xizmatlar kartasi | 2a269ae |
