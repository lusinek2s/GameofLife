let express = require('express')
let app = express()

let server = require('http').Server(app)
let io = require('socket.io')(server)
var fs = require("fs");
server.listen(3000)

app.use(express.static('.'))

app.get('/', function (req, res) {
    res.redirect('index.html')
})



function generator(matLen, gr, grEat, pd, gv, eea, pdv, st) {
    var matrix = [];
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

    io.sockets.emit('send matrix', matrix)
    return matrix;
}

matrix = generator(30, 250, 95, 30, 10, 10, 10, 75)

grassArr = []
grassEaterArr = []
PredatorArr = []
GrassVerArr = []
GrEaEaArr = []
PredVerArr = []
TunavorArr = []
var Grass = require('./Grass.js')
var GrassEater = require('./GrassEater.js')
var Predator = require('./Predator.js')
var GrassVer = require('./GrassVer.js')
var GrEaEa = require('./GrEaEa.js')
var PredVer = require('./PredVer.js')
var Tunavor = require('./Tunavor.js')


function createobject(matrix) {
    // console.log(333)
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {

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

            // console.log(grassArr);
        }
    }

    io.sockets.emit('send matrix', matrix)
}

function game() {
    // console.log(grassArr.length);

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

    // console.log(matrix[0]);
    io.sockets.emit('send grassArr', grassArr)
    io.sockets.emit('send matrix', matrix)
}

setInterval(function () {
    game()
    // console.log("data");

}, 1000)

var flag = true


io.on("connection", function (socket) {
    if (flag) {
        createobject(matrix)
        console.log(111);
        flag = false
    }

})


var statistics = {}

setInterval(function () {
    statistics.grass = grassArr.length
    statistics.grassEater = grassEaterArr.length
    statistics.Predator = PredatorArr.length
    statistics.GrassVer = GrassVerArr.length
    statistics.GrEaEa = GrEaEaArr.length
    statistics.PredVer = PredVerArr.length
    statistics.Tunavor = TunavorArr.length

    fs.writeFileSync("statistics.json",
        JSON.stringify(statistics))
}, 1000)

weather = "garun"


setInterval(function () {
    if (weather == "amar") {
        weather = "ashun"
    }
    else if (weather == "ashun") {
        weather = "dzmer"
    }
    else if (weather == "dzmer") {
        weather = "garun"
    }
    else if (weather == "garun") {
        weather = "amar"
    }

    io.sockets.emit('send weather', weather)


}, 4000)



