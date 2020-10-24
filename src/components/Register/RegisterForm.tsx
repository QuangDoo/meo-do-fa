/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { emailRegex } from '../../assets/regex/email'
import { viPhoneNumberRegex } from '../../assets/regex/viPhoneNumber'
import { useModalControlDispatch } from '../../contexts/ModalControl'
import Button from '../Button'
import Checkbox from '../Checkbox'
import Input from '../Input'
import ChooseUserType from './ChooseUserType'
import WelcomeAccount from './WelcomeAccount'

export type UserType = 'pharmacy' | 'clinic' | 'drugstore'

// Map from UserType to text
// (replace with translation later like t('pharmacy') or something)
export const userTypeMap: Record<UserType, string> = {
  pharmacy: 'Nhà thuốc',
  clinic: 'Phòng khám',
  drugstore: 'Quầy thuốc',
}

// Form input fields
type Inputs = {
  userType: string
  name: string
  email: string
  password: string
  phone: number
  referPhone: number
  acceptTerms: boolean
}

const ErrorToast = styled.div`
  white-space: pre-line;
`

// Initial value for userType
const initialUserType = ''

const RegisterForm = () => {
  const { register, handleSubmit, setValue, watch, errors } = useForm<Inputs>()

  const modalControlDispatch = useModalControlDispatch()

  const openLoginModal = () => modalControlDispatch({ type: 'OPEN_LOGIN_MODAL' })

  // Watch userType value, with initial state as ''
  // This component will re-render when userType changes
  const watchUserType = watch('userType', initialUserType)

  // Show error toasts when error changes
  useEffect(() => {
    const errorNames = Object.keys(errors)

    if (!errorNames.length) return

    const errorMessage = errorNames.map((name) => errors[name].message).join('\n')

    toast.error(<ErrorToast>{errorMessage}</ErrorToast>)
  }, [errors])

  // On submit button click
  const onSubmit = (data: Inputs) => {
    console.log('Register Submit data:', data)

    // Integrate with backend
  }

  // Set user type on UserTypeCard click (in ChooseUserType)
  const setUserType = (value: UserType) => {
    setValue('userType', value)
  }

  // Reset userType to initial state
  const resetUserType = () => setValue('userType', initialUserType)

  return (
    <form className="new_account" onSubmit={handleSubmit(onSubmit)}>
      {/**
       * Hidden input for userType
       * Value changes when clicking a UserTypeCard
       */}
      <input name="userType" hidden type="text" ref={register} />

      {/* Hide ChooseUserType if userType is in initial state */}
      <div hidden={watchUserType !== initialUserType} className="business-group">
        <ChooseUserType setUserType={setUserType} />
      </div>

      {/* Hide AccountInformation form if userType is chosen (NOT in initial state) */}
      <div hidden={watchUserType === initialUserType} className="account-information">
        <WelcomeAccount userTypeName={userTypeMap[watchUserType]} onEditClick={resetUserType} />

        <Input
          name="name"
          ref={register({
            required: 'Xin nhập tên.',
          })}
          containerClass="mb-4"
          iconClass="icomoon icon-user"
          placeholder="Nhập tên (bắt buộc)"
        />

        <Input
          name="phone"
          type="number"
          ref={register({
            pattern: {
              value: viPhoneNumberRegex,
              message: 'Xin nhập số điện thoại hợp lệ.',
            },
            required: 'Xin nhập số điện thoại.',
          })}
          containerClass="mb-4"
          iconClass="icomoon icon-phone"
          placeholder="Nhập số điện thoại (bắt buộc)"
        />

        <Input
          name="email"
          ref={register({
            pattern: {
              value: emailRegex,
              message: 'Xin nhập email hợp lệ.',
            },
          })}
          containerClass="mb-4"
          iconClass="icomoon icon-mail"
          placeholder="Nhập email"
        />

        <Input
          name="password"
          ref={register({
            required: 'Xin nhập mật khẩu.',
            minLength: {
              value: 6,
              message: 'Xin nhập mật khẩu tối thiểu 6 kí tự.',
            },
          })}
          containerClass="mb-4"
          iconClass="icomoon icon-lock"
          placeholder="Nhập mật khẩu (bắt buộc)"
          type="password"
        />

        <Input
          name="referPhone"
          ref={register({
            pattern: {
              value: viPhoneNumberRegex,
              message: 'Xin nhập số điện thoại giới thiệu hợp lệ.',
            },
            validate: () => true, // Check with backend if referer phone number exists
          })}
          containerClass="mb-4"
          iconClass="fas fa-user-friends"
          placeholder="Số điện thoại người giới thiệu hoặc mã nhóm"
          type="number"
        />

        <Checkbox
          ref={register({
            required: 'Xin đồng ý với Điều khoản sử dụng.',
          })}
          name="acceptTerms"
          label={
            <>
              Tôi đã đọc và đồng ý với <a>Điều khoản sử dụng</a>
              <span className="text-danger"> *</span>
            </>
          }
        />

        <div className="mb-4">
          Nếu bạn đã có tài khoản, vui lòng{' '}
          <a
            className="text-secondary"
            data-modal="true"
            onClick={openLoginModal}
            onKeyPress={openLoginModal}
            role="button"
            tabIndex={0}
          >
            Đăng nhập
          </a>
        </div>

        <Button type="submit" variant="gradient" block>
          Tạo tài khoản
        </Button>
      </div>
    </form>
  )
}

export default RegisterForm
