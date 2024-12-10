const checkBtn = document.querySelector(".check");
const message = document.querySelector(".message");
const guess = document.querySelector(".guess");
const body = document.querySelector("body");

let number = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highScore = 0;

checkBtn.addEventListener("click", function(){
    const guessNumber = Number(document.querySelector(".guess").value);
    if(guessNumber === number){
        printMessage("🎉 Correct Number!");
        document.querySelector(".number").textContent = number;
        body.style.backgroundColor = "#60b347"; 
        guess.disabled = true;
        checkBtn.disabled = true;
        if(score > highScore){
            highScore = score;
            document.querySelector(".highscore").textContent = score;
        }
    }
    else{
        document.querySelector(".number").textContent = '?';
        if(score > 1){
            score--;
            document.querySelector(".score").textContent = score;
            (guessNumber > number) ? printMessage("📈 Too high!") : printMessage("📉 Too low!");
        }
        else{
            guess.disabled = true;
            checkBtn.disabled = true;
            document.querySelector(".score").textContent = '0';
            printMessage("💥 You lost the game!");
        }
    }
})

document.querySelector(".again").addEventListener("click",function(){
    number = Math.trunc(Math.random() * 20 + 1);
    score = 20;
    document.querySelector(".score").textContent = score;
    guess.disabled = false;
    checkBtn.disabled = false;
    body.style.backgroundColor = "#222";
    document.querySelector(".number").textContent = "?";
    document.querySelector('.guess').value = '';
    printMessage("Start guessing...");
})

const printMessage = function(messagetxt){
    message.textContent = messagetxt;
}










