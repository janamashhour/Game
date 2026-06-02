import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ add useNavigate
import './mainMenu.css';
import SettingsOverlay from '../components/common/settingsOverlay';

const MainMenu = ({ isMusicMuted, onToggleMusic }) => {
  const navigate = useNavigate(); // ✅ add this

  const [showSettings, setShowSettings] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  const handleOpenSettings  = () => setShowSettings(true);
  const handleCloseSettings = () => setShowSettings(false);
  const handleToggleSound   = () => setIsSoundMuted(s => !s);

  return (
    <>
      <div className="mainMenu">
        <h2>Main Menu</h2>
        <div className="menuBtns">
          <button className="splashBtn" onClick={handleOpenSettings}>
            SETTINGS
          </button>
          <Link to='/levelMap'>
            <button className="splashBtn">Level Map</button>
          </Link>
          <button className="splashBtn">
            Credits
          </button>
          <button className="splashBtn" onClick={() => navigate(-1)}>
            Back
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

export default MainMenu;