import React, { forwardRef } from 'react'
import Input from '../Form/Input'

type Props = {}

const AccountInformation = (props: Props, formRef) => {
  return (
    <>
      <Input
        name="name"
        ref={formRef}
        containerClass="mb-4"
        icon="user"
        placeholder="Nhập tên (bắt buộc)"
      />

      <Input
        name="phone"
        ref={formRef}
        containerClass="mb-4"
        icon="phone"
        placeholder="Nhập số điện thoại (bắt buộc)"
      />

      <Input
        name="email"
        ref={formRef}
        containerClass="mb-4"
        icon="mail"
        placeholder="Nhập email"
      />

      <Input
        name="password"
        ref={formRef}
        containerClass="mb-4"
        icon="lock"
        placeholder="Nhập mật khẩu (bắt buộc)"
        type="password"
      />
    </>
  )
}

export default forwardRef(AccountInformation)
