import React from 'react';

const GuestsLoading = () => (
  <div className="guests">
    <div className="guestsHeader">
      Guests
    </div>
    <div className="guestsInputContainer">
      <button className="guestsInput" id="guestsInput">
        <div id="guestButtonText">
          1 guest
        </div>
        <svg className="downwardPoint" width="40px" height="35px" display="">
          <line x1="10" x2="18" y1="14.5" y2="23" stroke="black" strokeWidth="1.5" strokeLinecap="butt"/>
          <line x1="26" x2="18" y1="14.5" y2="23" stroke="black" strokeWidth="1.5" strokeLinecap="butt"/>
        </svg>
      </button>
    </div>
  </div>
)

export default GuestsLoading;