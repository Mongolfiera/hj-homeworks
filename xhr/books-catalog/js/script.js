'use strict';
const content = document.querySelector('#content');
const request = new XMLHttpRequest();
request.addEventListener('load', onLoad);
request.open('GET', 'https://neto-api.herokuapp.com/book/');
request.send();

function onLoad() {
  if (request.status === 200) {
  	content.innerHTML = '';
    JSON.parse(request.responseText).forEach((el) => {
    	content.innerHTML += `\n<li data-title = \"${el.title}\"
    	data-author = \"${el.author.name}\"
    	data-info = \"${el.info}\"
    	data-price = \"${el.price}\">
    	<img src = \"${el.cover.small}\">\n</li>`;
    });
  }
}
