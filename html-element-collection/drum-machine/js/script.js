const drums = document.getElementsByClassName('drum-kit__drum');
for (const drum of drums) {
  drum.onclick = () => {
    const sound = drum.getElementsByTagName('audio');
    sound[0].currentTime = 0;
    sound[0].play();
 }
}
