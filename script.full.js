
// =========================================================================
// TAYANCH SECURITY & RESILIENCE ENGINE (Enterprise Null-Safety & Sanitizer)
// =========================================================================

// 1. XSS Himoyasi (HTML Sanitizer)
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// 2. Zamonaviy Glass Toast xabarnoma tizimi
function showToast(message, type = 'info') {
  let toast = document.getElementById('tayanchToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'tayanchToast';
    toast.className = 'tayanch-toast';
    document.body.appendChild(toast);
  }
  const icons = {
    success: '<i class="fa-solid fa-circle-check" style="color:#3ecf8e;"></i>',
    error: '<i class="fa-solid fa-triangle-exclamation" style="color:#ff6b6b;"></i>',
    info: '<i class="fa-solid fa-circle-info" style="color:#00f2fe;"></i>'
  };
  toast.className = `tayanch-toast ${type} show`;
  toast.innerHTML = `${icons[type] || icons.info} <span>${escapeHtml(message)}</span>`;
  
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// 3. Xavfsiz LocalStorage Wrapper (Crash-proof)
const SafeStorage = {
  get: function(key, defaultVal = null) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : defaultVal;
    } catch (e) {
      console.warn(`[SafeStorage] get failed for key: ${key}`, e);
      return defaultVal;
    }
  },
  set: function(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
      return true;
    } catch (e) {
      console.warn(`[SafeStorage] set failed for key: ${key}`, e);
      return false;
    }
  }
};

// 4. Null-Safe Event Listener Helper
function safeListen(selector, event, handler) {
  const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  if (el) {
    el.addEventListener(event, function(e) {
      try { handler.call(this, e); } catch (err) { console.warn(`[safeListen] Error in ${event} on ${selector}:`, err); }
    });
  }
}

