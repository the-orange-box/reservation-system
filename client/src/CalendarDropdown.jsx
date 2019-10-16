import React from 'react';
import CalendarDayHeader from './CalendarDayHeader';
import CalendarDay from './CalendarDay';

const CalendarDropdown = ({visibility, dayArray}) => (
  <div className="calendarDropdown" style={{visibility: visibility}}>
    <button className="previousMonth">
      <svg className="innerCalendarArrow" width="40px" height="35px">
        <line x1="26" x2="18" y1="27.25" y2="18.75" stroke="rgb(72, 72, 72)" strokeWidth="1.5" strokeLinecap="butt"/>
        <line x1="18" x2="26" y1="18.75" y2="10.25" stroke="rgb(72, 72, 72)" strokeWidth="1.5" strokeLinecap="butt"/>
      </svg>
    </button>
    <span className="currMonth">October 2019</span>
    <button className="nextMonth">
      <svg className="innerCalendarArrow" width="40px" height="35px">
        <line x1="18" x2="26" y1="27.25" y2="18.75" stroke="rgb(72, 72, 72)" strokeWidth="1.5" strokeLinecap="butt"/>
        <line x1="26" x2="18" y1="18.75" y2="10.25" stroke="rgb(72, 72, 72)" strokeWidth="1.5" strokeLinecap="butt"/>
      </svg>
    </button>
    <div className="calendarDayHeader">
      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => <CalendarDayHeader day={day}/>)}
    </div>
    <div className="calendarDay">
      {dayArray.map(day => <CalendarDay day={day}/>)}
    </div>
    <div className="calendarDropdownFooter">
      Prices do not include fees and taxes
    </div>
    <button className="clearDates">
      Clear dates
    </button>
  </div>
)

export default CalendarDropdown;