import React from 'react';
import GuestsDropdown from './GuestsDropdown';

//guest drop down
const Guests = ({toggleGuestsDropdown, guestVisibility}) => (
  <div className="guests">
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
)

export default Guests;