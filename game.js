const target = document.querySelector('.target');
const scoreDisplay = document.getElementById('score');
let score = 0;
let speed = 1500; // Tiempo inicial (ms) entre movimientos
let moveInterval;

const EMOJIS = ['🎉', '🔥', '✨', '💥', '🎯', '💫', '🌟', '😎', '🤖', '🧠', '🚀', '🍀'];
const COLORS = ['#ff595e', '#1982c4', '#6a4c93', '#ffca3a', '#8ac926', '#ff7b00', '#00afb9', '#ef476f'];

// Función para mover el objetivo y cambiar su color
function moveTarget() {
  const gameArea = document.querySelector('.game-area');
  const maxX = gameArea.clientWidth - target.clientWidth;
  const maxY = gameArea.clientHeight - target.clientHeight;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);
  const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];

  target.style.left = randomX + 'px';
  target.style.top = randomY + 'px';
  target.style.backgroundColor = randomColor;
}

// Mostrar emoji en la posición del círculo
function showEmojiAtTarget() {
  const gameArea = document.querySelector('.game-area');
  const emojiEl = document.createElement('div');
  emojiEl.className = 'emoji-pop';
  emojiEl.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

  // Posicionar emoji en el centro del círculo
  const targetRect = target.getBoundingClientRect();
  const areaRect = gameArea.getBoundingClientRect();
  emojiEl.style.left = targetRect.left + 'px';
  emojiEl.style.top = targetRect.top + 'px';

  gameArea.appendChild(emojiEl);

  // Ocultar círculo mientras el emoji aparece
  target.style.display = 'none';

  // Después de 600ms, eliminar emoji y volver a mostrar el círculo
  setTimeout(() => {
    emojiEl.remove();
    target.style.display = 'block';
    moveTarget();
  }, 600);
}

// Cuando haces clic en el objetivo
target.addEventListener('click', () => {
  score++;
  scoreDisplay.textContent = 'Score: ' + score;
  showEmojiAtTarget();

  // Cada 3 puntos, aumentar velocidad (mínimo 100ms)
  if (score % 3 === 0 && speed > 100) {
    speed -= 150; 
    clearInterval(moveInterval);
    moveInterval = setInterval(moveTarget, speed);
  }
});

// Inicializar el juego
function startGame() {
  moveTarget();
  moveInterval = setInterval(moveTarget, speed);
}

startGame();