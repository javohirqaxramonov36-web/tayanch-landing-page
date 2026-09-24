import os, subprocess, re
from datetime import date

REPO = "/Users/javohir/tayanch-landing-page"

def read(fn):
    with open(os.path.join(REPO, fn), "r", encoding="utf-8") as f:
        return f.read()

def write(fn, content):
    with open(os.path.join(REPO, fn), "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  Saqlandi: {fn}")

def commit(msg):
    subprocess.run("git add -A", cwd=REPO, shell=True)
    r = subprocess.run(f'git commit -m "{msg}"', cwd=REPO, shell=True, capture_output=True, text=True)
    h = subprocess.run("git rev-parse --short HEAD", cwd=REPO, shell=True, capture_output=True, text=True).stdout.strip()
    print(f"  Commit [{h}]: {msg}" if r.returncode == 0 else f"  Xato: {r.stderr.strip()}")
    return h

def push():
    r = subprocess.run("git push origin main", cwd=REPO, shell=True, capture_output=True, text=True)
    print("  Push:", r.stdout.strip() or r.stderr.strip() or "OK")

# 1. CSS
print("\n=== CSS qo'shish ===")
css_add = """
/* PROMPT 13 — Feature CTAs, AI Demo, Search, Badge, Breadcrumb */
.hero-feature-cards{display:flex;gap:.75rem;margin-top:1.25rem;flex-wrap:wrap}
.feature-cta-card{display:flex;align-items:center;gap:.75rem;padding:.75rem 1rem;border-radius:12px;text-decoration:none;color:inherit;flex:1 1 260px;border:1px solid rgba(124,111,255,.2);transition:transform .2s,border-color .2s;cursor:pointer;min-width:0}
.feature-cta-card:hover{transform:translateY(-2px);border-color:rgba(124,111,255,.5);box-shadow:0 4px 20px rgba(124,111,255,.15)}
.feature-cta-card:focus-visible{outline:2px solid #7C6FFF;outline-offset:2px}
.feature-icon-box{width:40px;height:40px;border-radius:10px;background:rgba(124,111,255,.12);display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0}
.feature-text-box{display:flex;flex-direction:column;gap:.15rem;min-width:0}
.feature-pill{font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;background:rgba(124,111,255,.15);color:#7C6FFF;padding:.1rem .45rem;border-radius:4px;width:fit-content}
.feature-pill-teal{background:rgba(0,212,170,.12)!important;color:#00D4AA!important}
.feature-text-box strong{font-size:.82rem;color:var(--text-primary,#E8E8F0);line-height:1.35;white-space:normal}
.feature-hint{font-size:.72rem;color:var(--text-muted,#888)}
.ai-demo-section{padding:4rem 0 3rem}
.ai-demo-wrapper{max-width:800px;margin:0 auto;overflow:hidden;border-radius:16px}
.ai-demo-tabs{display:flex;border-bottom:1px solid rgba(255,255,255,.08);padding:1rem 1.25rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch}
.ai-tab-btn{background:none;border:none;border-bottom:2px solid transparent;color:var(--text-muted,#8888A0);padding:.5rem 1rem;font-size:.85rem;cursor:pointer;transition:color .2s,border-color .2s;white-space:nowrap;display:flex;align-items:center;gap:.4rem}
.ai-tab-btn.active,.ai-tab-btn:hover{color:#7C6FFF;border-bottom-color:#7C6FFF}
.ai-tab-btn:focus-visible{outline:2px solid #7C6FFF;outline-offset:-2px}
.ai-demo-body{padding:1.5rem}
.ai-demo-panel{display:none}
.ai-demo-panel.active{display:flex;flex-direction:column;gap:1rem}
.demo-task-box{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:1rem 1.1rem}
.demo-task-label{display:block;font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;color:#7C6FFF;font-weight:700;margin-bottom:.4rem}
.demo-task-box p{font-size:.9rem;color:var(--text-secondary,#C0C0D0);margin:0}
.demo-result-box{display:flex;flex-direction:column;gap:.8rem}
.demo-score-row{display:flex;align-items:center;gap:.75rem;flex-wrap:wrap}
.demo-score-pill{background:rgba(124,111,255,.15);color:#7C6FFF;padding:.25rem .8rem;border-radius:20px;font-size:.8rem;font-weight:700}
.demo-score-pill--gold{background:rgba(255,200,50,.12)!important;color:#FFC832!important}
.demo-score-pill--teal{background:rgba(0,212,170,.12)!important;color:#00D4AA!important}
.demo-engine-label{font-size:.75rem;color:var(--text-muted,#888)}
.demo-criteria{display:flex;flex-direction:column;gap:.35rem}
.crit-row{display:flex;justify-content:space-between;align-items:center;font-size:.85rem;padding:.3rem 0;border-bottom:1px solid rgba(255,255,255,.04);gap:.5rem}
.crit-row:last-child{border-bottom:none}
.crit-ok{color:#4ADE80;font-size:.8rem;text-align:right;white-space:nowrap}
.crit-warn{color:#FBBF24;font-size:.8rem;text-align:right;white-space:nowrap}
.course-search-wrapper{margin-bottom:1.5rem}
.search-input-wrap{position:relative;max-width:420px}
.search-icon{position:absolute;left:.9rem;top:50%;transform:translateY(-50%);color:var(--text-muted,#888);pointer-events:none;font-size:.85rem;z-index:1}
.course-search-input{width:100%;box-sizing:border-box;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:.6rem 1rem .6rem 2.5rem;color:var(--text-primary,#E8E8F0);font-size:.9rem;outline:none;transition:border-color .2s,background .2s}
.course-search-input:focus{border-color:rgba(124,111,255,.5);background:rgba(255,255,255,.07)}
.course-search-input:focus-visible{outline:2px solid #7C6FFF;outline-offset:2px}
.course-search-input::placeholder{color:var(--text-muted,#888)}
.course-badge.badge-top{background:rgba(255,200,50,.15)!important;color:#FFC832!important;border-color:rgba(255,200,50,.3)!important}
.course-badge.badge-new{background:rgba(74,222,128,.15)!important;color:#4ADE80!important;border-color:rgba(74,222,128,.3)!important}
.breadcrumb{display:flex;align-items:center;gap:.4rem;font-size:.8rem;color:var(--text-muted,#888);padding:.5rem 0 0;margin-bottom:1.25rem;flex-wrap:wrap}
.breadcrumb a{color:var(--text-muted,#888);text-decoration:none;display:flex;align-items:center;gap:.3rem;transition:color .2s}
.breadcrumb a:hover{color:#7C6FFF}
.breadcrumb a:focus-visible{outline:2px solid #7C6FFF;outline-offset:2px;border-radius:2px}
.breadcrumb-sep{color:rgba(255,255,255,.25);user-select:none}
.breadcrumb-current{color:var(--text-primary,#E8E8F0);font-weight:500}
@media(max-width:640px){.hero-feature-cards{flex-direction:column}.feature-cta-card{flex:1 1 100%}.ai-demo-tabs{overflow-x:auto}.search-input-wrap{max-width:100%}.crit-row{flex-wrap:wrap}}
"""
css = read("styles.css")
if "PROMPT 13" not in css:
    write("styles.css", css + css_add)

