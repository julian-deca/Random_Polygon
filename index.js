const bord = document.getElementById("bord");
document.getElementById("btn").onclick = () => {
  dots = [];
  tempdots = [];
  dotNum = 6;
  isDragingdot = false;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);
  getDots();
  drawdots(dots);
};

const width = 800;
const height = 800;
const ctx = bord.getContext("2d");
const canvas = ctx.canvas;
canvas.width = width;
canvas.height = height;

let dots = [];
let tempdots = [];
let dotNum = 6;
let isDragingdot = false;
class Dot {
  constructor(radius = 10, color = "red") {
    this.radius = radius;
    this.color = color;
  }
}

function getDots() {
  while (dotNum--) {
    let dot = new Dot(
      10,
      "#" + Math.floor(Math.random() * 16777215).toString(16)
    );
    dot.x = Math.random() * width;
    dot.y = Math.random() * height;
    tempdots.push(dot);
  }

  tempdots = tempdots.sort((dotA, dotB) => {
    return dotA.x - dotB.x;
  });

  let firstdot = tempdots[0],
    lastdot = tempdots[tempdots.length - 1];
  let smallXdots = tempdots.filter((dot) => dot.x === firstdot.x),
    bigXdots = tempdots.filter((dot) => dot.x === lastdot.x);

  if (smallXdots.length > 1) {
    smallXdots.sort((dotA, dotB) => {
      return dotB.y - dotA.y;
    });
  }
  if (bigXdots.length > 1) {
    bigXdots.sort((dotA, dotB) => {
      return dotB.y - dotA.y;
    });
  }

  firstdot = smallXdots[0];
  lastdot = bigXdots[0];

  let splitLineAngle = Math.atan2(
    lastdot.y - firstdot.y,
    lastdot.x - firstdot.x
  );
  let upperdots = [],
    lowerdots = [];

  tempdots.forEach((dot) => {
    if (dot === firstdot || dot === lastdot) {
      return false;
    }
    let angle = Math.atan2(dot.y - firstdot.y, dot.x - firstdot.x);
    if (angle > splitLineAngle) {
      lowerdots.push(dot);
    } else {
      upperdots.push(dot);
    }
  });

  lowerdots = lowerdots.sort((dotA, dotB) => {
    if (dotA.x !== dotB.x) {
      return dotA.x - dotB.x;
    }
    return dotB.y - dotA.y;
  });

  upperdots = upperdots.sort((dotA, dotB) => {
    if (dotA.x !== dotB.x) {
      return dotB.x - dotA.x;
    }
    return dotB.y - dotB.x;
  });

  dots = [firstdot].concat(lowerdots, [lastdot], upperdots);

  dots = dots.map((dot, i) => {
    dot.text = i + 1;
    return dot;
  });
  ctx.fillStyle = dots[0].color;
}

function drawdots(dots) {
  console.log(dots);
  ctx.beginPath();
  ctx.moveTo(dots[0].x, dots[0].y);
  for (let i = 1; i < dots.length - 1; i++) {
    ctx.lineTo(dots[i].x, dots[i].y);
  }

  ctx.closePath();
  ctx.fill();
}
getDots();
drawdots(dots);
