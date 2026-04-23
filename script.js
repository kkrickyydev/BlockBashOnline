const BOARD_SIZE = 8;
const CELLS = BOARD_SIZE * BOARD_SIZE;
const BEST_SCORE_KEY = 'blockbash-best-score-v1';
const SOUND_KEY = 'blockbash-sound-enabled-v1';
const CLEAR_FLASH_MS = 280;
const SNAP_RADIUS_CELLS = 1.35;
const SNAP_OUTSIDE_MARGIN_CELLS = 1.2;
const TAP_DRAG_THRESHOLD_PX = 8;

const phases = [
  {
    name: 'Aurora',
    bg: '#0f1021',
    bgAccent: '#1d2045',
    card: 'rgba(255,255,255,0.08)',
    accent: '#8b5cf6',
    accent2: '#c084fc',
    boardBg: '#161937',
    boardCell: 'rgba(255,255,255,0.055)',
    pieceColors: ['#8b5cf6', '#06b6d4', '#f59e0b', '#ec4899', '#22c55e', '#60a5fa']
  },
  {
    name: 'Solar',
    bg: '#221013',
    bgAccent: '#4b1d1a',
    card: 'rgba(255,255,255,0.07)',
    accent: '#f97316',
    accent2: '#fb7185',
    boardBg: '#311219',
    boardCell: 'rgba(255,255,255,0.06)',
    pieceColors: ['#fb7185', '#f97316', '#facc15', '#38bdf8', '#34d399', '#f472b6']
  },
  {
    name: 'Oceano',
    bg: '#071a25',
    bgAccent: '#0e3342',
    card: 'rgba(255,255,255,0.07)',
    accent: '#06b6d4',
    accent2: '#38bdf8',
    boardBg: '#09202d',
    boardCell: 'rgba(255,255,255,0.055)',
    pieceColors: ['#06b6d4', '#38bdf8', '#14b8a6', '#a78bfa', '#f59e0b', '#22c55e']
  },
  {
    name: 'Neon',
    bg: '#171023',
    bgAccent: '#2a1545',
    card: 'rgba(255,255,255,0.08)',
    accent: '#a855f7',
    accent2: '#22d3ee',
    boardBg: '#1a1532',
    boardCell: 'rgba(255,255,255,0.06)',
    pieceColors: ['#a855f7', '#22d3ee', '#f43f5e', '#eab308', '#2dd4bf', '#60a5fa']
  },
  {
    name: 'Esmeralda',
    bg: '#0e1f18',
    bgAccent: '#18352d',
    card: 'rgba(255,255,255,0.07)',
    accent: '#22c55e',
    accent2: '#2dd4bf',
    boardBg: '#10251d',
    boardCell: 'rgba(255,255,255,0.05)',
    pieceColors: ['#22c55e', '#2dd4bf', '#84cc16', '#60a5fa', '#f59e0b', '#a78bfa']
  },
  {
    name: 'Galáxia',
    bg: '#120d20',
    bgAccent: '#25163e',
    card: 'rgba(255,255,255,0.08)',
    accent: '#c084fc',
    accent2: '#60a5fa',
    boardBg: '#1a1430',
    boardCell: 'rgba(255,255,255,0.055)',
    pieceColors: ['#c084fc', '#60a5fa', '#f472b6', '#f59e0b', '#22d3ee', '#4ade80']
  }
];

const shapeDefs = [
  { id: 'single', weight: 9, cells: [[0, 0]] },
  { id: 'domino_h', weight: 9, cells: [[0, 0], [1, 0]] },
  { id: 'domino_v', weight: 9, cells: [[0, 0], [0, 1]] },
  { id: 'triple_h', weight: 8, cells: [[0, 0], [1, 0], [2, 0]] },
  { id: 'triple_v', weight: 8, cells: [[0, 0], [0, 1], [0, 2]] },
  { id: 'square2', weight: 8, cells: [[0, 0], [1, 0], [0, 1], [1, 1]] },
  { id: 'l3_1', weight: 7, cells: [[0, 0], [0, 1], [1, 1]] },
  { id: 'l3_2', weight: 7, cells: [[1, 0], [0, 1], [1, 1]] },
  { id: 'l3_3', weight: 7, cells: [[0, 0], [1, 0], [0, 1]] },
  { id: 'l3_4', weight: 7, cells: [[0, 0], [1, 0], [1, 1]] },
  { id: 'i4_h', weight: 5, cells: [[0, 0], [1, 0], [2, 0], [3, 0]] },
  { id: 'i4_v', weight: 5, cells: [[0, 0], [0, 1], [0, 2], [0, 3]] },
  { id: 'l4_1', weight: 5, cells: [[0, 0], [0, 1], [0, 2], [1, 2]] },
  { id: 'l4_2', weight: 5, cells: [[1, 0], [1, 1], [1, 2], [0, 2]] },
  { id: 'l4_3', weight: 5, cells: [[0, 0], [1, 0], [2, 0], [0, 1]] },
  { id: 'l4_4', weight: 5, cells: [[0, 0], [1, 0], [2, 0], [2, 1]] },
  { id: 't4_u', weight: 5, cells: [[0, 0], [1, 0], [2, 0], [1, 1]] },
  { id: 't4_d', weight: 5, cells: [[1, 0], [0, 1], [1, 1], [2, 1]] },
  { id: 't4_l', weight: 5, cells: [[0, 0], [0, 1], [0, 2], [1, 1]] },
  { id: 't4_r', weight: 5, cells: [[1, 0], [1, 1], [1, 2], [0, 1]] },
  { id: 'z4_h', weight: 4, cells: [[0, 0], [1, 0], [1, 1], [2, 1]] },
  { id: 's4_h', weight: 4, cells: [[1, 0], [2, 0], [0, 1], [1, 1]] },
  { id: 'z4_v', weight: 4, cells: [[1, 0], [0, 1], [1, 1], [0, 2]] },
  { id: 's4_v', weight: 4, cells: [[0, 0], [0, 1], [1, 1], [1, 2]] },
  { id: 'square3', weight: 2, cells: [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [0, 2], [1, 2], [2, 2]] },
  { id: 'i5_h', weight: 2, cells: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]] },
  { id: 'i5_v', weight: 2, cells: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]] }
].map((shape) => ({
  ...shape,
  width: Math.max(...shape.cells.map(([x]) => x)) + 1,
  height: Math.max(...shape.cells.map(([, y]) => y)) + 1,
  area: shape.cells.length
}));

