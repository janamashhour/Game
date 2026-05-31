import React from 'react';
import './preloader.css'
import TextType from './TextType';
import logo from '../../assets/imgs/logo.svg';

const Preloader = () => {
    return ( <>
    <div className="preloader">
        <TextType
        text={["Who is the"]}
        typingSpeed={75}
        pauseDuration={1500}
        showCursor
        cursorCharacter="_"
        texts={["Welcome to React Bits! Good to see you!","Build some amazing experiences!"]}
        deletingSpeed={50}
        variableSpeedEnabled={false}
        variableSpeedMin={60}
        variableSpeedMax={120}
        cursorBlinkDuration={0.5} />
        <div className="logo">
            <img src={logo} alt="decorative text that says Red Echo" />
        </div>
    </div>
    </> );
}
 
export default Preloader;