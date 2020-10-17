import React from 'react'

export const QuantityInput = (props) => (
  <div className="qty js-qty">
    <button className="btn btn-sm qty__button qty__button--minus">
      <i className="fas fa-minus" />
    </button>

    <input
      type="tel"
      name="item_quantity"
      className="form-control px-1 no-spinner text-center qty__input"
      inputMode="numeric"
      min={0}
      max={100000}
      step={1}
      autoComplete="off"
      placeholder="0"
    />

    <button className="btn btn-sm qty__button qty__button--plus">
      <i className="fas fa-plus" />
    </button>

    <div className="qty__status text-center">
      <small className="text-danger qty__status-updating">
        <i className="fas fa-spinner fa-spin mr-1" />
        Đang cập nhật
      </small>
      <small className="text-primary qty__status-updated">
        <i className="fas fa-check-circle mr-1" />
        Đã cập nhật
      </small>
      <small className="text-danger qty__status-error">
        <i className="fas fa-exclamation-circle mr-1" />
        Lỗi cập nhật
      </small>
    </div>
  </div>
)
