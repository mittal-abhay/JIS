import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Home from './components/home/Home'
import LandingPage from './components/LandingPage/LandingPage';
import Lawyers from "./components/Lawyers/Lawyers";
import Judges from './components/Judge/Judge';
const App = () => {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<Home />} />
      <Route path = "/lawyers" element={<Lawyers />} />
      <Route path = "/judges" element={<Judges />} />
    </Routes>
    </>
  );
};

export default App;
