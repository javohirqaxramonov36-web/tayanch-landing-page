/* ==========================================================================
   Tayanch Landing Page — Master JavaScript Engine (Optimized Edition)
   Features: 
   - 31 Course Catalog with Search & Category Filtering
   - Lead Application Form Modal (A2) + Telegram Submission
   - Proof & Certificate Slider (A3)
   - Countdown Timer & Top Sticky Announcement
   - 3D Tilt Physics & Ambient Background Particle Canvas
   - GSAP ScrollTrigger Frame Animation Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. 31 COURSES DATA STORE
       ========================================== */
    const coursesData = [
        // --- AI CATEGORY (10 COURSES) ---
        {
            id: 1,
            title: "Practical AI for Daily Productivity",
            category: "ai",
            catName: "Sun'iy Intelekt (AI)",
            desc: "ChatGPT, Claude va Perplexity vositalari orqali kunlik vazifalaringizni 5x tezlashtirish va unumdorlikni oshirish sirlari.",
            duration: "3 Hafta",
            level: "Boshlang'ich",
            icon: "fa-solid fa-bolt",
            badge: "Top Trend",
            modules: [
                "Prompt Engineering asoslari va qoliplari",
                "ChatGPT bilan hujjatlar va elektron pochtani avtomatlashtirish",
                "Perplexity AI bilan tezkor akademik va bozor tadqiqotlari",
                "Kunlik rejalashtirish va sun'iy AI assistent yaratish"
            ]
        },
        {
            id: 2,
            title: "ChatGPT & Advanced Prompt Engineering",
            category: "ai",
            catName: "Sun'iy Intelekt (AI)",
            desc: "Mukammal promptlar yozish, Custom GPTs yaratish hamda kognitiv topshiriqlarni sun'iy intelektga topshirish.",
            duration: "4 Hafta",
            level: "O'rta",
            icon: "fa-solid fa-code",
            badge: "Intensiv",
            modules: [
                "Few-Shot va Chain-of-Thought Prompting texnikalari",
                "Shaxsiy Custom GPT assistentlarini kodsiz yaratish",
                "Katta hajmdagi matnlar va kitoblarni umumlashtirish",
                "AI xatolarini (Hallucinations) oldini olish va tekshirish"
            ]
        },
        {
            id: 3,
            title: "Midjourney & AI Visual Content Creation",
            category: "ai",
            catName: "Sun'iy Intelekt (AI)",
            desc: "Professional dizayn, fotorealistik tasvirlar va visual presentation materiallarini AI yordamida yaratish.",
            duration: "3 Hafta",
            level: "Boshlang'ich",
            icon: "fa-solid fa-palette",
            badge: "Kreativ",
            modules: [
                "Midjourney v6 parametrlari va stil aralashmalari",
                "Fotorealistik portretlar va mahsulot dizaynlari",
                "DALL-E 3 va Canva AI bilan ijtimoiy tarmoq bannerlari",
                "AI orqali SMM va brending uchun vizual kontent"
            ]
        },
        {
            id: 4,
            title: "AI Tools for Academic Research & Writing",
            category: "ai",
            catName: "Sun'iy Intelekt (AI)",
            desc: "Ilmiy maqolalar, dissertatsiya va insholarni tahlil qilish, iqtiboslar bilan ishlash hamda tadqiqot AI vositalari.",
            duration: "4 Hafta",
            level: "Akademik",
            icon: "fa-solid fa-book-open-reader",
            badge: "Talabalar uchun",
            modules: [
                "Consensus va Elicit AI bilan ilmiy maqolalarni izlash",
                "Litmaps yordamida adabiyotlar sharhini (Literature Review) tuzish",
                "Grammarly AI va Quillbot orqali akademik ingliz tilini takomillashtirish",
                "Plagiat va AI detection bilan ishlash strategiyasi"
            ]
        },
        {
            id: 5,
            title: "Python + AI Foundations for Beginners",
            category: "ai",
            catName: "Sun'iy Intelekt (AI)",
            desc: "Dasturlash tajribasisiz Python asoslarini o'rganish va OpenAI API orqali birinchi AI loyihangizni yoqish.",
            duration: "6 Hafta",
            level: "Boshlang'ich",
            icon: "fa-brands fa-python",
            badge: "Praktikum",
            modules: [
                "Python sintaksisi va ma'lumotlar tuzilmasi",
                "OpenAI API kalitini ulash va sorov yuborish",
                "Streamlit yordamida AI Web App interfeysi yaratish",
                "Shaxsiy AI chatbot loyihasini joylashtirish (Deploy)"
            ]
        },
        {
            id: 6,
            title: "Automation with Claude & Make/Zapier",
            category: "ai",
            catName: "Sun'iy Intelekt (AI)",
            desc: "Biznes va ish jarayonlarini kod yozmasdan avtomatlashtirish: Telegram botlar, CRM va elektron pochta integratsiyasi.",
            duration: "4 Hafta",
            level: "O'rta",
            icon: "fa-solid fa-gears",
            badge: "Biznes AI",
            modules: [
                "Make.com va Zapier platformasi asoslari",
                "Telegram botga Claude API ulash",
                "Google Sheets va AI ma'lumotlar oqimini zanjirlash",
                "Avtomatik mijozlar xabarnomasi tizimini yoqish"
            ]
        },
        {
            id: 7,
            title: "AI-Powered Data Analysis & Excel",
            category: "ai",
            catName: "Sun'iy Intelekt (AI)",
            desc: "Katta ma'lumotlar bazasini AI va Code Interpreter orqali daqiqalar ichida tahlil qilish hamda grafiklar tuzish.",
            duration: "3 Hafta",
            level: "Amaliy",
            icon: "fa-solid fa-chart-pie",
            badge: "Analitika",
            modules: [
                "ChatGPT Advanced Data Analysis (Code Interpreter)",
                "Excel va Google Sheets formulalarini AI yordamida avtomatik tuzish",
                "Moliyaviy va sotuv statistikalarini vizuallashtirish",
                "Trendlarni bashorat qilish va hisobotlar tayyorlash"
            ]
        },
        {
            id: 8,
            title: "Content Creation with AI (Copywriting & Video)",
            category: "ai",
            catName: "Sun'iy Intelekt (AI)",
            desc: "Kopirayting, AI diktorlar (HeyGen, ElevenLabs) va qisqa videolar (Shorts/Reels) yaratish bosqichlari.",
            duration: "3 Hafta",
            level: "Boshlang'ich",
            icon: "fa-solid fa-video",
            badge: "SMM & Media",
            modules: [
                "Kopirayting ssenariylari va ilgak matnlar yaratish",
                "ElevenLabs orqali tabiiy ovozli AI audiolarni shakllantirish",
                "HeyGen va CapCut AI bilan professional video montaj",
                "YouTube va Instagram uchun kontent konveyerini yoqish"
            ]
        },
        {
            id: 9,
            title: "Generative AI for Students & Scholars",
            category: "ai",
            catName: "Sun'iy Intelekt (AI)",
            desc: "Imtihonlarga tayyorgarlik, konspektlar tuzish va murakkab mavzularni tushuntiruvchi AI repetitor vositalari.",
            duration: "3 Hafta",
            level: "Boshlang'ich",
            icon: "fa-solid fa-graduation-cap",
            badge: "Ta'lim",
            modules: [
                "PDF va ma'ruzalardan avtomatik Flashcard va testlar yasash",
                "Feynman metodologiyasini ChatGPT orqali qo'llash",
                "Xorijiy tillarni AI so'zlashuvchi bilan o'rganish",
                "Vaqtni samarali boshqarish va taqvim AI tizimi"
            ]
        },
        {
            id: 10,
            title: "AI Coding Assistant (Cursor & Copilot)",
            category: "ai",
            catName: "Sun'iy Intelekt (AI)",
            desc: "Cursor IDE, GitHub Copilot va AI yordamida 10x tezroq kod yozish hamda veb-sayt va ilovalar yaratish.",
            duration: "4 Hafta",
            level: "Amaliy",
            icon: "fa-solid fa-laptop-code",
            badge: "Dasturchilar",
            modules: [
                "Cursor IDE o'rnatish va sozlash",
                "Koddagi buglarni AI bilan sekundlarda topish",
                "Refactoring va koding arxitekturasini yaxshilash",
                "Full-stack kichik ilovalarni AI bilan noldan qurish"
            ]
        },

        // --- IELTS & ENGLISH CATEGORY (11 COURSES) ---
        {
            id: 11,
            title: "IELTS Writing Task 2 Masterclass (Band 7.5+)",
            category: "ielts",
            catName: "IELTS & Ingliz tili",
            desc: "Insho turlari, aniq struktura andozalari, akademik lug'at hamda Band 7.5+ uchun grammatik murakkablik.",
            duration: "4 Hafta",
            level: "Intermediate+",
            icon: "fa-solid fa-pen-nib",
            badge: "Top Natija",
            modules: [
                "Opinion, Discussion, Advantage/Disadvantage insholar qolipi",
                "Paragraf mantiqiy bog'lanishi (Coherence & Cohesion)",
                "Band 7+ Akademik Collocation va sinonimlar",
                "Real insho namunalarini tahlil qilish va baholash"
            ]
        },
        {
            id: 12,
            title: "IELTS Speaking Confidence & Accent Booster",
            category: "ielts",
            catName: "IELTS & Ingliz tili",
            desc: "Part 1, 2, 3 uchun ravon gapirish texnikasi, hayajonni yengish va imtihon oluvchini jalb qilish strategiyasi.",
            duration: "3 Hafta",
            level: "Barcha Darajalar",
            icon: "fa-solid fa-comments",
            badge: "Amaliy So'zlashuv",
            modules: [
                "Part 2 Cue Card bo'yicha 1 minutda struktura tuzish",
                "Part 3 abstrakt savollarga chuqur javob berish",
                "Fluency va Hesitation o'rtasidagi muvozanat",
                "Mock speaking simulyatsiyasi va fikr-mulohazalar"
            ]
        },
        {
            id: 13,
            title: "IELTS Reading Speed & Keyword Tracking Tech",
            category: "ielts",
            catName: "IELTS & Ingliz tili",
            desc: "Passage 1, 2, 3 ni 60 daqiqada tugatish, True/False/Not Given va Headings savollarini xatosiz yechish sirlari.",
            duration: "3 Hafta",
            level: "Intermediate+",
            icon: "fa-solid fa-eye",
            badge: "Tezkor Usul",
            modules: [
                "Skimming va Scanning texnikasini avtomatga chiqarish",
                "Paraphrase kalit so'zlarni tezkor payqash",
                "Matching Headings va Summary Completion xatosiz strategiyasi",
                "Vaqtni to'g'ri taqsimlash metodikasi"
            ]
        },
        {
            id: 14,
            title: "IELTS Listening Full Prep & Accent Mastery",
            category: "ielts",
            catName: "IELTS & Ingliz tili",
            desc: "Britaniya, Avstraliya va Amerika aksentlarini tushunish, diqqatni jamlash va tuzoqli savollarni yengish.",
            duration: "3 Hafta",
            level: "Barcha Darajalar",
            icon: "fa-solid fa-headphones",
            badge: "Intensiv",
            modules: [
                "Part 3 & 4 ko'p tanlovli (Multiple Choice) savollar",
                "Distractors va chalg'ituvchi iboralarni aniqlash",
                "Map & Diagram labeling topshiriqlari",
                "Audiolarni 1.25x tezlikda mashq qilish usuli"
            ]
        },
        {
            id: 15,
            title: "IELTS Intensive 30-Day Sprint (Bootcamp)",
            category: "ielts",
            catName: "IELTS & Ingliz tili",
            desc: "Imtihonga 1 oy qolganda barcha 4 ta seksiyani mukammallashtiruvchi kunlik intensiv tayyorgarlik kursi.",
            duration: "4 Hafta",
            level: "B2 / C1",
            icon: "fa-solid fa-fire",
            badge: "Bootcamp",
            modules: [
                "Kunlik 4 soatlik amaliy mashg'ulotlar rejasi",
                "Writing Task 1 Chart, Map va Process tasvirlash",
                "Full Mock Test topshirish va natijalar diagnostikasi",
                "Imtihon kuni psixologik tayyorgarlik"
            ]
        },
        {
            id: 16,
            title: "General English B1 to B2 Accelerator",
            category: "ielts",
            catName: "IELTS & Ingliz tili",
            desc: "Grammatika bo'shliqlarini yopish, so'z boyligini 2000+ ga oshirish va erkin muloqot bosqichiga o'tish.",
            duration: "6 Hafta",
            level: "Intermediate",
            icon: "fa-solid fa-arrow-up-right-dots",
            badge: "Asosiy",
            modules: [
                "Complex Sentences va Conditionals grammatikasi",
                "Kunlik so'zlashuv iboralari va idiomalari",
                "Tinglab tushunish va matnlarni qayta so'zlab berish",
                "Interaktiv debatlar va guruh muloqotlari"
            ]
        },
        {
            id: 17,
            title: "Upper-Intermediate to Advanced C1 Grammar",
            category: "ielts",
            catName: "IELTS & Ingliz tili",
            desc: "Inversion, Subjunctive mood, Participle clauses va oliy darajadagi sintaksis tuzilmalarini o'zlashtirish.",
            duration: "5 Hafta",
            level: "Advanced C1",
            icon: "fa-solid fa-spell-check",
            badge: "Grammatika",
            modules: [
                "C1 darajadagi Grammatical Range & Accuracy",
                "Akademik va rasmiy insholarda sintaksis",
                "Common Error Elimination (keng tarqalgan xatolar)",
                "Style va Tone muvozanatini saqlash"
            ]
        },
        {
            id: 18,
            title: "Academic Vocabulary & Collocations for IELTS",
            category: "ielts",
            catName: "IELTS & Ingliz tili",
            desc: "IELTS mavzulari bo'yicha (Atrof-muhit, Texnologiya, Ta'lim, Jamiyat) top 1000 ta akademik so'zlar jamlanmasi.",
            duration: "3 Hafta",
            level: "Intermediate+",
            icon: "fa-solid fa-book-bookmark",
            badge: "Lug'at",
            modules: [
                "Topic-based Collocations va Phrasal Verbs",
                "Spelling xatolarini nolgacha kamaytirish",
                "Synonym Mapping texnikasi",
                "Anki flashcards yordamida uzoq muddatli xotira"
            ]
        },
        {
            id: 19,
            title: "IELTS Mock Test Analysis & Individual Feedback",
            category: "ielts",
            catName: "IELTS & Ingliz tili",
            desc: "Haqiqiy imtihon muhiti, individual test tahlili hamda har bir talabaga shaxsiy rivojlanish xaritasi.",
            duration: "2 Hafta",
            level: "Barcha Darajalar",
            icon: "fa-solid fa-clipboard-check",
            badge: "Tahlil",
            modules: [
                "2 ta to'liq IELTS Mock Test topshirish",
                "Writing insholaringizga battafsil ekspert sharhi",
                "Speaking audio yozuvlarini tahlil qilish",
                "Kuchsiz nuqtalarni bartaraf etish rejasi"
            ]
        },
        {
            id: 20,
            title: "English Pronunciation & Native Accent Training",
            category: "ielts",
            catName: "IELTS & Ingliz tili",
            desc: "IPA fonetika belgilari, Intonatsiya, Connected Speech va talaffuzdagi o'zbekcha aksentni yoqotish mashqlari.",
            duration: "3 Hafta",
            level: "Barcha Darajalar",
            icon: "fa-solid fa-microphone-lines",
            badge: "Talaffuz",
            modules: [
                "Vowel va Consonant tovushlarining to'g'ri artikulatsiyasi",
                "Connected Speech (Linking, Intonation, Stress)",
                "Shadowing texnikasi orqali diksiya o'stirish",
                "Ovozsiz va jarangli tovushlar ustida ishlash"
            ]
        },
        {
            id: 21,
            title: "Professional Business English & Pitching",
            category: "ielts",
            catName: "IELTS & Ingliz tili",
            desc: "Xalqaro kompaniyalar uchun rezyume yozish, intervyulardan o'tish hamda prezentatsiyalar o'tkazish ingliz tili.",
            duration: "4 Hafta",
            level: "Intermediate+",
            icon: "fa-solid fa-briefcase",
            badge: "Kariyerist",
            modules: [
                "Professional Email va taklifnomalar yozish",
                "Job Interview savollariga STAR usulida javob",
                "Biznes taqdimotlar (Pitching) o'tkazish",
                "Muzokaralar olib borish madaniyati"
            ]
        },

        // --- ADMISSION & SAT CATEGORY (10 COURSES) ---
        {
            id: 22,
            title: "Digital SAT Math Mastery (800 Score Strategy)",
            category: "admission",
            catName: "Admission & SAT",
            desc: "Digital SAT Matematika bo'limining barcha formulalari, Desmos kalkulyatoridan samarali foydalanish hamda 800 bal algebrasi.",
            duration: "6 Hafta",
            level: "Amaliy",
            icon: "fa-solid fa-calculator",
            badge: "Top 800",
            modules: [
                "Algebra va Linear Equations tezkor yechimlari",
                "Desmos Graphing Calculator sirlari va layfhaklar",
                "Advanced Math, Geometry va Trigonometry",
                "Digital SAT modullari simulyatsiyasi va vaqtni tejash"
            ]
        },
        {
            id: 23,
            title: "Digital SAT Reading & Writing",
            category: "admission",
            catName: "Admission & SAT",
            desc: "Digital SAT Reading matnlari tahlili, Vocabulary in Context hamda Grammatika qoidalarining 100% yechimlari.",
            duration: "6 Hafta",
            level: "Advanced",
            icon: "fa-solid fa-pen-fancy",
            badge: "Intensiv",
            modules: [
                "Craft and Structure savol turlarini yechish",
                "Information and Ideas matnli tahlil",
                "Expression of Ideas va Standart English Conventions",
                "SAT lug'at bazasi va tezkor matn o'qish"
            ]
        },
        {
            id: 24,
            title: "US College Application Essay (Personal Statement)",
            category: "admission",
            catName: "Admission & SAT",
            desc: "AQSh Top universitetlariga qabul komissiyasini hayratda qoldiruvchi shaxsiy insho (Common App Essay) yozish.",
            duration: "4 Hafta",
            level: "Admission",
            icon: "fa-solid fa-feather-pointed",
            badge: "Insho",
            modules: [
                "Shaxsiy voqea (Storytelling) tanlash va reja tuzish",
                "Common App 7 ta prompti bo mezonlar",
                "Supplemental Essay (Nega aynan ushbu universitet?) yozish",
                "Ekspert ko'rigi va insho tahriri"
            ]
        },
        {
            id: 25,
            title: "Full-Ride Scholarship Application Blueprint",
            category: "admission",
            catName: "Admission & SAT",
            desc: "AQSh, Yevropa va Osiyo universitetlaridan 100% ta'lim va yashash xarajatlarini qoplovchi grantlarni yutish strategiyasi.",
            duration: "5 Hafta",
            level: "Grantlar",
            icon: "fa-solid fa-trophy",
            badge: "100% Grant",
            modules: [
                "Need-Based va Merit-Based grantlar farqi",
                "Stipendiyali dasturlarni qidirish (Need-Blind unilar)",
                "Moliyaviy hujjatlar va insholarni tayyorlash",
                "Muvaffaqiyatli grant olgan talabalar tajribasi"
            ]
        },
        {
            id: 26,
            title: "Common App & Financial Aid (CSS Profile / FAFSA)",
            category: "admission",
            catName: "Admission & SAT",
            desc: "Common Application platformasida profil ochish, barcha bo'limlarni xatosiz to'ldirish va CSS Profile hujjati.",
            duration: "3 Hafta",
            level: "Amaliy Hujjat",
            icon: "fa-solid fa-file-invoice-dollar",
            badge: "Hujjatlar",
            modules: [
                "Common App hisobini yaratish va sozlash",
                "Honors va Extracurricular activities bo'limi to'ldirish",
                "CSS Profile orqali oilaviy daromad hujjatlarini topshirish",
                "Universitetlarga portal orqali kod yuborish"
            ]
        },
        {
            id: 27,
            title: "Ivy League & Top 50 Global University Strategy",
            category: "admission",
            catName: "Admission & SAT",
            desc: "Harvard, MIT, Stanford va Yevropa Top 50 oliygohlariga topshiruvchi talabalar uchun maxsus portfolio strategiyasi.",
            duration: "4 Hafta",
            level: "Premium",
            icon: "fa-solid fa-crown",
            badge: "Ivy League",
            modules: [
                "Holistic Review (Yaxlit baholash) tizimi talablari",
                "Noyob Spike Factor (Shaxsiy ustunlik) yaratish",
                "Early Decision (ED) va Early Action (EA) strategiyalari",
                "Xalqaro olimpiada va tadqiqot portfoliosi"
            ]
        },
        {
            id: 28,
            title: "Extracurricular Profile Building & Leadership",
            category: "admission",
            catName: "Admission & SAT",
            desc: "Darsdan tashqari faoliyatlar, ijtimoiy loyihalar, startap va ko'ngillilik ishlarini tashkil etish hamda taqdim etish.",
            duration: "4 Hafta",
            level: "Liderlik",
            icon: "fa-solid fa-people-roof",
            badge: "Portfolio",
            modules: [
                "Nol kapital bilan nodavlat loyiha (NGO) boshlash",
                "Liderlik va tashabbuskorlikni hujjatlashtirish",
                "Tadqiqot maqolalarini chop etish",
                "Activity List bo'limida harakat fe'llari (Action Verbs)"
            ]
        },
        {
            id: 29,
            title: "Recommendation Letters & Academic CV Building",
            category: "admission",
            catName: "Admission & SAT",
            desc: "O'qituvchilardan kuchli tavsiyanomalar olish hamda xalqaro standartdagi Akademik Rezyume (CV) shakllantirish.",
            duration: "2 Hafta",
            level: "Boshlang'ich",
            icon: "fa-solid fa-address-card",
            badge: "CV & Letter",
            modules: [
                "O'qituvchilarga tavsiyanoma so'rovi xatini yozish",
                "Recommendation Letter andozalari va sirlari",
                "Harvard formatidagi 1 sahifalik Resume/CV tuzish",
                "LinkedIn profilini akademik sozlash"
            ]
        },
        {
            id: 30,
            title: "European & Asian Fully Funded Scholarships",
            category: "admission",
            catName: "Admission & SAT",
            desc: "Turkiye Burslari, MEXT (Yaponiya), GKS (Koreya), Stipendium Hungaricum va Italy Grants ga ariza topshirish.",
            duration: "4 Hafta",
            level: "Xalqaro Grant",
            icon: "fa-solid fa-earth-americas",
            badge: "Davlat Grantlari",
            modules: [
                "Turkiye Burslari muloqot va insho tayyorlovi",
                "GKS va MEXT elchixona yo'li bo'yicha bosqichlar",
                "Stipendium Hungaricum ariza portali",
                "Yevropa universitetlarida bepul ta'lim imkoniyatlari"
            ]
        },
        {
            id: 31,
            title: "Mock Admission Interview & Case Study Practice",
            category: "admission",
            catName: "Admission & SAT",
            desc: "Universitet bitiruvchilari hamda qabul komissiyasi bilan yuzma-yuz intervyu simulyatsiyasi va tayyorgarligi.",
            duration: "2 Hafta",
            level: "Amaliy Intervyu",
            icon: "fa-solid fa-user-tie",
            badge: "Intervyu",
            modules: [
                "Ko'p beriladigan 20 ta admission savollari",
                "Shaxsiy qadriyatlar va motivatsiyani ko'rsatish",
                "Intervyuerga to'g'ri savollar berish madaniyati",
                "Jonli Zoom intervyu simulyatsiyasi"
            ]
        }
    ];


    /* ==========================================
       2. UI RENDER ENGINE FOR COURSES
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

            // Re-trigger GSAP reveal & 3D tilt initialization
            if (window.gsap) {
                gsap.fromTo('.course-card', 
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out' }
                );
            }
            initTiltPhysics();
        }
    }

    function createCourseCard(course) {
        const card = document.createElement('div');
        card.className = 'course-card tilt-card';

        const catClass = course.category === 'ai' ? 'cat-ai' : (course.category === 'ielts' ? 'cat-ielts' : 'cat-admission');

        card.innerHTML = `
            <div class="course-top">
                <div class="course-meta">
                    <span class="category-tag ${catClass}">${course.catName}</span>
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
                <button class="btn btn-sm btn-secondary w-full view-details-btn" data-id="${course.id}">
                    <i class="fa-solid fa-circle-info"></i> Tafsilotlar
                </button>
                <button class="btn btn-sm btn-primary open-lead-modal-btn" data-course="${course.title}">
                    <i class="fa-solid fa-pen-to-square"></i> Ariza
                </button>
            </div>
        `;

        const detailsBtn = card.querySelector('.view-details-btn');
        detailsBtn.addEventListener('click', () => openCourseModal(course));

        return card;
    }

    // Category Tabs Switching
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
       3. COURSE MODAL PREVIEW ENGINE
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
                <button class="btn btn-primary btn-glow w-full open-lead-modal-btn" data-course="${course.title}">
                    <i class="fa-solid fa-pen-to-square"></i> Kursga Ariza Qoldirish
                </button>
                <a href="https://t.me/tayanch_go" target="_blank" class="btn btn-secondary w-full">
                    <i class="fa-brands fa-telegram"></i> Telegram Orqali Savol Berish
                </a>
            </div>
        `;

        courseModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Bind lead modal buttons inside course modal
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
       4. LEAD APPLICATION MODAL FORM & TELEGRAM INTEGRATION (A2)
       ========================================== */
    const leadModal = document.getElementById('leadModal');
    const leadModalCloseBtn = document.getElementById('leadModalCloseBtn');
    const leadForm = document.getElementById('leadForm');
    const leadCourseSelect = document.getElementById('leadCourseSelect');
    const formSuccessMsg = document.getElementById('formSuccessMsg');

    // Populate course select options
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
            // Find option matching course or default
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

    // Global listener for open-lead-modal-btn
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.open-lead-modal-btn');
        if (btn) {
            const courseName = btn.dataset.course || 'Barcha Kurslar (Maslahat)';
            openLeadModal(courseName);
        }
    });

    if (leadModalCloseBtn) leadModalCloseBtn.addEventListener('click', () => closeModal(leadModal));
    if (leadModal) {
        leadModal.addEventListener('click', (e) => {
            if (e.target === leadModal) closeModal(leadModal);
        });
    }

    // Handle Lead Form Submission
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('leadName').value.trim();
            const phone = document.getElementById('leadPhone').value.trim();
            const telegram = document.getElementById('leadTelegram').value.trim() || 'Kiritilmadi';
            const selectedCourse = leadCourseSelect ? leadCourseSelect.value : 'Tayanch Kurslari';

            // Construct Telegram Pre-filled Message URL
            const text = encodeURIComponent(
                `📥 YANGI ARIZA - TAYANCH\n\n` +
                `👤 Ism: ${name}\n` +
                `📞 Tel: ${phone}\n` +
                `💬 Telegram: ${telegram}\n` +
                `📚 Tanlangan kurs: ${selectedCourse}`
            );
            const telegramUrl = `https://t.me/tayanch_go?text=${text}`;

            // Show success animation
            leadForm.style.display = 'none';
            if (formSuccessMsg) formSuccessMsg.style.display = 'block';

            // Open Telegram after 1 second delay
            setTimeout(() => {
                window.open(telegramUrl, '_blank');
            }, 1000);
        });
    }


    /* ==========================================
       5. PROOF & CERTIFICATE INTERACTIVE SLIDER (A3)
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

    // Auto-advance slider every 6 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 6000);


    /* ==========================================
       6. COUNTDOWN TIMER ENGINE
       ========================================== */
    const cdDays = document.getElementById('cdDays');
    const cdHours = document.getElementById('cdHours');
    const cdMins = document.getElementById('cdMins');
    const cdSecs = document.getElementById('cdSecs');

    // 2 days countdown target
    let targetTime = new Date().getTime() + (2 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000);

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
       7. AMBIENT BACKGROUND PARTICLES CANVAS
       ========================================== */
    const bgCanvas = document.getElementById('bgParticlesCanvas');
    if (bgCanvas) {
        const ctx = bgCanvas.getContext('2d');
        let particles = [];

        function resizeBgCanvas() {
            bgCanvas.width = window.innerWidth;
            bgCanvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeBgCanvas);
        resizeBgCanvas();

        for (let i = 0; i < 40; i++) {
            particles.push({
                x: Math.random() * bgCanvas.width,
                y: Math.random() * bgCanvas.height,
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                alpha: Math.random() * 0.5 + 0.2
            });
        }

        function animateBgParticles() {
            ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > bgCanvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > bgCanvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 242, 254, ${p.alpha})`;
                ctx.shadowColor = 'rgba(0, 242, 254, 0.5)';
                ctx.shadowBlur = 8;
                ctx.fill();
            });

            requestAnimationFrame(animateBgParticles);
        }

        animateBgParticles();
    }


    /* ==========================================
       8. 3D TILT PHYSICS FOR CARDS
       ========================================== */
    function initTiltPhysics() {
        const tiltCards = document.querySelectorAll('.tilt-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -8;
                const rotateY = ((x - centerX) / centerX) * 8;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
            });
        });
    }

    initTiltPhysics();


    /* ==========================================
       9. HERO HTML5 3D CANVAS FRAME ANIMATION ENGINE
       ========================================== */
    const canvas = document.getElementById('heroFrameCanvas');
    const indicatorBar = document.getElementById('indicatorBar');
    const frameCountLabel = document.getElementById('frameCountLabel');
    const frameStepLabel = document.getElementById('frameStepLabel');

    if (canvas) {
        const ctx = canvas.getContext('2d');
        const TOTAL_FRAMES = 60;
        let currentFrameIndex = 0;

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

            const bgGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, width * 0.6);
            bgGrad.addColorStop(0, 'rgba(0, 242, 254, 0.08)');
            bgGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.04)');
            bgGrad.addColorStop(1, 'rgba(6, 7, 10, 1)');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            const baseRadius = Math.min(width, height) * 0.26 * (1 + Math.sin(progress * Math.PI) * 0.15);
            const rotationAngle = progress * Math.PI * 2.5;

            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(rotationAngle * 0.5);
            ctx.beginPath();
            ctx.ellipse(0, 0, baseRadius * 1.4, baseRadius * 0.5, progress * Math.PI, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(0, 242, 254, 0.4)';
            ctx.lineWidth = 2 * (window.devicePixelRatio || 1);
            ctx.setLineDash([8, 6]);
            ctx.stroke();
            ctx.restore();

            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(-rotationAngle * 0.8);
            ctx.beginPath();
            ctx.ellipse(0, 0, baseRadius * 1.2, baseRadius * 0.7, -progress * Math.PI, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
            ctx.lineWidth = 2 * (window.devicePixelRatio || 1);
            ctx.stroke();
            ctx.restore();

            const nodeCount = 36;
            const nodes = [];

            for (let i = 0; i < nodeCount; i++) {
                const phi = Math.acos(-1 + (2 * i) / nodeCount);
                const theta = Math.sqrt(nodeCount * Math.PI) * phi + rotationAngle;

                const x3d = baseRadius * Math.cos(theta) * Math.sin(phi);
                const y3d = baseRadius * Math.sin(theta) * Math.sin(phi);
                const z3d = baseRadius * Math.cos(phi);

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
                        const alpha = (1 - dist / (baseRadius * 0.85)) * 0.35;
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
                const nodeRadius = Math.max(2, 4.5 * node.scale);
                const alpha = (node.z + baseRadius) / (baseRadius * 2);

                ctx.beginPath();
                ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
                ctx.fillStyle = node.z > 0 ? `rgba(0, 242, 254, ${0.4 + alpha * 0.6})` : `rgba(168, 85, 247, ${0.3 + alpha * 0.5})`;
                ctx.shadowColor = 'rgba(0, 242, 254, 0.8)';
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            ctx.fillStyle = '#ffffff';
            ctx.font = `800 ${16 * (window.devicePixelRatio || 1)}px 'Outfit', sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('TAYANCH', cx, cy);

            if (indicatorBar) indicatorBar.style.width = `${((frameIdx + 1) / TOTAL_FRAMES) * 100}%`;
            if (frameCountLabel) frameCountLabel.innerText = `Frame ${frameIdx + 1} / ${TOTAL_FRAMES}`;
            
            if (frameStepLabel) {
                if (progress < 0.33) {
                    frameStepLabel.innerText = 'STAGE 1: AI POWERED LEARNING';
                } else if (progress < 0.66) {
                    frameStepLabel.innerText = 'STAGE 2: IELTS BAND 7.0+ MASTERY';
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
       10. GSAP SCROLL REVEALS & MOBILE DRAWER
       ========================================== */
    if (window.gsap && window.ScrollTrigger) {
        gsap.from('.hero-fade', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });

        gsap.utils.toArray('.gsap-reveal').forEach(elem => {
            gsap.from(elem, {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
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
