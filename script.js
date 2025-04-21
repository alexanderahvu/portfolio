// Wait for the DOM to be fully loaded before running any code
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel functionality
    initCarousel();
    
    // Initialize project modal functionality
    initProjectModals();
    
    // Initialize contact form
    initContactForm();
});

/**
 * Initialize carousel functionality with automatic and manual navigation
 */
function initCarousel() {
    const carousel = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentIndex = 0;
    const itemWidth = 100; // percentage
    let autoSlideTimer;

    // Function to update carousel position
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
    }

    // Function to move to the next slide
    function nextSlide() {
        if (currentIndex < items.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }

    // Function to move to the previous slide
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = items.length - 1;
        }
        updateCarousel();
    }

    // Function to reset and start the auto-slide timer
    function resetAutoSlideTimer() {
        // Clear existing timer
        clearInterval(autoSlideTimer);
        
        // Start a new timer
        autoSlideTimer = setInterval(nextSlide, 5000);
    }

    // Initialize the auto-slide timer
    resetAutoSlideTimer();

    // Event listeners for manual navigation
    prevBtn.addEventListener('click', function() {
        prevSlide();
        resetAutoSlideTimer(); // Reset timer when manually navigating
    });

    nextBtn.addEventListener('click', function() {
        nextSlide();
        resetAutoSlideTimer(); // Reset timer when manually navigating
    });
}

/**
 * Initialize project modal functionality
 */
function initProjectModals() {
    const modal = document.getElementById('projectModal');
    const projectItems = document.querySelectorAll('.project-item');
    const closeBtn = document.querySelector('.close-btn');
    const projectDetails = document.getElementById('projectDetails');

    // Open modal and load appropriate content when a project is clicked
    projectItems.forEach(item => {
        item.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            
            // Load appropriate template based on project ID
            const templateId = `${projectId}-template`;
            const template = document.getElementById(templateId);
            
            if (template) {
                projectDetails.innerHTML = template.innerHTML;
                
                // Ensure the role title is properly displayed
                const roleElement = projectDetails.querySelector('.project-role');
                if (roleElement) {
                    // Make sure role is visible and properly styled
                    roleElement.style.display = 'block';
                    roleElement.style.marginTop = '-15px';
                    roleElement.style.marginBottom = '25px';
                }
            } else {
                // Fallback for any projects without explicit templates
                projectDetails.innerHTML = `
                    <h2>${this.querySelector('.project-title').innerText}</h2>
                    <p class="project-role">Team Member</p>
                    <p>Detailed information about this project will be coming soon!</p>
                `;
            }
            
            modal.style.display = 'block';
        });
    });

    // Close modal when close button is clicked
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

/**
 * Initialize contact form functionality
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to a backend
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

/**
 * Animated scroll to top functionality
 */
function initScrollToTop() {
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollTopBtn);

    // Show/hide the button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    // Scroll to top when clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Handle navigation scrolling
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70, // Adjusted for nav height
                behavior: 'smooth'
            });
        });
    });
}