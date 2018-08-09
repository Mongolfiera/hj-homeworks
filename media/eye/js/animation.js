'use strict';

const eye = document.querySelector('.big-book__eye');
const pupil = document.querySelector('.big-book__pupil');

let eyeCoords = {};
let leftDist;
let rightDist;
let topDist;
let bottomDist;

const mouseCoords = {x: 0, y: 0};
let kx = 3;
let ky = 3;
let timer;

window.addEventListener('load', init);

function init() {
  eyeCoords = eye.getBoundingClientRect();
  leftDist = eyeCoords.left;
  rightDist = document.documentElement.clientWidth - eyeCoords.right;
  topDist = eyeCoords.top;
  bottomDist = document.documentElement.clientHeight - eyeCoords.bottom;
}

document.addEventListener('mousemove', event => {
	mouseCoords.x = event.clientX;
	mouseCoords.y = event.clientY;
});


function getPupilSize() {
  if (mouseCoords.x < eyeCoords.left) {
    kx = 1 + mouseCoords.x / leftDist * 2;
  } else if (mouseCoords.x > eyeCoords.right) {
    kx = 3 - (mouseCoords.x - eyeCoords.right) / rightDist * 2;
  }
  if (mouseCoords.y < eyeCoords.top) {
    ky = 1 + mouseCoords.y / topDist * 2;
  } else if (mouseCoords.y > eyeCoords.bottom) {
    ky = 3 - (mouseCoords.y - eyeCoords.bottom) / bottomDist * 2;
  }
  return Math.sqrt(kx * kx / 2 + ky * ky / 2);
}

function tick() {
  pupil.style.setProperty('--pupil-size', getPupilSize());
  pupil.style.setProperty('--pupil-x', `${30 * (2 * mouseCoords.x + eyeCoords.width - document.documentElement.clientWidth) / document.documentElement.clientWidth}px`);
  pupil.style.setProperty('--pupil-y', `${30 * (2 * mouseCoords.y + eyeCoords.height - document.documentElement.clientHeight) / document.documentElement.clientHeight}px`);
  timer = requestAnimationFrame(tick);
}

timer = requestAnimationFrame(tick);
