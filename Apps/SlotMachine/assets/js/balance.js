export class Balance {
    constructor(initialBalance) {
        this.userBalance = initialBalance;
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

    displayBalance() {
        console.log("Current Balance: ", this.userBalance);
    }
}