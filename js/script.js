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

function startQuiz() {
	if (playerName.value === "") {
		alert("Vennligst skriv inn navnet ditt");
	} else {
		gameStart.style.display = "none";
		startTimer();
	}
}

let startTime, endTime;

function startTimer() {
	startTime = new Date();
}

function stopTimer() {
	endTime = new Date();
}

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
	stopTimer();
	questions.forEach((question, questionIndex) => {
		const selectedOption = document.querySelector(`input[name="question${questionIndex}"]:checked`);
		if (selectedOption && selectedOption.value === "true") {
			if (score <= questions.length - 1) {
				score++;
			}
		}
	});

	const timeDiff = endTime - startTime;
	let scoreData = [];
	scoreData.push({ playerName: playerName.value, score: score, time: timeDiff / 1000 });

	if (!localStorage.getItem("scoreData")) {
		localStorage.setItem("scoreData", JSON.stringify(scoreData));
	} else {
		let newScoreDataString = localStorage.getItem("scoreData");
		let newScoreData = JSON.parse(newScoreDataString);
		newScoreData.push({ playerName: playerName.value, score: score, time: timeDiff / 1000 });
		localStorage.setItem("scoreData", JSON.stringify(newScoreData));
	}

	resultContainer.innerHTML = `
      <h2>Resultat:</h2>
      <p>Gratulerer ${playerName.value}!</p>
      <p>Du fikk ${score} av ${questions.length} riktige svar.</p>
      <p>Du brukte ${timeDiff / 1000}!</p>
    `;
	showHighscore();
});

function showHighscore() {
	let scoreDataString = localStorage.getItem("scoreData");
	let scoreData = JSON.parse(scoreDataString);

	let scoreboard = document.getElementById("scoreboard");

	scoreboard.innerHTML = "";
	scoreData.forEach((score) => {
		scoreboard.innerHTML += `
      <p>${score.playerName} - ${score.score} - ${score.time}</p>
    `;
	});
}

showHighscore();
