import React, { useState } from 'react';
import styles from './see_schedule.module.css';

const SeeSchedule = () => {
  const [formData, setFormData] = useState({ date: '' });
  const [casesData, setCasesData] = useState([
    {
      CIN: '123',
      lawyer: 'John Doe',
      judge: 'Judge Smith',
      startTime: '09:00 AM',
      endTime: '10:00 AM',
    },
    {
      CIN: '124',
      lawyer: 'Jane Smith',
      judge: 'Judge Johnson',
      startTime: '10:00 AM',
      endTime: '11:00 AM',
    },
    {
      CIN: '125',
      lawyer: 'David Brown',
      judge: 'Judge Davis',
      startTime: '11:00 AM',
      endTime: '12:00 PM',
    },
    {
      CIN: '126',
      lawyer: 'Emily White',
      judge: 'Judge Wilson',
      startTime: '01:00 PM',
      endTime: '02:00 PM',
    },
    {
      CIN: '127',
      lawyer: 'Michael Green',
      judge: 'Judge Martinez',
      startTime: '02:00 PM',
      endTime: '03:00 PM',
    },
    {
      CIN: '127',
      lawyer: 'Michael Green',
      judge: 'Judge Martinez',
      startTime: '03:00 PM',
      endTime: '04:00 PM',
    },
    {
      CIN: '127',
      lawyer: 'Michael Green',
      judge: 'Judge Martinez',
      startTime: '04:00 PM',
      endTime: '05:00 PM',
    },
    {
      CIN: '127',
      lawyer: 'Michael Green',
      judge: 'Judge Martinez',
      startTime: '05:00 PM',
      endTime: '06:00 PM',
    },
    {
      CIN: '127',
      lawyer: 'Michael Green',
      judge: 'Judge Martinez',
      startTime: '06:00 PM',
      endTime: '07:00 PM',
    },
  ]);

  const handle = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulating API call delay for testing
    setTimeout(() => {
      setCasesData([]); // Set empty array to simulate no cases fetched
    }, 1000);
    setFormData({ date: '' });
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
              <td>{caseItem.CIN}</td>
              <td>{caseItem.lawyer}</td>
              <td>{caseItem.judge}</td>
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
