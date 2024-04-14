// Description: This file contains the logic for the game play.

function getComputerChoice() {
  // Randomly generate 'Rock', 'Paper', or 'Scissors'.
  var plays = ["Rock", "Paper", "Scissors"];
  return plays[Math.floor(Math.random() * plays.length)];
}

function playRound(playerSelection, computerSelection) {
  // Play a single round of 'Rock', 'Paper', or 'Scissors'.
  var player = playerSelection.toLowerCase();
  var computer = computerSelection.toLowerCase();

  if (player == computer) {
    return { msg: "Tie!", score: 0 };
  } else if (player == "rock") {
    if (computer == "scissors") {
      return { msg: "You win! Rock beats Scissors.", score: 1 };
    } else {
      return { msg: "You lose! Paper beats Rock.", score: -1 };
    }
  } else if (player == "paper") {
    if (computer == "rock") {
      return { msg: "You win! Paper beats Rock.", score: 1 };
    } else {
      return { msg: "You lose! Scissors beats Paper.", score: -1 };
    }
  } else if (player == "scissors") {
    if (computer == "paper") {
      return { msg: "You win! Scissors beats Paper.", score: 1 };
    } else {
      return { msg: "You lose! Rock beats Scissors.", score: -1 };
    }
  } else {
    return "Invalid input! Please enter 'Rock', 'Paper', or 'Scissors'.";
  }
}
const result = document.querySelector("#result");
var total_plays = 0;
var player_scores = { player: 0, computer: 0 };

// Add an event listener to the buttons that calls the playRound function when clicked.
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    clearResults();
    var playerSelection = button.id;
    var computerSelection = getComputerChoice();
    var score = playRound(playerSelection, computerSelection);

    displayResult(playerSelection, computerSelection, score);
    updateScores(score);
    total_plays += 1;

    // Check if the game is over.
    if (total_plays == 5) {
      getScores();
      getWinner();
      zeroScores();
      return;
    }
  });
});

function getScores() {
  const p = document.createElement("p");
  p.textContent = `Player: ${player_scores.player} Computer: ${player_scores.computer}`;
  result.appendChild(p);
}

function displayResult(playerSelection, computerSelection, score) {
  const p = document.createElement("p");
  p.textContent =
    "You selected " +
    playerSelection +
    ". " +
    "Computer selected " +
    computerSelection +
    ". " +
    score.msg;
  result.appendChild(p);
}
function zeroScores() {
  total_plays = 0;
  player_scores = { player: 0, computer: 0 };
}

function updateScores(score) {
  if (score.score == 1) {
    player_scores.player += 1;
  } else if (score.score == -1) {
    player_scores.computer += 1;
  }
}
function getWinner() {
  const winner =
    player_scores.player > player_scores.computer ? "Player" : "Computer";
  const p = document.createElement("p");
  if (winner == "Player") {
    p.textContent = "Game over! You win!";
  } else {
    p.textContent = "Game over! You lose!";
  }
  result.appendChild(p);
}

function clearResults() {
  if (total_plays == 0) {
    while (result.firstChild) {
      result.removeChild(result.firstChild);
    }
  }
}
