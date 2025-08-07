// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize animations
    initAnimations();
    
    // Initialize contact form
    initContactForm();

    // Initialize before/after slider
    initBeforeAfterSlider();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Hide loading screen after all content is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1000);
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');
    
    let isMenuOpen = false;
    
    menuToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        
        // Toggle menu visibility
        navLinks.style.display = isMenuOpen ? 'flex' : 'none';
        
        // Animate hamburger icon
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (isMenuOpen) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
        
        // Adjust header for mobile menu
        if (isMenuOpen) {
            navLinks.style.position = 'absolute';
            navLinks.style.top = '80px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'var(--color-background)';
            navLinks.style.padding = '1rem';
            navLinks.style.flexDirection = 'column';
            navLinks.style.alignItems = 'center';
            navLinks.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !e.target.closest('.nav-container')) {
            menuToggle.click();
        }
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) menuToggle.click();
        });
    });
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
        section.classList.add('fade-in');
    });
    
    // Add animation classes
    const fadeIn = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = fadeIn;
    document.head.appendChild(style);
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // TODO: Replace with actual form submission
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            form.reset();
        });
    }
}

// Before/After Slider
function initBeforeAfterSlider() {
    const slider = document.querySelector('.before-after-slider');
    const afterImage = document.querySelector('.after-image');
    const sliderHandle = document.querySelector('.slider-handle');
    
    let isResizing = false;
    
    // Handle mouse/touch events
    slider.addEventListener('mousedown', startSliding);
    slider.addEventListener('touchstart', startSliding);
    
    function startSliding(e) {
        isResizing = true;
        slider.classList.add('active');
        
        // Add event listeners for drag and end
        document.addEventListener('mousemove', slide);
        document.addEventListener('touchmove', slide);
        document.addEventListener('mouseup', stopSliding);
        document.addEventListener('touchend', stopSliding);
    }
    
    function slide(e) {
        if (!isResizing) return;
        
        // Get slider dimensions
        const sliderRect = slider.getBoundingClientRect();
        
        // Calculate position
        let x = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
        x = x - sliderRect.left;
        let position = (x / sliderRect.width) * 100;
        
        // Constrain position between 0% and 100%
        position = Math.max(0, Math.min(100, position));
        
        // Update slider position
        afterImage.style.clipPath = `polygon(${position}% 0, 100% 0, 100% 100%, ${position}% 100%)`;
        sliderHandle.style.left = `${position}%`;
    }
    
    function stopSliding() {
        isResizing = false;
        slider.classList.remove('active');
        
        // Remove event listeners
        document.removeEventListener('mousemove', slide);
        document.removeEventListener('touchmove', slide);
        document.removeEventListener('mouseup', stopSliding);
        document.removeEventListener('touchend', stopSliding);
    }
}

// Helper function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add scroll-based header styling
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        header.style.boxShadow = 'none';
    }
});