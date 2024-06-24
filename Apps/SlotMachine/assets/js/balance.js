export class Balance {
    constructor(initialBalance) {
        this.userBalance = parseInt(initialBalance);
    }

    deposit() {
        let amount = parseInt(prompt("Enter amount to deposit: "));
        if(!amount || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return 0;
        }
        this.userBalance += amount;
        return amount;
    }

    getBalance() {
        return this.userBalance;
    }

    addBalance(winnings) {
        return this.userBalance += parseInt(winnings);
    }

    deductBalance(losingPrice) {
        this.userBalance -= losingPrice;
    }

    displayBalance() {
        console.log("Current Balance: ", this.userBalance);
    }
}