import React, { useState } from 'react';
import styles from './createCases.module.css';
import SlotDialog from '../../slotDialogBox/slotDialogBox.jsx'; 
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
    hearingSummary: '',
    hearingStartTime: '',
    hearingEndTime: '',
    timelineDate: '',
    timelineStartTime: '',
    timelineEndTime: '',
    judge: '',
    prosecutor: '',
    lawyer: '',
    startDate: '',
    status: '',
    adjournmentDate: '',
    adjournmentSummary: '',
    judgmentDate: '',
    judgmentSummary: ''
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here (e.g., send data to backend API)
    console.log(formData);
    // Reset form data after submission
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
      startDate: '',
    });
  };
  const handleDialogBoxOpen = () => {
    setDialogOpen(true); // Open the dialog when the button is clicked
  };

  const handleDialogBoxClose = () => {
    setDialogOpen(false); // Close the dialog
  };


  return (
      <div className={styles.mainContainer}>
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
          <input className = {styles.forminput}  type="text" name="timelineStartTime" value={formData.timelineStartTime} placeholder="HH:MM AM/PM" onChange={handleChange} />
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
