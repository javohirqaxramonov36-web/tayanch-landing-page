# Prompt 13 — BOSQICH 6: Asoschi hikoyasi (Founder Story) bo'limi

> **Holat:** TAKLIF / TAVSIYA (proposal). Kod o'zgartirilmagan, deploy qilinmagan.
> **Maqsad:** Saytdagi mavjud kuchli funksiyalarni (B1–B5) reklama qilishdan tashqari,
> foydalanuvchiga *ishonch* va *emotsional aloqa* yaratish uchun asoschi hikoyasi bo'limini taklif qilish.

---

## 1. Nima uchun kerak? (Asoslash)

Tayanch — O'zbekistondagi AI / IELTS / Admission platformasi. Raqobatchilar ko'pincha
"kurslar ro'yxati" dan iborat. Asoschi hikoyasi:

- **Ishonchni oshiradi** — haqiqiy odam, haqiqiy natija (meta-da: *IELTS 7.0, SAT 1420*).
- **Farqlanish** — "kim ortida turibdi" savoliga javob beradi.
- **Konversiyani ko'taradi** — odamlar odamga ishonadi, brendga emas.

---

## 2. Qayerda joylashtiriladi? (Joylashuv tavsiyasi)

| Variant | Joy | Afzallik |
|--------|-----|----------|
| A (tavsiya) | Bosh sahifa (`index.html`), AI-demo bo'limi (B2) **ostida**, footer oldidan | Eng ko'p ko'riladigan joy |
| B | Alohida "Biz haqimizda" sahifasi + sidebar link | Kengroq, lekin kamroq ko'riladi |
| C | Kurslar (`courses.html`) sahifasi boshiga | Kontekstli, lekin asosiy oqim emas |

**Tavsiya:** Variant A — bitta `<section>` sifatida `index.html` ga qo'shiladi (keyingi bosqichda, tasdiqlangandan keyin).

---

## 3. Tuzilma (Structure sketch)

```
[ Asoschi rasmi (assets/images/founder.jpg, allaqon mavjud) ]
   + ism/title + 2 ta stat (IELTS 7.0 · SAT 1420)

[ Sarlavha ]  "Nega men Tayanchni yaratdim"
[ Kirish paragrafi ]  (1–2 jumla, birinchi shaxs)

[ 3 ta "hikoya kartasi" (liquid-card uslubida) ]
   1. Boshlanish — muammo nima edi?
   2. Eng katta qiyinchilik — qanday yengib o'tildi?
   3. Bugun — nima taklif qilamiz?

[ Iqtibos (quote) bloki ]  asoschining o'z so'zlari

[ Call-to-action ]  "Mening hikoyam — sizning boshlanishingiz"
```

---

## 4. Asoschidan so'ralishi kerak bo'lgan ANIQ SAVOLLAR

Quyidagi savollarga javob kelgandan keyinginagina kontent yoziladi. Hozircha faqat savollar:

1. **Nega Tayanchni yaratdingiz?** (asosiy motivatsiya — shaxsiy tajriba, bo'shliq, g'oya?)
2. **Eng katta qiyinchilik nima edi?** (pul, vaqt, bilim, jamoa, texnologiya — aniq misol)
3. **Qaysi nuqtai nazar o'zgardi?** (burilish nuqtasi / "aha" lahza)
4. **O'quvchilarga nima va'dasini berasiz?** (platforma prinsipi, 1 gap)
5. **Esingizda qolgan bitta muvaffaqiyat hikoyasi** (real o'quvchi natijasi, ruxsat bilan)
6. **Kelajak rejangiz?** (1–2 yillik yo'nalish — shunda bo'lim "jonli" bo'ladi)

> Qo'shimcha: Asoschi rasmi uchun `founder.jpg` yetarli, lekin "ish stolida ishlash" uslubidagi
> yangi kadr bo'lsa, bo'lim ancha issiq bo'ladi (ixtiyoriy).

---

## 5. Kontent ohang'i (Tone)

- Birinchi shaxs ("men"), samimiy, qisqa.
- O'zbek tilida (lotin yozuvi), jargon kam.
- "Men" bilan boshlanadigan 2–3 jumla yetarli — haddan ziyod uzoq emas.

---

## 6. Texnik eslatmalar (Static site qoidalari)

- Backend yo'q → matn to'g'ridan-to'g'ri `index.html` ichida yoki `site-config.js` da bo'ladi.
- Mavjud uslublarni ishlatamiz: `.glass-panel`, `.liquid-card`, `.gradient-text` (yangi CSS shart emas).
- Rasmga `alt` majburiy; iqtibosga `aria-label`.
- Mobil (390px) va desktop (1280px) da sinsiz; mavjud `grid` tizimiga mos.

---

## 7. Keyingi qadamlar (faqat tasdiqlangandan keyin)

1. Asoschi savollarga javob beradi (4-bo'lim).
2. Men bo'limning HTML loyihasini yozaman (index.html ga, yangi CSS minimal).
3. Siz ko'rib chiqasiz.
4. **Faqat tasdiqlangandan keyin** commit + push + live-tekshirish (mobil+desktop screenshot).
5. STATUS.md ga qator qo'shiladi.

**Hozirgi holat:** kodga tegilmadi, hech narsaga push qilinmadi. Bu fayl — reja.

---

*Yaratilgan: 2026-09-23 · Prompt 13 BOSQICH 6 (proposal only)*
