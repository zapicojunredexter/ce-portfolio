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

    // Initialize masonry gallery
    initMasonryGallery();
    
    // Initialize sidebar context awareness
    initSidebarContext();
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
                const headerOffset = 0; // Remove offset to fix spacing issue
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
    let isAutoSliding = true;
    let autoSlideDirection = 1; // 1 for right, -1 for left
    let currentPosition = 50; // Start at middle
    let autoSlideInterval;
    
    // Auto slide animation
    function startAutoSlide() {
        if (!autoSlideInterval) {
            autoSlideInterval = setInterval(() => {
                if (isAutoSliding) {
                    // Update position
                    currentPosition += autoSlideDirection * 0.125; // Speed of animation (medium-slow)
                    
                    // Change direction when reaching edges
                    if (currentPosition >= 100) {
                        currentPosition = 100;
                        autoSlideDirection = -1;
                    } else if (currentPosition <= 0) {
                        currentPosition = 0;
                        autoSlideDirection = 1;
                    }
                    
                    // Update slider position
                    updateSliderPosition(currentPosition);
                }
            }, 16); // ~60fps
        }
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }
    
    function updateSliderPosition(position) {
        position = Math.max(0, Math.min(100, position));
        afterImage.style.clipPath = `polygon(${position}% 0, 100% 0, 100% 100%, ${position}% 100%)`;
        sliderHandle.style.left = `${position}%`;
    }
    
    // Handle mouse/touch events
    slider.addEventListener('mousedown', startSliding);
    slider.addEventListener('touchstart', startSliding);
    
    function startSliding(e) {
        isResizing = true;
        isAutoSliding = false; // Stop auto sliding when user interacts
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
        currentPosition = (x / sliderRect.width) * 100;
        
        // Update slider position
        updateSliderPosition(currentPosition);
    }
    
    function stopSliding() {
        isResizing = false;
        slider.classList.remove('active');
        
        // Wait a bit before resuming auto slide
        setTimeout(() => {
            isAutoSliding = true;
        }, 2000);
        
        // Remove event listeners
        document.removeEventListener('mousemove', slide);
        document.removeEventListener('touchmove', slide);
        document.removeEventListener('mouseup', stopSliding);
        document.removeEventListener('touchend', stopSliding);
    }
    
    // Start auto sliding
    startAutoSlide();
    
    // Pause auto sliding when user hovers over the slider
    slider.addEventListener('mouseenter', () => {
        isAutoSliding = false;
    });
    
    // Resume auto sliding when user leaves the slider
    slider.addEventListener('mouseleave', () => {
        if (!isResizing) {
            setTimeout(() => {
                isAutoSliding = true;
            }, 1000);
        }
    });
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
// Masonry Gallery
function initMasonryGallery() {
    const masonryGrid = document.querySelector('.masonry-grid');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-nav.prev');
    const nextBtn = document.querySelector('.modal-nav.next');
    
    let currentImageIndex = 0;
    const images = [];
    
    // Generate array of image paths
    for (let i = 1; i <= 19; i++) {
        images.push(`image${i}.png`);
    }
    images.push('image.png'); // Add the last image
    
    // Create and append image elements
    images.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'masonry-item';
        
        const img = document.createElement('img');
        img.src = `media/images/masonry/${image}`;
        img.alt = `Construction Project ${index + 1}`;
        img.loading = 'lazy';
        
        // Add click event for modal
        item.addEventListener('click', () => {
            openModal(index);
        });
        
        item.appendChild(img);
        masonryGrid.appendChild(item);
    });
    
    // Modal functions
    function openModal(index) {
        currentImageIndex = index;
        modalImg.src = `media/images/masonry/${images[index]}`;
        modalImg.alt = `Construction Project ${index + 1}`;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        modalImg.src = `media/images/masonry/${images[currentImageIndex]}`;
        modalImg.alt = `Construction Project ${currentImageIndex + 1}`;
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        modalImg.src = `media/images/masonry/${images[currentImageIndex]}`;
        modalImg.alt = `Construction Project ${currentImageIndex + 1}`;
    }
    
    // Event listeners
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Close modal when clicking anywhere outside the image
    modal.addEventListener('click', (e) => {
        console.log('Modal clicked, target:', e.target);
        // Close if clicking on the modal itself or backdrop, but not on content
        if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
            console.log('Closing modal via backdrop click');
            closeModal();
        }
    });
    
    // Prevent clicks on modal content from closing the modal
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', (e) => {
            console.log('Modal content clicked, preventing close');
            e.stopPropagation();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        switch (e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });
}

// Sidebar Context Awareness
function initSidebarContext() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    
    // Remove active class from all links
    function clearActiveLinks() {
        navLinks.forEach(link => link.classList.remove('active'));
    }
    
    // Add active class to current section link
    function setActiveLink(sectionId) {
        clearActiveLinks();
        const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    // Check which section is in view
    function updateActiveSection() {
        const scrollPosition = window.scrollY + 50; // Reduced offset for better detection
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                setActiveLink(sectionId);
            }
        });
    }
    
    // Initial check
    updateActiveSection();
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveSection);
    
    // Update on click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetId = link.getAttribute('href').substring(1);
            setActiveLink(targetId);
        });
    });
}

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