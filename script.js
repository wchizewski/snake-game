// snake game by Will 

let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 900;
cnv.height = 900;

let squarex = 0;
let squarey = 405;
let direction;
let wPressed = false;
let aPressed = false;
let sPressed = false;
let dPressed = false;


requestAnimationFrame(loop);
function loop() {
    // movement
    if (wPressed && direction !== "down") {
        direction = "up";
    } 
    
    if (sPressed && direction !== "up") {
        direction = "down";
    }

    if (aPressed && direction !== "right") {
        direction = "left"
    }

    if (dPressed && direction !== "left") {
        direction = "right"
    }

    if (direction == "up") {
        squarey -= 4;
    }

    if (direction == "down") {
        squarey += 4;
    }

    if (direction == "left") {
        squarex -= 4;
    }

    if (direction == "right") {
        squarex += 4;
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


    ctx.fillStyle = "rgb(58, 135, 242)"
    ctx.fillRect(squarex, squarey, 45, 45)

    requestAnimationFrame(loop);
}

document.addEventListener("keydown", keydownHandler)
document.addEventListener("keyup", keyupHandler)

function keydownHandler(event) {
    if (event.code === "KeyW") {
        wPressed = true;
    } if (event.code === "KeyA") {
        aPressed = true;
    } if (event.code === "KeyS") {
        sPressed = true;
    } if (event.code === "KeyD") {
        dPressed = true;
    }
}

function keyupHandler(event) {
    if (event.code === "KeyW") {
        wPressed = false;
    } if (event.code === "KeyA") {
        aPressed = false;
    } if (event.code === "KeyS") {
        sPressed = false;
    } if (event.code === "KeyD")
        dPressed = false;
}