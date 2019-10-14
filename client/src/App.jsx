import React from 'react';
import PropertyDetail from './PropertyDetail';
import Calendar from './Calendar';
import Guests from './Guests';
import Reserve from './Reserve';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="container">
        <div className="propertyContainer">
          <PropertyDetail/>
        </div>
        <div className="calendarContainer">
          <Calendar/>
        </div> 
        <div className="guestsContainer">
          <Guests/>
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