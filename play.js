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
  const instruction = document.getElementById("instruction");

  if (player == computer) {
    instruction.textContent = "Tie!";
    return { msg: "Tie!", score: 0 };
  } else if (player == "rock") {
    if (computer == "scissors") {
      instruction.textContent = "Nice!";
      return { msg: "You win!", score: 1 };
    } else {
      instruction.textContent = "Oops. Try again?";
      return { msg: "You lose!", score: -1 };
    }
  } else if (player == "paper") {
    if (computer == "rock") {
      instruction.textContent = "Good one!";
      return { msg: "You win!", score: 1 };
    } else {
      instruction.textContent = ":(. Try again?";
      return { msg: "You lose!", score: -1 };
    }
  } else if (player == "scissors") {
    if (computer == "paper") {
      instruction.textContent = "Woo!";
      return { msg: "You win!", score: 1 };
    } else {
      instruction.textContent = "Rats. Try again?";
      return { msg: "You lose!", score: -1 };
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
    displayComputerChoice(computerSelection);
    displayResult(playerSelection, computerSelection, score);
    updateScores(score);
    total_plays += 1;
  });
});

function getScores() {
  const p = document.createElement("p");
  p.textContent = `Player: ${player_scores.player} Computer: ${player_scores.computer}`;
  result.appendChild(p);
}
function displayComputerChoice(computerSelection) {
  const img = document.createElement("img");
  switch (computerSelection) {
    case "Rock":
      img.src = "assets/rock_white.png";
      break;
    case "Paper":
      img.src = "assets/paper_white.png";
      break;
    case "Scissors":
      img.src = "assets/scissors_white.png";
      break;
  }
  img.setAttribute("id", "computer-choice");
  result.appendChild(img);
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
  const player_score = document.getElementById("player_score");
  const computer_score = document.getElementById("computer_score");

  if (score.score == 1) {
    player_scores.player += 1;
  } else if (score.score == -1) {
    player_scores.computer += 1;
  }
  player_score.textContent = player_scores.player;
  computer_score.textContent = player_scores.computer;
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
  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }
}
