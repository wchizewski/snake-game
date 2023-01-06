// snake game by Will

let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 900;
cnv.height = 945;

document.addEventListener("keydown", keydownHandler);

function keydownHandler(event) {
  lastKeyPressed = event.key;
}

let remainder;
let lastKeyPressed;
let score = 0;
let applex = 135;
let appley = 405;
let snakeBody = [];

let directions = {
  left: [-1, 0],
  right: [1, 0],
  up: [0, -1],
  down: [0, 1],
  none: [0, 0],
};

let snakeHead = {
  x: 90,
  y: 405,
  direction: "none",
  speed: 45 / 10,

  move() {
    const direction = directions[this.direction];

    this.x += direction[0] * this.speed;
    this.y += direction[1] * this.speed;

    remainder = (this.x % 45) + (this.y % 45);
  },

  changeDirection() {
    if (remainder != 0) return;

    if (lastKeyPressed == "w" && this.direction != "down" && remainder == 0) {
      this.direction = "up";
    }

    if (lastKeyPressed == "s" && this.direction != "up" && remainder == 0) {
      this.direction = "down";
    }

    if (lastKeyPressed == "a" && this.direction != "right" && remainder == 0) {
      this.direction = "left";
    }

    if (lastKeyPressed == "d" && this.direction != "left" && remainder == 0) {
      this.direction = "right";
    }
  },
};

class SnakeSegment {
  constructor(x, y, index, direction) {
    this.x = x;
    this.y = y;
    this.index = index;
    this.direction = direction;
  }

  move() {
    const direction = directions[this.direction];

    this.x += direction[0] * snakeHead.speed;
    this.y += direction[1] * snakeHead.speed;
  }

  changeDirection() {
    if (remainder != 0) return;

    let lastDirection;
    if (snakeBody[this.index - 1]) {
      lastDirection = snakeBody[this.index - 1].direction;
    } else {
      lastDirection = snakeHead.direction;
    }

    this.direction = lastDirection;
  }
}

function reset() {
  snakeHead.x = 90;
  snakeHead.y = 405;
  snakeBody = [];
  applex = 450;
  appley = 405;
  score = 0;
  snakeHead.direction = "none";
  lastKeyPressed = "none";
}

function checkCollision() {
  if (snakeHead.x > 855) {
    snakeHead.x = 855;
    reset();
  }

  if (snakeHead.x < 0) {
    snakeHead.x = 0;
    reset();
  }

  if (snakeHead.y > 855) {
    snakeHead.y = 855;
    reset();
  }

  if (snakeHead.y < 0) {
    snakeHead.y = 0;
    reset();
  }

  for (let i = 3; i < snakeBody.length; i++) {
    let check1 = snakeHead.x + 45 > snakeBody[i].x;
    let check2 = snakeHead.x < snakeBody[i].x + 45;
    let check3 = snakeHead.y + 45 > snakeBody[i].y;
    let check4 = snakeHead.y < snakeBody[i].y + 45;

    if (check1 && check2 && check3 && check4) {
      reset();
    }
  }

  if (
    snakeHead.x < applex + 45 &&
    snakeHead.x + 15 > applex &&
    snakeHead.y + 45 > appley &&
    snakeHead.y < appley + 45
  ) {
    moveApple();

    function moveApple() {
      let wholeSnake = [...snakeBody, snakeHead];

      applex = Math.floor(Math.random() * 20) * 45;
      appley = Math.floor(Math.random() * 20) * 45;

      for (let i = 0; i < wholeSnake.length; i++) {
        let check1 = applex + 45 > wholeSnake[i].x;
        let check2 = applex < wholeSnake[i].x + 45;
        let check3 = appley + 45 > wholeSnake[i].y;
        let check4 = appley < wholeSnake[i].y + 45;

        if (check1 && check2 && check3 && check4) {
          return moveApple();
        }
      }
    }

    score++;

    let lastSegment = snakeBody[snakeBody.length - 1] || snakeHead;
    const direction = directions[lastSegment.direction];

    snakeBody.push(
      new SnakeSegment(
        lastSegment.x - 45 * direction[0],
        lastSegment.y - 45 * direction[1],
        snakeBody.length,
        lastSegment.direction
      )
    );
  }
}

function drawGrid() {
  // background
  for (let y = 0; y <= 900; y += 90) {
    ctx.fillStyle = "rgb(93, 201, 38)";
    for (let x = 0; x <= 855; x += 90) {
      ctx.fillRect(x, y, 45, 45);
    }

    ctx.fillStyle = "rgb(150, 230, 110)";
    for (let x = 45; x <= 900; x += 90) {
      ctx.fillRect(x, y, 45, 45);
    }
  }

  for (let y = 45; y <= 855; y += 90) {
    ctx.fillStyle = "rgb(93, 201, 38)";
    for (let x = 45; x <= 900; x += 90) {
      ctx.fillRect(x, y, 45, 45);
    }

    ctx.fillStyle = "rgb(150, 230, 110)";
    for (let x = 0; x <= 855; x += 90) {
      ctx.fillRect(x, y, 45, 45);
    }
  }
}

requestAnimationFrame(loop);
function loop() {
  checkCollision();

  for (let i = snakeBody.length - 1; i >= 0; i--) {
    snakeBody[i].changeDirection();
  }
  snakeHead.changeDirection();

  snakeHead.move();
  for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].move();
  }

  drawGrid();

  ctx.fillStyle = "white";
  ctx.fillRect(0, 900, 900, 45);

  // draw snakeBody
  for (let i = 0; i < snakeBody.length; i++) {
    ctx.fillStyle = "rgb(58, 135, 242)";
    ctx.fillRect(snakeBody[i].x, snakeBody[i].y, 45, 45);
  }

  // draw snakeHead
  ctx.fillStyle = "rgb(58, 135, 242)";
  ctx.fillRect(snakeHead.x, snakeHead.y, 45, 45);

  // draw apple
  ctx.fillStyle = "red";
  ctx.fillRect(applex, appley, 45, 45);

  // draw score
  ctx.fillStyle = "red";
  ctx.fillRect(7, 907, 30, 30);

  ctx.font = "50px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(score, 45, 940);

  requestAnimationFrame(loop);
}
