// Professional Portfolio JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Initialize all portfolio functionality
function initializePortfolio() {
    initMobileNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initContactForm();
    initActiveNavigation();
    initHeaderScrollEffect();
}

// Mobile Navigation Toggle
function initMobileNavigation() {
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !mobileNav.contains(e.target)) {
                mobileToggle.classList.remove('active');
                mobileNav.classList.remove('active');
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[data-target]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations for Sections
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Add fade-in class to sections and observe them
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            if (validateForm(formObject)) {
                handleFormSubmission(formObject);
            }
        });
    }
}

// Form Validation
function validateForm(data) {
    const requiredFields = ['name', 'email', 'message'];
    let isValid = true;
    
    // Clear previous error states
    clearFormErrors();
    
    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            showFieldError(field, 'This field is required');
            isValid = false;
        }
    });
    
    // Email validation
    if (data.email && !isValidEmail(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    return isValid;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show field error
function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    if (field) {
        field.style.borderColor = '#ff6b6b';
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ff6b6b';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '0.5rem';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
}

// Clear form errors
function clearFormErrors() {
    const fields = document.querySelectorAll('#contactForm input, #contactForm textarea');
    fields.forEach(field => {
        field.style.borderColor = '';
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    });
}

// Handle form submission
function handleFormSubmission(data) {
    const submitButton = document.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        document.getElementById('contactForm').reset();
    }, 2000);
}

// Show success message
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        background: #4CAF50;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        text-align: center;
        font-weight: 500;
    `;
    successDiv.textContent = 'Thank you! Your message has been sent successfully.';
    
    const form = document.getElementById('contactForm');
    form.appendChild(successDiv);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Active Navigation Highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('a[data-target]');
    
    function highlightActiveSection() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`a[data-target="${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Initial call
}

// Header Scroll Effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.main-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Utility Functions

// Debounce function for performance optimization
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add typing effect to hero section (optional enhancement)
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-text h2');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Initialize particle background effect (optional)
function initParticleBackground() {
    // This would add a subtle animated background
    // Implementation would depend on requirements
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor and log performance metrics
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart);
        }, 0);
    });
}

// Export functions for potential external use
window.PortfolioApp = {
    initializePortfolio,
    initMobileNavigation,
    initSmoothScrolling,
    initScrollAnimations,
    initContactForm
};
