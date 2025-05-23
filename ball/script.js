const canvas = document.getElementById("canvas");
// context = canvas.getContext("2d");
// let width = canvas.width;
// let height = canvas.height;
let intervalId;
const n = 10;
let colors = ["Red", "Orange", "Yellow", "Green","Blue", "Purple"];

class Ball {
  constructor(canvas, x = 100, y = 100) {
    this.context = canvas.getContext("2d");
    this.x = x;
    this.y = x;
    this.width = canvas.width;
    this.height = canvas.height;
    this.xSpeed = Math.floor(Math.random() * 10);
    this.ySpeed = Math.floor(Math.random() * 10);
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  circle(x, y, radius = 5) {
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, Math.PI * 2, true);
    this.context.fill();
  }

  draw() {
    this.context.fillStyle = this.color;
    this.circle(this.x, this.y);
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  checkCollision() {
    if (this.x <= 0 || this.x >= this.width) {
      this.xSpeed = -this.xSpeed;
    }
    if (this.y <= 0 || this.y >= this.height) {
      this.ySpeed = -this.ySpeed;
    }
  }
}

class BallsGame {
  constructor(balls, canvas) {
    this.context = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.balls = balls;
  }

  drawBorder() {
    this.context.strokeStyle = "grey";
    this.context.lineWidth = 3;
    this.context.strokeRect(0, 0, this.width, this.height);
  }

  go() {
    this.context.clearRect(0, 0, this.width, this.height);
    //console.log(balls.length);
    //   ball.draw();
    //   ball.move();
    for (let i = 0; i < this.balls.length; i++) {
      this.balls[i].draw();
      this.balls[i].move();
      this.balls[i].checkCollision();
    }
    this.drawBorder();
  }

  start() {
    intervalId = setInterval(this.go.bind(this), 30);
  }
}

function generateBalls(){
    clearInterval(intervalId);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const n = parseInt(document.getElementById('ballCount').value)
    const balls = [];
    for (let i = 0; i < n; i++) {
      balls[i] = new Ball(canvas);
    }
    
    
    let ballsGame = new BallsGame(balls, canvas);
    ballsGame.drawBorder();
    
    ballsGame.start();
}
