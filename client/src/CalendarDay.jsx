import React from 'react';

const CalendarDay = ({day, index, selectDay}) => (
  <button className={"calendarDayButton "+ day.status} disabled={day.invalidDate} onClick={() =>{
    console.log(index);
    selectDay(index)
  } }>{day.day}</button>
)

export default CalendarDay;