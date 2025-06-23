let questions = [], current = 0, score = 0, timer;
let total = 10;
let timePerQuestion = 60;
let isPaused = false;
let remainingTime = timePerQuestion;
let userAnswers = [];

const home = document.getElementById("home-screen");
const quiz = document.getElementById("quiz-screen");
const result = document.getElementById("result-screen");
const reviewList = document.getElementById("review-list");
const reviewBtn = document.getElementById("review-btn");
const playAgainBtn = document.getElementById("play-again");
const pauseBtn = document.getElementById("pause-btn");
const restartBtn = document.getElementById("restart-btn");

document.getElementById("start-btn").onclick = () => {
  total = parseInt(document.getElementById("question-count").value);
  fetch(`/questions?num=${total}`)
    .then(res => res.json())
    .then(data => {
      questions = data;
      current = 0;
      score = 0;
      userAnswers = [];
      isPaused = false;
      pauseBtn.textContent = "Pause";
      switchScreen(quiz);
      showQuestion();
    });
};

function showQuestion() {
  if (current >= questions.length) return showResult();

  const q = questions[current];
  document.getElementById("question-number").textContent = `Question ${current + 1} of ${total}`;
  document.getElementById("question-text").textContent = q.question;

  const choices = document.getElementById("choices");
  choices.innerHTML = '';

  ['A', 'B', 'C', 'D'].forEach(letter => {
    const btn = document.createElement("button");
    btn.textContent = `${letter}: ${q[letter]}`;
    btn.onclick = () => {
      Array.from(choices.children).forEach(b => b.disabled = true);

      userAnswers.push({
        question: q.question,
        correct: q.answer,
        picked: letter
      });

      if (letter === q.answer) score++;
      current++;
      clearInterval(timer);
      setTimeout(showQuestion, 400); 
    };
    choices.appendChild(btn);
  });

  startTimer();
}

function startTimer(start = timePerQuestion) {
  let time = start;
  remainingTime = time;
  const display = document.getElementById("timer");
  display.textContent = `Time: ${time}s`;
  timer = setInterval(() => {
    if (!isPaused) {
      time--;
      remainingTime = time;
      display.textContent = `Time: ${time}s`;
      if (time <= 0) {
        clearInterval(timer);
        current++;
        showQuestion();
      }
    }
  }, 1000);
}

pauseBtn.onclick = () => {
  if (!isPaused) {
    clearInterval(timer);
    pauseBtn.textContent = "Continue";
    isPaused = true;
  } else {
    startTimer(remainingTime);
    pauseBtn.textContent = "Pause";
    isPaused = false;
  }
};

restartBtn.onclick = () => {
  clearInterval(timer);
  current = 0;
  score = 0;
  userAnswers = [];
  isPaused = false;
  pauseBtn.textContent = "Pause";
  switchScreen(home);
};

function showResult() {
  switchScreen(result);
  document.getElementById("score-text").textContent = `You scored ${score} out of ${total}!`;
  reviewBtn.classList.remove("hidden");
  playAgainBtn.classList.remove("hidden");
}

reviewBtn.onclick = () => {
  reviewList.innerHTML = '';
  userAnswers.forEach((q, i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>Q${i + 1}:</strong> ${q.question}</p>
      <p>Your Answer: <span style="color: ${q.picked === q.correct ? 'lightgreen' : 'red'}">${q.picked}</span></p>
      <p>Correct Answer: <span style="color: lightgreen">${q.correct}</span></p>
      <hr>`;
    reviewList.appendChild(div);
  });

  reviewList.classList.remove("hidden");
  reviewBtn.classList.add("hidden");
};

playAgainBtn.onclick = () => {
  reviewList.classList.add("hidden");
  reviewBtn.classList.remove("hidden");
  playAgainBtn.classList.remove("hidden");
  current = 0;
  score = 0;
  userAnswers = [];
  total = 10;
  switchScreen(home);
};

function switchScreen(target) {
  home.classList.add("hidden");
  quiz.classList.add("hidden");
  result.classList.add("hidden");
  target.classList.remove("hidden");
}
