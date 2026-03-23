// ============================================
// LUXURY INTERACTIONS & ENTERPRISE FEATURES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initPremiumHeader();
    initMobileMenu();
    initRippleEffect();
    initScrollReveal();
    initLazyLoad();
    initForms();
    initGoldAccents();
});

// Premium Header with Threshold
function initPremiumHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// Mobile Menu with Elegant Animation
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');
    
    if (mobileBtn && nav) {
        mobileBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close on click outside
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('active') && 
                !nav.contains(e.target) && 
                !mobileBtn.contains(e.target)) {
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Premium Ripple Effect
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .add-to-cart');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Scroll Reveal with Intersection Observer
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.category-card, .product-card, .value-card, .about-text, .about-image');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '50px' });
    
    revealElements.forEach(el => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
    });
}

// Lazy Load Images with Fade
function initLazyLoad() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                imageObserver.unobserve(img);
            }
        });
    }, { threshold: 0.1 });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)';
        imageObserver.observe(img);
        
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });
}

// Premium Form Handling
function initForms() {
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            if (input.value && isValidEmail(input.value)) {
                showLuxuryToast('Welcome to The Classic Circle. Expect excellence.', 'success');
                input.value = '';
            } else {
                showLuxuryToast('Please enter a valid email address.', 'error');
            }
        });
    }
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('input[type="text"]')?.value;
            const email = contactForm.querySelector('input[type="email"]')?.value;
            const message = contactForm.querySelector('textarea')?.value;
            
            if (name && email && message && isValidEmail(email)) {
                showLuxuryToast(`Thank you, ${name}. Your inquiry has been received.`, 'success');
                contactForm.reset();
            } else {
                showLuxuryToast('Please complete all fields correctly.', 'error');
            }
        });
    }
}

// Email Validation
function isValidEmail(email) {
    return /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email);
}

// Premium Toast Notification
function showLuxuryToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <span style="color: var(--gold-subtle); font-size: 18px;">✦</span>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.4s ease forwards';
        setTimeout(() => toast.remove(), 400);
    }, 4500);
}

// Gold Accent Hover Effects
function initGoldAccents() {
    const goldElements = document.querySelectorAll('.logo, .nav-links a, .cart-icon');
    
    goldElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.querySelectorAll('.gold-accent-hover').forEach(gold => {
                gold.style.transition = 'all 0.3s ease';
            });
        });
    });
}

// Add gold line effect to section titles
const sectionTitles = document.querySelectorAll('.section-title');
sectionTitles.forEach(title => {
    title.classList.add('gold-line');
});

// Parallax Effect for Hero
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
}

// Add to cart loading animation
document.addEventListener('click', (e) => {
    if (e.target.classList && e.target.classList.contains('add-to-cart')) {
        const btn = e.target;
        const originalText = btn.textContent;
        btn.textContent = '✦ ADDING ✦';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        }, 800);
    }
});