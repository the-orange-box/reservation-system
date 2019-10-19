import React from 'react';
import GuestsDropdown from './GuestsDropdown';

//guest drop down
class Guests extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      guestDropdownVisibility: "hidden",
      disableAdultPlus: false,
      disableAdultMinus: true,
      disableChildrenPlus: false,
      disableChildrenMinus: true,
      disableInfantPlus: false,
      disableInfantMinus: true,
      openGuestCarot: "none",
      closeGuestCarot: "",
      numAdults: 1,
      numChildren: 0,
      numInfants: 0,
    };

    this.getTotalGuests = this.props.getTotalGuests;
    this.pMax_guests = this.props.pMax_guests;
    this.toggleGuestsDropdown = this.toggleGuestsDropdown.bind(this);
    this.closeGuestsDropdown = this.closeGuestsDropdown.bind(this);
    this.incrementGuestsCounter = this.incrementGuestsCounter.bind(this);
    this.decrementGuestsCounter = this.decrementGuestsCounter.bind(this);
    this.displayMaxGuests = this.displayMaxGuests.bind(this);
    this.displayGuests = this.displayGuests.bind(this);
    this.updateButtonStatus = this.updateButtonStatus.bind(this);
    this.updateAdultChildrenButtonStatus = this.updateAdultChildrenButtonStatus.bind(this);
    this.toggleGuestsCarot = this.toggleGuestsCarot.bind(this);
    this.updateInfantButtonStatus = this.updateInfantButtonStatus.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
  
  incrementGuestsCounter(type) {
    if(this.state.numAdults + this.state.numChildren < this.pMax_guests) {
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
  
  displayMaxGuests() {
    let result = ''
    if(this.pMax_guests === 1) {
      result += '1 guest ';
    } else {
      result += this.pMax_guests + ' guests ';
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
  
  updateButtonStatus() {
    this.updateAdultChildrenButtonStatus();
    this.updateInfantButtonStatus();
    this.getTotalGuests(this.state.numAdults, this.state.numChildren);
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
  
    if (this.state.numAdults + this.state.numChildren === this.pMax_guests && !this.state.disableAdultPlus && !this.state.disableChildrenPlus) {
      this.setState({
        disableAdultPlus: true,
        disableChildrenPlus: true
      });
    } else if (this.state.numAdults + this.state.numChildren < this.pMax_guests && this.state.disableAdultPlus && this.state.disableChildrenPlus){
      this.setState({
        disableAdultPlus: false,
        disableChildrenPlus: false
      });
    }
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

  //fix later so that will unselect when clicking on guestsHeader as well
  handleClick(e) {
    if (this.state.guestDropdownVisibility === "visible" && !this.node.contains(e.target)) {
      this.toggleGuestsDropdown();
    }
  }
  
  componentDidMount() {
    document.addEventListener('click', this.handleClick, false);
  }
  
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  render() {
    return(
      <div className="guests" ref={node => this.node = node}>
        <div className="guestsHeader">
          Guests
        </div>
        <div className="guestsInputContainer">
          <button className="guestsInput" id="guestsInput" onClick={this.toggleGuestsDropdown}>
            <div id="guestButtonText">
              {this.displayGuests()}
            </div>
            <svg className="downwardPoint" width="40px" height="35px" display={this.state.closeGuestCarot}>
              <line x1="10" x2="18" y1="14.5" y2="23" stroke="black" strokeWidth="1.5" strokeLinecap="butt"/>
              <line x1="26" x2="18" y1="14.5" y2="23" stroke="black" strokeWidth="1.5" strokeLinecap="butt"/>
            </svg>
            <svg className="upwardPoint" width="40px" height="35px" display={this.state.openGuestCarot}>
              <line x1="10" x2="18" y1="23" y2="14.5" stroke="black" strokeWidth="1.5" strokeLinecap="butt"/>
              <line x1="26" x2="18" y1="23" y2="14.5" stroke="black" strokeWidth="1.5" strokeLinecap="butt"/>
            </svg>
          </button>
        </div>
        <GuestsDropdown guestVisibility={this.state.guestDropdownVisibility} 
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
                        displayMaxGuests={this.displayMaxGuests}/>
      </div>
    );
  }
} 

export default Guests;