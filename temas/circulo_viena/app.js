// Vienna Circle Website - Interactive functionality

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.querySelector('.header');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        }

        lastScrollTop = scrollTop;
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + header.offsetHeight + 50;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Initial call

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all cards and timeline items
    const animatedElements = document.querySelectorAll('.member-card, .timeline__item, .principle-card, .critic-card, .work-card, .video-card');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Quote rotation functionality
    const quotes = document.querySelectorAll('.quote');
    let currentQuoteIndex = 0;

    function rotateQuotes() {
        quotes.forEach((quote, index) => {
            quote.style.opacity = index === currentQuoteIndex ? '1' : '0.7';
            quote.style.transform = index === currentQuoteIndex ? 'scale(1)' : 'scale(0.98)';
        });
        
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    }

    // Start quote rotation
    if (quotes.length > 0) {
        setInterval(rotateQuotes, 5000);
        rotateQuotes(); // Initial call
    }

    // Video lazy loading
    const videoCards = document.querySelectorAll('.video-card');
    const videoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target.querySelector('iframe');
                if (iframe && !iframe.src.includes('embed')) {
                    // Video is already embedded, just add loading animation
                    entry.target.classList.add('video-loaded');
                }
                videoObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    videoCards.forEach(card => {
        videoObserver.observe(card);
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Enhanced card hover effects
    const cards = document.querySelectorAll('.member-card, .critic-card, .work-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Timeline animations
    const timelineItems = document.querySelectorAll('.timeline__item');
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('timeline-visible');
            }
        });
    }, {
        threshold: 0.3
    });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Search functionality for members and works
    function createSearchFunctionality() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <input type="text" id="searchInput" placeholder="Buscar miembros, obras o conceptos..." class="form-control search-input">
            <div id="searchResults" class="search-results hidden"></div>
        `;

        // Add search to the first section
        const firstSection = document.querySelector('.section');
        if (firstSection) {
            firstSection.appendChild(searchContainer);
        }

        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');

        // Create searchable content
        const searchableContent = [
            // Members
            ...Array.from(document.querySelectorAll('.member-card')).map(card => ({
                type: 'member',
                element: card,
                text: card.textContent.toLowerCase(),
                title: card.querySelector('.member-card__name').textContent
            })),
            // Works
            ...Array.from(document.querySelectorAll('.work-card')).map(card => ({
                type: 'work',
                element: card,
                text: card.textContent.toLowerCase(),
                title: card.querySelector('h3').textContent
            })),
            // Principles
            ...Array.from(document.querySelectorAll('.principle-card')).map(card => ({
                type: 'principle',
                element: card,
                text: card.textContent.toLowerCase(),
                title: card.querySelector('h4').textContent
            }))
        ];

        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            if (query.length < 2) {
                searchResults.classList.add('hidden');
                return;
            }

            const matches = searchableContent.filter(item => 
                item.text.includes(query)
            ).slice(0, 5);

            if (matches.length > 0) {
                searchResults.innerHTML = matches.map(match => `
                    <div class="search-result-item" data-type="${match.type}">
                        <strong>${match.title}</strong>
                        <span class="search-result-type">${match.type === 'member' ? 'Miembro' : match.type === 'work' ? 'Obra' : 'Principio'}</span>
                    </div>
                `).join('');
                searchResults.classList.remove('hidden');

                // Add click handlers to search results
                searchResults.querySelectorAll('.search-result-item').forEach((item, index) => {
                    item.addEventListener('click', function() {
                        const match = matches[index];
                        match.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        match.element.classList.add('highlight');
                        setTimeout(() => match.element.classList.remove('highlight'), 2000);
                        searchResults.classList.add('hidden');
                        searchInput.value = '';
                    });
                });
            } else {
                searchResults.innerHTML = '<div class="search-result-item">No se encontraron resultados</div>';
                searchResults.classList.remove('hidden');
            }
        });

        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchContainer.contains(e.target)) {
                searchResults.classList.add('hidden');
            }
        });
    }

    // Initialize search functionality
    createSearchFunctionality();

    // Dark mode toggle (if needed)
    function createDarkModeToggle() {
        const darkModeToggle = document.createElement('button');
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.innerHTML = '🌙';
        darkModeToggle.setAttribute('aria-label', 'Cambiar tema');
        
        document.body.appendChild(darkModeToggle);

        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            this.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
            
            // Save preference
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });

        // Load saved preference
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '☀️';
        }
    }

    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(scrollToTopBtn);

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Initialize tooltips for external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = 'Abre en nueva ventana';
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.top - 30) + 'px';
            
            setTimeout(() => tooltip.remove(), 2000);
        });
    });

    console.log('Vienna Circle website loaded successfully!');
});

// Additional CSS for new JavaScript features
const additionalStyles = `
    .search-container {
        position: relative;
        max-width: 400px;
        margin: 20px auto;
    }

    .search-input {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid var(--color-border);
        border-radius: var(--radius-lg);
        font-size: var(--font-size-base);
        transition: border-color var(--duration-fast);
    }

    .search-input:focus {
        border-color: var(--color-primary);
        outline: none;
    }

    .search-results {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-base);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        max-height: 200px;
        overflow-y: auto;
    }

    .search-result-item {
        padding: 12px 16px;
        cursor: pointer;
        border-bottom: 1px solid var(--color-border);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .search-result-item:hover {
        background: var(--color-secondary);
    }

    .search-result-item:last-child {
        border-bottom: none;
    }

    .search-result-type {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        text-transform: uppercase;
        font-weight: var(--font-weight-medium);
    }

    .highlight {
        animation: highlight 2s ease-in-out;
    }

    @keyframes highlight {
        0%, 100% { background: transparent; }
        50% { background: rgba(var(--color-primary), 0.2); }
    }

    .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--color-primary);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 18px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all var(--duration-normal);
        z-index: 1000;
    }

    .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
    }

    .scroll-to-top:hover {
        background: var(--color-primary-hover);
        transform: translateY(-3px);
    }

    .dark-mode-toggle {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-surface);
        border: 2px solid var(--color-border);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        z-index: 1000;
        transition: all var(--duration-normal);
    }

    .dark-mode-toggle:hover {
        transform: scale(1.1);
    }

    .tooltip {
        position: absolute;
        background: var(--color-text);
        color: var(--color-surface);
        padding: 6px 12px;
        border-radius: var(--radius-base);
        font-size: var(--font-size-sm);
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        animation: fadeIn 0.3s ease-out forwards;
    }

    @keyframes fadeIn {
        to { opacity: 1; }
    }

    .nav__link.active {
        color: var(--color-primary);
        background: var(--color-secondary);
    }

    .timeline-visible {
        animation: slideInFromSide 0.8s ease-out;
    }

    @keyframes slideInFromSide {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }

    .video-loaded {
        animation: fadeIn 0.5s ease-out;
    }

    .hidden {
        display: none !important;
    }

    @media (max-width: 768px) {
        .search-container {
            margin: 20px 16px;
        }
        
        .dark-mode-toggle {
            top: 80px;
            right: 10px;
            width: 40px;
            height: 40px;
            font-size: 16px;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);