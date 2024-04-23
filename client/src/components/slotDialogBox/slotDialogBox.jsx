import React, { useState, useEffect } from 'react';
import styles from './slotDialogBox.module.css'; // Add your CSS file for the dialog styling
import axios from 'axios';

const SlotDialog = ({ open, onClose }) => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem('isLoggedIn')).token;

  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/api/slots/available', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          }
        });
        setSlots(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching slots:', error);
        setLoading(false);
      }
    };

    if (open) {
      fetchSlots();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h2>Free Slots</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {slots.map(slot => (
              <li key={slot._id}>{slot.date} - {slot.time.startTime} to {slot.time.endTime}</li>
            ))}
          </ul>
        )}
        <button onClick={onClose} className={styles.btn}>Close</button>
      </div>
    </div>
  );
};

export default SlotDialog;

