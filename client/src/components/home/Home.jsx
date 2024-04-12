import React, { useState } from 'react'
import Sidebar from '../sidebar/Sidebar.jsx';
import './home.css'
import Header from '../header/Header.jsx';
import Record from '../record_something/record.jsx';
import Dashboard from '../dashboard/dashboard.jsx';
import AllCases from '../case/allCases/allCases.jsx';
import CreateCase from '../case/createCases/createCases.jsx';
import ManageLawyers from '../manage_team/manage_lawyers/manage_lawyers.jsx';
import ManageJudges from '../manage_team/manage_judges/manage_judges.jsx';
import { Routes, Route } from 'react-router-dom';
import SeeSchedule from '../see_schedule/see_schedule.jsx';

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
            <Route path = 'record' element = {<Record/>}/>
            <Route path = 'dashboard' element ={<Dashboard/>}/>
            <Route path = 'allCases' element = {<AllCases/>}/>
            <Route path = 'createCase' element = {<CreateCase/>}/>
            <Route path = 'manageLawyers' element = {<ManageLawyers/>}/>
            <Route path = 'manageJudges' element = {<ManageJudges/>}/>
            <Route path = 'seeSchedule' element = {<SeeSchedule/>}/>
          </Routes>
        </div>
      </div>
    </div>
     </>
  )
};

export default Home;