const weightedBag = shapeDefs.flatMap((shape) => Array.from({ length: shape.weight }, () => shape.id));
const shapeById = Object.fromEntries(shapeDefs.map((shape) => [shape.id, shape]));

const boardEl = document.getElementById('board');
const trayEl = document.getElementById('tray');
const scoreEl = document.getElementById('score');
const bestScoreEl = document.getElementById('best-score');
const linesCountEl = document.getElementById('lines-count');
const comboCountEl = document.getElementById('combo-count');
const phaseNameEl = document.getElementById('phase-name');
const solverStatusEl = document.getElementById('solver-status');
const modalEl = document.getElementById('modal');
const modalTitleEl = document.getElementById('modal-title');
const modalBodyEl = document.getElementById('modal-body');
const soundBtnEl = document.getElementById('sound-btn');

const adConfig = window.BLOCKBASH_ADS || {};
const adScriptState = { promise: null };
const adSlotsConfig = {
  'sidebar-left': {
    slotId: adConfig.slots?.sidebarLeft,
    format: 'vertical',
    fullWidthResponsive: false
  },
  'sidebar-right': {
    slotId: adConfig.slots?.sidebarRight,
    format: 'vertical',
    fullWidthResponsive: false
  },
  bottom: {
    slotId: adConfig.slots?.bottom,
    format: 'horizontal',
    fullWidthResponsive: true
  }
};

const state = {
  board: new Array(CELLS).fill(null),
  pieces: [],
  nextPieceId: 1,
  score: 0,
  bestScore: Number(localStorage.getItem(BEST_SCORE_KEY) || 0),
  linesCleared: 0,
  combo: 0,
  currentPhase: 0,
  selectedPieceId: null,
  drag: null,
  gameOver: false,
  clearFlash: [],
  soundEnabled: localStorage.getItem(SOUND_KEY) !== '0',
  ignoreClickUntil: 0
};

const audioEngine = {
  ctx: null,
  unlocked: false
};

bestScoreEl.textContent = String(state.bestScore);

function cellIndex(x, y) {
  return y * BOARD_SIZE + x;
}

function cloneBoard(board) {
  return board.slice();
}

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function weightedRandomShapeId() {
  return randomFrom(weightedBag);
}

function getThemeForProgress() {
  return Math.min(phases.length - 1, Math.floor(state.score / 900));
}

function applyPhase() {
  const phaseIndex = getThemeForProgress();
  state.currentPhase = phaseIndex;
  const phase = phases[phaseIndex];
  const root = document.documentElement;
  root.style.setProperty('--bg', phase.bg);
  root.style.setProperty('--bg-accent', phase.bgAccent);
  root.style.setProperty('--card', phase.card);
  root.style.setProperty('--accent', phase.accent);
  root.style.setProperty('--accent-2', phase.accent2);
  root.style.setProperty('--board-bg', phase.boardBg);
  root.style.setProperty('--board-cell', phase.boardCell);
  phase.pieceColors.forEach((color, i) => {
    root.style.setProperty(`--piece-${i + 1}`, color);
  });
  phaseNameEl.textContent = phase.name;
}

function updateSoundButton() {
  soundBtnEl.textContent = state.soundEnabled ? 'Som: ligado' : 'Som: desligado';
  soundBtnEl.setAttribute('aria-pressed', state.soundEnabled ? 'true' : 'false');
}

function isPlaceholderAdValue(value) {
  if (!value) return true;
  return /^ca-pub-0+$/.test(value) || /^0+$/.test(String(value));
}

