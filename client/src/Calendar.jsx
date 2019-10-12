import React from 'react';

//calendar of available dates
const Calendar = () => (
  <div>
    <div className="calendarHeader">
      Dates
    </div>
    <div className="calendar">
      <input className="calendarInputs" id="checkin" value="Check-in"/>
      <div className="calendarArrow">
        →
      </div>
      <input className="calendarInputs" id="checkout" value="Check-out"/>
    </div>
  </div>
)

export default Calendar;