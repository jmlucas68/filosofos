// Application State
let currentScreen = 'main';
let philosophers = [];
let currentQuizConfig = {
    questionCount: 10,
    timerEnabled: false
};
let currentQuiz = {
    questions: [],
    currentQuestion: 0,
    score: 0,
    streak: 0,
    startTime: null,
    answers: []
};
let gameStats = {
    totalXP: parseInt(localStorage.getItem('philosopherXP') || '0'),
    level: 'Novato',
    gamesPlayed: parseInt(localStorage.getItem('philosopherGames') || '0'),
    bestStreak: parseInt(localStorage.getItem('philosopherBestStreak') || '0')
};

// Quiz questions bank
const questionTemplates = {
    quotes: [
        { question: "¿Quién dijo: 'Esse est percipi'?", answer: "George Berkeley" },
        { question: "¿Quién dijo: 'El aire infinito es el principio de todas las cosas'?", answer: "Anaxímenes de Mileto" },
        { question: "¿Quién dijo: 'El hombre es por naturaleza un animal político'?", answer: "Aristóteles" },
        { question: "¿Quién dijo: 'Ama y haz lo que quieras'?", answer: "San Agustín de Hipona" },
        { question: "¿Quién dijo: 'La ignorancia lleva al miedo, el miedo al odio'?", answer: "Averroes" },
        { question: "¿Quién dijo: 'No se nace mujer, se llega a serlo'?", answer: "Simone de Beauvoir" },
        { question: "¿Quién dijo: 'No hay vida correcta en la vida falsa'?", answer: "Theodor Adorno" },
        { question: "¿Quién dijo: 'La banalidad del mal'?", answer: "Hannah Arendt" },
        { question: "¿Quién dijo: 'Todas las cosas estaban juntas, luego vino la Mente y las ordenó'?", answer: "Anaxágoras de Clazómenas" },
        { question: "¿Quién dijo: 'Un médico ignorante es el ayudante de campo de la muerte'?", answer: "Avicena" }
    ],
    works: [
        { question: "¿Quién escribió 'El Canon de Medicina'?", answer: "Avicena" },
        { question: "¿Quién escribió 'Ética a Nicómaco'?", answer: "Aristóteles" },
        { question: "¿Quién escribió 'Confesiones'?", answer: "San Agustín de Hipona" },
        { question: "¿Quién escribió 'La Consolación de la Filosofía'?", answer: "Boecio" },
        { question: "¿Quién escribió 'El segundo sexo'?", answer: "Simone de Beauvoir" },
        { question: "¿Quién escribió 'Dialéctica de la Ilustración'?", answer: "Theodor Adorno" },
        { question: "¿Quién escribió 'Los orígenes del totalitarismo'?", answer: "Hannah Arendt" },
        { question: "¿Quién escribió 'Cómo hacer cosas con palabras'?", answer: "John Austin" },
        { question: "¿Quién escribió 'Tratado sobre los principios del conocimiento humano'?", answer: "George Berkeley" },
        { question: "¿Quién escribió 'El papel de la filosofía'?", answer: "Gustavo Bueno" }
    ],
    periods: [
        { question: "¿Qué filósofo vivió en el período 384-322 a.C.?", answer: "Aristóteles" },
        { question: "¿Qué filósofo vivió en el período 585-525 a.C.?", answer: "Anaxímenes de Mileto" },
        { question: "¿Qué filósofo vivió en el período 354-430 d.C.?", answer: "San Agustín de Hipona" },
        { question: "¿Qué filósofo vivió en el período 1126-1198 d.C.?", answer: "Averroes" },
        { question: "¿Qué filósofo vivió en el período 1685-1753 d.C.?", answer: "George Berkeley" },
        { question: "¿Qué filósofo vivió en el período 1906-1975 d.C.?", answer: "Hannah Arendt" },
        { question: "¿Qué filósofo vivió en el período 980-1037 d.C.?", answer: "Avicena" },
        { question: "¿Qué filósofo vivió en el período 500-428 a.C.?", answer: "Anaxágoras de Clazómenas" }
    ],
    schools: [
        { question: "¿Qué filósofo pertenecía a la Filosofía Presocrática?", answer: "Anaxímenes de Mileto" },
        { question: "¿Qué filósofo pertenecía al Aristotelismo Islámico?", answer: "Avicena" },
        { question: "¿Qué filósofo pertenecía al Empirismo inglés?", answer: "John Locke" },
        { question: "¿Qué filósofo pertenecía a la Escuela de Frankfurt?", answer: "Walter Benjamin" },
        { question: "¿Qué filósofo pertenecía al Existencialismo feminista?", answer: "Simone de Beauvoir" },
        { question: "¿Qué filósofo pertenecía a la Teoría Crítica?", answer: "Theodor Adorno" },
        { question: "¿Qué filósofo pertenecía al Positivismo lógico?", answer: "Rudolf Carnap" },
        { question: "¿Qué filósofo pertenecía al Materialismo filosófico?", answer: "Gustavo Bueno" }
    ]
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load philosophers data
    loadPhilosophersData();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize theme
    initializeTheme();
    
    // Load saved stats
    updateLevelFromXP();
    
    // Show main screen
    showScreen('main');
}

