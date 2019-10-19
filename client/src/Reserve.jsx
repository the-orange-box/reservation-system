import React from 'react';
const moment = require('moment');
moment().format();

//reserve button
const Reserve = () => (
  <div className="reserve">
    <button className="reserveButton" id="reserve" onClick={ () => {
      console.log(moment().startOf('month').day() + 
      ' and ' + moment().month("October").year("2019").daysInMonth());
      console.log(moment().format("MMMM"));

      var test = moment();
      test.add(1, "months")
      // console.log(' YAYYY ' + test.format("MMMM"));
      // test.add(-2, "months")
      // console.log(' YAYYY ' + test.format("MMMM"));
      // console.log(moment().month("MMMM"));
      // console.log('this is the moment day ' + moment().day());
      // console.log(typeof moment().format('DD'));
      console.log(moment().month('10').startOf());
      console.log(moment().startOf('month').day());
      var firstDay = moment('2019-12-20 00:032:00');
      var secondDay = moment('2020-05-01 00:00:00').startOf('month');
      console.log('diff between first and second day ' + secondDay.diff(firstDay, 'days'));
    }
    }>Reserve</button>
  </div>
)

export default Reserve;
