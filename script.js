function generator(matLen, gr, grEat, pd, gv, eea, pdv, st) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pd; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < gv; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < eea; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    for (let i = 0; i < pdv; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 6;
        }
    }
    for (let i = 0; i < st; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 7;
        }
    }
    return matrix;
}

let side = 20;

let matrix = generator(30, 250, 95, 30, 10, 10, 10, 75)

var grassArr = []
var grassEaterArr = []
var PredatorArr = []
var GrassVerArr = []
var GrEaEaArr = []
var PredVerArr = []
var TunavorArr = []





function setup() {
    frameRate(2);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                console.log(matrix[y][x])
                var gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var gre = new GrassEater(x, y);
                grassEaterArr.push(gre);
            }
            else if (matrix[y][x] == 3) {
                var grep = new Predator(x, y);
                PredatorArr.push(grep);
            }
            else if (matrix[y][x] == 4) {
                var grv = new GrassVer(x, y);
                GrassVerArr.push(grv);
            }
            else if (matrix[y][x] == 5) {
                var gree = new GrEaEa(x, y);
                GrEaEaArr.push(gree);
            }
            else if (matrix[y][x] == 6) {
                var pdv = new PredVer(x, y);
                PredVerArr.push(pdv);
            }
            else if (matrix[y][x] == 7) {
                var tnv = new Tunavor(x, y);
                TunavorArr.push(tnv);
            }

            console.log(grassArr);
        }
    }



}



function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {

                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {

                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {

                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {

                fill("purple");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {

                fill("#FFA400");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 7) {

                fill("#04FCE5");
                rect(x * side, y * side, side, side);
            }


        }
    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in TunavorArr) {
        TunavorArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].mul();
        grassEaterArr[i].eat()
    }
    for (var i in PredatorArr) {
        PredatorArr[i].mul();
        PredatorArr[i].eat()
    }
    for (var i in GrassVerArr) {
        if (grassArr.length <= 5) {
            GrassVerArr[i].move(1);
        }
        else {
            GrassVerArr[i].move(0);
        }
    }
    for (var i in PredVerArr) {
        if (PredatorArr.length <= 5) {
            PredVerArr[i].move(3);
        }
        else {
            PredVerArr[i].move(0);
        }
    }
    for (var i in GrEaEaArr) {
        if (grassEaterArr.length >= 100) {
            GrEaEaArr[i].move();
            GrEaEaArr[i].eat();
        }
        else {
            GrEaEaArr[i].move();
        }
    }
}