# 2. index.html
print("\n=== index.html (B1 + B2) ===")
idx = read("index.html")
b1 = """
                    <!-- P13-B1: Hero CTA Kartalari -->
                    <div class="hero-feature-cards hero-fade">
                        <a href="sat-dsat.html#essay-checker" class="feature-cta-card glass-panel shine-effect">
                            <div class="feature-icon-box"><i class="fa-solid fa-pen-nib" style="color:#7C6FFF;"></i></div>
                            <div class="feature-text-box">
                                <span class="feature-pill">AI Writing</span>
                                <strong>Bepul AI insho tekshiruvchini sinab ko&#39;ring &#8594;</strong>
                                <span class="feature-hint">Writing Task 2 &middot; Band&nbsp;6.5 namunasi</span>
                            </div>
                        </a>
                        <a href="sat-mock.html" class="feature-cta-card glass-panel shine-effect">
                            <div class="feature-icon-box"><i class="fa-solid fa-laptop-code" style="color:#00D4AA;"></i></div>
                            <div class="feature-text-box">
                                <span class="feature-pill feature-pill-teal">Bluebook SAT</span>
                                <strong>Haqiqiy Bluebook SAT mock-testni boshlang &#8594;</strong>
                                <span class="feature-hint">Full Test &middot; 98 savol &middot; Vaqt belgilangan</span>
                            </div>
                        </a>
                    </div>"""
