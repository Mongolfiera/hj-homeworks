const nav = document.getElementsByTagName('nav')[0];
const secret = document.getElementsByClassName('secret')[0];

const secretCode = ['KeyY', 'KeyT', 'KeyN', 'KeyJ', 'KeyK', 'KeyJ', 'KeyU', 'KeyB', 'KeyZ'];
const typedCode = [];

document.addEventListener('keydown', reveal);

function reveal(event) {
  if (event.ctrlKey && event.altKey && event.code === 'KeyT') {
  	event.preventDefault();
    nav.classList.toggle('visible');
  }

  typedCode.push(event.code);
  typedCode.splice(-secretCode.length - 1, typedCode.length - secretCode.length);
  if (typedCode.join('') === secretCode.join('')) {
    secret.classList.add('visible');
  }
}
