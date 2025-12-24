// ========================================
// PALWORLD ENHANCED INTERACTIONS
// AAA Gaming Website Experience
// ========================================

// Sound System
const sounds = {
    hover: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYLWLHo7qRXGAg+leHww2sgBTGJ0fDTfjMKH3PI8dqOPwkUYbXq7KpYGQlEnuDzvmcwBSh+zPLaizsLVKzl7qRXGAg7ldvwwmkeIU2NhIE='),
    click: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBgoSEg4KFhYKBg4SFhIOGh4WDhIWEgoOEhIOFhoWDhYeFg4SFhYKDhIWDhIWGhYOFhoWDhIWFhIOEhYSDhYaFg4WGhYOEhYWCg4SFg4SFhoWDhYaFg4SFhYSDhIWEg4WGhYOFhoWDhIWFgoOEhYOEhYaFg4WGhYOEhYWEg4SFhIOFhoWDhYaFg4SFhYKDhIWDhIWGhYOFhoWDhIWFhIOEhYSDhYaFg4WGhYOEhYWCg4SFg4Q='),
    transition: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhIaHh4aFgoOFh4mJiIaEgoOGiImJh4WDgoOFiImJh4WDgoOFhomJiIaEgoOGiIqKiIaEgoOGiYqKiYeEgoOGiYqKiYeEgoOGiYqKiYeEgoOGiYqKiYeEgoOGiYqKiYeEgoOGiYqKiYeEgoOGiYqKiYeEgoOGiYqKiYeEgoOGiYqKiYeEgoOGiYqK')
};

let soundEnabled = true;

// Loading screen is now handled by loader.js

// ========================================
// INITIALIZE ALL ENHANCEMENTS
// ========================================
function initializeEnhancements() {
    initCustomCursor();
    initMouseParticles();
    initBackgroundShift();
    initVideoModal();
    initGSAPAnimations();
    initRequirementsTabs();
    initPriceConverter();
    initAccordion();
    initSoundToggle();
    initLiveCounter();
    initNewsletterForm();
    initMobileMenu();
    initSmoothScroll();
}

// Initialize after a short delay
setTimeout(initializeEnhancements, 100);

// ========================================
// CUSTOM CURSOR
// ========================================
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor || window.innerWidth < 768) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.2;
        cursorY += dy * 0.2;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animate);
    }
    animate();
    
    // Hover effect
    const interactiveElements = document.querySelectorAll('a, button, .feature-card, .download-option');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            playSound('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// ========================================
// CURSOR SPARKLE PARTICLES
// ========================================
function initMouseParticles() {
    const particleContainer = document.getElementById('cursor-particles');
    if (!particleContainer || window.innerWidth < 768) return;
    
    let lastX = 0, lastY = 0;
    let particleInterval;
    
    document.addEventListener('mousemove', (e) => {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 10) {
            createSparkle(e.clientX, e.clientY);
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });
    
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'cursor-sparkle';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        particleContainer.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// ========================================
// MOUSE MOVEMENT BACKGROUND SHIFT
// ========================================
function initBackgroundShift() {
    const bg = document.getElementById('animated-bg');
    if (!bg) return;
    
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        bg.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// ========================================
// VIDEO MODAL
// ========================================
function initVideoModal() {
    const modal = document.getElementById('video-modal');
    const videoTriggers = document.querySelectorAll('#video-trigger, #play-trailer-btn');
    const closeBtn = document.querySelector('.video-modal-close');
    const overlay = document.querySelector('.video-modal-overlay');
    const iframe = document.getElementById('video-iframe');
    
    const videoURL = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'; // Replace with actual Palworld trailer
    
    videoTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            iframe.src = videoURL;
            playSound('click');
            document.body.style.overflow = 'hidden';
        });
    });
    
    function closeModal() {
        modal.classList.remove('active');
        iframe.src = '';
        document.body.style.overflow = 'auto';
    }
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ========================================
// GSAP ANIMATIONS
// ========================================
function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    // Parallax scrolling
    gsap.to('.stars-layer.layer-1', {
        y: 300,
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
        }
    });
    
    gsap.to('.stars-layer.layer-2', {
        y: 200,
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5
        }
    });
    
    gsap.to('.stars-layer.layer-3', {
        y: 100,
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2
        }
    });
    
    // Feature cards animation
    gsap.from('.feature-card', {
        opacity: 0,
        y: 80,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
    
    // Highlight items animation
    gsap.from('.highlight-item', {
        opacity: 0,
        x: -60,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.gameplay-highlights',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
    
    // Download options animation
    gsap.from('.download-option', {
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.download-options',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
    
    // Section headers animation
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });
}

// ========================================
// REQUIREMENTS TABS
// ========================================
function initRequirementsTabs() {
    const tabs = document.querySelectorAll('.req-tab');
    const contents = document.querySelectorAll('.req-tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            playSound('click');
        });
    });
    
    // Tooltip functionality
    const tooltips = document.querySelectorAll('.tooltip-icon');
    tooltips.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const tooltip = this.dataset.tooltip;
            const tooltipEl = document.createElement('div');
            tooltipEl.className = 'custom-tooltip';
            tooltipEl.textContent = tooltip;
            tooltipEl.style.cssText = `
                position: absolute;
                background: rgba(154, 77, 255, 0.95);
                color: white;
                padding: 8px 12px;
                border-radius: 8px;
                font-size: 12px;
                white-space: nowrap;
                z-index: 1000;
                pointer-events: none;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            `;
            
            document.body.appendChild(tooltipEl);
            
            const rect = this.getBoundingClientRect();
            tooltipEl.style.left = rect.left + 'px';
            tooltipEl.style.top = (rect.top - tooltipEl.offsetHeight - 10) + 'px';
            
            this.tooltipElement = tooltipEl;
        });
        
        icon.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
                this.tooltipElement = null;
            }
        });
    });
}

