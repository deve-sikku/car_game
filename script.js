const sideLeft = document.querySelector(".sideLeft");
const sideRight = document.querySelector(".sideRight");
const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

let player = { speed: 6, score: 0 };
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  e.preventDefault();
  keys[e.key] = false;
});

const isCollide = (a, b) => {
  aReact = a.getBoundingClientRect();
  bReact = b.getBoundingClientRect();

  return !(
    aReact.bottom < bReact.top ||
    aReact.top > bReact.bottom ||
    aReact.right < bReact.left ||
    aReact.left > bReact.right
  );
};

const moveLines = () => {
  let line = document.querySelectorAll(".line");

  line.forEach((item) => {
    if (item.y >= 620) {
      item.y -= 700;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
};

const endGame = () => {
  player.start = false;
  startScreen.classList.remove("hide");
  sideLeft.innerHTML = "";
  sideRight.innerHTML = "";
  startScreen.innerHTML = `game over your <br> final score is ${player.score++} <br> press the hare restart the game`;
};

const enemyMove = (car) => {
  let enemy = document.querySelectorAll(".enemy");

  enemy.forEach((item) => {
    if (isCollide(car, item)) {
      endGame();
    }

    if (item.y >= 650) {
      item.y = -300;
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }
    item.y += 8;
    item.style.top = item.y + "px";
  });
};

const treeleftMove = () => {
  let treeleft = document.querySelectorAll(".treeleft");

  treeleft.forEach((item) => {
    if (item.y >= 650) {
      item.y = -200;
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }
    item.y += 6;
    item.style.top = item.y + "px";
  });
};

const treerigtmove = () => {
  let treeRight = document.querySelectorAll(".treeRight");

  treeRight.forEach((item) => {
    if (item.y >= 650) {
      item.y = -200;
      item.style.right = Math.floor(Math.random() * 350) + "px";
    }
    item.y += 6;
    item.style.top = item.y + "px";
  });
};

const gamePlay = () => {
  let car = document.querySelector(".car");
  let roud = gameArea.getBoundingClientRect();

  if (player.start) {
    moveLines();
    enemyMove(car);
    treeleftMove();
    treerigtmove();

    if (keys.ArrowUp && player.y > roud.top + 70) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < roud.bottom - 70) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < roud.width - 50) {
      player.x += player.speed;
    }

    car.style.top = player.y + "px";
    car.style.left = player.x + "px";

    window.requestAnimationFrame(gamePlay);

    player.score++;
    let ps = player.score - 1;
    score.innerHTML = `Score : ${ps}`;
  }
};

startScreen.addEventListener("click", () => {
  gameArea.innerHTML = "";
  startScreen.classList.add("hide");

  for (x = 0; x < 5; x++) {
    let roadLine = document.createElement("div");
    roadLine.setAttribute("class", "line");
    roadLine.y = x * 138;
    roadLine.style.top = roadLine.y + "px";
    gameArea.appendChild(roadLine);
  }

  player.start = true;
  player.score = 0;
  window.requestAnimationFrame(gamePlay);

  let car = document.createElement("div");
  car.setAttribute("class", "car");
  gameArea.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  for (x = 0; x < 3; x++) {
    let enemyCar = document.createElement("div");
    enemyCar.setAttribute("class", "enemy");
    enemyCar.y = (x + 1) * 350 * -1;
    enemyCar.style.top = enemyCar.y + "px";
    enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
    gameArea.appendChild(enemyCar);
  }

  for (x = 0; x < 4; x++) {
    let leftTree = document.createElement("div");
    leftTree.setAttribute("class", "treeleft");
    leftTree.y = (x + 1) * 250 * -1;
    leftTree.style.top = leftTree.y + "px";
    leftTree.style.left = Math.floor(Math.random() * 250) + "px";
    sideLeft.appendChild(leftTree);
  }

  for (x = 0; x < 4; x++) {
    let rightTree = document.createElement("div");
    rightTree.setAttribute("class", "treeRight");
    rightTree.y = (x + 1) * 250 * -1;
    rightTree.style.top = rightTree.y + "px";
    rightTree.style.right = Math.floor(Math.random() * 250) + "px";
    sideRight.appendChild(rightTree);
  }
});
