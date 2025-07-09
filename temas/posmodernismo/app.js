// DOM elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const searchInput = document.getElementById('searchInput');
const sections = document.querySelectorAll('.section');
const navbar = document.querySelector('.navbar');

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation highlighting
function updateActiveNav() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Author card expand/collapse functionality
const expandButtons = document.querySelectorAll('.expand-btn');

expandButtons.forEach(button => {
    button.addEventListener('click', () => {
        const autorCard = button.closest('.autor-card');
        const autorDetails = autorCard.querySelector('.autor-details');
        
        if (autorDetails.classList.contains('expanded')) {
            autorDetails.classList.remove('expanded');
            button.textContent = 'Ver más';
        } else {
            autorDetails.classList.add('expanded');
            button.textContent = 'Ver menos';
        }
    });
});

// Enhanced search functionality with better text matching
function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        clearHighlights();
        showSearchResults(0);
        return;
    }
    
    // Clear previous highlights
    clearHighlights();
    
    // Define search terms and their variations
    const searchTerms = {
        'foucault': ['foucault', 'michel foucault', 'poder', 'vigilar', 'castigar'],
        'derrida': ['derrida', 'jacques derrida', 'deconstrucción', 'deconstruccion', 'gramatología'],
        'lyotard': ['lyotard', 'jean-françois lyotard', 'metarrelatos', 'posmoderna', 'condición'],
        'baudrillard': ['baudrillard', 'jean baudrillard', 'simulacro', 'simulación', 'hiperrealidad'],
        'deleuze': ['deleuze', 'gilles deleuze', 'guattari', 'anti-edipo', 'esquizoanálisis'],
        'vattimo': ['vattimo', 'gianni vattimo', 'pensamiento débil', 'pensamiento debil'],
        'rorty': ['rorty', 'richard rorty', 'pragmatismo'],
        'butler': ['butler', 'judith butler', 'género', 'genero', 'performatividad'],
        'deconstruccion': ['deconstrucción', 'deconstruccion', 'derrida', 'logocentrismo'],
        'metarrelatos': ['metarrelatos', 'metarrelato', 'lyotard', 'grandes narrativas'],
        'poder': ['poder', 'foucault', 'saber', 'vigilar', 'castigar'],
        'simulacro': ['simulacro', 'simulación', 'baudrillard', 'hiperrealidad'],
        'pragmatismo': ['pragmatismo', 'rorty', 'anti-fundacionalista'],
        'performatividad': ['performatividad', 'género', 'genero', 'butler'],
        'logocentrismo': ['logocentrismo', 'deconstrucción', 'derrida', 'logos']
    };
    
    // Find matching terms
    let matchingTerms = [];
    for (const [key, terms] of Object.entries(searchTerms)) {
        if (terms.some(term => term.includes(searchTerm) || searchTerm.includes(term))) {
            matchingTerms = matchingTerms.concat(terms);
        }
    }
    
    // If no specific matches, use the original search term
    if (matchingTerms.length === 0) {
        matchingTerms = [searchTerm];
    }
    
    // Search through all content
    const searchableElements = document.querySelectorAll('.autor-card, .obra-card, .concepto-card, .corriente-card, .critica-card, .intro-card, .timeline-content');
    let results = [];
    
    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        const hasMatch = matchingTerms.some(term => text.includes(term));
        
        if (hasMatch) {
            results.push(element);
            highlightElement(element);
        }
    });
    
    // Scroll to first result if found
    if (results.length > 0) {
        results[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        showSearchResults(results.length);
    } else {
        showSearchResults(0);
    }
}

function clearHighlights() {
    const highlighted = document.querySelectorAll('.search-highlight');
    highlighted.forEach(element => {
        element.classList.remove('search-highlight');
    });
}

function highlightElement(element) {
    element.classList.add('search-highlight');
}

function showSearchResults(count) {
    const existingResultsDiv = document.querySelector('.search-results');
    if (existingResultsDiv) {
        existingResultsDiv.remove();
    }
    
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'search-results';
    resultsDiv.innerHTML = `
        <p>${count > 0 ? `${count} resultado${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}` : 'No se encontraron resultados'}</p>
    `;
    
    const searchContainer = document.querySelector('.search-container');
    searchContainer.appendChild(resultsDiv);
    
    // Remove results after 4 seconds
    setTimeout(() => {
        if (resultsDiv.parentNode) {
            resultsDiv.remove();
        }
    }, 4000);
}

// Search on Enter key
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Clear search on Escape
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        searchInput.value = '';
        clearHighlights();
        const existingResultsDiv = document.querySelector('.search-results');
        if (existingResultsDiv) {
            existingResultsDiv.remove();
        }
    }
});

// Scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.intro-card, .autor-card, .obra-card, .concepto-card, .corriente-card, .critica-card, .enlaces-category, .timeline-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-on-scroll', 'animated');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Timeline hover effects
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05)';
        item.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
        item.style.zIndex = '1';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add floating animation to cards
