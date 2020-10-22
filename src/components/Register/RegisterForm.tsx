import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import ChooseUserType from './ChooseUserType'
import { UserType, userTypeMap } from './UserTypeCard'

type RegisterFormProps = {}

type FormInputs = {
  userType: UserType
}

const RegisterForm: FC<RegisterFormProps> = (props) => {
  const { register, getValues, handleSubmit, setValue } = useForm<FormInputs>()

  const onSubmit = (data) => console.log(data)

  const onEditClick = () => {
    setValue('userType', undefined)
  }

  // Set user type on UserTypeCard click (in ChooseUserType)
  const setUserType = (value: UserType) => {
    setValue('userType', value)
  }

  console.log(getValues('userType'))

  return (
    <form className="new_account" onSubmit={handleSubmit(onSubmit)}>
      {/* Show ChooseUserype if userType is not chosen (undefined) */}
      {!getValues('userType') && <ChooseUserType ref={register} setUserType={setUserType} />}

      {/* Show Input fields if userType is chosen */}
      {getValues('userType') && (
        <div className="account-information">
          <div className="welcome-account mb-3">
            Xin chào
            <span className="welcome-account__business">
              {' '}
              {userTypeMap[getValues('userType')]}!
            </span>
            {/* <u onClick={onEditClick} className="font-weight-bold text-primary ml-2">
              Chỉnh sửa
            </u> */}
          </div>
        </div>
      )}
    </form>
  )
}

export default RegisterForm

{
  /* Tôi đã đọc và đồng ý với{' '}
        <a href="/terms-and-condition" target="_blank">
        Điều khoản sử dụng
        </a>
      <span className="text-danger"> *</span> */
}
