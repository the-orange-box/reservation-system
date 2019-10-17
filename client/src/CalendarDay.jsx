import React from 'react';

const CalendarDay = ({day, index, selectDay}) => (
  <button className={"calendarDayButton "+ day.status} disabled={day.outOfRangeDate} onClick={() =>{
    console.log(index);
    selectDay(index)
  } }>{day.day}</button>
)

export default CalendarDay;