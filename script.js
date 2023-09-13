'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

// conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
let scores = [0, 0];
let activePlayer = true;
let playing = true;

function switchPlayer() {
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
}

function setPlayer() {
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
}

btnRoll.addEventListener('click', function () {
  if (playing) {
    diceEl.classList.remove('hidden');
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      if (activePlayer === true) {
        current0El.textContent = currentScore;
      } else {
        current1El.textContent = currentScore;
      }
    } else {
      currentScore = 0;
      current0El.textContent = currentScore;
      current1El.textContent = currentScore;
      switchPlayer();

      activePlayer = activePlayer === true ? false : true;
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    switchPlayer();
    if (activePlayer === true) {
      scores[0] += currentScore;
      score0El.textContent = scores[0];
      activePlayer = false;
      currentScore = 0;
      current0El.textContent = currentScore;
      console.log(scores + ' im from if');

      if (scores[0] >= 100) {
        document.querySelector('.player--0').classList.add('player--winner');
        playing = false;
      }
    } else {
      scores[1] += currentScore;
      score1El.textContent = scores[1];
      activePlayer = true;
      currentScore = 0;
      current1El.textContent = currentScore;
      console.log(scores);

      if (scores[1] >= 100) {
        document.querySelector('.player--1').classList.add('player--winner');
        playing = false;
      }
    }
  }
});

btnNew.addEventListener('click', function () {
  setPlayer();
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  activePlayer = true;
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.remove('player--winner');
  diceEl.classList.add('hidden');
  playing = true;
});
