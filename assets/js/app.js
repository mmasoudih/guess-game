// game variables
let min = 1,
    max = 10,
    guessLeft = 3,
    winNum = setRandomNumber(min, max);
// ui variables

let minNum = document.querySelector('.min-num');
let maxNum = document.querySelector('.max-num');
let game = document.querySelector('.game');
let gameInput = document.querySelector('#game-input');
let guessBtn = document.querySelector('.guess-btn');
let message = document.querySelector('.message');
let cheatCodeBtn = document.querySelector('.cheat-btn');
let cheatCodeBox = document.querySelector('.answer');

// set min and max for ui 
minNum.textContent = min;
maxNum.textContent = max;

//add event listener for cheat code 
cheatCodeBtn.addEventListener('click', showCheat);

// add event listener for restart game 
game.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('game-finished')) {
        window.location.reload();
    }
});
// add event listener to guess btn 
guessBtn.addEventListener('click', () => {
    let guess = parseInt(gameInput.value);
    // validation user input
    if (isNaN(guess) || guess < min || guess > max || guess == '') {
        showErrorMessage(['error', 'shake'], false, 'error-message', false, 'یه چیزی رو اشتباه وارد کردی');
        setTimeout(clearError, 2000);
    } else {
        // check user win 
        if (guess === winNum) {
            showErrorMessage(['success', 'shake'], true, 'success-message', true, `هورررا!، برنده شدی عدد درست ${winNum} هست`);
        } else {
            guessLeft -= 1;
            if (guessLeft === 0) {
                showErrorMessage(['error', 'shake'], true, 'error-message', true, 'اوه! ، فرصتت تموم شد.');
            } else {
                showErrorMessage(['error', 'shake'], false, 'error-message', false, `عدد اشتباهه! فرصت باقی مونده ${guessLeft} هست`);
                setTimeout(clearError, 2000);
            }
        }
    }

});
// function show error 
function showErrorMessage(inputClassName, inputStatus, messageClassName, restartGame, text) {
    gameInput.classList.add(...inputClassName);
    gameInput.disabled = inputStatus;
    if (restartGame) {
        guessBtn.classList.add('game-finished');
        guessBtn.textContent = 'بازی دوباره';
    }
    message.classList.add(messageClassName);
    message.textContent = text;
}
// function for clear error message 
function clearError() {
    let messageClassName = message.classList.item(1);
    while (gameInput.classList.item(0)) {
        let gameInputClassName = gameInput.classList.item(0);
        gameInput.classList.remove(gameInputClassName);
    }
    message.classList.remove(messageClassName);
    message.textContent = '';
}
// create random number 
function setRandomNumber(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1) + min)
    localStorage.setItem('number', num);
    return num;
}
// set cheat code and show answer box
function showCheat() {
    cheatCodeBox.classList.add('show');
    cheatCodeBox.children[0].textContent = localStorage.getItem('number');
    setTimeout(hideCheat, 2000);
}
// hide cheat box
function hideCheat() {
    cheatCodeBox.classList.remove('show');
}