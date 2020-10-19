import React, { Dispatch, FC, SetStateAction } from 'react'
import { UserType } from '.'
import { userTypeMap } from './ChooseUserType'

type RegisterFormProps = {
  userType: UserType
  setUserType: Dispatch<SetStateAction<UserType>>
}

const RegisterForm: FC<RegisterFormProps> = (props) => {
  const { setUserType } = props
  return (
    <div className="account-information">
      <div className="welcome-account mb-3">
        Xin chào
        <span className="welcome-account__business"> {userTypeMap[props.userType]}!</span>
        <u onClick={() => setUserType(undefined)} className="font-weight-bold text-primary ml-2">
          Chỉnh sửa
        </u>
      </div>
    </div>
  )
}

export default RegisterForm
