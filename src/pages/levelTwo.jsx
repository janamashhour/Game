import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PauseMenu       from '../components/common/pause';
import SettingsOverlay from '../components/common/settingsOverlay';
import pause from '../assets/icons/pauseIcon.svg';
import cluebook from '../assets/icons/clueBookIcon.svg';
import './levelTwo.css';
import badgeImg     from '../assets/imgs/level2/badge.png';
import keyImg       from '../assets/imgs/level2/key.png';
import flashlightImg from '../assets/imgs/level2/flashlight.png';
import clothImg     from '../assets/imgs/level2/cloth.png';
import ropeImg      from '../assets/imgs/level2/rope.png';
import watchImg     from '../assets/imgs/level2/watch.png';

const DIFFICULTY = {
  timeLimit:     30,
  maxWrongClicks: 3,
  warningTime:   10,
};

const ITEMS = [
  { id: 'badge',      img: badgeImg,      label: 'Badge',      top: '72%', left: '18%', width: '80px'  },
  { id: 'key',        img: keyImg,        label: 'Key',        top: '68%', left: '44%', width: '90px'  },
  { id: 'flashlight', img: flashlightImg, label: 'Flashlight', top: '74%', left: '68%', width: '80px'  },
  { id: 'cloth',      img: clothImg,      label: 'Cloth',      top: '60%', left: '78%', width: '100px' },
  { id: 'rope',       img: ropeImg,       label: 'Rope',       top: '65%', left: '5%',  width: '90px'  },
  { id: 'watch',      img: watchImg,      label: 'Watch',      top: '52%', left: '32%', width: '85px'  },
];

const LevelTwo = ({ isMusicMuted, onToggleMusic }) => {
  const navigate  = useNavigate();
  const timerRef  = useRef(null);

  const [showCluebook, setShowCluebook] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [isPaused,     setIsPaused]     = useState(false);

  const handleOpenSettings  = () => setShowSettings(true);
  const handleCloseSettings = () => setShowSettings(false);
  const handleToggleSound   = () => setIsSoundMuted(s => !s);

  const handlePause = useCallback(() => {
    clearInterval(timerRef.current);
    setIsPaused(true);
  }, []);

  const handleResume = useCallback(() => {
    setIsPaused(false);
    setShowSettings(false);
  }, []);

  const [collected,    setCollected]    = useState([]);
  const [wrongClicks,  setWrongClicks]  = useState(0);
  const [timeLeft,     setTimeLeft]     = useState(DIFFICULTY.timeLimit);
  const [showFail,     setShowFail]     = useState(false);
  const [failReason,   setFailReason]   = useState('');
  const [showSuccess,  setShowSuccess]  = useState(false);
  const [wrongFlash,   setWrongFlash]   = useState(false);

  const allCollected = collected.length === ITEMS.length;

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

    if (newWrong >= DIFFICULTY.maxWrongClicks) {
      clearInterval(timerRef.current);
      setFailReason('clicks');
      setShowFail(true);
    }
  };

  const handleRestart = () => {
    setCollected([]);
    setWrongClicks(0);
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
    <div className="l2cluebookPage">
      <Header />
      <button className="splashBtn" onClick={() => setShowCluebook(false)}>
        CONTINUE
      </button>
    </div>
  );

  if (showSuccess) return (
    <div className="l2SuccessPage">
      <Header />
      <div className="l2SuccessCard">
        <h2 className="l2SuccessTitle">ALL ITEMS FOUND</h2>
        <div className="l2SuccessItems">
          {ITEMS.map(item => (
            <img key={item.id} src={item.img} alt={item.label} className="l2SuccessItemImg" />
          ))}
        </div>
        <button className="splashBtn" onClick={() => navigate('/levelTwoDebrief')}>NEXT</button>
      </div>
    </div>
  );

  return (
    <div
      className={`levelTwo ${wrongFlash ? 'levelTwo--wrongFlash' : ''}`}
      onClick={handleBgClick}
    >
      <Header />

      <div className="l2Hud">
        <div className="triesRow">
          {Array.from({ length: DIFFICULTY.maxWrongClicks }).map((_, i) => (
            <span key={i} className={`tryIcon ${i < wrongClicks ? 'tryIcon--used' : ''}`}>✕</span>
          ))}
        </div>
        <div className={`timer ${timeLeft <= DIFFICULTY.warningTime ? 'timer--warning' : ''}`}>
          {timeLeft}s
        </div>
      </div>

      {ITEMS.map(item => {
        const isCollected = collected.includes(item.id);
        return (
          <img
            key={item.id}
            src={item.img}
            alt={item.label}
            className={`l2Item ${isCollected ? 'l2Item--collected' : ''}`}
            style={{ top: item.top, left: item.left, width: item.width }}
            onClick={(e) => handleItemClick(e, item.id)}
          />
        );
      })}

      <div className="l2Tray">
        {ITEMS.map(item => {
          const isCollected = collected.includes(item.id);
          return (
            <div key={item.id} className={`l2TraySlot ${isCollected ? 'l2TraySlot--collected' : ''}`}>
              <img src={item.img} alt={item.label} className="l2TrayImg" />
            </div>
          );
        })}
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
              <button className="failMenuBtn" onClick={(e) => { e.stopPropagation(); navigate('/mainMenu'); }}>Main Menu</button>
            </>}

            {failReason === 'time' && <>
              <h3 className="failTitle">TIME'S UP</h3>
              <p className="failText">You ran out of time.</p>
              <button className="splashBtn" onClick={(e) => { e.stopPropagation(); handleRestart(); }}>Try Again</button>
              <button className="failMenuBtn" onClick={(e) => { e.stopPropagation(); navigate('/mainMenu'); }}>Main Menu</button>
            </>}

          </div>
        </div>
      )}

    </div>
  );
};

export default LevelTwo;