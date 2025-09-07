// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Project filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-in';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission (replace with actual form handling)
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    contactForm.reset();
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Scroll animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.about, .projects, .contact, .project-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const loadingStyles = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject loading styles
const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);

// Add smooth reveal animation for project cards
function animateProjectCards() {
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize project card animations
document.addEventListener('DOMContentLoaded', () => {
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
    
    // Animate cards when they come into view
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProjectCards();
                projectObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    const projectsSection = document.querySelector('.projects');
    if (projectsSection) {
        projectObserver.observe(projectsSection);
    }
});

// Add hover effects for skill tags
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add click-to-copy functionality for contact info
document.addEventListener('DOMContentLoaded', () => {
    const contactMethods = document.querySelectorAll('.contact-method p');
    contactMethods.forEach(method => {
        method.style.cursor = 'pointer';
        method.title = 'Click to copy';
        
        method.addEventListener('click', () => {
            const text = method.textContent;
            navigator.clipboard.writeText(text).then(() => {
                showNotification(`Copied: ${text}`, 'success');
            }).catch(() => {
                showNotification('Failed to copy to clipboard', 'error');
            });
        });
    });
});

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #7c3aed);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Add dark mode toggle
function createDarkModeToggle() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: #2563eb;
        color: white;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    `;
    
    document.body.appendChild(darkModeToggle);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// Add dark mode styles
const darkModeStyles = `
    .dark-mode {
        background-color: #1a1a1a !important;
        color: #e5e5e5 !important;
    }
    
    .dark-mode .navbar {
        background: rgba(26, 26, 26, 0.95) !important;
        border-bottom-color: rgba(255, 255, 255, 0.1) !important;
    }
    
    .dark-mode .nav-link {
        color: #e5e5e5 !important;
    }
    
    .dark-mode .hero {
        background: linear-gradient(135deg, #1e3a8a 0%, #581c87 100%) !important;
    }
    
    .dark-mode .about {
        background: #2d2d2d !important;
    }
    
    .dark-mode .projects {
        background: #1a1a1a !important;
    }
    
    .dark-mode .portfolio {
        background: #1a1a1a !important;
    }
    
    .dark-mode .portfolio-card {
        background: #2d2d2d !important;
        border-color: #404040 !important;
    }
    
    .dark-mode .contact {
        background: #2d2d2d !important;
    }
    
    .dark-mode .project-card {
        background: #2d2d2d !important;
        border-color: #404040 !important;
    }
    
    .dark-mode .contact-form {
        background: #2d2d2d !important;
    }
    
    .dark-mode .form-group input,
    .dark-mode .form-group textarea {
        background: #404040 !important;
        border-color: #555 !important;
        color: #e5e5e5 !important;
    }
    
    .dark-mode .skill-tag {
        background: #404040 !important;
        color: #e5e5e5 !important;
    }
    
    .dark-mode .tech-tag {
        background: #1e40af !important;
        color: #dbeafe !important;
    }
`;

// Inject dark mode styles
const darkStyleSheet = document.createElement('style');
darkStyleSheet.textContent = darkModeStyles;
document.head.appendChild(darkStyleSheet);

// Initialize dark mode toggle
createDarkModeToggle();

// Add particle animation to hero section
function createParticleAnimation() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;
    hero.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        };
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(createParticle());
        }
    }
    
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.fill();
        });
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    initParticles();
    animate();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// Initialize particle animation
createParticleAnimation();

// Add typing effect for skills
function createTypingEffect() {
    const skillsSection = document.querySelector('.skills h3');
    if (!skillsSection) return;
    
    const originalText = skillsSection.textContent;
    const texts = [
        'Skills & Technologies',
        'Frontend Development',
        'Backend Development',
        'Full Stack Solutions',
        'Modern Web Technologies'
    ];
    
    let currentIndex = 0;
    
    function typeText(text, callback) {
        let i = 0;
        skillsSection.textContent = '';
        
        function type() {
            if (i < text.length) {
                skillsSection.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            } else {
                setTimeout(callback, 2000);
            }
        }
        
        type();
    }
    
    function eraseText(callback) {
        let text = skillsSection.textContent;
        
        function erase() {
            if (text.length > 0) {
                text = text.slice(0, -1);
                skillsSection.textContent = text;
                setTimeout(erase, 50);
            } else {
                callback();
            }
        }
        
        erase();
    }
    
    function cycleTexts() {
        typeText(texts[currentIndex], () => {
            eraseText(() => {
                currentIndex = (currentIndex + 1) % texts.length;
                cycleTexts();
            });
        });
    }
    
    // Start the typing effect after a delay
    setTimeout(cycleTexts, 3000);
}

// Initialize typing effect
createTypingEffect();

// Add scroll-triggered animations
function createScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .contact-method');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        animationObserver.observe(el);
    });
    
    // Add animation styles
    const animationStyles = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    
    const animationStyleSheet = document.createElement('style');
    animationStyleSheet.textContent = animationStyles;
    document.head.appendChild(animationStyleSheet);
}

// Initialize scroll animations
createScrollAnimations();

// Initialize interactive map
function initializeMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    // Create a simple interactive map using Leaflet (lightweight alternative to Google Maps)
    const mapScript = document.createElement('script');
    mapScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    mapScript.onload = () => {
        const map = L.map('map').setView([6.5244, 3.3792], 15); // Ajao Estate, Lagos, Nigeria coordinates
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        // Add a marker
        const marker = L.marker([6.5244, 3.3792]).addTo(map);
        marker.bindPopup('<b>Bethel Hillary</b><br>Ajao Estate, Lagos, Nigeria').openPopup();
        
        mapElement.classList.add('loaded');
    };
    
    const mapCSS = document.createElement('link');
    mapCSS.rel = 'stylesheet';
    mapCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(mapCSS);
    
    document.head.appendChild(mapScript);
}

// Initialize map
initializeMap();

// Enhanced contact form with Formspree integration
function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // Update form action for Formspree (you'll need to replace with your actual Formspree endpoint)
    form.action = 'https://formspree.io/f/xnnblpwp';
    form.method = 'POST';
    
    // Add form fields for better tracking
    const hiddenFields = [
        { name: '_subject', value: 'New Contact Form Submission from BCodeStack Portfolio' },
        { name: '_next', value: window.location.href + '?success=true' },
        { name: '_captcha', value: 'false' }
    ];
    
    hiddenFields.forEach(field => {
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = field.name;
        hiddenInput.value = field.value;
        form.appendChild(hiddenInput);
    });
    
    // Enhanced form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(form);
            
            // For demonstration, we'll simulate a successful submission
            // In production, you would send this to your Formspree endpoint
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Initialize contact form
setupContactForm();

// Add email validation and formatting
function enhanceFormValidation() {
    const emailInput = document.getElementById('email');
    if (!emailInput) return;
    
    emailInput.addEventListener('blur', () => {
        const email = emailInput.value.trim();
        if (email && !isValidEmail(email)) {
            emailInput.style.borderColor = '#ef4444';
            showNotification('Please enter a valid email address', 'error');
        } else {
            emailInput.style.borderColor = '#e5e7eb';
        }
    });
    
    // Real-time character counter for message
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 0.8rem;
            color: #6b7280;
            margin-top: 0.5rem;
        `;
        messageTextarea.parentNode.appendChild(counter);
        
        messageTextarea.addEventListener('input', () => {
            const length = messageTextarea.value.length;
            counter.textContent = `${length}/500 characters`;
            
            if (length > 500) {
                counter.style.color = '#ef4444';
                messageTextarea.style.borderColor = '#ef4444';
            } else {
                counter.style.color = '#6b7280';
                messageTextarea.style.borderColor = '#e5e7eb';
            }
        });
    }
}

// Initialize enhanced form validation
enhanceFormValidation();

// Portfolio section functionality
function setupPortfolioSection() {
    // Resume download functionality
    const downloadResumeBtn = document.getElementById('download-resume');
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Resume download will be available soon! Upload your PDF to enable this feature.', 'info');
        });
    }
    
    // Portfolio view functionality
    const viewPortfolioBtn = document.getElementById('view-portfolio');
    if (viewPortfolioBtn) {
        viewPortfolioBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Portfolio gallery will be available soon!', 'info');
        });
    }
    
    // Certifications view functionality
    const viewCertificationsBtn = document.getElementById('view-certifications');
    if (viewCertificationsBtn) {
        viewCertificationsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Certifications section will be available soon!', 'info');
        });
    }
}

// Initialize portfolio section
setupPortfolioSection();
