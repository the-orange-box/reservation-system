import React from 'react';
import CalendarDropdown from './CalendarDropdown';
const moment = require('moment');
moment().format();

//calendar of available dates
class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dayArray: new Array(42).fill(null).map(day => ({ day: null, status: 'available'})),
      calendarVisibility: "hidden",
      checkinCheckout: [null,null],
      currentSelection: null,
      currentMonth: moment()
    };

    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.handleOutsideCalendarClick = this.handleOutsideCalendarClick.bind(this);
    this.selectDay = this.selectDay.bind(this);
    this.updateSelectionRange = this.updateSelectionRange.bind(this);
    this.populateCurrDisplayMonth = this.populateCurrDisplayMonth.bind(this);
    this.updateCurrentMonth = this.updateCurrentMonth.bind(this);
  }

  populateCurrDisplayMonth() {
    let startDayIndex = this.state.currentMonth.startOf('month').day();
    let totalDays = this.state.currentMonth.daysInMonth();
    let dayArray = this.state.dayArray.slice(0);

    let day = 1;
    for(let i = 0; i < startDayIndex; i++) {
      dayArray[i].day = null;
    }
    for(let i = startDayIndex; i < totalDays + startDayIndex; i++) {
      dayArray[i].day = day;
      day++;
    }
    for(let i = totalDays + startDayIndex; i < dayArray.length; i++) {
      dayArray[i].day = null;
    }
  }

  updateCurrentMonth(amount) {
    let currentMonth = this.state.currentMonth;
    currentMonth.add(amount, 'months');
    this.setState({
      currentMonth
    }, this.populateCurrDisplayMonth());
  }

  //TODO: refactor this function
  selectDay(index) {
    let dayArray = this.state.dayArray.slice(0);
    let checkinCheckout = this.state.checkinCheckout.slice(0);
    if (this.state.currentSelection === 'checkin') {
      if (this.state.checkinCheckout[0] !== null && this.state.checkinCheckout[0] !== index) {
        dayArray[this.state.checkinCheckout[0]].status = 'available';
      } 
      checkinCheckout[0] = index;
      dayArray[index].status = 'selected';
      this.updateSelectionRange(dayArray, index, this.state.checkinCheckout[1]);
    } else {
      if (this.state.checkinCheckout[1] !== null && this.state.checkinCheckout[1] !== index) {
        dayArray[this.state.checkinCheckout[1]].status = 'available'; 
      } 
      checkinCheckout[1] = index;
      dayArray[index].status = 'selected';
      this.updateSelectionRange(dayArray, this.state.checkinCheckout[0], index);
    }
    this.setState({
      dayArray,
      checkinCheckout
    });
  }

  updateSelectionRange(dayArray, checkin, checkout) {
    //anything less than checkinDate, change status to available, everything greater than checkout/ change to available
    //anything in between chnage to selectionRange
    if(checkin) {
      for (let i = 0; i < checkin; i++) {
        dayArray[i].status = 'available'
      }
    }
    if(checkin && checkout) {
      for (let i = checkin + 1; i < checkout; i++) {
        dayArray[i].status = 'selectionRange';
      }
      dayArray[checkin].status += ' checkinSelected';
      dayArray[checkout].status += ' checkoutSelected';
    }
    if(checkout) {
      for(let i = checkout + 1; i < dayArray.length; i++) {
        dayArray[i].status = 'available'
      }
    }
  }

  toggleCalendar(selectType) {
    let calendarVisibility;
    if(this.state.calendarVisibility === "hidden") {
      calendarVisibility = "visible";
    } else {
      calendarVisibility = "hidden";
    }
    this.setState({
      calendarVisibility,
      currentSelection: selectType
    });
  }

  handleOutsideCalendarClick(e) {
    if (this.state.calendarVisibility === "visible" && !this.node.contains(e.target)) {
      this.toggleCalendar();
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideCalendarClick, false);
    this.populateCurrDisplayMonth();
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
          <input className="checkin" id="checkin" value="Check-in" onClick={() => this.toggleCalendar('checkin')} />
          <svg className="calendarArrow" width="35px" height="35px">
            <line x1="5" x2="31" y1="17.5" y2="17.5" stroke="black" strokeWidth=".70" strokeLinecap="butt"/>
            <line x1="31" x2="24" y1="17.5" y2="10" stroke="black" strokeWidth=".70" strokeLinecap="butt"/>
            <line x1="31" x2="24" y1="17.5" y2="25" stroke="black" strokeWidth=".70" strokeLinecap="butt"/>
          </svg>
          <input className="checkout" id="checkout" value="Checkout" onClick={() => this.toggleCalendar('checkout')}/>
        </div>
        <div ref={node => this.node = node}>
          <CalendarDropdown dayArray={this.state.dayArray}
                            visibility={this.state.calendarVisibility}
                            selectDay={this.selectDay}
                            updateCurrentMonth={this.updateCurrentMonth}/>
        </div>
      </div>
    )
  }
}

export default Calendar;