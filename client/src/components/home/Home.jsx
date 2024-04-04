import React, { useState } from 'react'
import Sidebar from '../sidebar/Sidebar.jsx';
import './home.css'
import Header from '../header/Header.jsx';

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
      <Header handleCollapse = {handleCollapse} IsClose = {IsClose} activeTab = {activeTab} activeSubTab ={activeSubTab}/>
    </div>
     </>
  )
};

export default Home;
