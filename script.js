// DOM Elements (guarded selectors)
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link') || [];
const contactForm = document.getElementById('contact-form');
const filterBtns = document.querySelectorAll('.filter-btn') || [];
const projectCards = document.querySelectorAll('.project-card') || [];
const themeToggleBtn = document.getElementById('theme-toggle');

// Mobile Navigation Toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.classList.toggle('active');
        if (navMenu) navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', String(!expanded));
    });
}

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
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
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
if (contactForm) {
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
}

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
    
    // Hide loading screen after page loads
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// Theme toggle (light/dark) with persistence
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
        themeToggleBtn && (themeToggleBtn.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i>');
    } else {
        themeToggleBtn && (themeToggleBtn.innerHTML = '<i class="fas fa-moon" aria-hidden="true"></i>');
    }
}

// Wireframe gallery: render uploaded images/PDFs in the wireframe gallery area
function setupWireframeGallery() {
    const gallery = document.querySelector('.wireframe-gallery');
    if (!gallery) return;

    // List of uploaded wireframe files (paths relative to site root)
    const files = [
        '/assets/images/Iphone Wireframe.1. 2025-06-19 at 2.21.10 PM.png',
        '/assets/images/Iphone Wireframe.2.  2025-06-19 at 2.20.56 PM.png',
        '/assets/images/Iphone Wireframe.3. 2025-06-19 at 2.20.44 PM.png',
        '/assets/images/Iphone Wireframe.4. 2025-06-19 at 2.20.32 PM.png',
        '/assets/images/Iphone Wireframe.5. 2025-06-19 at 2.20.21 PM.png',
        '/assets/images/Iphone Wireframe.6.2025-06-19 at 2.20.09 PM.png',
        '/assets/images/Mobile Wireframe 2025-07-27 at 5.54.36 PM.png'
    ];

    gallery.innerHTML = '';

    files.forEach(path => {
        const url = encodeURI(path);
        const item = document.createElement('div');
        item.className = 'gallery-item';

        const isPdf = path.toLowerCase().endsWith('.pdf');

        if (isPdf) {
            // PDF placeholder
            const box = document.createElement('div');
            box.className = 'gallery-placeholder-file';
            box.innerHTML = `<i class="fas fa-file-pdf"></i><div class="file-name">${path.split('/').pop()}</div>`;
            item.appendChild(box);
        } else {
            const img = document.createElement('img');
            img.className = 'gallery-thumb';
            img.src = url;
            img.alt = 'Wireframe';
            img.loading = 'lazy';
            item.appendChild(img);
        }

        // Actions: View (open in modal) + Download
        const actions = document.createElement('div');
        actions.className = 'gallery-actions';

        const viewBtn = document.createElement('button');
        viewBtn.className = 'btn btn-primary';
        viewBtn.type = 'button';
        viewBtn.innerHTML = '<i class="fas fa-eye"></i> View';
        viewBtn.addEventListener('click', () => {
            if (isPdf) {
                openViewer(`<div style="padding:0.5rem 1rem;display:flex;justify-content:flex-end;"><a class=\"btn btn-primary\" href=\"${url}\" target=\"_blank\" rel=\"noopener noreferrer\"><i class=\"fas fa-external-link-alt\"></i> Open PDF</a></div><div style=\"padding:1rem\"><iframe src=\"${url}\" style=\"width:100%;height:70vh;border:0;border-radius:6px;\" title=\"Wireframe PDF\"></iframe></div>`);
            } else {
                openViewer(`<div style="padding:1rem;text-align:center;"><img src=\"${url}\" alt=\"Wireframe\" style=\"max-width:100%;height:auto;border-radius:8px;box-shadow:0 12px 30px rgba(2,6,23,0.08);\"></div>`);
            }
        });

        const dl = document.createElement('a');
        dl.className = 'btn btn-secondary';
        dl.href = url;
        dl.setAttribute('download', '');
        dl.innerHTML = '<i class="fas fa-download"></i> Download';

        actions.appendChild(viewBtn);
        actions.appendChild(dl);
        item.appendChild(actions);

        gallery.appendChild(item);
    });
}

