import React from 'react';
import CalendarDropdown from './CalendarDropdown';
import CalendarDay from './CalendarDay';

//calendar of available dates
class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dayArray: new Array(42).fill(1),
      checkinVisibility: "visible",
      checkoutVisibility: "hidden"
    };
  }

  render() {
    return (
      <div className="calendarSubGrid">
        <div className="calendarHeader" id="calendarHeader">
          Dates
        </div>
        <div className="calendarInputs">
          <input className="checkin" id="checkin" value="Check-in"/>
          <svg className="calendarArrow" width="35px" height="35px">
            <line x1="5" x2="31" y1="17.5" y2="17.5" stroke="black" strokeWidth=".70" strokeLinecap="butt"/>
            <line x1="31" x2="24" y1="17.5" y2="10" stroke="black" strokeWidth=".70" strokeLinecap="butt"/>
            <line x1="31" x2="24" y1="17.5" y2="25" stroke="black" strokeWidth=".70" strokeLinecap="butt"/>
          </svg>
          <input className="checkout" id="checkout" value="Checkout"/>
        </div>
        <div>
          {[['checkinCalendar', this.state.checkinVisibility], 
            ['checkoutCalendar', this.state.checkoutVisibility]]
                .map(type => <CalendarDropdown dayArray={this.state.dayArray}
                                                         type={type[0]}
                                                         visibility={type[1]}/>)}
        </div>
      </div>
    )
  }
}

export default Calendar;