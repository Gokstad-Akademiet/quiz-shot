const questions = [
	{
		question: "Hva er den primære forlengelsen for JavaScript filer?",
		answers: [
			{ text: ".java", correct: false },
			{ text: ".js", correct: true },
			{ text: ".css", correct: false },
			{ text: ".html", correct: false },
		],
	},

	{
		question: "Hvem oppfant CSS?",
		answers: [
			{ text: "Douglas Crockford", correct: false },
			{ text: "Brendan Eich", correct: false },
			{ text: "John Resig", correct: false },
			{ text: "Tim Berners-Lee", correct: true },
		],
	},
	{
		question: "Hva betyr CSS?",
		answers: [
			{ text: "Cascading Styles System", correct: false },
			{ text: "Cascading Style Sheets", correct: true },
			{ text: "Cascading System Styles", correct: false },
			{ text: "Cascading Sheet Styles", correct: false },
		],
	},
	// Legg til flere spørsmål her
];

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submitButton");
const playerName = document.getElementById("playerName");
const gameStart = document.getElementById("game-start");

let score = 0;

questions.forEach((question, questionIndex) => {
	const questionContainer = document.createElement("div");
	questionContainer.classList.add("question-container");

	questionContainer.innerHTML = `
      <h3>${question.question}</h3>
    `;

	question.answers.forEach((answer, answerIndex) => {
		const answerContainer = document.createElement("div");
		answerContainer.classList.add("answer-box");
		answerContainer.innerHTML = `
        <input type="radio" name="question${questionIndex}" id="question${questionIndex}-answer${answerIndex}" value="${answer.correct}">
        <label for="question${questionIndex}-answer${answerIndex}" >${answer.text}</label>
      `;
		questionContainer.appendChild(answerContainer);
	});

	quizContainer.appendChild(questionContainer);
});

submitButton.addEventListener("click", () => {
	submitButton.disabled = true;
	questions.forEach((question, questionIndex) => {
		const selectedOption = document.querySelector(`input[name="question${questionIndex}"]:checked`);
		if (selectedOption && selectedOption.value === "true") {
			if (score <= questions.length - 1) {
				score++;
			}
		}
	});

	resultContainer.innerHTML = `
      <h2>Resultat:</h2>
      <p>Gratulerer !</p>
      <p>Du fikk ${score} av ${questions.length} riktige svar.</p>
    `;
});
