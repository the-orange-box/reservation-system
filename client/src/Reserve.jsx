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
      console.log(' YAYYY ' + test.format("MMMM"));
      test.add(-2, "months")
      console.log(' YAYYY ' + test.format("MMMM"));
    }
    }>Reserve</button>
  </div>
)

export default Reserve;