// 5. Forma Validatsiyasi (Ariza Qoldirish)
document.addEventListener('DOMContentLoaded', () => {
  const leadForms = document.querySelectorAll('form, .lead-form-box');
  leadForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = form.querySelector('input[name="name"], input[type="text"]');
      const phoneInput = form.querySelector('input[name="phone"], input[type="tel"]');
      
      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      
      if (!name || name.length < 2) {
        showToast("Iltimos, to'liq ismingizni kiriting.", "error");
        if (nameInput) nameInput.focus();
        return;
      }
      
      const phoneClean = phone.replace(/[^0-9+]/g, '');
      if (!phoneClean || phoneClean.length < 7) {
        showToast("Iltimos, to'g'ri telefon raqamingizni kiriting.", "error");
        if (phoneInput) phoneInput.focus();
        return;
      }
      
      showToast("Arizangiz muvaffaqiyatli qabul qilindi! Tez orada bog'lanamiz.", "success");
      form.reset();
      
      // Agar modal ichida bo'lsa, 1.5 soniyadan keyin yopish
      setTimeout(() => {
        const modal = form.closest('.modal-overlay');
        if (modal) modal.classList.remove('active');
      }, 1500);
    });
  });
});

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
       OPTIMIZED (2026-09-02): barcha quiz qadamlarini dinamik aylantirish.
       Avval faqat 2 qadam qo'llab-quvvatlanar edi (3-8 chi savollar
       HTML da bor edi, lekin JS ularni ko'rsatmasdi). Endi querySelectorAll
       orqali barcha .quiz-step lar ketma-ket ko'rsatiladi, CEFR darajasi
       to'g'ri javoblar nisbatidan hisoblanadi.
       ========================================== */
    let quizScore = 0;
    let quizCurrent = 0;
    const quizSteps = Array.prototype.slice.call(document.querySelectorAll('.quiz-step'));
    const quizResultBox = document.getElementById('quizResultBox');
    const quizResultLevel = document.getElementById('quizResultLevel');
    const quizScoreNote = document.getElementById('quizScoreNote');
    const quizResultText = document.getElementById('quizResultText');
    const quizRetryBtn = document.getElementById('quizRetryBtn');

    function showQuizStep(idx) {
        quizSteps.forEach(function (s, i) {
            s.style.display = (i === idx) ? 'block' : 'none';
        });
    }

    function finishQuiz() {
        const total = quizSteps.length;
        if (quizResultBox) quizResultBox.style.display = 'block';
        if (quizScoreNote) {
            quizScoreNote.textContent = total + ' tadan ' + quizScore + ' ta to\'g\'ri javob';
        }
        if (quizResultLevel) {
            let level, text;
            if (quizScore >= Math.ceil(total * 0.85)) {
                level = 'CEFR C1 (Advanced)';
                text = 'IELTS Academic Writing C1 va Advanced AI Research kurslari tavsiya etiladi.';
            } else if (quizScore >= Math.ceil(total * 0.6)) {
                level = 'CEFR B2 (Upper-Intermediate)';
                text = 'IELTS Writing Task 2 (Band 7.5+) va Practical AI kurslari eng mos.';
            } else if (quizScore >= Math.ceil(total * 0.35)) {
                level = 'CEFR B1 (Intermediate)';
                text = 'General English B1→B2 Accelerator va AI Foundations kurslari mos.';
            } else {
                level = 'CEFR A2 (Elementary)';
                text = 'General English Foundation va ChatGPT boshlang\'ich kurslari tavsiya etiladi.';
            }
            quizResultLevel.textContent = 'Darajangiz: ' + level;
            if (quizResultText) quizResultText.textContent = text;
        }
        if (quizSteps[quizCurrent]) quizSteps[quizCurrent].style.display = 'none';
    }

    document.querySelectorAll('.quiz-opt-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const score = parseInt(btn.dataset.score || '0', 10);
            quizScore += score;
            if (quizCurrent < quizSteps.length - 1) {
                quizCurrent += 1;
                showQuizStep(quizCurrent);
            } else {
                finishQuiz();
            }
        });
    });

    if (quizRetryBtn) {
        quizRetryBtn.addEventListener('click', function () {
            quizScore = 0;
            quizCurrent = 0;
            if (quizResultBox) quizResultBox.style.display = 'none';
            showQuizStep(0);
        });
    }

    showQuizStep(0);

    /* ==========================================
       3.1 DYNAMIC GRANT & COURSE ELIGIBILITY CALCULATOR
       ========================================== */
    function updateGrantCalculator() {
        const calcLevel = document.getElementById('calcLevel');
        const calcIelts = document.getElementById('calcIelts');
        const calcGoal = document.getElementById('calcGoal');
        const resGrantProgress = document.getElementById('resGrantProgress');
        const resGrantPercent = document.getElementById('resGrantPercent');
        const resGrantAmount = document.getElementById('resGrantAmount');
        const resCoursesList = document.getElementById('resCoursesList');

        if (!calcLevel || !calcIelts || !calcGoal) return;

        const level = calcLevel.value;
        const ielts = parseFloat(calcIelts.value) || 6.5;
        const goal = calcGoal.value;

        let scorePercent = 50;
        let minAmount = 20000;
        let maxAmount = 60000;
        let courses = [];

        if (level === 'a2') {
            scorePercent += 10;
            courses.push("General English B1 to B2 Accelerator");
        } else if (level === 'b1') {
            scorePercent += 20;
            courses.push("General English B1 to B2 Accelerator");
        } else if (level === 'b2') {
            scorePercent += 30;
            courses.push("IELTS Writing Task 2 Masterclass (Band 7.5+)");
        } else if (level === 'c1') {
            scorePercent += 40;
            courses.push("Upper-Intermediate to Advanced C1 Grammar");
        }

        if (ielts >= 7.5) {
            scorePercent += 25;
            minAmount = 140000;
            maxAmount = 220000;
        } else if (ielts >= 7.0) {
            scorePercent += 15;
            minAmount = 80000;
            maxAmount = 140000;
        } else {
            scorePercent += 5;
            minAmount = 30000;
            maxAmount = 80000;
        }

        if (goal === 'ai') {
            courses.push("ChatGPT & Advanced Prompt Engineering");
            courses.push("AI Tools for Academic Research & Writing");
        } else if (goal === 'sat') {
            courses.push("Digital SAT Math Mastery (800 Score Strategy)");
            courses.push("Digital SAT Reading & Writing");
        } else {
            courses.push("US College Application Essay (Personal Statement)");
            courses.push("Full-Ride Scholarship Application Blueprint");
        }

        scorePercent = Math.min(Math.max(scorePercent, 45), 98);

        if (resGrantProgress) resGrantProgress.style.width = `${scorePercent}%`;
        if (resGrantPercent) resGrantPercent.textContent = `${scorePercent}%`;
        if (resGrantAmount) resGrantAmount.textContent = `$${minAmount.toLocaleString()} - $${maxAmount.toLocaleString()}`;
        if (resCoursesList) {
            resCoursesList.innerHTML = courses.map(c => {
                const isPS = /Personal Statement/i.test(c);
                const psLink = isPS ? ` <a href="admission-essay-personal-statement.html" target="_blank" rel="noopener noreferrer" style="color:#00f2fe;text-decoration:underline;">(Bepul dars sahifasi &rarr;)</a>` : '';
                return `<li><i class="fa-solid fa-check"></i> ${c}${psLink}</li>`;
            }).join('');
        }

        const calcApplyBtn = document.getElementById('calcApplyBtn');
        if (calcApplyBtn) {
            calcApplyBtn.dataset.course = 'Grant Kalkulyatori natijasi (' + scorePercent + '% moslik)';
        }
    }

    const calcLevelEl = document.getElementById('calcLevel');
    const calcIeltsEl = document.getElementById('calcIelts');
    const calcGoalEl = document.getElementById('calcGoal');

    if (calcLevelEl && calcIeltsEl && calcGoalEl) {
        calcLevelEl.addEventListener('change', updateGrantCalculator);
        calcIeltsEl.addEventListener('change', updateGrantCalculator);
        calcGoalEl.addEventListener('change', updateGrantCalculator);
        updateGrantCalculator();
    }


    /* ==========================================
       4. COURSES DATA STORE & VIP ACCESS ENGINE
       ========================================== */
    let currentUserEmail = localStorage.getItem('tayanch_user_email') || 'student@tayanch.edu.uz';
    let isVIPUser = true; // Platform is 100% open access for all users

    /* Kurslar katalogi endi YAGONA manbadan — courses-data.js — olinadi.
       Bu yerda massiv nusxasi qolmagan, shuning uchun son hech qachon
       ikki xil bo'lib qolmaydi (index '31' / filter '29' / courses '30'
       muammosi shu bilan butunlay bartaraf etiladi). */
    const coursesData = (window.TayanchCourses && window.TayanchCourses.data) || [];

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
        syncCourseCounts();

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
                const courseCards = document.querySelectorAll('.course-card');
                if (courseCards.length > 0) {
                    gsap.fromTo(courseCards,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, ease: 'power2.out' }
                    );
                }
            }
            initTiltPhysics();
        }
    }

    /* YAGONA MANBA: barcha kurs soni hisoblagichlari courses-data.js ichidagi
       window.TayanchCourses.sync() orqali yangilanadi. Bu yerda hech qanday
       raqam qayta hisoblanmaydi — aks holda ikki manba paydo bo'lib, ular
       mos kelmay qolishi mumkin (avvalgi '31' / '29' / '30' xatosi aynan
       shundan kelib chiqqan edi). */
    function syncCourseCounts() {
        if (window.TayanchCourses && typeof window.TayanchCourses.sync === 'function') {
            window.TayanchCourses.sync();
        }
    }

    function createCourseCard(course) {
        const card = document.createElement('div');
        card.className = 'course-card liquid-card tilt-card';
        const catClass = course.category === 'ai' ? 'cat-ai' : (course.category === 'ielts' ? 'cat-ielts' : 'cat-admission');
        const catImg = course.category === 'ai' ? 'assets/images/ai_hero.jpg' : (course.category === 'ielts' ? 'assets/images/founder.jpg' : 'assets/images/university_grant.jpg');

        const priceBadgeHtml = isVIPUser 
            ? `<span class="detail-item" style="color:#00f2fe; font-weight:700;"><i class="fa-solid fa-lock-open"></i> VIP Sinov Ochiq</span>`
            : `<span class="detail-item" style="color:#fbbf24; font-weight:700;"><i class="fa-solid fa-tag"></i> ${course.price}</span>`;

        const actionBtnHtml = isVIPUser
            ? `<a href="general-english-beginner.html" class="btn btn-sm btn-primary btn-liquid w-full">
                    <i class="fa-solid fa-graduation-cap"></i> <span class="btn-text">Darslik Hub'iga Kirish (VIP)</span>
                    <div class="liquid-wave"></div>
               </a>`
            : `<button class="btn btn-sm btn-primary btn-liquid open-lead-modal-btn" data-course="${course.title}">
                    <i class="fa-solid fa-cart-shopping"></i> <span class="btn-text">Kursni Xarid Qilish (${course.price})</span>
                    <div class="liquid-wave"></div>
               </button>`;

        const hubBtnHtml = course.hubHref
            ? `<a href="${course.hubHref}" class="btn btn-sm btn-secondary w-full">
                   <i class="fa-solid fa-feather-pointed"></i> <span class="btn-text">${course.hubLabel || 'Qoʻllanma'}</span>
               </a>`
            : '';

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
                    ${priceBadgeHtml}
                </div>
            </div>
            <div class="course-actions" style="gap:0.5rem; flex-direction:column;">
                <button class="btn btn-sm btn-secondary w-full view-details-btn liquid-glass-btn" data-id="${course.id}">
                    <i class="fa-solid fa-circle-info"></i> Tafsilotlar
                </button>
                ${hubBtnHtml}
                ${actionBtnHtml}
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
       OPTIMIZED (2026-09-02): dublikat calculateGrantEligibility() olib
       tashlandi. Barcha hisob-kitob 3.1-bo'limdagi updateGrantCalculator()
       funksiyasida birlashtirildi (grant foizi, miqdori va kurs tavsiyalari).
       Ikki funksiya bir xil select'larga bog'langan va ikkinchisi birinchisining
       natijasini ustiga yozar, natijada ziddiyat kelib chiqardi.
       ========================================== */


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
                ${(course.hubHref || course.lessonUrl) ? `<a href="${course.hubHref || course.lessonUrl}" class="btn btn-secondary w-full" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-feather-pointed" style="color: var(--primary-cyan);"></i> To\'liq darsni ochish</a>` : `<a href="general-english-beginner.html" class="btn btn-secondary w-full"><i class="fa-solid fa-graduation-cap" style="color: var(--primary-cyan);"></i> Interaktiv Darslik Hub (6 Aspects &amp; Practice)</a>` }
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

    // WCAG Focus Trap for active modal (Tab / Shift+Tab cycling)
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        const activeModal = document.querySelector('.modal-overlay.active');
        if (!activeModal) return;
        const focusables = activeModal.querySelectorAll('a[href], button:not([disabled]), textarea, input:not([disabled]), select, [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
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

    /* OPTIMIZED (2026-09-02): avval setInterval doim aylanardi, slider ekranda
       bo'lmasa ham. Endi IntersectionObserver bilan faqat ko'rinib turganda
       ishlaydi; prefers-reduced-motion da avto-almashtirish butunlay o'chadi. */
    (function initSliderAutoplay() {
        if (!proofCards.length) return;
        const reduceMotion = window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) return;

        const sliderRoot = document.querySelector('.proof-slider-wrapper') ||
                           document.getElementById('proofTrack') ||
                           (proofCards[0] && proofCards[0].parentElement);
        if (!sliderRoot || !('IntersectionObserver' in window)) {
            setInterval(() => showSlide(currentSlide + 1), 6000);
            return;
        }

        let timerId = null;

        function startTimer() {
            if (timerId !== null) return;
            timerId = setInterval(() => showSlide(currentSlide + 1), 6000);
        }

        function stopTimer() {
            if (timerId !== null) {
                clearInterval(timerId);
                timerId = null;
            }
        }

        new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !document.hidden) startTimer();
                else stopTimer();
            });
        }, { threshold: 0.25 }).observe(sliderRoot);

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stopTimer();
        });
    })();


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
       ------------------------------------------
       OPTIMIZED (2026-09-02):
       - rAF faqat ripples mavjud bo'lganda ishlaydi (avval doimiy aylanardi,
         ripple bo'lmasa ham sekundiga 60 marta to'liq ekran clearRect qilardi)
       - prefers-reduced-motion: animatsiya butunlay o'chiriladi
       - document hidden bo'lganda tsikl to'xtaydi (batareya tejash)
       ========================================== */
    const rippleCanvas = document.getElementById('fluidRippleCanvas');
    if (rippleCanvas) {
        const rCtx = rippleCanvas.getContext('2d');
        const reduceMotionRipple = window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let ripples = [];
        let rafId = null;
        let ripplePaused = false;

        function resizeRippleCanvas() {
            rippleCanvas.width = window.innerWidth;
            rippleCanvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeRippleCanvas);
        resizeRippleCanvas();

        function addRipple(x, y) {
            if (reduceMotionRipple || ripplePaused) return;
            ripples.push({
                x,
                y,
                radius: 5,
                maxRadius: 80 + Math.random() * 40,
                alpha: 0.6,
                speed: 2 + Math.random() * 1.5,
                color: Math.random() > 0.5 ? '0, 242, 254' : '168, 85, 247'
            });
            startRippleLoop();
        }

        function startRippleLoop() {
            if (rafId !== null) return;
            if (reduceMotionRipple || ripplePaused) return;
            rafId = requestAnimationFrame(animateRipples);
        }

        function stopRippleLoop() {
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
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
        }, { passive: true });

        /* Tab boshqa oynaga o'tkazilganda tsiklni to'xtatish */
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                ripplePaused = true;
                stopRippleLoop();
            } else {
                ripplePaused = false;
                if (ripples.length) startRippleLoop();
            }
        });

        function animateRipples() {
            rafId = null;
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

            /* Ripple tugagach tsikl to'xtaydi — CPU/GPU bo'shaydi */
            if (ripples.length > 0 && !ripplePaused && !reduceMotionRipple) {
                rafId = requestAnimationFrame(animateRipples);
            } else {
                rCtx.clearRect(0, 0, rippleCanvas.width, rippleCanvas.height);
            }
        }

        if (reduceMotionRipple) {
            rippleCanvas.style.display = 'none';
        }
    }


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

    /* PERFORMANCE (2026-09-03, E12): avvalgi talqin har bir scroll tick'ida
       to'liq qayta chizardi — 42 tugun, O(n^2)=861 juftlik, har bir aylanaga
       shadowBlur=14 (juda qimmat) va har kadrda yangi radial gradient.
       4x throttlangan mobil CPU'da bu ~18.5 s asosiy oqim vaqtini yegan
       (Lighthouse TBT 18648 ms, perf 33). Endi:
         - chizish requestAnimationFrame bilan birlashtiriladi
         - shadowBlur o'rniga arzon ikki qatlamli "glow" aylana
         - tugunlar soni ekran kengligiga moslashadi (mobil: 18-24)
         - qirralar faqat keyingi 4 ta qo'shniga chiziladi (O(n*k))
         - gradient faqat resize'da hisoblanadi
         - IntersectionObserver: hero ko'rinmasa umuman chizilmaydi
         - prefers-reduced-motion: bitta statik kadr, scroll bog'lovisiz   */
    if (canvas) {
        const ctx = canvas.getContext('2d', { alpha: false });
        const TOTAL_FRAMES = 60;
        const NEIGHBOURS = 4;
        const reduceMotion = !!(window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches);

        let currentFrameIndex = 0;
        let timeOffset = 0;
        let heroVisible = true;
        let rafPending = false;
        let bgGradient = null;
        let nodeCount = 42;
        let dpr = Math.min(window.devicePixelRatio || 1, 2);
        let pendingFrame = 0;
        let resizeTimer = null;

        function computeNodeCount(width) {
            if (width < 420) return 18;
            if (width < 768) return 24;
            if (width < 1200) return 32;
            return 42;
        }

        function buildGradient(width, height) {
            const cx = width / 2;
            const cy = height / 2;
            const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, width * 0.65);
            g.addColorStop(0, 'rgba(0, 242, 254, 0.14)');
            g.addColorStop(0.5, 'rgba(168, 85, 247, 0.08)');
            g.addColorStop(1, 'rgba(5, 6, 9, 1)');
            bgGradient = g;
        }

        function resizeCanvas() {
            const rect = canvas.parentElement.getBoundingClientRect();
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.max(1, Math.round(rect.width * dpr));
            canvas.height = Math.max(1, Math.round(rect.height * dpr));
            nodeCount = computeNodeCount(rect.width);
            buildGradient(canvas.width, canvas.height);
            drawNow(currentFrameIndex);
        }

        function drawNow(frameIdx) {
            if (!heroVisible) return;
            const width = canvas.width;
            const height = canvas.height;
            if (!width || !height || !bgGradient) return;

            const cx = width / 2;
            const cy = height / 2;
            const progress = frameIdx / (TOTAL_FRAMES - 1);

            ctx.fillStyle = bgGradient;
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
            ctx.lineWidth = 2 * dpr;
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
            ctx.lineWidth = 2 * dpr;
            ctx.stroke();
            ctx.restore();

            const nodes = new Array(nodeCount);
            for (let i = 0; i < nodeCount; i++) {
                const phi = Math.acos(-1 + (2 * i) / nodeCount);
                const theta = Math.sqrt(nodeCount * Math.PI) * phi + rotationAngle;
                const liquidWave = Math.sin(4 * phi + 3 * theta + timeOffset) * 14;
                const rDynamic = baseRadius + liquidWave;

                const x3d = rDynamic * Math.cos(theta) * Math.sin(phi);
                const y3d = rDynamic * Math.sin(theta) * Math.sin(phi);
                const z3d = rDynamic * Math.cos(phi);

                const scale = 300 / (300 + z3d);
                nodes[i] = { x: cx + x3d * scale, y: cy + y3d * scale, z: z3d, scale: scale };
            }

            /* Faqat yaqin qo'shnilarni bog'lash — O(n*k), avvalgi O(n^2) o'rniga.
               Barcha qirralar bitta path'ga yig'iladi: 861 ta alohida
               stroke() o'rniga bitta stroke(). */
            const linkRadius = baseRadius * 0.85;
            ctx.lineWidth = 1 * dpr;
            ctx.beginPath();
            for (let i = 0; i < nodeCount; i++) {
                const a = nodes[i];
                const maxJ = Math.min(nodeCount, i + 1 + NEIGHBOURS);
                for (let j = i + 1; j < maxJ; j++) {
                    const b = nodes[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    if (dx * dx + dy * dy < linkRadius * linkRadius) {
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                    }
                }
            }
            ctx.strokeStyle = 'rgba(0, 242, 254, 0.22)';
            ctx.stroke();

            /* shadowBlur ishlatilmaydi — o'rniga ikki qatlamli aylana bilan
               ancha arzon "glow" effekti. */
            nodes.sort((a, b) => a.z - b.z);
            for (let i = 0; i < nodeCount; i++) {
                const node = nodes[i];
                const nodeRadius = Math.max(2.4, 5.5 * node.scale);
                const alpha = 0.45 + ((node.z + baseRadius) / (baseRadius * 2)) * 0.55;
                const rgb = node.z > 0 ? '0, 242, 254' : '168, 85, 247';

                ctx.beginPath();
                ctx.arc(node.x, node.y, nodeRadius * 1.9, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgb}, ${alpha * 0.16})`;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
                ctx.fill();
            }

            ctx.fillStyle = '#ffffff';
            ctx.font = `800 ${17 * dpr}px 'Outfit', sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('TAYANCH', cx, cy);

            if (indicatorBar) indicatorBar.style.width = `${((frameIdx + 1) / TOTAL_FRAMES) * 100}%`;
            if (frameCountLabel) frameCountLabel.textContent = `Frame ${frameIdx + 1} / ${TOTAL_FRAMES}`;

            if (frameStepLabel) {
                if (progress < 0.33) frameStepLabel.textContent = 'STAGE 1: AI LIQUID PRODUCTIVITY';
                else if (progress < 0.66) frameStepLabel.textContent = 'STAGE 2: IELTS BAND 7.0+ FLUID MASTERY';
                else frameStepLabel.textContent = 'STAGE 3: TOP UNIVERSITY ADMISSION';
            }
        }

        /* Bir nechta scroll hodisasini bitta kadrga birlashtirish (E12) */
        function drawFrame(frameIdx) {
            pendingFrame = frameIdx;
            if (rafPending) return;
            rafPending = true;
            requestAnimationFrame(() => {
                rafPending = false;
                drawNow(pendingFrame);
            });
        }

        resizeCanvas();

        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resizeCanvas, 150);
        });

        /* Hero ekrandan chiqqanda umuman chizmasin */
        const heroSection = document.getElementById('hero') || canvas.closest('section');
        if (heroSection && 'IntersectionObserver' in window) {
            new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    heroVisible = entry.isIntersecting;
                    if (heroVisible) drawFrame(currentFrameIndex);
                });
            }, { rootMargin: '120px' }).observe(heroSection);
        }

        document.addEventListener('visibilitychange', () => {
            heroVisible = !document.hidden;
        });

        /* prefers-reduced-motion bo'lsa faqat bitta statik kadr chiziladi */
        if (window.gsap && window.ScrollTrigger && !reduceMotion) {
            gsap.registerPlugin(ScrollTrigger);
            const frameObj = { frame: 0 };
            gsap.to(frameObj, {
                frame: TOTAL_FRAMES - 1,
                snap: 'frame',
                ease: 'none',
                scrollTrigger: {
                    trigger: '#hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.5,
                    onUpdate: () => {
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
    try {
        if (window.gsap && window.ScrollTrigger) {
            const fadeEls = document.querySelectorAll('.hero-fade, .hero-title, .hero-subheadline, .hero-cta-group, .hero-stats-row');
            if (fadeEls.length > 0) {
                gsap.from(fadeEls, {
                    opacity: 0,
                    y: 35,
                    duration: 0.9,
                    stagger: 0.12,
                    ease: 'power3.out'
                });
            }

            ScrollTrigger.batch('.gsap-reveal', {
                start: 'top 90%',
                once: true,
                onEnter: batch => gsap.fromTo(batch,
                    { opacity: 0, y: 45, scale: 0.96 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'power3.out', stagger: 0.06, overwrite: true }
                )
            });
        }
    } catch (e) {
        console.warn('[gsap] reveal init skipped:', e);
    }

    // Safety net: guarantee all .gsap-reveal content stays visible even if
    // ScrollTrigger fails to fire (layout/scroll miscalculation). Runs after load.
    setTimeout(() => {
        document.querySelectorAll('.gsap-reveal, .hero-fade').forEach(elem => {
            if (parseFloat(getComputedStyle(elem).opacity) < 0.05) {
                elem.style.setProperty('opacity', '1', 'important');
                elem.style.setProperty('transform', 'none', 'important');
            }
        });
    }, 1500);

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

    // Smooth Scrolling & Hash Navigation Handler
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#hero') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (targetId.length > 1) {
                const targetElem = document.querySelector(targetId);
                if (targetElem) {
                    e.preventDefault();
                    targetElem.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });


    /* ==========================================
       17. GAMIFICATION & WEB SPEECH AUDIO ENGINE
       ========================================== */
    
    // User Gamification State & LocalStorage
    let userXP = parseInt(localStorage.getItem('tayanch_user_xp') || '0', 10);
    let userStreak = parseInt(localStorage.getItem('tayanch_user_streak') || '0', 10);
    let unlockedBadges = JSON.parse(localStorage.getItem('tayanch_unlocked_badges') || '["vocab_champion"]');

    const badgeDefinitions = [
        { id: 'vocab_champion', name: "🏆 Vocab Champion", desc: "5 ta so'z va flashcardni o'rgandingiz!" },
        { id: 'grammar_master', name: "🎓 Grammar Master", desc: "Grammatika testlarini xatosiz yakunladingiz!" },
        { id: 'prompt_wizard', name: "⚡ Prompt Wizard", desc: "AI Prompt Playground simulyatoridan foydalandingiz!" },
        { id: 'speaking_maestro', name: "🗣️ Speaking Maestro", desc: "Roleplay Chatbot simulyatsiyasida muloqot qildingiz!" },
        { id: 'essay_master', name: "✍️ Essay Master", desc: "IELTS Insho diagnostikasi vositasini sinab ko'rdingiz!" }
    ];

    function syncGamifyVisibility() {
        const hud = document.querySelector('.gamify-hud-container');
        if (!hud) return;
        // Only reveal the gamification HUD once the user has real, earned progress.
        // Anonymous / first-time visitors must NOT see hardcoded fake XP or Combo.
        if (userXP > 0) {
            hud.classList.remove('gamify-hidden');
        } else {
            hud.classList.add('gamify-hidden');
        }
    }

    function updateGamifyUI() {
        const xpEl = document.getElementById('userXPVal');
        const streakEl = document.getElementById('userStreakVal');
        const streakHUDEl = document.getElementById('streakValHUD');
        if (xpEl) xpEl.textContent = `${userXP} XP`;
        if (streakEl) streakEl.textContent = `🔥 ${userStreak} Combo`;
        if (streakHUDEl) streakHUDEl.textContent = userStreak;
        renderBadgesModal();
        syncGamifyVisibility();
    }

    function unlockBadge(badgeId) {
        if (!unlockedBadges.includes(badgeId)) {
            unlockedBadges.push(badgeId);
            localStorage.setItem('tayanch_unlocked_badges', JSON.stringify(unlockedBadges));
            const badge = badgeDefinitions.find(b => b.id === badgeId);
            if (badge) {
                showToast(`🏆 YANGI YUTUQ: ${badge.name}!`);
            }
            updateGamifyUI();
        }
    }

    function addXP(points, reason = 'Mashq bajarildi!') {
        userXP += points;
        userStreak += 1;
        localStorage.setItem('tayanch_user_xp', userXP);
        localStorage.setItem('tayanch_user_streak', userStreak);
        updateGamifyUI();

        // Web Audio Chime Sound Synthesizer
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(587.33, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2);
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.25);
        } catch (e) {}

        showToast(`+${points} XP! (${reason})`);

        if (userXP >= 300) unlockBadge('vocab_champion');
    }

    function showToast(msg) {
        const existing = document.querySelector('.xp-toast');
        if (existing) existing.remove();
        const toast = document.createElement('div');
        toast.className = 'xp-toast';
        toast.innerHTML = `<i class="fa-solid fa-bolt"></i> ${escapeHtml(msg)}`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    // Render Badges Modal Grid
    function renderBadgesModal() {
        const badgesContainer = document.getElementById('badgesGridContent');
        if (!badgesContainer) return;
        badgesContainer.innerHTML = badgeDefinitions.map(b => {
            const isUnlocked = unlockedBadges.includes(b.id);
            return `
                <div class="badge-item-card ${isUnlocked ? 'unlocked' : ''}">
                    <span class="badge-icon">${b.name.split(' ')[0]}</span>
                    <h4>${b.name.substring(3)}</h4>
                    <p>${b.desc}</p>
                    <span style="font-size: 0.7rem; color: ${isUnlocked ? '#00f2fe' : 'rgba(255,255,255,0.4)'}; margin-top: 4px; display: block;">
                        ${isUnlocked ? '✅ Olingan' : '🔒 Qulflangan'}
                    </span>
                </div>
            `;
        }).join('');
    }

    const badgesHudBtn = document.getElementById('badgesHudBtn');
    const badgesModal = document.getElementById('badgesModal');
    const badgesModalCloseBtn = document.getElementById('badgesModalCloseBtn');

    if (badgesHudBtn && badgesModal) {
        badgesHudBtn.addEventListener('click', () => {
            renderBadgesModal();
            badgesModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    if (badgesModalCloseBtn && badgesModal) {
        badgesModalCloseBtn.addEventListener('click', () => closeModal(badgesModal));
    }
    if (badgesModal) {
        badgesModal.addEventListener('click', (e) => {
            if (e.target === badgesModal) closeModal(badgesModal);
        });
    }


    // Native Web Speech API Text-to-Speech Pronunciation Synthesizer
    function speakText(text, lang = 'en-US', onStart, onEnd) {
        if (!('speechSynthesis' in window)) {
            alert("Afsus, brauzeringiz matnni talaffuz qilishni qo'llab-quvvatlamaydi.");
            return;
        }
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.9;
        utterance.pitch = 1.0;

        if (onStart) utterance.onstart = onStart;
        if (onEnd) utterance.onend = onEnd;
        utterance.onerror = () => { if (onEnd) onEnd(); };

        window.speechSynthesis.speak(utterance);
    }

    // Universal Audio Buttons Handler (.audio-btn & .speech-btn)
    document.addEventListener('click', (e) => {
        const audioBtn = e.target.closest('.audio-btn, .speech-btn');
        if (audioBtn) {
            const textToSpeak = audioBtn.dataset.speech || audioBtn.parentElement.innerText.replace('🔊', '').replace('Ovozli eshitish', '').trim();
            if (textToSpeak) {
                audioBtn.classList.add('speaking');
                speakText(
                    textToSpeak, 
                    'en-US', 
                    () => audioBtn.classList.add('speaking'),
                    () => audioBtn.classList.remove('speaking')
                );
                addXP(15, "Talaffuz tinglandi");
            }
        }
    });


    // ==========================================
    // LIVE AI PROMPT PLAYGROUND ENGINE
    // ==========================================
    const promptInput = document.getElementById('promptInput');
    const promptTerminal = document.getElementById('promptTerminalOutput');
    const runPromptBtn = document.getElementById('runPromptBtn');
    const copyPromptBtn = document.getElementById('copyPromptBtn');

    const promptPresets = {
        ielts: "Act as an IELTS Band 9 Writing Tutor. Analyze the essay prompt 'Should higher education be free for all students?' and generate a Band 9 outline, thesis statement, and 4 advanced academic collocations.",
        vocab: "Generate 5 C1-level academic collocations for technology and learning with clear Uzbek translations and context example sentences.",
        grammar: "Rewrite this sentence using an academic inversion structure: 'If students use generative AI tools every day, they will master language skills much faster.'",
        email: "Write a formal email to a University Admissions Committee requesting a 100% full-ride scholarship application fee waiver."
    };

    document.querySelectorAll('.chip-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const key = btn.dataset.preset;
            if (promptInput && promptPresets[key]) {
                promptInput.value = promptPresets[key];
            }
        });
    });

    if (runPromptBtn && promptTerminal) {
        runPromptBtn.addEventListener('click', () => {
            const promptText = promptInput ? promptInput.value.trim() : promptPresets.ielts;
            promptTerminal.innerHTML = '<span style="color: var(--primary-cyan);"><i class="fa-solid fa-spinner fa-spin"></i> ChatGPT & Claude sun\'iy intellekt modeli javob yaratmoqda...</span>';

            setTimeout(() => {
                const simulatedResponse = 
                    `🤖 [Demo namuna javob — haqiqiy AI serverga murojaat qilinmaydi]\n\n` +
                    `✨ PROMPT TAHLILI: Muvaffaqiyatli bajarildi.\n\n` +
                    `📌 TAVSIYA ETILGAN AKADEMIK JAVOB:\n` +
                    `"Furthermore, incorporating artificial intelligence into modern educational frameworks substantially elevates student productivity while enabling real-time formative assessment."\n\n` +
                    `📊 BAND 8.5 LUG'AT BO'YICHA TAHLIL:\n` +
                    `• 'incorporating' (Fe'l) — O'zlashtirmoq / Qo'shmoq (C1 level)\n` +
                    `• 'substantially elevates' (Collocation) — Keskin oshiradi (Band 8+)\n` +
                    `• 'formative assessment' (Termin) — Rivojlantiruvchi baholash tizimi\n\n` +
                    `💡 O'QUV MASLAHAT: Ushbu qurilmani Writing Task 2 insholarining 2-paragrafida bemalol qo'llashingiz mumkin.`;
                
                let i = 0;
                promptTerminal.textContent = '';
                const interval = setInterval(() => {
                    promptTerminal.textContent += simulatedResponse[i];
                    i++;
                    if (i >= simulatedResponse.length) {
                        clearInterval(interval);
                        addXP(50, "AI Prompt Sinab Ko'rildi!");
                        unlockBadge('prompt_wizard');
                    }
                }, 12);
            }, 500);
        });
    }

    if (copyPromptBtn && promptTerminal) {
        copyPromptBtn.addEventListener('click', () => {
            const text = promptTerminal.textContent;
            if (text) {
                navigator.clipboard.writeText(text).then(() => {
                    showToast("📋 AI javobi nusxalandi!");
                });
            }
        });
    }


    // ==========================================
    // SPEAKING ROLEPLAY CHATBOT ENGINE
    // ==========================================
    const roleplayChatBox = document.getElementById('roleplayChatBox');
    const roleplayOptionsGrid = document.getElementById('roleplayOptionsGrid');
    const scenarioBtns = document.querySelectorAll('.scenario-btn');

    const roleplayScenarios = {
        cafe: {
            title: "☕ Kafe Buyurtmasi (Cafe Order)",
            initialAi: "Hello! Welcome to Tayanch Coffee & Study Lounge. What can I get started for you today?",
            options: [
                {
                    text: "A) Hi! I'd like an iced americano with oat milk and a croissant, please.",
                    aiReply: "Great choice! Would you like that to stay or take away?",
                    xp: 50,
                    nextOptions: [
                        { text: "A) To stay, please. Also, can I get the Wi-Fi password?", aiReply: "Sure thing! The Wi-Fi is 'Tayanch2026'. Have a wonderful study session!", xp: 50 },
                        { text: "B) Take away, thanks. How long will it take?", aiReply: "It will be ready in 2 minutes at the counter. Thank you!", xp: 40 }
                    ]
                },
                {
                    text: "B) Give me coffee quick.",
                    aiReply: "Sure, what kind of coffee would you like?",
                    xp: 20,
                    nextOptions: [
                        { text: "A) An espresso, please.", aiReply: "Single or double shot? Coming right up!", xp: 30 }
                    ]
                },
                {
                    text: "C) What do you recommend for a long study session?",
                    aiReply: "I highly recommend our signature Cold Brew with almond milk — it keeps you energized!",
                    xp: 50,
                    nextOptions: [
                        { text: "A) Perfect! I'll take a large Cold Brew.", aiReply: "Excellent! That will be $4.50. Enjoy your learning session!", xp: 50 }
                    ]
                }
            ]
        },
        airport: {
            title: "✈️ Aeroport Tekshiruvi (Airport Security & Check-in)",
            initialAi: "Good day! May I see your passport and flight booking confirmation, please?",
            options: [
                {
                    text: "A) Here you go. I'm flying to London for an international academic conference.",
                    aiReply: "Thank you! Do you have any check-in luggage, or just hand baggage?",
                    xp: 50,
                    nextOptions: [
                        { text: "A) Just one check-in suitcase and my laptop backpack.", aiReply: "Perfect! Place your suitcase on the scale. Your flight departs from Gate B12.", xp: 50 }
                    ]
                },
                {
                    text: "B) Yes, here is my passport.",
                    aiReply: "Thank you. Where are you traveling today?",
                    xp: 30,
                    nextOptions: [
                        { text: "A) I am going to London.", aiReply: "Have a safe flight! Your gate is B12.", xp: 40 }
                    ]
                }
            ]
        },
        interview: {
            title: "💼 Universitet & Ish Intervyusi (Interview Simulation)",
            initialAi: "Welcome! Tell me about a time you solved a complex problem using modern technology.",
            options: [
                {
                    text: "A) In my recent project, I integrated generative AI tools to streamline content analysis, reducing processing time by 60%.",
                    aiReply: "Impressive! How did you ensure data accuracy while using AI?",
                    xp: 50,
                    nextOptions: [
                        { text: "A) I established a verification workflow with peer reviews to validate all generated outputs.", aiReply: "Outstanding leadership and critical thinking! You are a top candidate.", xp: 50 }
                    ]
                },
                {
                    text: "B) I use AI apps on my phone every day.",
                    aiReply: "Can you elaborate on a specific achievement or outcome?",
                    xp: 20,
                    nextOptions: [
                        { text: "A) I built a vocabulary study tool for my class.", aiReply: "That sounds practical and proactive. Good job!", xp: 40 }
                    ]
                }
            ]
        }
    };

    let currentScenarioKey = 'cafe';

    function loadRoleplayScenario(key) {
        currentScenarioKey = key;
        const scenario = roleplayScenarios[key];
        if (!scenario || !roleplayChatBox || !roleplayOptionsGrid) return;

        roleplayChatBox.innerHTML = `
            <div class="chat-bubble ai">
                <strong><i class="fa-solid fa-robot"></i> AI Partner:</strong> ${scenario.initialAi}
                <button class="speech-btn" data-speech="${scenario.initialAi}" style="margin-left:8px; padding:2px 8px; font-size:0.75rem;"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        `;
        speakText(scenario.initialAi);

        renderRoleplayOptions(scenario.options);
    }

    function renderRoleplayOptions(options) {
        if (!roleplayOptionsGrid) return;
        roleplayOptionsGrid.innerHTML = options.map((opt, idx) => `
            <button class="roleplay-opt-btn" data-idx="${idx}">
                <span>${opt.text}</span>
                <span class="badge-tag" style="background: rgba(0, 242, 254, 0.2); color: #00f2fe; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem;">+${opt.xp} XP</span>
            </button>
        `).join('');

        roleplayOptionsGrid.querySelectorAll('.roleplay-opt-btn').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                const selected = options[i];
                if (!selected) return;

                // Append User Bubble
                const userBubble = document.createElement('div');
                userBubble.className = 'chat-bubble user';
                userBubble.innerHTML = `<strong><i class="fa-solid fa-user"></i> Siz:</strong> ${selected.text}`;
                roleplayChatBox.appendChild(userBubble);

                addXP(selected.xp, "Speaking Roleplay Bajarildi!");
                unlockBadge('speaking_maestro');

                // Append AI Reply Bubble after brief delay
                setTimeout(() => {
                    const aiBubble = document.createElement('div');
                    aiBubble.className = 'chat-bubble ai';
                    aiBubble.innerHTML = `
                        <strong><i class="fa-solid fa-robot"></i> AI Partner:</strong> ${selected.aiReply}
                        <button class="speech-btn" data-speech="${selected.aiReply}" style="margin-left:8px; padding:2px 8px; font-size:0.75rem;"><i class="fa-solid fa-volume-high"></i></button>
                    `;
                    roleplayChatBox.appendChild(aiBubble);
                    roleplayChatBox.scrollTop = roleplayChatBox.scrollHeight;
                    speakText(selected.aiReply);

                    if (selected.nextOptions && selected.nextOptions.length) {
                        renderRoleplayOptions(selected.nextOptions);
                    } else {
                        roleplayOptionsGrid.innerHTML = `
                            <div style="text-align:center; padding:1rem; background:rgba(34, 197, 94, 0.15); border:1px solid #22c55e; border-radius:12px; color:#fff;">
                                🎉 <strong>Muloqot muvaffaqiyatli yakunlandi!</strong> Fluency & Pronunciation ballingiz yuqori darajada!
                            </div>
                        `;
                    }
                }, 600);
            });
        });
    }

    if (scenarioBtns.length) {
        scenarioBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                scenarioBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const key = btn.dataset.scenario;
                loadRoleplayScenario(key);
            });
        });
        loadRoleplayScenario('cafe');
    }


    // ==========================================
    // INSTANT IELTS ESSAY SCORE CHECKER ENGINE
    // ==========================================
    const essayTextarea = document.getElementById('essayTextarea');
    const analyzeEssayBtn = document.getElementById('analyzeEssayBtn');
    const essayDiagnosticCard = document.getElementById('essayDiagnosticCard');
    const liveWordCount = document.getElementById('liveWordCount');
    const liveParagraphCount = document.getElementById('liveParagraphCount');

    if (essayTextarea) {
        essayTextarea.addEventListener('input', () => {
            const text = essayTextarea.value.trim();
            const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
            const paragraphs = text ? text.split(/\n\s*\n/).filter(Boolean).length : 0;

            if (liveWordCount) liveWordCount.textContent = `${words} ta so'z`;
            if (liveParagraphCount) liveParagraphCount.textContent = `${paragraphs} ta paragraf`;
        });
    }

    if (analyzeEssayBtn && essayTextarea && essayDiagnosticCard) {
        analyzeEssayBtn.addEventListener('click', () => {
            const text = essayTextarea.value.trim();
            const words = text ? text.split(/\s+/).filter(Boolean).length : 0;

            if (words < 40) {
                alert("Iltimos, insho diagnostikasi uchun kamida 40-50 ta so'z kiriting.");
                return;
            }

            // Diagnostic Calculation Rules
            let tr = 6.0, cc = 6.0, lr = 6.0, gra = 6.0;

            // Word count bonus
            if (words >= 250) { tr += 1.5; cc += 1.0; }
            else if (words >= 180) { tr += 1.0; cc += 0.5; }

            // Academic cohesive devices check
            const cohesiveWords = ['furthermore', 'however', 'consequently', 'moreover', 'therefore', 'in addition', 'on the other hand', 'in conclusion'];
            const foundCohesive = cohesiveWords.filter(w => text.toLowerCase().includes(w));
            if (foundCohesive.length >= 3) cc += 1.0;
            else if (foundCohesive.length >= 1) cc += 0.5;

            // Vocabulary richness check
            const academicVocab = ['substantially', 'incorporate', 'facilitate', 'fundamental', 'paramount', 'implementation', 'perspective', 'empirical'];
            const foundVocab = academicVocab.filter(w => text.toLowerCase().includes(w));
            if (foundVocab.length >= 3) lr += 1.5;
            else if (foundVocab.length >= 1) lr += 1.0;

            // Sentence complexity check (commas & semicolons & complex structures)
            if (text.includes(';') || (text.match(/,/g) || []).length >= 4) gra += 1.0;
            if (text.toLowerCase().includes('which') || text.toLowerCase().includes('although')) gra += 0.5;

            // Cap scores at 9.0
            tr = Math.min(tr, 9.0);
            cc = Math.min(cc, 9.0);
            lr = Math.min(lr, 9.0);
            gra = Math.min(gra, 9.0);

            const overall = ((tr + cc + lr + gra) / 4).toFixed(1);

            document.getElementById('scoreTR').textContent = tr.toFixed(1);
            document.getElementById('scoreCC').textContent = cc.toFixed(1);
            document.getElementById('scoreLR').textContent = lr.toFixed(1);
            document.getElementById('scoreGRA').textContent = gra.toFixed(1);
            document.getElementById('overallBandScore').textContent = `Band ${overall}`;

            const feedbackText = document.getElementById('essayFeedbackText');
            if (feedbackText) {
                feedbackText.innerHTML = `
                    <p><strong><i class="fa-solid fa-circle-check" style="color:#22c55e;"></i> Topilgan Muvaffaqiyatlar:</strong> ${foundCohesive.length} ta bog'lovchi ibora hamda ${foundVocab.length} ta akademik C1 lug'atlar ishlatilgan.</p>
                    <p class="mt-1"><strong><i class="fa-solid fa-lightbulb" style="color:#fbbf24;"></i> Band 8.0+ uchun Maslahat:</strong> Inshoda pasiv nisbat (Passive Voice) va Inversion tuzilmalarini ko'proq qo'llash tavsiya etiladi.</p>
                `;
            }

            essayDiagnosticCard.style.display = 'block';
            addXP(100, "IELTS Essay Diagnostikasi Bajarildi!");
            unlockBadge('essay_master');
        });
    }

    /* ==========================================================================
       18. ⌘K QUICK DICTIONARY SYSTEM (COMMAND PALETTE / LUG'AT MODAL)
       ========================================================================== */
    const DICT_KEY = "tayanch_lugat_v1";

    function getDictionary() {
        try {
            return JSON.parse(localStorage.getItem(DICT_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    function addToDictionary(wordObj) {
        if (!wordObj || !wordObj.en) return;
        let dict = getDictionary();
        const exists = dict.some(w => w.en.toLowerCase() === wordObj.en.toLowerCase());
        if (!exists) {
            dict.unshift({
                en: wordObj.en,
                uz: wordObj.uz || "",
                addedAt: new Date().toISOString(),
                source: "auto-mashq"
            });
            localStorage.setItem(DICT_KEY, JSON.stringify(dict));
            showToast(`📖 Lug'atga qo'shildi: ${wordObj.en}`);
        }
    }

    function deleteFromDictionary(enWord) {
        let dict = getDictionary();
        dict = dict.filter(w => w.en.toLowerCase() !== enWord.toLowerCase());
        localStorage.setItem(DICT_KEY, JSON.stringify(dict));
        renderDictionaryUI();
        showToast(`O'chirildi: ${enWord}`);
    }

    function openDictionaryModal() {
        const modal = document.getElementById('dictModal');
        if (modal) {
            modal.classList.add('active');
            renderDictionaryUI();
            const input = document.getElementById('dictSearchInput');
            if (input) {
                input.value = '';
                setTimeout(() => input.focus(), 100);
            }
        }
    }

    function closeDictionaryModal() {
        const modal = document.getElementById('dictModal');
        if (modal) modal.classList.remove('active');
    }

    function renderDictionaryUI(filter = '') {
        const listContainer = document.getElementById('dictBodyList');
        if (!listContainer) return;

        const dict = getDictionary();
        const query = filter.trim().toLowerCase();
        const filtered = dict.filter(w => w.en.toLowerCase().includes(query) || w.uz.toLowerCase().includes(query));

        if (!filtered.length) {
            listContainer.innerHTML = `
                <div class="dict-empty-state">
                    <i class="fa-solid fa-book-open"></i>
                    <p>${query ? 'Hech qanday so\'z topilmadi' : 'Lug\'atingiz hozircha bo\'sh. Mashqlarda xato qilgan so\'zlaringiz avtomatik shu yerga tushadi.'}</p>
                </div>`;
            return;
        }

        listContainer.innerHTML = filtered.map(item => `
            <div class="dict-word-card">
                <div>
                    <div class="dict-word-en" style="display:flex; align-items:center; gap:8px;">
                        <span>${item.en}</span>
                        <button class="speech-btn" data-speech="${item.en}" title="Talaffuzini tinglash" style="font-size:0.85rem; padding:4px 8px;"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                    <div class="dict-word-uz">${item.uz}</div>
                    <div class="dict-word-meta">Saqlangan: ${new Date(item.addedAt).toLocaleDateString()}</div>
                </div>
                <button class="dict-del-btn" data-en="${item.en}" title="O'chirish"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `).join('');

        listContainer.querySelectorAll('.dict-del-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteFromDictionary(btn.dataset.en);
            });
        });
    }

    // ⌘K or Ctrl+K Global Event Listener
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            const modal = document.getElementById('dictModal');
            if (modal && modal.classList.contains('active')) {
                closeDictionaryModal();
            } else {
                openDictionaryModal();
            }
        }
    });

    const dictCloseBtn = document.getElementById('dictCloseBtn');
    if (dictCloseBtn) dictCloseBtn.addEventListener('click', closeDictionaryModal);

    const dictSearchInput = document.getElementById('dictSearchInput');
    if (dictSearchInput) {
        dictSearchInput.addEventListener('input', (e) => renderDictionaryUI(e.target.value));
    }

    const dictTriggerBtn = document.getElementById('dictTriggerBtn');
    if (dictTriggerBtn) dictTriggerBtn.addEventListener('click', openDictionaryModal);


    /* ==========================================================================
       19. ENGLIFY GAMIFICATION ROADMAP ENGINE & MULTI-CEFR LEVEL SWITCHER
       ========================================================================== */
    const GAMIFY_STATE_KEY = "tayanch_gamify_state_v1";

    const MODULES_FALLBACK = [
        {
            id: "a1_m1", title: "Salomlashish va tanishtirish",
            exercises: [
                { type: "choose", prompt: "«Salom» so'zining inglizcha tarjimasi?", options: ["Hello", "Goodbye", "Please", "Thanks"], answer: "Hello", word: { en: "hello", uz: "salom / assalomu alaykum" } },
                { type: "choose", prompt: "«Mening ismim...» iborasi inglizchada?", options: ["My name is...", "I am from...", "I like...", "How are you..."], answer: "My name is...", word: { en: "my name is", uz: "mening ismim" } },
                { type: "write", prompt: "«Xayr» so'zini inglizcha yozing:", answer: "goodbye", word: { en: "goodbye", uz: "xayr" } }
            ]
        },
        {
            id: "a1_m2", title: "To Be fe'li grammatikasi",
            exercises: [
                { type: "choose", prompt: "«I ___ a student.» — bo'sh joyga mos so'z?", options: ["am", "is", "are", "be"], answer: "am", word: { en: "am", uz: "be fe'li (I bilan)" } },
                { type: "choose", prompt: "«She ___ happy.» — bo'sh joyga mos so'z?", options: ["am", "is", "are", "be"], answer: "is", word: { en: "is", uz: "be fe'li (she/he/it bilan)" } },
                { type: "write", prompt: "«They ___ teachers.» — bo'sh joyni to'ldiring:", answer: "are", word: { en: "are", uz: "be fe'li (ko'plik bilan)" } }
            ]
        }
    ];

    let currentCEFRLevel = "A1";
    let activeModules = MODULES_FALLBACK;

    function loadGamifyState() {
        try {
            return JSON.parse(localStorage.getItem(GAMIFY_STATE_KEY)) || {};
        } catch (e) {
            return {};
        }
    }

    function saveGamifyState(s) {
        localStorage.setItem(GAMIFY_STATE_KEY, JSON.stringify(s));
    }

    let gamifyState = Object.assign({
        stars: 0,
        coins: 0,
        streak: 0,
        lastActive: null,
        progress: {}, // moduleId -> {done: n, total: n}
        solved: {}    // moduleId -> [exerciseIndex, ...] (Anti-cheat double reward protection)
    }, loadGamifyState());

    function initModuleProgressShape() {
        activeModules.forEach(m => {
            if (!gamifyState.progress[m.id]) gamifyState.progress[m.id] = { done: 0, total: m.exercises.length };
            if (!gamifyState.solved[m.id]) gamifyState.solved[m.id] = [];
        });
        saveGamifyState(gamifyState);
    }

    function touchGamifyStreak() {
        const today = new Date().toISOString().slice(0, 10);
        if (gamifyState.lastActive === today) return;
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        gamifyState.streak = (gamifyState.lastActive === yesterday) ? gamifyState.streak + 1 : 1;
        gamifyState.lastActive = today;
        userStreak = Math.max(userStreak, gamifyState.streak);
        localStorage.setItem('tayanch_user_streak', userStreak);
        saveGamifyState(gamifyState);
    }

    function renderGamifyHUD() {
        const starEl = document.getElementById('starValHUD');
        const coinEl = document.getElementById('coinValHUD');
        const streakEl = document.getElementById('streakValHUD');
        if (starEl) starEl.textContent = gamifyState.stars;
        if (coinEl) coinEl.textContent = gamifyState.coins;
        if (streakEl) streakEl.textContent = gamifyState.streak || userStreak;
        updateGamifyUI();
    }

    function renderGamifySkills() {
        const container = document.getElementById('skillsDashboardContainer');
        if (!container) return;

        const skillMap = {
            Vocabulary: [activeModules[0]?.id, activeModules[2]?.id].filter(Boolean),
            Grammar: [activeModules[1]?.id, activeModules[4]?.id].filter(Boolean),
            Reading: [activeModules[0]?.id, activeModules[3]?.id].filter(Boolean),
            Listening: [activeModules[4]?.id].filter(Boolean),
            Writing: [activeModules[1]?.id, activeModules[3]?.id].filter(Boolean)
        };

        container.innerHTML = Object.entries(skillMap).map(([name, ids]) => {
            let done = 0, total = 0;
            ids.forEach(id => {
                const p = gamifyState.progress[id];
                if (p) { done += p.done; total += p.total; }
            });
            const pct = total ? Math.round((done / total) * 100) : 0;
            return `
                <div class="gamify-skill-item">
                    <div class="bar-wrapper"><div class="bar-fill" style="--h:${pct}%"></div></div>
                    <span>${name.toUpperCase()}</span>
                    <b>${pct}%</b>
                </div>`;
        }).join('');
    }

    function getModuleStatus(idx) {
        const m = activeModules[idx];
        if (!m || !gamifyState.progress[m.id]) return "locked";
        const p = gamifyState.progress[m.id];
        const pct = Math.round((p.done / p.total) * 100);
        if (pct >= 100) return "done";
        if (idx === 0) return "current";
        
        const prevM = activeModules[idx - 1];
        const prevP = gamifyState.progress[prevM.id];
        if (prevP && Math.round((prevP.done / prevP.total) * 100) >= 100) return "current";
        return "locked";
    }

    function renderGamifyRoadmap() {
        const container = document.getElementById('roadmapPathContainer');
        if (!container) return;

        container.innerHTML = '';
        activeModules.forEach((m, idx) => {
            const p = gamifyState.progress[m.id] || { done: 0, total: m.exercises.length };
            const pct = Math.round((p.done / p.total) * 100);
            const status = getModuleStatus(idx);

            const node = document.createElement('div');
            node.className = `path-node ${status}`;
            node.innerHTML = `
                ${status === "current" ? `<div class="node-flag"><i class="fa-solid fa-location-dot"></i> Hozirgi Bosqich</div>` : ''}
                <div class="ring-progress" style="--p:${pct}"><b>${pct}%</b></div>
                <div class="node-body">
                    <div class="node-title">${String(idx + 1).padStart(2, "0")} · ${m.title}</div>
                    <div class="node-sub">${p.done}/${p.total} mashq tugallandi</div>
                </div>
                <span class="node-tag">${status === "done" ? "Tugallandi" : status === "locked" ? "Qulflangan" : "Boshlash"}</span>
            `;

            if (status !== "locked") {
                node.addEventListener('click', () => openGamifyModule(idx));
            }
            container.appendChild(node);

            if (idx < activeModules.length - 1) {
                const connector = document.createElement('div');
                connector.className = 'connector-line';
                container.appendChild(connector);
            }
        });
    }

    /* Exercise Interactive Panel */
    let activeModuleIdx = null;
    let activeQIndex = 0;
    let questionLocked = false; // Double click / fast-click prevention flag

    function openGamifyModule(idx) {
        activeModuleIdx = idx;
        activeQIndex = 0;
        const modal = document.getElementById('exercisePanelModal');
        const titleEl = document.getElementById('exercisePanelTitle');
        if (titleEl) titleEl.textContent = activeModules[idx].title;
        if (modal) modal.classList.add('active');
        renderGamifyQuestion();
    }

    function closeGamifyModule() {
        const modal = document.getElementById('exercisePanelModal');
        if (modal) modal.classList.remove('active');
    }

    const panelCloseBtn = document.getElementById('exercisePanelCloseBtn');
    if (panelCloseBtn) panelCloseBtn.addEventListener('click', closeGamifyModule);

    function renderGamifyQuestion() {
        const m = activeModules[activeModuleIdx];
        if (!m) return;
        const total = m.exercises.length;
        const fillEl = document.getElementById('exerciseProgressFill');
        if (fillEl) fillEl.style.width = `${(activeQIndex / total) * 100}%`;

        const area = document.getElementById('exerciseQuizArea');
        if (!area) return;

        const solvedCount = (gamifyState.solved[m.id] || []).length;
        const videoWatchedKey = `tayanch_video_watched_${m.id}`;
        const isVideoWatched = localStorage.getItem(videoWatchedKey) === 'true';

        if (activeQIndex >= total) {
            const allCorrect = solvedCount >= total;
            area.innerHTML = `
                <div class="text-center py-4">
                    <i class="fa-solid ${allCorrect ? 'fa-trophy' : 'fa-flag-checkered'}" style="font-size:3.5rem; color:${allCorrect ? '#fbbf24' : '#00f2fe'}; margin-bottom:12px;"></i>
                    <h4 class="text-xl font-bold mb-2">${allCorrect ? "Tabriklaymiz! Modul to'liq bajarildi! 🏆" : "Modul yakunlandi!"}</h4>
                    <p class="text-muted mb-4">${solvedCount}/${total} ta mashq bajarildi · ⭐ +${gamifyState.stars} 🪙 +${gamifyState.coins}</p>
                    <button class="btn btn-primary btn-glow" id="exerciseFinishBtn">Yopish va Davom Etish</button>
                </div>`;
            document.getElementById('exerciseFinishBtn')?.addEventListener('click', closeGamifyModule);
            return;
        }

        const q = m.exercises[activeQIndex];
        questionLocked = false;

        const submodulesHeaderHTML = `
            <div class="unit-submodules-container">
                <div class="unit-submodule-item">
                    <div class="unit-submodule-info">
                        <div class="unit-submodule-icon"><i class="fa-solid fa-circle-play"></i></div>
                        <div>
                            <div style="font-weight:700; font-size:0.95rem; color:#fff;">1. Video Submodul</div>
                            <div style="font-size:0.78rem; color:var(--text-muted);">${isVideoWatched ? 'Progress 1/1 (Bajarildi)' : 'Progress 0/1 (Ko\'rilmagan)'} · +10 XP</div>
                        </div>
                    </div>
                    <button class="btn btn-secondary" id="watchVideoBtn" style="padding:6px 12px; font-size:0.8rem;">
                        <i class="fa-solid ${isVideoWatched ? 'fa-circle-check' : 'fa-play'}"></i> ${isVideoWatched ? 'Ko\'rilgan' : 'Darsni Ko\'rish'}
                    </button>
                </div>
                <div class="unit-submodule-item" style="border-color:rgba(0,242,254,0.3);">
                    <div class="unit-submodule-info">
                        <div class="unit-submodule-icon" style="background:rgba(168,85,247,0.15); color:var(--accent-purple);"><i class="fa-solid fa-pen-ruler"></i></div>
                        <div>
                            <div style="font-weight:700; font-size:0.95rem; color:#fff;">2. Homework Compulsory</div>
                            <div style="font-size:0.78rem; color:var(--text-muted);">Progress ${solvedCount}/${total} · ⭐ +1 | 🪙 +1 | +25 XP</div>
                        </div>
                    </div>
                    <span style="font-size:0.8rem; font-weight:700; color:var(--primary-cyan);">${activeQIndex + 1}/${total} Mashq</span>
                </div>
            </div>
        `;

        if (q.type === "choose") {
            area.innerHTML = `
                ${submodulesHeaderHTML}
                <span class="q-type-badge choose"><i class="fa-solid fa-list-check"></i> CHOOSE ANSWER (TANLANG)</span>
                <div class="exercise-prompt">${q.prompt}</div>
                <div class="exercise-options-grid">
                    ${q.options.map((opt, i) => `<button class="exercise-opt-btn" data-i="${i}">${opt}</button>`).join('')}
                </div>
                <div class="exercise-feedback" id="exerciseFB"></div>
                <div style="font-size:0.75rem; color:var(--text-dim); text-align:center; margin-top:10px;">
                    <i class="fa-solid fa-database"></i> Faqat shu brauzerda saqlanadi (localStorage)
                </div>
            `;
            const buttons = Array.from(area.querySelectorAll('.exercise-opt-btn'));
            buttons.forEach((btn, i) => {
                btn.addEventListener('click', () => {
                    if (questionLocked) return;
                    questionLocked = true;
                    const isCorrect = q.options[i] === q.answer;
                    buttons.forEach(b => b.disabled = true);
                    if (isCorrect) {
                        btn.classList.add('correct');
                    } else {
                        btn.classList.add('wrong');
                        const correctBtn = buttons.find(b => q.options[Number(b.dataset.i)] === q.answer);
                        if (correctBtn) correctBtn.classList.add('correct');
                    }
                    handleGamifyAnswer(isCorrect, q.answer);
                });
            });
        } else {
            area.innerHTML = `
                ${submodulesHeaderHTML}
                <span class="q-type-badge write"><i class="fa-solid fa-keyboard"></i> WRITE ANSWER (YOZING)</span>
                <div class="exercise-prompt">${q.prompt}</div>
                <div class="exercise-write-row">
                    <input type="text" class="exercise-write-input" id="exerciseWriteInput" placeholder="Javobingizni yozing..." autocomplete="off">
                    <button class="btn btn-primary" id="exerciseWriteSubmit">Tekshirish</button>
                </div>
                <div class="exercise-feedback" id="exerciseFB"></div>
                <div style="font-size:0.75rem; color:var(--text-dim); text-align:center; margin-top:10px;">
                    <i class="fa-solid fa-database"></i> Faqat shu brauzerda saqlanadi (localStorage)
                </div>
            `;
            const input = document.getElementById('exerciseWriteInput');
            const submitBtn = document.getElementById('exerciseWriteSubmit');
            const submit = () => {
                if (questionLocked) return;
                questionLocked = true;
                input.disabled = true;
                submitBtn.disabled = true;
                const isCorrect = input.value.trim().toLowerCase() === q.answer.toLowerCase();
                handleGamifyAnswer(isCorrect, q.answer);
            };
            submitBtn?.addEventListener('click', submit);
            input?.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
        }

        document.getElementById('watchVideoBtn')?.addEventListener('click', () => {
            localStorage.setItem(videoWatchedKey, 'true');
            addXP(10, "Video darslik ko'rildi!");
            showToast("📺 Video darslik ko'rildi! +10 XP");
            renderGamifyQuestion();
        });
    }

    function handleGamifyAnswer(isCorrect, correctAnswer) {
        const fb = document.getElementById('exerciseFB');
        const m = activeModules[activeModuleIdx];
        const q = m.exercises[activeQIndex];
        const solvedList = gamifyState.solved[m.id] || [];
        const alreadyRewarded = solvedList.includes(activeQIndex);

        if (isCorrect) {
            if (fb) {
                fb.textContent = alreadyRewarded ? "To'g'ri! (Takroriy mashq — mukofotsiz)" : "To'g'ri! +1 ⭐ +1 🪙 +25 XP";
                fb.className = "exercise-feedback ok";
            }
            if (!alreadyRewarded) {
                gamifyState.stars += 1;
                gamifyState.coins += 1;
                solvedList.push(activeQIndex);
                gamifyState.solved[m.id] = solvedList;
                addXP(25, "Modul Mashqi Bajarildi!");
            }
        } else {
            if (fb) {
                fb.textContent = `To'g'ri javob: ${correctAnswer}`;
                fb.className = "exercise-feedback bad";
            }
            if (q.word) {
                addToDictionary(q.word);
            }
        }

        gamifyState.progress[m.id].done = Math.max(gamifyState.progress[m.id].done, solvedList.length);
        touchGamifyStreak();
        saveGamifyState(gamifyState);
        renderGamifyHUD();
        renderGamifySkills();
        renderGamifyRoadmap();

        setTimeout(() => {
            activeQIndex++;
            renderGamifyQuestion();
        }, 1100);
    }

    async function loadCEFRLevelModules(level) {
        currentCEFRLevel = level;
        localStorage.setItem('tayanch_selected_cefr_level', level);
        try {
            const fileName = `modules-${level.toLowerCase()}.json`;
            const res = await fetch(`./${fileName}`);
            if (!res.ok) throw new Error(`HTTP error ${res.status}`);
            const data = await res.json();
            if (Array.isArray(data.modules) && data.modules.length) {
                activeModules = data.modules;
            }
        } catch (e) {
            console.info(`[Tayanch] ${level} modullari fallback massividan yuklandi: ${e.message}`);
            activeModules = MODULES_FALLBACK;
        }
        initModuleProgressShape();
        renderGamifyHUD();
        renderGamifySkills();
        renderGamifyRoadmap();
    }

    /* CEFR Level Transition Confirmation Lock Modal */
    let pendingCEFRLevel = null;

    function openCEFRLockModal(targetLevel) {
        pendingCEFRLevel = targetLevel;
        const modal = document.getElementById('cefrLockModal');
        const title = document.getElementById('cefrLockTargetTitle');
        const desc = document.getElementById('cefrLockTargetDesc');
        if (title) title.textContent = `${targetLevel} Bosqichiga O'tish`;
        if (desc) desc.textContent = `Siz hozir ${currentCEFRLevel} bosqichidasiz. ${targetLevel} bosqichi darslari va topshiriqlariga o'tmoqchimisiz?`;
        if (modal) modal.classList.add('active');
    }

    function closeCEFRLockModal() {
        const modal = document.getElementById('cefrLockModal');
        if (modal) modal.classList.remove('active');
        pendingCEFRLevel = null;
    }

    const cefrLockConfirmBtn = document.getElementById('cefrLockConfirmBtn');
    if (cefrLockConfirmBtn) {
        cefrLockConfirmBtn.addEventListener('click', () => {
            if (pendingCEFRLevel) {
                const targetLevel = pendingCEFRLevel;
                closeCEFRLockModal();
                document.querySelectorAll('.cefr-tab-btn').forEach(b => {
                    b.classList.toggle('active', b.dataset.level === targetLevel);
                });
                loadCEFRLevelModules(targetLevel);
                showToast(`🚀 ${targetLevel} bosqichiga o'tildi!`);
            }
        });
    }

    const cefrLockCancelBtn = document.getElementById('cefrLockCancelBtn');
    if (cefrLockCancelBtn) cefrLockCancelBtn.addEventListener('click', closeCEFRLockModal);

    // CEFR Level Tabs Switching with Lock Confirmation
    document.querySelectorAll('.cefr-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const level = btn.dataset.level || "A1";
            if (level !== currentCEFRLevel) {
                openCEFRLockModal(level);
            }
        });
    });

    /* Resource Library (Kitoblar va Podkastlar) */
    const LIBRARY_RESOURCES = [
        { title: "The Elephant Man", type: "Book", cefr: "CEFR A1", genre: "Classic Story", views: "1.4k ko'rildi", desc: "Boshlang'ich darajadagi moslashtirilgan o'qish kitobi va so'zlar jamlanmasi." },
        { title: "Sherlock Holmes & The Blue Diamond", type: "Book", cefr: "CEFR A2", genre: "Mystery & Crime", views: "2.9k ko'rildi", desc: "A2 Elementary darajasi uchun qiziqarli detektiv hikoya hamda grammatik tahlil." },
        { title: "Circle of Life: Nature Stories", type: "Book", cefr: "CEFR B1", genre: "Education", views: "3.2k ko'rildi", desc: "B1 Pre-Intermediate darajasi uchun tabiat va jamiyat haqidagi akademik hikoyalar." },
        { title: "6 Minute English: Daily Habits", type: "Podcast", cefr: "CEFR B1-B2", genre: "Listening & Pronunciation", views: "8.9k eshitildi", desc: "BBC uslubidagi 6 daqiqali audio dars va haqiqiy talaffuz mashqlari." },
        { title: "AI & Future of Education", type: "Book", cefr: "CEFR B2", genre: "Science & Tech", views: "4.6k ko mezon", desc: "B2 Upper-Intermediate darajasidagi texnologik va akademik o'qish matnlari." },
        { title: "Global Economy & Leadership", type: "Podcast", cefr: "CEFR C1", genre: "Academic Podcast", views: "12.4k eshitildi", desc: "C1 Advanced darajasidagi biznes va akademik tahliliy audio podkast." }
    ];

    function renderResourceLibrary() {
        const container = document.getElementById('libraryGridContainer');
        if (!container) return;

        container.innerHTML = LIBRARY_RESOURCES.map(item => `
            <div class="library-card">
                <div>
                    <div class="library-card-header">
                        <span class="library-badge">${item.type} · ${item.cefr}</span>
                        <span class="library-views"><i class="fa-solid fa-eye"></i> ${item.views}</span>
                    </div>
                    <div class="library-card-title">${item.title}</div>
                    <div class="library-card-desc">${item.desc}</div>
                </div>
                <div class="library-card-footer">
                    <span style="color:var(--accent-purple); font-weight:600;"><i class="fa-solid fa-tag"></i> ${item.genre}</span>
                    <button class="btn btn-secondary speech-btn" data-speech="${item.title}. ${item.desc}" style="padding:6px 12px; font-size:12px;">
                        <i class="fa-solid ${item.type === 'Podcast' ? 'fa-headphones' : 'fa-book-open'}"></i> ${item.type === 'Podcast' ? 'Tinglash' : 'O\'qish'}
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Initialize Gamification Engine with saved level
    const initialSavedLevel = localStorage.getItem('tayanch_selected_cefr_level') || "A1";
    document.querySelectorAll('.cefr-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.level === initialSavedLevel);
    });
    loadCEFRLevelModules(initialSavedLevel);
    renderResourceLibrary();

    // Initialize UI
    updateGamifyUI();

});

/* ==========================================================================
   DIGITAL SAT (DSAT) BLUEBOOK SIMULATOR & VOCAB ENGINE
   ========================================================================== */

// 1. SAT Sample Question Bank (College Board & Original Spec)
const TAYANCH_DSAT_QUESTIONS = [
    // Reading & Writing - Module 1
    {
        id: "rw_m1_q1",
        section: "Reading and Writing",
        moduleName: "Module 1 of 2",
        domain: "Craft and Structure",
        skill: "Context Clues",
        passage: `The researcher's claims regarding climate resilience in alpine vegetation were initially met with significant skepticism. However, recent empirical field trials conducted across mountain ranges have _______ her original hypothesis, demonstrating its reliability under varied environmental stressors.`,
        prompt: "Which choice completes the text with the most logical and precise word?",
        options: ["A) vindicated", "B) refuted", "C) obfuscated", "D) undermined"],
        correctIndex: 0
    },
    {
        id: "rw_m1_q2",
        section: "Reading and Writing",
        moduleName: "Module 1 of 2",
        domain: "Information and Ideas",
        skill: "Central Ideas and Details",
        passage: `In a 2023 study of urban bird species, ornithologists observed that populations residing near heavy traffic corridors exhibited altered vocalization frequencies. The researchers hypothesized that these behavioral adjustments were not merely stress responses, but rather adaptive mechanisms to prevent background noise from masking critical communication signals between nesting pairs.`,
        prompt: "According to the passage, why did urban bird populations alter their vocalization frequencies?",
        options: [
            "A) To signal imminent environmental hazards to predators.",
            "B) To ensure communication signals are audible over urban noise.",
            "C) To conserve vocal energy during peak noise hours.",
            "D) To attract non-native avian species into nesting corridors."
        ],
        correctIndex: 1
    },
    {
        id: "rw_m1_q3",
        section: "Reading and Writing",
        moduleName: "Module 1 of 2",
        domain: "Expression of Ideas",
        skill: "Transitions",
        passage: `High-resolution satellite imagery has enabled archaeologists to locate ancient irrigation canals concealed beneath dense rainforest canopies. _______ field teams can now conduct targeted ground excavations with unprecedented accuracy, minimizing destructive digging.`,
        prompt: "Which choice completes the text with the most logical transition?",
        options: ["A) Consequently,", "B) Conversely,", "C) Nevertheless,", "D) For instance,"],
        correctIndex: 0
    },
    {
        id: "rw_m1_q4",
        section: "Reading and Writing",
        moduleName: "Module 1 of 2",
        domain: "Standard English Conventions",
        skill: "Boundaries & Punctuation",
        passage: `Renowned biochemist Dr. Elena Vance led the research team _______ breakthrough discovery of synthetic enzyme catalysts earned international accolades at the Stockholm symposium.`,
        prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
        options: ["A) whose", "B) who's", "C) whom", "D) which"],
        correctIndex: 0
    },
    {
        id: "rw_m1_q5",
        section: "Reading and Writing",
        moduleName: "Module 1 of 2",
        domain: "Craft and Structure",
        skill: "Text Structure and Purpose",
        passage: `Many nineteenth-century historians posited that technological innovation drove socio-economic transformation in a linear fashion. Contemporary economic historians, by contrast, emphasize that social structures and policy frameworks active during the era often dictated which technological tools gained widespread adoption in the first place.`,
        prompt: "Which choice best states the main purpose of the text?",
        options: [
            "A) To outline a chronological progression of industrial inventions.",
            "B) To contrast two historical perspectives on the relationship between technology and society.",
            "C) To argue that social policy hinders modern economic progress.",
            "D) To defend the validity of nineteenth-century historical methodologies."
        ],
        correctIndex: 1
    },

    // SAT Math - Module 1
    {
        id: "math_m1_q1",
        section: "Math",
        moduleName: "Module 1 of 2",
        domain: "Algebra",
        skill: "Linear Equations & Systems",
        passage: `A local tutoring academy charges a one-time registration fee of $50 plus $30 per hour for individual coaching sessions.`,
        prompt: "If a student pays a total of $260, which equation can be used to find the number of hours, h, of coaching received?",
        options: ["A) 50h + 30 = 260", "B) 30h + 50 = 260", "C) 80h = 260", "D) 30h - 50 = 260"],
        correctIndex: 1
    },
    {
        id: "math_m1_q2",
        section: "Math",
        moduleName: "Module 1 of 2",
        domain: "Advanced Math",
        skill: "Quadratic Equations",
        passage: `Consider the quadratic function f(x) = x² - 6x + 8.`,
        prompt: "What are the x-intercepts of the graph of y = f(x) in the xy-plane?",
        options: ["A) (2, 0) and (4, 0)", "B) (-2, 0) and (-4, 0)", "C) (1, 0) and (8, 0)", "D) (-1, 0) and (-8, 0)"],
        correctIndex: 0
    },
    {
        id: "math_m1_q3",
        section: "Math",
        moduleName: "Module 1 of 2",
        domain: "Problem-Solving & Data Analysis",
        skill: "Percentages & Rates",
        passage: `A laptop computer originally priced at $1,200 is discounted by 15% during a seasonal sale. An additional 5% loyalty discount is then applied to the sale price.`,
        prompt: "What is the final price of the laptop before tax?",
        options: ["A) $960.00", "B) $969.00", "C) $980.00", "D) $1,020.00"],
        correctIndex: 1
    },
    {
        id: "math_m1_q4",
        section: "Math",
        moduleName: "Module 1 of 2",
        domain: "Geometry & Trigonometry",
        skill: "Right Triangles & Trig Ratios",
        passage: `In a right triangle ABC, angle C is the right angle. If sin(A) = 3/5, what is the value of cos(B)?`,
        prompt: "Select the correct value of cos(B):",
        options: ["A) 3/5", "B) 4/5", "C) 5/3", "D) 3/4"],
        correctIndex: 0
    },
    {
        id: "math_m1_q5",
        section: "Math",
        moduleName: "Module 1 of 2",
        domain: "Advanced Math",
        skill: "Exponents & Radicals",
        passage: `If 2^(3x + 1) = 32, what is the value of x?`,
        prompt: "Solve for x:",
        options: ["A) 1", "B) 4/3", "C) 5/3", "D) 2"],
        correctIndex: 1
    }
];

