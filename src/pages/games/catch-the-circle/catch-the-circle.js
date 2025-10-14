// Elements
const target = document.querySelector('.target');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const hitsDisplay = document.getElementById('hits');
const missesDisplay = document.getElementById('misses');
const accuracyDisplay = document.getElementById('accuracy');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const difficultySelect = document.getElementById('difficulty');

// State
let score = 0;
let hits = 0;
let misses = 0;
let accuracy = 0;
let baseSpeed = 1200; // ms between moves (depends on difficulty)
let moveInterval = null;
let timeLeft = 30; // seconds
let timerInterval = null;
let running = false;

const EMOJIS = ['🎉', '🔥', '✨', '💥', '🎯', '💫', '🌟', '😎', '🤖', '🧠', '🚀', '🍀'];
const COLORS = ['#ff595e', '#1982c4', '#6a4c93', '#ffca3a', '#8ac926', '#ff7b00', '#00afb9', '#ef476f'];

function getHighScore() {
  const v = localStorage.getItem('ctc_highscore');
  return v ? parseInt(v, 10) : 0;
}

function setHighScore(v) {
  localStorage.setItem('ctc_highscore', String(v));
}

function updateStats() {
  scoreDisplay.textContent = `Score: ${score}`;
  highScoreDisplay.textContent = `High: ${getHighScore()}`;
  hitsDisplay.textContent = `Hits: ${hits}`;
  missesDisplay.textContent = `Misses: ${misses}`;
  const total = hits + misses;
  accuracy = total > 0 ? Math.round((hits / total) * 100) : 0;
  accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;
}

function setDifficulty(d) {
  const map = {
    easy: 1300,
    medium: 1000,
    hard: 700,
    insane: 450,
  };
  baseSpeed = map[d] ?? 1000;
  if (running) restartMoveInterval();
}

function two(n) { return n.toString().padStart(2, '0'); }

function setTimerDisplay() {
  timerDisplay.textContent = `${two(Math.floor(timeLeft / 60))}:${two(timeLeft % 60)}`;
}

// Movement
function moveTarget() {
  const gameArea = document.querySelector('.game-area');
  const maxX = gameArea.clientWidth - target.clientWidth;
  const maxY = gameArea.clientHeight - target.clientHeight;
  const randomX = Math.floor(Math.random() * (maxX + 1));
  const randomY = Math.floor(Math.random() * (maxY + 1));
  const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];

  target.style.left = randomX + 'px';
  target.style.top = randomY + 'px';
  target.style.backgroundColor = randomColor;
}

function restartMoveInterval() {
  clearInterval(moveInterval);
  moveInterval = setInterval(moveTarget, baseSpeed);
}

// Emoji pop
function showEmojiAtTarget() {
  const gameArea = document.querySelector('.game-area');
  const emojiEl = document.createElement('div');
  emojiEl.className = 'emoji-pop';
  emojiEl.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

  const targetRect = target.getBoundingClientRect();
  const areaRect = gameArea.getBoundingClientRect();
  emojiEl.style.left = (targetRect.left - areaRect.left + target.clientWidth / 2) + 'px';
  emojiEl.style.top = (targetRect.top - areaRect.top + target.clientHeight / 2) + 'px';

  gameArea.appendChild(emojiEl);
  target.style.visibility = 'hidden';

  setTimeout(() => {
    emojiEl.remove();
    target.style.visibility = 'visible';
    if (running) moveTarget();
  }, 600);
}

// Game flow
function startGame() {
  if (running) return;
  running = true;
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;

  // Reset round state
  score = 0; hits = 0; misses = 0; timeLeft = 30;
  updateStats();
  setTimerDisplay();

  moveTarget();
  restartMoveInterval();

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (!running) return;
    timeLeft -= 1;
    setTimerDisplay();
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function pauseGame() {
  if (!running) return;
  running = false;
  pauseBtn.textContent = 'Resume';
  clearInterval(moveInterval);
  clearInterval(timerInterval);
}

function resumeGame() {
  if (running) return;
  running = true;
  pauseBtn.textContent = 'Pause';
  restartMoveInterval();
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft -= 1;
    setTimerDisplay();
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function endGame() {
  running = false;
  clearInterval(moveInterval);
  clearInterval(timerInterval);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  pauseBtn.textContent = 'Pause';
  // Update high score
  const hs = getHighScore();
  if (score > hs) setHighScore(score);
  updateStats();
}

function resetGame() {
  running = false;
  clearInterval(moveInterval);
  clearInterval(timerInterval);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  pauseBtn.textContent = 'Pause';
  resetBtn.disabled = true;
  score = 0; hits = 0; misses = 0; timeLeft = 30;
  updateStats();
  setTimerDisplay();
}

// Events
target.addEventListener('click', () => {
  if (!running) return;
  score += 1; hits += 1;
  updateStats();
  showEmojiAtTarget();
});

// Count misses when clicking in the area but not the target
document.querySelector('.game-area').addEventListener('click', (e) => {
  if (!running) return;
  if (!e.target.classList.contains('target')) {
    misses += 1;
    updateStats();
  }
});

// Buttons
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', () => running ? pauseGame() : resumeGame());
resetBtn.addEventListener('click', resetGame);

// Difficulty
difficultySelect.addEventListener('change', (e) => setDifficulty(e.target.value));

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    if (!running && startBtn.disabled === false) startGame();
    else if (pauseBtn.disabled === false) (running ? pauseGame() : resumeGame());
  }
  if (e.key.toLowerCase() === 'r') {
    resetGame();
  }
});

// Init
updateStats();
highScoreDisplay.textContent = `High: ${getHighScore()}`;
setDifficulty(difficultySelect.value);
setTimerDisplay();
