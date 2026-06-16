import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PauseMenu       from '../components/common/pause';
import SettingsOverlay from '../components/common/settingsOverlay';
import pause    from '../assets/icons/pauseIcon.svg';
import cluebook from '../assets/icons/clueBookIcon.svg';
import cluebookPage from '../assets/imgs/cluebookPage.jpg';
import './levelOne.css'; // same visual style as decode levels
import { wordPool, getRandomWord } from '../data/wordPool';
import { timeLimits, wrongTryLimits, warningTimes } from '../data/levelConfig';
import { getEndlessLevel, incrementEndlessLevel } from '../data/levelConfig';

const getOrdinal = (n) => {
  const ordinals = ['first','second','third','fourth','fifth','sixth','seventh','eighth'];
  return ordinals[n - 1] || `${n}th`;
};

const getRandomOptions = (correct, wrongPool) => {
  const shuffled = [...wrongPool].sort(() => Math.random() - 0.5);
  return [correct, ...shuffled.slice(0, 2)].sort(() => Math.random() - 0.5);
};

// Builds one full round of gameplay: picks a word + generates difficulty
const buildLevel = (endlessLevelNum) => {
  const wordData = getRandomWord();
  const diffIndex = Math.min(endlessLevelNum - 1, timeLimits.length - 1);

  return {
    word: wordData.word,
    rounds: wordData.rounds.map(r => ({ ...r, options: getRandomOptions(r.correct, r.wrongPool) })),
    timeLimit:    timeLimits[diffIndex],
    maxWrongTries: wrongTryLimits[diffIndex],
    warningTime:  warningTimes[diffIndex],
  };
};

