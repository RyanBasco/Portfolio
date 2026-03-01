document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SMOOTH SCROLL LOGIC ---
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // If the link is meant to open the modal, don't scroll
            if (this.getAttribute('href') === '#contact' || this.classList.contains('nav-cta')) {
                return; 
            }

            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                let startTime = null;
                const duration = 1300; 

                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }

                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }
                requestAnimationFrame(animation);
            }
        });
    });

    // --- 2. MODAL LOGIC ---
    const modal = document.getElementById('contactModal');
    const closeBtn = document.getElementById('closeModal');
    const contactButtons = document.querySelectorAll('a[href="#contact"], .nav-cta, a[href="mailto:ryanbasco848@gmail.com"]');

    if (modal) {
        contactButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // --- 3. FORM SUBMISSION LOGIC ---
    const portfolioForm = document.getElementById('portfolioForm');
    if (portfolioForm) {
        portfolioForm.addEventListener('submit', function(e) {
            // If you are using Formspree, remove e.preventDefault()
            // Otherwise, keep it to show a custom success message
            e.preventDefault(); 
            const btn = this.querySelector('.premium-btn span');
            const originalText = btn.textContent;
            
            btn.textContent = "Sending...";
            
            setTimeout(() => {
                alert("Thanks for reaching out! I'll get back to you shortly.");
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                this.reset();
                btn.textContent = originalText;
            }, 1500);
        });
    }
});