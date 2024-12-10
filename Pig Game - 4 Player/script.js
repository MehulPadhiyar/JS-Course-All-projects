//Expand this game for 4 players

//Dom Elements
const dice = document.querySelector(".dice");
const btnRollDice = document.querySelector(".btn--roll");
const current = document.querySelector(".current-score");
const player0 = document.querySelector(".player--0");
const btnHold = document.querySelector(".btn--hold");
const player = document.querySelectorAll(".player");
const newGameBtn = document.querySelector(".btn--new");

//variables
let activePlayer = 0;
let diceScore;
let currentScore = 0;
let playerScore = [0,0,0,0];

const displayDice = function(){
    dice.src = `dice-${diceScore}.png`;
    dice.classList.remove("hidden");
}

/*const playerActive = function(){
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
    player2.classList.toggle("player--active");
    player3.classList.toggle("player--active");
}*/

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
    currentScore = 0;
    current.textContent = 0;
    document.querySelector(`.player--${activePlayer}`).classList.toggle("player--active");
    activePlayer = (activePlayer === 3) ? 0 : ++activePlayer;
    document.querySelector(`.player--${activePlayer}`).classList.toggle("player--active");
    //playerActive();
}

btnRollDice.addEventListener("click", function(){
    diceScore = Math.trunc(Math.random() * 6 + 1);
    if(diceScore !== 1){
        displayDice();
        currentScore += diceScore; 
        current.textContent = currentScore;
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
    playerScore[activePlayer] += currentScore;
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
    currentScore = 0;
    playerScore = [0,0,0,0];
    player.forEach(ele => {
        ele.classList.remove("player--winner","player--active");
        ele.lastElementChild.textContent = 0;
    })
    player0.classList.add("player--active");
    current.textContent = 0;
    //score0.textContent = 0;
    //score1.textContent = 0;
   
    /*player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");
    player1.classList.remove("player--active");
    player0.classList.add("player--active");*/
})