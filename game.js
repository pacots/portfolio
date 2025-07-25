const target = document.querySelector('.target');
const scoreDisplay = document.getElementById('score');
let score = 0;
let time = 1500;
const EMOJIS = ['🎉', '🔥', '✨', '💥', '🎯', '💫', '🌟', '😎', '🤖', '🧠', '🚀', '🍀'];

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

// Mostrar un emoji aleatorio en el centro del área de juego
function showEmoji() {
  const gameArea = document.querySelector('.game-area');
  const emojiEl = document.createElement('div');
  emojiEl.className = 'emoji-pop';
  emojiEl.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  gameArea.appendChild(emojiEl);

  // Eliminar el emoji después de la animación
  setTimeout(() => {
    emojiEl.remove();
  }, 650); // un pelín más que la animación (600ms)
}

// Cada ciertos segundos, el objetivo se mueve
setInterval(moveTarget, time);

// Cuando haces click en el objetivo, sumas puntos
target.addEventListener('click', () => {
  score++;
  if (time > 10) time -= 10;
  scoreDisplay.textContent = 'Puntos: ' + score;
  moveTarget();
  showEmoji();
});