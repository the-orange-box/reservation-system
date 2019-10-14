import React from 'react';

//includes daily rate and star rating link
const PropertyDetail = () => (
  <div className="properties">
    <div className="pricePerNight">
      <span id="price">
        $150 
      </span>
      <span id="priceText">
        per night
      </span>

    </div>
    <button className="review">
      <svg className="star" width="10px" height="10px">
        <polygon points ="5,0.5 2,9.9 9.5,3.9 0.5,3.9 8,9.9" fill="teal" />
      </svg>
      4.14 
      <span id="totalReviews">
        (7 reviews)
      </span>
    </button>
  </div>
)

export default PropertyDetail;
