import React from 'react';
import styles from '../../public/styles/calendar.module.css';

const CalendarDay = ({day, index, selectDay}) => (
  <button className={styles.calendarDayButton + ' '+ day.status} disabled={day.invalidDate} onClick={() =>{
    selectDay(index)
  } }>{day.day}</button>
)

export default CalendarDay;