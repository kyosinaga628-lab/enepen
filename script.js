// ===========================
// DOM Elements
// ===========================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const backToTopBtn = document.getElementById('backToTop');

// ===========================
// Filter Functionality
// ===========================
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.dataset.filter;

        // Filter projects with animation
        projectCards.forEach((card, index) => {
            const category = card.dataset.category;

            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===========================
// Scroll Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ===========================
// Back to Top
// ===========================
backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// Header Scroll Effect
// ===========================
let lastScrollY = window.scrollY;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScrollY = currentScrollY;
});

// ===========================
// Card Stack Interaction
// ===========================
const cardStack = document.querySelector('.card-stack');
const stackCards = document.querySelectorAll('.stack-card');

let currentCardIndex = 0;

// Auto-rotate cards
setInterval(() => {
    stackCards.forEach((card, index) => {
        card.style.zIndex = (index + currentCardIndex) % stackCards.length + 1;
    });
    currentCardIndex = (currentCardIndex + 1) % stackCards.length;
}, 3000);

// ===========================
// Smooth Reveal on Load
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    // Hide Loader
    const loaderOverlay = document.querySelector('.loader-overlay');
    setTimeout(() => {
        if (loaderOverlay) {
            loaderOverlay.classList.add('hidden');
        }
    }, 800);

    // Add initial animation classes
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const cardStackEl = document.querySelector('.card-stack');

    // Animate hero elements
    setTimeout(() => {
        if (heroTitle) {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }
    }, 100);

    setTimeout(() => {
        if (heroSubtitle) {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }
    }, 300);

    setTimeout(() => {
        if (cardStackEl) {
            cardStackEl.style.opacity = '1';
            cardStackEl.style.transform = 'translateY(0)';
        }
    }, 500);
});

// Add initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .card-stack');
    heroElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
});

// ===========================
// Parallax Effect for Glows
// ===========================
window.addEventListener('mousemove', (e) => {
    const glows = document.querySelectorAll('.glow');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    glows.forEach((glow, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;

        glow.style.transform = `translate(${x}px, ${y}px)`;
    });
});
