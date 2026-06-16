import React from 'react';
import { useState } from 'react';
import SettingsOverlay from '../components/common/settingsOverlay';
import settingsIcon from '../assets/icons/settingsIcon.svg';
import './levelMap.css';
import lock from '../assets/icons/lockIcon.svg';
import check from '../assets/icons/check.svg';
// import decodeIcon from '../assets/icons/decodeIcon.svg';
// import collectIcon from '../assets/icons/collectIcon.svg';
import { Link, useLocation } from 'react-router-dom';
import BackButton from '../components/common/BackBtn.jsx';

localStorage.removeItem('completedLevels')


const LevelMap = ({ isMusicMuted, onToggleMusic }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  const handleOpenSettings  = () => setShowSettings(true);
  const handleCloseSettings = () => setShowSettings(false);
  const handleToggleSound   = () => setIsSoundMuted(s => !s);

  const location = useLocation();

  const savedLevels = JSON.parse(localStorage.getItem('completedLevels') || '[]');
  const stateLevels = location.state?.completedLevels || [];
  const completedLevels = [...new Set([...savedLevels, ...stateLevels])];
  if (stateLevels.length && JSON.stringify(savedLevels) !== JSON.stringify(completedLevels)) {
    localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
  }

// Replace your unlock/done variables with this
const level1Done  = completedLevels.includes(1);
const level2Done  = completedLevels.includes(2);
const level3Done  = completedLevels.includes(3);
const level4Done  = completedLevels.includes(4);

// Open conditions — level 1 always open, others open once previous is done
// OR already done themselves (so replaying never re-locks anything)
const level2Open  = level1Done || level2Done;
const level3Open  = level2Done || level3Done;
const level4Open  = level3Done || level4Done;
const endlessOpen = level4Done;

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
                {level1Done && <img src={check} alt="completed" className="levelCheckmark" />}
                <h4>Lv.</h4>
                <h4>01</h4>
              </button>
            </Link>
          </div>

          <div className="levelWrapper">
            {level2Open ? (
              <Link className="link" to="/levelTwoExplanation">
                <button className="openLevel">
                  {level2Done && <img src={check} alt="completed" className="levelCheckmark" />}
                  <h4>Lv.</h4><h4>02</h4>
                </button>
              </Link>
            ) : (
              <button className="lockedLevel" disabled><img src={lock} alt="locked" /></button>
            )}
          </div>

          <div className="levelWrapper">
            {level3Open ? (
              <Link className="link" to="/levelThree">
                <button className="openLevel">
                  {level3Done && <img src={check} alt="completed" className="levelCheckmark" />}
                  <h4>Lv.</h4><h4>03</h4>
                </button>
              </Link>
            ) : (
              <button className="lockedLevel" disabled><img src={lock} alt="locked" /></button>
            )}
          </div>

          <div className="levelWrapper">
            {level4Open ? (
              <Link className="link" to="/levelFour">
                <button className="openLevel">
                  {level4Done && <img src={check} alt="completed" className="levelCheckmark" />}
                  <h4>Lv.</h4><h4>04</h4>
                </button>
              </Link>
            ) : (
              <button className="lockedLevel" disabled><img src={lock} alt="locked" /></button>
            )}
          </div>

        </div>

        {endlessOpen && (
          <div className="endlessSection">
            <h3 className="endlessTitle">ENDLESS</h3>
            <div className="endlessButtons">
              <Link className="link" to="/endless/decode">
                <button className="endlessBtn">
                  {/* <img src={decodeIcon} alt="Decode" /> */}
                  <span>Decode</span>
                </button>
              </Link>
              <Link className="link" to="/endless/collect">
                <button className="endlessBtn">
                  {/* <img src={collectIcon} alt="Collect" /> */}
                  <span>Collect</span>
                </button>
              </Link>
            </div>
          </div>
        )}

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