import React from 'react';
import PropertyDetail from './PropertyDetail';
import Calendar from './Calendar';
import Guests from './Guests';
import Reserve from './Reserve';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guestDropdownVisibility: "hidden"
    };

    this.toggleGuestsDropdown = this.toggleGuestsDropdown.bind(this);
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
          <Guests toggleGuestsDropdown={this.toggleGuestsDropdown} guestVisibility={this.state.guestDropdownVisibility}/>
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

  toggleGuestsDropdown() {
    let guestDropdownVisibility;
    if(this.state.guestDropdownVisibility === "hidden") {
      guestDropdownVisibility = "visible";
    } else {
      guestDropdownVisibility = "hidden";
    }
    this.setState({
      guestDropdownVisibility
    })
  }
}

export default App;