import React from 'react';
import CalendarDropdown from './CalendarDropdown';
import CalendarDay from './CalendarDay';

//calendar of available dates
class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dayArray: new Array(42).fill(1),
      calendarVisibility: "hidden",
    };

    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.handleOutsideCalendarClick = this.handleOutsideCalendarClick.bind(this);
  }

  toggleCalendar() {
    let calendarVisibility;
    if(this.state.calendarVisibility === "hidden") {
      calendarVisibility = "visible";
    } else {
      calendarVisibility = "hidden";
    }
    this.setState({
      calendarVisibility
    });
  }

  handleOutsideCalendarClick(e) {
    if (this.state.calendarVisibility === "visible" && !this.node.contains(e.target)) {
      this.toggleCalendar();
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideCalendarClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideCalendarClick, false);
  }

  render() {
    return (
      <div className="calendarSubGrid">
        <div className="calendarHeader" id="calendarHeader">
          Dates
        </div>
        <div className="calendarInputs">
          <input className="checkin" id="checkin" value="Check-in" onClick={this.toggleCalendar} />
          <svg className="calendarArrow" width="35px" height="35px">
            <line x1="5" x2="31" y1="17.5" y2="17.5" stroke="black" strokeWidth=".70" strokeLinecap="butt"/>
            <line x1="31" x2="24" y1="17.5" y2="10" stroke="black" strokeWidth=".70" strokeLinecap="butt"/>
            <line x1="31" x2="24" y1="17.5" y2="25" stroke="black" strokeWidth=".70" strokeLinecap="butt"/>
          </svg>
          <input className="checkout" id="checkout" value="Checkout" onClick={this.toggleCalendar}/>
        </div>
        <div ref={node => this.node = node}>
          <CalendarDropdown dayArray={this.state.dayArray}
                            visibility={this.state.calendarVisibility}/>
        </div>
      </div>
    )
  }
}

export default Calendar;