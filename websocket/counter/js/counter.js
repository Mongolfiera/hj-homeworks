'use strict';
const counter = document.querySelector('.counter');
const errors = document.querySelector('output.errors');
const connection = new WebSocket('wss://neto-api.herokuapp.com/counter'); 
connection.addEventListener('message', event => {
	const data = JSON.parse(event.data);
	counter.textContent = data.connections;
	errors.textContent = data.errors;
}); 
window.addEventListener('beforeunload', () => { connection.close(1000)});
