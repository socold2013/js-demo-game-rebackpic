var canv = document.getElementById("canvas");
var ctx = canv.getContext("2d");
var img = new Image();
img.src = "\joker.jpg";
var matrix = [
    [0, 1, 2, 3, 4, 30],
    [6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29]
];
var whiteBlock = {
    row: 0,
    col: 5
};
var drawline = function () {
    ctx.beginPath();
    for (let i = 0; i < 7; i++) {
        ctx.moveTo(i * 160, 0);
        ctx.lineTo(i * 160, 600);
        ctx.moveTo(0, i * 120);
        ctx.lineTo(960, i * 120)
    }
    ctx.stroke();

};
var perfect = function () {
    ctx.font = "100px Consolas";
    ctx.fillStyle = "#ff3344";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("PERFECT", 500, 250);
    ctx.fillStyle = "Black";
}
var drawPic = function () {
    ctx.clearRect(0, 0, 960, 600);
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 6; j++) {
            //绘制图块
            if (matrix[i][j] != 30) {
                var col = (Math.floor(matrix[i][j] % 6) * 160);
                var row = (Math.floor(matrix[i][j] / 6) * 120);
                ctx.drawImage(img, col, row, 160, 120, j * 160, i * 120, 160, 120);
            }

        }
    }
    if (checkPic()) {
        perfect();
    } else {
        drawline();
    }

};
var moveLeft = function () {

    if (whiteBlock.col != 5) {
        matrix[whiteBlock.row][whiteBlock.col] = matrix[whiteBlock.row][whiteBlock.col + 1];
        whiteBlock.col = whiteBlock.col + 1;
        matrix[whiteBlock.row][whiteBlock.col] = 30;
    }
};
var moveUp = function () {

    if (whiteBlock.row != 4) {
        matrix[whiteBlock.row][whiteBlock.col] = matrix[whiteBlock.row + 1][whiteBlock.col];
        whiteBlock.row = whiteBlock.row + 1;
        matrix[whiteBlock.row][whiteBlock.col] = 30;
    }
};
var moveRight = function () {

    if (whiteBlock.col != 0) {
        matrix[whiteBlock.row][whiteBlock.col] = matrix[whiteBlock.row][whiteBlock.col - 1];
        whiteBlock.col = whiteBlock.col - 1;
        matrix[whiteBlock.row][whiteBlock.col] = 30;
    }
};
var moveDown = function () {

    if (whiteBlock.row != 0) {
        matrix[whiteBlock.row][whiteBlock.col] = matrix[whiteBlock.row - 1][whiteBlock.col];
        whiteBlock.row = whiteBlock.row - 1;
        matrix[whiteBlock.row][whiteBlock.col] = 30;
    }
};
while (true) {
    var dirctioin = Math.floor(Math.random() * 4);
    switch (dirctioin) {
        case 0:
            moveUp();
            break;
        case 1:
            moveLeft();
            break;
        case 2:
            moveRight();
            break;
        case 3:
            moveDown();
            break;
    }
    if (whiteBlock.row == 4 && whiteBlock.col == 0)
        break;
}
var checkPic = function () {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 6; j++) {
            if (i * 6 + j != matrix[i][j] && i * 6 + j != 5)
                return 0;
        }
        return 1;
    }
}
$("body").keydown(function (event) {
    if (event.keyCode == 37) {
        console.log(event.keyCode);
        moveLeft();

    }
    if (event.keyCode == 38) {
        console.log(event.keyCode);

        moveUp();

    }
    if (event.keyCode == 39) {
        console.log(event.keyCode);
        moveRight();

    }
    if (event.keyCode == 40) {
        console.log(event.keyCode);
        moveDown();

    }
    drawPic();
});
