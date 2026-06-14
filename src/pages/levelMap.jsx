import React from 'react';
import { useState } from 'react';
import SettingsOverlay from '../components/common/settingsOverlay';
import settingsIcon from '../assets/icons/settingsIcon.svg';
import './levelMap.css';
import lock from '../assets/icons/lockIcon.svg';
import check from '../assets/icons/check.svg';
import { Link, useLocation } from 'react-router-dom';
import BackButton from '../components/common/BackBtn.jsx';

const LevelMap = ({ isMusicMuted, onToggleMusic }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  const handleOpenSettings  = () => setShowSettings(true);
  const handleCloseSettings = () => setShowSettings(false);
  const handleToggleSound   = () => setIsSoundMuted(s => !s);

  const location = useLocation();

  const completedLevels = location.state?.completedLevels || [];
  const level1Done = completedLevels.includes(1);
  const level2Open = level1Done;

  return (
    <>
      <div className="levelMap">

        <div className="levelMapTop">
          <button className="settingsBtn" onClick={handleOpenSettings}>
            <img src={settingsIcon} alt="settings icon" />
          </button>
          <h2>Select Level</h2>
        </div>

        <div className="levels">

          <div className="levelWrapper">
            <Link className="link" to="/levelOneExplanation">
              <button className="openLevel">
                {level1Done && (
                  <img src={check} alt="completed" className="levelCheckmark" />
                )}
                <h4>Lv.</h4>
                <h4>01</h4>
              </button>
            </Link>
          </div>

          {/* ── Level 2 — locked until level 1 is done ── */}
          <div className="levelWrapper">
            {level2Open ? (
              <Link className="link" to="/levelTwoExplanation">
                <button className="openLevel">
                  <h4>Lv.</h4>
                  <h4>02</h4>
                </button>
              </Link>
            ) : (
              <button className="lockedLevel" disabled>
                <img src={lock} alt="lock icon" />
              </button>
            )}
          </div>

        </div>

          <div className="dialogueBtns">
          <BackButton />
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

export default LevelMap;