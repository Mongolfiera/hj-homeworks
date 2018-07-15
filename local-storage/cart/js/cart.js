'use strict';

const colorSwatch = document.getElementById('colorSwatch');
const sizeSwatch = document.getElementById('sizeSwatch');
const quickCart = document.getElementById('quick-cart');
const addBtn = document.getElementById('AddToCart');
const addToCartForm = document.getElementById('AddToCartForm');

// localStorage.clear();

getColors();
getSizes();
getCart();

addBtn.addEventListener('click', addToCart);
addToCartForm.addEventListener('change', saveCart);


function getColors() {
  let data; 
  const request = new XMLHttpRequest();
  request.open('GET', 'https://neto-api.herokuapp.com/cart/colors', true);
  request.send();
  request.addEventListener('load', onLoad);
  function onLoad() {
    if (200 <= request.status && request.status < 300) {
      data = JSON.parse(request.responseText);

      data.forEach(el => {
      	let available = 'available';
      	let disabled = '';
      	if (!el.isAvailable) {
      		available = 'soldout';
      		disabled = ' disabled';
      	}
        colorSwatch.innerHTML += `<div data-value="${el.code}" class="swatch-element color ${el.code} ${available}">
          <div class="tooltip">${el.title}</div>
          <input quickbeam="color" id="swatch-1-${el.code}" type="radio" name="color" value="${el.type}"${disabled}>
          <label for="swatch-1-${el.code}" style="border-color: ${el.code};">
            <span style="background-color: ${el.code};"></span>
            <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
          </label>
        </div>`;  
      });
      
      const checkedItem = Array.from(colorSwatch.querySelectorAll('input')).find(el => el.value === localStorage.color);
      if (checkedItem) checkedItem.checked = true;

    }	
  }
}

function getSizes() {
  let data; 
  const request = new XMLHttpRequest();
  request.open('GET', 'https://neto-api.herokuapp.com/cart/sizes', true);
  request.send();
  request.addEventListener('load', onLoad);
  function onLoad() {
    if (200 <= request.status && request.status < 300) {
      data = JSON.parse(request.responseText);

      data.forEach(el => {
      	let available = 'available';
      	let disabled = '';
      	if (!el.isAvailable) {
      		available = 'soldout';
      		disabled = ' disabled';
      	}
        sizeSwatch.innerHTML += `<div data-value="${el.type}" class="swatch-element plain ${el.type} ${available}">
          <input id="swatch-0-${el.type}" type="radio" name="size" value="${el.type}"${disabled}>
          <label for="swatch-0-${el.type}">
            ${el.title}
            <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
          </label>
        </div>`;  
      });


      const checkedItem = Array.from(sizeSwatch.querySelectorAll('input')).find(el => el.value === localStorage.size);
      if (checkedItem) checkedItem.checked = true;

    }	
  }
}

function addToCart(event) {
  event.preventDefault();
  const request = new XMLHttpRequest();
  const data = new FormData(addToCartForm);
  // for (let [k,v] of data) console.log(k,v);   
  data.append('productId',addToCartForm.dataset.productId);
  request.open('POST', 'https://neto-api.herokuapp.com/cart');
  request.send(data); 
  request.addEventListener('load', getCart);
}

function saveCart() {
  event.preventDefault();
  const formData = new FormData(addToCartForm);
  for (const [k, v] of formData) {
    localStorage[k] = v;
  }
  // console.log(localStorage);
}

function removeFromCart(event) {
  event.preventDefault();	
  const request = new XMLHttpRequest();
  const data = new FormData();
  data.set('productId', event.currentTarget.dataset.id);
  request.open('POST', 'https://neto-api.herokuapp.com/cart/remove');
  request.send(data); //  
  request.addEventListener('load', getCart);
  request.addEventListener('error', (error) => console.log(error.message));
}

function getCart() {
  let data; 
  const request = new XMLHttpRequest();
  request.open('GET', 'https://neto-api.herokuapp.com/cart', true);
  request.send();
  request.addEventListener('load', onLoad);
  function onLoad() {
    if (200 <= request.status && request.status < 300) {
      data = JSON.parse(request.responseText);
      updateCart(data);
    }
  }
}

function updateCart(data) {
  quickCart.innerHTML = '';	
  data.forEach(el => {
  	quickCart.innerHTML += `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${el.id}" style="opacity: 1;">
      <div class="quick-cart-product-wrap">
        <img src="${el.pic}" title="${el.title}">
        <span class="s1" style="background-color: #000; opacity: .5">$${el.price.toFixed(2)}</span>
        <span class="s2"></span>
      </div>
      <span class="count hide fadeUp" id="quick-cart-product-count-${el.id}">${el.quantity}</span>
      <span class="quick-cart-product-remove remove" data-id="${el.id}"></span>
    </div>
    <a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico open">
      <span>
        <strong class="quick-cart-text">Оформить заказ<br></strong>
        <span id="quick-cart-price">$${(el.quantity*el.price).toFixed(2)}</span>
      </span>
    </a>`
  });

  if (document.getElementById('quick-cart-price') && parseInt(document.getElementById('quick-cart-price').textContent.slice(1)) === 0) {
  	document.getElementById('quick-cart-pay').classList.remove('open');
  }

  for (let remove of document.querySelectorAll('.remove')) {
  	remove.addEventListener('click', removeFromCart);
  }
}

const thumbs = document.querySelectorAll('.thumb-image');
for (let thumb of thumbs) {
  thumb.addEventListener('click', changeImg);
}

function changeImg(event) {
  event.preventDefault();
  for (let thumb of thumbs) {
   thumb.classList.remove('active');
  }
  event.currentTarget.classList.add('active');
  document.querySelector('#big-image').style.setProperty('background-image', `url(${event.currentTarget.href})`);
};
