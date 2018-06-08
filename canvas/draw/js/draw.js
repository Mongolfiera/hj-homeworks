'use strict';
const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');

let curves;
let isDrawing;
let needsRepaint;
let lineHue;
let hueDirection;
let brushWidth;
let widthIncrease;

document.addEventListener('DOMContentLoaded', updateCansvas);
window.addEventListener('resize', updateCansvas);
canvas.addEventListener('dblclick', updateCansvas);

function updateCansvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  curves = [];
  isDrawing = false;
  needsRepaint = false;
  lineHue = 0;
  hueDirection = true;
  brushWidth = 100;
  widthIncrease = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseleave', () => {isDrawing = false; curves = [];});
canvas.addEventListener('mouseup', () => {isDrawing = false; curves = [];});
canvas.addEventListener('mousemove', draw);

function startDrawing(event) {
  const curve = [];
  isDrawing = true;
  hueDirection = !event.shiftKey;
  curve.push([event.offsetX, event.offsetY]);
  curves.push(curve);
  needsRepaint = true;
}

function draw(event) {
  if (isDrawing) {
    hueDirection = !event.shiftKey;
    const point = [event.offsetX, event.offsetY];
    curves[curves.length - 1].push(point);
    needsRepaint = true;
  }
}

function getHue() {
  if (hueDirection) {
  	return (lineHue === 359) ? lineHue = 0 : lineHue += 1;	
  } else {
 	return (lineHue === 0) ? lineHue = 359 : lineHue -= 1;
  }
}

function getBrushWidth() {
  if (brushWidth === 100) widthIncrease = false;
  if (brushWidth === 5)	widthIncrease = true;
  return widthIncrease ? brushWidth++ : brushWidth --;
}

function smoothCurveBetween (p1, p2) {
  const cp = p1.map((coord, idx) => (coord + p2[idx]) / 2);
  ctx.lineWidth = getBrushWidth();
  ctx.strokeStyle = `hsl(${getHue()}, 100%, 50%)`;
  ctx.quadraticCurveTo(...p1, ...cp);
}

function smoothCurve(points) {
  ctx.beginPath();
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  for (let i = points.length - 2; i < points.length - 1; i++) {
	if (i < 0) {
	  ctx.moveTo(...points[0]);
	  smoothCurveBetween(points[0], points[i + 1]);
	} else {
	  ctx.moveTo(...points[i]);
	  smoothCurveBetween(points[i], points[i + 1]);
	}
	ctx.stroke();
  }
}


// rendering
function repaint () {
  curves.forEach(curve => smoothCurve(curve));
}

function tick () {
  if(needsRepaint) {
    repaint();
    needsRepaint = false;
  }
  window.requestAnimationFrame(tick);
}

tick();
