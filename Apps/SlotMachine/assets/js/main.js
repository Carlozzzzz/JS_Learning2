// Process/Steps:

// 	1. Deposit some money                       ******
// 	2. Collect the bet
// 	3. Spin the slot machine
// 	4. Check if the user won
// 	5. Give the user's winnings
// 	6. Play again

// Roll each box for .3 sec in order by row
// the roll for each row will be at the same time
// 

// main.js
import { Balance } from './Balance.js';

document.addEventListener('DOMContentLoaded', function() {

    const balance = new Balance(2);

    // Event for getting the deposit
    const depositButton = document.getElementById("depositButton");
    const currentBalanceOutput = document.getElementById("currentBalanceOutput");

    currentBalanceOutput.innerHTML = balance.getBalance();

    depositButton.addEventListener("click", () => {
        // depositing money
        const depositAmount = balance.deposit();

        if(depositAmount) {
            alert("The transaction is successfully completed.");
        }

        const currentBalance = balance.getBalance();

        if (currentBalanceOutput) {
            currentBalanceOutput.innerHTML = currentBalance;
        } else {
            console.error("Element with id 'currentBalanceOutput' not found.");
        }

    });


    // Bet Settings
    const addBetButton = document.getElementById("addBetButton");
    const minusBetButton = document.getElementById("minusBetButton");
    const betAmountInput = document.getElementById("betAmountInput");
    const maxBetButton = document.getElementById("maxBetButton");

    addBetButton.addEventListener("click", () => {
        const currentBalance = balance.getBalance();

        let currentBetAmount = betAmountInput.value;

        if(currentBetAmount < currentBalance) {
            betAmountInput.value++;
        }
    });

    minusBetButton.addEventListener("click", () => {
        if(betAmountInput.value && betAmountInput.value > 0) {
            betAmountInput.value--;
        }
    });

    maxBetButton.addEventListener("click", () => {
        const currentBalance = balance.getBalance();
        
        if(currentBalance) {
            betAmountInput.value = currentBalance;
        }
    });


    // Slot Reels
    const betStartButton = document.getElementById("betStartButton");

    betStartButton.addEventListener("click", () => {
        // start the animation here
        // get the bet amount
        // get the balance amount
        // get the array of items (slot of boxes)
        // display the end results of animation
        // display the winning row/s
        // update the currentBalance (win/lose)
        
    });

});