// Simulator State Variables
let currentSatQuestionIndex = 0;
let satUserAnswers = {}; // { questionId: selectedIndex }
let satMarkedQuestions = {}; // { questionId: boolean }
let satStrikethrough = {}; // { questionId: [struckIndices] }
let satTimerSeconds = 32 * 60; // 32 minutes default
let satTimerInterval = null;
let isSatTimerVisible = true;

// Initialize Bluebook Simulator UI
function initBluebookSimulator() {
    const container = document.getElementById('bluebookSimContainer');
    if (!container) return;

    // Load saved test state if exists
    const savedState = localStorage.getItem('tayanch_sat_state');
    if (savedState) {
        try {
            const parsed = JSON.parse(savedState);
            satUserAnswers = parsed.userAnswers || {};
            satMarkedQuestions = parsed.markedQuestions || {};
            currentSatQuestionIndex = parsed.currentIndex || 0;
            satTimerSeconds = parsed.timerSeconds || (32 * 60);
        } catch (e) {
            console.error("Failed to parse saved SAT state", e);
        }
    }

    renderSatQuestion();
    startSatTimer();
    updateQuestionGridNav();
}

// Render current question
function renderSatQuestion() {
    const q = TAYANCH_DSAT_QUESTIONS[currentSatQuestionIndex];
    if (!q) return;

    // Update section badges
    const sectionBadge = document.getElementById('simSectionTitle');
    const moduleBadge = document.getElementById('simModuleTitle');
    const qNumTitle = document.getElementById('simQNumberTitle');
    const contextPane = document.getElementById('simContextContent');
    const promptText = document.getElementById('simQPromptText');
    const choicesContainer = document.getElementById('simChoicesContainer');

    if (sectionBadge) sectionBadge.textContent = q.section;
    if (moduleBadge) moduleBadge.textContent = q.moduleName;
    if (qNumTitle) qNumTitle.textContent = `Question ${currentSatQuestionIndex + 1} of ${TAYANCH_DSAT_QUESTIONS.length}`;

    // Context & Prompt
    if (contextPane) {
        contextPane.innerHTML = `
            <div class="domain-tag mb-2" style="font-size:0.8rem; color:var(--accent-gold);"><i class="fa-solid fa-layer-group"></i> ${q.domain} • ${q.skill}</div>
            <p style="font-size:1rem; line-height:1.8; color:#e2e8f0;">${q.passage}</p>
        `;
    }
    if (promptText) promptText.textContent = q.prompt;

    // Choices
    if (choicesContainer) {
        const struck = satStrikethrough[q.id] || [];
        const selected = satUserAnswers[q.id];

        choicesContainer.innerHTML = q.options.map((opt, idx) => {
            const isStruck = struck.includes(idx);
            const isSelected = selected === idx;
            const keyChar = String.fromCharCode(65 + idx);
            const labelText = opt.replace(/^[A-D]\)\s*/, '');

            return `
                <button class="choice-btn ${isSelected ? 'selected' : ''} ${isStruck ? 'struck-through' : ''}" onclick="selectSatChoice(${idx})">
                    <span class="choice-key">${keyChar}</span>
                    <span class="choice-text">${labelText}</span>
                </button>
            `;
        }).join('');
    }

    // Update Mark for Review Button
    const markBtn = document.getElementById('markReviewBtn');
    const markText = document.getElementById('markReviewText');
    const isMarked = !!satMarkedQuestions[q.id];
    if (markBtn) {
        markBtn.classList.toggle('active', isMarked);
        if (markText) markText.textContent = isMarked ? 'Marked' : 'Mark for Review';
    }

    // Update Prev / Next / Finish Buttons
    const prevBtn = document.getElementById('simPrevBtn');
    const nextBtn = document.getElementById('simNextBtn');
    const finishBtn = document.getElementById('simFinishModBtn');

    if (prevBtn) prevBtn.disabled = (currentSatQuestionIndex === 0);
    if (nextBtn) {
        if (currentSatQuestionIndex === TAYANCH_DSAT_QUESTIONS.length - 1) {
            nextBtn.classList.add('hidden');
            if (finishBtn) finishBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            if (finishBtn) finishBtn.classList.add('hidden');
        }
    }

    // Update answered count badge
    const answeredCount = Object.keys(satUserAnswers).length;
    const answeredBadge = document.getElementById('answeredCountBadge');
    if (answeredBadge) answeredBadge.textContent = `${answeredCount}/${TAYANCH_DSAT_QUESTIONS.length}`;

    // Re-render MathJax formulas if present
    if (window.MathJax) {
        MathJax.typesetPromise && MathJax.typesetPromise();
    }
}

