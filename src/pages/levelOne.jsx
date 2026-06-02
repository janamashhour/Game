// import React from 'react';
// import PauseMenu from '../components/common/pause';
// import SettingsOverlay from '../components/common/settingsOverlay';
// import pause from '../assets/icons/pauseIcon.svg';
// import { useEffect, useState, useRef, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';

// const LevelOne = () => {
//       const navigate = useNavigate();
//       const audioRef = useRef(null);
    
//       const [loading,       setLoading]       = useState(true);
//       const [slideIndex,    setSlideIndex]     = useState(0);
//       const [isPaused,      setIsPaused]       = useState(false);
//       const [showSettings,  setShowSettings]   = useState(false);
//       const [isSoundMuted,  setIsSoundMuted]   = useState(false);
    
//       const handleOpenSettings  = () => setShowSettings(true);
//       const handleCloseSettings = () => setShowSettings(false);
    
//       const handleToggleSound = () => {
//         setIsSoundMuted(prev => {
//           const next = !prev;
//           if (audioRef.current) audioRef.current.muted = next;
//           return next;
//         });
//       };
//     return ( <>
//     </> );
// }
 
// export default LevelOne;