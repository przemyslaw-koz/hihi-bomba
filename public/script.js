const jumper = document.querySelector(".jumper");
let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;
let velocityX = 2;
let velocityY = -15;
const gravity = 0.6;
let animationStarted = false;

const audio = document.getElementById("bg-sound");

const jumperHeight = 340;
const jumperWidth = 200;

function randomVelocity() {
  return {
    x: (Math.random() - 0.5) * 10,
    y: -(10 + Math.random() * 15),
  };
}

function animate() {
  if (!animationStarted) return;

  velocityY += gravity;
  posY += velocityY;
  posX += velocityX;

  const groundY = window.innerHeight - jumperHeight;

  if (posY > groundY) {
    posY = groundY;
    const newVel = randomVelocity();
    velocityY = newVel.y;
    velocityX = newVel.x;
  }

  if (posY < 0) {
    posY = 0;
    velocityY = -velocityY;
  }

  if (posX < 0) {
    posX = 0;
    velocityX = -velocityX;
  }

  if (posX > window.innerWidth - jumperWidth) {
    posX = window.innerWidth - jumperWidth;
    velocityX = -velocityX;
  }

  jumper.style.transform = `translate(${posX}px, ${posY}px)`;
  requestAnimationFrame(animate);
}

document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("start-modal").style.display = "none";
  animationStarted = true;
  audio
    .play()
    .catch((e) => console.log("Nie udało się odtworzyć audio:", e));
  animate();
});