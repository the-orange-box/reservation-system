import React from'react';

const GuestsDropdown = ({guestVisibility}) => (
  <div className="guestsDropdown" id="guestsDropdown" style={{visibility: guestVisibility}}>
    <div id="adultGuestDropdown">
      <span className="guestType" id="adultGuest">Adults</span>
      <button className="minusButton" id="adultMinus">-</button>
      <button className="addButton" id="adultAdd">+</button>
    </div>
    <div id="childGuestDropdown">
      <span className="guestType" id="childGuest">Children</span>
      <span className="guestDetails" id="childDetails">Ages 2-12</span>
      <button className="minusButton" id="childMinus">-</button>
      <button className="addButton" id="childAdd">+</button>
    </div>
    <div id="infantGuestDropdown">
      <span className="guestType" id="infantGuest">Infants</span>
      <span className="guestDetails" id="infantDetails">Under 2</span>
      <button className="minusButton" id="infantMinus">-</button>
      <button className="addButton" id="infantAdd">+</button>
    </div>
    <div className="guestsDropdownFooter" id="guestsDropdownFooter">
      XX guests maximum. Infants don't count toward the number of guests.
    </div>
    <div id="closeGuestDropdown">
      <button className="guestsCloseButton" id="guestsCloseButton">Close</button>
    </div>
  </div>
)

export default GuestsDropdown;