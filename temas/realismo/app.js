// Authors data
const authorsData = [
  {
    name: "Platón",
    dates: "427-347 a.C.",
    contribution: "Realismo platónico y teoría de las Ideas",
    quote: "El mundo sensible es copia del mundo de las Ideas",
    period: "ancient"
  },
  {
    name: "Aristóteles", 
    dates: "384-322 a.C.",
    contribution: "Realismo moderado y teoría hilemórfica",
    quote: "Las formas existen en las cosas materiales",
    period: "ancient"
  },
  {
    name: "Santo Tomás de Aquino",
    dates: "1224-1274",
    contribution: "Realismo cristiano medieval",
    quote: "La filosofía es ciencia de lo real, del ser",
    period: "medieval"
  },
  {
    name: "Bertrand Russell",
    dates: "1872-1970", 
    contribution: "Nuevo realismo y realismo lógico",
    quote: "Los universales existen como objetos independientes",
    period: "modern"
  },
  {
    name: "G.E. Moore",
    dates: "1873-1958",
    contribution: "Realismo del sentido común",
    quote: "Existen objetos materiales independientes de la mente",
    period: "modern"
  },
  {
    name: "Mario Bunge",
    dates: "1919-2020",
    contribution: "Realismo científico bungeano",
    quote: "La ciencia describe aspectos objetivos de la realidad",
    period: "contemporary"
  },
  {
    name: "Roy Bhaskar",
    dates: "1944-2014",
    contribution: "Realismo crítico",
    quote: "La realidad tiene estructura y poderes causales",
    period: "contemporary"
  },
  {
    name: "Graham Harman",
    dates: "1968-",
    contribution: "Realismo especulativo y ontología orientada a objetos",
    quote: "Los objetos existen independientemente de las relaciones",
    period: "contemporary"
  },
  {
    name: "Maurizio Ferraris",
    dates: "1956-",
    contribution: "Nuevo realismo del siglo XXI",
    quote: "La realidad no está socialmente construida",
    period: "contemporary"
  }
];

// DOM elements
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');
const navLinks = document.querySelectorAll('.nav__link');
const authorSearch = document.getElementById('authorSearch');
const periodFilter = document.getElementById('periodFilter');
const authorsGrid = document.getElementById('authorsGrid');
const modal = document.getElementById('authorModal');
const modalClose = document.querySelector('.modal__close');
const modalBackdrop = document.querySelector('.modal__backdrop');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeAuthors();
  initializeModal();
  initializeScrollEffects();
});

// Navigation functionality
function initializeNavigation() {
  // Mobile navigation toggle
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }

  // Smooth scroll navigation
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = 80;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
        }
      }
    });
  });

  // Update active navigation link on scroll
  window.addEventListener('scroll', updateActiveNavLink);
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('.section[id]');
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`a[href="#${sectionId}"]`);
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLink) {
        navLink.classList.add('active');
      }
    }
  });
}

// Initialize authors section
function initializeAuthors() {
  if (!authorsGrid) return;
  
  renderAuthors(authorsData);
  
  // Search functionality
  if (authorSearch) {
    authorSearch.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const filteredAuthors = authorsData.filter(author => 
        author.name.toLowerCase().includes(searchTerm) ||
        author.contribution.toLowerCase().includes(searchTerm)
      );
      renderAuthors(filteredAuthors);
    });
  }
  
  // Filter functionality
  if (periodFilter) {
    periodFilter.addEventListener('change', function() {
      const selectedPeriod = this.value;
      const filteredAuthors = selectedPeriod 
        ? authorsData.filter(author => author.period === selectedPeriod)
        : authorsData;
      renderAuthors(filteredAuthors);
    });
  }
}

