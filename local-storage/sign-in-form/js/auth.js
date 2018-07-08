'use strict';

const check = document.getElementById('check');
const signInInputs = document.getElementsByClassName('input');


for (let input of signInInputs) {
  input.addEventListener('change', inputHandler);
}

document.addEventListener('submit', sendData);
check.addEventListener('change', checkToggle);


function checkToggle(event) {
  const form = event.target.parentElement.parentElement;
  if (check.checked) {
    check.value = 1;
    const dataCopy = new FormData(form);
    for (let [k,v] of dataCopy) {
      localStorage[k] = v;
    }
  } else {
    check.value = 0;
	localStorage.clear();
  }
}

function inputHandler() {	
  if (check.checked) {
    localStorage[this.name] = this.value;
  }
}

function sendData(event) {
  event.preventDefault();
  let sendTo = (event.target.classList.contains('sign-in-htm')) ? 'https://neto-api.herokuapp.com/signin' : 'https://neto-api.herokuapp.com/signup';
  const data = new FormData(event.target);
  let dataList = {};
  for (let [k,v] of data) {
    dataList[k] = v;
  }

  fetch(sendTo, {
  	body: JSON.stringify(dataList), 
  	credentials: 'same-origin',	
  	method: 'POST',
  	headers: {'Content-Type': 'application/json'}
  })
  .then(result => {
  	if (200 <= result.status && result.status < 300) return result.json();
  	throw new Error('Server error'); 	
  })
  .then(result => {
  	event.target.querySelector('.error-message').textContent = result.error ? result.message : event.target.classList.contains('sign-in-htm') ? `Пользователь ${result.name} успешно авторизован` : `Пользователь ${result.name} успешно зарегистрирован`;
  })
  .catch(error => console.log(error));
}
