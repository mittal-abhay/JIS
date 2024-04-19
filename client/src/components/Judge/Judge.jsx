import React, {useState, useEffect} from "react";
import Sidebar_2 from '../sidebar_2/Sidebar_2.jsx';
import './Judge.css'
import Header from "../header/Header.jsx";
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000/";

const Judges = () => {
  const [IsClose, setIsClose] = useState(false);
  const [activeTab, setActiveTab] = useState('See Case');
  const [activeSubTab, setActiveSubTab] = useState(null);
  const [caseId, setCaseId] = useState(null);
  const [hidecase, setHidecase] = useState(true);
  const [caseData, setCaseData] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleCollapse = () => {
    setIsClose(!IsClose);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setHidecase(false);
    setCaseId(inputValue);
    console.log(caseId);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('isLoggedIn')).token;
        const response = await axios.get(`api/court_cases/${caseId}`, {
          headers:{
            "Content-Type":"application/json",
            "Authorization":`${token}`
          }
        });

        console.log(response.data)
        setCaseData(response.data);
        console.log(caseData);
      } catch (error) {
        console.log("Error in Fetching data:", error);
      }
    };

    if(caseId) {
      fetchData();
    }
  }, [caseId]);

  
  console.log("caseData:", caseData);
  return (
    <div className="home-contianer">
      <Sidebar_2 IsClose={IsClose} setActiveTab={setActiveTab} setActiveSubTab={setActiveSubTab} />
      <div className="right-area">
        <Header handleCollapse={handleCollapse} IsClose={IsClose} activeTab={activeTab} activeSubTab={activeSubTab} />
        <div className="main_box">
          <div className="center-content">
            <form onSubmit={handleSubmit} className="my-form">
              <label>
                Enter CIN Number:
                <input type="text" value={inputValue} onChange={handleChange} className="my-input" />
              </label>
              <button type="submit" className="my-button">Submit</button>
            </form>
          </div>
          <div className={`case-container ${hidecase ? 'hide-case' : '' }`}>
            <div className="case-main-div">
                {caseData !== null ? (
                  <div className="case">
                    <div className="section">
                      <span className="CIN"><b>Case Identication Number:</b> {caseData.CIN}</span>
                    </div>
                    <div className="section">
                      <span className="sub-heading">Defendant --- </span>
                      <span className="info"><b>Name:</b> {caseData.defendant.name}</span>
                      <span className="info"><b>Address:</b> {caseData.defendant.address}</span>
                    </div>
                    <div className="section">
                      <span className="sub-heading">Crime Details --- </span>
                      <span className="info"><b>Type:</b> {caseData.crime.type}</span>
                      <span className="info"><b>Date of Crime:</b> {caseData.crime.date_committed}</span>
                      <span className="info"><b>Location:</b> {caseData.crime.location}</span>
                      <span className="info"><b>Arresting Officer:</b> {caseData.arrest.arresting_officer}</span>
                      <span className="info"><b>Arrest Date:</b> {caseData.arrest.date}</span>
                    </div>
                    <div className="section">
                      <span className="sub-heading">Legal Details --- </span>
                      <span className="info"><b>Judge:</b> {caseData.judge}</span>
                      <span className="info"><b>Prosecutor:</b> {caseData.prosecuter}</span>
                      <span className="info"><b>Lawyer:</b> {caseData.lawyer}</span>
                      <span className="info"><b>Start Date:</b> {caseData.start_date}</span>
                      <span className="info"><b>Status:</b> {caseData.status}</span>
                    </div>
                    <div className="section">
                    <span className="sub-heading">Hearings</span>
                    { caseData.hearings ? (
                      <ul>
                        {caseData.hearings.map((hearing, index) => (
                          <div className="hearing-list">
                          <span className="hearing-number">{index+1} -- </span>
                          <li className="hearing-info" key={index}>
                            <span>Date: {hearing.date}</span>
                            <span>Summary: {hearing.summary}</span>
                            <span>Start Time: {hearing.startTime}</span>
                            <span>End Time: {hearing.endTime}</span>
                            <span>New Hearing Date: {hearing.newHearingDate}</span>
                          </li>
                          </div>
                        ))}
                      </ul>
                      ) : (
                        <></>
                      )
                    }
                    </div>
                    <div className="section">
                    <span className="sub-heading">Adjourements</span>
                    { caseData.adjournments ? (
                      <ul>
                        {caseData.adjournments.map((adj, index) => (
                          <div className="hearing-list">
                          <span className="hearing-number">{index+1} -- </span>
                          <li className="hearing-info" key={index}>
                            <span>Date: {adj.date}</span>
                            <span>Summary: {adj.summary}</span>
                            <span>Start Time: {adj.startTime}</span>
                            <span>End Time: {adj.endTime}</span>
                            <span>New Hearing Date: {adj.newHearingDate}</span>
                          </li>
                          </div>
                        ))}
                      </ul>
                      ) : (
                        <></>
                      )
                    }
                    </div>
                    <div className="section">
                      {caseData.judgement ? (
                        <div className="section">
                          <span className="sub-heading"> Judgement </span>
                          <span className="info">Date of Judgement: {caseData.judgement.date}</span>
                          <span className="info">Summary: {caseData.judgement.summary}</span>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                ) : (
                  <p>Loading....</p>
                )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Judges;
