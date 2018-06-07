'use strict';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const colors = ['#ffffff', '#ffe9c4', '#d4fbff'];

document.addEventListener('DOMContentLoaded', generateSky);
canvas.addEventListener('click', generateSky);

function randomValue(min, max) {
  return Math.random() * (max - min) + min;
}

function createStar() {
  const x = Math.floor(randomValue(0, canvas.width + 1));
  const y = Math.floor(randomValue(0, canvas.height + 1));
  const r = randomValue(-1.1, 0) + 1.1; // чтобы в диапазон входило значение 1.1 и не входил 0
  ctx.beginPath();
  ctx.fillStyle = colors[Math.floor(Math.random() * 3)];
  ctx.globalAlpha = Math.floor(randomValue(8, 11)) / 10; // Яркость звезды – случайная в диапазоне от `0.8` до `1`
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
}

function generateSky() {
  canvas.style.backgroundColor = '#000000';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const stars = Math.floor(randomValue(200, 401));
  for (let i = 0; i < stars; i++) {
    createStar();	
  }
}