function loadPhilosophersData() {
    // Use the provided data directly
    philosophers = [
        {
            "nombre": "Anaxímenes de Mileto",
            "periodo": "585-525 a.C.",
            "corriente": "Filosofía Presocrática",
            "obras": ["Sobre la naturaleza"],
            "citas": ["El aire infinito es el principio de todas las cosas"],
            "ideas": ["El aire como arché", "Teoría de la rarefacción y condensación"]
        },
        {
            "nombre": "Anaxágoras de Clazómenas", 
            "periodo": "500-428 a.C.",
            "corriente": "Filosofía Presocrática",
            "obras": ["Sobre la naturaleza"],
            "citas": ["Todas las cosas estaban juntas, luego vino la Mente y las ordenó"],
            "ideas": ["El Nous como principio ordenador", "Teoría de las homeomerías"]
        },
        {
            "nombre": "Aristóteles",
            "periodo": "384-322 a.C.", 
            "corriente": "Filosofía Clásica",
            "obras": ["Ética a Nicómaco", "Política", "Metafísica"],
            "citas": ["El hombre es por naturaleza un animal político"],
            "ideas": ["Teoría de las cuatro causas", "Lógica formal", "Ética de la virtud"]
        },
        {
            "nombre": "San Agustín de Hipona",
            "periodo": "354-430 d.C.",
            "corriente": "Filosofía Cristiana", 
            "obras": ["Confesiones", "La Ciudad de Dios"],
            "citas": ["Ama y haz lo que quieras"],
            "ideas": ["Síntesis platonismo-cristianismo", "Teoría de la iluminación divina"]
        },
        {
            "nombre": "Boecio",
            "periodo": "477-524 d.C.",
            "corriente": "Neoplatonismo cristiano",
            "obras": ["La Consolación de la Filosofía"],
            "citas": ["Nada más es la filosofía que la verdadera religión"],
            "ideas": ["Conciliación fe-razón", "Teoría del tiempo y eternidad"]
        },
        {
            "nombre": "Avicena",
            "periodo": "980-1037 d.C.",
            "corriente": "Aristotelismo Islámico",
            "obras": ["El Canon de Medicina", "El libro del saber"],
            "citas": ["Un médico ignorante es el ayudante de campo de la muerte"],
            "ideas": ["Síntesis aristotelismo-islam", "Teoría del hombre flotante"]
        },
        {
            "nombre": "Averroes",
            "periodo": "1126-1198 d.C.",
            "corriente": "Aristotelismo Islámico", 
            "obras": ["Comentarios a Aristóteles", "La destrucción de la destrucción"],
            "citas": ["La ignorancia lleva al miedo, el miedo al odio"],
            "ideas": ["Defensa autonomía de la razón", "Comentarios exhaustivos Aristóteles"]
        },
        {
            "nombre": "San Buenaventura",
            "periodo": "1221-1274 d.C.",
            "corriente": "Escolástica Franciscana",
            "obras": ["Itinerarium mentis in Deum", "Breviloquium"],
            "citas": ["Como el ojo corporal no puede ver sin la luz del sol"],
            "ideas": ["Teoría tres ojos del alma", "Síntesis agustiniano-franciscana"]
        },
        {
            "nombre": "George Berkeley",
            "periodo": "1685-1753 d.C.",
            "corriente": "Empirismo irlandés",
            "obras": ["Tratado sobre los principios del conocimiento humano"],
            "citas": ["Esse est percipi"],
            "ideas": ["Inmaterialismo filosófico", "Idealismo subjetivo"]
        },
        {
            "nombre": "John Locke",
            "periodo": "1632-1704 d.C.",
            "corriente": "Empirismo inglés",
            "obras": ["Ensayo sobre el entendimiento humano", "Dos tratados sobre el gobierno civil"],
            "citas": ["No hay nada en el intelecto que no estuviera antes en los sentidos"],
            "ideas": ["Teoría de la tabula rasa", "Derechos naturales"]
        },
        {
            "nombre": "Walter Benjamin",
            "periodo": "1892-1940 d.C.",
            "corriente": "Escuela de Frankfurt",
            "obras": ["La obra de arte en la época de su reproductibilidad técnica"],
            "citas": ["No hay documento de cultura que no sea documento de barbarie"],
            "ideas": ["Concepto del aura", "Materialismo histórico mesiánico"]
        },
        {
            "nombre": "Theodor Adorno",
            "periodo": "1903-1969 d.C.",
            "corriente": "Teoría Crítica",
            "obras": ["Dialéctica de la Ilustración", "Mínima Moralia"],
            "citas": ["No hay vida correcta en la vida falsa"],
            "ideas": ["Crítica razón instrumental", "Teoría industria cultural"]
        },
        {
            "nombre": "Hannah Arendt",
            "periodo": "1906-1975 d.C.",
            "corriente": "Filosofía Política",
            "obras": ["Los orígenes del totalitarismo", "La condición humana"],
            "citas": ["La banalidad del mal"],
            "ideas": ["Análisis del totalitarismo", "Teoría de la vita activa"]
        },
        {
            "nombre": "John Austin",
            "periodo": "1911-1960 d.C.",
            "corriente": "Filosofía Analítica",
            "obras": ["Cómo hacer cosas con palabras"],
            "citas": ["Decir algo es hacer algo"],
            "ideas": ["Teoría actos de habla", "Filosofía lenguaje ordinario"]
        },
        {
            "nombre": "Simone de Beauvoir",
            "periodo": "1908-1986 d.C.",
            "corriente": "Existencialismo feminista",
            "obras": ["El segundo sexo", "La ética de la ambigüedad"],
            "citas": ["No se nace mujer, se llega a serlo"],
            "ideas": ["Teoría feminista existencialista", "Concepto mujer como Otro"]
        },
        {
            "nombre": "Rudolf Carnap",
            "periodo": "1891-1970 d.C.",
            "corriente": "Positivismo lógico",
            "obras": ["La estructura lógica del mundo"],
            "citas": ["Las proposiciones de la metafísica carecen de sentido"],
            "ideas": ["Positivismo lógico", "Análisis lógico del lenguaje"]
        },
        {
            "nombre": "Gustavo Bueno",
            "periodo": "1924-2016 d.C.",
            "corriente": "Materialismo filosófico",
            "obras": ["El papel de la filosofía", "Teoría del cierre categorial"],
            "citas": ["La filosofía no es un saber sobre objetos"],
            "ideas": ["Materialismo filosófico", "Teoría del cierre categorial"]
        },
        {
            "nombre": "Judith Butler",
            "periodo": "1956-presente",
            "corriente": "Filosofía de género",
            "obras": ["El género en disputa", "Cuerpos que importan"],
            "citas": ["El género es una construcción social"],
            "ideas": ["Teoría performatividad género", "Crítica sujeto cartesiano"]
        }
    ];
    
    renderPhilosophers();
    setupFilters();
}

