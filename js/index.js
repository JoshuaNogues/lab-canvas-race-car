const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')


const road = new Image()
road.src = "../images/road.png"

const car = new Image()
car.src = "../images/car.png"

const startingX = canvas.width/2 - 25
const startingY = canvas.height - 125

let intervalId;
let animationId;

let score = 0

class Obstacle {

  constructor() {
    this.x = Math.random() * 700;
    this.y = 0;
    this.width = 20 + Math.floor(Math.random() * 350);
    this.height = 20;

  }

  newPosition() {
    this.y++
  }

  draw() {
    ctx.fillStyle = 'brown'
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

}

const player = {

  x: startingX,
  y: startingY,
  width: 50,
  height: 100,

  draw: function() {
    ctx.drawImage(car, this.x, this.y, this.width, this.height)
  },

  moveLeft: function() {
    this.x = this.x - 5
  },

  moveRight: function() {
    this.x = this.x + 5
  },

  moveUp: function() {
    this.y = this.y - 5
  },

  moveDown: function() {
    this.y = this.y + 5
  }
}


function checkCollision (obstacle) {

  if (player.y < obstacle.y + obstacle.height 
    && obstacle.y < player.y + player.height 
    && obstacle.x < player.x + player.width 
    & obstacle.x + obstacle.width > player.x ) {
      gameOver()
  }

}

const obstaclesArray = []

function createObstacle() {
  
  intervalId = setInterval(()=>{
    obstaclesArray.push(new Obstacle())
  }, 2000)
}

function animationLoop() {
  animationId = setInterval(()=>{
    updateCanvas()
  }, 16)
}

function updateCanvas() {

  ctx.clearRect(0,0,500,700)
  
  ctx.drawImage(road, 0, 0, 500, 700)

  player.draw()

  for (let i = 0; i < obstaclesArray.length; i++) {
    if (obstaclesArray[i].y > canvas.height) {
      obstaclesArray.splice(i, 1)
      score++
      console.log("This is the score:", score, obstaclesArray)
    }
    checkCollision(obstaclesArray[i])
    obstaclesArray[i].newPosition()
    obstaclesArray[i].draw()
  }


}


function startGame() {

  ctx.drawImage(road, 0, 0, 500, 700)
  player.draw()
  createObstacle()
  animationLoop()

}

function gameOver() {
  console.log("Game over")
  clearInterval(animationId)
  clearInterval(intervalId)
  obstaclesArray = []
  
}

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  document.addEventListener('keydown', e => {
    switch (e.keyCode) {
      case 38:
        player.moveUp();
        break;
      case 40:
        player.moveDown();
        break;
      case 37:
        player.moveLeft();
        break;
      case 39:
        player.moveRight();
        break;
    }

  });

};