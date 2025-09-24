// A base de dados das perguntas
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
        image: "https://i.imgur.com/5zW38L8.png" // Exemplo de imagem para a Tabela Verdade
    },
    {
        question: "RGB",
        answers: [
            { text: "Opção 1", correct: true, image: "https://i.imgur.com/8Qv7B0w.png" }, // Primeira opção de imagem (verde, vermelho, azul)
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
        image: "https://i.imgur.com/k2j1x2R.png" // Exemplo de imagem para a senha
    },
    {
        question: "Pi",
        answers: [
            { text: "3.1415926", correct: true },
            { text: "3.1425927", correct: false },
            { text: "3.1495526", correct: false },
            { text: "3.1515926", correct: false }
        ],
        image: "https://i.imgur.com/9v4J4xT.png" // Exemplo de imagem para o Pi
    },
    {
        question: "1234",
        answers: [
            { text: "3I2II3II4", correct: false },
            { text: "II123II2I3", correct: false },
            { text: "II2II5II2", correct: false },
            { text: "II4236O2O", correct: true }
        ],
        image: "https://i.imgur.com/b9JtW5l.png" // Exemplo de imagem para a sequência
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionTitle = document.getElementById('question-title');
const answerButtonsElement = document.getElementById('answer-buttons');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const scoreText = document.getElementById('score-text');
const restartButton = document.getElementById('restart-button');
const imageContainer = document.getElementById('image-container');

// Inicia o quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    questionContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    showQuestion();
}

// Exibe a próxima pergunta
function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionTitle.innerText = currentQuestion.question;

    // Se houver uma imagem, exibe-a
    if (currentQuestion.image) {
        const img = document.createElement('img');
        img.src = currentQuestion.image;
        img.alt = currentQuestion.question;
        imageContainer.appendChild(img);
    } else {
        imageContainer.innerHTML = ''; // Limpa a imagem anterior, se houver
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

// Limpa os botões e imagens anteriores
function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    imageContainer.innerHTML = '';
}

// Lida com a seleção de uma resposta
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('wrong');
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }
        button.removeEventListener('click', selectAnswer);
    });

    // Passa para a próxima pergunta após um pequeno atraso
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

// Exibe a tela de resultados
function showResults() {
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreText.innerText = `Você acertou ${score} de ${questions.length} perguntas!`;
}

// Reinicia o quiz ao clicar no botão
restartButton.addEventListener('click', startQuiz);

// Inicia o quiz quando a página carrega
document.addEventListener('DOMContentLoaded', startQuiz);