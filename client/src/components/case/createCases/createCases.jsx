import React, { useState } from 'react';
import styles from './createCases.module.css';
import SlotDialog from '../../slotDialogBox/slotDialogBox.jsx'; 
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreateCourtCaseForm = () => {

  // State variables to hold form data
  const [formData, setFormData] = useState({
    CIN: '',
    defendantName: '',
    defendantAddress: '',
    crimeType: '',
    crimeDate: '',
    crimeLocation: '',
    arrestingOfficer: '',
    arrestDate: '',
    hearingDate: '',
    timelineDate: '',
    timelineStartTime: '',
    timelineEndTime: '',
    judge: '',
    prosecutor: '',
    lawyer: '',
    startDate: '',
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const token = JSON.parse(localStorage.getItem('isLoggedIn')).token;

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const payload = {
      CIN: formData.CIN,
      defendant: {
        name: formData.defendantName,
        address: formData.defendantAddress
      },
      crime: {
        type: formData.crimeType,
        date_committed: formData.crimeDate,
        location: formData.crimeLocation
      },
      arrest: {
        arresting_officer: formData.arrestingOfficer,
        date: formData.arrestDate
      },
      timeline: [{
        date: formData.startDate,
        startTime: formData.timelineStartTime,
        endTime: formData.timelineEndTime
      }],
      judge: formData.judge,
      prosecutor: formData.prosecutor,
      lawyer: formData.lawyer,
      start_date: formData.startDate
    };
  
    try {
      const response = await axios.post(
        'http://localhost:8000/api/court_cases/create',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          }
        }
      );
      console.log(response.data); 
      setFormData({
        CIN: '',
        defendantName: '',
        defendantAddress: '',
        crimeType: '',
        crimeDate: '',
        crimeLocation: '',
        arrestingOfficer: '',
        arrestDate: '',
        timelineDate: '',
        timelineStartTime: '',
        timelineEndTime: '',
        judge: '',
        prosecutor: '',
        lawyer: '',
        startDate: ''
      });
      toast.success('Court case created successfully!');
    } catch (error) {
      if (error && error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message); // Display error message
      } else {
        toast.error('An error occurred. Please try again.'); // Default error message
      }
    }
  };
  

  const handleDialogBoxOpen = (e) => {
    e.stopPropagation();
    setDialogOpen(true); // Open the dialog when the button is clicked
  };

  const handleDialogBoxClose = () => {
    setDialogOpen(false); // Close the dialog
  };
  // console.log(formData);
  return (
    
      <div className={styles.mainContainer}>
        <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.heading}>Create Court Case</h2>
        <div className={styles.inputContainer}>
        <label className={styles.formLabels}>
          CIN:
          <input className = {styles.forminput}  type="text" name="CIN" value={formData.CIN} onChange={handleChange} />
        </label>
        </div>
        <div className={styles.inputContainer}>
        <label className={styles.formLabels}>
          Defendant Name:
          <input type="text" name="defendantName" value={formData.defendantName} onChange={handleChange} />
        </label>
        <label className={styles.formLabels}>
          Defendant Address:
          <input className = {styles.forminput}  type="text" name="defendantAddress" value={formData.defendantAddress} onChange={handleChange} />
        </label>
        </div>
        <div className={styles.inputContainer}>
        <label className={styles.formLabels}>
          Crime Type:
          <input className = {styles.forminput}  type="text" name="crimeType" value={formData.crimeType} onChange={handleChange} />
        </label>
        <label className={styles.formLabels}>
          Crime Date:
          <input type="text" name="crimeDate" value={formData.crimeDate} onChange={handleChange} />
        </label>
        <label className={styles.formLabels}>
          Crime Location:
          <input className = {styles.forminput}  type="text" name="crimeLocation" value={formData.crimeLocation} onChange={handleChange} />
        </label>
        </div>
        <div className={styles.inputContainer}>
        <label className={styles.formLabels}>
          Arresting Officer:
          <input className = {styles.forminput}  type="text" name="arrestingOfficer" value={formData.arrestingOfficer} onChange={handleChange} />
        </label>
        <label className={styles.formLabels}>
          Arrest Date:
          <input className = {styles.forminput}  type="text" name="arrestDate" value={formData.arrestDate}placeholder="YYYY-MM-DD" onChange={handleChange} />
        </label> 
        </div>
        <div className={styles.inputContainer}>
        <label className={styles.formLabels}>
          First Hearing Start Time:
          <input className = {styles.forminput}  type="text" name="timelineStartTime" value={formData.timelineStartTime} placeholder="HH:MM AM/PM"onChange={handleChange} />
        </label>
        <label className={styles.formLabels}>
          First Hearing End Time:
          <input className = {styles.forminput}  type="text" name="timelineEndTime" value={formData.timelineEndTime} placeholder="HH:MM AM/PM" onChange={handleChange} />
        </label>
        </div >
        <div className={styles.inputContainer}>
        <label className={styles.formLabels}>
          Judge:
          <input type="text" name="judge" value={formData.judge} onChange={handleChange} />
        </label>
        <label className={styles.formLabels}>
          Prosecutor:
          <input className = {styles.forminput}  type="text" name="prosecutor" value={formData.prosecutor} onChange={handleChange} />
        </label>
        <label className={styles.formLabels}>
          Lawyer:
          <input className = {styles.forminput}  type="text" name="lawyer" value={formData.lawyer} onChange={handleChange} />
        </label>
        </div>
        <div className={styles.inputContainer}>
        <label className={styles.formLabels}>
          Start Date:
          <input className = {styles.forminput} type="text" name="startDate" value={formData.startDate} placeholder="YYYY-MM-DD"onChange={handleChange} />
        </label>
        </div>
        <div className={styles.btns}>
        <button className={styles.btn} onClick={handleDialogBoxOpen}>Get Free Slot</button>
        <button type="submit" className={styles.btn}>Submit</button>
        </div>
      </form>
      
      <SlotDialog open={dialogOpen} onClose={handleDialogBoxClose} /> {/* Render the SlotDialog component */}
      
    </div>
  );
};

export default CreateCourtCaseForm;
