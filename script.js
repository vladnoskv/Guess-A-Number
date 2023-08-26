function myGameLogic() {
    const userGuessInput = document.querySelector("#guess");
    const checkGuessBtn = document.querySelector("#checkBtn");
    const gameMessage = document.querySelector("#message");
    const guessList = document.querySelector("#guessList");
    const attemptsSpan = document.querySelector("#attempts");
    const restartBtn = document.querySelector("#restartBtn");
    

    const secretNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    const maxAttempts = 10;
    const guessedNumbers = [];

    checkGuessBtn.addEventListener("click", function() {
        const userGuess = parseInt(userGuessInput.value);

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            gameMessage.textContent = 'Please enter a valid number between 1 and 100.';
        } else if (guessedNumbers.includes(userGuess)) {
            gameMessage.textContent = 'You have already guessed this number.';
        } else {
            attempts++;

            if (userGuess === secretNumber) {
                gameMessage.textContent = `Congratulations! You guessed the number ${secretNumber} in ${attempts} attempts.`;
                gameMessage.style.color = 'green';
                userGuessInput.disabled = true;
                checkGuessBtn.disabled = true;
                restartBtn.disabled = false; // Enable restart button
            } else if (attempts === maxAttempts) {
                gameMessage.textContent = `Game over! The secret number was ${secretNumber}.`;
                gameMessage.style.color = 'red';
                userGuessInput.disabled = true;
                checkGuessBtn.disabled = true;
                restartBtn.disabled = false; // Enable restart button
            } else if (userGuess < secretNumber) {
                gameMessage.textContent = 'Try a higher number.';
                gameMessage.style.color = 'black';
            } else {
                gameMessage.textContent = 'Try a lower number.';
                gameMessage.style.color = 'red';
            }

            attemptsSpan.textContent = attempts;
            guessedNumbers.push(userGuess);
            addGuessToList(userGuess);
        }
    });

    userGuessInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkGuessBtn.click();
        }
    });

    restartBtn.addEventListener("click", restartGame);

    function restartGame() {
        attempts = 0;
        guessedNumbers.length = 0;
        gameMessage.textContent = "";
        userGuessInput.disabled = false;
        checkGuessBtn.disabled = false;
        guessList.textContent = "";
        attemptsSpan.textContent = attempts;
        userGuessInput.value = "";
        secretNumber = Math.floor(Math.random() * 100) + 1;
        restartBtn.disabled = true; // Disable restart button
    }

    function addGuessToList(guess) {
        const guessItem = document.createElement("li");
        guessItem.textContent = guess;

        const arrow = document.createElement("span");
        arrow.classList.add("arrow");

        if (guess < secretNumber) {
            arrow.textContent = "⬆️ - Higher"; // Up arrow
        } else {
            arrow.textContent = "⬇️ - Lower"; // Down arrow
        }

        guessItem.appendChild(arrow);
        // Insert the new guess at the beginning of the list
        guessList.insertBefore(guessItem, guessList.firstChild);
        // Center the guesses in the middle
        guessList.style.textAlign = "center";
    }
}

document.addEventListener("DOMContentLoaded", myGameLogic);
