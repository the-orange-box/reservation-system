import React from 'react';
import CalendarDayHeader from './CalendarDayHeader';
import CalendarDay from './CalendarDay';
import styles from '../../public/styles/calendar.module.css';

const CalendarDropdown = ({visibility, dayArray, selectDay, updateCurrentMonth, currentMonth, transition, clearDates}) => (
  <div id={styles.calendarDropdown} className={styles.calendarDropdown + ' ' + transition} style={{visibility: visibility}}>
    <button className={styles.previousMonth} onClick={() => updateCurrentMonth(-1)}>
      <svg className={styles.innerCalendarArrow} width="40px" height="35px">
        <line x1="26" x2="18" y1="27.25" y2="18.75" stroke="rgb(72, 72, 72)" strokeWidth="1.5" strokeLinecap="butt"/>
        <line x1="18" x2="26" y1="18.75" y2="10.25" stroke="rgb(72, 72, 72)" strokeWidth="1.5" strokeLinecap="butt"/>
      </svg>
    </button>
    <span className={styles.currMonth}>{currentMonth.format("MMMM YYYY")}</span>
    <button className={styles.nextMonth} onClick={() => updateCurrentMonth(1)}>
      <svg className={styles.innerCalendarArrow} width="40px" height="35px">
        <line x1="18" x2="26" y1="27.25" y2="18.75" stroke="rgb(72, 72, 72)" strokeWidth="1.5" strokeLinecap="butt"/>
        <line x1="26" x2="18" y1="18.75" y2="10.25" stroke="rgb(72, 72, 72)" strokeWidth="1.5" strokeLinecap="butt"/>
      </svg>
    </button>
    <div className={styles.calendarDayHeader}>
      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day,key) => <CalendarDayHeader day={day} key={key}/>)}
    </div>
    <div className={styles.calendarDay}>
      {dayArray.map((day,index) => <CalendarDay day={day} key={index} index={index} selectDay={selectDay}/>)}
    </div>
    <div className={styles.calendarDropdownFooter}>
      Prices do not include fees and taxes
    </div>
    <button className={styles.clearDates} onClick={clearDates}>
      Clear dates
    </button>
  </div>
)

export default CalendarDropdown;