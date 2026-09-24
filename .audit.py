#!/usr/bin/env python3
"""One-off audit for the Tayanch site optimisation task (A-J)."""
import re, os, glob, json, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
os.chdir(ROOT)

PAGES = [p for p in sorted(glob.glob('*.html'))]

def read(p):
    with open(p, encoding='utf-8') as f:
        return f.read()

report = {}

# ---------- D7: heading structure ----------
print('=' * 70)
print('D7  HEADING STRUCTURE (h1 count + hierarchy)')
print('=' * 70)
for p in PAGES:
    s = read(p)
    heads = [(m.group(1), m.group(2)) for m in
             re.finditer(r'<h([1-6])\b[^>]*>(.*?)</h\1>', s, re.S | re.I)]
    levels = [int(l) for l, _ in heads]
    h1 = levels.count(1)
    jumps = []
    for a, b in zip(levels, levels[1:]):
        if b > a + 1:
            jumps.append(f'h{a}->h{b}')
    flag = 'OK ' if (h1 == 1 and not jumps) else '!! '
    print(f'{flag}{p:46s} h1={h1}  total={len(levels):3d}  jumps={",".join(jumps) or "-"}')

# ---------- D8: meta tags ----------
print()
print('=' * 70)
print('D8  META / SEO TAGS PER PAGE')
print('=' * 70)
keys = [
    ('description', r'<meta\s+name=["\']description["\']\s+content=["\']([^"\']{10,})', re.I),
    ('canonical',   r'<link\s+rel=["\']canonical["\']\s+href=["\']([^"\']+)', re.I),
    ('og:title',    r'<meta\s+property=["\']og:title["\']\s+content=["\']([^"\']+)', re.I),
    ('og:desc',     r'<meta\s+property=["\']og:description["\']\s+content=["\']([^"\']+)', re.I),
    ('og:image',    r'<meta\s+property=["\']og:image["\']\s+content=["\']([^"\']+)', re.I),
    ('og:url',      r'<meta\s+property=["\']og:url["\']\s+content=["\']([^"\']+)', re.I),
    ('tw:card',     r'<meta\s+name=["\']twitter:card["\']\s+content=["\']([^"\']+)', re.I),
    ('tw:title',    r'<meta\s+name=["\']twitter:title["\']\s+content=["\']([^"\']+)', re.I),
    ('tw:desc',     r'<meta\s+name=["\']twitter:description["\']\s+content=["\']([^"\']+)', re.I),
    ('favicon',     r'<link\s+rel=["\']icon["\']', re.I),
]
for p in PAGES:
    s = read(p)
    miss = []
    for name, pat, fl in keys:
        if not re.search(pat, s, fl):
            miss.append(name)
    print(f'{"OK " if not miss else "!! "}{p:46s} missing: {", ".join(miss) or "none"}')

# unique descriptions
print()
descs = {}
for p in PAGES:
    s = read(p)
    m = re.search(r'<meta\s+name=["\']description["\']\s+content=["\']([^"\']+)', s, re.I)
    if m:
        descs.setdefault(m.group(1).strip(), []).append(p)
dupes = {d: ps for d, ps in descs.items() if len(ps) > 1}
print('Duplicate meta descriptions:', dupes if dupes else 'none')

