export const timeLimits      = [60, 50, 45, 35, 30, 25, 20];
export const wrongTryLimits  = [3,  3,  2,  2,  2,  1,  1];
export const warningTimes    = [10, 10, 10, 8,  8,  5,  5];
export const itemCounts      = [6,  8,  8,  8,  8,  8,  8];

export const storyLevels = [
  {
    id:       1,
    type:     'decode',
    wordId:   'warehouse',
    timeLimit:    timeLimits[0],
    maxWrong:     wrongTryLimits[0],
    warningTime:  warningTimes[0],
    background:   'levelOneBg.jpg',
    debrief:      '/levelOneDebrief',
  },
  {
    id:       2,
    type:     'collect',
    itemSet:  'level2',
    timeLimit:    timeLimits[0],
    maxWrong:     wrongTryLimits[0],
    warningTime:  warningTimes[0],
    background:   'level2Bg.jpg',
    debrief:      '/levelTwoDebrief',
  },
  {
    id:       3,
    type:     'decode',
    wordId:   'suspect',
    timeLimit:    timeLimits[2],     // 45s — harder
    maxWrong:     wrongTryLimits[2], // 2
    warningTime:  warningTimes[2],   // 10s
    background:   'level3Bg.jpg',   // placeholder
    debrief:      '/levelThreeDebrief',
  },
  {
    id:       4,
    type:     'collect',
    itemSet:  'level4',
    timeLimit:    timeLimits[2],
    maxWrong:     wrongTryLimits[2],
    warningTime:  warningTimes[2],
    background:   'level4Bg.jpg',
    debrief:      '/levelFourDebrief',
  },
];

export const generateEndlessLevel = (levelNumber, type) => {
  const diffIndex = Math.min(levelNumber - 1, timeLimits.length - 1);
  const backgrounds = ['endlessBg1.jpg', 'endlessBg2.jpg', 'endlessBg3.jpg'];
  const background  = backgrounds[Math.floor(Math.random() * backgrounds.length)];

  return {
    levelNumber,
    type,
    timeLimit:   timeLimits[diffIndex],
    maxWrong:    wrongTryLimits[diffIndex],
    warningTime: warningTimes[diffIndex],
    background,
  };
};

// ── Endless progress (persisted in localStorage) ──────────────
export const getEndlessLevel = (type) => {
  const key = `endlessLevel_${type}`; // 'decode' or 'collect'
  return parseInt(localStorage.getItem(key) || '1', 10);
};

export const incrementEndlessLevel = (type) => {
  const key = `endlessLevel_${type}`;
  const current = getEndlessLevel(type);
  localStorage.setItem(key, String(current + 1));
  return current + 1;
};