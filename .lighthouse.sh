#!/bin/bash
# Lighthouse before/after runner for the Tayanch site.
# Usage: .lighthouse.sh <label>      e.g. .lighthouse.sh before
set -u
LABEL="${1:-run}"
BASE="http://127.0.0.1:8080"
OUT="/Users/javohir/WorkBuddy AI/2026-09-01-16-33-49/tayanch-landing-page/.lighthouse/$LABEL"
LH="/Users/javohir/.workbuddy-ai/binaries/node/workspace/node_modules/lighthouse/cli/index.js"
NODE="/Users/javohir/.workbuddy-ai/binaries/node/versions/22.22.2/bin/node"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
mkdir -p "$OUT"

PAGES=(index.html courses.html sat-dsat.html admission-essay-personal-statement.html)

for page in "${PAGES[@]}"; do
  for form in mobile desktop; do
    name="${page%.html}-$form"
    echo "--- $name ($LABEL)"
    # NOTE: Lighthouse has no "mobile" preset — the default config IS mobile.
    if [ "$form" = "desktop" ]; then
      PRESET="--preset=desktop"
    else
      PRESET=""
    fi
    CHROME_PATH="$CHROME" "$NODE" "$LH" "$BASE/$page" \
      $PRESET \
      --quiet \
      --output=json \
      --output-path="$OUT/$name.json" \
      --chrome-flags="--headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage" \
      --only-categories=performance,accessibility,best-practices,seo \
      >/dev/null 2>"$OUT/$name.err"
    if [ -f "$OUT/$name.json" ]; then
      "$NODE" -e '
        const r=require(process.argv[1]);
        const c=r.categories;
        const f=(k)=>Math.round((c[k]&&c[k].score||0)*100);
        const m=r.audits;
        const ms=(k)=>m[k]&&m[k].numericValue!=null?Math.round(m[k].numericValue):null;
        console.log(`   perf=${f("performance")} a11y=${f("accessibility")} bp=${f("best-practices")} seo=${f("seo")} | LCP=${ms("largest-contentful-paint")} TBT=${ms("total-blocking-time")} CLS=${m["cumulative-layout-shift"]?m["cumulative-layout-shift"].numericValue:null} FCP=${ms("first-contentful-paint")} SI=${ms("speed-index")}`);
      ' "$OUT/$name.json"
    else
      echo "   FAILED: $(tail -2 "$OUT/$name.err")"
    fi
  done
done
echo "done: $LABEL"
