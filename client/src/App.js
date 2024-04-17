import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Home from './components/home/Home'
import LandingPage from './components/LandingPage/LandingPage';
import Lawyers from './components/Lawyers/Lawyers';

const App = () => {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<Home />} />
      <Route exact path = "/lawyers" element={<Lawyers />} />
    </Routes>
    </>
  );
};

export default App;
