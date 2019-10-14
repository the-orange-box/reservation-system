import React from 'react';

//guest drop down
const Guests = () => (
  <div className="guests">
    <div className="guestsHeader">
      Guests
    </div>
    <div className="guestsInputContainer">
      <button className="guestsInput" id="guestsInput">
        <div id="guestButtonText">
          1 guest
        </div>
        <svg className="downwardPoint" width="240px" height="35px">
          {/* <line x1="31" x2="24" y1="17.5" y2="10" stroke="black" stroke-width="1.5" stroke-linecap="butt"/>
          <line x1="31" x2="24" y1="17.5" y2="25" stroke="black" stroke-width="1.5" stroke-linecap="butt"/> */}
          <line x1="210" x2="218" y1="14.5" y2="23" stroke="black" stroke-width="1.5" stroke-linecap="butt"/>
          <line x1="226" x2="218" y1="14.5" y2="23" stroke="black" stroke-width="1.5" stroke-linecap="butt"/>
        </svg>
      </button>
    </div>
  </div>
)

export default Guests;