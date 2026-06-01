import musicOnIcon  from '../../assets/icons/musicIcon.png';
import musicOffIcon from '../../assets/icons/musicOffIcon.png';
import soundOnIcon  from '../../assets/icons/soundIcon.png';
import soundOffIcon from '../../assets/icons/soundOffIcon.png';
import helpIcon     from '../../assets/icons/infoIcon.svg';
import './settings.css';
import arrow from '../../assets/icons/arrowIcon.svg';

const SettingsOverlay = ({
  isMusicMuted,
  isSoundMuted,
  onToggleMusic,
  onToggleSound,
  onBack,
}) => {
  return (
    <div className="settings-overlay" role="dialog" aria-modal="true">
      <div className="settings-menu">

        <h2 className="settings-title">SETTINGS</h2>

        <div className="settings-icons-row">

          <button
            className={`settings-icon-btn ${isMusicMuted ? 'settings-icon-btn--off' : ''}`}
            onClick={onToggleMusic}
            aria-label={isMusicMuted ? 'Unmute Music' : 'Mute Music'}
          >
            <img
              src={isMusicMuted ? musicOffIcon : musicOnIcon}
              alt={isMusicMuted ? 'Music Off' : 'Music On'}
              width={24}
              height={24}
            />
          </button>

          <button
            className={`settings-icon-btn ${isSoundMuted ? 'settings-icon-btn--off' : ''}`}
            onClick={onToggleSound}
            aria-label={isSoundMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            <img
              src={isSoundMuted ? soundOffIcon : soundOnIcon}
              alt={isSoundMuted ? 'Sound Off' : 'Sound On'}
              width={24}
              height={24}
            />
          </button>

          <button
            className="settings-icon-btn"
            aria-label="Help"
            onClick={() => {}}
          >
            <img src={helpIcon} alt="Help" width={24} height={24} />
          </button>

        </div>

        <div className="settings-language-row">
          <button className="settings-arrow-btn" aria-label="Previous language"><img src={arrow} alt="arrow icon" /></button>
          <span className="settings-language-label">ENGLISH</span>
          <button className="settings-arrow-btn" aria-label="Next language"><img className='flip' src={arrow} alt="arrow icon" /></button>
        </div>

        <button className="settings-back-btn" onClick={onBack}>
          BACK
        </button>

      </div>
    </div>
  );
};

export default SettingsOverlay;