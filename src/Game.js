import TileMap from "./TileMap.js";

const tileSize = 32;
const velocity = 2;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity);
const enemies = tileMap.getEnemies(velocity);

let gameOver = false;
let gameWin = false;

const gameOverSound = new Audio("sounds/gameOver.wav");
const gameWinSound = new Audio("sounds/gameWin.wav");

function gameLoop() {
  tileMap.draw(ctx);
  drawGameEnd();
  pacman.draw(ctx, pause(), enemies);
  enemies.forEach((enemy) => enemy.draw(ctx, pause(), pacman));
  checkGameOver();
  checkGameWin();
}

function checkGameWin() {
  if (!gameWin) {
    gameWin = tileMap.didWin();
    if (gameWin) {
      gameWinSound.play();
    }
  }
}

function checkGameOver() {
  if (!gameOver) {
    gameOver = isGameOver();
    if (gameOver) {
      gameOverSound.play();
    }
  }
}

function isGameOver() {
  return enemies.some(
    (enemy) => !pacman.powerDotActive && enemy.collideWith(pacman)
  );
}

function pause() {
  return !pacman.madeFirstMove || gameOver || gameWin;
}

function drawGameEnd() {
  if (gameOver || gameWin) {
    let text = " You Win!";
    if (gameOver) {
      text = "Game Over";
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, canvas.height / 3.2, canvas.width, 80);

    ctx.font = "75px Arcade Classic sans-serif;";
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");

    ctx.fillStyle = gradient;
    ctx.fillText(text, 10, canvas.height / 2);
  }
}

tileMap.setCanvasSize(canvas);

// добавить реализацию уровней сложности и в зависимости от того какая кнопка выбрана, передавать то или иное велью в код джс и генерить ту или иную карту

// Первый уровень
const firstLevelButton = document.getElementById("FirstLvlBtn");
firstLevelButton.addEventListener("click", function () {
  alert("Выбран первый уровень");
});

// Второй уровень
const secondLevelButton = document.getElementById("SecondLvlBtn");
secondLevelButton.addEventListener("click", function () {
  alert("Выбран второй уровень");
});

// Третий уровень
const thirdLevelButton = document.getElementById("ThirdLvlBtn");
thirdLevelButton.addEventListener("click", function () {
  alert("Выбран третий уровень");
});

// Четвертый уровень
const forthLevelButton = document.getElementById("FourthLvlBtn");
forthLevelButton.addEventListener("click", function () {
  alert("Выбран четвертый уровень");
});

// Запуск игры
const finalButton = document.getElementById("startGameBtn");
finalButton.addEventListener("click", function () {
  setInterval(gameLoop, 1000 / 75);
});