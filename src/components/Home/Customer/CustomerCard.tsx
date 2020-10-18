import React, { FC } from 'react'

type CustomerCardProps = {
  customerName: string
  customerLocation: string
  customerComment: string
}

const CustomerCard: FC<CustomerCardProps> = (props) => {
  return (
    <div className="testimonial d-flex mb-3">
      <img
        alt="Anh Trường"
        className="img-fluid lozad testimonial__avatar"
        src="assets/images/customer1.jpg"
      />
      <div className="testimonial__content px-3">
        <div className="testimonial__customer">{props.customerName}</div>
        <div className="testimonial__title">{props.customerLocation}</div>
        <div className="testimonial__comment quote">{props.customerComment}</div>
      </div>
    </div>
  )
}

export default CustomerCard
