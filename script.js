window.addEventListener("DOMContentLoaded", () => {
  const products = [
    "Images/Chips.jpg", "Images/Water1.jpg", "Images/Water2.jpg",
    "Images/Coca.jpg", "Images/Fanta.jpg", "Images/Sprite.jpg",
    "Images/Coffee.jpg", "Images/Cup.jpg", "Images/Straw1.jpg",
    "Images/Straw2.jpg", "Images/Bag.jpg", "Images/Juice.jpg",
    "Images/Milk.jpg", "Images/Ketchup.jpg"
  ];

  const introScreen = document.getElementById("intro-screen");
  const enterBtn = document.getElementById("enter-btn");

  const startScreen  = document.getElementById("start-screen");
  const startBtn     = document.getElementById("start-btn");
  const gridGame     = document.getElementById("grid-game");
  const timerDisplay = document.getElementById("timer");

  const resultScreen = document.getElementById("result-screen");
  const message      = document.getElementById("message");
  const tryAgainBtn  = document.getElementById("try-again-btn");

  const popup = document.getElementById("popup");
  const closePopup = document.getElementById("close-popup");

  const TOTAL_CELLS = 225;
  let timeLeft = 30;
  let score = 0;
  let gameEnded = false;
  let timerId = null;

  function preloadImages(urls) {
    urls.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }
  preloadImages(products);

  function createGrid(clickable = false) {
    gridGame.innerHTML = "";
    for (let i = 0; i < TOTAL_CELLS; i++) {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.style.backgroundImage = `url(${randomProduct})`;

      if (clickable) {
        cell.addEventListener("click", () => {
          if (!cell.classList.contains("clicked") && !gameEnded) {
            cell.classList.add("clicked");
            score++;
          }
        });
      }

      gridGame.appendChild(cell);
    }
  }

  function startTimer() {
    timerDisplay.textContent = timeLeft;
    timerId = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerId);
        endGame();
      }
    }, 1000);
  }

  function endGame() {
    gameEnded = true;
    startScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    let resultText = "";
    if (score === 0) {
      resultText = "Lucky day for the Earth! You couldn’t kill any pixels of our planet today. But don’t worry — plenty of champions are out there, producing more plastic waste for you.";
    } else if (score === 1) {
      resultText = `You killed only ${score} pixel of our planet. If you want to kill more, just use more plastic! More, more, more!`;
    } else if (score < 15) {
      resultText = `You killed only ${score} pixels of our planet. If you want to kill more, just use more plastic! More, more, more!`;
    } else if (score <= 30) {
      resultText = `You killed ${score} pixels of our planet. Not bad for 30 seconds — but imagine what a lifetime of plastic use can do.`;
    } else if (score <= 40) {
      resultText = `A pro player! You just killed ${score} pixels of our planet. Keep up that plastic use and aim for the championship!`;
    } else {
      resultText = `Wow! You managed to kill ${score} pixels of our planet with your plastic waste. A true plastic champion — Earth won’t survive many like you.`;
    }

    message.textContent = resultText;
  }

  createGrid(false);

  enterBtn.addEventListener("click", () => {
    introScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
  });

  startBtn.addEventListener("click", () => {
    timeLeft = 30;
    score = 0;
    gameEnded = false;

    createGrid(true);
    startTimer();
  });

  tryAgainBtn.addEventListener("click", () => {
    popup.classList.remove("hidden");
  });

  closePopup.addEventListener("click", () => {
    popup.classList.add("hidden");
  });
});
