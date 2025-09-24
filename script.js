const questions = [
    {
        question: "Qual o nome do criador?",
        answers: [
            { text: "Leonardo", correct: false },
            { text: "Leandro", correct: true },
            { text: "David", correct: false },
            { text: "João", correct: false }
        ],
        image: null
    },
    {
        question: "Bicondicional",
        answers: [
            { text: "Bicondicional", correct: true },
            { text: "Conjunção", correct: false },
            { text: "Negação", correct: false },
            { text: "Disjunção", correct: false }
        ],
        image: "https://i.imgur.com/5zW38L8.png"
    },
    {
        question: "RGB",
        answers: [
            { text: "Opção 1", correct: true, image: "https://i.imgur.com/8Qv7B0w.png" },
            { text: "Opção 2", correct: false, image: "https://i.imgur.com/p5k0K3l.png" },
            { text: "Opção 3", correct: false, image: "https://i.imgur.com/z1D6y7z.png" },
            { text: "Opção 4", correct: false, image: "https://i.imgur.com/E8S7gP4.png" }
        ],
        image: null
    },
    {
        question: "3X+4=X+12",
        answers: [
            { text: "4", correct: true },
            { text: "8", correct: false },
            { text: "7", correct: false },
            { text: "5,5", correct: false }
        ],
        image: null
    },
    {
        question: "Numero 9 em Binario",
        answers: [
            { text: "00000101", correct: false },
            { text: "00011001", correct: false },
            { text: "00001001", correct: true },
            { text: "00110010", correct: false }
        ],
        image: null
    },
    {
        question: "Qual é a senha?",
        answers: [
            { text: "152", correct: false },
            { text: "584", correct: false },
            { text: "203", correct: true },
            { text: "201", correct: false }
        ],
        image: "https://i.imgur.com/k2j1x2R.png"
    },
    {
        question: "Pi",
        answers: [
            { text: "3.1415926", correct: true },
            { text: "3.1425927", correct: false },
            { text: "3.1495526", correct: false },
            { text: "3.1515926", correct: false }
        ],
        image: "https://i.imgur.com/9v4J4xT.png"
    },
    {
        question: "1234",
        answers: [
            { text: "3I2II3II4", correct: false },
            { text: "II123II2I3", correct: false },
            { text: "II2II5II2", correct: false },
            { text: "II4236O2O", correct: true }
        ],
        image: "https://i.imgur.com/b9JtW5l.png"
    },
    {
        question: "2 3 5 7 11 13 17",
        answers: [
            { text: "23", correct: false },
            { text: "19", correct: true },
            { text: "20", correct: false },
            { text: "25", correct: false }
        ],
        image: null
    },
    {
        question: "Você gostou do jogo?",
        answers: [
            { text: "!Sim", correct: true },
            { text: "~", correct: false },
            { text: "Negativo", correct: false },
            { text: "Não", correct: false }
        ],
        image: null
    },
];

let currentQuestionIndex = 0;
let score = 0;

const questionTitle = document.getElementById('question-title');
const answerButtonsElement = document.getElementById('answer-buttons');
const questionContainer = document.getElementById('question-container');
const errorContainer = document.getElementById('error-container');
const continueButton = document.getElementById('continue-button');
const giveUpButton = document.getElementById('give-up-button');
const completionContainer = document.getElementById('completion-container');
const creditsButton = document.getElementById('credits-button');
const restartFromEndButton = document.getElementById('restart-from-end-button');
const gameOverContainer = document.getElementById('game-over-container');
const restartFromGameOverButton = document.getElementById('restart-from-gameover-button');
const imageContainer = document.getElementById('image-container');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    hideAllContainers();
    questionContainer.style.display = 'block';
    showQuestion();
}

function hideAllContainers() {
    questionContainer.style.display = 'none';
    errorContainer.style.display = 'none';
    completionContainer.style.display = 'none';
    gameOverContainer.style.display = 'none';
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionTitle.innerText = currentQuestion.question;

    if (currentQuestion.image) {
        const img = document.createElement('img');
        img.src = currentQuestion.image;
        img.alt = currentQuestion.question;
        imageContainer.appendChild(img);
    } else {
        imageContainer.innerHTML = '';
    }

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    imageContainer.innerHTML = '';
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        } else {
            if (button === selectedButton) {
                button.classList.add('wrong');
            }
        }
    });

    Array.from(answerButtonsElement.children).forEach(button => {
        button.removeEventListener('click', selectAnswer);
    });

    if (correct) {
        score++;
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showCompletionScreen();
            }
        }, 1000);
    } else {
        setTimeout(() => {
            showErrorScreen();
        }, 1000);
    }
}

function showErrorScreen() {
    hideAllContainers();
    errorContainer.style.display = 'block';
}

function showCompletionScreen() {
    hideAllContainers();
    completionContainer.style.display = 'block';
}

function showGameOverScreen() {
    hideAllContainers();
    gameOverContainer.style.display = 'block';
}

continueButton.addEventListener('click', () => {
    startQuiz();
});

giveUpButton.addEventListener('click', () => {
    showGameOverScreen();
});

restartFromEndButton.addEventListener('click', startQuiz);
restartFromGameOverButton.addEventListener('click', startQuiz);

creditsButton.addEventListener('click', () => {
    alert("Créditos: A equipe por trás do Logike!");
});

document.addEventListener('DOMContentLoaded', startQuiz);