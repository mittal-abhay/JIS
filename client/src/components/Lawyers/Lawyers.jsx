import React, { useState, useEffect } from 'react'
import Sidebar_2 from '../sidebar_2/Sidebar_2.jsx';
import './Lawyers.css';
import Header from "../header/Header.jsx";
import { Routes, Route } from 'react-router-dom';
import axios from "axios";

axios.defaults.baseURL="http://localhost:8000/";

const API_URL = process.env.API_URL;

const Lawyers = () => {
  const [IsClose, setIsClose] = useState(false);
  const [activeTab, setActiveTab] = useState('See Case');
  const [activeSubTab, setActiveSubTab] = useState(null);
  const [hidecase, setHidecase] = useState(true);
  const [caseid, setCaseid] = useState(null);
  const [caseData, setCaseData] = useState(null);


  const handleCollapse = () => {
    setIsClose(!IsClose);
  }

  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setHidecase(false);
    setCaseid(inputValue);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };


  const DefendantInfo = ({ defendant }) => (
    <div className='section'>
      <h2>Defendant Information</h2>
      <p>Name: {defendant.name}</p>
      <p>Address: {defendant.address}</p>
    </div>
  );

  const CrimeInfo = ({ crime }) => (
    <div className='section'>
      <h2>Crime Information</h2>
      <p>Type: {crime.type}</p>
      <p>Date Committed: {crime.date_committed}</p>
      <p>Location: {crime.location}</p>
    </div>
  );

  const ArrestInfo = ({ arrest }) => (
    <div className='section'>
      <h2>Arrest Information</h2>
      <p>Arresting Officer: {arrest.arresting_officer}</p>
      <p>Date: {arrest.date}</p>
    </div>
  );

  const CaseInfo = ({ data }) => (
    <div className='case'>
      <h1>Case Information</h1>
      <p>CIN: {data.CIN}</p>
      <DefendantInfo defendant={data.defendant} />
      <CrimeInfo crime={data.crime} />
      <ArrestInfo arrest={data.arrest} />
      <p>Judge: {data.judge}</p>
      <p>Prosecutor: {data.prosecutor}</p>
      <p>Lawyer: {data.lawyer}</p>
      <p>Start Date: {data.start_date}</p>
      <p>Status: {data.status}</p>
      {data.judgment.date && (
        <div className='section'>
          <h2>Judgment Information</h2>
          <p>Date: {data.judgment.date}</p>
          <p>Summary: {data.judgment.summary}</p>
        </div>
      )}
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`api/court_cases/${caseid}`, {
          headers: {
          "Content-Type" : "application/json",
          "Authorization": `${token}`
          }
        }); // Use template literal for dynamic caseid

        setCaseData(response.data);
        console.log(caseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (caseid) {
      fetchData();
    }
  }, [caseid]);
  return (
    <>
    <div className="home-container">
      <Sidebar_2 IsClose = {IsClose} setActiveTab={setActiveTab} setActiveSubTab = {setActiveSubTab}/>
      <div className = "right-area">
        <Header handleCollapse = {handleCollapse} IsClose = {IsClose} activeTab = {activeTab} activeSubTab ={activeSubTab}/>
        <div className = "main-box ">
          <div>
          <form onSubmit={handleSubmit} className='my-form'>
            <label>
              Enter CIN Number:
              <input type="text" value={inputValue} onChange={handleChange} className='my-input'/>
            </label>
            <button type="submit" className='my-button'>Submit</button>
          </form>
          </div>
          
          <div className={`case-container ${hidecase ? 'hide-case': ''}`}>
          <div className='case-main-div'>
            {caseData ? (
              <CaseInfo data={caseData} />
            ) : (
              <p>Loading...</p>
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
};

export default Lawyers;
