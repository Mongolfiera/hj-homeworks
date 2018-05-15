'use strict'; 
const content = document.querySelector('#content');
const loader = document.querySelector('#loader');
const fromCurrency = content.querySelector('#from');
const toCurrency = content.querySelector('#to');
const source = content.querySelector('#source');
const result = content.querySelector('#result');
const request = new XMLHttpRequest();
let fxRates;

request.addEventListener('load', onLoad);
request.open('GET', 'https://neto-api.herokuapp.com/currency', true);
request.send();
loader.classList.remove('hidden');

const currencies = content.querySelectorAll('select');
for (const currency of currencies) {
  currency.addEventListener('change', fxCalc);
}
source.addEventListener('input', fxCalc);

function onLoad() {
  if (request.status === 200) {
    fxRates = JSON.parse(request.responseText);
    loader.classList.add('hidden'); 
	  content.classList.remove('hidden'); 
    for (const item of fxRates) {
      fromCurrency.innerHTML += `<option value = "${item.value}">${item.code}</option>`;
      toCurrency.innerHTML += `<option value = "${item.value}">${item.code}</option>`;
    }
	output(parseFloat(source.value));
  }
}

function output(value) {
  result.innerHTML = value.toFixed(2);
}

function fxCalc() {
  output(parseFloat(fromCurrency.value) / parseFloat(toCurrency.value) * parseFloat(source.value));
}
