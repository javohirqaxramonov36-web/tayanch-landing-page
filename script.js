/* ==========================================================================
   Tayanch Landing Page — Master JavaScript Engine (Multi-Lang & WebApp Edition)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. TELEGRAM WEBAPP SDK INTEGRATION
       ========================================== */
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();

        const user = tg.initDataUnsafe?.user;
        if (user) {
            const leadNameInput = document.getElementById('leadName');
            const leadTelegramInput = document.getElementById('leadTelegram');

            if (leadNameInput && !leadNameInput.value) {
                leadNameInput.value = `${user.first_name || ''} ${user.last_name || ''}`.trim();
            }
            if (leadTelegramInput && !leadTelegramInput.value && user.username) {
                leadTelegramInput.value = `@${user.username}`;
            }
        }
    }


    /* ==========================================
       2. MULTI-LANGUAGE TRANSLATION DICTIONARY (UZ / EN)
       ========================================== */
    const translations = {
        uz: {
            announcementText: 'Awards.gov.uz "Best Startup Project" nomzodi. Qabul ochiq!',
            applyNow: 'Ariza qoldirish',
            navHome: 'Bosh sahifa',
            navCalc: 'Kalkulyator',
            navQuiz: 'AI Test',
            navMission: 'Nega Tayanch',
            navCourses: 'Kurslar',
            navProof: 'Natijalar',
            navApply: "Kursga a'zo bo'lish",
            founderPill: "Asoschi: <strong>IELTS 7.0</strong> va <strong>SAT 1420</strong> natijalariga erishgan",
            heroTitle: 'AI, IELTS va Admission\'ni <br><span class="gradient-text liquid-gradient">bir joyda o\'rganing</span>',
            heroSubheadline: 'Bugundan yangi ko\'nikma egallang va kelajagingizni zamonaviy texnologiyalar hamda xalqaro ta\'lim imkoniyatlari bilan birga quring.',
            heroCtaMain: 'Veb-saytda Ariza Qoldirish',
            heroVideoBtn: 'Video Namuna (1 min)',
            coursesStat: 'Intensiv Kurslar',
            practiceStat: 'Amaliy Metodika',
            supportStat: 'Telegram Qo\'llab-quvvatlash'
        },
        en: {
            announcementText: 'Awards.gov.uz "Best Startup Project" Candidate. Admissions Open!',
            applyNow: 'Apply Now',
            navHome: 'Home',
            navCalc: 'Calculator',
            navQuiz: 'AI Quiz',
            navMission: 'Why Tayanch',
            navCourses: 'Courses',
            navProof: 'Results',
            navApply: 'Enroll Now',
            founderPill: "Founder: Achieved <strong>IELTS 7.0</strong> & <strong>SAT 1420</strong>",
            heroTitle: 'Master AI, IELTS & Admission <br><span class="gradient-text liquid-gradient">All in One Place</span>',
            heroSubheadline: 'Acquire high-value skills today and build your global future with cutting-edge AI technologies and international scholarships.',
            heroCtaMain: 'Apply via Website',
            heroVideoBtn: 'Watch Demo (1 min)',
            coursesStat: 'Intensive Courses',
            practiceStat: 'Practical Method',
            supportStat: '24/7 Telegram Support'
        }
    };

    const langUzBtn = document.getElementById('langUzBtn');
    const langEnBtn = document.getElementById('langEnBtn');

    function setLanguage(lang) {
        if (!translations[lang]) return;
        const dict = translations[lang];

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (dict[key]) {
                el.innerHTML = dict[key];
            }
        });

        if (langUzBtn && langEnBtn) {
            langUzBtn.classList.toggle('active', lang === 'uz');
            langEnBtn.classList.toggle('active', lang === 'en');
        }
    }

    if (langUzBtn) langUzBtn.addEventListener('click', () => setLanguage('uz'));
    if (langEnBtn) langEnBtn.addEventListener('click', () => setLanguage('en'));


    /* ==========================================
       3. EXPRESS AI PLACEMENT QUIZ WIDGET
       ========================================== */
    let quizScore = 0;
    const quizStep1 = document.getElementById('quizStep1');
    const quizStep2 = document.getElementById('quizStep2');
    const quizResultBox = document.getElementById('quizResultBox');
    const quizResultLevel = document.getElementById('quizResultLevel');

    document.querySelectorAll('.quiz-opt-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const score = parseInt(btn.dataset.score || '0');
            quizScore += score;

            if (quizStep1 && quizStep1.style.display !== 'none') {
                quizStep1.style.display = 'none';
                if (quizStep2) quizStep2.style.display = 'block';
            } else if (quizStep2 && quizStep2.style.display !== 'none') {
                quizStep2.style.display = 'none';
                if (quizResultBox) quizResultBox.style.display = 'block';

                if (quizResultLevel) {
                    if (quizScore >= 2) {
                        quizResultLevel.innerText = 'Darajangiz: CEFR B2 / C1 (Advanced AI & IELTS Holder)';
                    } else {
                        quizResultLevel.innerText = 'Darajangiz: CEFR B1 (Intermediate — Rapid Growth Required)';
                    }
                }
            }
        });
    });


    /* ==========================================
       4. 31 COURSES DATA STORE
       ========================================== */
    const coursesData = [
        // --- AI CATEGORY (10 COURSES) ---
        { id: 1, title: "Practical AI for Daily Productivity", category: "ai", catName: "Sun'iy Intelekt (AI)", desc: "ChatGPT, Claude va Perplexity vositalari orqali kunlik vazifalaringizni 5x tezlashtirish va unumdorlikni oshirish sirlari.", duration: "3 Hafta", level: "Boshlang'ich", icon: "fa-solid fa-bolt", badge: "Top Trend", modules: ["Prompt Engineering asoslari va qoliplari", "ChatGPT bilan hujjatlar va elektron pochtani avtomatlashtirish", "Perplexity AI bilan tezkor akademik va bozor tadqiqotlari", "Kunlik rejalashtirish va sun'iy AI assistent yaratish"] },
        { id: 2, title: "ChatGPT & Advanced Prompt Engineering", category: "ai", catName: "Sun'iy Intelekt (AI)", desc: "Mukammal promptlar yozish, Custom GPTs yaratish hamda kognitiv topshiriqlarni sun'iy intelektga topshirish.", duration: "4 Hafta", level: "O'rta", icon: "fa-solid fa-code", badge: "Intensiv", modules: ["Few-Shot va Chain-of-Thought Prompting texnikalari", "Shaxsiy Custom GPT assistentlarini kodsiz yaratish", "Katta hajmdagi matnlar va kitoblarni umumlashtirish", "AI xatolarini (Hallucinations) oldini olish va tekshirish"] },
        { id: 3, title: "Midjourney & AI Visual Content Creation", category: "ai", catName: "Sun'iy Intelekt (AI)", desc: "Professional dizayn, fotorealistik tasvirlar va visual presentation materiallarini AI yordamida yaratish.", duration: "3 Hafta", level: "Boshlang'ich", icon: "fa-solid fa-palette", badge: "Kreativ", modules: ["Midjourney v6 parametrlari va stil aralashmalari", "Fotorealistik portretlar va mahsulot dizaynlari", "DALL-E 3 va Canva AI bilan ijtimoiy tarmoq bannerlari", "AI orqali SMM va brending uchun vizual kontent"] },
        { id: 4, title: "AI Tools for Academic Research & Writing", category: "ai", catName: "Sun'iy Intelekt (AI)", desc: "Ilmiy maqolalar, dissertatsiya va insholarni tahlil qilish, iqtiboslar bilan ishlash hamda tadqiqot AI vositalari.", duration: "4 Hafta", level: "Akademik", icon: "fa-solid fa-book-open-reader", badge: "Talabalar uchun", modules: ["Consensus va Elicit AI bilan ilmiy maqolalarni izlash", "Litmaps yordamida adabiyotlar sharhini (Literature Review) tuzish", "Grammarly AI va Quillbot orqali akademik ingliz tilini takomillashtirish", "Plagiat va AI detection bilan ishlash strategiyasi"] },
        { id: 5, title: "Python + AI Foundations for Beginners", category: "ai", catName: "Sun'iy Intelekt (AI)", desc: "Dasturlash tajribasisiz Python asoslarini o'rganish va OpenAI API orqali birinchi AI loyihangizni yoqish.", duration: "6 Hafta", level: "Boshlang'ich", icon: "fa-brands fa-python", badge: "Praktikum", modules: ["Python sintaksisi va ma'lumotlar tuzilmasi", "OpenAI API kalitini ulash va sorov yuborish", "Streamlit yordamida AI Web App interfeysi yaratish", "Shaxsiy AI chatbot loyihasini joylashtirish (Deploy)"] },
        { id: 6, title: "Automation with Claude & Make/Zapier", category: "ai", catName: "Sun'iy Intelekt (AI)", desc: "Biznes va ish jarayonlarini kod yozmasdan avtomatlashtirish: Telegram botlar, CRM va elektron pochta integratsiyasi.", duration: "4 Hafta", level: "O'rta", icon: "fa-solid fa-gears", badge: "Biznes AI", modules: ["Make.com va Zapier platformasi asoslari", "Telegram botga Claude API ulash", "Google Sheets va AI ma'lumotlar oqimini zanjirlash", "Avtomatik mijozlar xabarnomasi tizimini yoqish"] },
        { id: 7, title: "AI-Powered Data Analysis & Excel", category: "ai", catName: "Sun'iy Intelekt (AI)", desc: "Katta ma'lumotlar bazasini AI va Code Interpreter orqali daqiqalar ichida tahlil qilish hamda grafiklar tuzish.", duration: "3 Hafta", level: "Amaliy", icon: "fa-solid fa-chart-pie", badge: "Analitika", modules: ["ChatGPT Advanced Data Analysis (Code Interpreter)", "Excel va Google Sheets formulalarini AI yordamida avtomatik tuzish", "Moliyaviy va sotuv statistikalarini vizuallashtirish", "Trendlarni bashorat qilish va hisobotlar tayyorlash"] },
        { id: 8, title: "Content Creation with AI (Copywriting & Video)", category: "ai", catName: "Sun'iy Intelekt (AI)", desc: "Kopirayting, AI diktorlar (HeyGen, ElevenLabs) va qisqa videolar (Shorts/Reels) yaratish bosqichlari.", duration: "3 Hafta", level: "Boshlang'ich", icon: "fa-solid fa-video", badge: "SMM & Media", modules: ["Kopirayting ssenariylari va ilgak matnlar yaratish", "ElevenLabs orqali tabiiy ovozli AI audiolarni shakllantirish", "HeyGen va CapCut AI bilan professional video montaj", "YouTube va Instagram uchun kontent konveyerini yoqish"] },
        { id: 9, title: "Generative AI for Students & Scholars", category: "ai", catName: "Sun'iy Intelekt (AI)", desc: "Imtihonlarga tayyorgarlik, konspektlar tuzish va murakkab mavzularni tushuntiruvchi AI repetitor vositalari.", duration: "3 Hafta", level: "Boshlang'ich", icon: "fa-solid fa-graduation-cap", badge: "Ta'lim", modules: ["PDF va ma'ruzalardan avtomatik Flashcard va testlar yasash", "Feynman metodologiyasini ChatGPT orqali qo'llash", "Xorijiy tillarni AI so'zlashuvchi bilan o'rganish", "Vaqtni samarali boshqarish va taqvim AI tizimi"] },
        { id: 10, title: "AI Coding Assistant (Cursor & Copilot)", category: "ai", catName: "Sun'iy Intelekt (AI)", desc: "Cursor IDE, GitHub Copilot va AI yordamida 10x tezroq kod yozish hamda veb-sayt va ilovalar yaratish.", duration: "4 Hafta", level: "Amaliy", icon: "fa-solid fa-laptop-code", badge: "Dasturchilar", modules: ["Cursor IDE o'rnatish va sozlash", "Koddagi buglarni AI bilan sekundlarda topish", "Refactoring va koding arxitekturasini yaxshilash", "Full-stack kichik ilovalarni AI bilan noldan qurish"] },

        // --- IELTS CATEGORY (11 COURSES) ---
        { id: 11, title: "IELTS Writing Task 2 Masterclass (Band 7.5+)", category: "ielts", catName: "IELTS & Ingliz tili", desc: "Insho turlari, aniq struktura andozalari, akademik lug'at hamda Band 7.5+ uchun grammatik murakkablik.", duration: "4 Hafta", level: "Intermediate+", icon: "fa-solid fa-pen-nib", badge: "Top Natija", modules: ["Opinion, Discussion, Advantage/Disadvantage insholar qolipi", "Paragraf mantiqiy bog'lanishi (Coherence & Cohesion)", "Band 7+ Akademik Collocation va sinonimlar", "Real insho namunalarini tahlil qilish va baholash"] },
        { id: 12, title: "IELTS Speaking Confidence & Accent Booster", category: "ielts", catName: "IELTS & Ingliz tili", desc: "Part 1, 2, 3 uchun ravon gapirish texnikasi, hayajonni yengish va imtihon oluvchini jalb qilish strategiyasi.", duration: "3 Hafta", level: "Barcha Darajalar", icon: "fa-solid fa-comments", badge: "Amaliy So'zlashuv", modules: ["Part 2 Cue Card bo'yicha 1 minutda struktura tuzish", "Part 3 abstrakt savollarga chuqur javob berish", "Fluency va Hesitation o'rtasidagi muvozanat", "Mock speaking simulyatsiyasi va fikr-mulohazalar"] },
        { id: 13, title: "IELTS Reading Speed & Keyword Tracking Tech", category: "ielts", catName: "IELTS & Ingliz tili", desc: "Passage 1, 2, 3 ni 60 daqiqada tugatish, True/False/Not Given va Headings savollarini xatosiz yechish sirlari.", duration: "3 Hafta", level: "Intermediate+", icon: "fa-solid fa-eye", badge: "Tezkor Usul", modules: ["Skimming va Scanning texnikasini avtomatga chiqarish", "Paraphrase kalit so'zlarni tezkor payqash", "Matching Headings va Summary Completion xatosiz strategiyasi", "Vaqtni to'g'ri taqsimlash metodikasi"] },
        { id: 14, title: "IELTS Listening Full Prep & Accent Mastery", category: "ielts", catName: "IELTS & Ingliz tili", desc: "Britaniya, Avstraliya va Amerika aksentlarini tushunish, diqqatni jamlash va tuzoqli savollarni yengish.", duration: "3 Hafta", level: "Barcha Darajalar", icon: "fa-solid fa-headphones", badge: "Intensiv", modules: ["Part 3 & 4 ko'p tanlovli (Multiple Choice) savollar", "Distractors va chalg'ituvchi iboralarni aniqlash", "Map & Diagram labeling topshiriqlari", "Audiolarni 1.25x tezlikda mashq qilish usuli"] },
        { id: 15, title: "IELTS Intensive 30-Day Sprint (Bootcamp)", category: "ielts", catName: "IELTS & Ingliz tili", desc: "Imtihonga 1 oy qolganda barcha 4 ta seksiyani mukammallashtiruvchi kunlik intensiv tayyorgarlik kursi.", duration: "4 Hafta", level: "B2 / C1", icon: "fa-solid fa-fire", badge: "Bootcamp", modules: ["Kunlik 4 soatlik amaliy mashg'ulotlar rejasi", "Writing Task 1 Chart, Map va Process tasvirlash", "Full Mock Test topshirish va natijalar diagnostikasi", "Imtihon kuni psixologik tayyorgarlik"] },
        { id: 16, title: "General English B1 to B2 Accelerator", category: "ielts", catName: "IELTS & Ingliz tili", desc: "Grammatika bo'shliqlarini yopish, so'z boyligini 2000+ ga oshirish va erkin muloqot bosqichiga o'tish.", duration: "6 Hafta", level: "Intermediate", icon: "fa-solid fa-arrow-up-right-dots", badge: "Asosiy", modules: ["Complex Sentences va Conditionals grammatikasi", "Kunlik so'zlashuv iboralari va idiomalari", "Tinglab tushunish va matnlarni qayta so'zlab berish", "Interaktiv debatlar va guruh muloqotlari"] },
        { id: 17, title: "Upper-Intermediate to Advanced C1 Grammar", category: "ielts", catName: "IELTS & Ingliz tili", desc: "Inversion, Subjunctive mood, Participle clauses va oliy darajadagi sintaksis tuzilmalarini o'zlashtirish.", duration: "5 Hafta", level: "Advanced C1", icon: "fa-solid fa-spell-check", badge: "Grammatika", modules: ["C1 darajadagi Grammatical Range & Accuracy", "Akademik va rasmiy insholarda sintaksis", "Common Error Elimination (keng tarqalgan xatolar)", "Style va Tone muvozanatini saqlash"] },
        { id: 18, title: "Academic Vocabulary & Collocations for IELTS", category: "ielts", catName: "IELTS & Ingliz tili", desc: "IELTS mavzulari bo'yicha (Atrof-muhit, Texnologiya, Ta'lim, Jamiyat) top 1000 ta akademik so'zlar jamlanmasi.", duration: "3 Hafta", level: "Intermediate+", icon: "fa-solid fa-book-bookmark", badge: "Lug'at", modules: ["Topic-based Collocations va Phrasal Verbs", "Spelling xatolarini nolgacha kamaytirish", "Synonym Mapping texnikasi", "Anki flashcards yordamida uzoq muddatli xotira"] },
        { id: 19, title: "IELTS Mock Test Analysis & Individual Feedback", category: "ielts", catName: "IELTS & Ingliz tili", desc: "Haqiqiy imtihon muhiti, individual test tahlili hamda har bir talabaga shaxsiy rivojlanish xaritasi.", duration: "2 Hafta", level: "Barcha Darajalar", icon: "fa-solid fa-clipboard-check", badge: "Tahlil", modules: ["2 ta to'liq IELTS Mock Test topshirish", "Writing insholaringizga battafsil ekspert sharhi", "Speaking audio yozuvlarini tahlil qilish", "Kuchsiz nuqtalarni bartaraf etish rejasi"] },
        { id: 20, title: "English Pronunciation & Native Accent Training", category: "ielts", catName: "IELTS & Ingliz tili", desc: "IPA fonetika belgilari, Intonatsiya, Connected Speech va talaffuzdagi o'zbekcha aksentni yoqotish mashqlari.", duration: "3 Hafta", level: "Barcha Darajalar", icon: "fa-solid fa-microphone-lines", badge: "Talaffuz", modules: ["Vowel va Consonant tovushlarining to'g'ri artikulatsiyasi", "Connected Speech (Linking, Intonation, Stress)", "Shadowing texnikasi orqali diksiya o'stirish", "Ovozsiz va jarangli tovushlar ustida ishlash"] },
        { id: 21, title: "Professional Business English & Pitching", category: "ielts", catName: "IELTS & Ingliz tili", desc: "Xalqaro kompaniyalar uchun rezyume yozish, intervyulardan o'tish hamda prezentatsiyalar o'tkazish ingliz tili.", duration: "4 Hafta", level: "Intermediate+", icon: "fa-solid fa-briefcase", badge: "Kariyerist", modules: ["Professional Email va taklifnomalar yozish", "Job Interview savollariga STAR usulida javob", "Biznes taqdimotlar (Pitching) o'tkazish", "Muzokaralar olib borish madaniyati"] },

        // --- ADMISSION CATEGORY (10 COURSES) ---
        { id: 22, title: "Digital SAT Math Mastery (800 Score Strategy)", category: "admission", catName: "Admission & SAT", desc: "Digital SAT Matematika bo'limining barcha formulalari, Desmos kalkulyatoridan samarali foydalanish hamda 800 bal algebrasi.", duration: "6 Hafta", level: "Amaliy", icon: "fa-solid fa-calculator", badge: "Top 800", modules: ["Algebra va Linear Equations tezkor yechimlari", "Desmos Graphing Calculator sirlari va layfhaklar", "Advanced Math, Geometry va Trigonometry", "Digital SAT modullari simulyatsiyasi va vaqtni tejash"] },
        { id: 23, title: "Digital SAT Reading & Writing", category: "admission", catName: "Admission & SAT", desc: "Digital SAT Reading matnlari tahlili, Vocabulary in Context hamda Grammatika qoidalarining 100% yechimlari.", duration: "6 Hafta", level: "Advanced", icon: "fa-solid fa-pen-fancy", badge: "Intensiv", modules: ["Craft and Structure savol turlarini yechish", "Information and Ideas matnli tahlil", "Expression of Ideas va Standart English Conventions", "SAT lug'at bazasi va tezkor matn o'qish"] },
        { id: 24, title: "US College Application Essay (Personal Statement)", category: "admission", catName: "Admission & SAT", desc: "AQSh Top universitetlariga qabul komissiyasini hayratda qoldiruvchi shaxsiy insho (Common App Essay) yozish.", duration: "4 Hafta", level: "Admission", icon: "fa-solid fa-feather-pointed", badge: "Insho", modules: ["Shaxsiy voqea (Storytelling) tanlash va reja tuzish", "Common App 7 ta prompti bo mezonlar", "Supplemental Essay (Nega aynan ushbu universitet?) yozish", "Ekspert ko'rigi va insho tahriri"] },
        { id: 25, title: "Full-Ride Scholarship Application Blueprint", category: "admission", catName: "Admission & SAT", desc: "AQSh, Yevropa va Osiyo universitetlaridan 100% ta'lim va yashash xarajatlarini qoplovchi grantlarni yutish strategiyasi.", duration: "5 Hafta", level: "Grantlar", icon: "fa-solid fa-trophy", badge: "100% Grant", modules: ["Need-Based va Merit-Based grantlar farqi", "Stipendiyali dasturlarni qidirish (Need-Blind unilar)", "Moliyaviy hujjatlar va insholarni tayyorlash", "Muvaffaqiyatli grant olgan talabalar tajribasi"] },
        { id: 26, title: "Common App & Financial Aid (CSS Profile / FAFSA)", category: "admission", catName: "Admission & SAT", desc: "Common Application platformasida profil ochish, barcha bo'limlarni xatosiz to'ldirish va CSS Profile hujjati.", duration: "3 Hafta", level: "Amaliy Hujjat", icon: "fa-solid fa-file-invoice-dollar", badge: "Hujjatlar", modules: ["Common App hisobini yaratish va sozlash", "Honors va Extracurricular activities bo'limi to'ldirish", "CSS Profile orqali oilaviy daromad hujjatlarini topshirish", "Universitetlarga portal orqali kod yuborish"] },
        { id: 27, title: "Ivy League & Top 50 Global University Strategy", category: "admission", catName: "Admission & SAT", desc: "Harvard, MIT, Stanford va Yevropa Top 50 oliygohlariga topshiruvchi talabalar uchun maxsus portfolio strategiyasi.", duration: "4 Hafta", level: "Premium", icon: "fa-solid fa-crown", badge: "Ivy League", modules: ["Holistic Review (Yaxlit baholash) tizimi talablari", "Noyob Spike Factor (Shaxsiy ustunlik) yaratish", "Early Decision (ED) va Early Action (EA) strategiyalari", "Xalqaro olimpiada va tadqiqot portfoliosi"] },
        { id: 28, title: "Extracurricular Profile Building & Leadership", category: "admission", catName: "Admission & SAT", desc: "Darsdan tashqari faoliyatlar, ijtimoiy loyihalar, startap va ko'ngillilik ishlarini tashkil etish hamda taqdim etish.", duration: "4 Hafta", level: "Liderlik", icon: "fa-solid fa-people-roof", badge: "Portfolio", modules: ["Nol kapital bilan nodavlat loyiha (NGO) boshlash", "Liderlik va tashabbuskorlikni hujjatlashtirish", "Tadqiqot maqolalarini chop etish", "Activity List bo'limida harakat fe'llari (Action Verbs)"] },
        { id: 29, title: "Recommendation Letters & Academic CV Building", category: "admission", catName: "Admission & SAT", desc: "O'qituvchilardan kuchli tavsiyanomalar olish hamda xalqaro standartdagi Akademik Rezyume (CV) shakllantirish.", duration: "2 Hafta", level: "Boshlang'ich", icon: "fa-solid fa-address-card", badge: "CV & Letter", modules: ["O'qituvchilarga tavsiyanoma so'rovi xatini yozish", "Recommendation Letter andozalari va sirlari", "Harvard formatidagi 1 sahifalik Resume/CV tuzish", "LinkedIn profilini akademik sozlash"] },
        { id: 30, title: "European & Asian Fully Funded Scholarships", category: "admission", catName: "Admission & SAT", desc: "Turkiye Burslari, MEXT (Yaponiya), GKS (Koreya), Stipendium Hungaricum va Italy Grants ga ariza topshirish.", duration: "4 Hafta", level: "Xalqaro Grant", icon: "fa-solid fa-earth-americas", badge: "Davlat Grantlari", modules: ["Turkiye Burslari muloqot va insho tayyorlovi", "GKS va MEXT elchixona yo'li bo'yicha bosqichlar", "Stipendium Hungaricum ariza portali", "Yevropa universitetlarida bepul ta'lim imkoniyatlari"] },
        { id: 31, title: "Mock Admission Interview & Case Study Practice", category: "admission", catName: "Admission & SAT", desc: "Universitet bitiruvchilari hamda qabul komissiyasi bilan yuzma-yuz intervyu simulyatsiyasi va tayyorgarligi.", duration: "2 Hafta", level: "Amaliy Intervyu", icon: "fa-solid fa-user-tie", badge: "Intervyu", modules: ["Ko'p beriladigan 20 ta admission savollari", "Shaxsiy qadriyatlar va motivatsiyani ko'rsatish", "Intervyuerga to'g'ri savollar berish madaniyati", "Jonli Zoom intervyu simulyatsiyasi"] }
    ];


    /* ==========================================
       5. UI RENDER ENGINE FOR COURSES
       ========================================== */
    const coursesGrid = document.getElementById('coursesGrid');
    const searchInput = document.getElementById('courseSearchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const filterTabs = document.getElementById('filterTabs');
    const noResultsMsg = document.getElementById('noResultsMsg');
    const resetFilterBtn = document.getElementById('resetFilterBtn');

    let currentCategory = 'all';
    let currentSearchQuery = '';

    function renderCourses() {
        if (!coursesGrid) return;

        const filtered = coursesData.filter(course => {
            const matchesCategory = (currentCategory === 'all') || (course.category === currentCategory);
            const query = currentSearchQuery.toLowerCase().trim();
            const matchesSearch = !query || 
                course.title.toLowerCase().includes(query) ||
                course.desc.toLowerCase().includes(query) ||
                course.catName.toLowerCase().includes(query) ||
                course.badge.toLowerCase().includes(query);
            
            return matchesCategory && matchesSearch;
        });

        coursesGrid.innerHTML = '';

        if (filtered.length === 0) {
            noResultsMsg.style.display = 'block';
        } else {
            noResultsMsg.style.display = 'none';
            filtered.forEach(course => {
                const card = createCourseCard(course);
                coursesGrid.appendChild(card);
            });

            if (window.gsap) {
                gsap.fromTo('.course-card', 
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, ease: 'power2.out' }
                );
            }
            initTiltPhysics();
        }
    }

    function createCourseCard(course) {
        const card = document.createElement('div');
        card.className = 'course-card liquid-card tilt-card';
        const catClass = course.category === 'ai' ? 'cat-ai' : (course.category === 'ielts' ? 'cat-ielts' : 'cat-admission');
        const catImg = course.category === 'ai' ? 'assets/images/ai_hero.jpg' : (course.category === 'ielts' ? 'assets/images/founder.jpg' : 'assets/images/university_grant.jpg');

        card.innerHTML = `
            <div class="course-top">
                <div class="course-thumb-wrapper">
                    <img src="${catImg}" alt="${course.title}" class="course-thumb-img" loading="lazy">
                    <div class="course-thumb-overlay"></div>
                    <span class="category-tag ${catClass} thumb-tag">${course.catName}</span>
                </div>
                <div class="course-meta">
                    <span class="course-badge"><i class="${course.icon}"></i> ${course.badge}</span>
                </div>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-desc">${course.desc}</p>
                <div class="course-details-mini">
                    <span class="detail-item"><i class="fa-regular fa-clock"></i> ${course.duration}</span>
                    <span class="detail-item"><i class="fa-solid fa-layer-group"></i> ${course.level}</span>
                </div>
            </div>
            <div class="course-actions">
                <button class="btn btn-sm btn-secondary w-full view-details-btn liquid-glass-btn" data-id="${course.id}">
                    <i class="fa-solid fa-circle-info"></i> Tafsilotlar
                </button>
                <button class="btn btn-sm btn-primary btn-liquid open-lead-modal-btn" data-course="${course.title}">
                    <i class="fa-solid fa-pen-to-square"></i> <span class="btn-text">Ariza</span>
                    <div class="liquid-wave"></div>
                </button>
            </div>
        `;

        const detailsBtn = card.querySelector('.view-details-btn');
        detailsBtn.addEventListener('click', () => openCourseModal(course));

        return card;
    }

    if (filterTabs) {
        filterTabs.addEventListener('click', (e) => {
            const btn = e.target.closest('.tab-btn');
            if (!btn) return;

            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentCategory = btn.dataset.category;
            renderCourses();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value;
            clearSearchBtn.style.display = currentSearchQuery ? 'block' : 'none';
            renderCourses();
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            currentSearchQuery = '';
            clearSearchBtn.style.display = 'none';
            renderCourses();
        });
    }

    if (resetFilterBtn) {
        resetFilterBtn.addEventListener('click', () => {
            currentCategory = 'all';
            currentSearchQuery = '';
            if (searchInput) searchInput.value = '';
            if (clearSearchBtn) clearSearchBtn.style.display = 'none';
            document.querySelectorAll('.tab-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.category === 'all');
            });
            renderCourses();
        });
    }

    renderCourses();


    /* ==========================================
       6. INTERACTIVE GRANT CALCULATOR
       ========================================== */
    const calcLevel = document.getElementById('calcLevel');
    const calcIelts = document.getElementById('calcIelts');
    const calcGoal = document.getElementById('calcGoal');
    const resGrantProgress = document.getElementById('resGrantProgress');
    const resGrantPercent = document.getElementById('resGrantPercent');
    const resGrantAmount = document.getElementById('resGrantAmount');
    const resCoursesList = document.getElementById('resCoursesList');
    const calcApplyBtn = document.getElementById('calcApplyBtn');

    function calculateGrantEligibility() {
        if (!calcLevel || !calcIelts || !calcGoal) return;

        const level = calcLevel.value;
        const ielts = parseFloat(calcIelts.value);
        const goal = calcGoal.value;

        let basePercent = 60;
        let amount = "$60,000 - $100,000";
        let recommended = [];

        if (level === 'b2' || level === 'c1') basePercent += 20;
        if (ielts >= 7.0) basePercent += 15;
        if (basePercent > 98) basePercent = 98;

        if (ielts >= 7.5) {
            amount = "$180,000 - $250,000+ (Full-Ride)";
        } else if (ielts >= 7.0) {
            amount = "$120,000 - $180,000 (Tuition + Stipend)";
        }

        if (goal === 'ai') {
            recommended = [coursesData[0], coursesData[1], coursesData[5]];
        } else if (goal === 'sat') {
            recommended = [coursesData[21], coursesData[22], coursesData[26]];
        } else {
            recommended = [coursesData[10], coursesData[23], coursesData[24]];
        }

        if (resGrantProgress) resGrantProgress.style.width = `${basePercent}%`;
        if (resGrantPercent) resGrantPercent.innerText = `${basePercent}%`;
        if (resGrantAmount) resGrantAmount.innerText = amount;

        if (resCoursesList) {
            resCoursesList.innerHTML = recommended.map(c => `<li><i class="fa-solid fa-check"></i> ${c.title}</li>`).join('');
        }

        if (calcApplyBtn) {
            calcApplyBtn.dataset.course = `Grant Calculator (${basePercent}% Grant - ${recommended[0].title})`;
        }
    }

    if (calcLevel) calcLevel.addEventListener('change', calculateGrantEligibility);
    if (calcIelts) calcIelts.addEventListener('change', calculateGrantEligibility);
    if (calcGoal) calcGoal.addEventListener('change', calculateGrantEligibility);

    calculateGrantEligibility();


    /* ==========================================
       7. VIDEO PREVIEW MODAL WIDGET
       ========================================== */
    const videoModal = document.getElementById('videoModal');
    const videoIframe = document.getElementById('videoIframe');
    const videoModalTitle = document.getElementById('videoModalTitle');
    const videoModalCloseBtn = document.getElementById('videoModalCloseBtn');

    function openVideoModal(title = 'Tayanch Video Prevyusi', videoId = 'VBvxHIkvjeo') {
        if (!videoModal || !videoIframe) return;

        if (videoModalTitle) videoModalTitle.innerText = title;
        videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeVideoModal() {
        if (!videoModal) return;
        videoModal.classList.remove('active');
        if (videoIframe) videoIframe.src = '';
        document.body.style.overflow = '';
    }

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.open-video-modal-btn');
        if (btn) {
            const title = btn.dataset.title || 'Tayanch Platformasi Prevyusi';
            const videoId = btn.dataset.video || 'VBvxHIkvjeo';
            openVideoModal(title, videoId);
        }
    });

    if (videoModalCloseBtn) videoModalCloseBtn.addEventListener('click', closeVideoModal);
    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) closeVideoModal();
        });
    }


    /* ==========================================
       8. COURSE MODAL PREVIEW ENGINE
       ========================================== */
    const courseModal = document.getElementById('courseModal');
    const modalContent = document.getElementById('modalContent');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    function openCourseModal(course) {
        if (!courseModal || !modalContent) return;

        const catClass = course.category === 'ai' ? 'cat-ai' : (course.category === 'ielts' ? 'cat-ielts' : 'cat-admission');
        const modulesList = course.modules.map(m => `<li><i class="fa-solid fa-circle-check"></i> ${m}</li>`).join('');

        modalContent.innerHTML = `
            <span class="category-tag ${catClass} modal-header-tag">${course.catName}</span>
            <h2 class="modal-course-title">${course.title}</h2>
            <p style="color: var(--text-muted); margin-bottom: 1.25rem;">${course.desc}</p>
            
            <div class="course-details-mini" style="margin-bottom: 1.5rem;">
                <span class="detail-item"><i class="fa-regular fa-clock"></i> Davomiyligi: <strong>${course.duration}</strong></span>
                <span class="detail-item"><i class="fa-solid fa-signal"></i> Daraja: <strong>${course.level}</strong></span>
            </div>

            <h4 style="font-size: 1.1rem; color: #fff; margin-bottom: 0.75rem;">O'quv Modullari Mundarijasi:</h4>
            <ul class="modal-modules-list">
                ${modulesList}
            </ul>

            <div style="margin-top: 2rem; display: flex; gap: 1rem; flex-wrap: wrap;">
                <button class="btn btn-primary btn-glow btn-liquid w-full open-lead-modal-btn" data-course="${course.title}">
                    <span class="btn-text"><i class="fa-solid fa-pen-to-square"></i> Kursga Ariza Qoldirish</span>
                    <div class="liquid-wave"></div>
                </button>
                <a href="general-english-beginner.html" class="btn btn-secondary w-full">
                    <i class="fa-solid fa-graduation-cap" style="color: var(--primary-cyan);"></i> Interaktiv Darslik Hub (6 Aspects & Practice)
                </a>
                <button class="btn btn-secondary w-full open-video-modal-btn" data-title="${course.title} - Video Namuna" data-video="VBvxHIkvjeo">
                    <i class="fa-solid fa-circle-play" style="color: var(--primary-cyan);"></i> Video Namuna Darsini Ko'rish
                </button>
            </div>
        `;

        courseModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        const innerLeadBtn = modalContent.querySelector('.open-lead-modal-btn');
        if (innerLeadBtn) {
            innerLeadBtn.addEventListener('click', () => {
                closeModal(courseModal);
                openLeadModal(course.title);
            });
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', () => closeModal(courseModal));
    if (courseModal) {
        courseModal.addEventListener('click', (e) => {
            if (e.target === courseModal) closeModal(courseModal);
        });
    }


    /* ==========================================
       9. LEAD APPLICATION FORM & TELEGRAM INTEGRATION
       ========================================== */
    const leadModal = document.getElementById('leadModal');
    const leadModalCloseBtn = document.getElementById('leadModalCloseBtn');
    const leadForm = document.getElementById('leadForm');
    const leadCourseSelect = document.getElementById('leadCourseSelect');
    const formSuccessMsg = document.getElementById('formSuccessMsg');

    if (leadCourseSelect) {
        coursesData.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.title;
            opt.textContent = `[${c.catName}] ${c.title}`;
            leadCourseSelect.appendChild(opt);
        });
    }

    function openLeadModal(preselectedCourse = 'Barcha Kurslar (Maslahat)') {
        if (!leadModal) return;

        if (leadCourseSelect) {
            for (let i = 0; i < leadCourseSelect.options.length; i++) {
                if (leadCourseSelect.options[i].value === preselectedCourse || leadCourseSelect.options[i].text.includes(preselectedCourse)) {
                    leadCourseSelect.selectedIndex = i;
                    break;
                }
            }
        }

        if (formSuccessMsg) formSuccessMsg.style.display = 'none';
        if (leadForm) leadForm.style.display = 'flex';

        leadModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.open-lead-modal-btn');
        if (btn) {
            const courseName = btn.dataset.course || 'Barcha Kurslar';
            openLeadModal(courseName);
        }
    });

    if (leadModalCloseBtn) leadModalCloseBtn.addEventListener('click', () => closeModal(leadModal));
    if (leadModal) {
        leadModal.addEventListener('click', (e) => {
            if (e.target === leadModal) closeModal(leadModal);
        });
    }

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('leadName').value.trim();
            const phone = document.getElementById('leadPhone').value.trim();
            const phoneErrorMsg = document.getElementById('phoneErrorMsg');
            const telegram = document.getElementById('leadTelegram').value.trim() || 'Kiritilmadi';
            const selectedCourse = leadCourseSelect ? leadCourseSelect.value : 'Tayanch Kurslari';

            // Uzbekistan Phone validation regex
            const phoneRegex = /^(\+?998)?[\s-]?\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
            if (!phoneRegex.test(phone)) {
                if (phoneErrorMsg) phoneErrorMsg.style.display = 'block';
                document.getElementById('leadPhone').focus();
                return;
            } else {
                if (phoneErrorMsg) phoneErrorMsg.style.display = 'none';
            }

            const text = encodeURIComponent(
                `📥 YANGI ARIZA - TAYANCH\n\n` +
                `👤 Ism: ${name}\n` +
                `📞 Tel: ${phone}\n` +
                `💬 Telegram: ${telegram}\n` +
                `📚 Tanlangan kurs: ${selectedCourse}`
            );
            const telegramUrl = `https://t.me/tayanch_go?text=${text}`;

            leadForm.style.display = 'none';
            if (formSuccessMsg) formSuccessMsg.style.display = 'block';

            setTimeout(() => {
                window.open(telegramUrl, '_blank', 'noopener,noreferrer');
            }, 800);
        });
    }

    // WCAG Escape Key Modal Listener
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal-overlay.active');
            if (activeModal) closeModal(activeModal);
        }
    });


    /* ==========================================
       10. PROOF SLIDER ENGINE
       ========================================== */
    const proofCards = document.querySelectorAll('.proof-card');
    const slidePrevBtn = document.getElementById('slidePrevBtn');
    const slideNextBtn = document.getElementById('slideNextBtn');
    const sliderDots = document.getElementById('sliderDots');

    let currentSlide = 0;

    function showSlide(index) {
        if (!proofCards.length) return;
        if (index < 0) currentSlide = proofCards.length - 1;
        else if (index >= proofCards.length) currentSlide = 0;
        else currentSlide = index;

        proofCards.forEach((card, i) => {
            card.classList.toggle('active', i === currentSlide);
        });

        if (sliderDots) {
            const dots = sliderDots.querySelectorAll('.dot-item');
            dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
        }
    }

    if (slidePrevBtn) slidePrevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    if (slideNextBtn) slideNextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    if (sliderDots) {
        sliderDots.addEventListener('click', (e) => {
            const dot = e.target.closest('.dot-item');
            if (dot) showSlide(parseInt(dot.dataset.index));
        });
    }

    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 6000);


    /* ==========================================
       11. COUNTDOWN TIMER ENGINE (Real Target Deadline)
       ========================================== */
    const cdDays = document.getElementById('cdDays');
    const cdHours = document.getElementById('cdHours');
    const cdMins = document.getElementById('cdMins');
    const cdSecs = document.getElementById('cdSecs');

    let savedTarget = localStorage.getItem('tayanch_qabul_deadline');
    if (!savedTarget) {
        savedTarget = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
        localStorage.setItem('tayanch_qabul_deadline', savedTarget);
    }
    let targetTime = parseInt(savedTarget, 10);

    function updateCountdown() {
        const now = new Date().getTime();
        const diff = targetTime - now;

        if (diff <= 0) return;

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        if (cdDays) cdDays.innerText = String(d).padStart(2, '0');
        if (cdHours) cdHours.innerText = String(h).padStart(2, '0');
        if (cdMins) cdMins.innerText = String(m).padStart(2, '0');
        if (cdSecs) cdSecs.innerText = String(s).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();


    /* ==========================================
       12. INTERACTIVE FLUID RIPPLE CANVAS ENGINE
       ========================================== */
    const rippleCanvas = document.getElementById('fluidRippleCanvas');
    if (rippleCanvas) {
        const rCtx = rippleCanvas.getContext('2d');
        let ripples = [];

        function resizeRippleCanvas() {
            rippleCanvas.width = window.innerWidth;
            rippleCanvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeRippleCanvas);
        resizeRippleCanvas();

        function addRipple(x, y) {
            ripples.push({
                x,
                y,
                radius: 5,
                maxRadius: 80 + Math.random() * 40,
                alpha: 0.6,
                speed: 2 + Math.random() * 1.5,
                color: Math.random() > 0.5 ? '0, 242, 254' : '168, 85, 247'
            });
        }

        window.addEventListener('mousemove', (e) => {
            if (Math.random() < 0.25) {
                addRipple(e.clientX, e.clientY);
            }
        });

        window.addEventListener('touchmove', (e) => {
            if (e.touches[0] && Math.random() < 0.3) {
                addRipple(e.touches[0].clientX, e.touches[0].clientY);
            }
        });

        function animateRipples() {
            rCtx.clearRect(0, 0, rippleCanvas.width, rippleCanvas.height);

            for (let i = ripples.length - 1; i >= 0; i--) {
                const r = ripples[i];
                r.radius += r.speed;
                r.alpha *= 0.94;

                rCtx.beginPath();
                rCtx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
                rCtx.strokeStyle = `rgba(${r.color}, ${r.alpha})`;
                rCtx.lineWidth = 1.5;
                rCtx.stroke();

                if (r.alpha < 0.01 || r.radius > r.maxRadius) {
                    ripples.splice(i, 1);
                }
            }

            requestAnimationFrame(animateRipples);
        }

        animateRipples();
    }


    /* ==========================================
    /* ==========================================
       13. SCROLLCRAFT 3D TILT PHYSICS FOR CARDS
       ========================================== */
    function initTiltPhysics() {
        const tiltCards = document.querySelectorAll('.tilt-card');
        tiltCards.forEach(card => {
            if (!card.querySelector('.tilt-glare')) {
                const glare = document.createElement('div');
                glare.className = 'tilt-glare';
                card.appendChild(glare);
            }

            const glare = card.querySelector('.tilt-glare');

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.01)`;
                if (glare) {
                    glare.style.opacity = '1';
                    glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0) 65%)`;
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)`;
                if (glare) glare.style.opacity = '0';
            });
        });
    }

    initTiltPhysics();


    /* ==========================================
       14. TOP GLOBAL SCROLL PROGRESS INDICATOR
       ========================================== */
    const globalScrollProgress = document.getElementById('globalScrollProgress');
    function updateScrollProgress() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (docHeight > 0 && globalScrollProgress) {
            const progress = (scrollTop / docHeight) * 100;
            globalScrollProgress.style.width = `${progress}%`;
        }
    }
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();


    /* ==========================================
       15. HERO MORPHING LIQUID 3D CANVAS ENGINE
       ========================================== */
    const canvas = document.getElementById('heroFrameCanvas');
    const indicatorBar = document.getElementById('indicatorBar');
    const frameCountLabel = document.getElementById('frameCountLabel');
    const frameStepLabel = document.getElementById('frameStepLabel');

    if (canvas) {
        const ctx = canvas.getContext('2d');
        const TOTAL_FRAMES = 60;
        let currentFrameIndex = 0;
        let timeOffset = 0;

        function resizeCanvas() {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width * (window.devicePixelRatio || 1);
            canvas.height = rect.height * (window.devicePixelRatio || 1);
            drawFrame(currentFrameIndex);
        }

        window.addEventListener('resize', resizeCanvas);

        function drawFrame(frameIdx) {
            const width = canvas.width;
            const height = canvas.height;
            const cx = width / 2;
            const cy = height / 2;
            const progress = frameIdx / (TOTAL_FRAMES - 1);

            ctx.clearRect(0, 0, width, height);

            const bgGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, width * 0.65);
            bgGrad.addColorStop(0, 'rgba(0, 242, 254, 0.14)');
            bgGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.08)');
            bgGrad.addColorStop(1, 'rgba(5, 6, 9, 1)');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            timeOffset += 0.025;
            const baseRadius = Math.min(width, height) * 0.27;
            const rotationAngle = progress * Math.PI * 2.5 + timeOffset * 0.5;

            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(rotationAngle * 0.5);
            ctx.beginPath();
            const ringR = baseRadius * (1.3 + Math.sin(timeOffset + progress * Math.PI) * 0.08);
            ctx.ellipse(0, 0, ringR, ringR * 0.45, progress * Math.PI, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(0, 242, 254, 0.5)';
            ctx.lineWidth = 2 * (window.devicePixelRatio || 1);
            ctx.setLineDash([10, 6]);
            ctx.stroke();
            ctx.restore();

            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(-rotationAngle * 0.7);
            ctx.beginPath();
            const ringR2 = baseRadius * (1.15 + Math.cos(timeOffset * 0.8) * 0.06);
            ctx.ellipse(0, 0, ringR2 * 1.1, ringR2 * 0.65, -progress * Math.PI, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)';
            ctx.lineWidth = 2 * (window.devicePixelRatio || 1);
            ctx.stroke();
            ctx.restore();

            const nodeCount = 42;
            const nodes = [];

            for (let i = 0; i < nodeCount; i++) {
                const phi = Math.acos(-1 + (2 * i) / nodeCount);
                const theta = Math.sqrt(nodeCount * Math.PI) * phi + rotationAngle;

                const liquidWave = Math.sin(4 * phi + 3 * theta + timeOffset) * 14;
                const rDynamic = baseRadius + liquidWave;

                const x3d = rDynamic * Math.cos(theta) * Math.sin(phi);
                const y3d = rDynamic * Math.sin(theta) * Math.sin(phi);
                const z3d = rDynamic * Math.cos(phi);

                const scale = 300 / (300 + z3d);
                const x2d = cx + x3d * scale;
                const y2d = cy + y3d * scale;

                nodes.push({ x: x2d, y: y2d, z: z3d, scale });
            }

            ctx.lineWidth = 1 * (window.devicePixelRatio || 1);
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
                    if (dist < baseRadius * 0.85) {
                        const alpha = (1 - dist / (baseRadius * 0.85)) * 0.4;
                        ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }

            nodes.sort((a, b) => a.z - b.z);
            nodes.forEach(node => {
                const nodeRadius = Math.max(2.4, 5.5 * node.scale);
                const alpha = (node.z + baseRadius) / (baseRadius * 2);

                ctx.beginPath();
                ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
                ctx.fillStyle = node.z > 0 ? `rgba(0, 242, 254, ${0.45 + alpha * 0.55})` : `rgba(168, 85, 247, ${0.35 + alpha * 0.55})`;
                ctx.shadowColor = 'rgba(0, 242, 254, 0.85)';
                ctx.shadowBlur = 14;
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            ctx.fillStyle = '#ffffff';
            ctx.font = `800 ${17 * (window.devicePixelRatio || 1)}px 'Outfit', sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('TAYANCH', cx, cy);

            if (indicatorBar) indicatorBar.style.width = `${((frameIdx + 1) / TOTAL_FRAMES) * 100}%`;
            if (frameCountLabel) frameCountLabel.innerText = `Frame ${frameIdx + 1} / ${TOTAL_FRAMES}`;
            
            if (frameStepLabel) {
                if (progress < 0.33) {
                    frameStepLabel.innerText = 'STAGE 1: AI LIQUID PRODUCTIVITY';
                } else if (progress < 0.66) {
                    frameStepLabel.innerText = 'STAGE 2: IELTS BAND 7.0+ FLUID MASTERY';
                } else {
                    frameStepLabel.innerText = 'STAGE 3: TOP UNIVERSITY ADMISSION';
                }
            }
        }

        resizeCanvas();

        if (window.gsap && window.ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);

            const frameObj = { frame: 0 };
            gsap.to(frameObj, {
                frame: TOTAL_FRAMES - 1,
                snap: "frame",
                ease: "none",
                scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5,
                    onUpdate: (self) => {
                        currentFrameIndex = Math.round(frameObj.frame);
                        drawFrame(currentFrameIndex);
                    }
                }
            });
        }
    }


    /* ==========================================
       16. GSAP SCROLL TRIGGER REVEALS & MOBILE DRAWER
       ========================================== */
    if (window.gsap && window.ScrollTrigger) {
        gsap.from('.hero-fade', {
            opacity: 0,
            y: 35,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out'
        });

        gsap.utils.toArray('.gsap-reveal').forEach(elem => {
            gsap.fromTo(elem, 
                { opacity: 0, y: 45, scale: 0.96 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.85,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: elem,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    }

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerCloseBtn = document.getElementById('drawerCloseBtn');

    if (mobileMenuBtn && mobileDrawer) {
        mobileMenuBtn.addEventListener('click', () => mobileDrawer.classList.add('open'));
    }
    if (drawerCloseBtn && mobileDrawer) {
        drawerCloseBtn.addEventListener('click', () => mobileDrawer.classList.remove('open'));
    }
    document.querySelectorAll('.drawer-link').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileDrawer) mobileDrawer.classList.remove('open');
        });
    });

});