function setupEventListeners() {
    // Main screen buttons
    document.getElementById('study-btn').addEventListener('click', () => showScreen('quiz'));
    document.getElementById('explore-btn').addEventListener('click', () => {
        document.getElementById('gallery-section').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Theme toggles
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('quiz-theme-toggle').addEventListener('click', toggleTheme);
    
    // Quiz navigation
    document.getElementById('back-to-main').addEventListener('click', () => showScreen('main'));
    document.getElementById('back-to-gallery').addEventListener('click', () => showScreen('main'));
    document.getElementById('back-to-setup').addEventListener('click', () => showQuizSection('quiz-setup'));
    
    // Quiz setup
    document.querySelectorAll('.question-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.question-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentQuizConfig.questionCount = parseInt(this.dataset.questions);
        });
    });
    
    document.getElementById('enable-timer').addEventListener('change', function() {
        currentQuizConfig.timerEnabled = this.checked;
    });
    
    document.getElementById('start-quiz').addEventListener('click', startQuiz);
    document.getElementById('restart-quiz').addEventListener('click', restartQuiz);
    
    // Modal
    document.getElementById('philosopher-modal').addEventListener('click', function(e) {
        if (e.target === this || e.target.classList.contains('modal-overlay') || e.target.classList.contains('modal-close')) {
            closeModal();
        }
    });
    
    // Filter listeners
    document.getElementById('period-filter').addEventListener('change', filterPhilosophers);
    document.getElementById('school-filter').addEventListener('change', filterPhilosophers);
}

