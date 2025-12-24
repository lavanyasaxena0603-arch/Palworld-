
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});


const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
 
        navLinks.forEach(l => l.classList.remove('active'));
        
     
        link.classList.add('active');

        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        
        if (navMenu.style.display === 'flex') {
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.flexDirection = 'column';
            navMenu.style.background = 'rgba(15, 15, 35, 0.98)';
            navMenu.style.padding = '20px';
            navMenu.style.gap = '20px';
            navMenu.style.borderTop = '1px solid rgba(99, 102, 241, 0.3)';
        }
    });
}


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);


const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});


const highlightItems = document.querySelectorAll('.highlight-item');
highlightItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-50px)';
    item.style.transition = `all 0.5s ease ${index * 0.15}s`;
    observer.observe(item);
});


const requirementCards = document.querySelectorAll('.requirement-card');
requirementCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.6s ease ${index * 0.2}s`;
    observer.observe(card);
});


const downloadOptions = document.querySelectorAll('.download-option');
downloadOptions.forEach((option, index) => {
    option.style.opacity = '0';
    option.style.transform = 'scale(0.9)';
    option.style.transition = `all 0.5s ease ${index * 0.15}s`;
    observer.observe(option);
});


const animateValue = (element, start, end, duration, suffix = '') => {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
};

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const statNumber = entry.target.querySelector('h3');
            const text = statNumber.textContent;
            
            if (text.includes('M')) {
                animateValue(statNumber, 0, 10, 2000, 'M+');
            } else if (text.includes('/')) {
                animateValue(statNumber, 0, 4.8, 2000, '/5');
            } else if (text.includes('+')) {
                animateValue(statNumber, 0, 50, 2000, '+');
            }
        }
    });
}, { threshold: 0.5 });

const statItems = document.querySelectorAll('.stat-item');
statItems.forEach(item => statObserver.observe(item));


const videoPlaceholder = document.querySelector('.video-placeholder');
if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', () => {
   
        videoPlaceholder.style.transform = 'scale(0.98)';
        setTimeout(() => {
            videoPlaceholder.style.transform = 'scale(1)';
        }, 100);
        
    
        console.log('Video clicked - Would open video player');
    });
}

const downloadButtons = document.querySelectorAll('.download-btn');
downloadButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
    
        const platform = button.querySelector('span').textContent;
        

        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        const rect = button.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left - 10) + 'px';
        ripple.style.top = (e.clientY - rect.top - 10) + 'px';
        
        button.style.position = 'relative';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        

        showNotification(`Initiating download for ${platform}...`);
        
 
        console.log(`Download initiated for: ${platform}`);
    });
});

function showNotification(message) {

    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.right = '20px';
    notification.style.padding = '20px 30px';
    notification.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
    notification.style.color = '#fff';
    notification.style.borderRadius = '12px';
    notification.style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.4)';
    notification.style.zIndex = '10000';
    notification.style.animation = 'slideIn 0.3s ease-out';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.gap = '10px';
    notification.style.fontWeight = '500';
    

    const icon = document.createElement('i');
    icon.className = 'fas fa-check-circle';
    icon.style.fontSize = '20px';
    notification.appendChild(icon);
    

    const text = document.createElement('span');
    text.textContent = message;
    notification.appendChild(text);
    
    document.body.appendChild(notification);
    

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}


const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);


window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    

    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
    

    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, 500 + (index * 200));
    });
});


const sections = document.querySelectorAll('section[id]');

const highlightNav = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', highlightNav);


window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    const particles = document.querySelectorAll('.particle');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    

    particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.1;
        particle.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed}px)`;
    });
});


const interactiveElements = document.querySelectorAll('.btn, .feature-card, .download-option');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        
        element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});


function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


const debouncedHighlightNav = debounce(highlightNav, 50);
window.removeEventListener('scroll', highlightNav);
window.addEventListener('scroll', debouncedHighlightNav);


console.log('🎮 Palworld Core Features Loaded!');
console.log('💫 Enhanced features loading...');
