import React from 'react';
import PropertyDetail from './PropertyDetail';
import Calendar from './Calendar';
import Guests from './Guests';
import Reserve from './Reserve';
import { runInThisContext } from 'vm';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guestDropdownVisibility: "hidden",
      numAdults: 1,
      numChildren: 0,
      numInfants: 0,
      maxGuests: 8, //TODO: update to dynamic from DB
      disableAdultPlus: false,
      disableAdultMinus: true,
      disableChildrenPlus: false,
      disableChildrenMinus: true,
      disableInfantPlus: false,
      disableInfantMinus: true,
      pricePerNight: 130,
      starRating: 4.16,
      numReviews: 10,
      openGuestCarot: "none",
      closeGuestCarot: ""
    };

    this.toggleGuestsDropdown = this.toggleGuestsDropdown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.closeGuestsDropdown = this.closeGuestsDropdown.bind(this);
    this.incrementGuestsCounter = this.incrementGuestsCounter.bind(this);
    this.decrementGuestsCounter = this.decrementGuestsCounter.bind(this);
    this.updateAdultChildrenButtonStatus = this.updateAdultChildrenButtonStatus.bind(this);
    this.updateInfantButtonStatus = this.updateInfantButtonStatus.bind(this);
    this.updateButtonStatus = this.updateButtonStatus.bind(this);
    this.displayMaxGuests = this.displayMaxGuests.bind(this);
    this.displayGuests = this.displayGuests.bind(this);
    this.toggleGuestsCarot = this.toggleGuestsCarot.bind(this);
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
          <PropertyDetail pricePerNight={this.state.pricePerNight}
                          starRating={this.state.starRating}
                          numReviews={this.state.numReviews}/>
        </div>
        <div className="calendarContainer">
          <Calendar/>
        </div> 
        <div className="guestsContainer" ref={node => this.node = node}>
          <Guests toggleGuestsDropdown={this.toggleGuestsDropdown} 
                  guestVisibility={this.state.guestDropdownVisibility} 
                  closeGuestsDropdown={this.closeGuestsDropdown}
                  numAdults={this.state.numAdults}
                  numChildren={this.state.numChildren}
                  numInfants={this.state.numInfants}
                  decrementGuestsCounter={this.decrementGuestsCounter}
                  incrementGuestsCounter={this.incrementGuestsCounter}
                  disableAdultPlus={this.state.disableAdultPlus}
                  disableAdultMinus={this.state.disableAdultMinus}
                  disableChildrenPlus={this.state.disableChildrenPlus}
                  disableChildrenMinus={this.state.disableChildrenMinus}
                  disableInfantPlus={this.state.disableInfantPlus}
                  disableInfantMinus={this.state.disableInfantMinus}
                  displayMaxGuests={this.displayMaxGuests}
                  displayGuests={this.displayGuests}
                  openGuestCarot={this.state.openGuestCarot}
                  closeGuestCarot={this.state.closeGuestCarot}/>
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

  toggleGuestsCarot() {
    if(this.state.guestDropdownVisibility === "hidden") {
      this.setState({
        openGuestCarot: "none",
        closeGuestCarot: ""
      })
    } else {
      this.setState({
        openGuestCarot: "",
        closeGuestCarot: "none"
      })
    }
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
    }, this.toggleGuestsCarot);
  }

  closeGuestsDropdown() {
    this.setState({
      guestDropdownVisibility: "hidden"
    });
  }

  incrementGuestsCounter(type) {
    if(this.state.numAdults + this.state.numChildren < this.state.maxGuests) {
      if(type === "adult") {
        let numAdults = this.state.numAdults + 1;
        this.setState({
          numAdults
        }, this.updateButtonStatus);
      } else if (type === "children") {
        let numChildren = this.state.numChildren + 1;
        this.setState({
          numChildren
        }, this.updateButtonStatus);
      } 
    }   
    if (type === "infant" && this.state.numInfants < 5) {
      let numInfants = this.state.numInfants + 1;
      this.setState({
        numInfants
      }, this.updateButtonStatus);
    }
  }

  decrementGuestsCounter(type) {
      if(type === "adult" && this.state.numAdults > 1) {
        let numAdults = this.state.numAdults - 1;
        this.setState({
          numAdults
        }, this.updateButtonStatus);
      } else if (type === "children" && this.state.numChildren > 0) {
        let numChildren = this.state.numChildren - 1;
        this.setState({
          numChildren
        }, this.updateButtonStatus);
      } else if(type === "infant" && this.state.numInfants > 0) {
        let numInfants = this.state.numInfants - 1;
        this.setState({
          numInfants
        }, this.updateButtonStatus);
      }
  }

  //fix later so that will unselect when clicking on guestsHeader as well
  handleClick(e) {
    if (this.state.guestDropdownVisibility === "visible" && !this.node.contains(e.target)) {
      this.toggleGuestsDropdown();
    }
  }

  updateButtonStatus() {
    this.updateAdultChildrenButtonStatus();
    this.updateInfantButtonStatus();
  }

  displayMaxGuests() {
    let result = ''
    if(this.state.maxGuests === 1) {
      result += '1 guest ';
    } else {
      result += this.state.maxGuests + ' guests ';
    }
    result += 'maximum. Infants don\'t count toward the number of guests.';
    return result;
  }

  displayGuests() {
    let result = ''
    if(this.state.numAdults + this.state.numChildren === 1) {
      result += '1 guest';
    } else {
      result += (this.state.numAdults + this.state.numChildren) + ' guests';
    }

    if(this.state.numInfants === 1) {
      result += ', 1 infant'
    } else if (this.state.numInfants > 1) {
      result += ', ' + this.state.numInfants + ' infants'
    }

    return result;
  }

  updateAdultChildrenButtonStatus() {
    if (this.state.numAdults === 1) {
      this.setState({
        disableAdultMinus: true
      });
    } else {
      this.setState({
        disableAdultMinus: false
      });
    }

    if (this.state.numChildren === 0) {
      this.setState({
        disableChildrenMinus: true
      });
    } else {
      this.setState({
        disableChildrenMinus: false
      });
    }

    if (this.state.numAdults + this.state.numChildren === this.state.maxGuests && !this.state.disableAdultPlus && !this.state.disableChildrenPlus) {
      this.setState({
        disableAdultPlus: true,
        disableChildrenPlus: true
      });
    } else if (this.state.numAdults + this.state.numChildren < this.state.maxGuests && this.state.disableAdultPlus && this.state.disableChildrenPlus){
      this.setState({
        disableAdultPlus: false,
        disableChildrenPlus: false
      });
    }
  }

  updateInfantButtonStatus() {
    if (this.state.numInfants === 0) {
      this.setState({
        disableInfantMinus: true
      });
    } else {
      this.setState({
        disableInfantMinus: false
      });
    }

    if (this.state.numInfants === 5 && !this.state.disableInfantPlus) {
      this.setState({
        disableInfantPlus: true
      });
    } else if (this.state.numInfants < 5 && this.state.disableInfantPlus) {
      this.setState({
        disableInfantPlus: false
      });
    }
  }
}

export default App;
