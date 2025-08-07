// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

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


// Mobile Menu
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const header = document.querySelector('.header');
    const navLinks = document.querySelector('.nav-links');
    
    let isMenuOpen = false;
    
    menuToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        
        // Toggle menu visibility
        header.classList.toggle('mobile-open');
        menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                isMenuOpen = false;
                header.classList.remove('mobile-open');
                menuToggle.classList.remove('active');
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !e.target.closest('.header') && !e.target.closest('.mobile-menu-toggle')) {
            isMenuOpen = false;
            header.classList.remove('mobile-open');
            menuToggle.classList.remove('active');
        }
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
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Animate sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    // Animate project cards with delay
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });

    // Animate skills with delay
    document.querySelectorAll('.skills-list li').forEach((skill, index) => {
        skill.classList.add('animate-on-scroll', 'scale-in');
        skill.style.animationDelay = `${index * 0.1}s`;
        observer.observe(skill);
    });

    // Animate timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.classList.add('animate-on-scroll');
        item.style.animationDelay = `${index * 0.3}s`;
        observer.observe(item);
    });
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