// SlotDialog.js
import React from 'react';
import styles from './slotDialogBox.module.css'; // Add your CSS file for the dialog styling

const SlotDialog = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h2>Free Slots</h2>
        <p>This is where you display the available slots...</p>
        <button onClick={onClose} className = {styles.btn}>Close</button>
      </div>
    </div>
  );
};

export default SlotDialog;
