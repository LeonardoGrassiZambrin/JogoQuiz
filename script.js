// Array de objetos com as perguntas
const quizData = [
    {
        question: "Qual o maior planeta do nosso sistema solar?",
        answers: {
            a: "Terra",
            b: "Marte",
            c: "Júpiter",
            d: "Vênus"
        },
        correct: "c"
    },
    {
        question: "Quem pintou a Mona Lisa?",
        answers: {
            a: "Vincent van Gogh",
            b: "Leonardo da Vinci",
            c: "Pablo Picasso",
            d: "Michelangelo"
        },
        correct: "b"
    },
    {
        question: "Qual o maior oceano do mundo?",
        answers: {
            a: "Atlântico",
            b: "Índico",
            c: "Ártico",
            d: "Pacífico"
        },
        correct: "d"
    }
];

// Seleciona os elementos do HTML
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

// Função para carregar a pergunta
function loadQuiz() {
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;

    answersEl.innerHTML = ""; // Limpa as alternativas anteriores
    for (const [key, value] of Object.entries(currentQuizData.answers)) {
        const li = document.createElement("li");
        li.classList.add("answer-item");
        li.setAttribute("data-answer", key);
        li.innerText = value;
        answersEl.appendChild(li);
    }

    // Adiciona o evento de clique a cada alternativa
    const answerItems = document.querySelectorAll(".answer-item");
    answerItems.forEach(item => {
        item.addEventListener("click", () => {
            deselectAnswers();
            item.classList.add("selected");
        });
    });
}

// Função para desmarcar as alternativas
function deselectAnswers() {
    const answerItems = document.querySelectorAll(".answer-item");
    answerItems.forEach(item => {
        item.classList.remove("selected");
    });
}

// Função para obter a resposta selecionada
function getSelected() {
    const selectedAnswer = document.querySelector(".answer-item.selected");
    return selectedAnswer ? selectedAnswer.getAttribute("data-answer") : null;
}

// Evento de clique no botão de enviar
submitBtn.addEventListener("click", () => {
    const answer = getSelected();

    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            // Exibe o resultado final
            const quizContainer = document.querySelector(".quiz-container");
            quizContainer.innerHTML = `
                <h2>Você acertou ${score} de ${quizData.length} perguntas.</h2>
                <button onclick="location.reload()">Recarregar</button>
            `;
        }
    } else {
        alert("Por favor, selecione uma alternativa!");
    }
});

// Inicia o quiz
loadQuiz();