// Select choice
function selectSatChoice(idx) {
    const q = TAYANCH_DSAT_QUESTIONS[currentSatQuestionIndex];
    if (!q) return;

    const strikethroughMode = document.getElementById('strikethroughModeToggle')?.checked;
    if (strikethroughMode) {
        // Toggle strikethrough
        let struck = satStrikethrough[q.id] || [];
        if (struck.includes(idx)) {
            struck = struck.filter(i => i !== idx);
        } else {
            struck.push(idx);
        }
        satStrikethrough[q.id] = struck;
    } else {
        // Normal selection
        satUserAnswers[q.id] = idx;
    }
    renderSatQuestion();
    updateQuestionGridNav();
}

// Toggle Mark for Review
function toggleMarkForReview() {
    const q = TAYANCH_DSAT_QUESTIONS[currentSatQuestionIndex];
    if (!q) return;

    satMarkedQuestions[q.id] = !satMarkedQuestions[q.id];
    renderSatQuestion();
    updateQuestionGridNav();
}

// Prev / Next question navigation
function prevSimQuestion() {
    if (currentSatQuestionIndex > 0) {
        currentSatQuestionIndex--;
        renderSatQuestion();
    }
}

function nextSimQuestion() {
    if (currentSatQuestionIndex < TAYANCH_DSAT_QUESTIONS.length - 1) {
        currentSatQuestionIndex++;
        renderSatQuestion();
    }
}

