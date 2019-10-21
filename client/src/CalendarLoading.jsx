import React from 'react';

const CalendarLoading = () => (
  <div className="calendarSubGrid">
    <div className="calendarHeader" id="calendarHeader">
      Dates
    </div>
    <div className="calendarInputs">
      <input className="checkin" id="checkin" readOnly value='Check-in'/>
      <svg className="calendarArrow" width="35px" height="35px">
        <line x1="5" x2="31" y1="17.5" y2="17.5" stroke="black" strokeWidth=".70" strokeLinecap="butt"/>
        <line x1="31" x2="24" y1="17.5" y2="10" stroke="black" strokeWidth=".70" strokeLinecap="butt"/>
        <line x1="31" x2="24" y1="17.5" y2="25" stroke="black" strokeWidth=".70" strokeLinecap="butt"/>
      </svg>
      <input className="checkout" id="checkout" readOnly value='Checkout'/>
    </div>
  </div>
)

export default CalendarLoading;