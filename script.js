var socket = io()
let side = 20;
function setup() {
    // frameRate(2);
    createCanvas(30 * side, 30 * side);
    background('#acacac');

}
Weather = 'amar'

socket.on('send weather', function (wh) {
    Weather = wh
})


function nkarel(matrix) {
    // console.log(matrix);

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 1) {
                if (Weather == amar) {
                    fill("green");
                    rect(x * side, y * side, side, side);
                }
                else if (Weather == ashun) {
                    fill("#CBAD2E");
                    rect(x * side, y * side, side, side);
                }
                else if (Weather == dzmer) {
                    fill("white");
                    rect(x * side, y * side, side, side);
                }
                else if (Weather == garun) {
                    fill("#72FF00");
                    rect(x * side, y * side, side, side);
                }

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
}
function tpel(grassArr) {
    console.log(grassArr.length)
}


setInterval(
    function () {
        socket.on('send matrix', nkarel)
    }
    , 1000)

setInterval(
    function () {
        socket.on('send grassArr', tpel)
    }
    , 1000)


