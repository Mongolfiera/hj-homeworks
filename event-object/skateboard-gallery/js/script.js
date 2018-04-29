const galleryView = document.getElementById('view');
const galleryNav = document.getElementById('nav');
const images = galleryNav.getElementsByTagName('a');

for (const image of images) {
  image.addEventListener('click', displayImg);
}

function displayImg(event) {
  event.preventDefault();
  for (const image of images) {
  	image.classList.remove('gallery-current');
  }
  galleryView.src = this.href;
  this.classList.add('gallery-current')
}
