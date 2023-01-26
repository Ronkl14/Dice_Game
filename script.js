"use strict";

const playerOneScore = document.querySelector(".player1-total");
const playerTwoScore = document.querySelector(".player2-total");
const playerOneCurrent = document.querySelector(".player1-current-score");
const playerTwoCurrent = document.querySelector(".player2-current-score");
const dieOne = document.querySelector(".die1");
const dieTwo = document.querySelector(".die2");
const newGame = document.querySelector(".new-game");
const hold = document.querySelector(".hold");
const roll = document.querySelector(".roll");

const goalPoints = 100;
let gameOver = false;

let oneIsPlaying = true;
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

function rollDice() {
  const die1 = Math.floor(Math.random() * 6 + 1);
  const die2 = Math.floor(Math.random() * 6 + 1);
  dieOne.textContent = "";
  dieOne.appendChild(diceArray1[die1 - 1]);
  dieTwo.textContent = "";
  dieTwo.appendChild(diceArray2[die2 - 1]);
  updateCurrent(die1 + die2);
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
  resetTotals(gameOver);
  changePlayer();
}

function resetCurrents() {
  currentScores = [0, 0];
  playerOneCurrent.innerText = 0;
  playerTwoCurrent.innerText = 0;
}

function changePlayer() {
  oneIsPlaying = !oneIsPlaying;
}

function checkWin(whoPressedHold) {
  if (whoPressedHold) {
    if (totalScores[0] === goalPoints) {
      console.log("Player 1 wins!");
      gameOver = true;
    }
    if (totalScores[0] > goalPoints) {
      console.log("Player 2 wins!");
      gameOver = true;
    }
  } else {
    if (totalScores[1] === goalPoints) {
      console.log("Player 2 wins!");
      gameOver = true;
    }
    if (totalScores[1] > goalPoints) {
      console.log("Player 1 wins!");
      gameOver = true;
    }
  }
}

function resetTotals(gameOver) {
  if (gameOver) {
    totalScores = [0, 0];
    playerOneScore.innerText = 0;
    playerTwoScore.innerText = 0;
  }
}

let diceArray1;
let diceArray2;
diceArray1 = createDice();
diceArray2 = createDice();

roll.addEventListener("click", rollDice);
hold.addEventListener("click", holdScore);