// Render authors grid
function renderAuthors(authors) {
  if (!authorsGrid) return;
  
  authorsGrid.innerHTML = authors.map(author => `
    <div class="card author-card" data-author='${JSON.stringify(author)}' tabindex="0">
      <div class="card__body">
        <h3 class="author-card__name">${author.name}</h3>
        <p class="author-card__dates">${author.dates}</p>
        <p class="author-card__contribution">${author.contribution}</p>
      </div>
    </div>
  `).join('');
  
  // Add click event listeners to author cards
  const authorCards = document.querySelectorAll('.author-card');
  authorCards.forEach(card => {
    card.addEventListener('click', function() {
      const authorData = JSON.parse(this.getAttribute('data-author'));
      showAuthorModal(authorData);
    });
    
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const authorData = JSON.parse(this.getAttribute('data-author'));
        showAuthorModal(authorData);
      }
    });
  });
}

// Initialize modal functionality
function initializeModal() {
  if (!modal) return;
  
  // Close modal events
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
  }
  
  // Close modal on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// Show author modal
function showAuthorModal(author) {
  if (!modal) return;
  
  const modalAuthorName = document.getElementById('modalAuthorName');
  const modalAuthorDates = document.getElementById('modalAuthorDates');
  const modalAuthorContribution = document.getElementById('modalAuthorContribution');
  const modalAuthorQuote = document.getElementById('modalAuthorQuote');
  
  if (modalAuthorName) modalAuthorName.textContent = author.name;
  if (modalAuthorDates) modalAuthorDates.textContent = author.dates;
  if (modalAuthorContribution) modalAuthorContribution.textContent = author.contribution;
  if (modalAuthorQuote) modalAuthorQuote.textContent = `"${author.quote}"`;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Focus management
  modalClose.focus();
}

// Close modal
function closeModal() {
  if (!modal) return;
  
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Initialize scroll effects
function initializeScrollEffects() {
  // Navbar background on scroll
  const nav = document.querySelector('.nav');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
  
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
  
  // Observe sections for animations
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Observe cards for staggered animations
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
}

// Utility functions
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

// Add debounced search
if (authorSearch) {
  const debouncedSearch = debounce(function() {
    const searchTerm = authorSearch.value.toLowerCase();
    const filteredAuthors = authorsData.filter(author => 
      author.name.toLowerCase().includes(searchTerm) ||
      author.contribution.toLowerCase().includes(searchTerm)
    );
    renderAuthors(filteredAuthors);
  }, 300);
  
  authorSearch.addEventListener('input', debouncedSearch);
}

// Handle hero actions
document.addEventListener('DOMContentLoaded', function() {
  const heroActions = document.querySelectorAll('.hero__actions .btn');
  
  heroActions.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          const headerHeight = 80;
          const targetPosition = targetSection.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});

// Add keyboard navigation for cards
document.addEventListener('keydown', function(e) {
  if (e.key === 'Tab') {
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  }
});

// Add loading state management
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});

// Add error handling for external links
document.addEventListener('click', function(e) {
  if (e.target.tagName === 'A' && e.target.hasAttribute('target')) {
    const link = e.target;
    link.addEventListener('error', function() {
      console.warn('Failed to load external link:', link.href);
    });
  }
});

// Add smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
  // Polyfill for smooth scrolling
  function smoothScrollTo(target) {
    const targetPosition = target.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let start = null;
    
    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
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
  
  // Override default scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        smoothScrollTo(target);
      }
    });
  });
}

// Add CSS for additional animations
const style = document.createElement('style');
style.textContent = `
  .nav.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: var(--shadow-sm);
  }
  
  .animate-in {
    animation: fadeInUp 0.6s ease-out forwards;
  }
  
  .card {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease-out;
  }
  
  .card.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  .nav__link.active {
    color: var(--color-primary);
    position: relative;
  }
  
  .nav__link.active::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--color-primary);
    border-radius: 1px;
  }
  
  .loaded .hero__title {
    animation: fadeInUp 0.8s ease-out;
  }
  
  .loaded .hero__subtitle {
    animation: fadeInUp 0.8s ease-out 0.2s both;
  }
  
  .loaded .hero__actions {
    animation: fadeInUp 0.8s ease-out 0.4s both;
  }
  
  @media (prefers-reduced-motion: reduce) {
    .card,
    .loaded .hero__title,
    .loaded .hero__subtitle,
    .loaded .hero__actions {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
`;
document.head.appendChild(style);