import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Intro from './pages/intro';
import Home from './pages/home';
import LevelMap from './pages/levelMap';
import MainMenu from './pages/mainMenu';

const Path = () => {
    return ( <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Intro />} />
        <Route path='/home' element={<Home />} />
        <Route path='/levelMap' element={<LevelMap />} />
        <Route path='/mainMenu' element={<MainMenu />} />
    </Routes>
    </BrowserRouter>
    </> );
}
 
export default Path;