import React from 'react';
import GuestsDropdown from './GuestsDropdown';

//guest drop down
const Guests = ({toggleGuestsDropdown, guestVisibility, closeGuestsDropdown, numAdults, numChildren, displayGuests,
                numInfants, incrementGuestsCounter, decrementGuestsCounter, disableAdultPlus, displayMaxGuests,
                disableAdultMinus, disableChildrenPlus, disableChildrenMinus, disableInfantPlus, disableInfantMinus, 
                openGuestCarot, closeGuestCarot}) => (
  <div className="guests">
    <div className="guestsHeader">
      Guests
    </div>
    <div className="guestsInputContainer">
      <button className="guestsInput" id="guestsInput" onClick={toggleGuestsDropdown}>
        <div id="guestButtonText">
          {displayGuests()}
        </div>
        <svg className="downwardPoint" width="40px" height="35px" display={closeGuestCarot}>
          <line x1="10" x2="18" y1="14.5" y2="23" stroke="black" strokeWidth="1.5" strokeLinecap="butt"/>
          <line x1="26" x2="18" y1="14.5" y2="23" stroke="black" strokeWidth="1.5" strokeLinecap="butt"/>
        </svg>
        <svg className="upwardPoint" width="40px" height="35px" display={openGuestCarot}>
          <line x1="10" x2="18" y1="23" y2="14.5" stroke="black" strokeWidth="1.5" strokeLinecap="butt"/>
          <line x1="26" x2="18" y1="23" y2="14.5" stroke="black" strokeWidth="1.5" strokeLinecap="butt"/>
        </svg>
      </button>
    </div>
    <GuestsDropdown guestVisibility={guestVisibility} 
                    closeGuestsDropdown={closeGuestsDropdown}
                    numAdults={numAdults}
                    numChildren={numChildren}
                    numInfants={numInfants}
                    decrementGuestsCounter={decrementGuestsCounter}
                    incrementGuestsCounter={incrementGuestsCounter}
                    disableAdultPlus={disableAdultPlus}
                    disableAdultMinus={disableAdultMinus}
                    disableChildrenPlus={disableChildrenPlus}
                    disableChildrenMinus={disableChildrenMinus}
                    disableInfantPlus={disableInfantPlus}
                    disableInfantMinus={disableInfantMinus}
                    displayMaxGuests={displayMaxGuests}/>
  </div>
)

export default Guests;