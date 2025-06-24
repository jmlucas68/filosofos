// Quiz de Filosofía - Versión Moderna
class ModernPhilosophyQuiz {
    constructor() {
        this.questions = [
            {
                "question": "¿Quién escribió 'Sobre la naturaleza (fragmentos)'?",
                "options": ["Boecio", "Platón", "Heráclito de Éfeso", "Pitágoras de Samos"],
                "correct_answer": "Heráclito de Éfeso",
                "type": "obra"
            },
            {
                "question": "¿De quién era la filosofía caracterizada por postmodernidad?",
                "options": ["Gianni Vattimo", "Boecio", "Jean-Paul Sartre", "Georg Wilhelm Friedrich Hegel"],
                "correct_answer": "Gianni Vattimo",
                "type": "filosofia"
            },
            {
                "question": "¿Quién escribió 'Dialéctica de la naturaleza'?",
                "options": ["Friedrich Engels", "Anaxímenes de Mileto", "Empédocles de Agrigento", "Gottfried Wilhelm Leibniz"],
                "correct_answer": "Friedrich Engels",
                "type": "obra"
            },
            {
                "question": "¿Quién dijo: 'La tierra flota sobre el agua como un leño'?",
                "options": ["Jean-Jacques Rousseau", "Karl Marx", "Gianni Vattimo", "Tales de Mileto"],
                "correct_answer": "Tales de Mileto",
                "type": "cita"
            },
            {
                "question": "¿Quién dijo: 'La voluntad es superior al intelecto'?",
                "options": ["Juan Duns Escoto", "Karl Marx", "Aristóteles", "Voltaire"],
                "correct_answer": "Juan Duns Escoto",
                "type": "cita"
            },
            {
                "question": "¿De quién era la filosofía caracterizada por síntesis aristotélico-cristiana?",
                "options": ["Santo Tomás de Aquino", "San Agustín", "Averroes", "Avicena"],
                "correct_answer": "Santo Tomás de Aquino",
                "type": "filosofia"
            },
            {
                "question": "¿Quién escribió 'El ser y la nada'?",
                "options": ["Jean-Paul Sartre", "Martin Heidegger", "Edmund Husserl", "Maurice Merleau-Ponty"],
                "correct_answer": "Jean-Paul Sartre",
                "type": "obra"
            },
            {
                "question": "¿De quién era la filosofía caracterizada por dialéctica (tesis-antítesis-síntesis)?",
                "options": ["Georg Wilhelm Friedrich Hegel", "Karl Marx", "Immanuel Kant", "Johann Gottlieb Fichte"],
                "correct_answer": "Georg Wilhelm Friedrich Hegel",
                "type": "filosofia"
            },
            {
                "question": "¿Quién dijo: 'Pienso, luego existo (Cogito ergo sum)'?",
                "options": ["René Descartes", "Immanuel Kant", "David Hume", "John Locke"],
                "correct_answer": "René Descartes",
                "type": "cita"
            },
            {
                "question": "¿De quién era la filosofía caracterizada por voluntad de poder?",
                "options": ["Friedrich Nietzsche", "Arthur Schopenhauer", "Søren Kierkegaard", "Max Stirner"],
                "correct_answer": "Friedrich Nietzsche",
                "type": "filosofia"
            }
        ];
        
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.hasAnswered = false;
        this.selectedAnswer = null;
        
        this.init();
    }

    init() {
        this.shuffleQuestions();
        this.bindEvents();
    }

