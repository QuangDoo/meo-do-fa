import Link from 'next/link'
import React, { forwardRef } from 'react'
import Checkbox from '../../Checkbox'
import CheckoutWarning from './CheckoutWarning'

const Agreement = (props, register) => {
  return (
    <Checkbox
      ref={register}
      name="agreement"
      label={
        <>
          Tôi đồng ý với{' '}
          <Link href="#">
            <a>Điều khoản sử dụng</a>
          </Link>
        </>
      }
    >
      <CheckoutWarning />
    </Checkbox>
  )
}

export default forwardRef(Agreement)