anchor1 = '                    </div>\n\n                    <div class="hero-stats-row'
if "hero-feature-cards" not in idx:
    if anchor1 in idx:
        idx = idx.replace(anchor1, '                    </div>' + b1 + '\n\n                    <div class="hero-stats-row', 1)
    else:
        anchor1b = '                    <div class="hero-stats-row'
        if anchor1b in idx:
            idx = idx.replace(anchor1b, b1.strip() + '\n\n                    <div class="hero-stats-row', 1)

b2 = """
        <!-- P13-B2: AI Mini-Demo (statik) -->
        <section class="section ai-demo-section" id="ai-demo">
            <div class="container">
                <div class="section-header text-center gsap-reveal">
                    <div class="section-tag">Bepul Sinov</div>
                    <h2 class="section-title">AI yozish <span class="gradient-text">tahlilini ko&#39;ring</span></h2>
                    <p class="section-desc">Namunadan birini tanlang &mdash; AI qanday baholashini ko&#39;ring.</p>
                </div>
                <div class="ai-demo-wrapper liquid-card glass-panel gsap-reveal">
                    <div class="ai-demo-tabs" role="tablist">
                        <button type="button" class="ai-tab-btn active" role="tab" aria-selected="true" aria-controls="demo-panel-1" data-target="demo-panel-1"><i class="fa-solid fa-pencil"></i> IELTS Writing</button>
                        <button type="button" class="ai-tab-btn" role="tab" aria-selected="false" aria-controls="demo-panel-2" data-target="demo-panel-2"><i class="fa-solid fa-file-lines"></i> College Essay</button>
                        <button type="button" class="ai-tab-btn" role="tab" aria-selected="false" aria-controls="demo-panel-3" data-target="demo-panel-3"><i class="fa-solid fa-robot"></i> ChatGPT Prompt</button>
                    </div>
                    <div class="ai-demo-body">
                        <div class="ai-demo-panel active" id="demo-panel-1" role="tabpanel">
                            <div class="demo-task-box">
                                <span class="demo-task-label">Topshiriq namunasi</span>
                                <p>&ldquo;Some people think universities should provide practical skills. Others believe they should focus on academic subjects. Discuss both views.&rdquo; &mdash; 250+ so&#39;z</p>
                            </div>
                            <div class="demo-result-box">
                                <div class="demo-score-row"><span class="demo-score-pill">Band 6.5 &rarr; 7.0</span><span class="demo-engine-label"><i class="fa-solid fa-microchip"></i> AI Tahlil</span></div>
                                <div class="demo-criteria">
                                    <div class="crit-row"><span>Task Achievement</span><span class="crit-ok"><i class="fa-solid fa-check"></i> To&#39;liq</span></div>
                                    <div class="crit-row"><span>Coherence &amp; Cohesion</span><span class="crit-ok"><i class="fa-solid fa-check"></i> Yaxshi</span></div>
                                    <div class="crit-row"><span>Lexical Resource</span><span class="crit-warn"><i class="fa-solid fa-triangle-exclamation"></i> Takror so&#39;z bor</span></div>
                                    <div class="crit-row"><span>Grammar</span><span class="crit-ok"><i class="fa-solid fa-check"></i> 2 kichik xato</span></div>
                                </div>
                                <a href="sat-dsat.html#essay-checker" class="btn btn-sm btn-primary btn-liquid"><i class="fa-solid fa-pen-nib"></i> O&#39;z inshoingizni tekshirish &rarr;<div class="liquid-wave"></div></a>
                            </div>
                        </div>
                        <div class="ai-demo-panel" id="demo-panel-2" role="tabpanel">
                            <div class="demo-task-box">
                                <span class="demo-task-label">Common App Essay</span>
                                <p>&ldquo;Describe a challenge you&#39;ve overcome and what it taught you.&rdquo; &mdash; 650 so&#39;z, Harvard/MIT uchun</p>
                            </div>
                            <div class="demo-result-box">
                                <div class="demo-score-row"><span class="demo-score-pill demo-score-pill--gold">Top Universitetlar</span><span class="demo-engine-label"><i class="fa-solid fa-microchip"></i> AI Tahlil</span></div>
                                <div class="demo-criteria">
                                    <div class="crit-row"><span>Hook (birinchi jumla)</span><span class="crit-ok"><i class="fa-solid fa-check"></i> E&#39;tiborni tortadi</span></div>
                                    <div class="crit-row"><span>Shaxsiy ovoz</span><span class="crit-warn"><i class="fa-solid fa-triangle-exclamation"></i> Umumiy hikoya</span></div>
                                    <div class="crit-row"><span>Show, don&#39;t tell</span><span class="crit-ok"><i class="fa-solid fa-check"></i> Rioya qilingan</span></div>
                                    <div class="crit-row"><span>Xulosa</span><span class="crit-ok"><i class="fa-solid fa-check"></i> Kelajak bilan bog&#39;langan</span></div>
                                </div>
                                <a href="sat-dsat.html#essay-checker" class="btn btn-sm btn-primary btn-liquid"><i class="fa-solid fa-pen-nib"></i> College Essay&#39;ingizni tahlil qilish &rarr;<div class="liquid-wave"></div></a>
                            </div>
                        </div>
                        <div class="ai-demo-panel" id="demo-panel-3" role="tabpanel">
                            <div class="demo-task-box">
                                <span class="demo-task-label">ChatGPT Prompt namunasi</span>
                                <p>&ldquo;Siz tajribali IELTS o&#39;qituvchisisiz. Menga Band 7.0 uchun Writing Task 2 qolipini va misollar bilan tushuntiring.&rdquo;</p>
                            </div>
                            <div class="demo-result-box">
                                <div class="demo-score-row"><span class="demo-score-pill demo-score-pill--teal">Prompt Engineering</span><span class="demo-engine-label"><i class="fa-solid fa-microchip"></i> Tayanch Metodika</span></div>
                                <div class="demo-criteria">
                                    <div class="crit-row"><span>Rol berish</span><span class="crit-ok"><i class="fa-solid fa-check"></i> Aniq yo&#39;nalish</span></div>
                                    <div class="crit-row"><span>Vazifa aniqligi</span><span class="crit-ok"><i class="fa-solid fa-check"></i> Qolip + misol</span></div>
                                    <div class="crit-row"><span>Bonus tip</span><span class="crit-ok"><i class="fa-solid fa-lightbulb"></i> &ldquo;Paragraf tuzilishi&rdquo; qo&#39;shing</span></div>
                                </div>
                                <a href="ai-hub.html" class="btn btn-sm btn-primary btn-liquid"><i class="fa-solid fa-robot"></i> AI Hub&#39;ga o&#39;tish &rarr;<div class="liquid-wave"></div></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>"""

