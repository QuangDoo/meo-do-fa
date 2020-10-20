import React, { forwardRef } from 'react'
import Button from '../Button'
import Checkbox from '../Form/Checkbox'
import Input from '../Form/Input'

type Props = {}

const AccountInformation = (props: Props, formRef) => {
  return (
    <>
      <Input
        name="name"
        ref={formRef}
        containerClass="mb-4"
        iconClass="icomoon icon-user"
        placeholder="Nhập tên (bắt buộc)"
        required
      />

      <Input
        name="phone"
        type="number"
        ref={formRef}
        containerClass="mb-4"
        iconClass="icomoon icon-phone"
        placeholder="Nhập số điện thoại (bắt buộc)"
        required
      />

      <Input
        name="email"
        ref={formRef}
        containerClass="mb-4"
        iconClass="icomoon icon-mail"
        placeholder="Nhập email"
      />

      <Input
        name="password"
        ref={formRef}
        containerClass="mb-4"
        iconClass="icomoon icon-lock"
        placeholder="Nhập mật khẩu (bắt buộc)"
        type="password"
        required
      />

      <Input
        name="referPhone"
        ref={formRef}
        containerClass="mb-4"
        iconClass="fas fa-user-friends"
        placeholder="Số điện thoại người giới thiệu hoặc mã nhóm"
        type="number"
      />

      <Checkbox
        required
        label={
          <>
            Tôi đã đọc và đồng ý với{' '}
            <a href="/terms-and-condition" target="_blank">
              Điều khoản sử dụng
            </a>
            <span className="text-danger"> *</span>
          </>
        }
      />

      <div className="mb-4">
        Nếu bạn đã có tài khoản, vui lòng{' '}
        <a className="text-secondary" data-modal="true" href="/authentications/login">
          Đăng nhập
        </a>
      </div>

      <Button type="submit" variant="gradient" block>
        Tạo tài khoản
      </Button>
    </>
  )
}

export default forwardRef(AccountInformation)
