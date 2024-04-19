import React, {useState, useEffect} from "react";
import Sidebar_2 from '../sidebar_2/Sidebar_2.jsx';
import './Lawyers.css'
import Header from "../header/Header.jsx";
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000/";

const Lawyers = () => {
  const [IsClose, setIsClose] = useState(false);
  const [activeTab, setActiveTab] = useState('See Case');
  const [activeSubTab, setActiveSubTab] = useState(null);
  const [caseId, setCaseId] = useState(null);
  const [hidecase, setHidecase] = useState(true);
  const [caseData, setCaseData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [searchPara, setSearchPara] = useState('');
  const [inputValue_2, setInputValue_2] = useState('');
  const [hideCIN, setHideCIN] = useState('true')


  const handleCollapse = () => {
    setIsClose(!IsClose);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setHidecase(false);
    setCaseId(inputValue);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleChange_2 = (event) => {
    setInputValue_2(event.target.value);
  };

  const handleSubmit_2 = (event) => {
    event.preventDefault();
    setHideCIN(false);
    setSearchPara(inputValue_2);
    console.log(searchPara);
  }
  useEffect (() => {
    const fetchCaseId = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('isLoggedIn')).token;
        const response = await axios.get(`api/court_cases/search?keywords=${searchPara}`, {
          headers:{
            "Content-Type":"application/json",
            "Authorization":`${token}`
          }
        });
        // setCINFound(response.data);
        console.log(response)
      } catch (error) {
        console.log("Error in Fetching data:", error);
      }
    }

    if(searchPara) {
      fetchCaseId();
    } 
  }, [searchPara]);

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
        setCaseData(response.data);
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

        {/* search case id */}
        <div className="main_box">
          <div className="center-content">
            <form onSubmit={handleSubmit_2} className="my-form">
              <label>
                Enter Search Parameter to Search Case ID:
                <input type="text" value={inputValue_2} onChange={handleChange_2} className="my-input" />
              </label>
              <button type="submit" className="my-button">Submit</button>
            </form>
          </div>
          <div className={`case-container ${hideCIN ? 'hide-case' : ''}`}>
            <ul>
              
            </ul>
          </div>
        </div>

        {/* see cases */}
        <div className="main_box">
          <div className="center-content">
            <form onSubmit={handleSubmit} className="my-form">
              <label>
                Enter Case Idenification Number:
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

export default Lawyers;