b2_js = """    <script>
    /* P13-B2: AI Demo Tab Switcher */
    (function(){var tabs=document.querySelectorAll('.ai-tab-btn');tabs.forEach(function(btn){btn.addEventListener('click',function(){var t=this.getAttribute('data-target');tabs.forEach(function(x){x.classList.remove('active');x.setAttribute('aria-selected','false')});document.querySelectorAll('.ai-demo-panel').forEach(function(p){p.classList.remove('active')});this.classList.add('active');this.setAttribute('aria-selected','true');var el=document.getElementById(t);if(el)el.classList.add('active')}.bind(btn))})})();
    </script>"""

anchor2 = "        <!-- Mission / Nega Tayanch Section -->"
if "ai-demo-section" not in idx and anchor2 in idx:
    idx = idx.replace(anchor2, b2 + "\n" + anchor2)

if "P13-B2" not in idx:
    idx = idx.replace("</body>", b2_js + "\n</body>")

write("index.html", idx)

# 3. courses.html
print("\n=== courses.html (B3 + B4 + B5) ===")
crs = read("courses.html")
bc = """            <!-- P13-B5: Breadcrumb -->
            <nav class="breadcrumb" aria-label="Sahifa yo'li">
                <a href="index.html"><i class="fa-solid fa-house"></i> Bosh sahifa</a>
                <span class="breadcrumb-sep">/</span>
                <span class="breadcrumb-current">Kurslar</span>
            </nav>
"""
if "breadcrumb" not in crs:
    for anc in ['<div class="section-header', '<h1 class=', '<h2 class="section-title', '<div class="container">']:
        if anc in crs:
            crs = crs.replace(anc, bc + "            " + anc, 1)
            break

