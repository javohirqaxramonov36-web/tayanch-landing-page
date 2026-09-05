#!/usr/bin/env python3
"""Replace the hero canvas engine with a performance-optimised version.

Root cause (Lighthouse before, index.html mobile):
  total-blocking-time = 18648 ms, mainthread-work-breakdown = 30.1 s
  bootup-time attributed 18.5 s to ScrollTrigger.min.js because the scroll
  scrub called drawFrame() at ~60 Hz, and every drawFrame() did:
    * createRadialGradient() from scratch            (allocation each frame)
    * 42 nodes -> O(n^2) = 861 pair distance checks + individual strokes
    * ctx.shadowBlur = 14 on all 42 arcs             (very expensive paint)
On a 4x-throttled mobile CPU that is ~100-300 ms per frame.
"""
import io, sys

PATH = 'script.full.js'
src = open(PATH, encoding='utf-8').read()

START = "    const canvas = document.getElementById('heroFrameCanvas');"
END = """    /* ==========================================
       16. GSAP SCROLL TRIGGER REVEALS"""

i = src.index(START)
j = src.index(END)
assert i < j, 'anchor order wrong'

NEW = r'''    const canvas = document.getElementById('heroFrameCanvas');
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


'''

src = src[:i] + NEW + src[j:]
open(PATH, 'w', encoding='utf-8').write(src)
print('canvas engine replaced; new size', len(src))
