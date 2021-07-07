class Tunavor extends LivingCreature{
    constructor(x, y) {
        super(x,y)
        this.multiply = 0;

    }


    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        console.log(emptyCells, newCell);
        if (newCell && this.multiply >= 15) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 7;

            var newTnv = new Tunavor(newX, newY);
            TunavorArr.push(newTnv);
            this.multiply = 0;

        }
    }
}