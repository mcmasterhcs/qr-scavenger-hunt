/* CONSTANTS */
const STORAGE_KEY = 'scavenger_hunt_progress';

/* STATE */
let currentClueId = null;  // id of the clue page currently shown
let scanner = null;         // Html5Qrcode instance when active
let returnCountdownInterval = null; // interval id for the post-success countdown

/* PROGRESS (persisted in localStorage) */
function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Storage might be blocked by privacy settings — fail silently
  }
}

let progress = loadProgress();

/* SCREEN NAVIGATION */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  // Scroll to top when switching screens
  window.scrollTo(0, 0);
}

function goHome() {
  stopScanner();
  stopReturnCountdown();
  currentClueId = null;
  renderGrid();
  showScreen('home-screen');
}

/* HOME GRID */
function renderGrid() {
  const grid = document.getElementById('clue-grid');
  grid.innerHTML = '';

  CLUES.forEach(clue => {
    const btn = document.createElement('button');
    const done = !!progress[clue.id];
    btn.className = 'grid-btn' + (done ? ' completed' : '');
    btn.textContent = done ? '✓' : String(clue.id);
    btn.setAttribute('aria-label', `Clue ${clue.id}${done ? ' — completed' : ''}`);
    btn.addEventListener('click', () => openClue(clue.id));
    grid.appendChild(btn);
  });

  // Show completion modal if all clues are done
  const allDone = CLUES.every(c => progress[c.id]);
  if (allDone) {
    document.getElementById('completion-modal').classList.remove('hidden');
    if (!progress._completedFired) {
      progress._completedFired = true;
      saveProgress(progress);
      gtag('event', 'hunt_complete');
    }
  }
}

/* RULES SCREEN */
function openRules() {
  gtag('event', 'rules_open');
  showScreen ('rules-screen');
}

/* CLUE SCREEN */
// Width of the zero-padded clue number in analytics events, so GA's
// alphabetical sort of the clue_title dimension puts "Clue 02" before
// "Clue 10" instead of "Clue 10" before "Clue 2".
const CLUE_ID_PAD_WIDTH = String(CLUES.length).length;

function openClue(id) {
  currentClueId = id;
  const clue = CLUES.find(c => c.id === id);

  const paddedClueTitle = `Clue ${String(clue.id).padStart(CLUE_ID_PAD_WIDTH, '0')}`;
  gtag('event', 'clue_open', { clue_id: clue.id, clue_title: paddedClueTitle });

  document.getElementById('clue-title').textContent = clue.title;
  document.getElementById('clue-text').textContent = clue.text;

  // Image: real file or placeholder
  const imgEl = document.getElementById('clue-image');
  if (clue.image) {
    imgEl.hidden = false;
    imgEl.innerHTML = `<img src="${clue.image}" alt="Image hint for ${clue.title}" />`;
  } else {
    imgEl.hidden = true;
    imgEl.innerHTML = '';
  }

  // Show or hide the scan button based on the clue's useqr setting
  document.getElementById('scan-btn').hidden = !clue.useqr;

  // Reset inputs and feedback
  document.getElementById('answer-input').value = '';
  hideFeedback();
  stopReturnCountdown();

  showScreen('clue-screen');
}

/* FEEDBACK */
function showFeedback(message, type /* 'success' | 'error' */) {
  const el = document.getElementById('feedback');
  el.textContent = message;
  el.className = `feedback ${type}`;
}

function hideFeedback() {
  document.getElementById('feedback').className = 'feedback hidden';
}

/* ANSWER VALIDATION */
function checkAnswer(raw, fromQR = false) {
  const clue = CLUES.find(c => c.id === currentClueId);
  if (!clue) return;

  const input    = raw.trim().toLowerCase();
  const expected = clue.answer.trim().toLowerCase();

  const accepted = fromQR
    ? [expected]
    : [expected, ...(clue.aliases || []).map(a => a.trim().toLowerCase())];

  if (accepted.includes(input)) {
    progress[currentClueId] = true;
    saveProgress(progress);
    startReturnCountdown(2);
  } else {
    showFeedback('That doesn\'t match — try again!', 'error');
  }
}

