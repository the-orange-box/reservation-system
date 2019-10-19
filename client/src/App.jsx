import React from 'react';
import PropertyDetail from './PropertyDetail';
import Calendar from './Calendar';
import Guests from './Guests';
import Reserve from './Reserve';
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
        pBulkDiscount: 0.95,
        pRequired_Week_Booking_Days: 3, 
        pRating: 3.40, 
        pReviews: 698 
      },
      numReservedDates: null,
      totalGuests: 1,
    };

    this.getNumReservedDates = this.getNumReservedDates.bind(this);
    this.getTotalGuests = this.getTotalGuests.bind(this);
  }

  getNumReservedDates(checkin, checkout) {
    if(checkin && checkout) {
      checkin = moment(checkin);
      checkout = moment(checkout);
      return checkout.diff(checkin, 'days');
    }
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
