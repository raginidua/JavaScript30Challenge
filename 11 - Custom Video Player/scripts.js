// Get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build our functions
// This functions is connecting to the hooking up of the event listener below - it allows us to pause and play the video by clicking the video or the play button.
function togglePlay(){
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// This function is connected to the play button and whether it shows a pause or play icon depending on whether the video is pause or play. We can use 'this', because 'this' will always be the video itself, which has the property .paused, which we can check for.
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}

// This function relates to the skip button which enables us to go forward 25seconds or back 10 seconds. The way to define how much the video will be skipped, go to the DOM elements, and we have a data-skip of 10seconds and data-skip of 25 seconds.  We can therefore put this on anything. So we wil listen for anything which has a data-skip attribute.
function skip(){
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

// Hook up the event listener.
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
