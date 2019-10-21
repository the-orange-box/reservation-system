import React from 'react';
import styles from '../../public/styles/properties.module.css';

//includes daily rate and star rating link
const PropertyDetail = ({pricePerNight, starRating, numReviews}) => (
  <div className={styles.properties}>
    <div className={styles.pricePerNight}>
      <span id={styles.price}>
        ${pricePerNight} 
      </span>
      <span id={styles.priceText}>
        per night
      </span>

    </div>
    <button className={styles.review}>
      <svg className={styles.star} width="10px" height="10px">
        <polygon points ="5,0.5 2,9.9 9.5,3.9 0.5,3.9 8,9.9" fill="teal" />
      </svg>
      {starRating}
      <span id={styles.totalReviews}>
        ({numReviews} reviews)
      </span>
    </button>
  </div>
)

export default PropertyDetail;
