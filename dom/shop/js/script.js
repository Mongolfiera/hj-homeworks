'use strict'
const cartTotalPrice = document.querySelector('#cart-total-price');
const cartCount = document.querySelector('#cart-count');
const addButtons = document.querySelectorAll('button.add');
let sumTotal = 0;
let countItems = 0;

for (const button of addButtons) {
  button.addEventListener('click', () => {
  	cartCount.innerText = ++countItems;
  	sumTotal += parseInt(button.dataset.price);
  	cartTotalPrice.innerText = getPriceFormatted(sumTotal);
  });
}