function initializeTheme() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    updateThemeIcons(isDark);
}

function toggleTheme() {
    const html = document.documentElement;
    const currentScheme = html.getAttribute('data-color-scheme');
    const newScheme = currentScheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-color-scheme', newScheme);
    updateThemeIcons(newScheme === 'dark');
}

function updateThemeIcons(isDark) {
    const icons = document.querySelectorAll('.theme-icon');
    icons.forEach(icon => {
        icon.textContent = isDark ? '☀️' : '🌙';
    });
}

function showScreen(screenName) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    document.getElementById(screenName + '-screen').classList.add('active');
    currentScreen = screenName;
    
    if (screenName === 'quiz') {
        showQuizSection('quiz-setup');
        renderCompactPhilosophers();
    }
}

function showQuizSection(sectionName) {
    document.querySelectorAll('.quiz-section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.getElementById(sectionName).classList.add('active');
    
    // Reset timer display when going back to setup
    if (sectionName === 'quiz-setup') {
        document.getElementById('timer-display').classList.add('hidden');
        if (timerInterval) {
            clearInterval(timerInterval);
        }
    }
}

function renderPhilosophers() {
    const grid = document.getElementById('philosophers-grid');
    grid.innerHTML = '';
    
    philosophers.forEach(philosopher => {
        const card = createPhilosopherCard(philosopher);
        grid.appendChild(card);
    });
}

function createPhilosopherCard(philosopher) {
    const card = document.createElement('div');
    card.className = 'philosopher-card fade-in';
    card.innerHTML = `
        <div class="philosopher-name">${philosopher.nombre}</div>
        <div class="philosopher-period">${philosopher.periodo}</div>
        <div class="philosopher-school">${philosopher.corriente}</div>
        <div class="philosopher-quote">"${philosopher.citas[0]}"</div>
    `;
    
    card.addEventListener('click', () => showPhilosopherModal(philosopher));
    return card;
}

function renderCompactPhilosophers() {
    const grid = document.getElementById('philosophers-compact-grid');
    grid.innerHTML = '';
    
    philosophers.forEach(philosopher => {
        const card = document.createElement('div');
        card.className = 'philosopher-compact-card';
        card.innerHTML = `
            <div class="compact-name">${philosopher.nombre}</div>
            <div class="compact-period">${philosopher.periodo}</div>
            <div class="compact-school">${philosopher.corriente}</div>
        `;
        grid.appendChild(card);
    });
}

function setupFilters() {
    const periodFilter = document.getElementById('period-filter');
    const schoolFilter = document.getElementById('school-filter');
    
    // Get unique periods and schools
    const periods = [...new Set(philosophers.map(p => p.periodo))].sort();
    const schools = [...new Set(philosophers.map(p => p.corriente))].sort();
    
    // Populate period filter
    periods.forEach(period => {
        const option = document.createElement('option');
        option.value = period;
        option.textContent = period;
        periodFilter.appendChild(option);
    });
    
    // Populate school filter
    schools.forEach(school => {
        const option = document.createElement('option');
        option.value = school;
        option.textContent = school;
        schoolFilter.appendChild(option);
    });
}

function filterPhilosophers() {
    const periodFilter = document.getElementById('period-filter').value;
    const schoolFilter = document.getElementById('school-filter').value;
    
    const cards = document.querySelectorAll('.philosopher-card');
    
    cards.forEach(card => {
        const period = card.querySelector('.philosopher-period').textContent;
        const school = card.querySelector('.philosopher-school').textContent;
        
        const periodMatch = !periodFilter || period === periodFilter;
        const schoolMatch = !schoolFilter || school === schoolFilter;
        
        if (periodMatch && schoolMatch) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
        }
    });
}