/* RETURN COUNTDOWN (after a correct answer) */
function startReturnCountdown(seconds) {
  hideFeedback();
  document.getElementById('submit-btn').disabled = true;
  document.getElementById('answer-input').disabled = true;
  document.getElementById('scan-btn').disabled = true;

  let remaining = seconds;
  const submitBtn = document.getElementById('submit-btn');
  const render = () => {
    submitBtn.textContent = `Back in ${remaining}…`;
  };

  render();
  returnCountdownInterval = setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      stopReturnCountdown();
      goHome();
      return;
    }
    render();
  }, 1000);
}

function stopReturnCountdown() {
  if (returnCountdownInterval) {
    clearInterval(returnCountdownInterval);
    returnCountdownInterval = null;
  }
  document.getElementById('submit-btn').disabled = false;
  document.getElementById('submit-btn').textContent = 'Submit';
  document.getElementById('answer-input').disabled = false;
  document.getElementById('scan-btn').disabled = false;
}

/* QR SCANNER */
function startScanner() {
  document.getElementById('scanner-overlay').classList.remove('hidden');

  scanner = new Html5Qrcode('qr-reader');

  scanner.start(
    { facingMode: 'environment' },   // back (rear) camera
    { fps: 10, qrbox: { width: 240, height: 240 } },
    (decodedText) => {
      // Successfully scanned a QR code
      stopScanner();
      checkAnswer(decodedText, true);
    },
    () => {
      // Scan attempt failed (no code in frame) — ignore, keep trying
    }
  ).catch(() => {
    stopScanner();
    showFeedback(
      'Could not access the camera. Please use the text field below instead.',
      'error'
    );
  });
}

function stopScanner() {
  document.getElementById('scanner-overlay').classList.add('hidden');
  if (scanner) {
    scanner.stop().catch(() => {});
    scanner = null;
  }
}

/* EVENT LISTENERS */
document.getElementById('back-btn').addEventListener('click', goHome);

document.getElementById('scan-btn').addEventListener('click', startScanner);

document.getElementById('cancel-scan-btn').addEventListener('click', stopScanner);

document.getElementById('submit-btn').addEventListener('click', () => {
  const val = document.getElementById('answer-input').value;
  if (val.trim()) checkAnswer(val);
});

document.getElementById('answer-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const val = e.target.value;
    if (val.trim()) checkAnswer(val);
  }
});

document.getElementById('modal-close-btn').addEventListener('click', () => {
  document.getElementById('completion-modal').classList.add('hidden');
});

document.getElementById('reset-btn').addEventListener('click', () => {
  if (confirm('Reset all progress? This cannot be undone.')) {
    progress = {};
    saveProgress(progress);
    renderGrid();
  }
});

document.getElementById('rules-btn').addEventListener('click', openRules);
document.getElementById('rules-back-btn').addEventListener('click', goHome);

/* SECRET DEBUG SHORTCUT — marks every clue complete */
function completeAllClues() {
  CLUES.forEach(clue => { progress[clue.id] = true; });
  saveProgress(progress);
  renderGrid();
}

// Desktop: type this word anywhere (outside a text field)
const SECRET_WORD = 'iddqd';
let secretBuffer = '';

document.addEventListener('keydown', (e) => {
  const tag = document.activeElement.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;
  if (e.key.length !== 1) return; // ignore Shift, Enter, arrows, etc.

  secretBuffer = (secretBuffer + e.key.toLowerCase()).slice(-SECRET_WORD.length);
  if (secretBuffer === SECRET_WORD) {
    secretBuffer = '';
    completeAllClues();
  }
});

// Mobile: tap the home screen title 7 times within 2 seconds
const SECRET_TAP_COUNT = 7;
const SECRET_TAP_WINDOW_MS = 2000;
let secretTapCount = 0;
let secretTapTimer = null;

document.getElementById('home-title').addEventListener('click', () => {
  secretTapCount += 1;
  clearTimeout(secretTapTimer);
  secretTapTimer = setTimeout(() => { secretTapCount = 0; }, SECRET_TAP_WINDOW_MS);

  if (secretTapCount >= SECRET_TAP_COUNT) {
    secretTapCount = 0;
    clearTimeout(secretTapTimer);
    completeAllClues();
  }
});

/* INIT */
renderGrid();
