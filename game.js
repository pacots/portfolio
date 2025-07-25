const target = document.querySelector('.target');
const scoreDisplay = document.getElementById('score');
let score = 0;
let time = 1500;

// Función para mover el objetivo
function moveTarget() {
  const gameArea = document.querySelector('.game-area');
  const maxX = gameArea.clientWidth - target.clientWidth;
  const maxY = gameArea.clientHeight - target.clientHeight;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  target.style.left = randomX + 'px';
  target.style.top = randomY + 'px';
}

// Cada 1.5 segundos, el objetivo se mueve
setInterval(moveTarget, time);

// Cuando haces click en el objetivo, sumas puntos
target.addEventListener('click', () => {
  score++;
  if (time > 10) time -= 10;
  scoreDisplay.textContent = 'Puntos: ' + score;
  moveTarget();
});