const EndlessDecode = ({ isMusicMuted, onToggleMusic }) => {
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  const [endlessLevelNum, setEndlessLevelNum] = useState(() => getEndlessLevel('decode'));
  const [level, setLevel] = useState(() => buildLevel(endlessLevelNum));

  const [showCluebook, setShowCluebook] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [isPaused,     setIsPaused]     = useState(false);

  const handleOpenSettings  = () => setShowSettings(true);
  const handleCloseSettings = () => setShowSettings(false);
  const handleToggleSound   = () => setIsSoundMuted(s => !s);

  const handlePause = useCallback(() => {
    audioRef.current?.pause();
    clearInterval(timerRef.current);
    setIsPaused(true);
  }, []);

  const handleResume = useCallback(() => {
    setIsPaused(false);
    setShowSettings(false);
    audioRef.current?.play().catch(() => {});
  }, []);

  const [currentRound, setCurrentRound] = useState(0);
  const [decoded,      setDecoded]      = useState([]);
  const [wrongTries,   setWrongTries]   = useState(0);
  const [timeLeft,     setTimeLeft]     = useState(level.timeLimit);
  const [showFail,     setShowFail]     = useState(false);
  const [failReason,   setFailReason]   = useState('');
  const [showSuccess,  setShowSuccess]  = useState(false);

  const round = level.rounds[currentRound];

  useEffect(() => {
    if (isPaused || showFail || showSuccess || showCluebook) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setFailReason('time');
          setShowFail(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [isPaused, showFail, showSuccess, showCluebook]);

  const handlePick = (letter) => {
    if (isPaused) return;
    if (letter === round.correct) {
      const newDecoded = [...decoded, letter];
      setDecoded(newDecoded);
      if (newDecoded.length === level.rounds.length) {
        clearInterval(timerRef.current);
        setShowSuccess(true);
      } else {
        setCurrentRound(i => i + 1);
      }
    } else {
      const newWrong = wrongTries + 1;
      setWrongTries(newWrong);
      setFailReason(newWrong >= level.maxWrongTries ? 'tries' : 'wrong');
      if (newWrong >= level.maxWrongTries) clearInterval(timerRef.current);
      setShowFail(true);
    }
  };

  const handleDismissFail = () => {
    if (failReason === 'time' || failReason === 'tries') return;
    setShowFail(false);
  };

  // Replay the SAME level on loss — does not advance or change difficulty
  const handleRestart = () => {
    setLevel(buildLevel(endlessLevelNum)); // re-randomize word + options, same difficulty
    setCurrentRound(0);
    setDecoded([]);
    setWrongTries(0);
    setShowFail(false);
    setFailReason('');
    setIsPaused(false);
  };
  useEffect(() => { setTimeLeft(level.timeLimit); }, [level]);

  // On win — advance to the next endless level
  const handleContinue = () => {
    const nextLevelNum = incrementEndlessLevel('decode');
    setEndlessLevelNum(nextLevelNum);
    setLevel(buildLevel(nextLevelNum));
    setCurrentRound(0);
    setDecoded([]);
    setWrongTries(0);
    setShowSuccess(false);
    setIsPaused(false);
  };

  const Header = () => (
    <div className="levelOneHeader">
      <button className="intro-hud-btn intro-hud-btn--pause" onClick={handlePause} disabled={isPaused}>
        <img src={pause} alt="pause" />
      </button>
      <button className="cluebookIcon" onClick={() => setShowCluebook(true)}>
        <img className="cluebookIcon" src={cluebook} alt="cluebook" />
      </button>
    </div>
  );

  if (showCluebook) return (
    <div className="cluebookPage">
      <Header />
      <img src={cluebookPage} alt="Morse Code Reference" className="cluebookImage" />
      <button className="splashBtn" onClick={() => setShowCluebook(false)}>CONTINUE</button>
    </div>
  );

  if (showSuccess) return (
    <div className="successPage">
      <Header />
      <div className="successPaper">
        <h2 className="successTitle">DECODED</h2>
        <div className="successLetterRow">
          {level.word.split('').map((letter, i) => (
            <div key={i} className="successLetterBox">{letter}</div>
          ))}
        </div>
        <p className="successMessage">Endless Level {endlessLevelNum} complete.</p>
        <button className="splashBtn" onClick={handleContinue}>NEXT LEVEL</button>
        <button className="failMenuBtn" onClick={() => navigate('/levelMap')}>Level Map</button>
      </div>
    </div>
  );

  return (
    <>
      <div className="levelOne">
        <Header />

        <div className="levelOneHud">
          <div className="triesRow">
            {Array.from({ length: level.maxWrongTries }).map((_, i) => (
              <span key={i} className={`tryIcon ${i < wrongTries ? 'tryIcon--used' : ''}`}>✕</span>
            ))}
          </div>
          <div className={`timer ${timeLeft <= level.warningTime ? 'timer--warning' : ''}`}>
            {timeLeft}s
          </div>
        </div>

        <div className="levelOnePaper">
          <h2 className="decodeTitle">
            Endless Lv.{endlessLevelNum} — Decode {getOrdinal(currentRound + 1)} letter
          </h2>

          <div className="morseGrid">
            <div className="morseRow">
              {level.rounds.map((r, i) => (
                <div key={i} className={`morseCell ${i === currentRound ? 'morseCell--active' : ''}`}>
                  {r.morse}
                </div>
              ))}
            </div>
            <div className="morseRow">
              {level.rounds.map((_, i) => (
                <div key={i} className="morseCell morseCell--answer">
                  {decoded[i] || ''}
                </div>
              ))}
            </div>
          </div>

          <div className="letterChoices">
            {round.options.map((letter) => (
              <button key={letter} className="letterBtn" onClick={() => handlePick(letter)} disabled={isPaused}>
                {letter}
              </button>
            ))}
          </div>
        </div>

        {isPaused && !showSettings && (
          <PauseMenu onResume={handleResume} onOpenSettings={handleOpenSettings} onMainMenu={() => navigate('/mainMenu')} />
        )}
        {isPaused && showSettings && (
          <SettingsOverlay isMusicMuted={isMusicMuted} isSoundMuted={isSoundMuted} onToggleMusic={onToggleMusic} onToggleSound={handleToggleSound} onBack={handleCloseSettings} />
        )}

        {showFail && (
          <div className="failOverlay" onClick={handleDismissFail}>
            <div className="failCard">
              {failReason === 'wrong' && <>
                <h3 className="failTitle">THAT DOESN'T MATCH</h3>
                <p className="failText">Recheck the pattern.</p>
                <p className="failTries">{level.maxWrongTries - wrongTries} tries remaining</p>
                <p className="failHint">click anywhere to continue</p>
              </>}
              {failReason === 'tries' && <>
                <h3 className="failTitle">NO TRIES LEFT</h3>
                <p className="failText">You've made too many mistakes.</p>
                <button className="splashBtn" onClick={(e) => { e.stopPropagation(); handleRestart(); }}>Try Again</button>
                <button className="failMenuBtn" onClick={(e) => { e.stopPropagation(); navigate('/levelMap'); }}>Level Map</button>
              </>}
              {failReason === 'time' && <>
                <h3 className="failTitle">TIME'S UP</h3>
                <p className="failText">The code went cold.</p>
                <button className="splashBtn" onClick={(e) => { e.stopPropagation(); handleRestart(); }}>Try Again</button>
                <button className="failMenuBtn" onClick={(e) => { e.stopPropagation(); navigate('/levelMap'); }}>Level Map</button>
              </>}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EndlessDecode;