// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-contact-btn');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // Timeline Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // General fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to sections and observe them
    const sections = document.querySelectorAll('section:not(.timeline-section)');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Value cards animation
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Team gallery animation
    const teamImages = document.querySelectorAll('.team-image');
    teamImages.forEach((image, index) => {
        image.style.animationDelay = `${index * 0.2}s`;
        observer.observe(image);
    });

    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Timeline item hover effects
    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        const icon = item.querySelector('.timeline-icon');
        
        if (content && icon) {
            content.addEventListener('mouseenter', function() {
                icon.style.transform = 'translateX(-50%) scale(1.1)';
                icon.style.background = '#b45309';
            });
            
            content.addEventListener('mouseleave', function() {
                icon.style.transform = 'translateX(-50%) scale(1)';
                icon.style.background = '#d97706';
            });
        }
    });

    // Add staggered animation to timeline items
    const staggeredObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
            }
        });
    }, {
        threshold: 0.1
    });

    // Counter animation for timeline years
    function animateCounter(element, target) {
        let current = parseInt(target) - 10;
        const increment = target > current ? 1 : -1;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current;
            if (current === target) {
                clearInterval(timer);
            }
        }, 50);
    }

    // Observe timeline years for counter animation
    const timelineYears = document.querySelectorAll('.timeline-year');
    const yearObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const yearText = entry.target.textContent;
                const year = parseInt(yearText);
                if (!isNaN(year)) {
                    animateCounter(entry.target, year);
                }
                yearObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    timelineYears.forEach(year => {
        yearObserver.observe(year);
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Keyboard navigation for timeline
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            const timelineItems = Array.from(document.querySelectorAll('.timeline-item'));
            const currentIndex = timelineItems.findIndex(item => 
                item.getBoundingClientRect().top > 0 && 
                item.getBoundingClientRect().top < window.innerHeight / 2
            );
            
            let nextIndex;
            if (e.key === 'ArrowDown') {
                nextIndex = Math.min(currentIndex + 1, timelineItems.length - 1);
            } else {
                nextIndex = Math.max(currentIndex - 1, 0);
            }
            
            if (timelineItems[nextIndex]) {
                timelineItems[nextIndex].scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        }
    });
});

// Add CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    body.loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .timeline-item.visible {
        animation: slideInTimeline 0.6s ease forwards;
    }
    
    @keyframes slideInTimeline {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .value-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .value-card.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .team-image {
        opacity: 0;
        transform: scale(0.9);
        transition: all 0.6s ease;
    }
    
    .team-image.visible {
        opacity: 1;
        transform: scale(1);
    }
`;
document.head.appendChild(style);