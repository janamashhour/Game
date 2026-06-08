import React from 'react';
import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import pause from '../assets/icons/pauseIcon.svg';
import PauseMenu from '../components/common/pause';
import SettingsOverlay from '../components/common/settingsOverlay';
import './levelOne.css';
import cluebook from '../assets/icons/clueBookIcon.svg';

const LevelOne = ({ isMusicMuted, onToggleMusic }) => {
        const audioRef = useRef(null);
        const navigate = useNavigate();

        const [showSettings,  setShowSettings]  = useState(false);
        const [isSoundMuted,  setIsSoundMuted]  = useState(false);
        const handleOpenSettings  = () => setShowSettings(true);
        const handleCloseSettings = () => setShowSettings(false);
        const handleToggleSound   = () => setIsSoundMuted(s => !s);
        const [isPaused,      setIsPaused]       = useState(false);
        
            const handlePause = useCallback(() => {
              audioRef.current?.pause();
              setIsPaused(true);
            }, []);
          
            const handleResume = useCallback(() => {
              setIsPaused(false);
              setShowSettings(false);
              audioRef.current?.play().catch(() => {});
            }, []);
    return ( <>
    <div className="levelOne">
        <div className="levelOneHeader">
            <button
              className="intro-hud-btn intro-hud-btn--pause"
              onClick={handlePause}
              disabled={isPaused}
              aria-label="Pause"
            >
              <img src={pause} alt="pause icon" />
            </button>

            <button className='cluebookIcon'>
                <img className='cluebookIcon' src={cluebook} alt="cluebook icon" />
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
    </> );
}
 
export default LevelOne;