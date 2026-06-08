import React from 'react';
import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import pause from '../assets/icons/pauseIcon.svg';
import PauseMenu from '../components/common/pause';
import SettingsOverlay from '../components/common/settingsOverlay';
import './levelOne.css';
import cluebook from '../assets/icons/clueBookIcon.svg';

const rounds = [
  { morse: '.--',  correct: 'W', options: ['B', 'C', 'W'] },
  { morse: '.-',   correct: 'A', options: ['A', 'F', 'K'] },
  { morse: '.-.', correct: 'R', options: ['R', 'N', 'Q'] },
  { morse: '.',    correct: 'E', options: ['E', 'I', 'Z'] },
  { morse: '....', correct: 'H', options: ['G', 'M', 'H'] },
  { morse: '---',  correct: 'O', options: ['L', 'O', 'S'] },
  { morse: '..-',  correct: 'U', options: ['U', 'R', 'V'] },
  { morse: '...',  correct: 'S', options: ['S', 'R', 'E'] },
  { morse: '.',    correct: 'E', options: ['U', 'E', 'O'] },
];

const WORD = 'WAREHOUSE';

const getOrdinal = (n) => {
  const ordinals = ['first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth'];
  return ordinals[n - 1] || `${n}th`;
};

const LevelOne = ({ isMusicMuted, onToggleMusic }) => {
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const [showCluebook, setShowCluebook] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [isPaused,     setIsPaused]     = useState(false);

  const handleOpenSettings  = () => setShowSettings(true);
  const handleCloseSettings = () => setShowSettings(false);
  const handleToggleSound   = () => setIsSoundMuted(s => !s);

  const handlePause = useCallback(() => {
    audioRef.current?.pause();
    setIsPaused(true);
  }, []);

  const handleResume = useCallback(() => {
    setIsPaused(false);
    setShowSettings(false);
    audioRef.current?.play().catch(() => {});
  }, []);

  const [currentRound, setCurrentRound] = useState(0);
  const [decoded,      setDecoded]      = useState([]);
  const [showFail,     setShowFail]     = useState(false);
  const [showSuccess,  setShowSuccess]  = useState(false);

  const round = rounds[currentRound];

  const handlePick = (letter) => {
    if (isPaused) return;

    if (letter === round.correct) {
      const newDecoded = [...decoded, letter];
      setDecoded(newDecoded);
      if (newDecoded.length === rounds.length) {
        setShowSuccess(true);
      } else {
        setCurrentRound(i => i + 1);
      }
    } else {
      setShowFail(true);
    }
  };

  const handleDismissFail = () => setShowFail(false);

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
        <img className='cluebookIcon' src={cluebook} alt="cluebook icon" />
      </button>
    </div>
  );

  if (showCluebook) return (
    <div className="cluebookPage">
      <Header />
      <button className="splashBtn" onClick={() => setShowCluebook(false)}>
        CONTINUE
      </button>
    </div>
  );

  if (showSuccess) return (
    <div className="successPage">
      <Header />
      <div className="successPaper">

        <h2 className="successTitle">DECODED</h2>

        <div className="successLetterRow">
          {WORD.split('').map((letter, i) => (
            <div key={i} className="successLetterBox">
              {letter}
            </div>
          ))}
        </div>

        <p className="successMessage">The message points to a warehouse.</p>

        <button className="splashBtn" onClick={() => navigate('/home')}>
          NEXT
        </button>

      </div>

      {isPaused && !showSettings && (
        <PauseMenu
          onResume={handleResume}
          onOpenSettings={handleOpenSettings}
          onMainMenu={() => navigate('/mainMenu')}
        />
      )}
      {isPaused && showSettings && (
        <SettingsOverlay
          isMusicMuted={isMusicMuted}
          isSoundMuted={isSoundMuted}
          onToggleMusic={onToggleMusic}
          onToggleSound={handleToggleSound}
          onBack={handleCloseSettings}
        />
      )}
    </div>
  );

  return (
    <>
      <div className="levelOne">

        <Header />
        <div className="levelOnePaper">

          <h2 className="decodeTitle">
            Decode {getOrdinal(currentRound + 1)} letter
          </h2>

          <div className="morseGrid">
            <div className="morseRow">
              {rounds.map((r, i) => (
                <div
                  key={i}
                  className={`morseCell ${i === currentRound ? 'morseCell--active' : ''}`}
                >
                  {r.morse}
                </div>
              ))}
            </div>
            <div className="morseRow">
              {rounds.map((_, i) => (
                <div key={i} className="morseCell morseCell--answer">
                  {decoded[i] || ''}
                </div>
              ))}
            </div>
          </div>

          <div className="letterChoices">
            {round.options.map((letter) => (
              <button
                key={letter}
                className="letterBtn"
                onClick={() => handlePick(letter)}
                disabled={isPaused}
              >
                {letter}
              </button>
            ))}
          </div>

        </div>

        {isPaused && !showSettings && (
          <PauseMenu
            onResume={handleResume}
            onOpenSettings={handleOpenSettings}
            onMainMenu={() => navigate('/mainMenu')}
          />
        )}
        {isPaused && showSettings && (
          <SettingsOverlay
            isMusicMuted={isMusicMuted}
            isSoundMuted={isSoundMuted}
            onToggleMusic={onToggleMusic}
            onToggleSound={handleToggleSound}
            onBack={handleCloseSettings}
          />
        )}

        {showFail && (
          <div className="failOverlay" onClick={handleDismissFail}>
            <div className="failCard">
              <h3 className="failTitle">THAT DOESN'T MATCH</h3>
              <p className="failText">Recheck the pattern.</p>
              <p className="failHint">click anywhere to continue</p>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default LevelOne;