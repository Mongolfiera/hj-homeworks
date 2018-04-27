const player = document.getElementsByClassName('mediaplayer')[0];
const audio = player.getElementsByTagName('audio')[0];
const btnPlay = player.getElementsByClassName('playstate')[0];
const btnStop = player.getElementsByClassName('stop')[0];
const btnBack = player.getElementsByClassName('back')[0];
const btnNext = player.getElementsByClassName('next')[0];
const playList = [{title: 'LA Chill Tour', 
                  source: 'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA Chill Tour.mp3'},
                  {title: 'This is it band', 
                  source: 'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/This is it band.mp3'},
                  {title: 'LA Fusion Jam',
                  source: 'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA Fusion Jam.mp3'},
                ]
let playTrack = 0;

btnPlay.onclick = () => {
  player.classList.toggle('play');   
  if (player.classList.contains('play')) {
    audio.play();
  } else {
    audio.pause();
  }
}

btnStop.onclick = () => {
// в задании не прописано, должна ли кнопка сбрасывать песню на начало, если ее нажать в состоянии, когда проигрыватель стоит на паузе.
// если не должна, перед блоком ниже должна быть проверка if (player.classList.contains('play'))
  audio.pause();
  audio.currentTime = 0;
  player.classList.remove('play');   
}

btnNext.onclick = () => {
  playTrack++;
  if (playTrack >= playList.length) {
    playTrack = 0;
  }
  changeTrack();
}

btnBack.onclick = () => {
  playTrack--;
  if (playTrack < 0) {
    playTrack = playList.length-1;
  }
  changeTrack();
}

function changeTrack() {
  audio.src = playList[playTrack].source;
  player.getElementsByClassName('title')[0].title = playList[playTrack].title;
  audio.play();
}
