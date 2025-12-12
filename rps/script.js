const cards = document.querySelectorAll(".choice-card");
const resultDiv = document.getElementById("result");
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");

let playerScore = 0;
let computerScore = 0;

const choices = ["rock", "paper", "scissors"];

function getComputerChoice() {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function getWinner(player, computer) {
  if (player === computer) return "draw";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "player";
  }
  return "computer";
}

function handleClick(e) {
  const card = e.currentTarget;
  const playerChoice = card.dataset.choice;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);

  if (winner === "player") {
    playerScore++;
    resultDiv.textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. You win!`;
  } else if (winner === "computer") {
    computerScore++;
    resultDiv.textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. You lose.`;
  } else {
    resultDiv.textContent = `You both chose ${playerChoice}. It's a draw.`;
  }

  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

cards.forEach(card => card.addEventListener("click", handleClick));
