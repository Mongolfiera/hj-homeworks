'use strict';
const counter = document.getElementById('counter');
let count;

document.addEventListener('DOMContentLoaded', () => {
  count = (localStorage.getItem('counter')) ? parseInt(localStorage.getItem('counter')) : 0;
  counter.textContent = count;
});

document.querySelector('.wrap-btns').addEventListener('click', updateCounter);

function updateCounter(event) {
  switch(event.target.id) {
    case 'increment':
      count++;
      break;
    case 'decrement':
      if (count > 0) count--;
      break;
    case 'reset':
      count = 0;
      break;
	}
  counter.textContent = count;
  localStorage.counter = count;
}
