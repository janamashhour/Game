import React from 'react';
import { useState } from 'react';
import './home.css';
import logo from '../assets/imgs/logo.svg';
import Btn from '../components/common/btn';
import SettingsOverlay from '../components/common/settingsOverlay';

const Home = () => {
  const [showSettings,  setShowSettings]  = useState(false);
  const [isMusicMuted,  setIsMusicMuted]  = useState(false);
  const [isSoundMuted,  setIsSoundMuted]  = useState(false);

  const handleOpenSettings  = () => setShowSettings(true);
  const handleCloseSettings = () => setShowSettings(false);
  const handleToggleMusic   = () => setIsMusicMuted(m => !m);
  const handleToggleSound   = () => setIsSoundMuted(s => !s);

  return (
    <>
      <div className="splash">
        <div className="splashLogo">
          <h2>Who is the</h2>
          <img src={logo} alt="Red Echo decorative text" />
        </div>
        <div className="splashBtns">
        <button className="splashBtn">
            New Game
          </button>
          <button className="splashBtn" onClick={handleOpenSettings}>
            SETTINGS
          </button>
        </div>
      </div>

      {showSettings && (
        <SettingsOverlay
          isMusicMuted={isMusicMuted}
          isSoundMuted={isSoundMuted}
          onToggleMusic={handleToggleMusic}
          onToggleSound={handleToggleSound}
          onBack={handleCloseSettings}
        />
      )}
    </>
  );
};

export default Home;