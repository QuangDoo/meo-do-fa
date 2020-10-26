/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useForm } from 'react-hook-form'
import Agreement from './Agreement'
import CustomerNotes from './CustomerNotes'
import DeliveryInfo from './DeliveryInfo'
import DeliveryOption from './DeliveryOption'
import PaymentOption from './PaymentOption'
import StickySidebar from './StickySidebar'

const CheckoutPage = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      deliveryOption: 'standard',
      paymentOption: 'bank_transfer',
      saveInfo: true,
    },
  })

  const onSubmit = (data) => {
    console.log('Checkout data:', data)
  }

  return (
    <form className="checkout__form" onSubmit={handleSubmit(onSubmit)}>
      <div className="checkout container py-5">
        <div className="row">
          <div className="col-12 mb-3">
            <h1 className="h3">Thanh toán</h1>
          </div>

          <div className="col-md-8">
            <div className="mb-4">
              <DeliveryInfo ref={register} />
            </div>

            <div className="mb-4">
              <DeliveryOption ref={register} />
            </div>

            <div className="mb-4">
              <PaymentOption ref={register} />
            </div>

            <div className="mb-4">
              <CustomerNotes ref={register} />
            </div>

            <div className="form-group">
              <Agreement ref={register} />
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <StickySidebar ref={register} />
          </div>
        </div>
      </div>
    </form>
  )
}

export default CheckoutPage
