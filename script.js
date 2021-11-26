// snake game by Will 

let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 900;
cnv.height = 1000;

let squarex = 90;
let squarey = 405;
let direction;
let wPressed = false;
let aPressed = false;
let sPressed = false;
let dPressed = false;
let remainder;
let lastKeyPressed;
let score = 0;
let applex = 450
let appley = 405

requestAnimationFrame(loop);
function loop() {
    // movement
    if (lastKeyPressed == "W" || lastKeyPressed == "S") {
        remainder = squarex % 45;
    } else {
        remainder = squarey % 45;
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
        squarey -= 5;
    }

    if (direction == "down") {
        squarey += 5;
    }

    if (direction == "left") {
        squarex -= 5;
    }

    if (direction == "right") {
        squarex += 5;
    }

    if (squarex < applex + 45 && squarex + 15 > applex && squarey + 45 > appley && squarey < appley + 45) {
        applex += 45
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
    ctx.fillRect(0, 955, 900, 50)

    // draw square
    ctx.fillStyle = "rgb(58, 135, 242)"
    ctx.fillRect(squarex, squarey, 45, 45)

    // draw apple
    ctx.fillStyle = "red"
    ctx.fillRect(applex, appley, 45, 45)

    // draw score
    ctx.fillStyle = "red"
    ctx.fillRect(7, 957, 30, 30)

    ctx.font = "55px Arial"
    ctx.fillStyle = "black"
    ctx.fillText(score, 45, 992)
    



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

// function keydownHandler(event) {
//     if (event.code === "KeyW") {
//         wPressed = true;
//     } if (event.code === "KeyA") {
//         aPressed = true;
//     } if (event.code === "KeyS") {
//         sPressed = true;
//     } if (event.code === "KeyD") {
//         dPressed = true;
//     }
// }

// function keyupHandler(event) {
//     if (event.code === "KeyW") {
//         wPressed = false;
//     } if (event.code === "KeyA") {
//         aPressed = false;
//     } if (event.code === "KeyS") {
//         sPressed = false;
//     } if (event.code === "KeyD")
//         dPressed = false;
// }