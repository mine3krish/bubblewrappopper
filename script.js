const bubbleWrap = document.getElementById('bubbleWrap');
const scoreDisplay = document.getElementById('score');
const bgsound = document.getElementById('bgsound');

let score = 0;
let totalBubbles = 50;

let playBackgroundSound = true;

const popSound = new Audio('bubble.mp3');
const playfulSound =  new Audio('playful.mp3')
playfulSound.loop = true;
playfulSound.volume = 0.05;

bgsound.addEventListener('click', () => {
    if(playBackgroundSound) {
        playBackgroundSound = false;
        bgsound.innerText = 'Background Sound: pause';
        playfulSound.pause();
    }else{
        playBackgroundSound = true;
        bgsound.innerText = 'Background Sound: play';
        playfulSound.play();
    }
})

function generateBubbles(count) {
  for (let i = 0; i < count; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.addEventListener('click', () => popBubble(bubble));
    bubbleWrap.appendChild(bubble);
  }
}

function popBubble(bubble) {
    if(playBackgroundSound) {
        playfulSound.play();
    }
    if (!bubble.classList.contains('popped')) {
      bubble.classList.add('popped');
      score++;
      scoreDisplay.innerText = score;
      popSound.play();

      const remainingBubbles = document.querySelectorAll('.bubble:not(.popped)').length;
      if (remainingBubbles === 0) {
        setTimeout(() => {
          regenerateBubbles();
        }, 500);
      }
    }
}

function regenerateBubbles() {
  bubbleWrap.innerHTML = '';
  generateBubbles(totalBubbles);
}

generateBubbles(totalBubbles);
