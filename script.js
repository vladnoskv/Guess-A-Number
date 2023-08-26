function myGameLogic() {
  const userGuessInput = document.querySelector("#guess");
  const checkGuessBtn = document.querySelector("#checkBtn");
  const gameMessage = document.querySelector("#message");
  const guessList = document.querySelector("#guessList");
  const attemptsSpan = document.querySelector("#attempts");
  const restartBtn = document.querySelector("#restartBtn");

  const maxAttempts = 10;
  let secretNumber, attempts, guessedNumbers;

  function startGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    guessedNumbers = [];

    checkGuessBtn.addEventListener("click", checkGuess);
    userGuessInput.addEventListener("input", validateInput);
    userGuessInput.addEventListener("keydown", checkGuessOnEnter);
    restartBtn.addEventListener("click", restartGame);
  }

  function checkGuessOnEnter(event) {
    if (event.key === "Enter") {
      checkGuess();
    }
  }

  function checkGuess() {
    const userGuess = parseInt(userGuessInput.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      gameMessage.textContent = "Please enter a valid number between 1 and 100.";
    } else if (guessedNumbers.includes(userGuess)) {
      gameMessage.textContent = "You have already guessed this number.";
    } else {
      attempts++;

      if (userGuess === secretNumber) {
        gameMessage.textContent = `Congratulations! You guessed the number ${secretNumber} in ${attempts} attempts.`;
        gameMessage.style.color = "green";
        disableInputs();
      } else if (attempts === maxAttempts) {
        gameMessage.textContent = `Game over! The secret number was ${secretNumber}.`;
        gameMessage.style.color = "red";
        disableInputs();
      } else if (userGuess < secretNumber) {
        gameMessage.textContent = "Try a higher number.";
        gameMessage.style.color = "black";
      } else {
        gameMessage.textContent = "Try a lower number.";
        gameMessage.style.color = "red";
      }

      attemptsSpan.textContent = attempts;
      guessedNumbers.push(userGuess);
      addGuessToList(userGuess);
    }
  }

  function validateInput() {
    userGuessInput.value = userGuessInput.value.replace(/\D/g, "");
  }

  function checkGuessOnEnter(event) {
    if (event.key === "Enter") {
      checkGuess();
    }
  }

  function restartGame() {
    attempts = 0;
    guessedNumbers.length = 0;
    gameMessage.textContent = "";
    enableInputs();
    guessList.textContent = "";
    attemptsSpan.textContent = attempts;
    userGuessInput.value = "";
    startGame();
  }

function addGuessToList(guess) {
  const guessItem = document.createElement("li");
  guessItem.textContent = guess;

  const arrow = document.createElement("span");
  arrow.classList.add("arrow");

  if (guess < secretNumber) {
    guessItem.classList.add("higher");
    arrow.innerHTML = "&#8593;"; // Up arrow
  } else if (guess > secretNumber) {
    guessItem.classList.add("lower");
    arrow.innerHTML = " &#8595;"; // Down arrow
  } else {
    arrow.innerHTML = " &#10004;"; // Display a checkmark when the final number is guessed
  }

  arrow.style.color = " #262626"; // Set the color of the arrow to #262626
  arrow.style.borderWidth = "2px"; // Set the thickness of the arrow's border to 2px

  guessItem.appendChild(arrow);
  guessList.insertBefore(guessItem, guessList.firstChild);
  guessList.style.textAlign = "center";
}

  function disableInputs() {
    userGuessInput.disabled = true;
    checkGuessBtn.disabled = true;
    restartBtn.disabled = false;
  }

  function enableInputs() {
    userGuessInput.disabled = false;
    checkGuessBtn.disabled = false;
    restartBtn.disabled = true;
  }

  startGame();
}

document.addEventListener("DOMContentLoaded", myGameLogic);
