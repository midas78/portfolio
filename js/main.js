// ========================================
// Navigation
// ========================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// Active Nav Link on Scroll
// ========================================
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ========================================
// Scroll Animations (Intersection Observer)
// ========================================
const fadeElements = document.querySelectorAll('.fade-in');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(element => {
    observer.observe(element);
});

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.id === 'credentialModalLink') return;
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href.length <= 1) return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Degree Modal
// ========================================
const degreeBtn = document.getElementById('degreeBtn');
const degreeModal = document.getElementById('degreeModal');
const degreeModalClose = document.getElementById('degreeModalClose');
const degreeModalOverlay = document.getElementById('degreeModalOverlay');

function openDegreeModal() {
    degreeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDegreeModal() {
    degreeModal.classList.remove('active');
    document.body.style.overflow = '';
}

degreeBtn.addEventListener('click', openDegreeModal);
degreeModalClose.addEventListener('click', closeDegreeModal);
degreeModalOverlay.addEventListener('click', closeDegreeModal);

// ========================================
// Credential Modal (image, same look as degree modal)
// ========================================
const credentialModal = document.getElementById('credentialModal');
const credentialModalClose = document.getElementById('credentialModalClose');
const credentialModalOverlay = document.getElementById('credentialModalOverlay');
const credentialModalTitle = document.getElementById('credentialModalTitle');
const credentialModalSubtitle = document.getElementById('credentialModalSubtitle');
const credentialModalImage = document.getElementById('credentialModalImage');
const credentialModalLink = document.getElementById('credentialModalLink');

function openCredentialModal(title, subtitle, image, url) {
    credentialModalTitle.textContent = title;
    credentialModalSubtitle.textContent = subtitle || '';
    credentialModalImage.src = image;
    credentialModalImage.alt = title;
    credentialModalLink.href = url;
    credentialModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCredentialModal() {
    credentialModal.classList.remove('active');
    credentialModalImage.src = '';
    document.body.style.overflow = '';
}

document.querySelectorAll('.credential-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        openCredentialModal(btn.dataset.title, btn.dataset.subtitle, btn.dataset.image, btn.dataset.url);
    });
});

credentialModalClose.addEventListener('click', closeCredentialModal);
credentialModalOverlay.addEventListener('click', closeCredentialModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (credentialModal.classList.contains('active')) {
            closeCredentialModal();
        }
        if (degreeModal.classList.contains('active')) {
            closeDegreeModal();
        }
    }
});
// ========================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Uncomment to enable typing effect on hero title:
// const heroTitle = document.querySelector('.hero-title');
// typeWriter(heroTitle, 'Full Stack Developer', 100);

// ========================================
// Page Load Animation
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Animate hero elements sequentially
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    });
});
