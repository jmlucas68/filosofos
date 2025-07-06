document.addEventListener('DOMContentLoaded', () => {
    const quizOption = document.getElementById('quiz-option');
    const optionsSection = document.getElementById('options');
    const quizSection = document.getElementById('quiz-section');

    // Quiz elements
    const startScreen = document.getElementById('start-screen');
    const startBtn = document.getElementById('start-btn');
    const quizContainer = document.getElementById('quiz-container-inner');
    const resultsContainer = document.getElementById('results-container');
    const questionCounterEl = document.getElementById('question-counter');
    const questionTextEl = document.getElementById('question-text');
    const answerOptionsEl = document.getElementById('answer-options');
    const nextBtn = document.getElementById('next-btn');
    const playAgainBtn = document.getElementById('play-again-btn');
    const scoreEl = document.getElementById('score');
    const resultsTextEl = document.getElementById('results-text');

    let filosofosData = [];
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    const TOTAL_QUESTIONS = 10;

    // Function to load philosophers data
    async function loadPhilosophers() {
        try {
            const response = await fetch('filosofos_data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            filosofosData = data.filosofos;
            startBtn.disabled = false;
            startBtn.textContent = 'Comenzar Quiz';
        } catch (error) {
            questionTextEl.textContent = 'Error al cargar los datos. Asegúrate de que filosofos_data.json está en la misma carpeta.';
            console.error("Error fetching data:", error);
        }
    }

    // Function to shuffle array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to generate questions
    function generateQuestions() {
        const questions = [];
        const usedItems = new Set();

        while (questions.length < TOTAL_QUESTIONS) {
            const questionType = ['obras', 'citas', 'ideas'][Math.floor(Math.random() * 3)];

            const elegiblePhilosophers = filosofosData.filter(f => f[questionType] && f[questionType].length > 0);
            if (elegiblePhilosophers.length === 0) continue;

            const correctPhilosopher = elegiblePhilosophers[Math.floor(Math.random() * elegiblePhilosophers.length)];
            const item = correctPhilosopher[questionType][Math.floor(Math.random() * correctPhilosopher[questionType].length)];

            if (usedItems.has(item)) continue;
            usedItems.add(item);

            let questionText = '';
            switch (questionType) {
                case 'obras':
                    questionText = `¿Quién escribió la obra "<em>${item}</em>"?`;
                    break;
                case 'citas':
                    questionText = `¿Quién dijo: "<em>${item}</em>"?`;
                    break;
                case 'ideas':
                    questionText = `¿De quién era la filosofía caracterizada por "<em>${item}</em>"?`;
                    break;
            }

            const otherPhilosophers = filosofosData
                .filter(f => f.nombre !== correctPhilosopher.nombre)
                .map(f => f.nombre);

            const wrongOptions = shuffleArray(otherPhilosophers).slice(0, 3);
            const allOptions = shuffleArray([correctPhilosopher.nombre, ...wrongOptions]);

            questions.push({
                question: questionText,
                options: allOptions,
                answer: correctPhilosopher.nombre
            });
        }
        return questions;
    }

    // Function to start the quiz
    function startQuiz() {
        startScreen.classList.add('hide');
        resultsContainer.classList.add('hide');
        quizContainer.classList.remove('hide');

        score = 0;
        currentQuestionIndex = 0;
        currentQuestions = generateQuestions();
        showQuestion();
    }

    // Function to display a question
    function showQuestion() {
        resetState();
        const question = currentQuestions[currentQuestionIndex];

        questionCounterEl.textContent = `Pregunta ${currentQuestionIndex + 1} de ${TOTAL_QUESTIONS}`;
        questionTextEl.innerHTML = question.question;

        question.options.forEach(option => {
            const button = document.createElement('button');
            button.innerText = option;
            button.classList.add('btn');
            button.addEventListener('click', selectAnswer);
            answerOptionsEl.appendChild(button);
        });
    }

    // Function to reset quiz state
    function resetState() {
        nextBtn.classList.add('hide');
        while (answerOptionsEl.firstChild) {
            answerOptionsEl.removeChild(answerOptionsEl.firstChild);
        }
    }

    // Function to handle answer selection
    function selectAnswer(e) {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.innerText === currentQuestions[currentQuestionIndex].answer;

        if (isCorrect) {
            score++;
            selectedBtn.classList.add('correct');
        } else {
            selectedBtn.classList.add('incorrect');
        }

        Array.from(answerOptionsEl.children).forEach(button => {
            if (button.innerText === currentQuestions[currentQuestionIndex].answer) {
                button.classList.add('correct');
            }
            button.disabled = true;
        });

        nextBtn.classList.remove('hide');
    }

    // Function to show results
    function showResults() {
        quizContainer.classList.add('hide');
        resultsContainer.classList.remove('hide');

        let message = '';
        const percentage = (score / TOTAL_QUESTIONS) * 100;
        if (percentage === 100) message = "¡Perfecto! Eres un verdadero sabio.";
        else if (percentage >= 70) message = "¡Excelente trabajo! Conoces bien a los filósofos.";
        else if (percentage >= 40) message = "No está mal, pero hay que repasar un poco más.";
        else message = "El camino a la sabiduría es largo. ¡Sigue intentándolo!";

        resultsTextEl.textContent = message;
        scoreEl.textContent = `${score} / ${TOTAL_QUESTIONS}`;
    }

    // Function to handle next button click
    function handleNextButton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < TOTAL_QUESTIONS) {
            showQuestion();
        } else {
            showResults();
        }
    }

    // Event Listeners
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', handleNextButton);
    playAgainBtn.addEventListener('click', startQuiz);

    // Initial load
    startBtn.disabled = true;
    startBtn.textContent = 'Cargando datos...';
    loadPhilosophers();

    // Handle quiz option click
    quizOption.addEventListener('click', (e) => {
        e.preventDefault();
        optionsSection.classList.add('hide');
        quizSection.classList.remove('hide');
        // Optionally scroll to quiz section
        quizSection.scrollIntoView({ behavior: 'smooth' });
    });
});