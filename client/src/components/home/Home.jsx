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
import SeeCases from '../seeCases/seeCases.jsx';
import { Routes, Route } from 'react-router-dom';
import SeeSchedule from '../see_schedule/see_schedule.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [IsClose, setIsClose] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [activeSubTab, setActiveSubTab] = useState(null);
  const [recordType, setRecordType] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem('isLoggedIn');
    if (!user) navigate('/');
  },[]);
  const handleCollapse = () => {
    setIsClose(!IsClose);
  }

  return (
    <>
    <div className="home-container">
      <Sidebar IsClose = {IsClose} setActiveTab={setActiveTab} setActiveSubTab = {setActiveSubTab} setRecordType = {setRecordType} recordType = {recordType}/>
      <div className = "right-area">
        <Header handleCollapse = {handleCollapse} IsClose = {IsClose} activeTab = {activeTab} activeSubTab ={activeSubTab}/>
        <div className = "main-box">
          <Routes>
            <Route exact path = 'record' element = {<Record recordType={recordType}/>}/>
            <Route exact path = 'dashboard' element ={<Dashboard/>}/>
            <Route exact path = 'allCases' element = {<AllCases/>}/>
            <Route exact path = 'createCase' element = {<CreateCase/>}/>
            <Route exact path = 'manageLawyers' element = {<ManageLawyers/>}/>
            <Route exact path = 'manageJudges' element = {<ManageJudges/>}/>
            <Route exact path = 'seeSchedule' element = {<SeeSchedule/>}/>
            <Route exact path = 'seeCases' element = {<SeeCases/>}/>
          </Routes>
        </div>
      </div>
    </div>
     </>
  )
};

export default Home;
