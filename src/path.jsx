import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Intro from './pages/intro';
import Home from './pages/home';
import LevelMap from './pages/levelMap';
import MainMenu from './pages/mainMenu';
import bgMusic from './assets/audios/bgMusic.mp4';
import LevelOneExplanation from './pages/levelOneExplanation';

const music = new Audio(bgMusic);
music.loop   = true;
music.volume = 0.4;

const Path = () => {
  const [isMusicMuted, setIsMusicMuted] = useState(false);

  useEffect(() => {
    const startMusic = () => {
      music.play().catch(() => {});
      window.removeEventListener('click', startMusic);
    };

    window.addEventListener('click', startMusic);
    return () => window.removeEventListener('click', startMusic);
  }, []);

  useEffect(() => {
    music.muted = isMusicMuted;
  }, [isMusicMuted]);

  const handleToggleMusic = () => setIsMusicMuted(m => !m);

  const musicProps = {
    isMusicMuted,
    onToggleMusic: handleToggleMusic,
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'         element={<Intro    {...musicProps} />} />
        <Route path='/home'     element={<Home     {...musicProps} />} />
        <Route path='/levelMap' element={<LevelMap {...musicProps} />} />
        <Route path='/mainMenu' element={<MainMenu {...musicProps} />} />
        <Route path='/levelOneExplanation' element={<LevelOneExplanation {...musicProps} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Path;