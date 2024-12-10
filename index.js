const sessionTime = document.querySelector(".session-time");
const totalTime = document.querySelector(".total-time");
const lastVisit = document.querySelector(".last-visit");
const resetBtn = document.querySelector(".reset");

let totalSec = parseInt(localStorage.getItem("totalTime")) || 0;

let lastVisLoc = localStorage.getItem("lastVisit") || "Never";
let sessionSec = 0;

totalTime.textContent = totalSec;
lastVisit.textContent = lastVisLoc; 

const sessionInter = setInterval(() => 
{
    sessionSec++;
    sessionTime.textContent = sessionSec;
}, 1000);

document.addEventListener('visibilitychange', () => 
{
    if (document.visibilityState === 'hidden') 
    {
        saveData(); 
    }
});

window.addEventListener('beforeunload', () => 
{
    totalSec += sessionSec;
    localStorage.setItem('totalTime', totalSec);
    localStorage.setItem('lastVisit', new Date().toLocaleString());
});

resetBtn.addEventListener("click", () => {
    clearInterval(sessionInter);

    sessionSec = 0;
    totalSec = 0;
    localStorage.clear();

    sessionTime.textContent = "0";
    totalTime.textContent = "0";
    lastVisit.textContent = "Never";
});


let secretNumber = Math.floor(Math.random() * 100) + 1;
let attemptCount = 0;

const guess = document.querySelector(".guess");
const checkBtn = document.querySelector(".check-btn");
const hint = document.querySelector(".hint");
const attempts = document.querySelector(".attempts");
const resetBtnN = document.querySelector(".reset-btn__num");

checkBtn.addEventListener('submit', () => {
    const userGuess = parseInt(guess.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        hint.textContent = "Enter a number between 1 and 100";
        return;
    }

    attemptCount++;
    attempts.textContent = attemptCount;

    if (userGuess === secretNumber) 
    {
        hint.textContent = `Congrats you guessed the number ${secretNumber} after ${attemptCount} attempts.`;
    } 
    if (userGuess < secretNumber) 
    {
        hint.textContent = "The number is bigger!";
    }
    if(userGuess > secretNumber) 
    {
        hint.textContent = "The number is smaller!";
    }
});


resetBtnN.addEventListener('click', () => 
{
    resetGame();
});


function resetGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attemptCount = 0;
    attempts.textContent = attemptCount;
    hint.textContent = "";
    guess.value = "";

    sessionSec = 0;
    sessionTime.textContent = "0";
}