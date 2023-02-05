import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const storedTime = localStorage.getItem('videoplayer-current-time');

if (storedTime !== null) {
  player.setCurrentTime(storedTime);
}

player.on(
  'timeupdate',
  throttle(data => {
    localStorage.setItem('videoplayer-current-time', data.seconds);
  }, 1000)
);
