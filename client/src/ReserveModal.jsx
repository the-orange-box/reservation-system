import React from 'react';

const ReserveModal = ({visibility, toggleReserveModal, checkinCheckout, postBookedDates}) => (
  <div className="reserveModal" style={{visibility: visibility}}>
    <div className="reserveModalDetails">
      <span className="reserveModalClose" onClick={toggleReserveModal}>&times;</span>
      <div id="signUp">
        Sign up to<button id="bookReservation" onClick={() => postBookedDates(checkinCheckout[0], checkinCheckout[1])
        }>book</button>
      </div>
      <div id="moments">
        You're moments away from booking your stay
      </div>
      <div className="reserveButtonContainers">
        <button className="ContinueSignupButtons" id="facebookContinue">
          Continue with Facebook
        </button>
        <br></br>
        <button className="ContinueSignupButtons" id="googleContinue">
          Continue with Google
        </button>
      </div>
      <div id="reserveModalDivider">
        <svg className="calendarArrow" width="255px" height="35px">
          <line x1="5" x2="225" y1="17.5" y2="17.5" stroke="rgb(228, 228, 228)" strokeWidth="1" strokeLinecap="butt"/>
        </svg>
        <span>or</span>
        <svg className="calendarArrow" width="255px" height="35px">
          <line x1="20" x2="240" y1="17.5" y2="17.5" stroke="rgb(228, 228, 228)" strokeWidth="1" strokeLinecap="butt"/>
        </svg>
      </div>
      <div className="reserveButtonContainers" id="signupContainer">
        <button className="ContinueSignupButtons" id="emailSignup">
          Sign up with Email
        </button>
      </div>

      <div>
        <div id="reserveModalFooter">
          Already have an Airbnb account?
          <button id="reserveModalLogin">
          Log in
        </button>
        </div>
      </div>
    </div>
  </div>
)

export default ReserveModal;