// Question Grid Modal
function toggleQuestionGridModal() {
    const modal = document.getElementById('qGridModal');
    if (!modal) return;
    modal.classList.toggle('hidden');
    if (!modal.classList.contains('hidden')) {
        updateQuestionGridNav();
    }
}

function updateQuestionGridNav() {
    const gridButtonsContainer = document.getElementById('qGridButtons');
    if (!gridButtonsContainer) return;

    gridButtonsContainer.innerHTML = TAYANCH_DSAT_QUESTIONS.map((q, idx) => {
        const isAnswered = satUserAnswers[q.id] !== undefined;
        const isMarked = !!satMarkedQuestions[q.id];

        let classes = 'q-grid-btn';
        if (isAnswered) classes += ' answered';
        if (isMarked) classes += ' marked';

        return `
            <button class="${classes}" onclick="jumpToSatQuestion(${idx})">
                ${idx + 1} ${isMarked ? '🚩' : ''}
            </button>
        `;
    }).join('');
}

function jumpToSatQuestion(idx) {
    currentSatQuestionIndex = idx;
    renderSatQuestion();
    const modal = document.getElementById('qGridModal');
    if (modal) modal.classList.add('hidden');
}

// Timer Logic
function startSatTimer() {
    if (satTimerInterval) clearInterval(satTimerInterval);

    satTimerInterval = setInterval(() => {
        if (satTimerSeconds > 0) {
            satTimerSeconds--;
            updateTimerDisplay();
        } else {
            clearInterval(satTimerInterval);
            alert("Vaqt tugadi! Diagnostic mock test yakunlanmoqda.");
            submitCurrentModule();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerDisplay = document.getElementById('simTimerDisplay');
    if (!timerDisplay) return;

    const mins = Math.floor(satTimerSeconds / 60);
    const secs = satTimerSeconds % 60;
    timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function toggleSimTimer() {
    const timerDisplay = document.getElementById('simTimerDisplay');
    const toggleText = document.getElementById('timerToggleText');
    if (!timerDisplay) return;

    isSatTimerVisible = !isSatTimerVisible;
    timerDisplay.style.display = isSatTimerVisible ? 'inline' : 'none';
    if (toggleText) toggleText.textContent = isSatTimerVisible ? '(Yashirish)' : '(Ko\'rsatish)';
}

// Math Formula Modal Toggle
function toggleSimFormulas() {
    const modal = document.getElementById('formulaModal');
    if (modal) modal.classList.toggle('hidden');
}

// Calculator Modal & Keypad
function toggleSimCalculator() {
    const modal = document.getElementById('calcModal');
    if (modal) modal.classList.toggle('hidden');
}

let calcExpression = "0";

function calcInput(char) {
    const display = document.getElementById('calcDisplay');
    if (!display) return;

    if (calcExpression === "0" || calcExpression === "Error") {
        calcExpression = char === "sqrt" ? "Math.sqrt(" : char;
    } else {
        calcExpression += char === "sqrt" ? "Math.sqrt(" : char;
    }
    if (char === 'C') calcExpression = "0";
    display.textContent = calcExpression;
}

function calcEvaluate() {
    const display = document.getElementById('calcDisplay');
    if (!display) return;

    try {
        const res = eval(calcExpression.replace(/×/g, '*').replace(/÷/g, '/'));
        calcExpression = String(res);
        display.textContent = calcExpression;
    } catch (e) {
        calcExpression = "Error";
        display.textContent = "Error";
    }
}

// Pause and Save Test State to localStorage
function pauseAndSaveTest() {
    const state = {
        userAnswers: satUserAnswers,
        markedQuestions: satMarkedQuestions,
        currentIndex: currentSatQuestionIndex,
        timerSeconds: satTimerSeconds
    };
    localStorage.setItem('tayanch_sat_state', JSON.stringify(state));
    alert("Test holati muvaffaqiyatli saqlandi! Keyinroq 'Resume' qilib davom ettirishingiz mumkin.");
}

// Submit Module & Calculate Score
function submitCurrentModule() {
    if (satTimerInterval) clearInterval(satTimerInterval);

    // Calculate score
    let correctCount = 0;
    let totalQuestions = TAYANCH_DSAT_QUESTIONS.length;

    let domainStats = {
        "Craft and Structure": { correct: 0, total: 0 },
        "Information and Ideas": { correct: 0, total: 0 },
        "Expression of Ideas": { correct: 0, total: 0 },
        "Standard English Conventions": { correct: 0, total: 0 },
        "Algebra": { correct: 0, total: 0 },
        "Advanced Math": { correct: 0, total: 0 },
        "Problem-Solving & Data Analysis": { correct: 0, total: 0 },
        "Geometry & Trigonometry": { correct: 0, total: 0 }
    };

    TAYANCH_DSAT_QUESTIONS.forEach(q => {
        if (domainStats[q.domain]) {
            domainStats[q.domain].total++;
        }
        if (satUserAnswers[q.id] === q.correctIndex) {
            correctCount++;
            if (domainStats[q.domain]) {
                domainStats[q.domain].correct++;
            }
        }
    });

    // Score Scaling Algorithm (College Board 400-1600 estimate)
    const accuracyRatio = correctCount / totalQuestions;
    const estimatedTotalScore = Math.round(400 + accuracyRatio * 1200);
    const rwScore = Math.round(200 + accuracyRatio * 600);
    const mathScore = Math.round(200 + accuracyRatio * 600);

    // Update Score Report UI
    const reportSection = document.getElementById('satDiagnosticReport');
    const totalDisplay = document.getElementById('diagTotalScore');
    const rwDisplay = document.getElementById('diagRWScore');
    const mathDisplay = document.getElementById('diagMathScore');

    if (totalDisplay) totalDisplay.textContent = estimatedTotalScore;
    if (rwDisplay) rwDisplay.textContent = rwScore;
    if (mathDisplay) mathDisplay.textContent = mathScore;

    // Show Report Section
    if (reportSection) {
        reportSection.classList.remove('hidden');
        reportSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Award User XP
    if (typeof addXP === 'function') {
        addXP(150, "Digital SAT Mock Test Yakunlandi");
    }
}

function restartSatTest() {
    satUserAnswers = {};
    satMarkedQuestions = {};
    currentSatQuestionIndex = 0;
    satTimerSeconds = 32 * 60;
    localStorage.removeItem('tayanch_sat_state');

    const reportSection = document.getElementById('satDiagnosticReport');
    if (reportSection) reportSection.classList.add('hidden');

    initBluebookSimulator();
    const simSection = document.getElementById('simulator');
    if (simSection) simSection.scrollIntoView({ behavior: 'smooth' });
}

// 2. SAT Vocabulary Builder & Spaced Repetition System (SRS)
const TAYANCH_SAT_VOCAB = [
    { word: "Anomalous", pos: "adjective • /əˈnɒm.ə.ləs/", uz: "Me'yordan chetga chiqqan, g'ayrioddiy", en: "Deviating from what is standard, normal, or expected.", example: "The scientist noted an anomalous result in the lab data." },
    { word: "Equivocal", pos: "adjective • /ɪˈkwɪv.ə.kəl/", uz: "Noaniq, ikki ma'noli, mavhum", en: "Open to more than one interpretation; ambiguous.", example: "The minister gave an equivocal response to the press." },
    { word: "Lucid", pos: "adjective • /ˈluː.sɪd/", uz: "Tushunarli, ravshan, mantiqiy", en: "Expressed clearly; easy to understand.", example: "Her explanation of quantum physics was remarkably lucid." },
    { word: "Precipitate", pos: "verb • /prɪˈsɪp.ɪ.teɪt/", uz: "Tezlashtirish, sabab bo'lish", en: "Cause an event or situation to happen suddenly or unexpectedly.", example: "The economic crisis precipitated widespread political reforms." },
    { word: "Erudite", pos: "adjective • /ˈer.jə.daɪt/", uz: "Bilimdon, ilmli, zakovatli", en: "Having or showing great knowledge or learning.", example: "The professor delivered an erudite lecture on ancient Roman law." },
    { word: "Opaque", pos: "adjective • /oʊˈpaɪk/", uz: "Tushunarsiz, shaffof bo'lmagan", en: "Not transparent; hard or impossible to understand.", example: "The government's financial reports remained opaque to the public." },
    { word: "Prodigal", pos: "adjective • /ˈprɒd.ɪ.ɡəl/", uz: "Isrofgarchi, bexuda sarflaydigan", en: "Spending money or resources freely and recklessly.", example: "The prodigal heir spent his fortune within three years." },
    { word: "Enervate", pos: "verb • /ˈen.ə.veɪt/", uz: "Holsizlantirmoq, quvvatdan qoldirmoq", en: "Cause someone to feel drained of energy or vitality.", example: "The intense summer heat enervated the marathon runners." }
];

let currentVocabIndex = 0;

function renderVocabCard() {
    const wordObj = TAYANCH_SAT_VOCAB[currentVocabIndex];
    if (!wordObj) return;

    const flashcard = document.getElementById('vocabFlashcard');
    const wordFront = document.getElementById('vocabWordFront');
    const posFront = document.getElementById('vocabPosFront');
    const defUz = document.getElementById('vocabDefUz');
    const defEn = document.getElementById('vocabDefEn');
    const example = document.getElementById('vocabExample');
    const curIdxText = document.getElementById('currentWordIndex');
    const totalCountText = document.getElementById('totalWordsCount');

    if (flashcard) flashcard.classList.remove('flipped');
    if (wordFront) wordFront.textContent = wordObj.word;
    if (posFront) posFront.textContent = wordObj.pos;
    if (defUz) defUz.textContent = wordObj.uz;
    if (defEn) defEn.textContent = wordObj.en;
    if (example) example.textContent = `"${wordObj.example}"`;
    if (curIdxText) curIdxText.textContent = currentVocabIndex + 1;
    if (totalCountText) totalCountText.textContent = TAYANCH_SAT_VOCAB.length;
}

function flipFlashcard() {
    const flashcard = document.getElementById('vocabFlashcard');
    if (flashcard) flashcard.classList.toggle('flipped');
}

function rateVocabCard(rating, event) {
    if (event) event.stopPropagation();

    // SRS progression
    currentVocabIndex = (currentVocabIndex + 1) % TAYANCH_SAT_VOCAB.length;
    renderVocabCard();

    if (typeof addXP === 'function') {
        addXP(10, "SAT Vocab Flashcard O'rganildi");
    }
}

// 3. Parent / Teacher Access Modal Handler
function openParentModal() {
    const modal = document.getElementById('parentModal');
    if (modal) modal.classList.remove('hidden');
}

function closeParentModal() {
    const modal = document.getElementById('parentModal');
    if (modal) modal.classList.add('hidden');
}

function submitParentAccessCode() {
    const input = document.getElementById('parentJoinCodeInput');
    const resultAlert = document.getElementById('parentAccessResult');
    if (!input || !resultAlert) return;

    const val = input.value.trim().toUpperCase();
    if (val === 'TAYANCH-SAT-2026' || val.length >= 4) {
        resultAlert.classList.remove('hidden');
        resultAlert.style.color = '#10b981';
        resultAlert.innerHTML = `<i class="fa-solid fa-circle-check"></i> Kod tasdiqlandi! Demo sinf va o'quvchilar progress dashboardi yuklandi.`;
    } else {
        resultAlert.classList.remove('hidden');
        resultAlert.style.color = '#ef4444';
        resultAlert.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Noto'g'ri kod. Iltimos 'TAYANCH-SAT-2026' kodini kiriting.`;
    }
}

// Initialize Bluebook Simulator & Vocab Card on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    initBluebookSimulator();
    renderVocabCard();
});

/* ============================================================
   20. PHASE 7 — RESOURCE LIBRARY (Books & Podcasts)
   Englify tahlili asosida: CEFR + janr teglari, ko'rishlar soni.
   Backend'siz: faqat localStorage'da ochilish soni saqlanadi.
   ============================================================ */
(function () {
    const grid = document.getElementById('resourceGrid');
    if (!grid) return; // faqat GE sahifasida

    const RESOURCES_KEY = 'tayanch_resource_views_v1';
    let resources = [];
    const filters = { type: 'all', cefr: 'all', genre: 'all' };

    function getViews() { try { return JSON.parse(localStorage.getItem(RESOURCES_KEY)) || {}; } catch (e) { return {}; } }
    function saveViews(v) { localStorage.setItem(RESOURCES_KEY, JSON.stringify(v)); }

    function typeLabel(t) { return t === 'book' ? 'Kitob' : 'Podkast'; }
    function iconFor(item) { return item.typeLabel === 'book' ? 'fa-book' : 'fa-podcast'; }
    function gradFor(cefr) {
        return { A1: 'a1', A2: 'a2', B1: 'b1', B2: 'b2', C1: 'c1' }[cefr] || 'b1';
    }

    function totalViews(item, viewsMap) {
        return (item.views || 0) + (viewsMap[item.id] || 0);
    }

    function cardHTML(item, viewsMap) {
        const tv = totalViews(item, viewsMap).toLocaleString('en-US');
        return `
            <div class="resource-card liquid-card" data-id="${item.id}" data-type="${item.typeLabel}" data-cefr="${item.cefr}" data-genre="${item.genre}">
                <div class="resource-cover res-grad-${gradFor(item.cefr)}">
                    <i class="fa-solid ${iconFor(item)}"></i>
                </div>
                <div class="resource-body">
                    <div class="resource-type-badge"><i class="fa-solid ${iconFor(item)}"></i> ${typeLabel(item.typeLabel)}</div>
                    <h4 class="resource-title">${item.title}</h4>
                    <div class="resource-author">${item.author || ''}</div>
                    <div class="resource-tags">
                        <span class="res-tag cefr">${item.cefr}</span>
                        <span class="res-tag genre">${item.genre}</span>
                    </div>
                    <p class="resource-blurb">${item.blurb || ''}</p>
                    <div class="resource-foot">
                        <span class="resource-views"><i class="fa-solid fa-eye"></i> ${tv} ko'rish</span>
                        <button class="btn btn-sm btn-secondary resource-open-btn">Ochish</button>
                    </div>
                </div>
            </div>`;
    }

    function applyFilters() {
        let list = resources.slice();
        if (filters.type !== 'all') list = list.filter(x => x.typeLabel === filters.type);
        if (filters.cefr !== 'all') list = list.filter(x => x.cefr === filters.cefr);
        if (filters.genre !== 'all') list = list.filter(x => x.genre === filters.genre);
        grid.innerHTML = list.map(it => cardHTML(it, getViews())).join('');
        const emptyNote = document.getElementById('resourceEmptyNote');
        if (emptyNote) emptyNote.style.display = list.length ? 'none' : 'block';
    }

    function openResource(id) {
        const views = getViews();
        views[id] = (views[id] || 0) + 1;
        saveViews(views);
        const card = grid.querySelector(`.resource-card[data-id="${id}"]`);
        const item = resources.find(r => r.id === id);
        if (card && item) {
            const vEl = card.querySelector('.resource-views');
            if (vEl) vEl.innerHTML = `<i class="fa-solid fa-eye"></i> ${totalViews(item, views).toLocaleString('en-US')} ko'rish`;
            card.classList.add('just-opened');
        }
        if (typeof showToast === 'function') showToast("📚 Resurs ochildi va ko'rishlar soni yangilandi");
    }

    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.resource-card');
        if (card) openResource(card.dataset.id);
    });

    const filtersEl = document.getElementById('resourceFilters');
    if (filtersEl) {
        filtersEl.addEventListener('click', (e) => {
            const btn = e.target.closest('.res-filter-btn');
            if (!btn) return;
            const group = btn.closest('.filter-group').dataset.filter;
            btn.closest('.filter-group').querySelectorAll('.res-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filters[group] = btn.dataset.value;
            applyFilters();
        });
    }

    async function initResources() {
        try {
            const res = await fetch('./resources.json');
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const data = await res.json();
            resources = []
                .concat((data.books || []).map(b => Object.assign({ typeLabel: 'book' }, b)))
                .concat((data.podcasts || []).map(p => Object.assign({ typeLabel: 'podcast' }, p)));
            applyFilters();
        } catch (err) {
            grid.innerHTML = `<p class="resource-empty-note">Resurslar yuklanmadi (${escapeHtml(err.message)}).</p>`;
        }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initResources);
    else initResources();
})();





// --- Dinamik Countdown Taymer (Kun - Soat - Daqiqa - Soniya) ---
(function initCountdown() {
  // Keyingi qabul muddati (hozirgi vaqtdan 3 kun keyinga)
  let targetDate = localStorage.getItem('tayanch_deadline_v1');
  if (!targetDate || new Date(targetDate) <= new Date()) {
    targetDate = new Date(Date.now() + (2 * 24 * 3600 + 14 * 3600 + 35 * 60 + 50) * 1000).toISOString();
    localStorage.setItem('tayanch_deadline_v1', targetDate);
  }

  function updateTimer() {
    const diff = Math.max(0, Math.floor((new Date(targetDate) - new Date()) / 1000));
    const d = Math.floor(diff / (24 * 3600));
    const h = Math.floor((diff % (24 * 3600)) / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;

    const elD = document.getElementById('cd-days');
    const elH = document.getElementById('cd-hours');
    const elM = document.getElementById('cd-minutes');
    const elS = document.getElementById('cd-seconds');

    if (elD) elD.textContent = String(d).padStart(2, '0');
    if (elH) elH.textContent = String(h).padStart(2, '0');
    if (elM) elM.textContent = String(m).padStart(2, '0');
    if (elS) elS.textContent = String(s).padStart(2, '0');
  }

  setInterval(updateTimer, 1000);
  updateTimer();
})();


/* --- 360 Scroll Visualizer (Progressive Frame Loader) — O'CHIRILDI (2026-09-02) ---
   Sabab: loader `assets/frames/frame_XXX.jpg` fayllarini yuklashga urinardi,
   lekin loyihada `assets/frames/` katalogi MAVJUD EMAS (faqat assets/images/ bor).
   Natijada har bir sahifa yuklanganda 60 ta (mobilda 20 ta) 404 so'rov ketardi
   va 40 ms interval bilan tarmoq chalg'itilardi.

   Hero canvas (`.drawFrame()`) kadrlarni protsessual chizadi — tashqi rasm
   fayllaridan umuman foydalanmaydi. Shuning uchun bu blok to'liq o'lik kod edi.

   Agar kelajakda haqiqiy 360° render qilingan kadrlar qo'shilsa, bu yerga
   mavjudligini tekshiruvchi (HEAD so'rov yoki katalog ro'yxati) shart qo'yish kerak. */

/* ============================================================
   3 PILLARS — yo'nalish kartasini kurs filtriga bog'lash (B3)
   Karta bosilganda tegishli .tab-btn ni "click" qilamiz —
   mavjud filtr mantiqi (currentCategory/renderCourses) o'zgarishsiz ishlaydi.
   ============================================================ */
(function initPillarsFilter() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPillarsFilter);
        return;
    }

    document.querySelectorAll('[data-pillar-filter]').forEach(function (card) {
        card.addEventListener('click', function () {
            var category = card.dataset.pillarFilter;
            var tab = document.querySelector('.tab-btn[data-category="' + category + '"]');
            if (tab) tab.click();
        });
    });
})();

/* ============================================================
   FOOTER YEAR — avtomatik joriy yilni hisoblash
   hardcoded yilni dynamic qiladi, kelajakda qo'lda tuzatish kerak emas
   ============================================================ */
(function initFooterYear() {
    var yearEl = document.getElementById('footerYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
})();
