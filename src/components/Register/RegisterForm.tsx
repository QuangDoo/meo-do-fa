import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { emailRegex } from '../../assets/regex/email'
import { viPhoneNumberRegex } from '../../assets/regex/viPhoneNumber'
import Button from '../Button'
import Checkbox from '../Form/Checkbox'
import Input from '../Form/Input'
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
}

// Initial userType state
const initialUserType = ''

// RegisterForm Props
type Props = {}

const RegisterForm = (props: Props) => {
  const { register, handleSubmit, setValue, watch, errors } = useForm<Inputs>()

  // Watch userType value, with initial state
  // This component re-renders when userType changes
  const watchUserType = watch('userType', initialUserType)

  // Show error toasts when error changes
  useEffect(() => {
    const errorNames = Object.keys(errors)

    if (!errorNames.length) return

    const errorMessage = errorNames.map((name) => errors[name].message).join('\n')

    toast.error(<div style={{ whiteSpace: 'pre-line' }}>{errorMessage}</div>)
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
          ref={register}
          containerClass="mb-4"
          iconClass="icomoon icon-user"
          placeholder="Nhập tên (bắt buộc)"
          required
        />

        <Input
          name="phone"
          type="number"
          ref={register({
            pattern: {
              value: viPhoneNumberRegex,
              message: 'Xin nhập số điện thoại hợp lệ.',
            },
          })}
          containerClass="mb-4"
          iconClass="icomoon icon-phone"
          placeholder="Nhập số điện thoại (bắt buộc)"
          required
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
            minLength: {
              value: 6,
              message: 'Xin nhập mật khẩu tối thiểu 6 kí tự.',
            },
          })}
          containerClass="mb-4"
          iconClass="icomoon icon-lock"
          placeholder="Nhập mật khẩu (bắt buộc)"
          type="password"
          required
        />

        <Input
          name="referPhone"
          ref={register({
            validate: () => true, // Check with backend if referer phone number exists
          })}
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
      </div>
    </form>
  )
}

export default RegisterForm
