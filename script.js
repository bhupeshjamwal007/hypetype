/**
 * HYPETYPE BRAND GROWTH STUDIO - GLOBAL ENGINE
 * Features: Slider, Peel Effect, Smooth Nav, and Universal Auto-Snap
 */

// --- 1. SLIDE TO UNLOCK LOGIC ---
const thumb = document.getElementById('thumb');
const container = document.getElementById('sliderContainer');
let isDragging = false;

if (thumb && container) {
    thumb.onmousedown = thumb.ontouchstart = (e) => {
        isDragging = true;
        thumb.style.transition = "none";
        e.preventDefault();
    };

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

// --- 2. FADE + PEEL SCROLL EFFECT ---
window.addEventListener('scroll', () => {
    if (!document.body.classList.contains('home-layout')) return;

    const pages = document.querySelectorAll('.page');
    const scrollY = window.scrollY;
    const vh = window.innerHeight;

    pages.forEach((page, i) => {
        const start = i * vh;

        if (scrollY > start) {
            const travel = scrollY - start;
            page.style.transform = `translateY(-${travel}px)`;

            // All pages now follow the same fade logic
            let opacity = 1 - (travel / vh);
            page.style.opacity = Math.max(0, opacity);

            if (parseFloat(page.style.opacity) <= 0) {
                page.style.visibility = "hidden";
                page.style.pointerEvents = "none";
            } else {
                page.style.visibility = "visible";
                page.style.pointerEvents = "all";
            }
        } else {
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

// --- 5. UNIVERSAL AUTO-SNAP LOGIC (UPDATED) ---
let isSnapping = false;
let scrollTimeout;

window.addEventListener('scroll', () => {
    // 1. Disable on mobile OR if we are near the very bottom of the page
    const scrollPos = window.scrollY + window.innerHeight;
    const pageBottom = document.documentElement.scrollHeight;

    if (window.innerWidth < 768 || !document.body.classList.contains('home-layout') || isSnapping) {
        return;
    }

    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
        const vh = window.innerHeight;
        const scrollY = window.scrollY;
        const targetIndex = Math.round(scrollY / vh);
        const targetScroll = targetIndex * vh;

        if (Math.abs(scrollY - targetScroll) > 5) {
            isSnapping = true;
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
            });

            setTimeout(() => {
                isSnapping = false;
            }, 800);
        }
    }, 150);
});


// --- 6. Other Service Horizontal Scroll LOGIC (ALL PAGES) ---
function scrollCarousel(direction) {
    const container = document.getElementById('servicesScroll');
    const cardWidth = container.querySelector('.other-card').offsetWidth + 25; // Card width + gap

    // Calculate current scroll position
    const currentScroll = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    // Logic for looping
    if (direction === 1 && currentScroll >= maxScroll - 5) {
        // If at the end and clicking NEXT -> Go back to START
        container.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (direction === -1 && currentScroll <= 5) {
        // If at the start and clicking PREV -> Go to END
        container.scrollTo({ left: maxScroll, behavior: 'smooth' });
    } else {
        // Otherwise, just scroll normally
        container.scrollBy({
            left: direction * cardWidth,
            behavior: 'smooth'
        });
    }
}