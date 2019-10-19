import React from 'react';
import ReactDOM from 'react-dom';
import CalendarDropdown from './CalendarDropdown';
const moment = require('moment');
moment().format();

//calendar of available dates
//TODO: need to add changing footer notes.
//TODO: bug where if you scroll to the same month in a different year. selection dates are weird
class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dayArray: new Array(42).fill(null).map(day => ({ day: null, status: 'unselected', invalidDate: false})),
      calendarVisibility: "hidden",
      checkinCheckout: [null,null],
      currentSelection: null,
      currentMonth: moment(),
      transition: 'fadein',
      pastDates: [],
    };

    this.requiredBookingDays = this.props.requiredBookingDays;
    this.bookedDates = this.props.bookedDates;
    
    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.handleOutsideCalendarClick = this.handleOutsideCalendarClick.bind(this);
    this.selectDay = this.selectDay.bind(this);
    this.updateSelectionRange = this.updateSelectionRange.bind(this);
    this.populateCurrDisplayMonth = this.populateCurrDisplayMonth.bind(this);
    this.updateCurrentMonth = this.updateCurrentMonth.bind(this);
    this.monthTransitionIn = this.monthTransitionIn.bind(this);
    this.displayCheckInOutDate = this.displayCheckInOutDate.bind(this);
    this.calculateDisabledDates = this.calculateDisabledDates.bind(this);
    this.calculateDayOfMonth = this.calculateDayOfMonth.bind(this);
    this.calculateIndexOfDay = this.calculateIndexOfDay.bind(this);
    this.clearDates = this.clearDates.bind(this);
    this.calculateBookedDates = this.calculateBookedDates.bind(this);
    this.getMomentJSofIndex = this.getMomentJSofIndex.bind(this);
  }

  calculateDisabledDates(dayArray) {
    let firstValidDay;
    if(this.state.currentMonth.month() === moment().month() && this.state.currentMonth.year() === moment().year()) {
      firstValidDay = this.calculateIndexOfDay(Number(moment().format('DD')));
    } else {
      firstValidDay = this.state.currentMonth.startOf('month').day();
    }
    for (let i = 0; i < firstValidDay; i++) {
      dayArray[i].invalidDate = true;
    }

    let lastDayIndex = this.calculateIndexOfDay(this.state.currentMonth.daysInMonth() + 1);
    for (let i = lastDayIndex; i < dayArray.length; i++) {
      dayArray[i].invalidDate = true;
    }
  }

  calculateBookedDates(dayArray) {
    let currentMonthBookedDates = this.bookedDates.filter(
                                  monthDates => (monthDates.month() === this.state.currentMonth.month()) && (monthDates.year() === this.state.currentMonth.year()));
    for (let i = 0; i < currentMonthBookedDates.length; i++) {
      dayArray[this.calculateIndexOfDay(Number(currentMonthBookedDates[i].format('DD')))].invalidDate = true;
    }
  }

  populateCurrDisplayMonth(dayArray) {
    let startDayIndex = this.state.currentMonth.startOf('month').day();
    let totalDays = this.state.currentMonth.daysInMonth();

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

    //reset daysArray for new month
    let dayArray = new Array(42).fill(null).map(day => ({ day: null, status: 'unselected', invalidDate: false}));
    this.populateCurrDisplayMonth(dayArray);
    this.calculateDisabledDates(dayArray);
    this.calculateBookedDates(dayArray);

    if(this.state.checkinCheckout[0] !== null && 
      (this.state.currentMonth.format('MM') === moment(this.state.checkinCheckout[0]).format('MM'))
      && (this.state.currentMonth.format('YYYY') === moment(this.state.checkinCheckout[0]).format('YYYY'))) {
        //select checkin
        let checkinDay = moment(this.state.checkinCheckout[0]).format('DD');
        let checkinIndex = this.calculateIndexOfDay(checkinDay, this.state.checkinCheckout[0]);
        dayArray[checkinIndex].status = 'selected';
    }
    if(this.state.checkinCheckout[1] !== null && 
      this.state.currentMonth.format('MM') === moment(this.state.checkinCheckout[1]).format('MM')
      && (this.state.currentMonth.format('YYYY') === moment(this.state.checkinCheckout[1]).format('YYYY'))) {
        //select checkout
        let checkoutDay = moment(this.state.checkinCheckout[1]).format('DD');
        let checkoutIndex = this.calculateIndexOfDay(checkoutDay, this.state.checkinCheckout[1]);
        dayArray[checkoutIndex].status = 'selected';
    }

    if(this.state.checkinCheckout[0] !== null && this.state.checkinCheckout[1] !== null) {
      this.updateSelectionRange(dayArray, moment(this.state.checkinCheckout[0]), moment(this.state.checkinCheckout[1]));
    }

    this.setState({
      currentMonth,
      dayArray,
    }); 
    this.monthTransitionIn()//TODO: update this transition
  }

  //TODO: refactor this function
  selectDay(index) {
    let dayArray = JSON.parse(JSON.stringify(this.state.dayArray));
    let checkinCheckout = this.state.checkinCheckout.slice(0);
    let checkInOutDate = this.getMomentJSofIndex(index, this.state.currentMonth.format('MM'), this.state.currentMonth.format('YYYY'));

    if (this.state.currentSelection === 'checkin') {
      if (this.state.checkinCheckout[0] !== null) {
        let checkinIndex = this.calculateIndexOfDay(Number(moment(this.state.checkinCheckout[0]).format('DD')));
        if(checkinIndex !== index) {
          dayArray[checkinIndex].status = 'unselected';
        }
      } 
    
      let daysBeforeBookedDate = 0;
      let counter = index;
      let year = this.state.currentMonth.format('YYYY');
      let month = this.state.currentMonth.format('MM');
      let isValidDate = false;

      while (counter <= this.requiredBookingDays + 1+ index) {
        var checkforBookedorCheckedInDate = this.getMomentJSofIndex(counter, month, year);
        var isBooked = false;

        for(let i = 0; i < this.bookedDates.length; i++){
          if(checkforBookedorCheckedInDate.format('YYYY MM DD') === this.bookedDates[i].format('YYYY MM DD')) {
            isBooked = true;
            break;
          }
        }

        let isCheckedOutDate;
        if(this.state.checkinCheckout[1]) {
          isCheckedOutDate = checkforBookedorCheckedInDate.format('YYYY MM DD') === moment(this.state.checkinCheckout[1]).format('YYYY MM DD');
        }
        if((daysBeforeBookedDate === this.requiredBookingDays + 1) || isBooked || isCheckedOutDate) {
          if(daysBeforeBookedDate === this.requiredBookingDays + 1 || (isCheckedOutDate && daysBeforeBookedDate === this.requiredBookingDays)) {
            isValidDate = true;
          }
          break;
        }
        daysBeforeBookedDate++;
        counter++;
        
        let lastDayIndex = this.calculateIndexOfDay(this.state.currentMonth.daysInMonth());
        if(counter - 1 === lastDayIndex) {
          let nextMonth = this.state.currentMonth.format();
          nextMonth = moment(nextMonth);
          nextMonth.add(1, 'months');
          counter = nextMonth.startOf('month').day();
          month = nextMonth.format('MM');
          year = nextMonth.format('YYYY');
        }
      }

      if(isValidDate) {
        checkinCheckout[0] = checkInOutDate;
        dayArray[index].status = 'selected';
      }

      let checkoutDate;
      if(this.state.checkinCheckout[1] !== null) {
        checkoutDate = moment(this.state.checkinCheckout[1]);
        if(moment(checkInOutDate) > checkoutDate) {
          checkoutDate = null;
          checkinCheckout[1] = null;
          let startDayIndex = this.state.currentMonth.startOf('month').day();
          for (let i = startDayIndex; i < index; i++) {
            dayArray[i].status = 'unselected';
          }
        }
      }

      if (isValidDate) {
        this.updateSelectionRange(dayArray, moment(checkInOutDate), checkoutDate);
      }
    } else {
      if(moment(checkInOutDate) > moment(this.state.checkinCheckout[0])) {
        if (this.state.checkinCheckout[1] !== null) {
          let checkoutIndex = this.calculateIndexOfDay(Number(moment(this.state.checkinCheckout[1]).format('DD')));
          if(checkoutIndex !== index) {
            dayArray[checkoutIndex].status = 'unselected';
          }
        } 
        let daysBeforeBookedDate = 0;
        let counter = index;
        let year = this.state.currentMonth.format('YYYY');
        let month = this.state.currentMonth.format('MM');
        let isValidDate = false;
        while (counter >= index - this.requiredBookingDays) {
          var checkforBookedorCheckedInDate = this.getMomentJSofIndex(counter, month, year);
          var isBooked = false;
          for(let i = 0; i < this.bookedDates.length; i++){
            if(checkforBookedorCheckedInDate.format('YYYY MM DD') === this.bookedDates[i].format('YYYY MM DD')) {
              isBooked = true;
              break;
            }
          }
          let isCheckedInDate = checkforBookedorCheckedInDate.format('YYYY MM DD') === moment(this.state.checkinCheckout[0]).format('YYYY MM DD');
          if((daysBeforeBookedDate === this.requiredBookingDays) || isBooked || isCheckedInDate) {
            if(daysBeforeBookedDate === this.requiredBookingDays) {
              isValidDate = true;
            }
            break;
          }
  
          daysBeforeBookedDate++;
          counter--;
          
          let firstDayIndex = this.state.currentMonth.startOf('month').day();
          if(counter + 1 === firstDayIndex) {
            let prevMonth = this.state.currentMonth.format();
            prevMonth = moment(prevMonth);
            prevMonth.subtract(1, 'months');
            month = prevMonth.format('MM');
            year = prevMonth.format('YYYY');
            counter = this.calculateIndexOfDay(prevMonth.daysInMonth(), year + '-01-' + month);
          }
        }
        if(isValidDate) {
          checkinCheckout[1] = checkInOutDate;
          dayArray[index].status = 'selected';
        }

        let checkinDate;
        if(this.state.checkinCheckout[0] !== null) {
          checkinDate = moment(this.state.checkinCheckout[0]);
        }

        if(isValidDate) {
          this.updateSelectionRange(dayArray, checkinDate, moment(checkInOutDate));
        }
      }
    }
    
    if((checkinCheckout[0] !== null && checkinCheckout[0] !== this.state.checkinCheckout[0]) 
                                                || this.state.currentSelection === 'checkout' && checkinCheckout[1] !== this.state.checkinCheckout[1]) {
      let prevSelection = this.state.currentSelection;
      this.setState({
        dayArray,
        checkinCheckout,
        currentSelection: 'checkout'
      }, () => {
        if(prevSelection === 'checkin') {
          document.getElementById('checkout').focus();
        } else if(this.state.checkinCheckout[1] !== null) {
          this.toggleCalendar();
        }
      });
    }
  }

  updateSelectionRange(dayArray, checkinDate, checkoutDate) {
    if(checkinDate && checkoutDate) {
      let checkin = this.calculateIndexOfDay(Number(checkinDate.format('DD')));
      let checkout = this.calculateIndexOfDay(Number(checkoutDate.format('DD')));

      //checkin previous month
      if((checkinDate.month() < this.state.currentMonth.month() && checkoutDate.month() === this.state.currentMonth.month() )
          || (checkinDate.year() < this.state.currentMonth.year()) && checkoutDate.month() === this.state.currentMonth.month()){
        let startIndex = this.state.currentMonth.startOf('month').day()
        for (let i = startIndex; i < checkout; i++) {
          dayArray[i].status = 'selectionRange';
        }
        dayArray[checkout].status += ' checkoutSelected';
      }
      //checkout next month
      if((checkoutDate.month() > this.state.currentMonth.month() && checkinDate.month() === this.state.currentMonth.month())
      || (checkoutDate.year() > this.state.currentMonth.year() && checkinDate.month() === this.state.currentMonth.month())) {
        let startDayIndex = this.state.currentMonth.startOf('month').day();
        let totalDays = this.state.currentMonth.daysInMonth();
        let endDayIndex = startDayIndex + totalDays
        for (let i = checkin + 1; i < endDayIndex; i++) {
          dayArray[i].status = 'selectionRange';
        }
        dayArray[checkin].status += ' checkinSelected';
      }

      //checkin previous month and checkout next month
      if(checkinDate.startOf('month').diff(this.state.currentMonth.startOf('month'), 'days') < 0 
          && checkoutDate.startOf('month').diff(this.state.currentMonth.startOf('month'), 'days') > 0) {
        let startDayIndex = this.state.currentMonth.startOf('month').day();
        let totalDays = this.state.currentMonth.daysInMonth();
        let endDayIndex = startDayIndex + totalDays
        for (let i = startDayIndex; i < endDayIndex; i++) {
          dayArray[i].status = 'selectionRange';
        }
      } 

      //same month
      if(checkoutDate.month() === this.state.currentMonth.month() && checkinDate.month() === this.state.currentMonth.month()
      && checkoutDate.year() === this.state.currentMonth.year() && checkinDate.year() === this.state.currentMonth.year()) {
        for (let i = 0; i < checkin; i++) {
          dayArray[i].status = 'unselected'
        }
        for (let i = checkin + 1; i < checkout; i++) {
          dayArray[i].status = 'selectionRange';
        }
        for(let i = checkout + 1; i < dayArray.length; i++) {
          dayArray[i].status = 'unselected'
        }
        dayArray[checkin].status += ' checkinSelected';
        dayArray[checkout].status += ' checkoutSelected';
      }
    }
  }

  clearDates() {
    let dayArray = JSON.parse(JSON.stringify(this.state.dayArray));
    for (let i = 0; i < 42; i++) {
      dayArray[i].status = 'unselected';
    }
    this.setState({
      dayArray,
      checkinCheckout: [null, null],
      currentSelection: 'checkin'
    }, document.getElementById('checkin').focus())
  }

  //TODO: need to update so checkout doesn't get highlighted on click if 
  //check-in date not selected
  //need to remove checkout date if new checkin date is selected.
  toggleCalendar(selectType) {
    if(this.state.checkinCheckout[0] === null) {
      document.getElementById('checkin').focus();
      selectType = 'checkin';
    }
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

  monthTransitionIn() {
    let transition = this.state.transition
    if(transition === 'fadeout') {
      transition = 'fadein';
    } else {
      transition = 'fadeout';
    }

    this.setState({
      transition
    });
  }
  
  handleOutsideCalendarClick(e) {
    if (this.state.calendarVisibility === "visible" && !this.node.contains(e.target)) {
      this.toggleCalendar();
    }
  }

  displayCheckInOutDate(index) {
    if(this.state.checkinCheckout[index] === null) {
      if(index === 0) {
        return 'Check-in';
      } else {
        return 'Checkout';
      }
    } else {
      return moment(this.state.checkinCheckout[index]).format('L');
    }
  }

  calculateDayOfMonth(index, date = null) {
    if(date === null) {
      return index - this.state.currentMonth.startOf('month').day() + 1;
    } else {
      return Number(index) - Number(moment(date).startOf('month').day()) + 1;
    }
  }
  calculateIndexOfDay(day, date = null) {
    if (date === null) {
      return day + this.state.currentMonth.startOf('month').day() - 1; 
    } else {
      return Number(day) + Number(moment(date).startOf('month').day()) - 1;
    }
  }

  getMomentJSofIndex(index, month, year) {
    let day = this.calculateDayOfMonth(index, year + '-' + month + '-' + '01');
    if(day < 10) {
      day = '0' + day;
    }
    
    return moment(year + '-' + month + '-' + day);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideCalendarClick, false);
    this.updateCurrentMonth();
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
          <input className="checkin" id="checkin" value={this.displayCheckInOutDate(0)} onClick={() => this.toggleCalendar('checkin')} />
          <svg className="calendarArrow" width="35px" height="35px">
            <line x1="5" x2="31" y1="17.5" y2="17.5" stroke="black" strokeWidth=".70" strokeLinecap="butt"/>
            <line x1="31" x2="24" y1="17.5" y2="10" stroke="black" strokeWidth=".70" strokeLinecap="butt"/>
            <line x1="31" x2="24" y1="17.5" y2="25" stroke="black" strokeWidth=".70" strokeLinecap="butt"/>
          </svg>
          <input className="checkout" id="checkout" value={this.displayCheckInOutDate(1)} onClick={() => this.toggleCalendar('checkout')}/>
        </div>
        <div ref={node => this.node = node}>
          <CalendarDropdown dayArray={this.state.dayArray}
                            visibility={this.state.calendarVisibility}
                            selectDay={this.selectDay}
                            updateCurrentMonth={this.updateCurrentMonth}
                            currentMonth={this.state.currentMonth}
                            transition={this.state.transition}
                            clearDates={this.clearDates}/>
        </div>
      </div>
    )
  }
}

export default Calendar;