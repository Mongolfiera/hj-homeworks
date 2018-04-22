const images = ['i/breuer-building.jpg',
                'i/guggenheim-museum.jpg',
                'i/headquarters.jpg',
                'i/IAC.jpg',
                'i/new-museum.jpg'];
const slider = document.getElementById('currentPhoto');
const forward = document.getElementById('nextPhoto');
const backward = document.getElementById('prevPhoto');
let counter = 0;
slider.src = images[counter];

forward.onclick = function () {
  counter++;
  if (counter === images.length) {
    counter = 0;
  }
  slider.src = images[counter];
}

backward.onclick = function () {
  counter--;
  if (counter < 0) {
    counter = images.length - 1;
  }
  slider.src = images[counter];    
}