    shuffleQuestions() {
        // Mezclar las preguntas para variar el orden
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    bindEvents() {
        // Agregar event listeners para teclas de acceso rápido
        document.addEventListener('keydown', (e) => {
            if (this.getCurrentScreen() === 'quizScreen' && !this.hasAnswered) {
                const key = e.key.toLowerCase();
                if (['a', 'b', 'c', 'd'].includes(key)) {
                    const index = key.charCodeAt(0) - 97; // a=0, b=1, c=2, d=3
                    const optionButtons = document.querySelectorAll('.option-button');
                    if (optionButtons[index]) {
                        optionButtons[index].click();
                    }
                }
            }
        });
    }

    getCurrentScreen() {
        const activeScreen = document.querySelector('.screen.active');
        return activeScreen ? activeScreen.id : null;
    }

    showScreen(screenId) {
        // Ocultar todas las pantallas
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Mostrar la pantalla solicitada
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
    }

    startQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.hasAnswered = false;
        this.selectedAnswer = null;
        
        this.showScreen('quizScreen');
        this.displayQuestion();
        this.updateProgressBar();
        this.updateCounters();
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        const questionText = document.getElementById('questionText');
        const optionsContainer = document.getElementById('optionsContainer');
        const feedbackContainer = document.getElementById('feedbackContainer');
        
        // Reset estado
        this.hasAnswered = false;
        this.selectedAnswer = null;
        
        // Actualizar texto de la pregunta
        questionText.textContent = question.question;
        
        // Limpiar opciones anteriores
        optionsContainer.innerHTML = '';
        
        // Crear opciones
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.onclick = () => this.selectAnswer(option, button);
            
            const marker = document.createElement('div');
            marker.className = 'option-marker';
            marker.textContent = String.fromCharCode(65 + index); // A, B, C, D
            
            const text = document.createElement('div');
            text.className = 'option-text';
            text.textContent = option;
            
            button.appendChild(marker);
            button.appendChild(text);
            optionsContainer.appendChild(button);
        });
        
        // Ocultar feedback
        feedbackContainer.classList.add('hidden');
        
        // Actualizar contadores
        this.updateCounters();
        this.updateProgressBar();
        
        // Animación de entrada
        optionsContainer.style.opacity = '0';
        optionsContainer.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            optionsContainer.style.transition = 'all 0.3s ease';
            optionsContainer.style.opacity = '1';
            optionsContainer.style.transform = 'translateY(0)';
        }, 100);
    }

    selectAnswer(selectedOption, buttonElement) {
        if (this.hasAnswered) return;
        
        this.hasAnswered = true;
        this.selectedAnswer = selectedOption;
        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = selectedOption === question.correct_answer;
        
        // Deshabilitar todos los botones
        const allButtons = document.querySelectorAll('.option-button');
        allButtons.forEach(btn => {
            btn.classList.add('disabled');
            const optionText = btn.querySelector('.option-text').textContent;
            
            if (optionText === question.correct_answer) {
                btn.classList.add('correct');
            } else if (btn === buttonElement && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });
        
        // Actualizar puntuación
        if (isCorrect) {
            this.score++;
            this.updateCounters();
        }
        
        // Mostrar feedback después de una pequeña pausa
        setTimeout(() => {
            this.showFeedback(isCorrect, question.correct_answer);
        }, 500);
    }

    showFeedback(isCorrect, correctAnswer) {
        const feedbackContainer = document.getElementById('feedbackContainer');
        const feedbackMessage = document.getElementById('feedbackMessage');
        const nextButton = document.getElementById('nextButton');
        
        feedbackContainer.classList.remove('hidden');
        feedbackMessage.classList.remove('correct', 'incorrect');
        
        if (isCorrect) {
            feedbackMessage.classList.add('correct');
            feedbackMessage.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; gap: 12px; font-size: 20px;">
                    <span style="font-size: 24px;">✅</span>
                    <strong>¡Correcto!</strong>
                    <span style="font-size: 24px;">🎉</span>
                </div>
            `;
        } else {
            feedbackMessage.classList.add('incorrect');
            feedbackMessage.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                    <div style="display: flex; align-items: center; gap: 12px; font-size: 18px;">
                        <span style="font-size: 24px;">❌</span>
                        <strong>Incorrecto</strong>
                    </div>
                    <div style="font-size: 16px; opacity: 0.9;">
                        La respuesta correcta es: <strong>${correctAnswer}</strong>
                    </div>
                </div>
            `;
        }
        
        // Configurar botón siguiente
        if (this.currentQuestionIndex < this.questions.length - 1) {
            nextButton.innerHTML = `
                <span class="button-text">Siguiente Pregunta</span>
                <div class="button-icon">→</div>
            `;
        } else {
            nextButton.innerHTML = `
                <span class="button-text">Ver Resultados</span>
                <div class="button-icon">🏆</div>
            `;
        }
        
        nextButton.classList.remove('hidden');
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        } else {
            this.showResults();
        }
    }

    updateCounters() {
        const questionCounter = document.getElementById('questionCounter');
        const scoreCounter = document.getElementById('scoreCounter');
        
        questionCounter.textContent = `Pregunta ${this.currentQuestionIndex + 1} de ${this.questions.length}`;
        
        const scoreText = scoreCounter.querySelector('.score-text');
        scoreText.textContent = `Aciertos: ${this.score}`;
    }

    updateProgressBar() {
        const progressFill = document.getElementById('progressFill');
        const percentage = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        progressFill.style.width = `${percentage}%`;
    }

    showResults() {
        const finalScore = document.getElementById('finalScore');
        const scorePercentage = document.getElementById('scorePercentage');
        const scoreMessage = document.getElementById('scoreMessage');
        const performanceBadge = document.getElementById('performanceBadge');
        
        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        finalScore.textContent = this.score;
        scorePercentage.textContent = `${percentage}%`;
        
        // Configurar badge y mensaje según el rendimiento
        let badgeClass = '';
        let badgeIcon = '';
        let badgeText = '';
        let message = '';
        
        if (percentage >= 90) {
            badgeClass = 'excellent';
            badgeIcon = '🏆';
            badgeText = 'Excelente';
            message = '¡Extraordinario! Eres un verdadero maestro de la filosofía. Tu profundo conocimiento sobre los grandes pensadores, sus obras y corrientes filosóficas es excepcional. ¡Continúa explorando las profundidades del pensamiento humano!';
        } else if (percentage >= 70) {
            badgeClass = 'good';
            badgeIcon = '⭐';
            badgeText = 'Muy Bien';
            message = '¡Excelente trabajo! Demuestras un sólido conocimiento filosófico. Tu comprensión de los grandes filósofos y sus contribuciones es notable. Sigue profundizando en este fascinante mundo del pensamiento.';
        } else if (percentage >= 50) {
            badgeClass = 'average';
            badgeIcon = '👍';
            badgeText = 'Bien';
            message = '¡Buen esfuerzo! Tienes una base sólida en filosofía, pero hay espacio para crecer. Te animamos a seguir explorando las obras y pensamientos de los grandes filósofos de la historia.';
        } else {
            badgeClass = 'poor';
            badgeIcon = '📚';
            badgeText = 'Sigue Practicando';
            message = '¡No te desanimes! La filosofía es un campo vasto y profundo que requiere tiempo para dominar. Esta es una excelente oportunidad para comenzar o continuar tu viaje de descubrimiento filosófico.';
        }
        
        performanceBadge.className = `performance-badge ${badgeClass}`;
        performanceBadge.innerHTML = `
            <div class="badge-icon">${badgeIcon}</div>
            <div class="badge-text">${badgeText}</div>
        `;
        
        scoreMessage.textContent = message;
        
        // Animación de entrada para los resultados
        this.showScreen('endScreen');
        
        // Animar la puntuación
        this.animateScore();
    }

    animateScore() {
        const scoreNumber = document.getElementById('finalScore');
        const currentScore = parseInt(scoreNumber.textContent);
        let animatedScore = 0;
        
        const increment = currentScore / 20; // 20 frames de animación
        const timer = setInterval(() => {
            animatedScore += increment;
            if (animatedScore >= currentScore) {
                animatedScore = currentScore;
                clearInterval(timer);
            }
            scoreNumber.textContent = Math.round(animatedScore);
        }, 50);
    }

    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.hasAnswered = false;
        this.selectedAnswer = null;
        
        // Mezclar preguntas nuevamente
        this.shuffleQuestions();
        
        // Volver a la pantalla de inicio
        this.showScreen('startScreen');
    }
}

// Instancia global del quiz
let quiz;

// Funciones globales para ser llamadas desde el HTML
function startQuiz() {
    if (quiz) {
        quiz.startQuiz();
    }
}

function nextQuestion() {
    if (quiz) {
        quiz.nextQuestion();
    }
}

function restartQuiz() {
    if (quiz) {
        quiz.restartQuiz();
    }
}

// Inicializar el quiz cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    quiz = new ModernPhilosophyQuiz();
    
    // Agregar efectos de sonido visuales (sin audio real)
    document.addEventListener('click', (e) => {
        if (e.target.matches('.option-button, .start-button, .next-button, .restart-button')) {
            // Efecto de clic visual
            e.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                e.target.style.transform = '';
            }, 150);
        }
    });
    
    // Efecto de partículas en botones importantes (opcional)
    const importantButtons = document.querySelectorAll('.start-button, .restart-button');
    importantButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.4)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.boxShadow = '';
        });
    });
    
    // Precargar animaciones y efectos
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});