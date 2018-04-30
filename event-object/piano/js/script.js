const sounds = ['first.mp3', 'second.mp3', 'third.mp3', 'fourth.mp3', 'fifth.mp3'];
let mode = 'middle';

const piano = document.getElementsByClassName('set')[0];				
const keys = piano.getElementsByTagName('li');

for (const key of keys) {
  key.addEventListener('click', handleKey);
}

document.addEventListener('keydown', updateMode);
document.addEventListener('keyup', updateMode);

function handleKey() {
  updateSrc();
  const key = event.target;
  const keySound = key.getElementsByTagName('audio')[0];
  keySound.currentTime = 0;
  keySound.play();	
}

function updateSrc() {
  for (let i = 0; i < keys.length; i++) {
    keys[i].getElementsByTagName('audio')[0].src = `sounds/${mode}/${sounds[i]}`;
  }	
}

function updateMode(event) {
  event.preventDefault();  
  if (event.shiftKey) {
  	mode = 'lower';
  } else if (event.altKey) {
  	mode = 'higher';
  } else {
  	mode = 'middle';
  }  
  piano.classList.remove('lower', 'middle', 'higher');
  piano.classList.add(mode);
}
