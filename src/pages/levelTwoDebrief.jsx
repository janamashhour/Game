import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './levelTwoDebrief.css';
import lucas  from '../assets/imgs/lucas.png';
import robert from '../assets/imgs/robert.png';
import pause  from '../assets/icons/pauseIcon.svg';
import PauseMenu       from '../components/common/pause';
import SettingsOverlay from '../components/common/settingsOverlay';
import debriefLine1 from '../assets/audios/level2/debriefL2-1.mp4';
import debriefLine2 from '../assets/audios/level2/debriefL2-2.mp4';
import debriefLine3 from '../assets/audios/level2/debriefL2-3.mp4';
import debriefLine4 from '../assets/audios/level2/debriefL2-4.mp4';
import debriefLine5 from '../assets/audios/level2/debriefL2-5.mp4';
import debriefLine6 from '../assets/audios/level2/debriefL2-6.mp4';


const dialogue = [
  { speaker: 'Lucas', image: lucas, text: 'I found a badge.', audio: debriefLine1 },
  { speaker: 'Robert', image: robert, text: '…you’re making a mistake.', audio: debriefLine2 },
  { speaker: 'Lucas', image: lucas, text: "Then tell me why it was there.", audio: debriefLine3 },
  { speaker: 'Robert', image: robert, text: "…some cases aren’t meant to be solved.", audio: debriefLine4 },
  { speaker: 'Lucas', image: lucas, text: "You were there.", audio: debriefLine5 },
  { speaker: 'Robert', image: robert, text: "...I was.", audio: debriefLine6 },
];

const LevelTwoDebrief = ({ isMusicMuted, onToggleMusic }) => {
  const navigate  = useNavigate();
  const audioRef  = useRef(null);

  const [currentLine,  setCurrentLine]  = useState(0);
  const [isPaused,     setIsPaused]     = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  const handleOpenSettings  = () => setShowSettings(true);
  const handleCloseSettings = () => setShowSettings(false);
  const handleToggleSound   = () => setIsSoundMuted(s => !s);
  const handlePause         = () => { audioRef.current?.pause(); setIsPaused(true);  };
  const handleResume        = () => { setIsPaused(false); setShowSettings(false); audioRef.current?.play().catch(() => {}); };

  const line       = dialogue[currentLine];
  const isLastLine = currentLine === dialogue.length - 1;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
  
    if (isSoundMuted) return;
  
    const audio = new Audio(line.audio);
    audioRef.current = audio;
    audio.play().catch(() => {});
  
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [currentLine, isSoundMuted, line.audio]);

  const goToLevelMap = () => {
    audioRef.current?.pause();
    localStorage.setItem('completedLevels', JSON.stringify([1]));
    navigate('/levelMap', { state: { completedLevels: [1] } });
  };

  const handleNext = () => {
    if (isPaused) return;
    if (isLastLine) { goToLevelMap(); return; }
    setCurrentLine(i => i + 1);
  };

  return (
    <div className="debrief2">

      <div className="debriefHeader">
        <button
          className="intro-hud-btn intro-hud-btn--pause"
          onClick={handlePause}
          disabled={isPaused}
          aria-label="Pause"
        >
          <img src={pause} alt="pause" />
        </button>
      </div>

      <div className="debriefBg" />

      <img
        key={currentLine}
        src={line.image}
        alt={line.speaker}
        className="debriefCharacter"
      />

      <div className="debriefBox">
        <p className="debriefSpeaker">{line.speaker.toUpperCase()}</p>
        <p key={`text-${currentLine}`} className="debriefText">{line.text}</p>

        <div className="debriefBtns">
          <button className="debriefSkipBtn" onClick={goToLevelMap}>
            Skip
          </button>
          <button
            className="splashBtn"
            onClick={handleNext}
            disabled={isPaused}
          >
            {isLastLine ? 'Continue' : 'Next'}
          </button>
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

    </div>
  );
};

export default LevelTwoDebrief;