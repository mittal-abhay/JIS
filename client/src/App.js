import React from 'react';
import { useState } from 'react';
import Home from './components/home/Home.jsx';
import Lawyers from './components/Lawyers/Lawyers.jsx';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <> 
    <Routes>
      <Route exact path = '/' element = {<Home/>}/>
      <Route exact path = '/lawyers' element = {<Lawyers/>}/>
      </Routes>
    </>
  );
}

export default App;
