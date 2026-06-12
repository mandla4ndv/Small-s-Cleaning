document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. MOBILE MENU ENHANCEMENTS
    // ==========================================
    const burger = document.getElementById('burgerBtn');
    const mMenu = document.getElementById('mobileMenu');

    if (burger && mMenu) {
        // Note: your existing script.js handles toggling 'open' on the mMenu.
        // We only toggle 'active' on the burger here to trigger the cross CSS transformation.
        burger.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents outside click listener from immediately overriding
            burger.classList.toggle('active');
        });

        // Close menu when clicking outside of the menu container or hamburger
        document.addEventListener('click', (e) => {
            if (mMenu.classList.contains('open')) {
                if (!mMenu.contains(e.target) && !burger.contains(e.target)) {
                    mMenu.classList.remove('open');
                    burger.classList.remove('active');
                }
            }
        });

        // Reset burger cross transformation to hamburger when a menu link is clicked
        const menuLinks = mMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
            });
        });
    }


    // ==========================================
    // 2. SCROLL ANIMATIONS (BOTH DIRECTIONS)
    // ==========================================

    // Select all major layout components that should receive the scroll animation
    const animateSelectors = [
        '.section-header',
        '.about-content',
        '.about-visual',
        '.service-card',
        '.value-card',
        '.calc-wrap',
        '.booking-form',
        '.booking-left',
        '.gallery-item',
        '.review-card',
        '.contact-card',
        '.map-embed'
    ];

    const elementsToAnimate = document.querySelectorAll(animateSelectors.join(', '));

    // Dynamically assign base CSS animation classes
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');

        // Add specific directional slides based on the element type
        if (el.classList.contains('about-visual') || el.classList.contains('booking-left')) {
            el.classList.add('slide-left');
        } else if (el.classList.contains('about-content') || el.classList.contains('booking-form')) {
            el.classList.add('slide-right');
        }
    });

    // Intersection Observer settings
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Animation triggers when 15% of the element is visible in the viewport
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element scrolled into view
                entry.target.classList.add('is-visible');
            } else {
                // Element scrolled out of view -> removes class to allow reverse animation 
                // ensuring "animations in both directions" as requested
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    // Apply the observer to all selected elements
    elementsToAnimate.forEach(el => {
        scrollObserver.observe(el);
    });

});