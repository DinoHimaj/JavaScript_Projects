/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

//Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;
console.log(winningNum);

//UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

//Listen for Guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  //Input Validation
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
    return false;
  }

  //check input number(if won)
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct, You win!`);
  } else {
    //if Wrong number chosen
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      //Game Over --lost
      gameOver(
        false,
        `Game Over! You lost :( Winning number was ${winningNum}`
      );
    } else {
      // Game continues - answer wrong

      // Change border color
      guessInput.style.borderColor = "red";

      // Clear Input
      guessInput.value = "";

      // Tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "red");
    }
  }
});

//Game Over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  // Disable Input
  guessInput.disabled = true;
  //Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Game over
  setMessage(msg);

  //Play Again?
  guessBtn.value = "Play Again";
  guessBtn.style.borderColor = "green";
  //  += is because we want to append className and = is if we want to replace it
  guessBtn.className += "play-again";
}

//Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

//Generate random winning number
function getRandomNum(min, max) {
  Math.floor(Math.random() * (max - min + 1) + min);
  console.log(`halo bre ${Math.floor(Math.random() * (max - min + 1) + min)}`);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