// Initialize wireframe gallery on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    try { setupWireframeGallery(); } catch (e) { console.warn('Wireframe gallery init failed', e); }
});

function initTheme() {
    try {
        const stored = localStorage.getItem('bcodestack_theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = stored || (prefersDark ? 'dark' : 'light');
        applyTheme(theme);

        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme') || 'light';
                const next = current === 'dark' ? 'light' : 'dark';
                applyTheme(next);
                localStorage.setItem('bcodestack_theme', next);
                showNotification(`Switched to ${next} theme`, 'info');
            });
        }
    } catch (err) {
        console.warn('Theme init failed', err);
    }
}

initTheme();

// Render features from JSON data
async function renderFeatures() {
    const container = document.getElementById('features-list');
    if (!container) return;

    try {
        const resp = await fetch('/data/site-data.json', {cache: 'no-cache'});
        if (!resp.ok) throw new Error('Failed to load site data');
        const data = await resp.json();
        const features = data.features || [];

        container.innerHTML = features.map(f => `
            <article class="feature-card" id="feature-${f.id}" aria-labelledby="feature-title-${f.id}">
                <div class="feature-icon" aria-hidden="true"><i class="${f.icon}"></i></div>
                <div class="feature-body">
                    <h3 id="feature-title-${f.id}">${f.title}</h3>
                    <p class="feature-summary">${f.description}</p>
                    <div class="feature-details" id="feature-details-${f.id}" hidden>
                        <p>${f.details || ''}</p>
                    </div>
                    <button class="feature-toggle" aria-expanded="false" aria-controls="feature-details-${f.id}">Learn more</button>
                </div>
            </article>
        `).join('');

        // Attach toggle handlers for expanded details
        features.forEach(f => {
            const btn = document.querySelector(`#feature-${f.id} .feature-toggle`);
            const details = document.getElementById(`feature-details-${f.id}`);
            if (btn && details) {
                btn.addEventListener('click', () => {
                    const expanded = btn.getAttribute('aria-expanded') === 'true';
                    btn.setAttribute('aria-expanded', String(!expanded));
                    if (expanded) {
                        details.hidden = true;
                        btn.textContent = 'Learn more';
                    } else {
                        details.hidden = false;
                        btn.textContent = 'Show less';
                        // smooth scroll the details into view if needed
                        details.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                });
            }
        });
    } catch (err) {
        console.warn('Could not render features:', err);
    }
}

// Initialize rendering on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    renderFeatures();
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

// Dark mode functionality removed for professional technical look

// Dark mode styles and functionality removed for professional technical look

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

// Initialize particle animation with error handling
try {
    createParticleAnimation();
} catch (error) {
    console.log('Particle animation failed:', error);
}

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

// Initialize map with error handling
try {
    initializeMap();
} catch (error) {
    console.log('Map initialization failed:', error);
    // Fallback: show a simple location text
    const mapElement = document.getElementById('map');
    if (mapElement) {
        mapElement.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #6b7280;"><i class="fas fa-map-marker-alt" style="margin-right: 10px;"></i>Ajao Estate, Lagos, Nigeria</div>';
    }
}

// Enhanced contact form with Formspree integration
function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // Form is already configured with Formspree action in HTML
    // Set up reply-to field to match email field for auto-replies
    const emailField = document.getElementById('email');
    const replyToField = document.getElementById('replyto');
    
    if (emailField && replyToField) {
        emailField.addEventListener('input', () => {
            replyToField.value = emailField.value;
        });
    }
    
    // Check for success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        showFormSuccess();
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    
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

// WhatsApp contact functionality
function setupWhatsAppContact() {
    const whatsappContact = document.querySelector('.whatsapp-contact');
    if (whatsappContact) {
        whatsappContact.addEventListener('click', (e) => {
            e.preventDefault();
            
            const phoneNumber = '2348143465588'; // Remove + and spaces for WhatsApp URL
            const message = 'Hi BCodeStack! I saw your portfolio and I\'m interested in discussing a project with you. I understand you work Monday-Friday (24/7 remote) and are closed weekends.';
            
            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            
            // Detect if user is on mobile
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            if (isMobile) {
                // On mobile, try to open WhatsApp app directly
                window.location.href = whatsappUrl;
            } else {
                // On desktop, open in new tab
                const newWindow = window.open(whatsappUrl, '_blank');
                if (!newWindow) {
                    // If popup blocked, fallback to current window
                    window.location.href = whatsappUrl;
                }
            }
        });
        
        // Add click animation
        whatsappContact.addEventListener('mousedown', () => {
            whatsappContact.style.transform = 'translateY(-1px) scale(0.98)';
        });
        
        whatsappContact.addEventListener('mouseup', () => {
            whatsappContact.style.transform = 'translateY(-3px) scale(1)';
        });
        
        whatsappContact.addEventListener('mouseleave', () => {
            whatsappContact.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add visual feedback on click
        whatsappContact.addEventListener('click', () => {
            whatsappContact.style.transform = 'scale(0.95)';
            setTimeout(() => {
                whatsappContact.style.transform = 'translateY(-3px) scale(1)';
            }, 150);
        });
    }
}

// Initialize WhatsApp contact
setupWhatsAppContact();

// Form success message function
function showFormSuccess() {
    const successMessage = document.getElementById('form-success');
    if (successMessage) {
        successMessage.style.display = 'block';
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide after 10 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 10000);
    }
}

// Portfolio section functionality
function setupPortfolioSection() {
    // Resume view functionality — make the anchor point directly to the uploaded PDF
    const viewResumeBtn = document.getElementById('view-resume');
    if (viewResumeBtn) {
        // If you uploaded the resume at /assets/images/Bethel_Hillary_Resume.docx-2.pdf, make the link point there
        const uploadedPath = '/assets/images/Bethel_Hillary_Resume.docx-2.pdf';
        viewResumeBtn.setAttribute('href', uploadedPath);
        viewResumeBtn.setAttribute('rel', 'noopener noreferrer');

        // Clean existing click listeners by cloning the node
        const newBtn = viewResumeBtn.cloneNode(true);
        viewResumeBtn.parentNode.replaceChild(newBtn, viewResumeBtn);

        // Attach robust click handler with loading spinner and iframe load/error handling
        newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const href = newBtn.getAttribute('href');
            if (!href) {
                openViewer(`<div style="padding:1rem"><h3>Resume not available</h3><p>The resume file is not linked. Please upload it to <code>/assets/</code> or contact the site owner.</p></div>`);
                return;
            }

            // Build modal content with spinner and iframe placeholder
            const modalContent = document.createElement('div');

            const toolbar = document.createElement('div');
            toolbar.style.cssText = 'display:flex;justify-content:flex-end;padding:0.5rem 0.75rem;background:transparent;';
            const openBtn = document.createElement('a');
            openBtn.className = 'btn btn-primary';
            openBtn.style.fontWeight = '800';
            openBtn.style.display = 'inline-flex';
            openBtn.style.alignItems = 'center';
            openBtn.style.gap = '0.5rem';
            openBtn.href = href;
            openBtn.target = '_blank';
            openBtn.rel = 'noopener noreferrer';
            openBtn.innerHTML = '<i class="fas fa-external-link-alt"></i> Open in new tab';
            toolbar.appendChild(openBtn);

            const bodyDiv = document.createElement('div');
            bodyDiv.style.padding = '0 1rem 1rem 1rem';

            const spinner = document.createElement('div');
            spinner.className = 'resume-spinner';
            spinner.style.cssText = 'display:flex;align-items:center;justify-content:center;height:80vh;';
            spinner.innerHTML = '<div style="width:48px;height:48px;border:6px solid #e5e7eb;border-top-color:#2563eb;border-radius:50%;animation:spin 1s linear infinite;"></div>';

            bodyDiv.appendChild(spinner);
            modalContent.appendChild(toolbar);
            modalContent.appendChild(bodyDiv);

            // Open modal with spinner first
            openViewer(modalContent.innerHTML);

            // After modal is open, replace spinner with iframe and attach load/error handlers
            setTimeout(() => {
                const viewerBody = document.getElementById('viewer-body');
                if (!viewerBody) return;

                // Create iframe
                const iframe = document.createElement('iframe');
                iframe.src = href;
                iframe.title = 'Resume';
                iframe.style.cssText = 'width:100%;height:80vh;border:0;border-radius:6px;opacity:0;transition:opacity 260ms ease;';

                // onload -> show iframe
                iframe.onload = () => {
                    // replace spinner with iframe
                    viewerBody.innerHTML = '';
                    // re-add toolbar at top
                    viewerBody.appendChild(toolbar);
                    viewerBody.appendChild(iframe);
                    setTimeout(() => iframe.style.opacity = '1', 50);
                };

                // onerror -> fallback to open in new tab message
                iframe.onerror = () => {
                    viewerBody.innerHTML = `<div style="padding:1rem"><h3>Unable to display resume inline</h3><p>Your browser or server prevented inline viewing. <a href=\"${href}\" target=\"_blank\" rel=\"noopener noreferrer\">Open the resume in a new tab</a>.</p></div>`;
                };

                // Insert iframe after a short delay to allow DOM updates
                viewerBody.appendChild(iframe);
            }, 80);
        });
    }
    
    // Wireframe projects view functionality
    const viewWireframesBtn = document.getElementById('view-wireframes');
    if (viewWireframesBtn) {
        viewWireframesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const wireframeDetails = document.getElementById('wireframe-details');
            if (wireframeDetails) {
                // open wireframe details in modal for cleaner UX
                openViewer(wireframeDetails.innerHTML);
            }
        });
    }
    
    // Certifications view functionality
    const viewCertificationsBtn = document.getElementById('view-certifications');
    if (viewCertificationsBtn) {
        viewCertificationsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Show placeholder certifications modal
            openViewer('<div style="padding:1rem"><h3>Certifications</h3><p>Certifications will be displayed here. Upload PDFs or links to show them in this viewer.</p></div>');
        });
    }
}

