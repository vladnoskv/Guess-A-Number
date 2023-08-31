<?php
/*
Plugin Name: Number Guesser Plugin
Description: A number guessing game plugin.
Version: 1.1
Author: Vlad Noskov
Author URI: https://vladnoskov.com
*/

function number_guesser_shortcode() {
    ob_start(); ?>

    <div id="game">
        <h2>Number Guesser Game</h2>
        <p>Guess a number between 1 and 100:</p>
        <input type="number" id="guess">
        <button type="button" id="checkBtn">Check</button>
        <p id="message"></p>
        <ul id="guessList"></ul>
        <p>Attempts: <span id="attempts">0</span></p>
        <button type="button" id="restartBtn" style="display: none;">Restart</button>
    </div>

    <script src="<?php echo plugins_url( 'script.js', __FILE__ ); ?>"></script>

    <?php
    return ob_get_clean();
}

add_shortcode( 'number_guesser', 'number_guesser_shortcode' );
