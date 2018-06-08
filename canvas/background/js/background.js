'use strict';
const canvas = document.getElementById('wall');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#ffffff';
const curves = [];

function getCircle(x, y, size) {
	ctx.beginPath();
	ctx.lineWidth = 5 * size;
	ctx.arc(x, y, size * 6, 0, 2 * Math.PI);
	ctx.stroke();
}

function getCross(x, y, size, angle) {
	ctx.save();
	ctx.beginPath();
	ctx.lineWidth = 5 * size;
	ctx.translate(x , y);
	ctx.rotate(angle);
	ctx.translate(-x , -y);
	ctx.moveTo(x, y - size * 10);
	ctx.lineTo(x, y + size * 10);
	ctx.moveTo(x - size * 10, y); 
	ctx.lineTo(x + size * 10, y);
	ctx.stroke();
	ctx.restore();
} 
