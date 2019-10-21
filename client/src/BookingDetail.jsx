import React from 'react';
import styles from '../../public/styles/bookingdetail.module.css';

const BookingDetail = ({bookingDetail}) => (
  <div className ={styles.bookingDetail} id={styles[bookingDetail.id]}>
    <span className={styles.bookingDetailKey}>{bookingDetail.key}</span>
    <span className={styles.bookingDetailValue}>{bookingDetail.value}</span>
  </div>
)

export default BookingDetail;