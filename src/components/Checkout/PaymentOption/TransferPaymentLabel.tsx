import Link from 'next/link'
import React from 'react'

const TransferPaymentLabel = () => {
  return (
    <>
      Chuyển khoản (
      <Link href="#">
        <a>Hướng dẫn chuyển khoản</a>
      </Link>
      )
    </>
  )
}

export default TransferPaymentLabel
