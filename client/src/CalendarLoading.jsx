import React from 'react';
import styles from '../../public/styles/calendar.module.css';

const CalendarLoading = () => (
  <div className={styles.calendarSubGrid}>
    <div className={styles.calendarHeader} id={styles.calendarHeader}>
      Dates
    </div>
    <div className={styles.calendarInputs}>
      <input className={styles.checkin} id={styles.checkin} readOnly value='Check-in'/>
      <svg className={styles.calendarArrow} width="35px" height="35px">
        <line x1="5" x2="31" y1="17.5" y2="17.5" stroke="black" strokeWidth=".70" strokeLinecap="butt"/>
        <line x1="31" x2="24" y1="17.5" y2="10" stroke="black" strokeWidth=".70" strokeLinecap="butt"/>
        <line x1="31" x2="24" y1="17.5" y2="25" stroke="black" strokeWidth=".70" strokeLinecap="butt"/>
      </svg>
      <input className={styles.checkout} id={styles.checkout} readOnly value='Checkout'/>
    </div>
  </div>
)

export default CalendarLoading;