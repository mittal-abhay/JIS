import React, { useState } from 'react'
import Sidebar from '../sidebar/Sidebar.jsx';
import './home.css'
import Header from '../header/Header.jsx';
import Record from '../record_something/record.jsx';
import { Routes, Route } from 'react-router-dom';

const Home = () => {
  const [IsClose, setIsClose] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [activeSubTab, setActiveSubTab] = useState(null);

  const handleCollapse = () => {
    setIsClose(!IsClose);
  }

  return (
    <>
    <div className="home-container">
      <Sidebar IsClose = {IsClose} setActiveTab={setActiveTab} setActiveSubTab = {setActiveSubTab}/>
      <div className = "right-area">
        <Header handleCollapse = {handleCollapse} IsClose = {IsClose} activeTab = {activeTab} activeSubTab ={activeSubTab}/>
        <div className = "main-box">
          <Routes>
            <Route path = "/record" element = {<Record/>}/>
          </Routes>
        </div>
      </div>
    </div>
     </>
  )
};

export default Home;
