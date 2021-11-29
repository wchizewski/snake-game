// snake game by Will 

let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 900;
cnv.height = 945;

let snakex = 90;
let snakey = 405;
let direction;
let wPressed = false;
let aPressed = false;
let sPressed = false;
let dPressed = false;
let remainder;
let lastKeyPressed;
let score = 0;
let applex = 450;
let appley = 405;

requestAnimationFrame(loop);
function loop() {
    // movement
    if (lastKeyPressed == "W" || lastKeyPressed == "S") {
        remainder = snakex % 45;
    } else {
        remainder = snakey % 45;
    }

    if (lastKeyPressed == "W" && remainder == 0) {
        direction = "up";
    }

    if (lastKeyPressed == "S" && remainder == 0) {
        direction = "down";
    }

    if (lastKeyPressed == "A" && remainder == 0) {
        direction = "left"
    }

    if (lastKeyPressed == "D" && remainder == 0) {
        direction = "right"
    }

    if (direction == "up") {
        snakey -= 5;
    }

    if (direction == "down") {
        snakey += 5;
    }

    if (direction == "left") {
        snakex -= 5;
    }

    if (direction == "right") {
        snakex += 5;
    }

    if (snakex > 855) {
        snakex = 855
        reset()
    }

    if (snakex < 0) {
        snakex = 0
        reset()
    }

    if (snakey > 855) {
        snakey = 855
        reset()
    }

    if (snakey < 0) {
        snakey = 0
        reset()
    }



    if (snakex < applex + 45 && snakex + 15 > applex && snakey + 45 > appley && snakey < appley + 45) {
        applex = (Math.floor(Math.random() * (20))) * 45;
        appley = (Math.floor(Math.random() * (20))) * 45;
        score++
        
    }



    // background
    for (let y = 0; y <= 900; y += 90) {
        ctx.fillStyle = "rgb(93, 201, 38)"
        for (let x = 0; x <= 855; x += 90) {
            ctx.fillRect(x, y, 45, 45)
        }

        ctx.fillStyle = "rgb(150, 230, 110)"
        for (let x = 45; x <= 900; x += 90) {
            ctx.fillRect(x, y, 45, 45)
        }
    }

    for (let y = 45; y <= 855; y += 90) {
        ctx.fillStyle = "rgb(93, 201, 38)"
        for (let x = 45; x <= 900; x += 90) {
            ctx.fillRect(x, y, 45, 45)
        }

        ctx.fillStyle = "rgb(150, 230, 110)"
        for (let x = 0; x <= 855; x += 90) {
            ctx.fillRect(x, y, 45, 45)
        }
    }

    ctx.fillStyle = "white"
    ctx.fillRect(0, 900, 900, 45)

    // draw square
    ctx.fillStyle = "rgb(58, 135, 242)"
    ctx.fillRect(snakex, snakey, 45, 45)

    // draw apple
    ctx.fillStyle = "red"
    ctx.fillRect(applex, appley, 45, 45)

    // draw score
    ctx.fillStyle = "red"
    ctx.fillRect(7, 907, 30, 30)

    ctx.font = "50px Arial"
    ctx.fillStyle = "black"
    ctx.fillText(score, 45, 940)




    requestAnimationFrame(loop);
}

document.addEventListener("keydown", keydownHandler)

function keydownHandler(event) {
    if (event.code === "KeyW" && direction !== "down") {
        lastKeyPressed = "W";
    } if (event.code === "KeyA" && direction !== "right") {
        lastKeyPressed = "A";
    } if (event.code === "KeyS" && direction !== "up") {
        lastKeyPressed = "S";
    } if (event.code === "KeyD" && direction !== "left") {
        lastKeyPressed = "D";
    }
}

function reset() {
    snakex = 90;
    snakey = 405;
    applex = 450;
    appley = 405;
    score = 0
    direction = "stop"
    lastKeyPressed = "none"
}