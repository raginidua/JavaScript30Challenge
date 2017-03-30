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

// This function is for the range buttons - range volume and rang playback. The name of both sliders is 'volume' and 'range update', so we can use this.name to update the values and cover both at once.
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// This function is for the progressBar, which should be updating in real time. Looking at the progress bar element, it has a flex-basis bar which is based on a percentage. Current time and duration are just properties of the video. We want this to run often, so the way to do this, so we could do a time out and do it every second, but instead we just listen for the time update event and it will mean that every time the time code of the video changes, this function will be run.
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// This function allows us to update the timing of the video by dragging the progress bar forward. So we listen for a click on the video bar, so whatever percentage we click, that will be half way through the video, and scrub the video that percent of its duration. OffsetX is a measure of how much something is offset on the x axis by the parent container. The offset X is a measure of how far along the progress bar the mouse is at, and the progress.offsetWidth is the entire width of the bar.
function scrub(e) {
  scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}


// Hook up the event listener.
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

// Once again, we do it for both change and mousemove so the volume and range changes as you slide through, not just when you stop clicking and leave it at a new value.
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// This part allows us to create a variable to skip through. as we are clicked down and dragging, but not when we are just hovering.
let mousedown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));

// This basically works because we are using the variable mousedown, and if it is true it will move on to the rest of the function, otherwise it will not run the rest of it.  So scrub only runs when mousemove is running.
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
