/* =========================================================================
   courses-data.js — YAGONA MA'LUMOTLAR MANBAI (single source of truth)
   -------------------------------------------------------------------------
   Barcha sahifalar (index.html, courses.html, sat-dsat.html, sitemap.html,
   robots.html) kurslar katalogi va kurslar sonini FAQAT shu fayldan oladi.
   Kurs qo'shilsa/o'chirilsa, barcha hisoblagichlar (navbar badge, H1/H2,
   filter tab "Barchasi", footer, sitemap) avtomatik yangilanadi — qo'lda
   yozilgan raqamlar qolmagan, shuning uchun son hech qachon mos kelmay
   qolmaydi.

   Ishlatish:
     <script src="courses-data.js" defer></script>   (script.js dan OLDIN)

   API:
     window.TayanchCourses.data    -> kurslar massivi
     window.TayanchCourses.counts  -> { all, ai, ielts, admission }
     window.TayanchCourses.sync()  -> DOM'dagi hisoblagichlarni yangilash
     window.TayanchCourses.get(id) -> kurs obyekti
     window.TayanchCourses.byCategory(cat) -> filtrlangan massiv
   ========================================================================= */
(function (global) {
    'use strict';

    var COURSES = [
// --- AI CATEGORY (10 COURSES) ---
{ id: 2, title: "ChatGPT & Advanced Prompt Engineering", category: "ai", catName: "Sun'iy Intelekt (AI)", desc: "Mukammal promptlar yozish, Custom GPTs yaratish hamda kognitiv topshiriqlarni sun'iy intelektga topshirish.", duration: "4 Hafta", level: "O'rta", price: "249,000 UZS", icon: "fa-solid fa-code", badge: "Intensiv", modules: ["Few-Shot va Chain-of-Thought Prompting texnikalari", "Shaxsiy Custom GPT assistentlarini kodsiz yaratish", "Katta hajmdagi matnlar va kitoblarni umumlashtirish", "AI xatolarini (Hallucinations) oldini olish va tekshirish"] },
{ id: 3, title: "Midjourney & AI Visual Content Creation", category: "ai", catName: "Sun'iy Intelekt (AI)", desc: "Professional dizayn, fotorealistik tasvirlar va visual presentation materiallarini AI yordamida yaratish.", duration: "3 Hafta", level: "Boshlang'ich", price: "199,000 UZS", icon: "fa-solid fa-palette", badge: "Kreativ", modules: ["Midjourney v6 parametrlari va stil aralashmalari", "Fotorealistik portretlar va mahsulot dizaynlari", "DALL-E 3 va Canva AI bilan ijtimoiy tarmoq bannerlari", "AI orqali SMM va brending uchun vizual kontent"] },
{ id: 4, title: "AI Tools for Academic Research & Writing", category: "ai", catName: "Sun'iy Intelekt (AI)", desc: "Ilmiy maqolalar, dissertatsiya va insholarni tahlil qilish, iqtiboslar bilan ishlash hamda tadqiqot AI vositalari.", duration: "4 Hafta", level: "Akademik", price: "299,000 UZS", icon: "fa-solid fa-book-open-reader", badge: "Talabalar uchun", modules: ["Consensus va Elicit AI bilan ilmiy maqolalarni izlash", "Litmaps yordamida adabiyotlar sharhini (Literature Review) tuzish", "Grammarly AI va Quillbot orqali akademik ingliz tilini takomillashtirish", "Plagiat va AI detection bilan ishlash strategiyasi"] },
{ id: 5, title: "Python + AI Foundations for Beginners", category: "ai", catName: "Sun'iy Intelekt (AI)", desc: "Dasturlash tajribasisiz Python asoslarini o'rganish va OpenAI API orqali birinchi AI loyihangizni yoqish.", duration: "6 Hafta", level: "Boshlang'ich", price: "349,000 UZS", icon: "fa-brands fa-python", badge: "Praktikum", modules: ["Python sintaksisi va ma'lumotlar tuzilmasi", "OpenAI API kalitini ulash va sorov yuborish", "Streamlit yordamida AI Web App interfeysi yaratish", "Shaxsiy AI chatbot loyihasini joylashtirish (Deploy)"] },
{ id: 6, title: "Automation with Claude & Make/Zapier", category: "ai", catName: "Sun'iy Intelekt (AI)", desc: "Biznes va ish jarayonlarini kod yozmasdan avtomatlashtirish: Telegram botlar, CRM va elektron pochta integratsiyasi.", duration: "4 Hafta", level: "O'rta", price: "299,000 UZS", icon: "fa-solid fa-gears", badge: "Biznes AI", modules: ["Make.com va Zapier platformasi asoslari", "Telegram botga Claude API ulash", "Google Sheets va AI ma'lumotlar oqimini zanjirlash", "Avtomatik mijozlar xabarnomasi tizimini yoqish"] },
{ id: 7, title: "AI-Powered Data Analysis & Excel", category: "ai", catName: "Sun'iy Intelekt (AI)", desc: "Katta ma'lumotlar bazasini AI va Code Interpreter orqali daqiqalar ichida tahlil qilish hamda grafiklar tuzish.", duration: "3 Hafta", level: "Amaliy", price: "249,000 UZS", icon: "fa-solid fa-chart-pie", badge: "Analitika", modules: ["ChatGPT Advanced Data Analysis (Code Interpreter)", "Excel va Google Sheets formulalarini AI yordamida avtomatik tuzish", "Moliyaviy va sotuv statistikalarini vizuallashtirish", "Trendlarni bashorat qilish va hisobotlar tayyorlash"] },
{ id: 8, title: "Content Creation with AI (Copywriting & Video)", category: "ai", catName: "Sun'iy Intelekt (AI)", desc: "Kopirayting, AI diktorlar (HeyGen, ElevenLabs) va qisqa videolar (Shorts/Reels) yaratish bosqichlari.", duration: "3 Hafta", level: "Boshlang'ich", price: "199,000 UZS", icon: "fa-solid fa-video", badge: "SMM & Media", modules: ["Kopirayting ssenariylari va ilgak matnlar yaratish", "ElevenLabs orqali tabiiy ovozli AI audiolarni shakllantirish", "HeyGen va CapCut AI bilan professional video montaj", "YouTube va Instagram uchun kontent konveyerini yoqish"] },
{ id: 9, title: "Generative AI for Students & Scholars", category: "ai", catName: "Sun'iy Intelekt (AI)", desc: "Imtihonlarga tayyorgarlik, konspektlar tuzish va murakkab mavzularni tushuntiruvchi AI repetitor vositalari.", duration: "3 Hafta", level: "Boshlang'ich", price: "199,000 UZS", icon: "fa-solid fa-graduation-cap", badge: "Ta'lim", modules: ["PDF va ma'ruzalardan avtomatik Flashcard va testlar yasash", "Feynman metodologiyasini ChatGPT orqali qo'llash", "Xorijiy tillarni AI so'zlashuvchi bilan o'rganish", "Vaqtni samarali boshqarish va taqvim AI tizimi"] },
{ id: 10, title: "AI Coding Assistant (Cursor & Copilot)", category: "ai", catName: "Sun'iy Intelekt (AI)", desc: "Cursor IDE, GitHub Copilot va AI yordamida 10x tezroq kod yozish hamda veb-sayt va ilovalar yaratish.", duration: "4 Hafta", level: "Amaliy", price: "299,000 UZS", icon: "fa-solid fa-laptop-code", badge: "Dasturchilar", modules: ["Cursor IDE o'rnatish va sozlash", "Koddagi buglarni AI bilan sekundlarda topish", "Refactoring va koding arxitekturasini yaxshilash", "Full-stack kichik ilovalarni AI bilan noldan qurish"] },

// --- IELTS CATEGORY (11 COURSES) ---
{ id: 11, title: "IELTS Writing Task 2 Masterclass (Band 7.5+)", category: "ielts", catName: "IELTS & Ingliz tili", desc: "Insho turlari, aniq struktura andozalari, akademik lug'at hamda Band 7.5+ uchun grammatik murakkablik.", duration: "4 Hafta", level: "Intermediate+", price: "349,000 UZS", icon: "fa-solid fa-pen-nib", badge: "Top Natija", modules: ["Opinion, Discussion, Advantage/Disadvantage insholar qolipi", "Paragraf mantiqiy bog'lanishi (Coherence & Cohesion)", "Band 7+ Akademik Collocation va sinonimlar", "Real insho namunalarini tahlil qilish va baholash"] },
{ id: 12, title: "IELTS Speaking Confidence & Accent Booster", category: "ielts", catName: "IELTS & Ingliz tili", desc: "Part 1, 2, 3 uchun ravon gapirish texnikasi, hayajonni yengish va imtihon oluvchini jalb qilish strategiyasi.", duration: "3 Hafta", level: "Barcha Darajalar", price: "249,000 UZS", icon: "fa-solid fa-comments", badge: "Amaliy So'zlashuv", modules: ["Part 2 Cue Card bo'yicha 1 minutda struktura tuzish", "Part 3 abstrakt savollarga chuqur javob berish", "Fluency va Hesitation o'rtasidagi muvozanat", "Mock speaking simulyatsiyasi va fikr-mulohazalar"] },
{ id: 13, title: "IELTS Reading Speed & Keyword Tracking Tech", category: "ielts", catName: "IELTS & Ingliz tili", desc: "Passage 1, 2, 3 ni 60 daqiqada tugatish, True/False/Not Given va Headings savollarini xatosiz yechish sirlari.", duration: "3 Hafta", level: "Intermediate+", price: "249,000 UZS", icon: "fa-solid fa-eye", badge: "Tezkor Usul", modules: ["Skimming va Scanning texnikasini avtomatga chiqarish", "Paraphrase kalit so'zlarni tezkor payqash", "Matching Headings va Summary Completion xatosiz strategiyasi", "Vaqtni to'g'ri taqsimlash metodikasi"] },
{ id: 14, title: "IELTS Listening Full Prep & Accent Mastery", category: "ielts", catName: "IELTS & Ingliz tili", desc: "Britaniya, Avstraliya va Amerika aksentlarini tushunish, diqqatni jamlash va tuzoqli savollarni yengish.", duration: "3 Hafta", level: "Barcha Darajalar", price: "249,000 UZS", icon: "fa-solid fa-headphones", badge: "Intensiv", modules: ["Part 3 & 4 ko'p tanlovli (Multiple Choice) savollar", "Distractors va chalg'ituvchi iboralarni aniqlash", "Map & Diagram labeling topshiriqlari", "Audiolarni 1.25x tezlikda mashq qilish usuli"] },
{ id: 15, title: "IELTS Intensive 30-Day Sprint (Bootcamp)", category: "ielts", catName: "IELTS & Ingliz tili", desc: "Imtihonga 1 oy qolganda barcha 4 ta seksiyani mukammallashtiruvchi kunlik intensiv tayyorgarlik kursi.", duration: "4 Hafta", level: "B2 / C1", price: "499,000 UZS", icon: "fa-solid fa-fire", badge: "Bootcamp", modules: ["Kunlik 4 soatlik amaliy mashg'ulotlar rejasi", "Writing Task 1 Chart, Map va Process tasvirlash", "Full Mock Test topshirish va natijalar diagnostikasi", "Imtihon kuni psixologik tayyorgarlik"] },
{ id: 16, title: "General English B1 to B2 Accelerator", category: "ielts", catName: "IELTS & Ingliz tili", desc: "Grammatika bo'shliqlarini yopish, so'z boyligini 2000+ ga oshirish va erkin muloqot bosqichiga o'tish.", duration: "6 Hafta", level: "Intermediate", price: "299,000 UZS", icon: "fa-solid fa-arrow-up-right-dots", badge: "Asosiy", modules: ["Complex Sentences va Conditionals grammatikasi", "Kunlik so'zlashuv iboralari va idiomalari", "Tinglab tushunish va matnlarni qayta so'zlab berish", "Interaktiv debatlar va guruh muloqotlari"] },
{ id: 17, title: "Upper-Intermediate to Advanced C1 Grammar", category: "ielts", catName: "IELTS & Ingliz tili", desc: "Inversion, Subjunctive mood, Participle clauses va oliy darajadagi sintaksis tuzilmalarini o'zlashtirish.", duration: "5 Hafta", level: "Advanced C1", price: "299,000 UZS", icon: "fa-solid fa-spell-check", badge: "Grammatika", modules: ["C1 darajadagi Grammatical Range & Accuracy", "Akademik va rasmiy insholarda sintaksis", "Common Error Elimination (keng tarqalgan xatolar)", "Style va Tone muvozanatini saqlash"] },
{ id: 18, title: "Academic Vocabulary & Collocations for IELTS", category: "ielts", catName: "IELTS & Ingliz tili", desc: "IELTS mavzulari bo'yicha (Atrof-muhit, Texnologiya, Ta'lim, Jamiyat) top 1000 ta akademik so'zlar jamlanmasi.", duration: "3 Hafta", level: "Intermediate+", price: "199,000 UZS", icon: "fa-solid fa-book-bookmark", badge: "Lug'at", modules: ["Topic-based Collocations va Phrasal Verbs", "Spelling xatolarini nolgacha kamaytirish", "Synonym Mapping texnikasi", "Anki flashcards yordamida uzoq muddatli xotira"] },
{ id: 19, title: "IELTS Mock Test Analysis & Individual Feedback", category: "ielts", catName: "IELTS & Ingliz tili", desc: "Haqiqiy imtihon muhiti, individual test tahlili hamda har bir talabaga shaxsiy rivojlanish xaritasi.", duration: "2 Hafta", level: "Barcha Darajalar", price: "399,000 UZS", icon: "fa-solid fa-clipboard-check", badge: "Tahlil", modules: ["2 ta to'liq IELTS Mock Test topshirish", "Writing insholaringizga battafsil ekspert sharhi", "Speaking audio yozuvlarini tahlil qilish", "Kuchsiz nuqtalarni bartaraf etish rejasi"] },
{ id: 20, title: "English Pronunciation & Native Accent Training", category: "ielts", catName: "IELTS & Ingliz tili", desc: "IPA fonetika belgilari, Intonatsiya, Connected Speech va talaffuzdagi o'zbekcha aksentni yoqotish mashqlari.", duration: "3 Hafta", level: "Barcha Darajalar", price: "199,000 UZS", icon: "fa-solid fa-microphone-lines", badge: "Talaffuz", modules: ["Vowel va Consonant tovushlarining to'g'ri artikulatsiyasi", "Connected Speech (Linking, Intonation, Stress)", "Shadowing texnikasi orqali diksiya o'stirish", "Ovozsiz va jarangli tovushlar ustida ishlash"] },
{ id: 21, title: "Professional Business English & Pitching", category: "ielts", catName: "IELTS & Ingliz tili", desc: "Xalqaro kompaniyalar uchun rezyume yozish, intervyulardan o'tish hamda prezentatsiyalar o'tkazish ingliz tili.", duration: "4 Hafta", level: "Intermediate+", price: "299,000 UZS", icon: "fa-solid fa-briefcase", badge: "Kariyerist", modules: ["Professional Email va taklifnomalar yozish", "Job Interview savollariga STAR usulida javob", "Biznes taqdimotlar (Pitching) o'tkazish", "Muzokaralar olib borish madaniyati"] },

// --- ADMISSION CATEGORY (10 COURSES) ---
{ id: 22, title: "Digital SAT Math Mastery (800 Score Strategy)", category: "admission", catName: "Admission & SAT", desc: "Digital SAT Matematika bo'limining barcha formulalari, Desmos kalkulyatoridan samarali foydalanish hamda 800 bal algebrasi.", duration: "6 Hafta", level: "Amaliy", price: "399,000 UZS", icon: "fa-solid fa-calculator", badge: "Top 800", modules: ["Algebra va Linear Equations tezkor yechimlari", "Desmos Graphing Calculator sirlari va layfhaklar", "Advanced Math, Geometry va Trigonometry", "Digital SAT modullari simulyatsiyasi va vaqtni tejash"] },
{ id: 23, title: "Digital SAT Reading & Writing", category: "admission", catName: "Admission & SAT", desc: "Digital SAT Reading matnlari tahlili, Vocabulary in Context hamda Grammatika qoidalarining 100% yechimlari.", duration: "6 Hafta", level: "Advanced", price: "399,000 UZS", icon: "fa-solid fa-pen-fancy", badge: "Intensiv", modules: ["Craft and Structure savol turlarini yechish", "Information and Ideas matnli tahlil", "Expression of Ideas va Standart English Conventions", "SAT lug'at bazasi va tezkor matn o'qish"] },
{ id: 24, title: "US College Application Essay (Personal Statement)", category: "admission", catName: "Admission & SAT", desc: "AQSh Top universitetlariga qabul komissiyasini hayratda qoldiruvchi shaxsiy insho (Common App Essay) yozish.", duration: "4 Hafta", level: "Admission", price: "499,000 UZS", icon: "fa-solid fa-feather-pointed", badge: "Insho", hubHref: "admission-essay-personal-statement.html", lessonUrl: "admission-essay-personal-statement.html", hubLabel: "Bepul Insho Qoʻllanmasi", modules: ["Shaxsiy voqea (Storytelling) tanlash va reja tuzish", "Common App 7 ta prompti bo mezonlar", "Supplemental Essay (Nega aynan ushbu universitet?) yozish", "Ekspert ko'rigi va insho tahriri"] },
{ id: 25, title: "Full-Ride Scholarship Application Blueprint", category: "admission", catName: "Admission & SAT", desc: "AQSh, Yevropa va Osiyo universitetlaridan to'liq moliyalashtirilgan (fully funded) ta'lim va yashash xarajatlarini qoplovchi grantlarga ariza topshirish strategiyasi.", duration: "5 Hafta", level: "Grantlar", price: "399,000 UZS", icon: "fa-solid fa-trophy", badge: "Grant Strategiyasi", modules: ["Need-Based va Merit-Based grantlar farqi", "Stipendiyali dasturlarni qidirish (Need-Blind unilar)", "Moliyaviy hujjatlar va insholarni tayyorlash", "Muvaffaqiyatli grant olgan talabalar tajribasi"] },
{ id: 26, title: "Common App & Financial Aid (CSS Profile / FAFSA)", category: "admission", catName: "Admission & SAT", desc: "Common Application platformasida profil ochish, barcha bo'limlarni xatosiz to'ldirish va CSS Profile hujjati.", duration: "3 Hafta", level: "Amaliy Hujjat", price: "299,000 UZS", icon: "fa-solid fa-file-invoice-dollar", badge: "Hujjatlar", modules: ["Common App hisobini yaratish va sozlash", "Honors va Extracurricular activities bo'limi to'ldirish", "CSS Profile orqali oilaviy daromad hujjatlarini topshirish", "Universitetlarga portal orqali kod yuborish"] },
{ id: 27, title: "Ivy League & Top 50 Global University Strategy", category: "admission", catName: "Admission & SAT", desc: "Harvard, MIT, Stanford va Yevropa Top 50 oliygohlariga topshiruvchi talabalar uchun maxsus portfolio strategiyasi.", duration: "4 Hafta", level: "Premium", price: "599,000 UZS", icon: "fa-solid fa-crown", badge: "Ivy League", modules: ["Holistic Review (Yaxlit baholash) tizimi talablari", "Noyob Spike Factor (Shaxsiy ustunlik) yaratish", "Early Decision (ED) va Early Action (EA) strategiyalari", "Xalqaro olimpiada va tadqiqot portfoliosi"] },
{ id: 28, title: "Extracurricular Profile Building & Leadership", category: "admission", catName: "Admission & SAT", desc: "Darsdan tashqari faoliyatlar, ijtimoiy loyihalar, startap va ko'ngillilik ishlarini tashkil etish hamda taqdim etish.", duration: "4 Hafta", level: "Liderlik", price: "299,000 UZS", icon: "fa-solid fa-people-roof", badge: "Portfolio", modules: ["Nol kapital bilan nodavlat loyiha (NGO) boshlash", "Liderlik va tashabbuskorlikni hujjatlashtirish", "Tadqiqot maqolalarini chop etish", "Activity List bo'limida harakat fe'llari (Action Verbs)"] },
{ id: 29, title: "Recommendation Letters & Academic CV Building", category: "admission", catName: "Admission & SAT", desc: "O'qituvchilardan kuchli tavsiyanomalar olish hamda xalqaro standartdagi Akademik Rezyume (CV) shakllantirish.", duration: "2 Hafta", level: "Boshlang'ich", price: "199,000 UZS", icon: "fa-solid fa-address-card", badge: "CV & Letter", modules: ["O'qituvchilarga tavsiyanoma so'rovi xatini yozish", "Recommendation Letter andozalari va sirlari", "Harvard formatidagi 1 sahifalik Resume/CV tuzish", "LinkedIn profilini akademik sozlash"] },
{ id: 30, title: "European & Asian Fully Funded Scholarships", category: "admission", catName: "Admission & SAT", desc: "Turkiye Burslari, MEXT (Yaponiya), GKS (Koreya), Stipendium Hungaricum va Italy Grants ga ariza topshirish.", duration: "4 Hafta", level: "Xalqaro Grant", price: "349,000 UZS", icon: "fa-solid fa-earth-americas", badge: "Davlat Grantlari", modules: ["Turkiye Burslari muloqot va insho tayyorlovi", "GKS va MEXT elchixona yo'li bo'yicha bosqichlar", "Stipendium Hungaricum ariza portali", "Yevropa universitetlarida bepul ta'lim imkoniyatlari"] },
{ id: 31, title: "Mock Admission Interview & Case Study Practice", category: "admission", catName: "Admission & SAT", desc: "Universitet bitiruvchilari hamda qabul komissiyasi bilan yuzma-yuz intervyu simulyatsiyasi va tayyorgarligi.", duration: "2 Hafta", level: "Amaliy Intervyu", price: "299,000 UZS", icon: "fa-solid fa-user-tie", badge: "Intervyu", modules: ["Ko'p beriladigan 20 ta admission savollari", "Shaxsiy qadriyatlar va motivatsiyani ko'rsatish", "Intervyuerga to'g'ri savollar berish madaniyati", "Jonli Zoom intervyu simulyatsiyasi"] }
    ];

    function countBy(cat) {
        return COURSES.filter(function (c) { return c.category === cat; }).length;
    }

    var COUNTS = {
        all: COURSES.length,
        ai: countBy('ai'),
        ielts: countBy('ielts'),
        admission: countBy('admission')
    };

    function has(key) {
        return Object.prototype.hasOwnProperty.call(COUNTS, key);
    }

    function setText(el, val) {
        if (el && el.textContent !== val) el.textContent = val;
    }

    /* DOM'dagi barcha hisoblagichlarni yagona manbadan yangilash.
       Uchta mexanizm qo'llab-quvvatlanadi (barchasi bir vaqtda ishlaydi):
         1) data-course-count="all|ai|ielts|admission"       -> faqat son
         2) data-course-count-label="all|ai|ielts|admission" -> "N ta Kurslar"
         3) avvaldan mavjud ID'lar va filtr tab'lari (legacy markup)         */
    function sync() {
        /* 1) data-course-count — faqat son */
        var numeric = document.querySelectorAll('[data-course-count]');
        for (var i = 0; i < numeric.length; i++) {
            var el = numeric[i];
            var key = el.getAttribute('data-course-count');
            if (has(key)) setText(el, String(COUNTS[key]));
        }

        /* 2) data-course-count-label — "N ta Kurslar" */
        var labelled = document.querySelectorAll('[data-course-count-label]');
        for (var j = 0; j < labelled.length; j++) {
            var lab = labelled[j];
            var k = lab.getAttribute('data-course-count-label');
            if (has(k)) setText(lab, COUNTS[k] + ' ta Kurslar');
        }

        /* 3) Legacy ID'lar — mavjud markup'ni qayta yozmasdan ishlashi uchun */
        setText(document.getElementById('countAll'), String(COUNTS.all));
        setText(document.getElementById('coursesTotalHeading'), COUNTS.all + ' ta Kurslar');
        setText(document.getElementById('coursesPageTotal'), COUNTS.all + ' ta Kurslar');
        setText(document.getElementById('footerCoursesLink'), COUNTS.all + ' ta Kurslar Portali');
        setText(document.getElementById('navCoursesCount'), String(COUNTS.all));

        /* 4) Filtr tab'lari: .tab-btn[data-category] ichidagi .tab-count */
        var tabs = document.querySelectorAll('.tab-btn[data-category]');
        for (var t = 0; t < tabs.length; t++) {
            var cat = tabs[t].getAttribute('data-category');
            if (!has(cat)) continue;
            var badge = tabs[t].querySelector('.tab-count');
            if (badge) setText(badge, String(COUNTS[cat]));
        }

        /* 5) Kurslar katalogi sahifasining <title> tegi ham yagona manbadan */
        if (/Barcha\s+\d+\s+ta\s+Bepul\s+Kurslar/.test(document.title)) {
            document.title = document.title.replace(
                /Barcha\s+\d+\s+ta\s+Bepul\s+Kurslar/,
                'Barcha ' + COUNTS.all + ' ta Bepul Kurslar'
            );
        }

        document.documentElement.setAttribute('data-course-total', String(COUNTS.all));
    }

    var api = {
        data: COURSES,
        counts: COUNTS,
        sync: sync,
        get: function (id) {
            for (var i = 0; i < COURSES.length; i++) {
                if (COURSES[i].id === id) return COURSES[i];
            }
            return null;
        },
        byCategory: function (cat) {
            return COURSES.filter(function (c) { return c.category === cat; });
        },
        findByTitle: function (title) {
            for (var i = 0; i < COURSES.length; i++) {
                if (COURSES[i].title === title) return COURSES[i];
            }
            return null;
        }
    };

    global.TayanchCourses = api;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', sync);
    } else {
        sync();
    }
})(window);
