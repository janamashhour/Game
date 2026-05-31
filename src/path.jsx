import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Intro from './pages/intro';
import Home from './pages/home';

const Path = () => {
    return ( <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Intro />} />
        <Route path='/home' element={<Home />} />
    </Routes>
    </BrowserRouter>
    </> );
}
 
export default Path;