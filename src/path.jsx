import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Intro from './pages/intro';
import Home from './pages/home';
import LevelMap from './pages/levelMap';
import MainMenu from './pages/mainMenu';
import LevelOneExplanation from './pages/levelOneExplanation';
import LevelOne from './pages/levelOne';
import bgMusic from './assets/audios/bgMusic.mp4';
import Preloader from './components/layout/preloader';
import clickSound from './assets/audios/buttonClick.mp4';
import LevelOneDebrief from './pages/levelOneDebrief';
import LevelTwoExplanation from './pages/levelTwoExplanation';

const music = new Audio(bgMusic);
music.loop   = true;
music.volume = 0.4;

const click = new Audio(clickSound);
click.volume = 0.6;

const Path = () => {
const [started, setStarted] = useState(false);
  const [isMusicMuted, setIsMusicMuted] = useState(false);

  const handleDone = () => {
    music.play().catch(() => {});
    localStorage.setItem('gameStarted', 'true');
    setStarted(true);
  };

  useEffect(() => {
    const handleButtonClick = (e) => {
      if (e.target.closest('button')) {
        click.currentTime = 0;
        click.play().catch(() => {});
      }
    };
    window.addEventListener('click', handleButtonClick);
    return () => window.removeEventListener('click', handleButtonClick);
  }, []);

  useEffect(() => {
    music.muted = isMusicMuted;
  }, [isMusicMuted]);

  const handleToggleMusic = () => setIsMusicMuted(m => !m);
  const musicProps = { isMusicMuted, onToggleMusic: handleToggleMusic };

  if (!started) return <Preloader onDone={handleDone} />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Intro {...musicProps} />} />
        <Route path='/home' element={<Home {...musicProps} />} />
        <Route path='/levelMap' element={<LevelMap {...musicProps} />} />
        <Route path='/mainMenu' element={<MainMenu {...musicProps} />} />
        <Route path='/levelOneExplanation' element={<LevelOneExplanation {...musicProps} />} />
        <Route path='/levelOne' element={<LevelOne {...musicProps} />} />
        <Route path='/levelOneDebrief' element={<LevelOneDebrief {...musicProps} /> } />
        <Route path='/levelTwoExplanation' element={<LevelTwoExplanation {...musicProps} /> } />
      </Routes>
    </BrowserRouter>
  );
};

export default Path;