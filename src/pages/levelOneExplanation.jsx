import React, { useState, useEffect, useRef } from "react";
import SettingsOverlay from "../components/common/settingsOverlay";
import settingsIcon from "../assets/icons/settingsIcon.svg";
import Btn from "../components/common/btn";
import level1explanation1 from "../assets/audios/level1/levelexplanation1-1.mp4";
import level1explanation2 from "../assets/audios/level1/levelexplanation1-2.mp4";
import level1explanation3 from "../assets/audios/level1/levelexplanation1-3.mp4";
import lucas from '../assets/imgs/lucas.png';
import BackButton from "../components/common/BackBtn";

import "./levelOneExplanation.css";

const dialogues = [
  {
    speaker: "Lucas",
    text: "We found an important clue that needs decoding.",
    audio: level1explanation1,
  },
  {
    speaker: "Lucas",
    text: "Match the pattern to the correct letters.",
    audio: level1explanation2,
  },
  {
    speaker: "Lucas",
    text: "Refer to the clue icon to review the Morse code chart.",
    audio: level1explanation3,
  },
];

const LevelOneExplanation = ({
  isMusicMuted,
  onToggleMusic,
}) => {
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [audioFinished, setAudioFinished] = useState(false);

  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;

    setAudioFinished(false);

    audio.pause();
    audio.currentTime = 0;

    if (isSoundMuted) {
      setAudioFinished(true);
      return;
    }

    audio.src = dialogues[currentDialogue].audio;

    const handleEnded = () => {
      setAudioFinished(true);
    };

    audio.addEventListener("ended", handleEnded);

    audio.play().catch((err) => {
      console.error(err);
      setAudioFinished(true);
    });

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentDialogue, isSoundMuted]);

  const nextDialogue = () => {
    if (currentDialogue < dialogues.length - 1) {
      setCurrentDialogue((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="levelOneExplanation">
        <button
          className="settingsBtnLevelOne"
          onClick={() => setShowSettings(true)}
        >
          <img className="settingsIcon" src={settingsIcon} alt="Settings" />
        </button>
        <div className="dialogue">
            <img className="dialogueCharacter" src={lucas} alt="main character" />
            <div className="dialogueBox">
                <h3>{dialogues[currentDialogue].speaker}</h3>
                <p>{dialogues[currentDialogue].text}</p>
            </div>
        </div>

        {currentDialogue === dialogues.length - 1 ? (
          <div className="dialogueBtns">
            <BackButton />
            <Btn
              btnText="Start"
              btnStyle="splashBtn btnGlow"
              btnLink="/levelOne"
            />
          </div>
        ) : (
          <div className="dialogueBtns">
            <BackButton />
            <button
              className="splashBtn btnGlow"
              onClick={nextDialogue}
              disabled={!audioFinished}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {showSettings && (
        <SettingsOverlay
          isMusicMuted={isMusicMuted}
          isSoundMuted={isSoundMuted}
          onToggleMusic={onToggleMusic}
          onToggleSound={() => setIsSoundMuted((s) => !s)}
          onBack={() => setShowSettings(false)}
        />
      )}
    </>
  );
};

export default LevelOneExplanation;