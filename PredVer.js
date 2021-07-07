class PredVer extends LivingCreature{
    constructor(x, y) {
        super(x,y)
    }

    move(r) {
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]


        if (newCell) {
            if (r == 3) {
                console.log(newCell)
                var newX = newCell[0]
                var newY = newCell[1]
                matrix[newY][newX] = matrix[this.y][this.x]
                matrix[this.y][this.x] = r
                var newPredator = new Predator(this.x, this.y);
                PredatorArr.push(newPredator);
                this.x = newX
                this.y = newY
            } else if (r == 0) {
                var newX = newCell[0]
                var newY = newCell[1]
                matrix[newY][newX] = matrix[this.y][this.x]
                matrix[this.y][this.x] = r
                this.x = newX
                this.y = newY
            }
        }

    }
}