'use strict';
const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse'); 
document.addEventListener('click', event => {
  connection.send(JSON.stringify({
	x: event.x,
	y: event.y
  }));
});

showBubbles(connection);
