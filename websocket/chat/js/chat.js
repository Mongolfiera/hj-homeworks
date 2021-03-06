'use strict';
const chat = document.querySelector('.chat');

const chatTitle = chat.querySelector('.chat-title');
const user = chatTitle.querySelector('h1');
const chatStatus = chatTitle.querySelector('.chat-status');

const messagesTemplates = chat.querySelector('.messages-templates');
const messageLoading = messagesTemplates.querySelector('.loading');
const messageReceived = messageLoading.nextElementSibling;
const messageSent = messagesTemplates.querySelector('.message-personal');
const messageStatus = messagesTemplates.querySelector('.message-status');

const messagesContent = chat.querySelector('.messages-content');

const messageBox = chat.querySelector('.message-box');
const messageInput = messageBox.querySelector('.message-input');
const messageSubmitBtn = messageBox.querySelector('button.message-submit');

const connection = new WebSocket('wss://neto-api.herokuapp.com/chat'); 


connection.addEventListener('open', () => {
  chatStatus.textContent = chatStatus.dataset.online;
  messageSubmitBtn.disabled = false;
  messagesContent.appendChild(clone(messageStatus, `Пользователь появился в сети`));
});

connection.addEventListener('message', event => {
  if (event.data === '...') {
    messagesContent.appendChild(clone(messageLoading));    
  } else {
  	const loading = messagesContent.querySelector('.loading');
  	if (loading) {
  	  loading.parentNode.removeChild(loading);		
  	}
  	messagesContent.appendChild(clone(messageReceived, event.data, showTime()));
  	messagesContent.style.top = (messagesContent.clientHeight - messagesContent.scrollHeight) + 'px';    
  }
});

connection.addEventListener('close', (event) => {
  chatStatus.textContent = chatStatus.dataset.offline;
  messageSubmitBtn.disabled = true;
  messagesContent.appendChild(clone(messageStatus, `Пользователь не в сети`));	
});

messageSubmitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (messageInput.value) {
    messagesContent.appendChild(clone(messageSent, messageInput.value, showTime()));
  	messagesContent.style.top = (messagesContent.clientHeight - messagesContent.scrollHeight) + 'px';    
  }
  connection.send(messageInput.value); 
  messageInput.value = '';
});

function clone(node, text = '', time = '') {
  const newNode = node.cloneNode(true);
  if (text) {
    const nodeText = newNode.querySelector('span');
    nodeText.textContent = text;
  }
  if (time) {
  	const nodeTime = newNode.querySelector('.timestamp');
  	nodeTime.textContent = time;
  }
  return newNode;
}

function showTime() {
  const now = new Date();
  return now.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
}