// Add tactile 'pressed' feedback for physical buttons
function setupButtonPressFeedback() {
    const btns = [
        document.getElementById('view-wireframes'),
        document.getElementById('view-certifications')
    ].filter(Boolean);

    btns.forEach(btn => {
        // pointerdown for both mouse and touch
        btn.addEventListener('pointerdown', () => {
            btn.classList.add('pressed');
        });
        // remove on pointerup / leave / cancel
        ['pointerup', 'pointercancel', 'pointerleave', 'blur'].forEach(ev => {
            btn.addEventListener(ev, () => btn.classList.remove('pressed'));
        });
    });
}

// init small UI bits on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    try { setupButtonPressFeedback(); } catch (e) { /* ignore if elements missing */ }
});

/* Viewer modal utilities */
function openViewer(htmlContent) {
    const modal = document.getElementById('viewer-modal');
    const body = document.getElementById('viewer-body');
    if (!modal || !body) return;
    body.innerHTML = htmlContent || '<p>No content</p>';
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    // trap focus: move focus to close button
    const closeBtn = modal.querySelector('.viewer-close');
    if (closeBtn) closeBtn.focus();
    // add escape key handler
    function escHandler(e) {
        if (e.key === 'Escape') closeViewer();
    }
    modal._escHandler = escHandler;
    document.addEventListener('keydown', escHandler);
}

function closeViewer() {
    const modal = document.getElementById('viewer-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    // cleanup escape handler
    if (modal._escHandler) {
        document.removeEventListener('keydown', modal._escHandler);
        delete modal._escHandler;
    }
}

// wire modal close button and backdrop
document.addEventListener('click', (e) => {
    const modal = document.getElementById('viewer-modal');
    if (!modal) return;
    if (e.target.matches('.viewer-close') || e.target.matches('.viewer-modal.hidden') || e.target.matches('.viewer-backdrop')) {
        closeViewer();
    }
    // clicking on modal backdrop area (but not the content) should close
    if (e.target.classList && e.target.classList.contains('viewer-modal')) {
        closeViewer();
    }
});

// Initialize portfolio section
setupPortfolioSection();
