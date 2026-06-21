import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PauseMenu       from '../components/common/pause';
import SettingsOverlay from '../components/common/settingsOverlay';
import pause    from '../assets/icons/pauseIcon.svg';
import cluebook from '../assets/icons/clueBookIcon.svg';
import cluebookPage from '../assets/imgs/cluebookPage.jpg';
import './levelTwo.css';
import { pickRandom8 } from '../data/itemsPool';
import { timeLimits, wrongTryLimits, warningTimes } from '../data/levelConfig';
import { getEndlessLevel, incrementEndlessLevel } from '../data/levelConfig';

const backgrounds = ['endlessBg1.jpg', 'endlessBg2.jpg', 'endlessBg3.jpg'];

const buildLevel = (endlessLevelNum) => {
  const diffIndex = Math.min(endlessLevelNum - 1, timeLimits.length - 1);
  return {
    items:       pickRandom8(),
    background:  backgrounds[Math.floor(Math.random() * backgrounds.length)],
    timeLimit:    timeLimits[diffIndex],
    maxWrongClicks: wrongTryLimits[diffIndex],
    warningTime:  warningTimes[diffIndex],
  };
};

const EndlessCollect = ({ isMusicMuted, onToggleMusic }) => {
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const [endlessLevelNum, setEndlessLevelNum] = useState(() => getEndlessLevel('collect'));
  const [level, setLevel] = useState(() => buildLevel(endlessLevelNum));

  const [showCluebook, setShowCluebook] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [isPaused,     setIsPaused]     = useState(false);

  const handleOpenSettings  = () => setShowSettings(true);
  const handleCloseSettings = () => setShowSettings(false);
  const handleToggleSound   = () => setIsSoundMuted(s => !s);

  const handlePause  = useCallback(() => { clearInterval(timerRef.current); setIsPaused(true); }, []);
  const handleResume = useCallback(() => { setIsPaused(false); setShowSettings(false); }, []);

  const [collected,   setCollected]   = useState([]);
  const [wrongClicks, setWrongClicks] = useState(0);
  const [timeLeft,    setTimeLeft]    = useState(level.timeLimit);
  const [showFail,    setShowFail]    = useState(false);
  const [failReason,  setFailReason]  = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [wrongFlash,  setWrongFlash]  = useState(false);

  const allCollected = collected.length === level.items.length;

  useEffect(() => { setTimeLeft(level.timeLimit); }, [level]);

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

  useEffect(() => {
    if (allCollected) {
      clearInterval(timerRef.current);
      setShowSuccess(true);
    }
  }, [allCollected]);

  const handleItemClick = (e, id) => {
    e.stopPropagation();
    if (isPaused || collected.includes(id)) return;
    setCollected(prev => [...prev, id]);
  };

  const handleBgClick = () => {
    if (isPaused || showFail || showSuccess) return;
    const newWrong = wrongClicks + 1;
    setWrongClicks(newWrong);
    setWrongFlash(true);
    setTimeout(() => setWrongFlash(false), 400);
    if (newWrong >= level.maxWrongClicks) {
      clearInterval(timerRef.current);
      setFailReason('clicks');
      setShowFail(true);
    }
  };

  // Replay SAME level on loss
  const handleRestart = () => {
    setLevel(buildLevel(endlessLevelNum)); // re-randomize items/bg, same difficulty
    setCollected([]);
    setWrongClicks(0);
    setShowFail(false);
    setFailReason('');
    setIsPaused(false);
  };

  // Advance to next level on win
  const handleContinue = () => {
    const nextLevelNum = incrementEndlessLevel('collect');
    setEndlessLevelNum(nextLevelNum);
    setLevel(buildLevel(nextLevelNum));
    setCollected([]);
    setWrongClicks(0);
    setShowSuccess(false);
    setIsPaused(false);
  };

  const Header = () => (
    <div className="l2Header">
      <button className="intro-hud-btn intro-hud-btn--pause" onClick={handlePause} disabled={isPaused}>
        <img src={pause} alt="pause" />
      </button>
      <button className="cluebookIcon" onClick={() => setShowCluebook(true)}>
        <img src={cluebook} alt="cluebook" />
      </button>
    </div>
  );

  if (showCluebook) return (
    <div className="l2CluebookPage">
      <Header />
      <img src={cluebookPage} alt="Cluebook" className="cluebookImage" />
      <button className="splashBtn" onClick={() => setShowCluebook(false)}>CONTINUE</button>
    </div>
  );

  if (showSuccess) return (
    <div className="l2SuccessPage">
      <Header />
      <div className="l2SuccessCard">
        <h2 className="l2SuccessTitle">ENDLESS LEVEL {endlessLevelNum} COMPLETE</h2>
        <div className="l2SuccessItems">
          {level.items.map(item => (
            <img key={item.id} src={item.img} alt={item.label} className="l2SuccessItemImg" />
          ))}
        </div>
        <button className="splashBtn" onClick={handleContinue}>NEXT LEVEL</button>
        <button className="splashBtn" onClick={() => navigate('/levelMap')}>Level Map</button>
      </div>
    </div>
  );

  return (
    <div className={`levelTwo ${wrongFlash ? 'levelTwo--wrongFlash' : ''}`} onClick={handleBgClick}>
      <Header />

      <div className="l2Hud">
        <div className="triesRow">
          {Array.from({ length: level.maxWrongClicks }).map((_, i) => (
            <span key={i} className={`tryIcon ${i < wrongClicks ? 'tryIcon--used' : ''}`}>✕</span>
          ))}
        </div>
        <div className={`timer ${timeLeft <= level.warningTime ? 'timer--warning' : ''}`}>
          {timeLeft}s
        </div>
      </div>

      {level.items.map(item => (
        <img
          key={item.id}
          src={item.img}
          alt={item.label}
          className={`l2Item ${collected.includes(item.id) ? 'l2Item--collected' : ''}`}
          style={{ top: item.top, left: item.left, width: item.width }}
          onClick={(e) => handleItemClick(e, item.id)}
        />
      ))}

      <div className="l2Tray">
        {level.items.map(item => (
          <div key={item.id} className={`l2TraySlot ${collected.includes(item.id) ? 'l2TraySlot--collected' : ''}`}>
            <img src={item.img} alt={item.label} className="l2TrayImg" />
          </div>
        ))}
      </div>

      {isPaused && !showSettings && (
        <PauseMenu onResume={handleResume} onOpenSettings={handleOpenSettings} onMainMenu={() => navigate('/mainMenu')} />
      )}
      {isPaused && showSettings && (
        <SettingsOverlay isMusicMuted={isMusicMuted} isSoundMuted={isSoundMuted} onToggleMusic={onToggleMusic} onToggleSound={handleToggleSound} onBack={handleCloseSettings} />
      )}

      {showFail && (
        <div className="failOverlay">
          <div className="failCard" style={{ pointerEvents: 'all' }}>
            {failReason === 'clicks' && <>
              <h3 className="failTitle">TOO MANY MISTAKES</h3>
              <p className="failText">You grabbed the wrong things.</p>
              <button className="splashBtn" onClick={(e) => { e.stopPropagation(); handleRestart(); }}>Try Again</button>
              <button className="failMenuBtn" onClick={(e) => { e.stopPropagation(); navigate('/levelMap'); }}>Level Map</button>
            </>}
            {failReason === 'time' && <>
              <h3 className="failTitle">TIME'S UP</h3>
              <p className="failText">You ran out of time.</p>
              <button className="splashBtn" onClick={(e) => { e.stopPropagation(); handleRestart(); }}>Try Again</button>
              <button className="failMenuBtn" onClick={(e) => { e.stopPropagation(); navigate('/levelMap'); }}>Level Map</button>
            </>}
          </div>
        </div>
      )}
    </div>
  );
};

export default EndlessCollect;