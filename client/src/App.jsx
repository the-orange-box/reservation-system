import React from 'react';
import PropertyDetail from './PropertyDetail';
import Calendar from './Calendar';
import Guests from './Guests';
import Reserve from './Reserve';
import BookingDetail from './BookingDetail';
import GuestsLoading from './GuestsLoading';
import CalendarLoading from './CalendarLoading';
import ReserveLoading from './ReserveLoading';
const moment = require('moment');
const axios = require('axios');
moment().format();

//add REPORT THIS LISTING
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      propertyInfo: {
        pMax_guests: null, 
        pNightly_price: null, 
        pBulkDiscount: null,
        pCleaning_fee: null,
        pService_fee: null,
        pTaxes_fees: null,
        pRequired_Week_Booking_Days: null, 
        pRating: null, 
        pReviews: null 
      },
      bookingDisplay: [],
      numReservedDates: null,
      totalGuests: 1,
      totalPrice: null,
      totalServiceFee: null,
      totalWeeklyDiscount: null,
      totalAmount: null,
      propertyID: window.location.href.split('/')[4]
    };

    this.getNumReservedDates = this.getNumReservedDates.bind(this);
    this.getTotalGuests = this.getTotalGuests.bind(this);
    this.populateBookingDisplay = this.populateBookingDisplay.bind(this);
    this.getPropertyInfo = this.getPropertyInfo.bind(this);
  }

  getPropertyInfo() {
    axios.get('/id:' + this.state.propertyID)
      .then((res) => {
        let propertyInfo = JSON.parse(JSON.stringify(this.state.propertyInfo));
        for(let key in propertyInfo) {
          if(typeof res.data[0][key] === 'string') {
            propertyInfo[key] = Number(res.data[0][key]);
          } else {
            propertyInfo[key] = res.data[0][key];
          }
        }
        this.setState({
          propertyInfo
        });
      })
      .catch((err) => console.log(err));
  }

  populateBookingDisplay() {                              
    let totalPrice = null;
    let totalServiceFee = null;
    let totalWeeklyDiscount = null;
    let totalAmount = null;

    let bookingDisplay = [];
    if(this.state.numReservedDates) {
      totalPrice = this.state.propertyInfo.pNightly_price * this.state.numReservedDates;
      totalServiceFee = this.state.propertyInfo.pService_fee * totalPrice;
      totalWeeklyDiscount = -(totalPrice * this.state.propertyInfo.pBulkDiscount);
      totalAmount = totalPrice + totalServiceFee + totalWeeklyDiscount + 
                    this.state.propertyInfo.pCleaning_fee + this.state.propertyInfo.pTaxes_fees;

      let possibleBookingDisplays = {
              'pNightly_price': [`$${this.state.propertyInfo.pNightly_price} x ${this.state.numReservedDates} nights`, totalPrice], 
              'pBulkDiscount' : [`${100 - (this.state.propertyInfo.pBulkDiscount * 100)}% weekly price discount`, totalWeeklyDiscount],
              'pCleaning_fee' : ['Cleaning Fee', this.state.propertyInfo.pCleaning_fee], 
              'pService_fee'  : ['Service fee', totalServiceFee], 
              'pTaxes_fees'   : ['Occupancy taxes and fees', this.state.propertyInfo.pTaxes_fees] 
            };

      for (let key in this.state.propertyInfo) {
        if (possibleBookingDisplays.hasOwnProperty(key)) {
          bookingDisplay.push( { key: possibleBookingDisplays[key][0], 
                                 value: '$' + Math.trunc(possibleBookingDisplays[key][1]),
                                 id: key});
        }
      }
    }
    this.setState({
      bookingDisplay,
      totalPrice,
      totalServiceFee,
      totalWeeklyDiscount,
      totalAmount
    });
  }

  getNumReservedDates(checkin, checkout) {
    let numReservedDates = null;
    if(checkin && checkout) {
      checkin = moment(checkin);
      checkout = moment(checkout);

      numReservedDates = checkout.diff(checkin, 'days');
    }
    this.setState({
      numReservedDates
    }, this.populateBookingDisplay);
  }

  getTotalGuests(numAdults, numChildren) {
    return Number(numAdults) + Number(numChildren);
  }

  componentDidMount() {
    this.getPropertyInfo();
  }

  render() {
    return(
      <div className="container">
        <div className="propertyContainer">
          <PropertyDetail pricePerNight={this.state.propertyInfo.pNightly_price}
                          starRating={this.state.propertyInfo.pRating}
                          numReviews={this.state.propertyInfo.pReviews}/>
        </div>
        <div className="calendarContainer">
          {this.state.propertyInfo.pRequired_Week_Booking_Days
            ? <Calendar requiredBookingDays={this.state.propertyInfo.pRequired_Week_Booking_Days}
                        getNumReservedDates={this.getNumReservedDates}
                        propertyID={this.state.propertyID}/>
            : <CalendarLoading/>}
          
        </div> 
        <div className="guestsContainer">
          {this.state.propertyInfo.pMax_guests 
            ? <Guests pMax_guests={this.state.propertyInfo.pMax_guests}
            getTotalGuests={this.getTotalGuests}/>
            : <GuestsLoading/>}
        </div>
        <div className="bookingInformation">
            {this.state.bookingDisplay.map((bookingDetail,key) => <BookingDetail bookingDetail={bookingDetail} key={key}/>)} 
          <div className="bookingTotal">
            { this.state.bookingDisplay.length > 0 ? <span className="bookingTotalKey">Total</span> : null }
            { this.state.bookingDisplay.length > 0 ? <span className="bookingTotalValue">{'$' + Math.trunc(this.state.totalAmount)}</span> : null }                                       
          </div>
        </div>
        <div className="reserveContainer">
          {this.state.numReservedDates
          ? <Reserve numReservedDates={this.state.numReservedDates}/>
          : <ReserveLoading/>}
          
        </div>
        <div className="footer">
          You won't be charged yet
        </div>
      </div>
    );
  }
}

export default App;