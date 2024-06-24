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
import { SlotMachine } from './slotmachine.js';

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

        const userBalance = balance.getBalance();

        if (currentBalanceOutput) {
            currentBalanceOutput.innerHTML = userBalance;
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
        const userBalance = balance.getBalance();

        let currentBetAmount = betAmountInput.value;

        if(currentBetAmount < userBalance) {
            betAmountInput.value++;
        }
    });

    minusBetButton.addEventListener("click", () => {
        if(betAmountInput.value && betAmountInput.value > 0) {
            betAmountInput.value--;
        }
    });

    maxBetButton.addEventListener("click", () => {
        const userBalance = balance.getBalance();
        
        if(userBalance) {
            betAmountInput.value = userBalance;
        }
    });


    // Slot Reels
    const betStartButton = document.getElementById("betStartButton");

    betStartButton.addEventListener("click", () => {

        const betAmount = parseInt(betAmountInput.value);
        const userBalance = balance.getBalance();
        const rowCount = document.querySelectorAll(".slot-container .slot-row").length;

        if(betAmount > userBalance) {
            alert("Insufficient balance.");
            return;
        } else {
            balance.deductBalance(betAmount);
        }


        const slotmachine = new SlotMachine(betAmount, userBalance, rowCount);

        const result = slotmachine.spinWheel();

        if(result.price > 0 && result.price) {
            const winnings = result.price + betAmount;

            balance.addBalance(winnings);
        }

        currentBalanceOutput.innerHTML = balance.getBalance();
        
    });

});
