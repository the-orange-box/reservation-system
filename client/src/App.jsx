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
    this.handleClick = this.handleClick.bind(this);
    this.closeGuestsDropdown = this.closeGuestsDropdown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
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
        <div className="guestsContainer" ref={node => this.node = node}>
          <Guests toggleGuestsDropdown={this.toggleGuestsDropdown} 
                  guestVisibility={this.state.guestDropdownVisibility} 
                  closeGuestsDropdown={this.closeGuestsDropdown}/>
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
    });
  }

  closeGuestsDropdown() {
    this.setState({
      guestDropdownVisibility: "hidden"
    });
  }

  //fix later so that will unselect when clicking on guestsHeader as well
  handleClick(e) {
    if (this.state.guestDropdownVisibility === "visible" && !this.node.contains(e.target)) {
      this.toggleGuestsDropdown();
    }
  }
}

export default App;