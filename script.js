'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score_0_el = document.querySelector('#score--0');
const score_1_el = document.querySelector('#score--1');
const curr_score_0_el = document.querySelector('#current--0');
const curr_score_1_el = document.querySelector('#current--1');

const dice_El = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

let scores, current_scores, roll, activePlayer, playing;

const reset = function(){
    scores = [0, 0];
    current_scores = 0;
    roll = 0;
    activePlayer = 0;
    playing = true;

    dice_El.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

    score_0_el.textContent = 0;
    score_1_el.textContent = 0;
    curr_score_0_el.textContent = 0;
    curr_score_1_el.textContent = 0;
}

const changeActivePlayer = function() {
    current_scores = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

reset();

btnRoll.addEventListener('click', function(){
    if (playing){
        roll = Math.trunc(Math.random()*6)+1;
        dice_El.classList.remove('hidden');
        dice_El.src = `dice-${roll}.png`
        
        if (roll !== 1){
            current_scores += roll;
            document.getElementById(`current--${activePlayer}`).textContent = current_scores;
        } else {
            changeActivePlayer();
        }
    }
})

btnHold.addEventListener('click', function(){
    if (playing){
        scores[activePlayer] += current_scores;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    
        if (scores[activePlayer] >= 100){
            dice_El.classList.add('hidden');
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            changeActivePlayer();
        } 
    }
})

btnNew.addEventListener('click', reset);

