import React from 'react';
import PropertyDetail from './PropertyDetail';
import Calendar from './Calendar';
import Guests from './Guests';
import Reserve from './Reserve';
import BookingDetail from './BookingDetail';
const moment = require('moment');
moment().format();

//add REPORT THIS LISTING
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookedDates: [ moment('2019-10-20 00:00:00'), moment('2019-10-30 00:00:00'), moment('2019-11-14 00:00:00'), 
                     moment('2019-11-18 00:00:00'), moment('2019-11-27 00:00:00'), moment('2019-11-16 00:00:00'), 
                     moment('2019-11-03 00:00:00'), moment('2019-11-23 00:00:00'), moment('2019-12-19 00:00:00'), 
                     moment('2019-12-21 00:00:00'), moment('2019-12-06 00:00:00'), moment('2019-12-18 00:00:00'), 
                     moment('2019-12-03 00:00:00'), moment('2019-12-26 00:00:00'), moment('2019-12-13 00:00:00'), 
                     moment('2019-12-01 00:00:00'), moment('2019-12-08 00:00:00'), moment('2020-01-04 00:00:00'), 
                     moment('2020-01-27 00:00:00'), moment('2020-01-09 00:00:00'), moment('2020-01-07 00:00:00'), 
                     moment('2020-01-23 00:00:00'), moment('2020-01-01 00:00:00'), moment('2020-01-03 00:00:00'), 
                     moment('2020-01-22 00:00:00'), moment('2020-05-22 00:00:00') ],
      propertyInfo: {
        pMax_guests: 9, 
        pNightly_price: 290.00, 
        pCleaning_fee: 38.00,
        pService_fee: 0.13,
        pTaxes_fees: 3.00,
        pBulkDiscount: 0.05,
        pRequired_Week_Booking_Days: 3, 
        pRating: 3.40, 
        pReviews: 698 
      },
      bookingDisplay: [],
      numReservedDates: null,
      totalGuests: 1,
      totalPrice: null,
      totalServiceFee: null,
      totalWeeklyDiscount: null,
      totalAmount: null,
    };

    this.getNumReservedDates = this.getNumReservedDates.bind(this);
    this.getTotalGuests = this.getTotalGuests.bind(this);
    this.populateBookingDisplay = this.populateBookingDisplay.bind(this);
  }

  populateBookingDisplay() {

                            
                                    
    //Nightly_price': `$${this.state.propertyInfo.pNightly_price} x ${this.state.numReservedDates} nights
    let totalPrice = null;
    let totalServiceFee = null;
    let totalWeeklyDiscount = null;
    let totalAmount = null;

    let bookingDisplay = [];
    if(this.state.numReservedDates) {
      totalPrice = this.state.propertyInfo.pNightly_price * this.state.numReservedDates;
      totalServiceFee = this.state.propertyInfo.pService_fee * totalPrice;
      totalWeeklyDiscount = -(totalPrice * this.state.propertyInfo.pBulkDiscount);
      totalAmount = totalPrice + totalServiceFee + totalWeeklyDiscount;

      let possibleBookingDisplays = {
              'pNightly_price': [`$${this.state.propertyInfo.pNightly_price} x ${this.state.numReservedDates} nights`, totalPrice], 
              'pBulkDiscount' : [`${100 - (this.state.propertyInfo.pBulkDiscount * 100)}% weekly price discount`, totalWeeklyDiscount],
              'pCleaning_fee' : ['Cleaning Fee', this.state.propertyInfo.pCleaning_fee], 
              'pService_fee'  : ['Service fee', totalServiceFee], 
              'pTaxes_fees'   : ['Occupancy taxes and fees', this.state.propertyInfo.pTaxes_fees] 
            };

      for (let key in this.state.propertyInfo) {
        if (possibleBookingDisplays.hasOwnProperty(key)) {
          bookingDisplay.push({key: possibleBookingDisplays[key][0], value: '$' + Math.trunc(possibleBookingDisplays[key][1])})
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

  render() {
    return(
      <div className="container">
        <div className="propertyContainer">
          <PropertyDetail pricePerNight={this.state.propertyInfo.pNightly_price}
                          starRating={this.state.propertyInfo.pRating}
                          numReviews={this.state.propertyInfo.pReviews}/>
        </div>
        <div className="calendarContainer">
          <Calendar requiredBookingDays={this.state.propertyInfo.pRequired_Week_Booking_Days}
                    bookedDates={this.state.bookedDates}
                    getNumReservedDates={this.getNumReservedDates}/>
        </div> 
        <div className="guestsContainer">
          <Guests pMax_guests={this.state.propertyInfo.pMax_guests}
                  getTotalGuests={this.getTotalGuests}/>
        </div>
        <div className="bookingInformation">
            {this.state.bookingDisplay.map((bookingDetail,key) => <BookingDetail bookingDetail={bookingDetail} key={key}/>)} 
          <div className="bookingTotal">
            { this.state.bookingDisplay.length > 0 ? <span className="bookingTotalKey">Total</span> : null }
            { this.state.bookingDisplay.length > 0 ? <span className="bookingTotalValue">{'$' + Math.trunc(this.state.totalAmount)}</span> : null }                                       
          </div>
        </div>
        <div className="reserveContainer">
          <Reserve/>
        </div>
        <div className="footer">
          You won't be charged yet
        </div>
      </div>
    );
  }
}

export default App;