//Expand this game for 4 players

//Dom Elements
const dice = document.querySelector(".dice");
const btnRollDice = document.querySelector(".btn--roll");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const btnHold = document.querySelector(".btn--hold");
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const newGameBtn = document.querySelector(".btn--new");

//variables
let activePlayer = 0;   
let diceScore;
let currentScore = [0,0];
let playerScore = [0,0];

const displayDice = function(){
    dice.src = `dice-${diceScore}.png`;
    dice.classList.remove("hidden");
}

const playerActive = function(){
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
}

const disableBtn = function(){
    btnRollDice.disabled = true;
    btnHold.disabled = true;
}

const enableBtn = function(){
    btnRollDice.disabled = false;
    btnHold.disabled = false;
}

/*const isWinner = function(score,player){
    if(score >= 100){
        player.classList.add("player--winner");
        disableBtn();
    }
}*/

const switchPlayer = function(){
    currentScore[activePlayer] = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = (activePlayer === 0) ? 1 : 0;
    playerActive();
}

btnRollDice.addEventListener("click", function(){
    diceScore = Math.trunc(Math.random() * 6 + 1);
    if(diceScore !== 1){
        displayDice();
        currentScore[activePlayer] += diceScore;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore[activePlayer];
        /*
        if(activePlayer === 0){
            currentScore[activePlayer] += diceScore;
            current0.textContent = currentScore[activePlayer];
        }
        else{
            currentScore[activePlayer] += diceScore;
            current1.textContent = currentScore[activePlayer];
        }*/
    }
    else{
        displayDice();
        switchPlayer();
        /*currentScore[activePlayer] = 0;
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        activePlayer = (activePlayer === 0) ? 1 : 0;*/
        /*if(activePlayer === 0){
            currentScore[activePlayer] = 0;
            current0.textContent = 0;
            activePlayer = 1;
            playerActive();
        }
        else{
            currentScore[activePlayer] = 0;
            current1.textContent = 0;
            activePlayer = 0;
            playerActive();
        }*/
    }
})


btnHold.addEventListener("click",function(){
    playerScore[activePlayer] += currentScore[activePlayer];
    document.querySelector(`#score--${activePlayer}`).textContent = playerScore[activePlayer];
    if(playerScore[activePlayer] >= 100){
        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
        disableBtn();
    }else{
        switchPlayer();
    }
    /*if(activePlayer === 0){
            player0Score += currentScore[activePlayer];
            score0.textContent = player0Score;
            currentScore[activePlayer] = 0;
            current0.textContent = 0;
            activePlayer = 1;
            isWinner(player0Score,player0);
            playerActive();
        }
    else{
        player1Score += currentScore[activePlayer];
        score1.textContent = player1Score;
        currentScore[activePlayer] = 0;
        current1.textContent = 0;
        activePlayer = 0;
        isWinner(player1Score,player1);
        playerActive();
    }*/
})

newGameBtn.addEventListener("click",function(){
    enableBtn();
    dice.classList.add("hidden");
    activePlayer = 0;
    currentScore = [0,0];
    playerScore = [0,0];
    score0.textContent = 0;
    score1.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;
    player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");
    player1.classList.remove("player--active");
    player0.classList.add("player--active");
})