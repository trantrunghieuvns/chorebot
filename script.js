let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');
let botDoorPath = 'https://content.codecademy.com/projects/chore-door/images/robot.svg';
let beachDoorPath = 'https://content.codecademy.com/projects/chore-door/images/beach.svg';
let spaceDoorPath = 'https://content.codecademy.com/projects/chore-door/images/space.svg';
let numClosedDoors = 3;
let currentlyPlaying = true;
let openDoor1, openDoor2, openDoor3;
let score = 0;
let highScore = 0; // score and highScore will be placed in 2 main values.
// 2 main values
let currentStreak = document.getElementById('score-number');
let bestStreak = document.getElementById('high-score-number');
//change root HTML to number instantly using innerHTML
currentStreak.innerHTML = score;
bestStreak.innerHTML = highScore;
//
const startButton = document.getElementById('start');
let closedDoorPath = 'https://content.codecademy.com/projects/chore-door/images/closed_door.svg';

//check loss
const isBot = (door) => {
  if (door.src === botDoorPath) {
    return true;
  } else { return false; }
};
// prevent exploiting of clicking a door many times to 
// make numClosedDoors === 0, then win the game
const isClicked = (door) => {
  if (door.src === closedDoorPath) {
    return false;  // now if the door has the same value
    // with door parameter which is closedDoorPath, nothing counts. 
  } else { 
    return true; // count ++
  }
};
//if all door r opened then return gameover fn
const playDoor = (door) => {
  numClosedDoors--;
    if (numClosedDoors === 0){
    gameOver('win');
  } else if (isBot(door)) {
    gameOver('lose');
  }
};

// math random nums
const randomChoreDoorGenerator = () => {
  const choreDoor = Math.floor(Math.random() * numClosedDoors);
  if (choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 1) {
    openDoor3 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
  } else if (choreDoor === 2) {
    openDoor2 = botDoorPath;
    openDoor3 = beachDoorPath;
    openDoor1 = spaceDoorPath;
  }
};

// click fn
door1.onclick = () => {
  if(currentlyPlaying && !isClicked(door1)) {
  doorImage1.src = openDoor1;
  playDoor(door1);
  }
}

door2.onclick = () => {
  if(currentlyPlaying && !isClicked(door2)) {
  doorImage2.src = openDoor2;
  playDoor(door2);
  }
}

door3.onclick = () => {
  if(currentlyPlaying && !isClicked(door3)) {
  doorImage3.src = openDoor3;
  playDoor(door3);
  }
}
// reset

const startRound = () => {
  doorImage1.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  numClosedDoors = 3;
  startButton.innerHTML = 'Good luck <br> to you!';
  currentlyPlaying = true; 
  randomChoreDoorGenerator();
};

randomChoreDoorGenerator();

startButton.onclick = () => {
  if (!currentlyPlaying) {
        startRound();
  }
};

const gameOver = (status) => {

  if (status === 'win') {
    startButton.innerHTML = 'You win! <br> Play again?';
    getYourScore();
  } else {
    startButton.innerHTML = 'Game over! Play Again?';
    score = 0;
    currentStreak.innerHTML = score;
  }
  currentlyPlaying = false; // vv 
}

const getYourScore = () => {
    score++;
    currentStreak.innerHTML = score;
    if (score > highScore) {
      highScore = score;
      bestStreak.innerHTML = highScore;
    }
}

startRound();

