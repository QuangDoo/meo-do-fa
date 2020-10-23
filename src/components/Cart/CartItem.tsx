import { Button, Icon } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import React, { useState } from 'react'
import { ProductPrice } from '../ProductCard/ProductPrice'
import QuantityInput from '../ProductCard/QuantityInput'

import RemoveModal from './Modal'

function CartItem(props) {
  const [open, setOpen] = useState(false)
  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  console.log('props :>> ', props)
  return (
    <div
      className="cart-item"
      data-price={props.productName}
      data-product-id={props.price}
      data-qty={props.quantity}
      data-target="cart.item"
    >
      <div className="row align-items-center">
        <div className="col-7 d-flex align-items-center pl-4">
          <div
            className="cart-item__important-btn inactive"
            data-action="click->cart#updateImportantButton"
            data-item-id={3206540}
          >
            <i className="fas fa-star" />
          </div>
          <div
            className="cart-item__image lozad mr-2 loaded"
            data-background-image={props.image}
            style={{
              backgroundImage: `url(${props.image})`,
            }}
            data-loaded="true"
          />
          <div>
            <a
              className="cart-item__name"
              href={'products/' + props.slug}
              title={props.productName}
            >
              {props.productName}
            </a>
            <div className="cart-item__package">
              <small>{props.description}</small>
            </div>
          </div>
        </div>
        <div className="col-5 d-flex justify-content-between align-items-center">
          <div className="w-100">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {' '}
                <ProductPrice price={props.price.toLocaleString('de-DE')} />{' '}
                {props.oldPrice > props.price && (
                  <span className="cart-item__old-price">
                    {props.oldPrice.toLocaleString('de-DE')}
                    <span className="unit">đ</span>
                  </span>
                )}
              </div>
              <div className="cart-item__qty">
                <QuantityInput {...props} quantity={props.quantity} />
              </div>
            </div>
          </div>
          <DeleteIcon className="cart-item__remove" onClick={() => setOpen(true)} />
        </div>
        {props.limit && (
          <div className="col-12">
            <small className="text-danger">
              Số lượng có hạn! Hãy mau thanh toán để được hưởng giá ưu đãi.
            </small>
          </div>
        )}
      </div>
      <RemoveModal open={open} onClose={closeModal} title="Tạo Tài Khoản" {...props} />
      {/* <div className="d-none">
        <div className="cart-item-remove-dialog" id="cart-item-remove-dialog-3206540">
          <div className="container-fluid">
            <div className="mb-3">Bạn có chắc muốn xoá sản phẩm này khỏi giỏ hàng?</div>
            <div className="elevated p-3 d-flex">
              <div className="mr-3">
                <img
                  alt={props.productName}
                  className="lozad img-fluid"
                  data-src={props.image}
                  src="https://assets.thuocsi.vn/assets/loader/spinner-loop-0323eb4af313e2798aa1311ac1a415c5739b445120b4d6f68a9dd22e085f40d5.gif"
                  width={100}
                />
              </div>
              <div className="text-left">
                <div className="cart-item__name mb-2">{props.productName}</div>
                <div className="cart-item__price">
                  {props.price}
                  <span className="unit">đ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default CartItem
