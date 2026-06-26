import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './levelTwoDebrief.css';
import lucas  from '../assets/imgs/lucas.png';
import robert from '../assets/imgs/robert.png';
import pause  from '../assets/icons/pauseIcon.svg';
import PauseMenu       from '../components/common/pause';
import SettingsOverlay from '../components/common/settingsOverlay';
import l4debrief1 from '../assets/audios/level4/l4-debrief1.mp4';
import l4debrief2 from '../assets/audios/level4/l4-debrief2.mp4';
import l4debrief3 from '../assets/audios/level4/l4-debrief3.mp4';
import l4debrief4 from '../assets/audios/level4/l4-debrief4.mp4';
import l4debrief5 from '../assets/audios/level4/l4-debrief5.mp4';
import l4debrief6 from '../assets/audios/level4/l4-debrief6.mp4';


const LEVEL_ID = 4;

const dialogue = [
  { speaker: 'Lucas', image: lucas, text: "I found them. Every single missing piece. The torn photos, the unaltered reports, the ledger... they all match.", audio: l4debrief1 },
  { speaker: 'Robert', image: robert, text: "You actually did it. You collected the whole truth. But look at that final signature... now you see why I buried it.", audio: l4debrief2 },
  { speaker: 'Lucas', image: lucas, text: "It goes all the way to the top. The entire precinct built its reputation on this silence.", audio: l4debrief3 },
  { speaker: 'Robert', image: robert, text: "So, what's the move, Detective? Do we stamp it, neatly file it away... and let it be forgotten?", audio: l4debrief4 },
  { speaker: 'Lucas', image: lucas, text: "No. The intro to this nightmare ends here.", audio: l4debrief5 },
  { speaker: 'Lucas', image: lucas, text: "They said some things are better left untouched... but this case is finally closed.", audio: l4debrief6 },
];

const LevelFourDebrief = ({ isMusicMuted, onToggleMusic }) => {
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

    const saved   = JSON.parse(localStorage.getItem('completedLevels') || '[]');
    const updated = [...new Set([...saved, LEVEL_ID])]; // adds 1, no duplicates

    localStorage.setItem('completedLevels', JSON.stringify(updated));
    navigate('/levelMap', { state: { completedLevels: updated } });
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

export default LevelFourDebrief;