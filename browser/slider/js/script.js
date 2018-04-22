const images = ['i/airmax-jump.png',
                'i/airmax-on-foot.png',
                'i/airmax-playground.png',
                'i/airmax-top-view.png',
                'i/airmax.png'];
const slider = document.getElementById('slider');
let counter = 0;
slider.src = images[counter];
  
function showImage() {
  counter++;    
  if (counter === images.length) {
    counter = 0;
  }
  slider.src = images[counter];
}
  
setInterval(showImage, 5000);
