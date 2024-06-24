export class SlotMachine {
    constructor(totalBet, userBalance, rowCount) {
        this.totalBet = totalBet;
        this.userBalance = userBalance;
        this.rowCount = rowCount;

    }

    // user input ***
    // place bets ***
    // spin reels
    //      randomize the numbers for each rows ***
    //      check of the numbers for each rows is similar
    
    randomizeRowValue(rowCount) {
        let rowArr = new Array(rowCount).fill(null);

        const result = rowArr.map((row) => {
            row = new Array(3).fill(null);

            return row.map(() => Math.floor(Math.random() * 4) + 1);
        });

        return result;
    }

    checkWinningRow(arrRow) {

        if(arrRow.length === 0) return false; // will check if there is element in array

        const firstRowStr = JSON.stringify(arrRow[0]);

        return arrRow.every(row => JSON.stringify(row) === firstRowStr);
    }

    calculateWinningPrice(arr) {
        let matchedRow = 0;
        let winningPrice = 0;

        arr.forEach(row => {
            if(this.checkWinningRow(row)) {
                matchedRow++;
            }
        });

        winningPrice = matchedRow * this.totalBet;

        return winningPrice;
    }

    spinWheel() {
        const randomBoxResults = this.randomizeRowValue(this.rowCount);

        const price = this.calculateWinningPrice(randomBoxResults);

        const result = {
            "ramdomizeRows" : randomBoxResults,
            "price" : price
        };

        return result;
    }
}