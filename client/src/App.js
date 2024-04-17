import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Home from './components/home/Home'
import LandingPage from './components/LandingPage/LandingPage';
const App = () => {
  return (
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path = "*" element = {<Home/>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

        </Routes>
      </div>
  );
};

export default App;
