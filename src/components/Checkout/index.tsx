import React from 'react'
import { useForm } from 'react-hook-form'
import Agreement from './Agreement'
import DeliveryInfo from './DeliveryInfo'

const CheckoutPage = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
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

            <div className="mb-4">{/* Form of delivery */}</div>

            <div className="mb-4">{/* Form of payment */}</div>

            <div className="mb-4">{/* Customer notes */}</div>

            <div className="form-group">
              <Agreement
                name="agreement"
                ref={register({
                  required: 'Xin đồng ý với Điều khoản sử dụng',
                })}
              />
            </div>
          </div>

          <div className="col-md-4 mb-3">{/* Sticky sidebar */}</div>
        </div>
      </div>
    </form>
  )
}

export default CheckoutPage
