let canvas = document.querySelector("#snake");
let context = canvas.getContext("2d");

let score = 0;
let box = 32;
let hiscoreval;
//back ground
const ground = new Image();
ground.src = "./img/groundAmir.png";

//img food
const foodImage = new Image();
foodImage.src = "./img/food.png";
// food star
const starImage = new Image();
starImage.src = "./img/star2.png";

//audio

const left = new Audio();
const right = new Audio();
const up = new Audio();
const down = new Audio();
const eat = new Audio();
const musicGame = new Audio("./audio/music.mp3");
const gameOver = new Audio();

// audio address
left.src = "./audio/left.mp3";
right.src = "./audio/right.mp3";
up.src = "./audio/up.mp3";
down.src = "./audio/down.mp3";
eat.src = "./audio/eat.mp3";

gameOver.src = "./audio/dead.mp3";

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

let food2 = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};
//

//
let d;
document.addEventListener("keydown", direction);
function direction(e) {
  if (e.keyCode == 37 && d !== "right") {
    d = "left";
    left.play();
  } else if (e.keyCode == 38 && d !== "down") {
    d = "up";
    up.play();
  } else if (e.keyCode == 39 && d !== "left") {
    d = "right";
    right.play();
  } else if (e.keyCode == 40 && d !== "up") {
    d = "down";
    down.play();
  }
}
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].x == head.x && array[i].y == head.y) {
      return true;
    }
  }
}

//show map game
function draw() {
  context.drawImage(ground, 0, 0);
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "#665E5C";
    context.fillRect(snake[i].x, snake[i].y, box, box);

    // context.strokeStyle = "red";
    // context.strokeRect(snake[i].x, snake[i].y, box, box);
  }
  context.drawImage(foodImage, food.x, food.y, box / 1.2, box / 1.2);
  musicGame.play();

  //score
  context.fillStyle = "white";
  context.font = "45px sans-serif";
  context.fillText(score, 2.5 * box, 1.7 * box);

  context.fillStyle = "white";
  context.font = "30px sans-serif";
  context.fillText("Highest Score", 13 * box, 1 * box);

  // local storage

  let hiscore = localStorage.getItem("hiscore");
  if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
  } else {
    hiscoreval = JSON.parse(hiscore);
    context.fillText(hiscoreval, 15.2 * box, 2.5 * box);
  }

  //Score ceiling

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (d == "right") snakeX += box;
  if (d == "left") snakeX -= box;
  if (d == "up") snakeY -= box;
  if (d == "down") snakeY += box;
  //
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  bigApple(snakeX, snakeY);

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    eat.play();

    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      context.fillStyle = "white";
      context.font = "45px sans-serif";
      context.fillText(hiscoreval, 15.2 * box, 2.5 * box);
    }

    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    snake.pop();
  }
  //

  //
  if (
    snakeX < box ||
    snakeX > box * 17 ||
    snakeY < box * 3 ||
    snakeY > box * 17 ||
    collision(newHead, snake)
  ) {
    clearInterval(intervalDraw);
    // musicGame.pause();
    gameOver.play();
    setTimeout(() => {
      confirm("GAME OVER . Press any key to play again!");
      window.location.reload();
      musicGame.play();
    }, 1000);
  }

  //

  snake.unshift(newHead);

  function bigApple(snakeX, snakeY) {
    context.drawImage(starImage, food2.x, food2.y, box, box);

    if (snakeX == food2.x && snakeY == food2.y) {
      score += 2;
      //

      for (let i = 0; i < snake.length; i += 100) {
        snake.length++;

        context.fillStyle = "#665E5C";
        context.fillRect(snake[i].x, snake[i].y, box, box);
      }

      //

      if (score > hiscoreval) {
        hiscoreval = score;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
        context.fillStyle = "white";
        context.font = "45px sans-serif";
        context.fillText(hiscoreval, 15.2 * box, 2.5 * box);
      }
      eat.play();
      food2 = {
        x: Math.floor(Math.random() * 16 + 1) * box,
        y: Math.floor(Math.random() * 14 + 3) * box,
      };
    } else {
      snake.shift();
    }
  }

  snake.unshift(newHead);
}

let intervalDraw = setInterval(draw, 100);