function getConfiguredPublisherId() {
  const publisherId = String(adConfig.publisherId || '').trim();
  if (!publisherId || isPlaceholderAdValue(publisherId)) return null;
  return publisherId;
}

function canRenderAds() {
  if (!adConfig.enabled) return false;
  return Boolean(getConfiguredPublisherId());
}

function ensureAdSenseScript(publisherId) {
  if (adScriptState.promise) return adScriptState.promise;

  adScriptState.promise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-blockbash-adsense="1"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Falha ao carregar AdSense.')), { once: true });
      if (window.adsbygoogle) resolve();
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.dataset.blockbashAdsense = '1';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(publisherId)}`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Falha ao carregar AdSense.'));
    document.head.appendChild(script);
  });

  return adScriptState.promise;
}

function createAdUnitElement(publisherId, slotId, format, fullWidthResponsive) {
  const adUnit = document.createElement('ins');
  adUnit.className = 'adsbygoogle';
  adUnit.style.display = 'block';
  adUnit.setAttribute('data-ad-client', publisherId);
  adUnit.setAttribute('data-ad-slot', slotId);
  adUnit.setAttribute('data-ad-format', format);
  if (fullWidthResponsive) {
    adUnit.setAttribute('data-full-width-responsive', 'true');
  }
  return adUnit;
}

function markAdSlotFallback(slotEl, message) {
  slotEl.classList.remove('has-live-ad');
  slotEl.dataset.adMessage = message;
}

function syncAdSenseMetaTag(publisherId) {
  const meta = document.querySelector('meta[name="google-adsense-account"]');
  if (!meta || !publisherId) return;
  meta.setAttribute('content', publisherId);
}

async function initAds() {
  const publisherId = getConfiguredPublisherId();
  const allSlots = document.querySelectorAll('.ad-slot');

  if (!canRenderAds()) {
    allSlots.forEach((slotEl) => markAdSlotFallback(slotEl, 'Preencha o publisherId e os slots do AdSense para ativar anúncios.'));
    return;
  }

  syncAdSenseMetaTag(publisherId);

  allSlots.forEach((slotEl) => {
    const position = slotEl.dataset.adPosition;
    const config = adSlotsConfig[position];
    if (!config || !config.slotId || isPlaceholderAdValue(config.slotId)) {
      markAdSlotFallback(slotEl, 'Defina um ad slot válido para este espaço.');
      return;
    }

    slotEl.innerHTML = '';
    slotEl.classList.add('has-live-ad');
    slotEl.appendChild(createAdUnitElement(publisherId, String(config.slotId), config.format, config.fullWidthResponsive));
  });

  try {
    await ensureAdSenseScript(publisherId);
    document.querySelectorAll('.ad-slot.has-live-ad .adsbygoogle').forEach(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.warn('Não foi possível inicializar um bloco do AdSense.', error);
      }
    });
  } catch (error) {
    console.warn(error);
    document.querySelectorAll('.ad-slot').forEach((slotEl) => markAdSlotFallback(slotEl, 'Falha ao carregar o script do AdSense.'));
  }
}

function ensureAudio() {
  if (!state.soundEnabled) return null;
  if (!audioEngine.ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    audioEngine.ctx = new AudioCtx();
  }
  if (audioEngine.ctx.state === 'suspended') {
    audioEngine.ctx.resume().catch(() => {});
  }
  audioEngine.unlocked = true;
  return audioEngine.ctx;
}

function playTone({ frequency, type = 'sine', start = 0, duration = 0.08, volume = 0.05, rampTo = null }) {
  const ctx = ensureAudio();
  if (!ctx) return;

  const now = ctx.currentTime + start;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, now);
  if (rampTo) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(40, rampTo), now + duration);
  }

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.02);
}

function playSound(name, data = {}) {
  if (!state.soundEnabled) return;
  switch (name) {
    case 'pickup':
      playTone({ frequency: 340, type: 'triangle', duration: 0.04, volume: 0.025, rampTo: 420 });
      break;
    case 'place':
      playTone({ frequency: 300, type: 'triangle', duration: 0.06, volume: 0.04, rampTo: 240 });
      playTone({ frequency: 470, type: 'sine', start: 0.015, duration: 0.05, volume: 0.03, rampTo: 420 });
      break;
    case 'clear': {
      const lines = Math.max(1, data.lines || 1);
      const comboBoost = Math.min(1.7, 1 + ((data.combo || 0) * 0.08));
      playTone({ frequency: 540 * comboBoost, type: 'triangle', duration: 0.08, volume: 0.05, rampTo: 760 * comboBoost });
      playTone({ frequency: 700 * comboBoost, type: 'sine', start: 0.03, duration: 0.11 + (lines * 0.015), volume: 0.04, rampTo: 980 * comboBoost });
      if (lines > 1) {
        playTone({ frequency: 900 * comboBoost, type: 'triangle', start: 0.06, duration: 0.12, volume: 0.035, rampTo: 1200 * comboBoost });
      }
      break;
    }
    case 'invalid':
      playTone({ frequency: 210, type: 'sawtooth', duration: 0.05, volume: 0.025, rampTo: 150 });
      break;
    case 'new-trio':
      playTone({ frequency: 430, type: 'triangle', duration: 0.05, volume: 0.025, rampTo: 490 });
      playTone({ frequency: 560, type: 'triangle', start: 0.04, duration: 0.06, volume: 0.025, rampTo: 640 });
      break;
    case 'game-over':
      playTone({ frequency: 320, type: 'sine', duration: 0.12, volume: 0.04, rampTo: 250 });
      playTone({ frequency: 220, type: 'triangle', start: 0.08, duration: 0.18, volume: 0.035, rampTo: 160 });
      break;
    default:
      break;
  }
}

function getPieceColor(index) {
  const palette = phases[state.currentPhase].pieceColors;
  return palette[index % palette.length];
}

function renderBoard() {
  boardEl.innerHTML = '';
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const index = cellIndex(x, y);
      const value = state.board[index];
      const cell = document.createElement('div');
      cell.className = 'board-cell';
      cell.dataset.x = String(x);
      cell.dataset.y = String(y);
      if (value) {
        cell.classList.add('filled');
        cell.style.setProperty('--fill', value.color);
      }
      if (state.clearFlash.includes(index)) {
        cell.classList.add('clear-flash');
      }
      boardEl.appendChild(cell);
    }
  }
}

function createPieceElement(piece, options = {}) {
  const { forGhost = false, unitSize = null } = options;
  const pieceEl = document.createElement('div');
  pieceEl.className = 'piece';
  pieceEl.dataset.pieceId = String(piece.id);
  pieceEl.style.setProperty('--pw', piece.width);
  pieceEl.style.setProperty('--ph', piece.height);
  if (unitSize) {
    pieceEl.style.setProperty('--piece-unit', `${unitSize}px`);
  }

  piece.cells.forEach(([x, y]) => {
    const block = document.createElement('span');
    block.className = 'piece-cell';
    block.style.left = `calc(${x} * var(--piece-unit))`;
    block.style.top = `calc(${y} * var(--piece-unit))`;
    block.style.background = piece.color;
    pieceEl.appendChild(block);
  });

  if (!forGhost) {
    pieceEl.addEventListener('pointerdown', startDrag);
    pieceEl.addEventListener('click', handlePieceClick);
  }

  return pieceEl;
}

function renderTray() {
  trayEl.innerHTML = '';
  state.pieces.forEach((piece) => {
    const slot = document.createElement('div');
    slot.className = 'piece-slot';
    if (piece.used) slot.classList.add('used');
    if (state.selectedPieceId === piece.id) slot.classList.add('selected');
    slot.dataset.pieceId = String(piece.id);

    if (!piece.used) {
      const pieceEl = createPieceElement(piece);
      slot.appendChild(pieceEl);
    } else {
      slot.innerHTML = '<span class="label">Usada</span>';
    }
    trayEl.appendChild(slot);
  });
}

function updateHud() {
  scoreEl.textContent = String(state.score);
  linesCountEl.textContent = String(state.linesCleared);
  comboCountEl.textContent = `x${state.combo}`;
  if (state.score > state.bestScore) {
    state.bestScore = state.score;
    localStorage.setItem(BEST_SCORE_KEY, String(state.bestScore));
  }
  bestScoreEl.textContent = String(state.bestScore);
  applyPhase();
}

function clearPreview() {
  boardEl.querySelectorAll('.board-cell').forEach((cell) => {
    cell.classList.remove('preview-valid', 'preview-invalid');
  });
}

function getBoardMetrics() {
  const first = boardEl.children[0];
  if (!first) return null;
  const second = boardEl.children[1];
  const firstNextRow = boardEl.children[BOARD_SIZE];
  const firstRect = first.getBoundingClientRect();
  const stepX = second ? second.getBoundingClientRect().left - firstRect.left : firstRect.width;
  const stepY = firstNextRow ? firstNextRow.getBoundingClientRect().top - firstRect.top : firstRect.height;
  return {
    left: firstRect.left,
    top: firstRect.top,
    right: firstRect.left + stepX * (BOARD_SIZE - 1) + firstRect.width,
    bottom: firstRect.top + stepY * (BOARD_SIZE - 1) + firstRect.height,
    cellWidth: firstRect.width,
    cellHeight: firstRect.height,
    stepX,
    stepY
  };
}

function canPlace(board, shape, originX, originY) {
  for (const [dx, dy] of shape.cells) {
    const x = originX + dx;
    const y = originY + dy;
    if (x < 0 || y < 0 || x >= BOARD_SIZE || y >= BOARD_SIZE) return false;
    if (board[cellIndex(x, y)]) return false;
  }
  return true;
}

function getLegalPlacements(board, shape) {
  const placements = [];
  for (let y = 0; y <= BOARD_SIZE - shape.height; y++) {
    for (let x = 0; x <= BOARD_SIZE - shape.width; x++) {
      if (canPlace(board, shape, x, y)) {
        placements.push({ x, y });
      }
    }
  }
  return placements;
}

function getPointerBoardInfo(clientX, clientY, anchorX = 0, anchorY = 0) {
  const metrics = getBoardMetrics();
  if (!metrics) return null;

  const rawOriginX = ((clientX - metrics.left) / metrics.stepX) - anchorX;
  const rawOriginY = ((clientY - metrics.top) / metrics.stepY) - anchorY;
  const placement = {
    x: Math.floor(rawOriginX + 1e-6),
    y: Math.floor(rawOriginY + 1e-6)
  };

  return {
    metrics,
    rawOriginX,
    rawOriginY,
    placement,
    expandedBounds: {
      left: metrics.left - metrics.stepX * SNAP_OUTSIDE_MARGIN_CELLS,
      right: metrics.right + metrics.stepX * SNAP_OUTSIDE_MARGIN_CELLS,
      top: metrics.top - metrics.stepY * SNAP_OUTSIDE_MARGIN_CELLS,
      bottom: metrics.bottom + metrics.stepY * SNAP_OUTSIDE_MARGIN_CELLS
    }
  };
}

function getSnappedPlacement(piece, clientX, clientY, anchorX, anchorY) {
  const info = getPointerBoardInfo(clientX, clientY, anchorX, anchorY);
  if (!info) return { snapped: null, rawPlacement: null, previewPlacement: null, insideSnapArea: false };

  const { metrics, rawOriginX, rawOriginY, placement, expandedBounds } = info;
  const insideSnapArea = clientX >= expandedBounds.left
    && clientX <= expandedBounds.right
    && clientY >= expandedBounds.top
    && clientY <= expandedBounds.bottom;

  let snapped = null;
  if (insideSnapArea) {
    if (canPlace(state.board, piece, placement.x, placement.y)) {
      snapped = placement;
    } else {
      const legalPlacements = getLegalPlacements(state.board, piece);
      const maxDistance = Math.max(metrics.stepX, metrics.stepY) * SNAP_RADIUS_CELLS;
      let best = null;
      let bestDistance = Infinity;

      legalPlacements.forEach((candidate) => {
        const dx = (candidate.x - rawOriginX) * metrics.stepX;
        const dy = (candidate.y - rawOriginY) * metrics.stepY;
        const distance = Math.hypot(dx, dy);
        if (distance <= maxDistance && distance < bestDistance) {
          bestDistance = distance;
          best = candidate;
        }
      });

      snapped = best;
    }
  }

  const previewPlacement = snapped || placement;
  return {
    snapped,
    rawPlacement: placement,
    previewPlacement,
    insideSnapArea
  };
}

function highlightPlacement(piece, placement, isValid = false) {
  clearPreview();
  if (!placement) return false;
  const valid = isValid || canPlace(state.board, piece, placement.x, placement.y);
  for (const [dx, dy] of piece.cells) {
    const x = placement.x + dx;
    const y = placement.y + dy;
    if (x < 0 || y < 0 || x >= BOARD_SIZE || y >= BOARD_SIZE) continue;
    const cell = boardEl.children[cellIndex(x, y)];
    if (!cell) continue;
    cell.classList.add(valid ? 'preview-valid' : 'preview-invalid');
  }
  return valid;
}

function getCompletedLines(board) {
  const rows = [];
  const cols = [];

  for (let y = 0; y < BOARD_SIZE; y++) {
    let full = true;
    for (let x = 0; x < BOARD_SIZE; x++) {
      if (!board[cellIndex(x, y)]) {
        full = false;
        break;
      }
    }
    if (full) rows.push(y);
  }

  for (let x = 0; x < BOARD_SIZE; x++) {
    let full = true;
    for (let y = 0; y < BOARD_SIZE; y++) {
      if (!board[cellIndex(x, y)]) {
        full = false;
        break;
      }
    }
    if (full) cols.push(x);
  }

  return { rows, cols };
}

function simulatePlacement(board, piece, originX, originY, color = '#fff') {
  const next = cloneBoard(board);
  for (const [dx, dy] of piece.cells) {
    next[cellIndex(originX + dx, originY + dy)] = { color };
  }

  const { rows, cols } = getCompletedLines(next);
  const clearedIndexes = [];

  rows.forEach((row) => {
    for (let x = 0; x < BOARD_SIZE; x++) {
      clearedIndexes.push(cellIndex(x, row));
      next[cellIndex(x, row)] = null;
    }
  });

  cols.forEach((col) => {
    for (let y = 0; y < BOARD_SIZE; y++) {
      const idx = cellIndex(col, y);
      if (!clearedIndexes.includes(idx)) clearedIndexes.push(idx);
      next[idx] = null;
    }
  });

  return {
    board: next,
    rows,
    cols,
    lines: rows.length + cols.length,
    clearedIndexes
  };
}

function piecePlayable(board, piece) {
  return getLegalPlacements(board, piece).length > 0;
}

function anyPlayablePiece(board, pieces) {
  return pieces.some((piece) => !piece.used && piecePlayable(board, piece));
}

function trioSolvable(board, trio) {
  const memo = new Map();

  function serialize(b, remainingIds) {
    const compact = b.map((cell) => (cell ? 1 : 0)).join('');
    return `${compact}|${remainingIds.sort().join(',')}`;
  }

  function dfs(currentBoard, remaining) {
    if (remaining.length === 0) return true;
    const key = serialize(currentBoard, remaining.map((p) => p.id));
    if (memo.has(key)) return memo.get(key);

    const ordered = remaining.slice().sort((a, b) => a.area - b.area);
    for (const piece of ordered) {
      const placements = getLegalPlacements(currentBoard, piece);
      for (const placement of placements) {
        const next = simulatePlacement(currentBoard, piece, placement.x, placement.y, '#fff').board;
        const nextRemaining = remaining.filter((p) => p.id !== piece.id);
        if (dfs(next, nextRemaining)) {
          memo.set(key, true);
          return true;
        }
      }
    }

    memo.set(key, false);
    return false;
  }

  return dfs(board, trio);
}

function createPieceFromShape(shapeId, colorIndexOffset = 0) {
  const shape = shapeById[shapeId];
  return {
    id: state.nextPieceId++,
    shapeId,
    cells: shape.cells.map(([x, y]) => [x, y]),
    width: shape.width,
    height: shape.height,
    area: shape.area,
    color: getPieceColor((state.nextPieceId + colorIndexOffset) % 6),
    used: false
  };
}

function findSolvableTrio(board) {
  solverStatusEl.textContent = 'Buscando trio';

  for (let attempt = 0; attempt < 240; attempt++) {
    const trio = [
      createPieceFromShape(weightedRandomShapeId(), 0),
      createPieceFromShape(weightedRandomShapeId(), 1),
      createPieceFromShape(weightedRandomShapeId(), 2)
    ];
    if (trioSolvable(board, trio)) {
      solverStatusEl.textContent = 'Trio jogável';
      return trio;
    }
  }

  const easyShapes = ['single', 'domino_h', 'domino_v', 'triple_h', 'triple_v', 'square2', 'l3_1', 'l3_2', 'l3_3', 'l3_4'];
  for (let i = 0; i < easyShapes.length; i++) {
    for (let j = 0; j < easyShapes.length; j++) {
      for (let k = 0; k < easyShapes.length; k++) {
        const trio = [
          createPieceFromShape(easyShapes[i], 0),
          createPieceFromShape(easyShapes[j], 1),
          createPieceFromShape(easyShapes[k], 2)
        ];
        if (trioSolvable(board, trio)) {
          solverStatusEl.textContent = 'Trio seguro';
          return trio;
        }
      }
    }
  }

  const anyFitShape = shapeDefs.find((shape) => piecePlayable(board, shape));
  if (anyFitShape) {
    solverStatusEl.textContent = 'Fallback jogável';
    return [
      createPieceFromShape(anyFitShape.id, 0),
      createPieceFromShape(weightedRandomShapeId(), 1),
      createPieceFromShape(weightedRandomShapeId(), 2)
    ];
  }

  solverStatusEl.textContent = 'Sem movimentos';
  return [
    createPieceFromShape(weightedRandomShapeId(), 0),
    createPieceFromShape(weightedRandomShapeId(), 1),
    createPieceFromShape(weightedRandomShapeId(), 2)
  ];
}

function loadNewTrio() {
  state.pieces = findSolvableTrio(state.board);
  state.selectedPieceId = null;
  renderTray();
  playSound('new-trio');
  evaluateGameOver();
}

function finishTurnIfNeeded() {
  if (state.pieces.every((piece) => piece.used)) {
    loadNewTrio();
  } else {
    renderTray();
    evaluateGameOver();
  }
}

function addScore(placedBlocks, lines) {
  const placementPoints = placedBlocks * 5;
  let linePoints = 0;

  if (lines > 0) {
    linePoints = (lines * 50) + ((lines - 1) * 30);
    state.combo += 1;
    linePoints += state.combo * 20;
  } else {
    state.combo = 0;
  }

  state.score += placementPoints + linePoints;
  state.linesCleared += lines;
  updateHud();
}

function placePiece(pieceId, x, y) {
  if (state.gameOver) return false;
  const piece = state.pieces.find((p) => p.id === pieceId && !p.used);
  if (!piece) return false;
  if (!canPlace(state.board, piece, x, y)) return false;

  const result = simulatePlacement(state.board, piece, x, y, piece.color);
  state.board = result.board;
  piece.used = true;
  state.clearFlash = result.clearedIndexes;
  addScore(piece.area, result.lines);
  state.selectedPieceId = null;
  renderBoard();
  clearPreview();
  renderTray();

  playSound('place');
  if (result.lines > 0) {
    playSound('clear', { lines: result.lines, combo: state.combo });
  }

  window.setTimeout(() => {
    state.clearFlash = [];
    renderBoard();
  }, CLEAR_FLASH_MS);

  finishTurnIfNeeded();
  return true;
}

function evaluateGameOver() {
  if (state.gameOver) return;
  const playable = anyPlayablePiece(state.board, state.pieces);
  if (!playable) {
    state.gameOver = true;
    playSound('game-over');
    openModal('Fim de jogo', `
      <p>Sua rodada terminou porque nenhuma das peças atuais cabe no tabuleiro.</p>
      <p><strong>Pontuação final:</strong> ${state.score}</p>
      <p><strong>Linhas limpas:</strong> ${state.linesCleared}</p>
      <p>Use <strong>Novo jogo</strong> para começar outra partida.</p>
    `);
  }
}

function resetGame() {
  cancelActiveDrag();
  state.board = new Array(CELLS).fill(null);
  state.pieces = [];
  state.nextPieceId = 1;
  state.score = 0;
  state.linesCleared = 0;
  state.combo = 0;
  state.selectedPieceId = null;
  state.gameOver = false;
  state.clearFlash = [];
  updateHud();
  renderBoard();
  loadNewTrio();
}

function openModal(title, html) {
  modalTitleEl.textContent = title;
  modalBodyEl.innerHTML = html;
  modalEl.classList.remove('hidden');
  modalEl.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modalEl.classList.add('hidden');
  modalEl.setAttribute('aria-hidden', 'true');
}

function showHelp() {
  openModal('Como jogar', `
    <p>O objetivo é manter o tabuleiro 8x8 vivo o máximo possível.</p>
    <ul>
      <li>Você recebe <strong>3 peças por rodada</strong>.</li>
      <li>Arraste uma peça para o tabuleiro.</li>
      <li>Se você soltar um pouco fora do lugar, o jogo tenta <strong>encaixar na posição válida mais próxima</strong>, mas só dentro de um raio curto.</li>
      <li>Linhas e colunas completas são removidas automaticamente.</li>
      <li>Depois de usar as 3 peças, um novo trio é gerado.</li>
      <li>O gerador tenta encontrar <strong>trios jogáveis</strong> sempre que houver solução viável.</li>
      <li>A fase muda conforme a pontuação e altera o tema visual.</li>
    </ul>
  `);
}

function handlePieceClick(event) {
  if (state.drag) return;
  if (performance.now() < state.ignoreClickUntil) return;
  const pieceId = Number(event.currentTarget.dataset.pieceId);
  const piece = state.pieces.find((p) => p.id === pieceId);
  if (!piece || piece.used || state.gameOver) return;
  state.selectedPieceId = state.selectedPieceId === pieceId ? null : pieceId;
  renderTray();
}

function boardClickPlace(event) {
  if (state.gameOver || state.drag) return;
  if (!state.selectedPieceId) return;
  const piece = state.pieces.find((p) => p.id === state.selectedPieceId && !p.used);
  if (!piece) return;
  const cell = event.target.closest('.board-cell');
  if (!cell) return;
  const x = Number(cell.dataset.x);
  const y = Number(cell.dataset.y);
  const placed = placePiece(piece.id, x, y);
  if (!placed) {
    playSound('invalid');
  }
}

function startDrag(event) {
  if (state.gameOver) return;
  if (event.button !== undefined && event.button !== 0) return;
  event.preventDefault();
  ensureAudio();

  const pieceId = Number(event.currentTarget.dataset.pieceId);
  const piece = state.pieces.find((p) => p.id === pieceId);
  if (!piece || piece.used) return;

  const pieceRect = event.currentTarget.getBoundingClientRect();
  const unitX = pieceRect.width / piece.width;
  const unitY = pieceRect.height / piece.height;
  const localX = Math.max(0, Math.min(pieceRect.width - 1, event.clientX - pieceRect.left));
  const localY = Math.max(0, Math.min(pieceRect.height - 1, event.clientY - pieceRect.top));
  const anchorX = Math.floor(localX / unitX);
  const anchorY = Math.floor(localY / unitY);
  const anchorOffsetX = localX / unitX;
  const anchorOffsetY = localY / unitY;
  const metrics = getBoardMetrics();
  const ghostUnit = metrics ? Math.min(metrics.cellWidth, metrics.cellHeight) : Math.max(unitX, unitY);

  const ghost = createPieceElement(piece, { forGhost: true, unitSize: ghostUnit });
  ghost.classList.add('piece-ghost');
  document.body.appendChild(ghost);

  event.currentTarget.classList.add('dragging-source');
  if (event.currentTarget.setPointerCapture && event.pointerId !== undefined) {
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch (_) {
      // ignore capture failures
    }
  }

  state.drag = {
    pieceId,
    piece,
    ghost,
    sourceEl: event.currentTarget,
    anchorX,
    anchorY,
    anchorOffsetX,
    anchorOffsetY,
    startX: event.clientX,
    startY: event.clientY,
    pointerId: event.pointerId,
    moved: false,
    snappedPlacement: null,
    lastPreviewPlacement: null,
    lastInsideSnapArea: false
  };

  playSound('pickup');
  updateGhostPosition(state.drag, event.clientX, event.clientY, false);
  updateDragPreview(event.clientX, event.clientY);

  window.addEventListener('pointermove', onDragMove);
  window.addEventListener('pointerup', endDrag, { once: true });
  window.addEventListener('pointercancel', cancelPointerDrag, { once: true });
}

function updateGhostPosition(dragState, clientX, clientY, preferSnap) {
  const metrics = getBoardMetrics();
  if (!metrics) return;

  const stepX = metrics.stepX;
  const stepY = metrics.stepY;
  const freeLeft = clientX - (dragState.anchorOffsetX * stepX);
  const freeTop = clientY - (dragState.anchorOffsetY * stepY);

  let left = freeLeft;
  let top = freeTop;
  let snapped = false;

  if (preferSnap && dragState.snappedPlacement) {
    left = metrics.left + dragState.snappedPlacement.x * metrics.stepX;
    top = metrics.top + dragState.snappedPlacement.y * metrics.stepY;
    snapped = true;
  }

  dragState.ghost.style.left = `${left}px`;
  dragState.ghost.style.top = `${top}px`;
  dragState.ghost.classList.toggle('snapped', snapped);
}

function updateDragPreview(clientX, clientY) {
  if (!state.drag) return;
  const snapInfo = getSnappedPlacement(state.drag.piece, clientX, clientY, state.drag.anchorX, state.drag.anchorY);
  state.drag.snappedPlacement = snapInfo.snapped;
  state.drag.lastPreviewPlacement = snapInfo.previewPlacement;
  state.drag.lastInsideSnapArea = snapInfo.insideSnapArea;
  highlightPlacement(state.drag.piece, snapInfo.previewPlacement, Boolean(snapInfo.snapped));
  updateGhostPosition(state.drag, clientX, clientY, Boolean(snapInfo.snapped));
}

function onDragMove(event) {
  if (!state.drag) return;
  const delta = Math.hypot(event.clientX - state.drag.startX, event.clientY - state.drag.startY);
  if (delta >= TAP_DRAG_THRESHOLD_PX) {
    state.drag.moved = true;
  }
  updateDragPreview(event.clientX, event.clientY);
}

function cleanupDragVisuals() {
  if (!state.drag) return;
  state.drag.sourceEl.classList.remove('dragging-source');
  state.drag.ghost.remove();
  clearPreview();
}

function cancelActiveDrag() {
  window.removeEventListener('pointermove', onDragMove);
  window.removeEventListener('pointercancel', cancelPointerDrag);
  if (!state.drag) return;
  cleanupDragVisuals();
  state.drag = null;
}

function cancelPointerDrag() {
  cancelActiveDrag();
}

function endDrag(event) {
  window.removeEventListener('pointermove', onDragMove);
  window.removeEventListener('pointercancel', cancelPointerDrag);
  if (!state.drag) return;

  updateDragPreview(event.clientX, event.clientY);
  const dragState = state.drag;
  const { pieceId, snappedPlacement, moved, piece } = dragState;

  cleanupDragVisuals();
  state.drag = null;

  const now = performance.now();
  const wasTap = !moved && Math.hypot(event.clientX - dragState.startX, event.clientY - dragState.startY) < TAP_DRAG_THRESHOLD_PX;

  if (snappedPlacement) {
    const placed = placePiece(pieceId, snappedPlacement.x, snappedPlacement.y);
    if (!placed) playSound('invalid');
    state.ignoreClickUntil = now + 250;
    return;
  }

  if (wasTap) {
    state.selectedPieceId = state.selectedPieceId === pieceId ? null : pieceId;
    renderTray();
    state.ignoreClickUntil = now + 250;
    return;
  }

  if (dragState.lastInsideSnapArea) {
    highlightPlacement(piece, dragState.lastPreviewPlacement, false);
    window.setTimeout(clearPreview, 70);
  }
  playSound('invalid');
  state.ignoreClickUntil = now + 220;
}

function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  localStorage.setItem(SOUND_KEY, state.soundEnabled ? '1' : '0');
  updateSoundButton();
  if (state.soundEnabled) {
    ensureAudio();
    playSound('pickup');
  }
}

boardEl.addEventListener('click', boardClickPlace);
document.getElementById('new-game-btn').addEventListener('click', () => {
  ensureAudio();
  resetGame();
});
document.getElementById('help-btn').addEventListener('click', showHelp);
document.getElementById('modal-close').addEventListener('click', closeModal);
soundBtnEl.addEventListener('click', toggleSound);

modalEl.addEventListener('click', (event) => {
  if (event.target === modalEl) closeModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
    state.selectedPieceId = null;
    cancelActiveDrag();
    renderTray();
  }
});

window.addEventListener('blur', cancelActiveDrag);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) cancelActiveDrag();
});
document.addEventListener('pointerdown', () => {
  ensureAudio();
}, { passive: true });

initAds();
updateSoundButton();
applyPhase();
renderBoard();
resetGame();
