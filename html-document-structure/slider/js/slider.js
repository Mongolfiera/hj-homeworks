'use strict';
const slider = document.querySelector('.slider');
const slideList = slider.querySelectorAll('.slide');
const next = slider.querySelector('a[data-action = "next"]');
const last = slider.querySelector('a[data-action = "last"]');
const prev = slider.querySelector('a[data-action = "prev"]');
const first = slider.querySelector('a[data-action = "first"]');

slideList[0].classList.add('slide-current');
prev.classList.add('disabled');
first.classList.add('disabled');

next.addEventListener('click', event => moveSlide(1));
prev.addEventListener('click', event => moveSlide(-1));
last.addEventListener('click', event => moveSlide(10));
first.addEventListener('click', event => moveSlide(-10));

function moveSlide(move) {
  if (event.target.classList.contains('disabled')) {
  	return;
  };
  const slideCurrent = slider.querySelector('.slide-current');
  let slideNext = {};
  switch (move) {
    case 1: 
      slideNext = slideCurrent.nextElementSibling;
      break;
    case -1: 
      slideNext = slideCurrent.previousElementSibling;
      break;
    case 10: 
      slideNext = slideCurrent.parentElement.lastElementChild;
      break;
    case -10: 
      slideNext = slideCurrent.parentElement.firstElementChild;
      break;      
  }
  
  slideCurrent.classList.remove('slide-current');
  slideNext.classList.add('slide-current');

  if (!slideNext.nextElementSibling) {
  	next.classList.add('disabled');
  	last.classList.add('disabled');
  } else {
  	next.classList.remove('disabled');
  	last.classList.remove('disabled');  	
  }
    if (!slideNext.previousElementSibling) {
  	prev.classList.add('disabled');
  	first.classList.add('disabled');
  } else {
  	prev.classList.remove('disabled');
  	first.classList.remove('disabled');  	
  }
}
