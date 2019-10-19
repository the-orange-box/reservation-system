import React from 'react';

const BookingDetail = ({bookingDetail}) => (
  <div className = "bookingDetail">
    <span className="bookingDetailKey">{bookingDetail.key}</span>
    <span className="bookingDetailValue">{bookingDetail.value}</span>
  </div>
)

export default BookingDetail;