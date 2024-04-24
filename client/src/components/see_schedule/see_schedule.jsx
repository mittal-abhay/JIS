import React, { useEffect, useState } from 'react';
import styles from './see_schedule.module.css';
import axios from 'axios';


const SeeSchedule = () => {
  const [formData, setFormData] = useState({ date: '' });
  const [casesData, setCasesData] = useState([])

  const handle = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const token = JSON.parse(localStorage.getItem('isLoggedIn')).token;
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.get(`http://localhost:8000/api/court_cases/hearing_date/${formData.date}`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          }
        });
        setCasesData(response.data);
      } catch (err) {
        setCasesData([]);
        console.error('Error:', err);
      }
    };

   
  const renderCasesTable = () => {
    if (!casesData || casesData.length === 0) {
      return <div>No cases to show</div>;
    }

    return (
      <table className={styles.casesTable}>
        <thead>
          <tr>
            <th>CIN</th>
            <th>Lawyer</th>
            <th>Judge</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {casesData.map((caseItem) => (
            <tr key={caseItem.CIN}>
              <td>{caseItem.courtCase.CIN}</td>
              <td>{caseItem.courtCase.lawyer}</td>
              <td>{caseItem.courtCase.judge}</td>
              <td>{caseItem.startTime}</td>
              <td>{caseItem.endTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.heading}>See Schedule</h2>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <label>
          Enter Date: <br />
          <input
            type="text"
            name="date"
            placeholder="YYYY-MM-DD"
            value={formData.date}
            onChange={handle}
          />
        </label>
        <button type="submit" className={styles.btn}>
          Submit
        </button>
      </form>
      <div className={styles.casesTableContainer}>
      <div className={styles.casesTimeTable}>{casesData && renderCasesTable()}</div>
      </div>
    </div>
  );
};

export default SeeSchedule;
