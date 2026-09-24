#!/usr/bin/env python3
"""Extract coursesData from script.full.js into a standalone courses-data.js
(single source of truth) and rewrite script.full.js to consume it.

Run from the repo root. Idempotent: safe to run repeatedly.
"""
import re, os, io

SRC = 'script.full.js'
OUT = 'courses-data.js'
CANON = 'https://javohirqaxramonov36-web.github.io/tayanch-landing-page/'

src = open(SRC, encoding='utf-8').read()

m = re.search(r'^(\s*)const coursesData = \[\n(.*?)\n\1\];', src, re.S | re.M)
if not m:
    raise SystemExit('coursesData array not found')
indent = m.group(1)
body = m.group(2)

# dedent by the array's indent + 4
lines = []
for ln in body.split('\n'):
    if ln.startswith(indent + '    '):
        lines.append(ln[len(indent) + 4:])
    elif ln.strip() == '':
        lines.append('')
    else:
        lines.append(ln.strip())
array_body = '\n'.join(lines)

header = '''/* =========================================================================
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
'''

footer = '''
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
        if (/Barcha\\s+\\d+\\s+ta\\s+Bepul\\s+Kurslar/.test(document.title)) {
            document.title = document.title.replace(
                /Barcha\\s+\\d+\\s+ta\\s+Bepul\\s+Kurslar/,
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
'''

open(OUT, 'w', encoding='utf-8').write(header + array_body + footer)
print('wrote', OUT, len(header + array_body + footer), 'bytes')

# ---- rewrite script.full.js to consume the shared source ----
replacement = (
    "    /* Kurslar katalogi endi YAGONA manbadan — courses-data.js — olinadi.\n"
    "       Bu yerda massiv nusxasi qolmagan, shuning uchun son hech qachon\n"
    "       ikki xil bo'lib qolmaydi (index '31' / filter '29' / courses '30'\n"
    "       muammosi shu bilan butunlay bartaraf etiladi). */\n"
    "    const coursesData = (window.TayanchCourses && window.TayanchCourses.data) || [];"
)
new_src = src[:m.start()] + replacement + src[m.end():]

# make syncCourseCounts delegate to the shared sync so counts never drift
old_sync = re.search(
    r'    function syncCourseCounts\(\) \{.*?\n    \}\n', new_src, re.S)
if old_sync:
    new_sync = '''    /* YAGONA MANBA: barcha kurs soni hisoblagichlari courses-data.js ichidagi
       window.TayanchCourses.sync() orqali yangilanadi. Bu yerda hech qanday
       raqam qayta hisoblanmaydi — aks holda ikki manba paydo bo'lib, ular
       mos kelmay qolishi mumkin (avvalgi '31' / '29' / '30' xatosi aynan
       shundan kelib chiqqan edi). */
    function syncCourseCounts() {
        if (window.TayanchCourses && typeof window.TayanchCourses.sync === 'function') {
            window.TayanchCourses.sync();
        }
    }
'''
    new_src = new_src[:old_sync.start()] + new_sync + new_src[old_sync.end():]
    print('rewrote syncCourseCounts()')
else:
    print('WARN: syncCourseCounts() not found')

open(SRC, 'w', encoding='utf-8').write(new_src)
print('rewrote', SRC)
