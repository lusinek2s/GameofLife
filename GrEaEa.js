let LivingCreature = require('./LivingCreature.js')

module.exports = class GrEaEa extends LivingCreature{
    constructor(x, y) {
        super(x,y)
    }

    move() {
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            // console.log(newCell)
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
    }

    eat() {
        var emptyCells = this.chooseCell(3)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in PredatorArr) {
                if (newX == PredatorArr[i].x && newY == PredatorArr[i].y) {
                    PredatorArr.splice(i, 1)
                    break
                }
            }
        }
    }
}