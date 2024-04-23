import React, { useState } from 'react';
import styles from './record.module.css';
import SlotDialog from '../slotDialogBox/slotDialogBox.jsx'; // Import the SlotDialog component
import axios from 'axios'; // Import axios for making HTTP requests
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Record = (recordType) => {
  const [formData, setFormData] = useState({
    cin: '',
    summary: '',
    newHearingDate: '',
    startTime: '',
    endTime: ''
  });

  const [dialogOpen, setDialogOpen] = useState(false); 
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const token = JSON.parse(localStorage.getItem('isLoggedIn')).token;
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/court_cases/${recordType.recordType}/${formData.cin}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          }
        }
      );
      console.log(response.data); // Log response data
      toast.success('Summary added successfully!'); // Display success message
      setFormData({ cin: '', summary: '', newHearingDate: '', startTime: '', endTime: '' }); // Clear form fields
    } catch (error) {
      if (error && error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message); // Display error message
      } else {
        toast.error('An error occurred. Please try again.'); // Default error message
      }
    }
    
  };

  const handleDialogBoxOpen = () => {
    setDialogOpen(true); // Open the dialog when the button is clicked
  };

  const handleDialogBoxClose = () => {
    setDialogOpen(false); // Close the dialog
  };

  return (
    <div className={styles.mainContainer}>
      <ToastContainer/>
      <div className={styles.formContainer}>
        <h2 className={styles.heading}>Add Summary</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className={styles.formLabels}>Case Identification Number (CIN):</label>
            <br/>
            <input
              type="text"
              name="cin"
              value={formData.cin}
              onChange={handleChange}
              placeholder="Enter CIN here"
            />
          </div>
          <div>
            <label className={styles.formLabels}>Summary:</label>
            <div>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Enter summary here"
                style={{
                  width: '300px', // Set width using inline style
                  height: '70px', // Set height using inline style
                }}
              ></textarea>
            </div>
          </div>
          <div>
            <label className={styles.formLabels}>New Hearing Date:</label>
            <div>
              <input
                type="text"
                name="newHearingDate"
                value={formData.newHearingDate}
                onChange={handleChange}
                placeholder="YYYY-MM-DD"
              />
            </div>
          </div>
          <div>
            <label className={styles.formLabels}>Start Time:</label>
            <div>
              <input
                type="text"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                placeholder="HH:MM AM/PM"
              />
            </div>
          </div>
          <div>
            <label className={styles.formLabels}>End Time:</label>
            <div>
              <input
                type="text"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                placeholder="HH:MM AM/PM"
              />
            </div>
          </div>
          <div className = {styles.btns}>
          <button className={styles.btn} onClick={handleDialogBoxOpen}>Get Free Slot</button>
          <button type="submit" className={styles.btn}>Submit</button>
          </div>
        </form>
      </div>
      
      <SlotDialog open={dialogOpen} onClose={handleDialogBoxClose} /> {/* Render the SlotDialog component */}
      
    </div>

  );
};

export default Record;
