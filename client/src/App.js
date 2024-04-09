import React from 'react';
import Home from './components/home/Home.jsx';
import Lawyers from './components/Lawyers/Lawyers.jsx';
import { Routes, Route } from 'react-router-dom';
import Record from './components/record_something/record.jsx';

function App() {
  return (
    <> 
    <Routes>
      <Route  path = '*' element = {<Home/>}/>
      <Route exact path = '/lawyers' element = {<Lawyers/>}/>
    </Routes>
    </>
  );
}

export default App;
