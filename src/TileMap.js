import Pacman from "./Pacman.js";
import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";

// Левел чекер, для того, чтобы передавать уровень и выбирать нужную нам мапу
let lvlChecker = false;

// Обработчик событий если нажали ту или иную кнопку подгружаем тот или иной файл
// if (window.location.pathname.endsWith("menu.html")) {
//   lvlChecker = true;
//   let firstLvlBtn = document.getElementById("FirstLvlBtn");
//   let secondLvlBtn = document.getElementById("SecondLvlBtn");
//   let thirdLvlBtn = document.getElementById("ThirdLvlBtn");
//   let fourthdLvlBtn = document.getElementById("FourthLvlBtn");
//   let mapNumber = 0;

//   firstLvlBtn.addEventListener("click", function () {
//     alert("First button was pressed");
//     mapNumber = 1;
//   });
//   secondLvlBtn.addEventListener("click", function () {
//     alert("Second button was pressed");
//     mapNumber = 2;
//   });
//   thirdLvlBtn.addEventListener("click", function () {
//     alert("Third button was pressed");
//     mapNumber = 3;
//   });
//   fourthdLvlBtn.addEventListener("click", function () {
//     alert("Fourth button was pressed");
//     mapNumber = 4;
//   });
//   //
// }

export default class TileMap {
  constructor(tileSize) {
    this.tileSize = tileSize;

    this.yellowDot = new Image();
    this.yellowDot.src = "images/yellowDot.png";

    this.pinkDot = new Image();
    this.pinkDot.src = "images/pinkDot.png";

    this.wall = new Image();
    this.wall.src = "images/wall.png";

    this.powerDot = this.pinkDot;
    this.powerDotAnmationTimerDefault = 30;
    this.powerDotAnmationTimer = this.powerDotAnmationTimerDefault;
  }

  //1 - wall
  //0 - dots
  //4 - pacman
  //5 - empty space
  //6 - enemy
  //7 - power dot
  // if (lvlChecker === true){
  //   alert("qwer");
  // }
  maps = {
    1: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 7, 4, 0, 0, 7, 0, 0, 0, 7, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 6, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 7, 1, 1, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 6, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    2: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 7, 0, 0, 4, 0, 0, 1, 0, 0, 0, 7, 1],
      [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 6, 0, 1, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 7, 1, 1, 1, 0, 1, 7, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 6, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    3: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 7, 0, 1, 0, 0, 4, 0, 1, 0, 7, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 6, 0, 1, 0, 1, 0, 0, 1, 6, 1],
      [1, 0, 1, 7, 1, 1, 1, 1, 1, 7, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 6, 1, 6, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1],
      [1, 6, 0, 0, 0, 1, 0, 0, 0, 0, 0, 6, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    4: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 7, 0, 1, 0, 1, 4, 1, 0, 1, 7, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 6, 0, 6, 0, 1, 0, 6, 1, 6, 1],
      [1, 0, 1, 7, 1, 1, 1, 1, 1, 7, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 6, 1, 0, 1, 6, 1, 6, 1, 0, 1, 6, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 6, 1, 0, 1, 0, 1, 0, 0, 1, 1, 6, 1],
      [1, 6, 0, 0, 0, 1, 0, 6, 0, 0, 0, 6, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  };

  draw(ctx) {
    // if (mapNumber == 1) map = map1;
    // if (mapNumber == 2) map = map2;
    // if (mapNumber == 3) map = map3;
    // if (mapNumber == 4) map = map4;
    for (let row = 0; row < this.maps[1].length; row++) {
      for (let column = 0; column < this.maps[1][row].length; column++) {
        let tile = this.maps[1][row][column];
        if (tile === 1) {
          this.#drawWall(ctx, column, row, this.tileSize);
        } else if (tile === 0) {
          this.#drawDot(ctx, column, row, this.tileSize);
        } else if (tile == 7) {
          this.#drawPowerDot(ctx, column, row, this.tileSize);
        } else {
          this.#drawBlank(ctx, column, row, this.tileSize);
        }
      }
    }
  }

  #drawDot(ctx, column, row, size) {
    ctx.drawImage(
      this.yellowDot,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }

  #drawPowerDot(ctx, column, row, size) {
    this.powerDotAnmationTimer--;
    if (this.powerDotAnmationTimer === 0) {
      this.powerDotAnmationTimer = this.powerDotAnmationTimerDefault;
      if (this.powerDot == this.pinkDot) {
        this.powerDot = this.yellowDot;
      } else {
        this.powerDot = this.pinkDot;
      }
    }
    ctx.drawImage(this.powerDot, column * size, row * size, size, size);
  }

  #drawWall(ctx, column, row, size) {
    ctx.drawImage(
      this.wall,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }

  #drawBlank(ctx, column, row, size) {
    ctx.fillStyle = "black";
    ctx.fillRect(column * this.tileSize, row * this.tileSize, size, size);
  }

  getPacman(velocity) {
    for (let row = 0; row < this.maps[1].length; row++) {
      for (let column = 0; column < this.maps[1][row].length; column++) {
        let tile = this.maps[1][row][column];
        if (tile === 4) {
          this.maps[1][row][column] = 0;
          return new Pacman(
            column * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            velocity,
            this
          );
        }
      }
    }
  }

  getEnemies(velocity) {
    const enemies = [];

    for (let row = 0; row < this.maps[1].length; row++) {
      for (let column = 0; column < this.maps[1][row].length; column++) {
        const tile = this.maps[1][row][column];
        if (tile == 6) {
          this.maps[1][row][column] = 0;
          enemies.push(
            new Enemy(
              column * this.tileSize,
              row * this.tileSize,
              this.tileSize,
              velocity,
              this
            )
          );
        }
      }
    }
    return enemies;
  }

  setCanvasSize(canvas) {
    canvas.width = this.maps[1][0].length * this.tileSize;
    canvas.height = this.maps[1].length * this.tileSize;
  }

  didCollideWithEnvironment(x, y, direction) {
    if (direction == null) {
      return;
    }

    if (
      Number.isInteger(x / this.tileSize) &&
      Number.isInteger(y / this.tileSize)
    ) {
      let column = 0;
      let row = 0;
      let nextColumn = 0;
      let nextRow = 0;

      switch (direction) {
        case MovingDirection.right:
          nextColumn = x + this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.left:
          nextColumn = x - this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.up:
          nextRow = y - this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
        case MovingDirection.down:
          nextRow = y + this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
      }
      const tile = this.maps[1][row][column];
      if (tile === 1) {
        return true;
      }
    }
    return false;
  }

  didWin() {
    return this.#dotsLeft() === 0;
  }

  #dotsLeft() {
    return this.maps[1].flat().filter((tile) => tile === 0).length;
  }

  eatDot(x, y) {
    const row = y / this.tileSize;
    const column = x / this.tileSize;
    if (Number.isInteger(row) && Number.isInteger(column)) {
      if (this.maps[1][row][column] === 0) {
        this.maps[1][row][column] = 5;
        return true;
      }
    }
    return false;
  }

  eatPowerDot(x, y) {
    const row = y / this.tileSize;
    const column = x / this.tileSize;
    if (Number.isInteger(row) && Number.isInteger(column)) {
      const tile = this.maps[1][row][column];
      if (tile === 7) {
        this.maps[1][row][column] = 5;
        return true;
      }
    }
    return false;
  }
}
