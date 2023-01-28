"use strict";

const targetScore = document.querySelector(".target-score");
const errorTarget = document.querySelector(".error");
const openingScreen = document.querySelector(".opening-screen");
const playerOneArea = document.querySelector(".player1-area");
const playerTwoArea = document.querySelector(".player2-area");
const playerOneScore = document.querySelector(".player1-total");
const playerTwoScore = document.querySelector(".player2-total");
const playerOneCurrent = document.querySelector(".player1-current-score");
const playerTwoCurrent = document.querySelector(".player2-current-score");
const playerOneWinMessage = document.querySelector(".player1-winner");
const playerTwoWinMessage = document.querySelector(".player2-winner");
const dieOne = document.querySelector(".die1");
const dieTwo = document.querySelector(".die2");
const startGame = document.querySelector(".start");
const newGame = document.querySelector(".new-game");
const hold = document.querySelector(".hold");
const roll = document.querySelector(".roll");
const sixGif = document.querySelector(".six-gif");

let diceArray1;
let diceArray2;
let goalPoints;
let gameOver = false;
let oneIsPlaying;
let currentScores = [
  Number(playerOneCurrent.innerText),
  Number(playerTwoCurrent.innerText),
];
let totalScores = [
  Number(playerOneScore.innerText),
  Number(playerTwoScore.innerText),
];

function createDice() {
  let diceArray = Array(6);
  for (let i = 0; i < diceArray.length; i++) {
    const die = document.createElement("img");
    die.src = `/assets/img/dice-${i + 1}.png`;
    diceArray[i] = die;
  }
  return diceArray;
}

function start() {
  errorTarget.classList.add("hide");
  openingScreen.classList.toggle("hide");
  goalPoints = setTargetScore();
  oneIsPlaying = true;
  gameOver = false;
  playerOneArea.classList.add("active");
  playerTwoArea.classList.remove("active");
  playerOneArea.classList.remove("win");
  playerTwoArea.classList.remove("win");
  playerOneWinMessage.classList.add("hide");
  playerTwoWinMessage.classList.add("hide");
  roll.disabled = false;
  hold.disabled = true;
}

function setTargetScore() {
  if (Number(targetScore.value) >= 20 && Number(targetScore.value) <= 1000) {
    return Number(targetScore.value);
  } else {
    errorTarget.classList.remove("hide");
    openingScreen.classList.remove("hide");
  }
}

function rollDice() {
  hold.disabled = false;
  const die1 = Math.floor(Math.random() * 6 + 1);
  const die2 = Math.floor(Math.random() * 6 + 1);
  dieOne.textContent = "";
  dieOne.appendChild(diceArray1[die1 - 1]);
  dieTwo.textContent = "";
  dieTwo.appendChild(diceArray2[die2 - 1]);
  die1 + die2 !== 12 ? updateCurrent(die1 + die2) : rolledDoubleSix();
}

function rolledDoubleSix() {
  resetCurrents();
  changePlayer();
  sixGif.classList.remove("hide");
  setTimeout(() => sixGif.classList.add("hide"), 1000);
}

function updateCurrent(score) {
  if (oneIsPlaying) {
    currentScores[0] += score;
    playerOneCurrent.innerText = currentScores[0];
  } else {
    currentScores[1] += score;
    playerTwoCurrent.innerText = currentScores[1];
  }
}

function holdScore() {
  totalScores[0] += currentScores[0];
  totalScores[1] += currentScores[1];
  playerOneScore.innerText = totalScores[0];
  playerTwoScore.innerText = totalScores[1];
  resetCurrents();
  checkWin(oneIsPlaying);
  gameOver ? disableButtons() : changePlayer();
}

function resetCurrents() {
  currentScores = [0, 0];
  playerOneCurrent.innerText = 0;
  playerTwoCurrent.innerText = 0;
}

function checkWin(whoPressedHold) {
  if (whoPressedHold) {
    if (totalScores[0] === goalPoints) {
      removeActive();
      playerOneArea.classList.toggle("win");
      playerOneWinMessage.classList.toggle("hide");
      gameOver = true;
    }
    if (totalScores[0] > goalPoints) {
      removeActive();
      playerTwoArea.classList.toggle("win");
      playerTwoWinMessage.classList.toggle("hide");
      gameOver = true;
    }
  } else {
    if (totalScores[1] === goalPoints) {
      removeActive();
      playerTwoArea.classList.toggle("win");
      playerTwoWinMessage.classList.toggle("hide");
      gameOver = true;
    }
    if (totalScores[1] > goalPoints) {
      removeActive();
      playerOneArea.classList.toggle("win");
      playerOneWinMessage.classList.toggle("hide");
      gameOver = true;
    }
  }
}
function changePlayer() {
  oneIsPlaying = !oneIsPlaying;
  changeBackground();
  hold.disabled = true;
}

function changeBackground() {
  playerOneArea.classList.toggle("active");
  playerTwoArea.classList.toggle("active");
}

function disableButtons() {
  roll.disabled = true;
  hold.disabled = true;
}

function removeActive() {
  playerOneArea.classList.remove("active");
  playerTwoArea.classList.remove("active");
}

function resetGame() {
  targetScore.value = "";
  openingScreen.classList.toggle("hide");
  resetCurrents();
  resetTotals();
}

function resetTotals() {
  totalScores = [0, 0];
  playerOneScore.innerText = 0;
  playerTwoScore.innerText = 0;
}

diceArray1 = createDice();
diceArray2 = createDice();

startGame.addEventListener("click", start);
roll.addEventListener("click", rollDice);
hold.addEventListener("click", holdScore);
newGame.addEventListener("click", resetGame);
