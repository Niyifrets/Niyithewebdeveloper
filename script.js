// Theme Toggle Functionality
const toggle = document.getElementById("themeToggle");
const body = document.body;

toggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    body.classList.toggle("light");
});

// Typewriter Effect
function typewriterEffect() {
    const texts = ["Web Developer", "UI/UX Designer", "Problem Solver"];
    const typewriterElement = document.querySelector('.typewriter');
    if (!typewriterElement) return;
    
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    
    (function type() {
        if (count === texts.length) count = 0;
        currentText = texts[count];
        letter = currentText.slice(0, ++index);
        
        typewriterElement.textContent = letter;
        
        if (letter.length === currentText.length) {
            setTimeout(() => {
                index = 0;
                count++;
                setTimeout(type, 1000);
            }, 2000);
        } else {
            setTimeout(type, 100);
        }
    })();
}

// Animated Background
function createFloatingShapes() {
    const shapesContainer = document.querySelector('.floating-shapes');
    if (!shapesContainer) return;
    
    const shapesCount = 3;
    
    for (let i = 0; i < shapesCount; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        shapesContainer.appendChild(shape);
    }
}

// Scroll Progress
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Stats Counter
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = Math.floor(current);
                }, 16);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

// Portfolio Filter
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (filterBtns.length === 0 || portfolioItems.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category').includes(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in-up');
    if (fadeElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => observer.observe(element));
}

// Contact Form Handler with EmailJS
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    // Initialize EmailJS with your actual Public Key
    emailjs.init("JA6CVT7LBgB5fXSGa");

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Send email using EmailJS with your actual IDs
        emailjs.sendForm('service_wzpu8jt', 'template_zjo3t19', this)
            .then(function() {
                // Success
                submitBtn.textContent = 'Message Sent! 🎉';
                submitBtn.style.background = '#25D366';
                
                // Show success message
                showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    contactForm.reset();
                }, 4000);
            }, function(error) {
                // Error
                submitBtn.textContent = 'Failed to Send';
                submitBtn.style.background = '#ff4757';
                
                // Show error message
                showFormMessage('Failed to send message. Please try again or email me directly.', 'error');
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 4000);
                
                console.log('Email failed:', error);
            });
    });
}

// Helper function to show form messages
function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    messageElement.style.cssText = `
        padding: 15px;
        margin: 20px 0;
        border-radius: 8px;
        text-align: center;
        font-weight: 500;
        background: ${type === 'success' ? 'rgba(37, 211, 102, 0.1)' : 'rgba(255, 71, 87, 0.1)'};
        color: ${type === 'success' ? '#25D366' : '#ff4757'};
        border: 2px solid ${type === 'success' ? '#25D366' : '#ff4757'};
    `;
    
    // Insert after the form
    const contactForm = document.getElementById('contact-form');
    contactForm.parentNode.insertBefore(messageElement, contactForm.nextSibling);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// FAQ Accordion Functionality
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    const showMoreBtn = document.getElementById('showMoreFaq');
    const hiddenFaqs = document.querySelectorAll('.hidden-faq');
    let showAll = false;
    
    // FAQ toggle functionality
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Show More functionality
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function() {
            showAll = !showAll;
            
            hiddenFaqs.forEach(faq => {
                if (showAll) {
                    faq.style.display = 'block';
                    this.textContent = 'Show Less Questions';
                } else {
                    faq.style.display = 'none';
                    this.textContent = 'Show More Questions';
                }
            });
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navigation Menu Functionality
function initNavigationMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navItems = document.querySelector('.nav-items');
    
    if (navToggle && navItems) {
        navToggle.addEventListener('click', function() {
            navItems.classList.toggle('show');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function() {
                navItems.classList.remove('show');
                navToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navItems.contains(e.target)) {
                navItems.classList.remove('show');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Skill Level Animation
function initSkillAnimations() {
    const skills = document.querySelectorAll('.skill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.querySelector('.skill-progress');
                if (progress) {
                    const level = progress.getAttribute('data-level');
                    progress.style.transform = `scaleX(${level})`;
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skills.forEach(skill => {
        observer.observe(skill);
    });
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-top';
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Portfolio Image Loading Simulation
function initPortfolioLoading() {
    const portfolioImages = document.querySelectorAll('.portfolio-image');
    
    portfolioImages.forEach(image => {
        // Simulate loading (in real scenario, this would be actual image loading)
        image.classList.add('loading');
        
        setTimeout(() => {
            image.classList.remove('loading');
        }, 1000);
    });
}

// Add loading state to buttons
function initButtonLoading() {
    const buttons = document.querySelectorAll('.cta, .portfolio-link, .contact-link, .show-more-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Only add loading for links that might take time
            if (this.href && !this.href.startsWith('#')) {
                this.style.opacity = '0.7';
                this.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    this.style.opacity = '';
                    this.style.pointerEvents = '';
                }, 2000);
            }
        });
    });
}

// WhatsApp Integration
function initWhatsAppIntegration() {
    const whatsappLinks = document.querySelectorAll('.whatsapp-link');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Optional: Add analytics or tracking here
            console.log('WhatsApp link clicked');
        });
    });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Existing functionality
    initFAQAccordion();
    initSmoothScroll();
    initNavigationMenu();
    initSkillAnimations();
    initScrollToTop();
    initPortfolioLoading();
    initButtonLoading();
    initWhatsAppIntegration();
    
    // New enhanced functionality
    typewriterEffect();
    createFloatingShapes();
    initScrollProgress();
    initStatsCounter();
    initPortfolioFilter();
    initScrollAnimations();
    initContactForm();
});
