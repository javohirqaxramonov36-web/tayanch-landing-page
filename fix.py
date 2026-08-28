import time, re

t = int(time.time())

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace("display: flex !important;", "/* fixed */")

patch = """
html, body {
  display: block !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow-x: hidden !important;
  background-color: #080b10 !important;
  color: #f3f4f6 !important;
}

main {
  display: block !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  position: relative !important;
  clear: both !important;
}

section, .hero-section, .liquid-obsidian-hero {
  display: block !important;
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 auto !important;
  position: relative !important;
  box-sizing: border-box !important;
  opacity: 1 !important;
  visibility: visible !important;
}

.hero-container {
  display: grid !important;
  grid-template-columns: 1.1fr 0.9fr !important;
  gap: 2.5rem !important;
  align-items: center !important;
  max-width: 1240px !important;
  margin: 0 auto !important;
  padding: 3rem 1.5rem !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

@media (max-width: 992px) {
  .hero-container {
    grid-template-columns: 1fr !important;
    text-align: center !important;
  }
}

.hero-content {
  display: flex !important;
  flex-direction: column !important;
  gap: 1.25rem !important;
  width: 100% !important;
  opacity: 1 !important;
  visibility: visible !important;
}

.hero-title, 
.hero-subheadline, 
.hero-cta-group, 
.hero-stats-row, 
.founder-trust-pill,
.visual-card,
.hero-fade,
.gsap-reveal {
  opacity: 1 !important;
  visibility: visible !important;
  transform: none !important;
}

.hero-title {
  color: #ffffff !important;
  font-size: clamp(2rem, 5vw, 3.5rem) !important;
  line-height: 1.15 !important;
  font-weight: 800 !important;
}

.hero-subheadline {
  color: #a1a1aa !important;
  font-size: 1.15rem !important;
  line-height: 1.6 !important;
}
"""

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css + patch)

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'styles\.css\?v=[^"\'\s>]+', f'styles.css?v={t}', html)
html = re.sub(r'script\.js\?v=[^"\'\s>]+', f'script.js?v={t}', html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("✅ Tuzatish yakunlandi!")