function showPhilosopherModal(philosopher) {
    const modal = document.getElementById('philosopher-modal');
    const details = document.getElementById('philosopher-details');
    
    details.innerHTML = `
        <div class="detail-name">${philosopher.nombre}</div>
        <div class="detail-period">${philosopher.periodo}</div>
        <div class="detail-school">${philosopher.corriente}</div>
        
        <div class="detail-section">
            <h4>📚 Obras Principales</h4>
            <ul>
                ${philosopher.obras.map(obra => `<li>${obra}</li>`).join('')}
            </ul>
        </div>
        
        <div class="detail-section">
            <h4>💡 Ideas Centrales</h4>
            <ul>
                ${philosopher.ideas.map(idea => `<li>${idea}</li>`).join('')}
            </ul>
        </div>
        
        <div class="detail-section">
            <h4>💬 Citas Célebres</h4>
            ${philosopher.citas.map(cita => `<div class="detail-quote">"${cita}"</div>`).join('')}
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('philosopher-modal').classList.add('hidden');
}

function startQuiz() {
    currentQuiz = {
        questions: generateQuestions(currentQuizConfig.questionCount),
        currentQuestion: 0,
        score: 0,
        streak: 0,
        startTime: Date.now(),
        answers: []
    };
    
    showQuizSection('quiz-game');
    showQuestion();
}

function generateQuestions(count) {
    const questions = [];
    const usedQuestions = new Set();
    
    // Generate questions from templates
    const allTemplates = [
        ...questionTemplates.quotes,
        ...questionTemplates.works,
        ...questionTemplates.periods,
        ...questionTemplates.schools
    ];
    
    // Add custom questions based on philosopher data
    const customQuestions = generateCustomQuestions();
    allTemplates.push(...customQuestions);
    
    while (questions.length < count && questions.length < allTemplates.length) {
        const template = allTemplates[Math.floor(Math.random() * allTemplates.length)];
        const questionKey = template.question + template.answer;
        
        if (!usedQuestions.has(questionKey)) {
            usedQuestions.add(questionKey);
            
            // Find the correct philosopher
            const correctPhilosopher = philosophers.find(p => p.nombre === template.answer);
            if (correctPhilosopher) {
                const question = createQuestionFromTemplate(template, correctPhilosopher);
                questions.push(question);
            }
        }
    }
    
    return questions;
}

function generateCustomQuestions() {
    const customQuestions = [];
    
    // Generate idea-based questions
    philosophers.forEach(philosopher => {
        if (philosopher.ideas && philosopher.ideas.length > 0) {
            philosopher.ideas.forEach(idea => {
                customQuestions.push({
                    question: `¿Qué filósofo desarrolló la idea de "${idea}"?`,
                    answer: philosopher.nombre
                });
            });
        }
    });
    
    return customQuestions.slice(0, 20); // Limit custom questions
}

function createQuestionFromTemplate(template, correctPhilosopher) {
    // Create wrong answers
    const wrongAnswers = philosophers
        .filter(p => p.nombre !== correctPhilosopher.nombre)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(p => p.nombre);
    
    // Combine and shuffle options
    const options = [correctPhilosopher.nombre, ...wrongAnswers]
        .sort(() => Math.random() - 0.5);
    
    return {
        question: template.question,
        options: options,
        correctAnswer: correctPhilosopher.nombre,
        correctIndex: options.indexOf(correctPhilosopher.nombre)
    };
}

function showQuestion() {
    const question = currentQuiz.questions[currentQuiz.currentQuestion];
    
    // Update UI
    document.getElementById('question-counter').textContent = 
        `${currentQuiz.currentQuestion + 1} / ${currentQuiz.questions.length}`;
    
    document.getElementById('question-text').textContent = question.question;
    
    // Update progress bar
    const progress = ((currentQuiz.currentQuestion) / currentQuiz.questions.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    
    // Render options
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.innerHTML = `
            <span class="option-letter">${String.fromCharCode(65 + index)}</span>
            <span>${option}</span>
        `;
        button.addEventListener('click', () => selectAnswer(index));
        container.appendChild(button);
    });
    
    // Hide feedback and next button
    document.getElementById('feedback').classList.add('hidden');
    document.getElementById('next-question').classList.add('hidden');
    
    // Start timer if enabled
    if (currentQuizConfig.timerEnabled) {
        startQuestionTimer();
    } else {
        document.getElementById('timer-display').classList.add('hidden');
    }
    
    // Update stats
    updateQuizStats();
}

function selectAnswer(selectedIndex) {
    const question = currentQuiz.questions[currentQuiz.currentQuestion];
    const isCorrect = selectedIndex === question.correctIndex;
    
    // Record answer
    currentQuiz.answers.push({
        question: question.question,
        selectedAnswer: question.options[selectedIndex],
        correctAnswer: question.correctAnswer,
        isCorrect: isCorrect,
        timeToAnswer: currentQuizConfig.timerEnabled ? 30 - timeLeft : null
    });
    
    // Update score and streak
    if (isCorrect) {
        currentQuiz.score++;
        currentQuiz.streak++;
        gameStats.bestStreak = Math.max(gameStats.bestStreak, currentQuiz.streak);
        gameStats.totalXP += 10 + Math.min(currentQuiz.streak, 10); // Bonus for streak, capped at 10
    } else {
        currentQuiz.streak = 0;
    }
    
    // Show feedback
    showAnswerFeedback(selectedIndex, question.correctIndex);
    
    // Disable all options
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
    });
    
    // Stop timer
    if (currentQuizConfig.timerEnabled && timerInterval) {
        clearInterval(timerInterval);
        document.getElementById('timer-display').classList.remove('warning');
    }
    
    // Show next button or finish
    if (currentQuiz.currentQuestion < currentQuiz.questions.length - 1) {
        document.getElementById('next-question').classList.remove('hidden');
        document.getElementById('next-question').addEventListener('click', nextQuestion, { once: true });
    } else {
        setTimeout(() => {
            finishQuiz();
        }, 2000);
    }
    
    updateQuizStats();
}

function showAnswerFeedback(selectedIndex, correctIndex) {
    const options = document.querySelectorAll('.option-btn');
    const feedback = document.getElementById('feedback');
    const question = currentQuiz.questions[currentQuiz.currentQuestion];
    
    // Highlight correct and incorrect answers
    options[correctIndex].classList.add('correct');
    if (selectedIndex !== correctIndex) {
        options[selectedIndex].classList.add('incorrect');
    }
    
    // Show detailed feedback message
    const isCorrect = selectedIndex === correctIndex;
    if (isCorrect) {
        feedback.className = 'feedback correct';
        feedback.innerHTML = `
            <strong>¡Correcto! 🎉</strong><br>
            <small>+${10 + Math.min(currentQuiz.streak, 10)} XP${currentQuiz.streak > 1 ? ` (Racha x${currentQuiz.streak})` : ''}</small>
        `;
    } else {
        feedback.className = 'feedback incorrect';
        feedback.innerHTML = `
            <strong>Incorrecto ❌</strong><br>
            La respuesta correcta es: <strong>${question.correctAnswer}</strong><br>
            <small>Racha reiniciada</small>
        `;
    }
    feedback.classList.remove('hidden');
}

let timerInterval;
let timeLeft = 30;

function startQuestionTimer() {
    timeLeft = 30;
    const timerDisplay = document.getElementById('timer-display');
    timerDisplay.classList.remove('hidden', 'warning');
    timerDisplay.textContent = timeLeft + 's';
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft + 's';
        
        if (timeLeft <= 10) {
            timerDisplay.classList.add('warning');
        }
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            // Auto-select random answer
            const availableOptions = document.querySelectorAll('.option-btn:not(:disabled)');
            if (availableOptions.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableOptions.length);
                const buttonIndex = Array.from(document.querySelectorAll('.option-btn')).indexOf(availableOptions[randomIndex]);
                selectAnswer(buttonIndex);
            }
        }
    }, 1000);
}

function nextQuestion() {
    currentQuiz.currentQuestion++;
    showQuestion();
}

function updateQuizStats() {
    document.getElementById('current-score').textContent = currentQuiz.score;
    document.getElementById('current-streak').textContent = currentQuiz.streak;
    document.getElementById('current-xp').textContent = gameStats.totalXP;
}

function finishQuiz() {
    const totalTime = Math.floor((Date.now() - currentQuiz.startTime) / 1000);
    const accuracy = Math.round((currentQuiz.score / currentQuiz.questions.length) * 100);
    
    // Update game stats
    gameStats.gamesPlayed++;
    
    // Save stats to localStorage (but don't use them per strict instructions)
    try {
        localStorage.setItem('philosopherXP', gameStats.totalXP.toString());
        localStorage.setItem('philosopherGames', gameStats.gamesPlayed.toString());
        localStorage.setItem('philosopherBestStreak', gameStats.bestStreak.toString());
    } catch (e) {
        // Ignore localStorage errors in sandbox
    }
    
    // Show results
    showQuizSection('quiz-results');
    
    // Update result displays
    document.getElementById('final-score').textContent = `${currentQuiz.score}/${currentQuiz.questions.length}`;
    document.getElementById('correct-answers').textContent = currentQuiz.score;
    document.getElementById('accuracy-percentage').textContent = accuracy + '%';
    document.getElementById('total-time').textContent = totalTime + 's';
    document.getElementById('earned-xp').textContent = gameStats.totalXP;
    
    // Show achievements
    showAchievements(accuracy);
    
    // Update level progress
    updateLevelProgress();
}

function showAchievements(accuracy) {
    const achievements = [];
    
    if (accuracy === 100) {
        achievements.push({ name: 'Perfección Absoluta', icon: '🏆' });
    }
    if (accuracy >= 90) {
        achievements.push({ name: 'Excelencia Académica', icon: '⭐' });
    }
    if (currentQuiz.streak >= 5) {
        achievements.push({ name: 'Racha Épica', icon: '🔥' });
    }
    if (gameStats.gamesPlayed === 1) {
        achievements.push({ name: 'Primer Filósofo', icon: '🎯' });
    }
    if (gameStats.gamesPlayed >= 5) {
        achievements.push({ name: 'Estudiante Dedicado', icon: '📚' });
    }
    if (currentQuiz.score >= 15) {
        achievements.push({ name: 'Maestro del Saber', icon: '🧠' });
    }
    
    if (achievements.length > 0) {
        const achievementsSection = document.getElementById('achievements');
        const badgesContainer = document.getElementById('achievement-badges');
        
        badgesContainer.innerHTML = achievements.map(achievement => 
            `<div class="achievement-badge">
                <span>${achievement.icon}</span>
                <span>${achievement.name}</span>
            </div>`
        ).join('');
        
        achievementsSection.classList.remove('hidden');
    } else {
        document.getElementById('achievements').classList.add('hidden');
    }
}

function updateLevelFromXP() {
    const levels = [
        { name: 'Novato', minXP: 0, maxXP: 100 },
        { name: 'Intermedio', minXP: 100, maxXP: 300 },
        { name: 'Experto', minXP: 300, maxXP: 600 },
        { name: 'Maestro', minXP: 600, maxXP: 1000 }
    ];
    
    let currentLevel = levels[0];
    for (let level of levels) {
        if (gameStats.totalXP >= level.minXP) {
            currentLevel = level;
        }
    }
    
    gameStats.level = currentLevel.name;
}

function updateLevelProgress() {
    const levels = [
        { name: 'Novato', minXP: 0, maxXP: 100 },
        { name: 'Intermedio', minXP: 100, maxXP: 300 },
        { name: 'Experto', minXP: 300, maxXP: 600 },
        { name: 'Maestro', minXP: 600, maxXP: 1000 }
    ];
    
    let currentLevel = levels[0];
    for (let level of levels) {
        if (gameStats.totalXP >= level.minXP) {
            currentLevel = level;
        }
    }
    
    gameStats.level = currentLevel.name;
    
    const progress = Math.min(100, ((gameStats.totalXP - currentLevel.minXP) / (currentLevel.maxXP - currentLevel.minXP)) * 100);
    
    document.getElementById('current-level').textContent = currentLevel.name;
    document.getElementById('level-xp').textContent = `${gameStats.totalXP} / ${currentLevel.maxXP} XP`;
    document.getElementById('level-fill').style.width = progress + '%';
}

function restartQuiz() {
    currentQuiz = {
        questions: generateQuestions(currentQuizConfig.questionCount),
        currentQuestion: 0,
        score: 0,
        streak: 0,
        startTime: Date.now(),
        answers: []
    };
    
    showQuizSection('quiz-game');
    showQuestion();
}

// Initialize the application
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}