const bord = document.getElementById("bord");
document.getElementById("btn").onclick = () => {
  poly = [];
  getPoly();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);
  drawPoly();
};

const width = 800;
const height = 800;
const ctx = bord.getContext("2d");
const canvas = ctx.canvas;
canvas.width = width;
canvas.height = height;

const sides = 100;

let poly = [];
function getPoly() {
  for (let i = 0; i < sides; i++) {
    poly.push(Math.round(Math.random() * 200) + i * 5);
    poly.push(Math.round(Math.random() * 200) + i * 5);
  }
}
getPoly();

function drawPoly() {
  ctx.fillStyle = "black";

  ctx.beginPath();
  ctx.moveTo(poly[0], poly[1]);
  for (let item = 2; item < poly.length - 1; item += 2) {
    ctx.lineTo(poly[item], poly[item + 1]);
  }

  ctx.closePath();
  ctx.fill();
}
drawPoly();
