with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Noto'g'ri yopilgan drawer tuzilishini to'g'ri holatga keltirish
old_drawer = """<!-- Mobile Navigation Drawer -->
<div class="mobile-drawer" id="mobileDrawer">
<div class="drawer-header">
<span class="brand-name">TAYANCH<span class="brand-dot">.</span></span>
<button class="drawer-close" id="drawerCloseBtn"><i class="fa-solid fa-xmark"></i></button>
<div class="drawer-links">"""

new_drawer = """<!-- Mobile Navigation Drawer -->
<div class="mobile-drawer" id="mobileDrawer">
<div class="drawer-header">
<span class="brand-name">TAYANCH<span class="brand-dot">.</span></span>
<button class="drawer-close" id="drawerCloseBtn"><i class="fa-solid fa-xmark"></i></button>
</div>
<div class="drawer-links">"""

# Agar probellar bilan bo'lsa
if old_drawer not in html:
    import re
    html = re.sub(
        r'(<button class="drawer-close"[^>]*>.*?</button>)\s*(<div class="drawer-links">)',
        r'\1\n</div>\n\2',
        html,
        flags=re.DOTALL
    )
else:
    html = html.replace(old_drawer, new_drawer)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("✅ Drawer tegi muvaffaqiyatli yopildi!")
