import React from 'react';
import { useState } from 'react';
import SettingsOverlay from '../components/common/settingsOverlay';
import settingsIcon from '../assets/icons/settingsIcon.svg';
import './levelMap.css';
import Btn from '../components/common/btn.jsx';
import lock from '../assets/icons/lockIcon.svg';
import { Link } from 'react-router-dom';

const LevelMap = ({ isMusicMuted, onToggleMusic }) => {
      const [showSettings,  setShowSettings]  = useState(false);
      const [isSoundMuted,  setIsSoundMuted]  = useState(false);
      const handleOpenSettings  = () => setShowSettings(true);
      const handleCloseSettings = () => setShowSettings(false);
      const handleToggleSound   = () => setIsSoundMuted(s => !s);
    return ( <>
    <div className="levelMap">
        <div className="levelMapTop">
            <button className='settingsBtn' onClick={handleOpenSettings}>
                <img src={settingsIcon} alt="settings icon" />
            </button>
            <h2>Select Level</h2>
        </div>
        <div className="levels">
          <Link className='link' to="/levelOneExplanation">
              <button className="openLevel">
                <h4>Lv.</h4>
                <h4>01</h4>
              </button>
          </Link>
              <button className="lockedLevel">
                <img src={lock} alt="lock icon" />
              </button>
        </div>
          <Btn btnText="Next" btnStyle="splashBtn btnGlow" btnLink="/levelOneExplanation" />
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
 
export default LevelMap;