# ---------- D9: JSON-LD ----------
print()
print('=' * 70)
print('D9  JSON-LD STRUCTURED DATA')
print('=' * 70)
for p in PAGES:
    s = read(p)
    blocks = re.findall(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', s, re.S)
    types = []
    for b in blocks:
        try:
            data = json.loads(b.strip())
        except Exception as e:
            types.append(f'INVALID({e.__class__.__name__})')
            continue
        items = data if isinstance(data, list) else [data]
        for it in items:
            types.append(it.get('@type', '?'))
    print(f'{"OK " if types else "-- "}{p:46s} {", ".join(types) or "none"}')

# ---------- A: sat-mock links ----------
print()
print('=' * 70)
print('A   SAT PAGE CONSOLIDATION')
print('=' * 70)
for p in PAGES:
    s = read(p)
    mock = len(re.findall(r'href=["\'][^"\']*sat-mock\.html', s))
    dsat = len(re.findall(r'href=["\'][^"\']*sat-dsat\.html', s))
    if mock or dsat:
        print(f'{"!! " if mock else "OK "}{p:46s} sat-mock:{mock}  sat-dsat:{dsat}')

# ---------- B: hardcoded course counts ----------
print()
print('=' * 70)
print('B   COURSE COUNT SOURCES')
print('=' * 70)
print('courses-data.js exists:', os.path.exists('courses-data.js'))
for p in PAGES:
    s = read(p)
    for m in re.finditer(r'([0-9]{1,3})\s*(?:ta\s*)?(?:Kurslar|kurs|Kurs)', s):
        line = s[:m.start()].count('\n') + 1
        print(f'  {p}:{line}  "{m.group(0)}"')

# ---------- F19: target blank ----------
print()
print('=' * 70)
print('F19 target="_blank" WITHOUT rel=noopener')
print('=' * 70)
for p in PAGES:
    s = read(p)
    bad = 0
    for m in re.finditer(r'<a\b[^>]*>', s, re.I):
        tag = m.group(0)
        if re.search(r'target=["\']_blank["\']', tag, re.I):
            if not re.search(r'rel=["\'][^"\']*noopener', tag, re.I):
                bad += 1
    print(f'{"OK " if not bad else "!! "}{p:46s} {bad}')

# ---------- F17: modals ----------
print()
print('=' * 70)
print('F17 MODAL A11Y')
print('=' * 70)
for p in PAGES:
    s = read(p)
    for m in re.finditer(r'<div\b[^>]*class=["\'][^"\']*(?:modal|overlay|drawer)[^"\']*["\'][^>]*>', s, re.I):
        tag = m.group(0)
        if re.search(r'\bmodal\b', tag, re.I):
            has_role = 'role="dialog"' in tag or "role='dialog'" in tag
            has_modal = 'aria-modal' in tag
            has_lab = 'aria-labelledby' in tag
            cls = re.search(r'class=["\']([^"\']+)', tag)
            if not (has_role and has_modal and has_lab):
                print(f'!! {p}  <div class="{cls.group(1) if cls else "?"}"> role={has_role} aria-modal={has_modal} labelledby={has_lab}')

# ---------- E13/E14: scripts & imgs ----------
print()
print('=' * 70)
print('E13/E14 EXTERNAL SCRIPTS + IMAGES')
print('=' * 70)
for p in PAGES:
    s = read(p)
    nodef = []
    for m in re.finditer(r'<script\b[^>]*src=["\']([^"\']+)["\'][^>]*>', s, re.I):
        tag = m.group(0)
        src = m.group(1)
        if not re.search(r'\bdefer\b|\basync\b|type=["\']module["\']|application/ld', tag, re.I):
            nodef.append(src.split('/')[-1][:40])
    imgs = re.findall(r'<img\b[^>]*>', s, re.I)
    bad_img = []
    for tag in imgs:
        miss = [a for a in ('width=', 'height=', 'loading=', 'alt=') if not re.search(a, tag, re.I)]
        if miss:
            bad_img.append(miss)
    print(f'{"OK " if not nodef and not bad_img else "!! "}{p:46s} imgs={len(imgs)} badimg={len(bad_img)} nodefer={nodef}')

# ---------- E11: webp ----------
print()
print('=' * 70)
print('E11 IMAGE FORMATS')
print('=' * 70)
for p in PAGES:
    s = read(p)
    jpg = re.findall(r'(?:src|href)=["\']([^"\']+\.jpe?g|[^"\']+\.png)', s, re.I)
    webp = len(re.findall(r'\.webp', s, re.I))
    picture = len(re.findall(r'<picture', s, re.I))
    if jpg:
        print(f'!! {p:46s} raster refs={len(jpg)} webp={webp} picture={picture}')
        for j in dict.fromkeys(jpg):
            print(f'      {j}')

# ---------- F18: reduced motion ----------
print()
print('=' * 70)
print('F18 prefers-reduced-motion')
print('=' * 70)
css = read('styles.css')
print('in styles.css:', 'prefers-reduced-motion' in css)
for p in PAGES:
    s = read(p)
    inline = re.findall(r'<style[^>]*>(.*?)</style>', s, re.S)
    if inline:
        has = any('prefers-reduced-motion' in b for b in inline)
        print(f'  {p}: inline <style> blocks={len(inline)} reduced-motion={has}')

print()
print('=' * 70)
print('DONE')
