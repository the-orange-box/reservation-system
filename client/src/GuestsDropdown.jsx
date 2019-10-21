import React from'react';
import styles from '../../public/styles/guests.module.css';

const GuestsDropdown = ({guestVisibility, closeGuestsDropdown, numAdults, numChildren, numInfants, displayMaxGuests,
                          incrementGuestsCounter, decrementGuestsCounter, disableAdultPlus, disableAdultMinus, 
                          disableChildrenPlus, disableChildrenMinus, disableInfantPlus, disableInfantMinus}) => (
  <div className={styles.guestsDropdown} id={styles.guestsDropdown} style={{visibility: guestVisibility}}>
    <div className={styles.typeOfGuest} id={styles.adultGuestDropdown}>
      <span className={styles.guestType} id={styles.adultGuest}>Adults</span>
      <button className={styles.minusButton} id={styles.adultMinus} disabled={disableAdultMinus} onClick={() => decrementGuestsCounter("adult")}>-</button>
      <span className={styles.guestCounter} id={styles.adultCounter}>{numAdults}</span>
      <button className={styles.addButton} id={styles.adultAdd} disabled={disableAdultPlus} onClick={() => incrementGuestsCounter("adult")}>+</button>
    </div>
    <div className={styles.typeOfGuest} id={styles.childGuestDropdown}>
      <span className={styles.guestType} id={styles.childGuest}>Children</span>
      <span className={styles.guestDetails} id={styles.childDetails}>Ages 2-12</span>
      <button className={styles.minusButton} id={styles.childMinus} disabled={disableChildrenMinus} onClick={() => decrementGuestsCounter("children")}>-</button>
      <span className={styles.guestCounter} id={styles.childCounter}>{numChildren}</span>
      <button className={styles.addButton} id={styles.childAdd} disabled={disableChildrenPlus} onClick={() => incrementGuestsCounter("children")}>+</button>
    </div>
    <div className={styles.typeOfGuest} id={styles.infantGuestDropdown}>
      <span className={styles.guestType} id={styles.infantGuest}>Infants</span>
      <span className={styles.guestDetails} id={styles.infantDetails}>Under 2</span>
      <button className={styles.minusButton} id={styles.infantMinus} disabled={disableInfantMinus} onClick={() => decrementGuestsCounter("infant")}>-</button>
      <span className={styles.guestCounter} id={styles.infantCounter}>{numInfants}</span>
      <button className={styles.addButton} id={styles.infantAdd} disabled={disableInfantPlus} onClick={() => incrementGuestsCounter("infant")}>+</button>
    </div>
    <div className={styles.guestsDropdownFooter} id={styles.guestsDropdownFooter}>
      {displayMaxGuests()}
    </div>
    <div id={styles.closeGuestDropdown}>
      <button className={styles.guestsCloseButton} id={styles.guestsCloseButton} onClick={closeGuestsDropdown}>Close</button>
    </div>
  </div>
)

export default GuestsDropdown;