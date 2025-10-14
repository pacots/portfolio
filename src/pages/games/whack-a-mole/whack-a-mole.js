// Elements
const holes = Array.from(document.querySelectorAll('.hole'));
const moles = Array.from(document.querySelectorAll('.mole'));
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
let baseUpTime = 800; // how long a mole stays up
let spawnEvery = 650; // interval for attempts to pop a mole
let spawnInterval = null;
let timeLeft = 30; // seconds
let timerInterval = null;
let running = false;

function getHighScore() {
  const v = localStorage.getItem('wam_highscore');
  return v ? parseInt(v, 10) : 0;
}

function setHighScore(v) {
  localStorage.setItem('wam_highscore', String(v));
}

function two(n) { return n.toString().padStart(2, '0'); }
function setTimerDisplay() {
  timerDisplay.textContent = `${two(Math.floor(timeLeft / 60))}:${two(timeLeft % 60)}`;
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
  const table = {
    easy: { up: 1100, every: 850 },
    medium: { up: 800, every: 650 },
    hard: { up: 650, every: 520 },
    insane: { up: 500, every: 400 },
  };
  const cfg = table[d] ?? table.medium;
  baseUpTime = cfg.up;
  spawnEvery = cfg.every;
  if (running) restartSpawn();
}

function randomIndex(max) { return Math.floor(Math.random() * max); }

let lastHole = -1;
function randomHole() {
  // avoid same hole twice in a row to keep it fun
  let idx = randomIndex(holes.length);
  if (idx === lastHole) idx = (idx + 1) % holes.length;
  lastHole = idx;
  return { hole: holes[idx], mole: moles[idx], idx };
}

// Spawning logic
function popOneMole() {
  const { mole } = randomHole();
  if (!running) return;
  // If mole is already up, skip (prevents overlap); try another next tick
  if (mole.classList.contains('up')) return;
  mole.classList.add('up');
  const timeout = setTimeout(() => {
    if (mole.classList.contains('up')) {
      // Consider it a miss if it goes back down untouched while running
      if (running) {
        misses += 1;
        updateStats();
      }
    }
    mole.classList.remove('up', 'hit');
  }, baseUpTime);
  mole.dataset.timeout = timeout;
}

function restartSpawn() {
  clearInterval(spawnInterval);
  spawnInterval = setInterval(popOneMole, spawnEvery);
}

// Game flow
function startGame() {
  if (running) return;
  running = true;
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;

  score = 0; hits = 0; misses = 0; timeLeft = 30;
  updateStats();
  setTimerDisplay();

  // reset any moles
  moles.forEach(m => { m.classList.remove('up', 'hit'); clearTimeout(m.dataset.timeout); });

  popOneMole();
  restartSpawn();

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (!running) return;
    timeLeft -= 1;
    setTimerDisplay();
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function pauseGame() {
  if (!running) return;
  running = false;
  pauseBtn.textContent = 'Resume';
  clearInterval(spawnInterval);
  clearInterval(timerInterval);
}

function resumeGame() {
  if (running) return;
  running = true;
  pauseBtn.textContent = 'Pause';
  restartSpawn();
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft -= 1;
    setTimerDisplay();
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function endGame() {
  running = false;
  clearInterval(spawnInterval);
  clearInterval(timerInterval);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  pauseBtn.textContent = 'Pause';
  const hs = getHighScore();
  if (score > hs) setHighScore(score);
  updateStats();
}

function resetGame() {
  running = false;
  clearInterval(spawnInterval);
  clearInterval(timerInterval);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  pauseBtn.textContent = 'Pause';
  resetBtn.disabled = true;
  score = 0; hits = 0; misses = 0; timeLeft = 30;
  moles.forEach(m => { m.classList.remove('up', 'hit'); clearTimeout(m.dataset.timeout); });
  updateStats();
  setTimerDisplay();
}

// Events
moles.forEach(mole => {
  mole.addEventListener('click', (e) => {
    if (!running) return;
    if (!mole.classList.contains('up')) return; // clicking when down shouldn't count
    mole.classList.add('hit');
    mole.classList.remove('up');
    clearTimeout(mole.dataset.timeout);
    score += 1; hits += 1;
    updateStats();
  });
});

// Count clicks anywhere on the board that aren't on an up mole as a miss
document.querySelector('.board').addEventListener('click', (e) => {
  if (!running) return;
  const onUpMole = e.target.classList && e.target.classList.contains('mole') && e.target.classList.contains('up');
  if (!onUpMole) { misses += 1; updateStats(); }
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
