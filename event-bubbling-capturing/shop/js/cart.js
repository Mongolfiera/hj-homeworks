'use strict';

const itemsList = document.getElementsByClassName('items-list')[0];
itemsList.addEventListener('click', handler);

function handler(event) {
	if(event.target.classList.contains('add-to-cart')) {
		event.preventDefault();
		addToCart(event.target.dataset);
	}
}
