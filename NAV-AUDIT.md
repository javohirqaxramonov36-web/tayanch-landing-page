# NAV-AUDIT — navigatsiya ro'yxatlari auditi (Prompt 16)

**Sana:** 2026-09-26
**Branch:** `prompt-16-mobile-nav-toc`
**Kontekst:** Prompt 16 — "Mobil hamburger menyuni mundarija darajasiga olib chiqish".
Bu hujjat promptning **0-bandi** (barcha nav ro'yxatlarini audit qilish) natijasidir.

---

## 1. Topilgan nav ro'yxatlari (o'zgarishdan OLDIN)

Saytda **7 ta mustaqil, qo'lda sinxronlanadigan** nav ro'yxati bor edi:

| # | Ro'yxat | Fayl(lar) | Elementlar | Muammo |
|---|---------|-----------|-----------|--------|
| 1 | `global-sidebar` (desktop doimiy sidebar + ichki sahifalarda mobil drawer) | **27 fayl**, `data-nav="trust"` bo'lgan har bir sahifa | 17–21 | **6 xil variantga bo'linib ketgan** (pastga qarang) |
| 2 | `index.html` desktop `nav-links` kapsulasi | `index.html` | 3 | Kurslar / Natijalar / Telegram |
| 3 | **`index.html` `mobile-drawer`** | `index.html` | 10 + CTA | ← **Prompt 16 ning asosiy nishoni**: guruhlar yo'q, ikonkalar aralash, `↗` yo'q, active state yo'q, buzuq `#calculator` |
| 4 | `index.html` `footer-nav` | `index.html` | 15 | buzuq `#calculator`; "SAT Hub" / "English Hub" nomlash |
| 5 | Hub sahifalar `footer-nav` | `admission`, `ai-courses`, `ielts`, `sat`, `school-lessons` | 10 | bir xil ✔ (faqat nomlash: "Barcha kurslar") |
| 6 | Kichik `nav-links` kapsulalari | `courses`, `robots`, `sitemap`, `sat-mock` | 3–4 | **4 ta fayl, 4 xil ro'yxat**; `sat-mock.html` da yorliq/href mos emas |
| 7 | `sat-dsat.html` `nav-menu` | `sat-dsat.html` | 4 | izchil ✔ ("Kurslar Katalogi", "Digital SAT Hub") |

### 1.1. `global-sidebar` ning 6 ta varianti (asosiy drift)

| Variant | Fayllar | `data-nav` soni | Farqi |
|---------|---------|-----------------|-------|
| A | 11 (barcha `ai-*` + `sitemap.html`) | 18 | `AI Amaliy Dars` bor; **IELTS 4 skill YO'Q**; `sat-strategy` YO'Q |
| B | 7 (`ielts*` 5 ta, `news.html`, `services.html`) | 21 | IELTS 4 skill bor; `ai-practical` YO'Q; `sat-strategy` YO'Q |
| C | 5 (`admission-essay-*`, `courses.html`, `general-english-*`, `robots.html`, `sat-dsat.html`) | 17 | **badge "30"** (35 emas!); IELTS skill YO'Q; `sat-strategy` YO'Q |
| D | 2 (`admission.html`, `school-lessons.html`) | 17 | C bilan bir xil ro'yxat, boshqa bo'shliq |
| E | 1 (`sat-strategy.html`) | 19 | `data-page-node-id` atributlari qolgan (dizayn-tool eksporti) |
| F | 1 (`sat.html`) | 18 | `SAT Strategiya` bor |

**Ya'ni:** `sat.html` da "SAT Strategiya" havolasi ko'rinadi, `courses.html` da ko'rinmaydi;
`ielts.html` da 4 ta IELTS skill havolasi bor, `sat.html` da yo'q; `courses.html` da badge **30**
deb yozilgan (haqiqiy qiymat 35).

### 1.2. Nomlash nomuvofiqligi (promptda aytilgan aniq holat tasdiqlandi)

| Maqsad | Turli yorliqlar |
|--------|-----------------|
| `sat-dsat.html` | "Digital SAT Hub" (sidebar, sat-dsat nav-menu) · "SAT Hub" (index drawer + footer) |
| `sat-mock.html` | **"Digital SAT Hub"** (sat-mock kapsulasi — noto'g'ri!) · "SAT Mock Test" (sidebar) |
| `general-english-beginner.html` | "English Hub" · "General English" |
| `sitemap.html` | "Sitemap" · "Vizual Sitemap" · "Sayt xaritasi" · "Sitemap (Xarita)" |
| `courses.html` | "Kurslar" · "Barcha kurslar" · "Kurslar Katalogi" |

### 1.3. Buzuq havolalar (topildi va tuzatildi)

| Fayl | Havola | Muammo | Tuzatish |
|------|--------|--------|----------|
| `index.html` (drawer) | `#calculator` | `id="calculator"` index.html da **yo'q** — Grant kalkulyatori Prompt 8 da `admission.html` ga ko'chirilgan | → `admission.html#calculator` |
| `index.html` (footer) | `#calculator` | yuqoridagi bilan bir xil | → `admission.html#calculator` |
| `ielts.html` | `#quiz` | sahifada `id="quiz"` yo'q (mavjud: `placement-quiz`) | → `#placement-quiz` |

---

## 2. Nima o'zgardi (bu branch'da)

1. **`index.html` mobil drawer** to'liq qayta qurildi — 5 guruhli mundarija:
   `ASOSIY` / `YO'NALISHLAR` / `KURSLAR` / `VOSITALAR` / `ISHONCH`.
   - Har bir bandda izchil ikonka (aralash holat yo'q).
   - Sahifa havolasi `→`, ichki-scroll havolasi `↓`, tashqi havola (Telegram) `↗` bilan farqlanadi.
   - Joriy sahifa `aria-current="page"` + `.is-active`; ichki bo'limlar scroll-spy orqali `.active`.
   - `Kurslar` badge'i `site-config.js` dan (`data-course-count="all"`) — **35**.
   - A11y: `Esc` bilan yopish, toggle'da `aria-expanded`, `role="group"` + `aria-labelledby`,
     `:focus-visible` outline.
2. **27 ta sahifadagi `global-sidebar`** bitta kanonik variantga keltirildi — endi **1 xil**
   (ilgari 6 xil). Kanonik ro'yxat = barcha variantlar **birlashmasi** (23 havola):
   - `sat-strategy.html` — 25 sahifaga qo'shildi
   - `ai-practical-productivity.html` — 16 sahifaga qo'shildi
   - IELTS 4 skill (Writing/Listening/Reading/Speaking) — 19 sahifaga qo'shildi
   - Badge `30` → `35` (5 faylda)
   - `sat-strategy.html` dagi ortiqcha `data-page-node-id` atributlari olib tashlandi
   - Guruh nomi `Vositalar` → `Darslar va vositalar` (guruhda dars sahifalari ko'p)
   - `Robots` ikonkasi `fa-robot` → `fa-file-code` (AI Kurslar bilan takrorlanmasin)
3. **4 ta kichik kapsula** (`courses`, `robots`, `sitemap`, `sat-mock`) bitta kanonik ro'yxatga
   keltirildi: `Bosh sahifa · Kurslar · English Hub · SAT Hub · Sitemap`
   (`sat-mock.html` dagi noto'g'ri "Digital SAT Hub" yorlig'i ham shu bilan tuzatildi).
4. **Buzuq havolalar** (1.3-jadval) tuzatildi.
5. **`script.js`** — drawer uchun `Esc` / `aria-expanded` / scroll-spy + UZ/EN i18n kalitlari
   (26 ta yangi kalit, `translations.uz` va `translations.en` da to'liq).
6. **`styles.css`** — `.drawer-group`, `.drawer-group-title`, `.drawer-link` (flex + ikonka),
   `.drawer-link.active`, `.drawer-arrow`, `.drawer-ext`, `.drawer-cta`, `:focus-visible`,
   `overflow-y: auto` (inline `<style>` yozilmadi).

---

## 3. TAKLIF — bitta umumiy manbaga birlashtirish (katta refaktoring, KEYINGI ISH)

Promptning 0-bandi "bir nechta mustaqil ro'yxat topilsa — ularni BITTA umumiy manbaga
birlashtirishni ko'rib chiq; katta refaktoring bo'lsa, taklif sifatida yoz" deydi.
Hozirgi holat — **kompromiss**: 27 ta nusxa bitta kanonik matnga tenglashtirildi, lekin
texnik jihatdan hali ham **27 ta nusxa**. Har bir yangi sahifa yoki yangi havola yana
qo'lda sinxronlashni talab qiladi — drift yana paydo bo'lishi mumkin.

**Tavsiya etiladigan yechim:** `nav-data.js` — yagona JS manba.

```js
// nav-data.js  (yangi fayl)
window.TAYANCH_NAV = {
  groups: [
    { title: 'Asosiy', items: [
      { href: 'index.html',        label: 'Bosh sahifa',  icon: 'fa-house',  nav: 'index.html' },
      { href: 'index.html#mission', label: 'Nega Tayanch', icon: 'fa-star',   nav: 'mission', type: 'anchor' },
      { href: 'courses.html',      label: 'Kurslar',      icon: 'fa-book',   nav: 'courses.html', badge: 'courseCount' }
    ]},
    // ... Yo'nalishlar / Darslar va vositalar / Ishonch
  ],
  cta: [ /* Telegram havolalari */ ]
};
```

`nav.js` shu massivdan sidebar HTML'ini quradi; 27 ta HTML fayldagi inline `<aside>` esa
bo'sh konteynerga (`<aside class="global-sidebar" id="globalSidebar"></aside>`) aylanadi.

**Foydasi:** yangi sahifa qo'shganda FAQAT bitta fayl tahrirlanadi; drift texnik jihatdan
imkonsiz bo'ladi; mobil drawer ham xuddi shu manbadan oziqlanadi.

**Xatari va nega hozir qilinmadi:**
- Sidebar JS'siz ko'rinmay qoladi → statik marketing sayti uchun **SEO va no-JS fallback**
  yo'qoladi (hozir nav `nav.js` yuklanmasa ham ko'rinadi).
- 27 fayl bir vaqtda o'zgaradi → katta diff, regressiya yuzasi keng.
- Shu sababli Prompt 16 doirasida **xavfsiz qism** bajarildi (kanoniklashtirish), refaktoring
  esa shu hujjatda taklif sifatida qoldirildi.

---

## 4. Tekshiruv natijalari (lokal)

- Sidebar variantlari: **6 → 1** (27 fayl bir xil, 23 havola).
- Buzuq in-page havola: **3 → 0**.
- Buzuq lokal havola (href/src): **0**.
- `data-course-count="all"` qiymati: barcha 28 joyda **35**.
- Tag balansi: `courses.html` da **oldindan mavjud** 4 nomuvofiqlik (`svg`/`div`/`button`/`div`) —
  `git show HEAD:courses.html` da ham aynan shu holat, bu branchda o'zgarmagan.
- Brauzer (mobil iPhone 14 + desktop 1440×900): **0 console error** barcha tekshirilgan sahifalarda.
- `services.html` da kontent sidebar ostida qolmagan (`body padding-left: 274px`, `h1.left: 298`).
- UZ → EN almashtirilganda drawer'ning barcha 22 yorlig'i va 5 guruh sarlavhasi tarjima bo'ladi.

---

## 5. Prompt 27 ga tegishli eslatma (bu branchda TEGILMADI)

`sat-mock.html` faylida **oldindan mavjud** redirect bor:

```html
<meta http-equiv="refresh" content="0; url=sat-dsat.html">
<meta name="robots" content="noindex">
```

Ya'ni `sat-mock.html` darhol `sat-dsat.html` ga o'tadi (Bluebook mock-test kodi hali ham
fayl ichida, lekin yetib bo'lmaydi). Bu — **Prompt 27** ("sat-mock.html va sat-dsat.html
dublikatini hal qilish") mavzusi. Bu branchda ataylab o'zgartirilmadi; nav'da esa kanonik
havola sifatida `sat-mock.html` qoldirildi (Prompt 27 hal qilgach to'g'ri ishlaydi).
