// Theme Toggle Functionality
const toggle = document.getElementById("themeToggle");
const body = document.body;

toggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    body.classList.toggle("light");
});

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
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
});

// Smooth scrolling for navigation links
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

// Navigation Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
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
});

// Skill Level Animation
document.addEventListener('DOMContentLoaded', function() {
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
});

// Scroll to Top Button
document.addEventListener('DOMContentLoaded', function() {
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
});

// Portfolio Image Loading Simulation
document.addEventListener('DOMContentLoaded', function() {
    const portfolioImages = document.querySelectorAll('.portfolio-image');
    
    portfolioImages.forEach(image => {
        // Simulate loading (in real scenario, this would be actual image loading)
        image.classList.add('loading');
        
        setTimeout(() => {
            image.classList.remove('loading');
        }, 1000);
    });
});

// Form Validation (for future contact form)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ff4757';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });
    
    return isValid;
}

// Add loading state to buttons
document.addEventListener('DOMContentLoaded', function() {
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
});

// WhatsApp Integration
document.addEventListener('DOMContentLoaded', function() {
    const whatsappLinks = document.querySelectorAll('.whatsapp-link');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Optional: Add analytics or tracking here
            console.log('WhatsApp link clicked');
        });
    });
});
