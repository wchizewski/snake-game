// snake game by Will 

let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 900;
cnv.height = 945;

let remainder;
let lastKeyPressed;
let score = 0;
let applex = 450;
let appley = 405;
let snakeHead = {
    x: 90,
    y: 405,
    speed: 5,

    move() {
        this.y += this.vy
        this.x += this.vx
    },

    changeDirection() {
        if (lastKeyPressed == "w" || lastKeyPressed == "s") {
            remainder = this.x % 45;
        } else {
            remainder = this.y % 45;
        }
    
        if (lastKeyPressed == "w" && this.direction != 'down' && remainder == 0) {
            this.vy = this.speed
        }
    
        if (lastKeyPressed == "s" && this.direction != 'up' && remainder == 0) {
            this.vy = -this.speed
        }
    
        if (lastKeyPressed == "a" && this.direction != 'right' && remainder == 0) {
            this.vx = -this.speed
        }
    
        if (lastKeyPressed == "d" && this.direction != 'left' && remainder == 0) {
            this.vx = this.speed
        }
    }
}

class SnakeSegment {
    constructor(x, y, index, direction) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.direction = direction;
    }

    move() {
        if (this.direction == "up") {
            this.y -= 5;
        }
    
        if (this.direction == "down") {
            this.y += 5;
        }
    
        if (this.direction == "left") {
            this.x -= 5;
        }
    
        if (this.direction == "right") {
            this.x += 5;
        }
    }

    changeDirection() {
        let lastDirection = snakeBody[this.index - 1] ? snakeBody[this.index - 1].direction : snakeHead.direction

        if (lastDirection == "up" && this.direction != 'down' && remainder == 0) {
            this.direction = "up";
        }
    
        if (lastDirection == "down" && this.direction != 'up' && remainder == 0) {
            this.direction = "down";
        }
    
        if (lastDirection == "left" && this.direction != 'right' && remainder == 0) {
            this.direction = "left"
        }
    
        if (lastDirection == "right" && this.direction != 'left' && remainder == 0) {
            this.direction = "right"
        }
    }
}

let snakeBody = []

document.addEventListener("keydown", keydownHandler)

function keydownHandler(event) {
    lastKeyPressed = event.key;
}

function reset() {
    snakeHead.x = 90;
    snakeHead.y = 405;
    applex = 450;
    appley = 405;
    score = 0
    snakeHead.direction = "stop"
    lastKeyPressed = "none"
}

function checkCollision() {
    if (snakeHead.x > 855) {
        snakeHead.x = 855
        reset()
    }

    if (snakeHead.x < 0) {
        snakeHead.x = 0
        reset()
    }

    if (snakeHead.y > 855) {
        snakeHead.y = 855
        reset()
    }

    if (snakeHead.y < 0) {
        snakeHead.y = 0
        reset()
    }

    if (snakeHead.x < applex + 45 && snakeHead.x + 15 > applex && snakeHead.y + 45 > appley && snakeHead.y < appley + 45) {
        applex = (Math.floor(Math.random() * (20))) * 45;
        appley = (Math.floor(Math.random() * (20))) * 45;
        score++;

        let lastSegment = snakeBody[snakeBody.length - 1] || snakeHead;
        snakeBody.push(new SnakeSegment(lastSegment.x, lastSegment.y, snakeBody.length - 1, lastSegment.direction))
    }
}

function drawGrid() {
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
}

requestAnimationFrame(loop);
function loop() {
    checkCollision()

    snakeHead.changeDirection()
    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].changeDirection()
    }

    snakeHead.move()
    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].move()
    }

    drawGrid()

    ctx.fillStyle = "white"
    ctx.fillRect(0, 900, 900, 45)

    // draw snakeBody
    for (let i = 0; i < snakeBody.length; i++) {
        ctx.fillStyle = "rgb(58, 135, 242)"
        ctx.fillRect(snakeBody[i].x, snakeBody[i].y, 45, 45)
    }

    // draw snakeHead
    ctx.fillStyle = "rgb(58, 135, 242)"
    ctx.fillRect(snakeHead.x, snakeHead.y, 45, 45)

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