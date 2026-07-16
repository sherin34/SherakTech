document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Initial check
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if(menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    // Fallback for scroll animations (Intersection Observer)
    // Only apply if CSS animation-timeline is not supported
    if (!CSS.supports('animation-timeline: view()')) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    }

    // Quote Modal Logic
    const quoteBtns = document.querySelectorAll('.get-quote-btn');
    const quoteModal = document.getElementById('quoteModal');
    const closeQuoteModal = document.getElementById('closeQuoteModal');
    const quoteForm = document.getElementById('quoteForm');

    if (quoteModal) {
        // Open modal
        quoteBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                quoteModal.classList.add('active');
            });
        });

        // Close modal
        closeQuoteModal.addEventListener('click', () => {
            quoteModal.classList.remove('active');
        });

        // Close on outside click
        quoteModal.addEventListener('click', (e) => {
            if (e.target === quoteModal) {
                quoteModal.classList.remove('active');
            }
        });

        // Form Submit
        if (quoteForm) {
            quoteForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const name = document.getElementById('q-name').value;
                const phone = document.getElementById('q-phone').value;
                const business = document.getElementById('q-business').value || 'Not provided';
                const service = document.getElementById('q-service').value;
                const budget = document.getElementById('q-budget').value;
                const details = document.getElementById('q-details').value;
                
                const message = `Hi Sheraktech! I would like to get a quote for a project.%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Business Name:* ${business}%0A*Service:* ${service}%0A*Budget:* ${budget}%0A*Project Details:* ${details}`;
                
                // Open WhatsApp
                window.open(`https://wa.me/918921119446?text=${message}`, '_blank');
                
                // Reset and close
                quoteForm.reset();
                quoteModal.classList.remove('active');
            });
        }
    }
});
