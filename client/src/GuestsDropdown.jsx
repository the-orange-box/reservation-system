import React from'react';

const GuestsDropdown = ({guestVisibility, closeGuestsDropdown, numAdults, numChildren, numInfants, 
                          incrementGuestsCounter, decrementGuestsCounter, disableAdultPlus, disableAdultMinus, 
                          disableChildrenPlus, disableChildrenMinus, disableInfantPlus, disableInfantMinus}) => (
  <div className="guestsDropdown" id="guestsDropdown" style={{visibility: guestVisibility}}>
    <div className="typeOfGuest" id="adultGuestDropdown">
      <span className="guestType" id="adultGuest">Adults</span>
      <button className="minusButton" id="adultMinus" disabled={disableAdultMinus} onClick={() => decrementGuestsCounter("adult")}>-</button>
      <span className="guestCounter" id="adultCounter">{numAdults}</span>
      <button className="addButton" id="adultAdd" disabled={disableAdultPlus} onClick={() => incrementGuestsCounter("adult")}>+</button>
    </div>
    <div className="typeOfGuest" id="childGuestDropdown">
      <span className="guestType" id="childGuest">Children</span>
      <span className="guestDetails" id="childDetails">Ages 2-12</span>
      <button className="minusButton" id="childMinus" disabled={disableChildrenMinus} onClick={() => decrementGuestsCounter("children")}>-</button>
      <span className="guestCounter" id="childCounter">{numChildren}</span>
      <button className="addButton" id="childAdd" disabled={disableChildrenPlus} onClick={() => incrementGuestsCounter("children")}>+</button>
    </div>
    <div className="typeOfGuest" id="infantGuestDropdown">
      <span className="guestType" id="infantGuest">Infants</span>
      <span className="guestDetails" id="infantDetails">Under 2</span>
      <button className="minusButton" id="infantMinus" disabled={disableInfantMinus} onClick={() => decrementGuestsCounter("infant")}>-</button>
      <span className="guestCounter" id="infantCounter">{numInfants}</span>
      <button className="addButton" id="infantAdd" disabled={disableInfantPlus} onClick={() => incrementGuestsCounter("infant")}>+</button>
    </div>
    <div className="guestsDropdownFooter" id="guestsDropdownFooter">
      XX guests maximum. Infants don't count toward the number of guests.
    </div>
    <div id="closeGuestDropdown">
      <button className="guestsCloseButton" id="guestsCloseButton" onClick={closeGuestsDropdown}>Close</button>
    </div>
  </div>
)

export default GuestsDropdown;