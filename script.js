// Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const navbar = document.querySelector('.navbar');
const contactForm = document.getElementById('contactForm');
const style = document.createElement('style');

// -- Mobile Navigation Toggle --
navToggle.addEventListener('click', () => navMenu.classList.toggle('active'));

// -- Close mobile menu on link click --
navLinks.forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
});

// -- Smooth scrolling --
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// -- Navbar background on scroll --
window.addEventListener('scroll', () => {
    navbar.style.background = window.scrollY > 100 
        ? 'rgba(10, 10, 15, 0.98)' 
        : 'rgba(10, 10, 15, 0.95)';
});

// -- Highlight active nav link --
function highlightNavLink() {
    let current = '';
    const scrollY = window.scrollY;
    sections.forEach(section => {
        const { offsetTop, clientHeight, id } = section;
        if (scrollY >= offsetTop - 150) current = id;
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}
window.addEventListener('scroll', highlightNavLink);

// -- Scroll animations --
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// -- Initialize animations and typing --
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    typeWriterSequence();
});

// -- Contact form handling --
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject').trim();
        const message = formData.get('message').trim();

        if (!name || !email || !subject || !message) {
            return showNotification('Please fill in all required fields.', 'error');
        }
        if (!isValidEmail(email)) {
            return showNotification('Please enter a valid email address.', 'error');
        }

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// -- Validate email --
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// -- Notification system --
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#28a745' : '#dc3545',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        zIndex: 10000,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        animation: 'slideInRight 0.3s ease',
        maxWidth: '400px'
    });
    document.body.appendChild(notification);

    notification.querySelector('.notification-close').addEventListener('click', () => closeNotification(notification));
    setTimeout(() => closeNotification(notification), 5000);
}

function closeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
        if (notification.parentElement) {
            notification.parentElement.removeChild(notification);
        }
    }, 300);
}

// -- Notification styles --
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    }
    .nav-link.active {
        color: #4c9eff !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// -- Typing effect --
function typeWriterSequence() {
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    if (!heroTitle || !heroSubtitle) return;

    //heroTitle.style.opacity = '0';
    //heroSubtitle.style.opacity = '0';
    const titleText = "Hi, I'm ";
    const nameText = "Mansi";
    const subtitleText = "I'm a Software Developer";

    function typeTitle() {
        heroTitle.innerHTML = '';
        heroTitle.style.opacity = '1';
        let i = 0;
        const typeChar = () => {
            if (i < titleText.length) {
                heroTitle.innerHTML += titleText.charAt(i++);
                setTimeout(typeChar, 100);
            } else {
                heroTitle.innerHTML += `<span class="highlight">${nameText}</span>`;
                setTimeout(typeSubtitle, 500);
            }
        };
        typeChar();
    }

    function typeSubtitle() {
        heroSubtitle.innerHTML = '';
        heroSubtitle.style.opacity = '1';
        let i = 0;
        const typeChar = () => {
            if (i < subtitleText.length) {
                heroSubtitle.innerHTML += subtitleText.charAt(i++);
                setTimeout(typeChar, 80);
            }
        };
        typeChar();
    }

    setTimeout(typeTitle, 1000);
}

// -- Project card hover effects --
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(-10px) scale(1)';
    });
});

// -- Social links hover effects --
document.querySelectorAll('.social-link, .social-icon').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-3px) rotate(5deg)';
    });
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(-3px) rotate(0deg)';
    });
});

// -- Animate on scroll --
function animateOnScroll() {
    const elements = document.querySelectorAll('.education-card, .timeline-item, .skills-category, .project-card, .hero-text, .about-text, .contact-form, .contact-info, .section-title');
    const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 150);
            }
        });
    }, observerOptions);

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px) scale(0.95)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

console.log('Portfolio website loaded successfully! 🚀');
