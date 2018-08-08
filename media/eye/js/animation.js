'use strict';

const eye = document.querySelector('.big-book__eye');
const pupil = document.querySelector('.big-book__pupil');

const eyeCoords = eye.getBoundingClientRect();
const leftDist = eyeCoords.left;
const rightDist = document.documentElement.clientWidth - eyeCoords.right;
const topDist = eyeCoords.top;
const bottomDist = document.documentElement.clientHeight - eyeCoords.bottom;

const mouseCoords = {x: 0, y: 0};
let kx = 3;
let ky = 3;
let timer;

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
