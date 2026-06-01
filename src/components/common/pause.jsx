import React from 'react';
import './pause.css';

const PauseMenu = ({ onResume, onOpenSettings, onMainMenu }) => {
  return (
    <div className="intro-pause-overlay" role="dialog" aria-modal="true">
      <div className="intro-pause-menu">

        <h2 className="intro-pause-title">PAUSED</h2>

        <button className="intro-pause-btn" onClick={onResume}>
          CONTINUE
        </button>

        <button className="intro-pause-btn" onClick={onOpenSettings}>
          SETTINGS
        </button>

        <button className="intro-pause-btn intro-pause-btn--danger" onClick={onMainMenu}>
          MAIN MENU
        </button>

      </div>
    </div>
  );
};

export default PauseMenu;