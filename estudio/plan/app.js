// Philosophy Study Plan Application
class PhilosophyStudyPlan {
    constructor() {
        this.data = {
            periodos_filosoficos: [
                {
                    periodo: "Filosofía Antigua",
                    epoca: "VI a.C. - VI d.C.",
                    subtemas: ["Presocráticos", "Sócrates", "Platón", "Aristóteles", "Filosofía Helenística", "Neoplatonismo"],
                    textos_fundamentales: [
                        "Apología de Sócrates - Platón",
                        "Ética a Nicómaco - Aristóteles",
                        "República - Platón",
                        "Metafísica - Aristóteles"
                    ],
                    filosofos_clave: ["Tales de Mileto", "Sócrates", "Platón", "Aristóteles", "Epicuro", "Marco Aurelio"],
                    key: "antigua"
                },
                {
                    periodo: "Filosofía Medieval",
                    epoca: "VI - XV",
                    subtemas: ["Patrística", "Escolástica", "Filosofía Islámica", "Filosofía Judía"],
                    textos_fundamentales: [
                        "Confesiones - San Agustín",
                        "Suma Teológica - Tomás de Aquino",
                        "Ciudad de Dios - San Agustín"
                    ],
                    filosofos_clave: ["San Agustín", "Tomás de Aquino", "Anselmo de Canterbury", "Averroes", "Maimónides"],
                    key: "medieval"
                },
                {
                    periodo: "Filosofía Moderna",
                    epoca: "XV - XVIII",
                    subtemas: ["Racionalismo", "Empirismo", "Ilustración", "Idealismo"],
                    textos_fundamentales: [
                        "Discurso del Método - Descartes",
                        "Crítica de la Razón Pura - Kant",
                        "Ensayo sobre el entendimiento humano - Locke",
                        "Ética - Spinoza"
                    ],
                    filosofos_clave: ["Descartes", "Spinoza", "Leibniz", "Locke", "Hume", "Kant"],
                    key: "moderna"
                },
                {
                    periodo: "Filosofía Contemporánea",
                    epoca: "XIX - XXI",
                    subtemas: ["Existencialismo", "Positivismo", "Fenomenología", "Filosofía Analítica"],
                    textos_fundamentales: [
                        "El ser y el tiempo - Heidegger",
                        "El ser y la nada - Sartre",
                        "Más allá del bien y del mal - Nietzsche"
                    ],
                    filosofos_clave: ["Nietzsche", "Heidegger", "Sartre", "Wittgenstein", "Russell", "Foucault"],
                    key: "contemporanea"
                }
            ],
            videos_youtube: [
                {
                    titulo: "¿Qué es la Filosofía? (Primera Parte)",
                    canal: "Unboxing Philosophy",
                    url: "https://www.youtube.com/watch?v=xHmO_wuv278",
                    tema: "Introducción"
                },
                {
                    titulo: "Filosofía antigua | Maratón de documentales completo",
                    canal: "Estamos Filosofando",
                    url: "https://www.youtube.com/watch?v=tlXUGFXUrjY",
                    tema: "Filosofía Antigua"
                },
                {
                    titulo: "Filosofía desde cero - Curso completo",
                    canal: "Filosofía desde cero",
                    url: "https://www.youtube.com/channel/UCSlWcTKYNUbyo5cOtd4Ca9Q",
                    tema: "Curso completo"
                }
            ],
            textos_archive_org: [
                {
                    titulo: "Filosofía helenística: selección de textos",
                    autor: "Salvador Mas Torres",
                    url: "https://archive.org/details/2009FilosofiaHelenisticaSeleccionDeTextos",
                    periodo: "Antigua"
                },
                {
                    titulo: "15 Textos De Los Grandes Filósofos. Edad Contemporánea",
                    autor: "Francisco Canals",
                    url: "https://archive.org/details/15-textos-de-los-grandes-filosofos.-edad-contemporanea-francisco-canals",
                    periodo: "Contemporánea"
                },
                {
                    titulo: "14 Textos De Los Grandes Filósofos. Edad Moderna",
                    autor: "Verneaux",
                    url: "https://archive.org/details/14-textos-de-los-grandes-filosofos.-edad-moderna-verneaux-curso-de-filosofia-tomista",
                    periodo: "Moderna"
                }
            ],
            recursos_visuales: [
                {
                    tipo: "Mapa mental",
                    titulo: "Ramas de la Filosofía",
                    url: "https://view.genially.com/660e375dd00bdd0014e325c0/interactive-content-mapa-mental-ramas-de-la-filosofia",
                    descripcion: "Mapa mental interactivo sobre las principales ramas filosóficas"
                },
                {
                    tipo: "Recursos visuales",
                    titulo: "Filosofía en imágenes",
                    url: "https://www.makma.net/la-filosofia-a-traves-de-metaforas-visuales/",
                    descripcion: "Metáforas visuales para explicar conceptos filosóficos"
                }
            ],
            cursos_online: [
                {
                    titulo: "De Sócrates a Foucault: Una Historia de la Filosofía",
                    institucion: "Instituto Europeo de Artes y Humanidades",
                    url: "https://institutoeuropeodeartesyhumanidades.com/courses/socrates-foucault/",
                    duracion: "140 horas",
                    tipo: "Grabado"
                },
                {
                    titulo: "Curso de filosofía gratis",
                    institucion: "Edutin Academy",
                    url: "https://edutin.com/curso-de-filosofia",
                    duracion: "Variable",
                    tipo: "Gratuito con certificado"
                }
            ],
            metodologia: [
                {
                    fase: "Preparación",
                    actividades: ["Lectura previa", "Contextualización histórica", "Vocabulario filosófico"],
                    tiempo: "1-2 horas"
                },
                {
                    fase: "Estudio",
                    actividades: ["Lectura de textos primarios", "Análisis de conceptos", "Comparación de ideas"],
                    tiempo: "3-4 horas"
                },
                {
                    fase: "Consolidación",
                    actividades: ["Mapas mentales", "Ensayos cortos", "Discusión de ideas"],
                    tiempo: "1-2 horas"
                }
            ],
            cronograma_anual: [
                {
                    trimestre: "Primer Trimestre",
                    meses: ["Septiembre", "Octubre", "Noviembre", "Diciembre"],
                    modulos: ["Introducción y metodología", "Filosofía Antigua I (Presocráticos)", "Filosofía Antigua II (Sócrates y Platón)", "Filosofía Antigua III (Aristóteles)"]
                },
                {
                    trimestre: "Segundo Trimestre",
                    meses: ["Enero", "Febrero", "Marzo"],
                    modulos: ["Filosofía Helenística", "Filosofía Medieval I (Patrística)", "Filosofía Medieval II (Escolástica)"]
                },
                {
                    trimestre: "Tercer Trimestre",
                    meses: ["Abril", "Mayo", "Junio"],
                    modulos: ["Filosofía Moderna I (Racionalismo)", "Filosofía Moderna II (Empirismo e Ilustración)", "Síntesis y evaluación final"]
                },
                {
                    trimestre: "Cuarto Trimestre (Optativo)",
                    meses: ["Julio", "Agosto"],
                    modulos: ["Filosofía Contemporánea", "Investigación personal"]
                }
            ]
        };
        
        this.progress = {
            modules: new Set(),
            texts: new Set(),
            videos: new Set()
        };
        
        this.activeFilter = 'all';
        this.currentTheme = 'light';
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.populateContent();
        this.setupNavigation();
        this.setupSearch();
        this.setupThemeToggle();
        this.setupScrollAnimations();
        this.loadProgress();
    }
    
    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilter(e.target.dataset.filter);
            });
        });
        
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Search input
        document.getElementById('global-search').addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
    }
    
    populateContent() {
        this.populateTimeline();
        this.populatePeriods();
        this.populateVideos();
        this.populateResources();
        this.populateMethodology();
        this.updateProgress();
    }
    
    populateTimeline() {
        const timeline = document.getElementById('timeline');
        timeline.innerHTML = '';
        
        this.data.cronograma_anual.forEach((trimestre, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item fade-in';
            timelineItem.innerHTML = `
                <div class="timeline-icon">
                    <i class="fas fa-calendar-alt"></i>
                </div>
                <div class="timeline-content">
                    <h3 class="timeline-title">${trimestre.trimestre}</h3>
                    <p class="timeline-subtitle">${trimestre.meses.join(', ')}</p>
                    <ul class="timeline-modules">
                        ${trimestre.modulos.map(modulo => `
                            <li>
                                <i class="fas fa-book"></i>
                                ${modulo}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
            timeline.appendChild(timelineItem);
        });
    }
    
    populatePeriods() {
        const periodsGrid = document.getElementById('periods-grid');
        periodsGrid.innerHTML = '';
        
        this.data.periodos_filosoficos.forEach(periodo => {
            const periodCard = document.createElement('div');
            periodCard.className = `period-card fade-in ${periodo.key}`;
            periodCard.innerHTML = `
                <h3 class="period-title">${periodo.periodo}</h3>
                <p class="period-epoch">${periodo.epoca}</p>
                <div class="period-subtemas">
                    <h4>Subtemas:</h4>
                    <div class="subtemas-list">
                        ${periodo.subtemas.map(subtema => `
                            <span class="subtema-tag">${subtema}</span>
                        `).join('')}
                    </div>
                </div>
                <div class="period-textos">
                    <h4>Textos Fundamentales:</h4>
                    <ul class="textos-list">
                        ${periodo.textos_fundamentales.map(texto => `
                            <li>
                                <i class="fas fa-book-open"></i>
                                <span>${texto}</span>
                                <button class="btn btn--sm mark-complete" data-type="text" data-id="${texto}">
                                    <i class="fas fa-check"></i>
                                </button>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="period-filosofos">
                    <h4>Filósofos Clave:</h4>
                    <p>${periodo.filosofos_clave.join(', ')}</p>
                </div>
            `;
            periodsGrid.appendChild(periodCard);
        });
        
        // Add event listeners for completion buttons
        document.querySelectorAll('.mark-complete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.toggleComplete(e.target.closest('button'));
            });
        });
    }
    
    populateVideos() {
        const videosGrid = document.getElementById('videos-grid');
        videosGrid.innerHTML = '';
        
        this.data.videos_youtube.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card fade-in';
            videoCard.innerHTML = `
                <div class="video-thumbnail">
                    <i class="fas fa-play"></i>
                </div>
                <div class="video-content">
                    <h3 class="video-title">${video.titulo}</h3>
                    <p class="video-channel">Canal: ${video.canal}</p>
                    <p class="video-tema">Tema: ${video.tema}</p>
                    <a href="${video.url}" target="_blank" class="video-link">
                        <i class="fas fa-external-link-alt"></i>
                        Ver en YouTube
                    </a>
                    <button class="btn btn--sm mark-complete" data-type="video" data-id="${video.titulo}">
                        <i class="fas fa-check"></i> Visto
                    </button>
                </div>
            `;
            videosGrid.appendChild(videoCard);
        });
        
        // Add event listeners for video completion buttons
        document.querySelectorAll('#videos-grid .mark-complete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.toggleComplete(e.target.closest('button'));
            });
        });
    }
    
    populateResources() {
        // Archive texts
        const archiveTexts = document.getElementById('archive-texts');
        archiveTexts.innerHTML = '';
        
        this.data.textos_archive_org.forEach(texto => {
            const textCard = document.createElement('div');
            textCard.className = 'resource-card fade-in';
            textCard.innerHTML = `
                <h4 class="resource-title">${texto.titulo}</h4>
                <p class="resource-author">Autor: ${texto.autor}</p>
                <p class="resource-period">Período: ${texto.periodo}</p>
                <a href="${texto.url}" target="_blank" class="resource-link">
                    <i class="fas fa-external-link-alt"></i>
                    Ver en Archive.org
                </a>
            `;
            archiveTexts.appendChild(textCard);
        });
        
        // Visual resources
        const visualResources = document.getElementById('visual-resources');
        visualResources.innerHTML = '';
        
        this.data.recursos_visuales.forEach(recurso => {
            const resourceCard = document.createElement('div');
            resourceCard.className = 'resource-card fade-in';
            resourceCard.innerHTML = `
                <h4 class="resource-title">${recurso.titulo}</h4>
                <p class="resource-author">Tipo: ${recurso.tipo}</p>
                <p class="resource-description">${recurso.descripcion}</p>
                <a href="${recurso.url}" target="_blank" class="resource-link">
                    <i class="fas fa-external-link-alt"></i>
                    Ver Recurso
                </a>
            `;
            visualResources.appendChild(resourceCard);
        });
        
        // Online courses
        const onlineCourses = document.getElementById('online-courses');
        onlineCourses.innerHTML = '';
        
        this.data.cursos_online.forEach(curso => {
            const courseCard = document.createElement('div');
            courseCard.className = 'resource-card fade-in';
            courseCard.innerHTML = `
                <h4 class="resource-title">${curso.titulo}</h4>
                <p class="resource-author">Institución: ${curso.institucion}</p>
                <p class="resource-duration">Duración: ${curso.duracion}</p>
                <p class="resource-type">Tipo: ${curso.tipo}</p>
                <a href="${curso.url}" target="_blank" class="resource-link">
                    <i class="fas fa-external-link-alt"></i>
                    Ver Curso
                </a>
            `;
            onlineCourses.appendChild(courseCard);
        });
    }
    
    populateMethodology() {
        const methodologyGrid = document.getElementById('methodology-grid');
        methodologyGrid.innerHTML = '';
        
        this.data.metodologia.forEach(metodologia => {
            const methodCard = document.createElement('div');
            methodCard.className = 'methodology-card fade-in';
            methodCard.innerHTML = `
                <h3 class="methodology-phase">${metodologia.fase}</h3>
                <p class="methodology-time">${metodologia.tiempo}</p>
                <ul class="methodology-activities">
                    ${metodologia.actividades.map(actividad => `
                        <li>
                            <i class="fas fa-check-circle"></i>
                            ${actividad}
                        </li>
                    `).join('')}
                </ul>
            `;
            methodologyGrid.appendChild(methodCard);
        });
    }
    
    setupNavigation() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active navigation
                    document.querySelectorAll('.navbar-nav a').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
        });
        
        // Update active navigation on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('.section');
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;
                const id = section.getAttribute('id');
                
                if (scrollPos >= top && scrollPos < bottom) {
                    document.querySelectorAll('.navbar-nav a').forEach(link => {
                        link.classList.remove('active');
                    });
                    document.querySelector(`a[href="#${id}"]`)?.classList.add('active');
                }
            });
        });
    }
    
    setupSearch() {
        const searchInput = document.getElementById('global-search');
        
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            this.handleSearch(searchTerm);
        });
    }
    
    handleSearch(term) {
        const searchableElements = document.querySelectorAll('.period-card, .video-card, .resource-card');
        
        searchableElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes(term) || term === '') {
                element.style.display = 'block';
                element.classList.remove('hidden');
            } else {
                element.style.display = 'none';
                element.classList.add('hidden');
            }
        });
    }
    
    handleFilter(filter) {
        this.activeFilter = filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        // Filter period cards
        const periodCards = document.querySelectorAll('.period-card');
        periodCards.forEach(card => {
            if (filter === 'all' || card.classList.contains(filter)) {
                card.style.display = 'block';
                card.classList.remove('hidden');
            } else {
                card.style.display = 'none';
                card.classList.add('hidden');
            }
        });
    }
    
    toggleComplete(button) {
        const type = button.dataset.type;
        const id = button.dataset.id;
        
        if (this.progress[type + 's'].has(id)) {
            this.progress[type + 's'].delete(id);
            button.classList.remove('completed');
            button.innerHTML = '<i class="fas fa-check"></i>' + (type === 'video' ? ' Visto' : '');
        } else {
            this.progress[type + 's'].add(id);
            button.classList.add('completed');
            button.innerHTML = '<i class="fas fa-check-circle"></i>' + (type === 'video' ? ' Visto' : ' Completado');
        }
        
        this.updateProgress();
        this.saveProgress();
    }
    
    updateProgress() {
        const totalModules = this.data.cronograma_anual.reduce((sum, trimestre) => sum + trimestre.modulos.length, 0);
        const totalTexts = this.data.periodos_filosoficos.reduce((sum, periodo) => sum + periodo.textos_fundamentales.length, 0);
        const totalVideos = this.data.videos_youtube.length;
        
        const completedModules = this.progress.modules.size;
        const completedTexts = this.progress.texts.size;
        const completedVideos = this.progress.videos.size;
        
        const overallProgress = Math.round(((completedModules + completedTexts + completedVideos) / (totalModules + totalTexts + totalVideos)) * 100);
        
        // Update progress circle
        const progressCircle = document.getElementById('overall-progress');
        const progressPercentage = progressCircle.querySelector('.progress-percentage');
        progressPercentage.textContent = overallProgress + '%';
        
        // Update progress circle visual
        const angle = (overallProgress / 100) * 360;
        progressCircle.style.background = `conic-gradient(var(--color-philosophy-gold) ${angle}deg, var(--color-border) ${angle}deg)`;
        
        // Update stats
        document.getElementById('completed-modules').textContent = completedModules;
        document.getElementById('read-texts').textContent = completedTexts;
        document.getElementById('watched-videos').textContent = completedVideos;
        
        // Update period progress
        this.updatePeriodProgress();
    }
    
    updatePeriodProgress() {
        const periodProgress = document.getElementById('period-progress');
        periodProgress.innerHTML = '';
        
        this.data.periodos_filosoficos.forEach(periodo => {
            const totalTexts = periodo.textos_fundamentales.length;
            const completedTexts = periodo.textos_fundamentales.filter(texto => 
                this.progress.texts.has(texto)
            ).length;
            const progressPercent = totalTexts > 0 ? Math.round((completedTexts / totalTexts) * 100) : 0;
            
            const progressItem = document.createElement('div');
            progressItem.className = 'period-progress-item';
            progressItem.innerHTML = `
                <div class="period-progress-header">
                    <span class="period-progress-name">${periodo.periodo}</span>
                    <span class="period-progress-percent">${progressPercent}%</span>
                </div>
                <div class="period-progress-bar">
                    <div class="period-progress-fill" style="width: ${progressPercent}%"></div>
                </div>
            `;
            periodProgress.appendChild(progressItem);
        });
    }
    
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        this.setTheme(savedTheme);
        
        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
    
    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-color-scheme', theme);
        
        const themeToggle = document.getElementById('theme-toggle');
        const icon = themeToggle.querySelector('i');
        
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        
        localStorage.setItem('theme', theme);
    }
    
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }
    
    saveProgress() {
        const progressData = {
            modules: Array.from(this.progress.modules),
            texts: Array.from(this.progress.texts),
            videos: Array.from(this.progress.videos)
        };
        localStorage.setItem('philosophyProgress', JSON.stringify(progressData));
    }
    
    loadProgress() {
        const savedProgress = localStorage.getItem('philosophyProgress');
        if (savedProgress) {
            const progressData = JSON.parse(savedProgress);
            this.progress.modules = new Set(progressData.modules || []);
            this.progress.texts = new Set(progressData.texts || []);
            this.progress.videos = new Set(progressData.videos || []);
            
            // Update UI to reflect loaded progress
            setTimeout(() => {
                this.progress.texts.forEach(textId => {
                    const button = document.querySelector(`[data-type="text"][data-id="${textId}"]`);
                    if (button) {
                        button.classList.add('completed');
                        button.innerHTML = '<i class="fas fa-check-circle"></i> Completado';
                    }
                });
                
                this.progress.videos.forEach(videoId => {
                    const button = document.querySelector(`[data-type="video"][data-id="${videoId}"]`);
                    if (button) {
                        button.classList.add('completed');
                        button.innerHTML = '<i class="fas fa-check-circle"></i> Visto';
                    }
                });
                
                this.updateProgress();
            }, 500);
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PhilosophyStudyPlan();
});

// Add some additional utility functions
function openExternalLink(url) {
    window.open(url, '_blank');
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === '/') {
        e.preventDefault();
        document.getElementById('global-search').focus();
    }
});

// Add service worker for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}