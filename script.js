// Carousel Logic
const images = [
  "https://i.pinimg.com/736x/07/f7/0f/07f70f45406a7e4e1194fa2123da773d.jpg",
  "https://i.pinimg.com/1200x/58/9e/71/589e718c8571e8db919cfd706fc6d131.jpg",
  "https://i.pinimg.com/736x/d0/3a/6a/d03a6afa0a7eebdfbe9d22e1e6629e85.jpg",
  "https://i.pinimg.com/736x/57/af/54/57af54326f369340a8366c94dcd1bcca.jpg"
];

let currentIndex = 0;
let carouselInterval;

const carouselImage = document.getElementById("carouselImage");
const prevImg = document.getElementById("prevImg");
const nextImg = document.getElementById("nextImg");
const pauseBtn = document.getElementById("pause");
const playBtn = document.getElementById("play");

// Function to update image
function showImage(index) {
  carouselImage.src = images[index];
}

// Next & Prev
nextImg.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
});

prevImg.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
});

// Auto play
function startCarousel() {
  if (carouselInterval) return; // avoid multiple intervals
  carouselInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }, 2000);
}

// Pause
function pauseCarousel() {
  clearInterval(carouselInterval);
  carouselInterval = null;
}

pauseBtn.addEventListener("click", pauseCarousel);
playBtn.addEventListener("click", startCarousel);

// Initialize
showImage(currentIndex);
startCarousel();

// ================= QUIZ LOGIC ================= //
const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Markup Leveler",
      "Hyper Trainer Marking Language",
      "Hyper Text Making Links"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Colorful Style Sheets",
      "Creative Styling System",
      "Cascading Style Sheets",
      "Computer Style System"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    options: [
      "<javascript>",
      "<script>",
      "<js>",
      "<code>"
    ],
    answer: "<script>"
  },
  {
    question: "Which company developed JavaScript?",
    options: [
      "Microsoft",
      "Netscape",
      "Sun Microsystems",
      "Oracle"
    ],
    answer: "Netscape"
  }
];

let currentQuestionIndex = 0;
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const prevBtnQuiz = document.getElementById("prev");
const nextBtnQuiz = document.getElementById("next");
const restartBtn = document.getElementById("restart");

// Load a question
function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  optionsEl.innerHTML = "";

  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");
    button.onclick = () => checkAnswer(button, currentQuestion.answer);
    optionsEl.appendChild(button);
  });

  // Disable prev on first question
  prevBtnQuiz.disabled = currentQuestionIndex === 0;
  // Disable next on last question
  nextBtnQuiz.disabled = currentQuestionIndex === quizData.length - 1;
}

// Check answer
function checkAnswer(selectedBtn, correctAnswer) {
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.disabled = true; // lock all buttons once answered
    if (btn.textContent === correctAnswer) {
      btn.style.backgroundColor = "green";
      btn.style.color = "white";
    }
  });

  if (selectedBtn.textContent !== correctAnswer) {
    selectedBtn.style.backgroundColor = "red";
    selectedBtn.style.color = "white";
  }
}

function checkAnswer(selectedBtn, correctAnswer) {
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.disabled = true; // lock all buttons once answered
    if (btn.textContent === correctAnswer) {
      btn.style.backgroundColor = "green";
      btn.style.color = "white";
    }
  });

  const resultEl = document.getElementById("result");

  if (selectedBtn.textContent === correctAnswer) {
    selectedBtn.style.backgroundColor = "green";
    selectedBtn.style.color = "white";
    resultEl.textContent = "✅ Correct";
    resultEl.style.color = "green";
  } else {
    selectedBtn.style.backgroundColor = "red";
    selectedBtn.style.color = "white";
    resultEl.textContent = "❌ Wrong";
    resultEl.style.color = "red";
  }
}


// Navigation
nextBtnQuiz.addEventListener("click", () => {
  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  }
});

prevBtnQuiz.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
});

restartBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  loadQuestion();
});

// Initialize first question
loadQuestion();

// ===== RANDOM JOKE LOGIC ===== //
const jokeBtn = document.getElementById("getJoke");
const jokeDisplay = document.getElementById("jokeDisplay");

jokeBtn.addEventListener("click", async () => {
  try {
    const response = await fetch("https://official-joke-api.appspot.com/jokes/random");
    const data = await response.json();

    // Combine setup + punchline
    jokeDisplay.textContent = `${data.setup} 😂 ${data.punchline}`;
  } catch (error) {
    jokeDisplay.textContent = "Oops! Couldn't fetch a joke. Try again 🤷‍♂️";
    console.error("Error fetching joke:", error);
  }
});
