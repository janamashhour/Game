import React from 'react';
import { useState } from 'react';
import './home.css';
import logo from '../assets/imgs/logo.svg';
import '../components/common/btn.css';
import SettingsOverlay from '../components/common/settingsOverlay';
import { Link } from 'react-router';

const Home = ({ isMusicMuted, onToggleMusic }) => {
  const [showSettings,  setShowSettings]  = useState(false);
  const [isSoundMuted,  setIsSoundMuted]  = useState(false);

  const handleOpenSettings  = () => setShowSettings(true);
  const handleCloseSettings = () => setShowSettings(false);
  const handleToggleSound   = () => setIsSoundMuted(s => !s);

  return (
    <>
      <div className="splash">
        <div className="splashLogo">
          <h2>Who is the</h2>
          <img src={logo} alt="Red Echo decorative text" />
        </div>
        <div className="splashBtns">
          <Link to='/levelMap'>
            <button className="splashBtn btnGlow">
                New Game
              </button>
          </Link>
          <button className="splashBtn" onClick={handleOpenSettings}>
            SETTINGS
          </button>
        </div>
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
    </>
  );
};

export default Home;