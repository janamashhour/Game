// wordPool.js
// ─────────────────────────────────────────────────────────────
// All decodable words for both story and endless decode levels.
// Each word has its morse patterns and wrong letter pools.
// ─────────────────────────────────────────────────────────────

export const wordPool = [
  {
    id: 'warehouse',
    word: 'WAREHOUSE',
    storyLevel: 1,
    rounds: [
      { morse: '.--',  correct: 'W', wrongPool: ['B', 'C', 'K', 'F', 'Q'] },
      { morse: '.-',   correct: 'A', wrongPool: ['F', 'K', 'N', 'T', 'I'] },
      { morse: '.-.',  correct: 'R', wrongPool: ['N', 'Q', 'S', 'B', 'V'] },
      { morse: '.',    correct: 'E', wrongPool: ['I', 'Z', 'T', 'A', 'S'] },
      { morse: '....', correct: 'H', wrongPool: ['T', 'D', 'F', 'L', 'X'] },
      { morse: '---',  correct: 'O', wrongPool: ['M', 'S', 'T', 'K', 'G'] },
      { morse: '..-',  correct: 'U', wrongPool: ['R', 'V', 'F', 'S', 'D'] },
      { morse: '...',  correct: 'S', wrongPool: ['R', 'E', 'H', 'V', 'N'] },
      { morse: '.',    correct: 'E', wrongPool: ['U', 'O', 'I', 'A', 'T'] },
    ],
  },
  {
    id: 'suspect',
    word: 'SUSPECT',
    storyLevel: 3,
    rounds: [
      { morse: '...',   correct: 'S', wrongPool: ['H', 'V', 'R', 'E', 'F'] },
      { morse: '..-',   correct: 'U', wrongPool: ['V', 'F', 'R', 'D', 'B'] },
      { morse: '...', correct: 'S', wrongPool: ['H', 'I', 'E', 'N', 'T'] },
      { morse: '.--.', correct: 'P', wrongPool: ['F', 'B', 'X', 'L', 'W'] },
      { morse: '.',     correct: 'E', wrongPool: ['I', 'T', 'A', 'S', 'N'] },
      { morse: '-.-.',  correct: 'C', wrongPool: ['K', 'G', 'Q', 'Y', 'Z'] },
      { morse: '-',     correct: 'T', wrongPool: ['M', 'N', 'E', 'A', 'I'] },
    ],
  },
  // ── Endless pool — used for levels 5+ ──────────────────────
  {
    id: 'archive',
    word: 'ARCHIVE',
    rounds: [
      { morse: '.-',   correct: 'A', wrongPool: ['E', 'I', 'N', 'T', 'S'] },
      { morse: '.-.',  correct: 'R', wrongPool: ['L', 'N', 'S', 'V', 'B'] },
      { morse: '-.-.',  correct: 'C', wrongPool: ['K', 'G', 'Q', 'D', 'Z'] },
      { morse: '....', correct: 'H', wrongPool: ['S', 'V', 'F', 'L', 'N'] },
      { morse: '..',   correct: 'I', wrongPool: ['E', 'S', 'T', 'N', 'A'] },
      { morse: '...-', correct: 'V', wrongPool: ['U', 'F', 'S', 'B', 'H'] },
      { morse: '.',    correct: 'E', wrongPool: ['I', 'T', 'A', 'N', 'S'] },
    ],
  },
  {
    id: 'witness',
    word: 'WITNESS',
    rounds: [
      { morse: '.--',  correct: 'W', wrongPool: ['V', 'U', 'J', 'P', 'Y'] },
      { morse: '..',   correct: 'I', wrongPool: ['E', 'S', 'T', 'A', 'N'] },
      { morse: '-',    correct: 'T', wrongPool: ['M', 'N', 'E', 'A', 'I'] },
      { morse: '-.',   correct: 'N', wrongPool: ['M', 'D', 'K', 'A', 'T'] },
      { morse: '.',    correct: 'E', wrongPool: ['I', 'T', 'A', 'S', 'N'] },
      { morse: '...',  correct: 'S', wrongPool: ['H', 'V', 'R', 'E', 'F'] },
      { morse: '...',  correct: 'S', wrongPool: ['H', 'I', 'E', 'N', 'T'] },
    ],
  },
  {
    id: 'motive',
    word: 'MOTIVE',
    rounds: [
      { morse: '--',   correct: 'M', wrongPool: ['N', 'K', 'T', 'D', 'G'] },
      { morse: '---',  correct: 'O', wrongPool: ['M', 'G', 'Q', 'K', 'T'] },
      { morse: '-',    correct: 'T', wrongPool: ['N', 'E', 'M', 'A', 'I'] },
      { morse: '..',   correct: 'I', wrongPool: ['E', 'S', 'T', 'A', 'N'] },
      { morse: '...-', correct: 'V', wrongPool: ['F', 'U', 'B', 'H', 'S'] },
      { morse: '.',    correct: 'E', wrongPool: ['I', 'T', 'A', 'S', 'N'] },
    ],
  },
  {
    id: 'signal',
    word: 'SIGNAL',
    rounds: [
      { morse: '...',  correct: 'S', wrongPool: ['H', 'V', 'R', 'E', 'F'] },
      { morse: '..',   correct: 'I', wrongPool: ['E', 'S', 'T', 'A', 'N'] },
      { morse: '--.',  correct: 'G', wrongPool: ['Q', 'Z', 'K', 'D', 'N'] },
      { morse: '-.',   correct: 'N', wrongPool: ['M', 'D', 'K', 'A', 'T'] },
      { morse: '.-',   correct: 'A', wrongPool: ['E', 'I', 'N', 'T', 'S'] },
      { morse: '.-..',  correct: 'L', wrongPool: ['R', 'F', 'P', 'B', 'V'] },
    ],
  },
];

// ── Helper: pick a random word from endless pool ─────────────
// excludes story words so they don't repeat in endless mode
export const getRandomWord = () => {
  const endlessPool = wordPool.filter(w => !w.storyLevel);
  return endlessPool[Math.floor(Math.random() * endlessPool.length)];
};