import React from 'react';
import styles from '../../public/styles/guests.module.css';

const GuestsLoading = () => (
  <div className={styles.guests}>
    <div className={styles.guestsHeader}>
      Guests
    </div>
    <div className={styles.guestsInputContainer}>
      <button className={styles.guestsInput} id={styles.guestsInput}>
        <div id={styles.guestButtonText}>
          1 guest
        </div>
        <svg className={styles.downwardPoint} width="40px" height="35px" display="">
          <line x1="10" x2="18" y1="14.5" y2="23" stroke="black" strokeWidth="1.5" strokeLinecap="butt"/>
          <line x1="26" x2="18" y1="14.5" y2="23" stroke="black" strokeWidth="1.5" strokeLinecap="butt"/>
        </svg>
      </button>
    </div>
  </div>
)

export default GuestsLoading;