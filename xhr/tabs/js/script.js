'use strict';
const tabs = document.querySelectorAll('.tabs a');
const content = document.querySelector('#content');
const preloader = document.querySelector('#preloader');
updateContent(document.querySelector('.tabs a.active'));

for (const tab of tabs) {
  tab.addEventListener('click', switchTabs);
}

function switchTabs(event) {
  event.preventDefault();
  if (this.classList.contains('active')) {
    return;
  }
  for (const tab of tabs) {
  	tab.classList.remove('active');
  }
  this.classList.add('active');
  updateContent(this.href);
}

function updateContent(link) {
  const request = new XMLHttpRequest();
  request.addEventListener('loadstart', onLoadStart);
  request.addEventListener('load', onLoad);
  request.open('GET', link);
  request.send();

  function onLoad() {
    if (request.status === 200) {
      preloader.classList.add('hidden');
  	  content.innerHTML = request.responseText;
    }	
  }

  function onLoadStart() {
    content.innerHTML = '';
    preloader.classList.remove('hidden');
  }
}
