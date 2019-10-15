import React from 'react';
import GuestsDropdown from './GuestsDropdown';

//guest drop down
class Guests extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  render() {
    let toggleGuestsDropdown = this.props.toggleGuestsDropdown;
    let guestVisibility = this.props.guestVisibility;

    return (
      <div className="guests" ref={node => this.node = node}>
        <div className="guestsHeader">
          Guests
        </div>
        <div className="guestsInputContainer">
          <button className="guestsInput" id="guestsInput" onClick={toggleGuestsDropdown}>
            <div id="guestButtonText">
              1 guest
            </div>
            <svg className="downwardPoint" width="40px" height="35px">
              <line x1="10" x2="18" y1="14.5" y2="23" stroke="black" strokeWidth="1.5" strokeLinecap="butt"/>
              <line x1="26" x2="18" y1="14.5" y2="23" stroke="black" strokeWidth="1.5" strokeLinecap="butt"/>
            </svg>
          </button>
        </div>
        <GuestsDropdown guestVisibility={guestVisibility} toggleGuestsDropdown={toggleGuestsDropdown}/>
      </div>
    );
  }

  //fix later so that will unselect when clicking on guestsHeader as well
  handleClick(e) {
    if (this.props.guestVisibility === "visible" && !this.node.contains(e.target)) {
      this.props.toggleGuestsDropdown();
    }
  }
} 

export default Guests;