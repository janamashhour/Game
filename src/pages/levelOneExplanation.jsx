import React from 'react';
import { useState } from 'react';
import SettingsOverlay from '../components/common/settingsOverlay';
import settingsIcon from '../assets/icons/settingsIcon.svg';
import Btn from '../components/common/btn';
import './levelOneExplanation.css';

const LevelOneExplanation = ({ isMusicMuted, onToggleMusic }) => {
          const [showSettings,  setShowSettings]  = useState(false);
          const [isSoundMuted,  setIsSoundMuted]  = useState(false);
          const handleOpenSettings  = () => setShowSettings(true);
          const handleCloseSettings = () => setShowSettings(false);
          const handleToggleSound   = () => setIsSoundMuted(s => !s);
    return ( <>
    <div className="levelOneExplanation">
        <button className='settingsBtn' onClick={handleOpenSettings}>
            <img src={settingsIcon} alt="settings icon" />
        </button>
        <Btn btnText="Start" btnStyle="splashBtn" />
    </div>

    {showSettings && (
        <SettingsOverlay
          isMusicMuted={isMusicMuted}
          isSoundMuted={isSoundMuted}
          onToggleMusic={onToggleMusic}
          onToggleSound={handleToggleSound}
          onBack={handleCloseSettings}
        />
      )}
    </> );
}
 
export default LevelOneExplanation;