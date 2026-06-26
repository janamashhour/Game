import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PauseMenu       from '../components/common/pause';
import SettingsOverlay from '../components/common/settingsOverlay';
import pause    from '../assets/icons/pauseIcon.svg';
import cluebook from '../assets/icons/clueBookIcon.svg';
import './levelOne.css';
import { wordPool }    from '../data/wordPool';
import { storyLevels } from '../data/levelConfig';

const config    = storyLevels.find(l => l.id === 3);
const wordData  = wordPool.find(w => w.id === config.wordId);
const { word, rounds } = wordData;

const DIFFICULTY = {
  timeLimit:     config.timeLimit,
  maxWrongTries: config.maxWrong,
  warningTime:   config.warningTime,
};

const getOrdinal = (n) => {
  const ordinals = ['first','second','third','fourth','fifth','sixth','seventh'];
  return ordinals[n - 1] || `${n}th`;
};

const getRandomOptions = (correct, wrongPool) => {
  const shuffled = [...wrongPool].sort(() => Math.random() - 0.5);
  const options  = [correct, ...shuffled.slice(0, 2)];
  return options.sort(() => Math.random() - 0.5);
};

const generateAllOptions = () =>
  rounds.map(r => ({ ...r, options: getRandomOptions(r.correct, r.wrongPool) }));

const LevelThree = ({ isMusicMuted, onToggleMusic }) => {
  const navigate  = useNavigate();
  const timerRef  = useRef(null);
  const audioRef  = useRef(null);

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

  const [roundData,    setRoundData]    = useState(() => generateAllOptions());
  const [currentRound, setCurrentRound] = useState(0);
  const [decoded,      setDecoded]      = useState([]);
  const [wrongTries,   setWrongTries]   = useState(0);
  const [timeLeft,     setTimeLeft]     = useState(DIFFICULTY.timeLimit);
  const [showFail,     setShowFail]     = useState(false);
  const [failReason,   setFailReason]   = useState('');
  const [showSuccess,  setShowSuccess]  = useState(false);

  const round = roundData[currentRound];

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
      if (newDecoded.length === rounds.length) {
        clearInterval(timerRef.current);
        setShowSuccess(true);
      } else {
        setCurrentRound(i => i + 1);
      }
    } else {
      const newWrong = wrongTries + 1;
      setWrongTries(newWrong);
      setFailReason(newWrong >= DIFFICULTY.maxWrongTries ? 'tries' : 'wrong');
      if (newWrong >= DIFFICULTY.maxWrongTries) clearInterval(timerRef.current);
      setShowFail(true);
    }
  };

  const handleDismissFail = () => {
    if (failReason === 'time' || failReason === 'tries') return;
    setShowFail(false);
  };

  const handleRestart = () => {
    setRoundData(generateAllOptions());
    setCurrentRound(0);
    setDecoded([]);
    setWrongTries(0);
    setTimeLeft(DIFFICULTY.timeLimit);
    setShowFail(false);
    setShowSuccess(false);
    setFailReason('');
    setIsPaused(false);
  };

  const Header = () => (
    <div className="levelOneHeader">
      <button
        className="intro-hud-btn intro-hud-btn--pause"
        onClick={handlePause}
        disabled={isPaused}
        aria-label="Pause"
      >
        <img src={pause} alt="pause icon" />
      </button>
      <button className="cluebookIcon" onClick={() => setShowCluebook(true)}>
        <img className="cluebookIcon" src={cluebook} alt="cluebook icon" />
      </button>
    </div>
  );

  if (showCluebook) return (
    <div className="cluebookPage">
      <Header />
      <button className="splashBtn" onClick={() => setShowCluebook(false)}>CONTINUE</button>
    </div>
  );

  if (showSuccess) return (
    <div className="successPage">
      <div className="successPaper">
        <h2 className="successTitle">DECODED</h2>
        <div className="successLetterRow">
          {word.split('').map((letter, i) => (
            <div key={i} className="successLetterBox">{letter}</div>
          ))}
        </div>
        <p className="successMessage">The suspect has been identified.</p>
        <button className="splashBtn" onClick={() => navigate(config.debrief)}>NEXT</button>
      </div>
    </div>
  );

  return (
    <>
      <div className="levelOne">
        <Header />

        <div className="levelOneHud">
          <div className="triesRow">
            {Array.from({ length: DIFFICULTY.maxWrongTries }).map((_, i) => (
              <span key={i} className={`tryIcon ${i < wrongTries ? 'tryIcon--used' : ''}`}>✕</span>
            ))}
          </div>
          <div className={`timer ${timeLeft <= DIFFICULTY.warningTime ? 'timer--warning' : ''}`}>
            {timeLeft}s
          </div>
        </div>

        <div className="levelOnePaper">
          <h2 className="decodeTitle">Decode {getOrdinal(currentRound + 1)} letter</h2>

          <div className="morseGrid">
            <div className="morseRow">
              {roundData.map((r, i) => (
                <div key={i} className={`morseCell ${i === currentRound ? 'morseCell--active' : ''}`}>
                  {r.morse}
                </div>
              ))}
            </div>
            <div className="morseRow">
              {roundData.map((_, i) => (
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
                <p className="failTries">{DIFFICULTY.maxWrongTries - wrongTries} tries remaining</p>
                <p className="failHint">click anywhere to continue</p>
              </>}
              {failReason === 'tries' && <>
                <h3 className="failTitle">NO TRIES LEFT</h3>
                <p className="failText">You've made too many mistakes.</p>
                <button className="splashBtn" onClick={(e) => { e.stopPropagation(); handleRestart(); }}>Try Again</button>
                <button className="failMenuBtn" onClick={(e) => { e.stopPropagation(); navigate('/mainMenu'); }}>Main Menu</button>
              </>}
              {failReason === 'time' && <>
                <h3 className="failTitle">TIME'S UP</h3>
                <p className="failText">The code went cold.</p>
                <button className="splashBtn" onClick={(e) => { e.stopPropagation(); handleRestart(); }}>Try Again</button>
                <button className="failMenuBtn" onClick={(e) => { e.stopPropagation(); navigate('/mainMenu'); }}>Main Menu</button>
              </>}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LevelThree;