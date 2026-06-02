import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Preloader from '../components/layout/preloader';
import { introSlides } from './introSlides';
import './intro.css';
import PauseMenu from '../components/common/pause';
import SettingsOverlay from '../components/common/settingsOverlay';
import pause from '../assets/icons/pauseIcon.svg';
import arrow from '../assets/icons/arrowIcon.svg';

function NarrationText({ text }) {
  return <p className="intro-narration-text">{text}</p>;
}

const Intro = ({ isMusicMuted, onToggleMusic }) => {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const [loading,       setLoading]       = useState(true);
  const [slideIndex,    setSlideIndex]     = useState(0);
  const [isPaused,      setIsPaused]       = useState(false);
  const [showSettings,  setShowSettings]   = useState(false);
  const [isSoundMuted,  setIsSoundMuted]   = useState(false);

  const currentSlide = introSlides[slideIndex];
  const isLastSlide  = slideIndex === introSlides.length - 1;

  const handleOpenSettings  = () => setShowSettings(true);
  const handleCloseSettings = () => setShowSettings(false);

  const handleToggleSound = () => {
    setIsSoundMuted(prev => {
      const next = !prev;
      if (audioRef.current) audioRef.current.muted = next;
      return next;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading)              return;
    if (isPaused)             return;
    if (!currentSlide?.audio) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }

    const audio = new Audio(currentSlide.audio);
    audio.muted  = isSoundMuted;
    audioRef.current = audio;
    audio.play().catch(() => {});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideIndex, loading]);

  const goHome = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    navigate('/home');
  }, [navigate]);

  const handleNext = useCallback(() => {
    if (isPaused)    return;
    if (isLastSlide) { goHome(); return; }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    setSlideIndex(i => i + 1);
  }, [isPaused, isLastSlide, goHome]);

  const handlePause = useCallback(() => {
    audioRef.current?.pause();
    setIsPaused(true);
  }, []);

  const handleResume = useCallback(() => {
    setIsPaused(false);
    setShowSettings(false);
    audioRef.current?.play().catch(() => {});
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space')  { e.preventDefault(); handleNext(); }
      if (e.code === 'Escape') { isPaused ? handleResume() : handlePause(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePause, handleResume, isPaused]);

  if (loading) return <Preloader />;

  return (
    <div className="intro-scene">

      <div
        className="intro-bg"
        style={{ backgroundImage: `url(${currentSlide.background})` }}
      />

      <div className="intro-vignette" />

      <div className="introBtns">
        <button
          className="intro-hud-btn intro-hud-btn--pause"
          onClick={handlePause}
          disabled={isPaused}
          aria-label="Pause"
        >
          <img src={pause} alt="pause icon" />
        </button>

        <button
          className="intro-hud-btn intro-hud-btn--skip"
          onClick={goHome}
          aria-label="Skip intro"
        >
          Skip <img className="flip" src={arrow} alt="arrow icon" />
        </button>
      </div>

      <div className="intro-narration-bar">
        <div className="introNarration">
          <span className="intro-counter">
            {slideIndex + 1} / {introSlides.length}
          </span>
          <NarrationText key={slideIndex} text={currentSlide.text} />
        </div>

        <button
          className="intro-next-btn"
          onClick={handleNext}
          disabled={isPaused}
        >
          {isLastSlide ? 'Begin' : 'Next'}
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
  );
};

export default Intro;