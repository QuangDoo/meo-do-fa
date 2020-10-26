import React, { forwardRef } from 'react'
import InputCard from './InputCard'

const CustomerNotes = (props, register) => {
  return (
    <InputCard
      title="Ghi chú khác"
      titleChildren={
        <small className="text-muted">
          <label htmlFor="checkout_customer_notes">
            Trường hợp không tìm được thuốc mong muốn, Quý khách vui lòng điền yêu cầu bên dưới.
            Chúng tôi sẽ liên hệ mua thuốc và báo giá sớm nhất có thể.
          </label>
        </small>
      }
    >
      <textarea
        ref={register}
        rows={4}
        placeholder="Ghi chú của khách hàng"
        className="form-control"
        name="customerNotes"
        id="checkout_customer_notes"
      ></textarea>
    </InputCard>
  )
}

export default forwardRef(CustomerNotes)
