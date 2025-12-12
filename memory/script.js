const grid = document.getElementById("grid");
const movesEl = document.getElementById("moves");

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function setupGame() {
  const symbols = ["A", "B", "C", "D", "E", "F", "G", "H"]; // 8 pairs -> 16 cards
  cards = [...symbols, ...symbols];
  shuffle(cards);

  grid.innerHTML = "";
  cards.forEach((symbol, index) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.dataset.symbol = symbol;
    div.dataset.index = index;
    div.textContent = ""; // hidden initially
    div.addEventListener("click", handleCardClick);
    grid.appendChild(div);
  });

  moves = 0;
  movesEl.textContent = "Moves: 0";
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function handleCardClick(e) {
  const card = e.target;
  if (lockBoard || card.classList.contains("revealed")) return;

  card.classList.add("revealed");
  card.textContent = card.dataset.symbol;

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  moves++;
  movesEl.textContent = `Moves: ${moves}`;

  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

  if (isMatch) {
    firstCard = null;
    secondCard = null;
    checkGameComplete();
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("revealed");
      secondCard.classList.remove("revealed");
      firstCard.textContent = "";
      secondCard.textContent = "";
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    }, 800);
  }
}

function checkGameComplete() {
  const remaining = document.querySelectorAll(".card:not(.revealed)");
  if (remaining.length === 0) {
    setTimeout(() => {
      alert(`You completed the game in ${moves} moves!`);
      setupGame();
    }, 300);
  }
}

setupGame();
