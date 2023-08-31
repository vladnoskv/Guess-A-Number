<?php
/*
Plugin Name: Number Guesser Plugin
Description: A number guessing game plugin.
Version: 2.1
Author: Vlad Noskov
Author URI: https://vladnoskov.com
*/

// Enqueue your own stylesheet and script files
function number_guesser_enqueue_scripts() {
    wp_enqueue_style( 'number_guesser_styles', plugins_url( 'styles.css', __FILE__ ) );
    wp_enqueue_script( 'number_guesser_script', plugins_url( 'script.js', __FILE__ ) );
}
add_action( 'wp_enqueue_scripts', 'number_guesser_enqueue_scripts' );

// Wrap your code in a unique container
function display_game_func() {
    ob_start();
    ?>
    <div id="game-container">
    <h1 class="guess-game-header">Guess the Number Game</h1>
        <p class="guess-game-description">Try to guess the secret number between 1 and 100.</p>
        <p class="guess-game-question"><b>Can you do it?</b></p>
        <input type="number" id="guess" placeholder="Enter your guess">
        <button id="checkBtn">Guess Number</button>
        <button id="restartBtn">Try Again</button>
        <p id="message"></p>
        <p><b>Attempts :</b> <span id="attempts">0</span>/10</p>
        <div class="guesses">
            <p><b>Previous Guesses:</b></p>
            <ul id="guessList"></ul>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

add_shortcode( 'display_game', 'display_game_func' );