// ========================================
// PRICE CONVERTER
// ========================================
function initPriceConverter() {
    const regionSelect = document.getElementById('region-select');
    if (!regionSelect) return;
    
    const prices = document.querySelectorAll('.price[data-price]');
    
    const exchangeRates = {
        USD: { symbol: '$', rate: 1 },
        EUR: { symbol: '€', rate: 0.92 },
        GBP: { symbol: '£', rate: 0.79 },
        JPY: { symbol: '¥', rate: 149.50 },
        CNY: { symbol: '¥', rate: 7.24 },
        AUD: { symbol: 'A$', rate: 1.52 }
    };
    
    regionSelect.addEventListener('change', () => {
        const selected = exchangeRates[regionSelect.value];
        
        prices.forEach(priceEl => {
            const basePrice = parseFloat(priceEl.dataset.price);
            const convertedPrice = (basePrice * selected.rate).toFixed(2);
            priceEl.textContent = `${selected.symbol}${convertedPrice}`;
        });
        
        playSound('click');
    });
}

// ========================================
// ACCORDION
// ========================================
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');
            const icon = header.querySelector('i');
            
            const isOpen = item.classList.contains('active');
            
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-content').style.maxHeight = null;
                i.querySelector('i').style.transform = 'rotate(0deg)';
            });
            
            if (!isOpen) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.style.transform = 'rotate(90deg)';
            }
            
            playSound('click');
        });
    });
}

// ========================================
// SOUND TOGGLE
// ========================================
function initSoundToggle() {
    const soundToggle = document.getElementById('sound-toggle');
    if (!soundToggle) return;
    
    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundToggle.classList.toggle('muted');
        
        if (soundEnabled) {
            playSound('click');
        }
    });
}

function playSound(soundName) {
    if (!soundEnabled || !sounds[soundName]) return;
    
    const sound = sounds[soundName].cloneNode();
    sound.volume = 0.2;
    sound.play().catch(() => {}); // Ignore autoplay restrictions
}

// ========================================
// LIVE PLAYER COUNTER
// ========================================
function initLiveCounter() {
    const statNumber = document.querySelector('.stat-number');
    if (!statNumber) return;
    
    let baseCount = 10000000;
    
    function updateCount() {
        const change = Math.floor(Math.random() * 100) - 50;
        baseCount += change;
        
        statNumber.textContent = baseCount.toLocaleString() + '+';
    }
    
    setInterval(updateCount, 5000);
}

// ========================================
// NEWSLETTER FORM
// ========================================
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = form.querySelector('input').value;
        
        // Show success message
        showNotification('Thank you for subscribing!', 'success');
        form.querySelector('input').value = '';
        playSound('click');
    });
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 20px 30px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #00FF88, #00CCFF)' : 'linear-gradient(135deg, #FF4E4E, #FF9A4D)'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// MOBILE MENU
// ========================================
function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('nav-menu');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        
        if (menu.classList.contains('active')) {
            menu.style.display = 'flex';
            menu.style.position = 'absolute';
            menu.style.top = '100%';
            menu.style.left = '0';
            menu.style.right = '0';
            menu.style.flexDirection = 'column';
            menu.style.background = 'rgba(9, 11, 25, 0.98)';
            menu.style.padding = '20px';
            menu.style.gap = '15px';
            menu.style.borderTop = '1px solid rgba(154, 77, 255, 0.3)';
            menu.style.backdropFilter = 'blur(20px)';
        } else {
            menu.style.display = 'none';
        }
        
        playSound('click');
    });
    
    // Close menu when clicking links
    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                toggle.classList.remove('active');
                menu.classList.remove('active');
                menu.style.display = 'none';
            }
        });
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: 'power2.inOut'
                });
                
                playSound('click');
            }
        });
    });
}

// ========================================
// PAGE TRANSITION (for navigating to new pages)
// ========================================
document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.hostname === window.location.hostname && !this.classList.contains('no-transition')) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            playSound('transition');
            
            document.body.style.animation = 'fadeOut 0.5s ease';
            
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        }
    });
});

// Add fade out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0.98);
        }
    }
`;
document.head.appendChild(style);

// ========================================
// INITIALIZE ON DOM LOAD
// ========================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🎮 Palworld Enhanced Experience Loaded!');
    });
} else {
    console.log('🎮 Palworld Enhanced Experience Loaded!');
}
