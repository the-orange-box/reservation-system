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
        <div>
          <PropertyDetail/>
        </div>
        <div>
          <Calendar/>
        </div> 
        <div>
          <Guests/>
        </div>
        <div className="reserve">
          <Reserve/>
        </div>
        You won't be charged yet
      </div>
    );
  }
}

export default App;