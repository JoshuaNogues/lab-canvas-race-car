const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const road = new Image()
road.src = "../images/road.png"

const car = new Image()
car.src = "../images/car.png"

const startingX = canvas.width / 2 -25
const startingY = canvas.height -125

const player = {

  x: startingX,
  y: startingY,

  draw: function () {
    ctx.drawImage(car, this.x, this.y, 50, 100)
  },

  moveLeft: function () {
    this.x = this.x - 5
  },

  moveRight: function () {
    this.x = this.x + 5
  },

  moveUp: function () {
    this.y = this.y - 5
  },

  moveDown: function () {
    this.y = this.y + 5
  },
}

function updateCanvas () {
  ctx.clearRect(0,0,500,700)

  ctx.drawImage(road, 0, 0, 500, 700)
  player.draw()
}

function startGame() {
  ctx.drawImage(road, 0, 0, 500, 700)
  player.draw()
}

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  document.addEventListener('keydown', e => {
    switch (e.keyCode) {
      case 38:
        player.moveUp();
        console.log('up', player);
        break;
      case 40:
        player.moveDown();
        console.log('down', player);
        break;
      case 37:
        player.moveLeft();
        console.log('left', player);
        break;
      case 39:
        player.moveRight();
        console.log('right', player);
        break;
    }
    updateCanvas();
  });
  

};
