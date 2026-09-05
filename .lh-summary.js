#!/usr/bin/env node
// Summarise failing Lighthouse audits for a given label (before/after).
const fs = require('fs');
const path = require('path');
const label = process.argv[2] || 'before';
const dir = path.join(__dirname, '.lighthouse', label);
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort();

const rows = [];
for (const f of files) {
  const r = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  const c = r.categories;
  const score = k => (c[k] && c[k].score != null) ? Math.round(c[k].score * 100) : null;
  const ms = k => (r.audits[k] && r.audits[k].numericValue != null) ? Math.round(r.audits[k].numericValue) : null;
  const cls = r.audits['cumulative-layout-shift'];
  rows.push({
    page: f.replace('.json', ''),
    perf: score('performance'), a11y: score('accessibility'),
    bp: score('best-practices'), seo: score('seo'),
    LCP: ms('largest-contentful-paint'), TBT: ms('total-blocking-time'),
    CLS: cls ? Number(cls.numericValue).toFixed(3) : null,
    FCP: ms('first-contentful-paint'), SI: ms('speed-index'),
  });

  // failing audits
  const fails = [];
  for (const ref of Object.values(c).flatMap(cat => cat.auditRefs || [])) {
    const a = r.audits[ref.id];
    if (!a) continue;
    if (a.score !== null && a.score < 1 && a.scoreDisplayMode !== 'informative') {
      fails.push(`${ref.id}(${Math.round(a.score * 100)})`);
    }
  }
  rows[rows.length - 1].fails = fails;
}

console.log('\n=== ' + label.toUpperCase() + ' ===');
console.log(['page'.padEnd(42), 'perf', 'a11y', 'bp', 'seo', 'LCP', 'TBT', 'CLS', 'FCP', 'SI'].join(' '));
for (const r of rows) {
  console.log([
    r.page.padEnd(42),
    String(r.perf).padStart(4), String(r.a11y).padStart(4),
    String(r.bp).padStart(3), String(r.seo).padStart(4),
    String(r.LCP).padStart(6), String(r.TBT).padStart(6),
    String(r.CLS).padStart(6), String(r.FCP).padStart(5), String(r.SI).padStart(5),
  ].join(' '));
}
console.log('\n--- failing audits ---');
for (const r of rows) {
  if (r.fails.length) console.log(r.page.padEnd(42), r.fails.join(' '));
}