search = """                <!-- P13-B3: Kurs qidiruv -->
                <div class="course-search-wrapper">
                    <div class="search-input-wrap">
                        <i class="fa-solid fa-magnifying-glass search-icon" aria-hidden="true"></i>
                        <input type="search" class="course-search-input" id="courseSearchInput"
                            placeholder="Kurs qidirish... (IELTS, SAT, AI)"
                            aria-label="Kurslarni qidirish">
                    </div>
                </div>
"""
if "courseSearchInput" not in crs:
    for anc in ['<div class="grid grid-3 courses-grid"', '<div class="courses-grid"', '<div class="grid grid-', '<article class="course-card']:
        if anc in crs:
            crs = crs.replace(anc, search + "                " + anc, 1)
            break

crs_js = """    <script>
    /* P13-B3+B4: Search + Badge colors */
    (function(){var inp=document.getElementById('courseSearchInput');if(inp){inp.addEventListener('input',function(){var v=this.value.toLowerCase().trim();document.querySelectorAll('.course-card').forEach(function(c){c.style.display=(v===''||(c.innerText||'').toLowerCase().includes(v))?'':'none'})})}
    document.querySelectorAll('.course-badge').forEach(function(b){var t=(b.innerText||'').trim();if(/\bTop\b/i.test(t))b.classList.add('badge-top');else if(/Yangi|\bNew\b/i.test(t))b.classList.add('badge-new')})})();
    </script>"""
if "P13-B3+B4" not in crs:
    crs = crs.replace("</body>", crs_js + "\n</body>")

write("courses.html", crs)

# 4. Ichki sahifalar Breadcrumb
print("\n=== Ichki sahifalar breadcrumb ===")
pages = {
    "sat-dsat.html": "SAT va Admission Hub",
    "sat-mock.html": "Bluebook SAT Mock Test",
    "general-english-beginner.html": "General English Hub",
}
for fn, name in pages.items():
    fp = os.path.join(REPO, fn)
    if os.path.exists(fp):
        c = read(fn)
        if "breadcrumb" not in c:
            bc_inner = f"""            <!-- P13-B5: Breadcrumb -->
            <nav class="breadcrumb" aria-label="Sahifa yo'li">
                <a href="index.html"><i class="fa-solid fa-house"></i> Bosh sahifa</a>
                <span class="breadcrumb-sep">/</span>
                <span class="breadcrumb-current">{name}</span>
            </nav>
"""
            for anc in ['<div class="section-header', '<h1 class=', '<h2 class="section-title', '<div class="container">', '<main>']:
                if anc in c:
                    c = c.replace(anc, bc_inner + "            " + anc, 1)
                    write(fn, c)
                    break

# 5. Git Commit & Push
print("\n=== Git amallari ===")
commit("feat: implement prompt 13 - features marketing, ai demo, search, badge and breadcrumbs")

last_h = subprocess.run("git rev-parse --short HEAD", cwd=REPO, shell=True, capture_output=True, text=True).stdout.strip()
row = f"| {date.today()} | Prompt 13 — Funksiyalarni reklama qilish | B1 Hero CTA, B2 AI demo, B3 Search, B4 Badge, B5 Breadcrumb | {last_h} |"
header = "# Tayanch — Prompt Natijalari\n\n| Sana | Prompt va nomi | Natija | Commit |\n|------|---------------|--------|--------|\n"
sm = os.path.join(REPO, "STATUS.md")
existing = open(sm).read() if os.path.exists(sm) else header
open(sm, "w").write(existing.rstrip() + "\n" + row + "\n")
commit("docs: update STATUS.md for prompt 13")

push()
print("\nBarcha bosqichlar muvaffaqiyatli yakunlandi!")
