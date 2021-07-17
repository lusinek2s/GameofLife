let LivingCreature = require('./LivingCreature.js')

module.exports = class Tunavor extends LivingCreature{
    constructor(x, y) {
        super(x,y)
        this.multiply = 0;

    }


    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        console.log(emptyCells, newCell);
        if (newCell && this.multiply >= 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 7;

            var newTnv = new Tunavor(newX, newY);
            TunavorArr.push(newTnv);
            this.multiply = 0;

        }
    }
}