const cards = document.querySelectorAll('.autor-card, .obra-card, .concepto-card, .corriente-card');

cards.forEach((card, index) => {
    // Add staggered animation delay
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Add hover effect
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 100);
    }
});

// Filter functionality for authors
function filterAuthors(century) {
    const autorCards = document.querySelectorAll('.autor-card');
    
    autorCards.forEach(card => {
        const fechas = card.querySelector('.fechas').textContent;
        const yearMatch = fechas.match(/(\d{4})/);
        
        if (yearMatch) {
            const year = parseInt(yearMatch[1]);
            const authorCentury = Math.floor(year / 100) + 1;
            
            if (century === 'all' || authorCentury === century) {
                card.style.display = 'block';
                card.classList.add('animate-on-scroll', 'animated');
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// Add filter buttons dynamically
function addFilterButtons() {
    const autoresSection = document.querySelector('#autores .container');
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    filterContainer.innerHTML = `
        <div class="filter-buttons">
            <button class="btn btn--outline filter-btn active" data-filter="all">Todos</button>
            <button class="btn btn--outline filter-btn" data-filter="20">Siglo XX</button>
            <button class="btn btn--outline filter-btn" data-filter="21">Siglo XXI</button>
        </div>
    `;
    
    const h2 = autoresSection.querySelector('h2');
    h2.after(filterContainer);
    
    // Add filter button event listeners
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            if (filter === 'all') {
                filterAuthors('all');
            } else {
                filterAuthors(parseInt(filter));
            }
        });
    });
}

// Tooltip functionality
function addTooltips() {
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    
    tooltipTriggers.forEach(trigger => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip-content';
        tooltip.textContent = trigger.dataset.tooltip;
        
        trigger.addEventListener('mouseenter', (e) => {
            document.body.appendChild(tooltip);
            tooltip.style.position = 'absolute';
            tooltip.style.background = 'rgba(0, 0, 0, 0.9)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '8px 12px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '14px';
            tooltip.style.zIndex = '1000';
            tooltip.style.pointerEvents = 'none';
            
            const rect = trigger.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
        });
        
        trigger.addEventListener('mouseleave', () => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        });
    });
}

// Theme toggle functionality
function addThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    
    const navContainer = document.querySelector('.nav-container');
    navContainer.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        themeToggle.innerHTML = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
    });
}

// Back to top button
function addBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Volver arriba');
    
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll', 'animated');
        }
    });
}, observerOptions);

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    animateOnScroll();
    
    // Add filter buttons
    addFilterButtons();
    
    // Add tooltips
    addTooltips();
    
    // Add theme toggle
    addThemeToggle();
    
    // Add back to top button
    addBackToTopButton();
    
    // Initialize active nav
    updateActiveNav();
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.intro-card, .autor-card, .obra-card, .concepto-card, .corriente-card, .critica-card, .enlaces-category, .timeline-item');
    animatableElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add CSS for search highlights and other features
    const style = document.createElement('style');
    style.textContent = `
        .search-highlight {
            background: rgba(33, 128, 141, 0.3);
            border: 2px solid var(--color-primary);
            animation: highlight-pulse 2s ease-in-out infinite;
        }
        
        @keyframes highlight-pulse {
            0%, 100% { box-shadow: 0 0 5px rgba(33, 128, 141, 0.5); }
            50% { box-shadow: 0 0 20px rgba(33, 128, 141, 0.8); }
        }
        
        .search-results {
            margin-top: 1rem;
            padding: 1rem;
            background: rgba(33, 128, 141, 0.1);
            border-radius: 8px;
            color: var(--color-primary);
            text-align: center;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .filter-container {
            margin: 2rem 0;
            text-align: center;
        }
        
        .filter-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .filter-btn.active {
            background: var(--color-primary);
            color: #0a0a0a;
        }
        
        .theme-toggle {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .theme-toggle:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        
        .back-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: var(--color-primary);
            color: #0a0a0a;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            transform: translateY(100px);
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .back-to-top.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .back-to-top:hover {
            background: var(--color-primary-hover);
            transform: translateY(-5px);
        }
        
        .light-theme {
            --color-primary: #1976d2;
            --color-primary-hover: #1565c0;
            background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 50%, #d0d0d0 100%);
            color: #333;
        }
        
        .light-theme .navbar,
        .light-theme .nav-menu {
            background: rgba(255, 255, 255, 0.95);
        }
        
        .light-theme .nav-link {
            color: #333;
        }
        
        @media (max-width: 768px) {
            .filter-buttons {
                flex-direction: column;
                align-items: center;
            }
            
            .back-to-top {
                bottom: 1rem;
                right: 1rem;
                width: 40px;
                height: 40px;
                font-size: 1.2rem;
            }
        }
    `;
    document.head.appendChild(style);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Performance optimization: debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScroll = debounce(() => {
    updateActiveNav();
    animateOnScroll();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Make performSearch available globally
window.performSearch = performSearch;