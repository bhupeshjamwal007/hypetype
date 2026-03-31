/**
 * HYPETYPE BRAND GROWTH STUDIO - GLOBAL ENGINE
 * Optimized for: Android Stability, Desktop Peel-Effect, and Solid Last Page
 */

// --- 1. SLIDE TO UNLOCK LOGIC ---
const thumb = document.getElementById('thumb');
const container = document.getElementById('sliderContainer');
let isDragging = false;

if (thumb && container) {
    const startDrag = (e) => {
        isDragging = true;
        thumb.style.transition = "none";
    };

    thumb.onmousedown = thumb.ontouchstart = startDrag;

    window.onmousemove = window.ontouchmove = (e) => {
        if (!isDragging) return;
        let clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
        let rect = container.getBoundingClientRect();
        let x = clientX - rect.left - 30;
        let maxX = rect.width - thumb.offsetWidth - 6;

        if (x < 6) x = 6;
        if (x > maxX) {
            x = maxX;
            isDragging = false;
            window.location.href = "Contact_Us.html";
        }
        thumb.style.left = x + 'px';
    };

    window.onmouseup = window.ontouchend = () => {
        if (isDragging) {
            isDragging = false;
            thumb.style.transition = "left 0.3s ease-out";
            thumb.style.left = "6px";
        }
    };
}

// --- 2. FADE + PEEL SCROLL EFFECT (With Last Page Protection) ---
window.addEventListener('scroll', () => {
    // 1. MOBILE DISABLE: If on phone, stop the effect to prevent "Stuck Footer"
    if (!document.body.classList.contains('home-layout') || window.innerWidth < 768) {
        const pages = document.querySelectorAll('.page');
        pages.forEach(p => {
            p.style.transform = 'none';
            p.style.opacity = '1';
            p.style.visibility = 'visible';
            p.style.pointerEvents = 'all';
        });
        return;
    }

    const pages = document.querySelectorAll('.page');
    const scrollY = window.scrollY;
    const vh = window.innerHeight;

    pages.forEach((page, i) => {
        const start = i * vh;
        const isLastPage = (i === pages.length - 1);

        // If we have scrolled past this page AND it's NOT the last page
        if (scrollY > start && !isLastPage) {
            const travel = scrollY - start;
            page.style.transform = `translateY(-${travel}px)`;

            // Fade out logic
            let opacity = 1 - (travel / vh);
            page.style.opacity = Math.max(0, opacity);

            // Hide page when fully transparent to allow clicking layers underneath
            if (parseFloat(page.style.opacity) <= 0.05) {
                page.style.visibility = "hidden";
                page.style.pointerEvents = "none";
            } else {
                page.style.visibility = "visible";
                page.style.pointerEvents = "all";
            }
        }
        // Logic for the Last Page (About Section) - Keep it Solid
        else if (isLastPage) {
            page.style.transform = `translateY(0)`;
            page.style.opacity = "1";
            page.style.visibility = "visible";
            page.style.pointerEvents = "all";
        }
        // Reset for pages below the current scroll point
        else {
            page.style.transform = `translateY(0)`;
            page.style.opacity = "1";
            page.style.visibility = "visible";
            page.style.pointerEvents = "all";
        }
    });
});

// --- 3. SMOOTH NAVIGATION ---
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.includes('#')) {
            const targetId = href.split('#')[1];
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault();
                const pages = Array.from(document.querySelectorAll('.page'));
                const pageIndex = pages.indexOf(targetElement);

                window.scrollTo({
                    top: pageIndex * window.innerHeight,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// --- 4. BACK TO TOP ---
const topBtn = document.getElementById('backToTop');
if (topBtn) {
    topBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 5. UNIVERSAL AUTO-SNAP LOGIC ---
let isSnapping = false;
let scrollTimeout;

window.addEventListener('scroll', () => {
    // Disable snapping on mobile or if already snapping
    if (window.innerWidth < 768 || !document.body.classList.contains('home-layout') || isSnapping) {
        return;
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const vh = window.innerHeight;
        const scrollY = window.scrollY;

        // Don't snap if we are at the very bottom (footer area)
        const totalHeight = document.documentElement.scrollHeight;
        if (window.scrollY + vh > totalHeight - 100) return;

        const targetIndex = Math.round(scrollY / vh);
        const targetScroll = targetIndex * vh;

        if (Math.abs(scrollY - targetScroll) > 10) {
            isSnapping = true;
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
            });

            setTimeout(() => { isSnapping = false; }, 800);
        }
    }, 200);
});

// --- 6. SERVICE CAROUSEL LOGIC ---
function scrollCarousel(direction) {
    const container = document.getElementById('servicesScroll');
    if (!container) return;
    const card = container.querySelector('.other-card');
    if (!card) return;

    const cardWidth = card.offsetWidth + 25;
    const currentScroll = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (direction === 1 && currentScroll >= maxScroll - 5) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (direction === -1 && currentScroll <= 5) {
        container.scrollTo({ left: maxScroll, behavior: 'smooth' });
    } else {
        container.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
    }
}