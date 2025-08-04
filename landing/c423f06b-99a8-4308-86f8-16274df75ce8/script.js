// Tendr Event Management Platform - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Tendr website loaded successfully!');
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navigation scroll effect
    const navContainer = document.querySelector('.nav-container');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navContainer.style.background = 'rgba(255, 248, 220, 0.95)';
            navContainer.style.backdropFilter = 'blur(20px)';
        } else {
            navContainer.style.background = '#FFF8DC';
            navContainer.style.backdropFilter = 'blur(20px)';
        }
    });

    // Service cards hover effect enhancement
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 25px 60px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
        });
    });

    // Event cards hover effect enhancement
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 25px 60px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
        });
    });

    // Social media icons hover effect
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.1)';
            this.style.background = 'linear-gradient(145deg, #CD853F, #DEB887)';
            this.style.color = '#FFFFFF';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.background = 'rgba(255, 255, 255, 0.3)';
            this.style.color = '#8B4513';
        });
    });

    // WhatsApp button click tracking
    const whatsappButton = document.querySelector('.whatsapp-icon');
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function() {
            console.log('WhatsApp button clicked');
            // You can add analytics tracking here
        });
    }

    // CTA button click tracking
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            console.log('Booking CTA button clicked');
            // You can add analytics tracking here
        });
    }

    // Corporate button click tracking
    const corporateButton = document.querySelector('.corporate-btn');
    if (corporateButton) {
        corporateButton.addEventListener('click', function() {
            console.log('Corporate events button clicked');
            // You can add analytics tracking here
        });
    }

    // Partner button click tracking
    const partnerButton = document.querySelector('.partner-btn');
    if (partnerButton) {
        partnerButton.addEventListener('click', function() {
            console.log('Partner button clicked');
            // You can add analytics tracking here
        });
    }

    // Sign in button click tracking
    const signInButton = document.querySelector('.sign-in');
    if (signInButton) {
        signInButton.addEventListener('click', function() {
            console.log('Sign in button clicked');
            // You can add authentication logic here
        });
    }

    // Sign up button click tracking
    const signUpButton = document.querySelector('.sign-up');
    if (signUpButton) {
        signUpButton.addEventListener('click', function() {
            console.log('Sign up button clicked');
            // You can add registration logic here
        });
    }

    // Logo click tracking
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            console.log('Logo clicked - navigating to home');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Footer links click tracking
    const footerLinks = document.querySelectorAll('.footer-section a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Footer link clicked:', this.textContent);
            // You can add analytics tracking here
        });
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
        });
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Initialize the page
    console.log('All event listeners attached successfully!');
}); 