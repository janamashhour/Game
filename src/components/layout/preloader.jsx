import React, { useEffect, useRef, useState } from 'react';
import './preloader.css';
import TextType from './TextType';
import logo from '../../assets/imgs/logo.svg';
import typewriterSound from '../../assets/audios/typewriterEffect.mp4';

const Preloader = ({ onDone }) => {
  const typewriterRef  = useRef(null);
  const [showPrompt, setShowPrompt] = useState(false);

  // Play typewriter sound synced to typing animation
  useEffect(() => {
    const audio = new Audio(typewriterSound);
    audio.volume = 0.6;
    typewriterRef.current = audio;
    audio.play().catch(() => {});

    // "Who is the" = 10 chars × 75ms = 750ms
    const stopTimer = setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, "Who is the".length * 75);

    return () => {
      clearTimeout(stopTimer);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Show "Click to Start" after all animations finish (~3 seconds)
  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="preloader">
      <TextType
        text={["Who is the"]}
        typingSpeed={75}
        pauseDuration={1500}
        showCursor
        cursorCharacter="_"
        deletingSpeed={50}
        variableSpeedEnabled={false}
        variableSpeedMin={60}
        variableSpeedMax={120}
        cursorBlinkDuration={0.5}
      />

      <div className="logo fadeIn">
        <img src={logo} alt="decorative text that says Red Echo" />
      </div>

      {/* Appears after 3 seconds — clicking starts music and enters the game */}
      {showPrompt && (
        <button className="click-to-start" onClick={onDone}>
          Click to start
        </button>
      )}
    </div>
  );
};

export default Preloader;