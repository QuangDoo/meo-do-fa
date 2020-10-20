import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import AccountInformation from './AccountInformation'
import ChooseUserType from './ChooseUserType'
import WelcomeAccount from './WelcomeAccount'

export type UserType = 'pharmacy' | 'clinic' | 'drugstore'

export const userTypeMap: Record<UserType, string> = {
  pharmacy: 'Nhà thuốc',
  clinic: 'Phòng khám',
  drugstore: 'Quầy thuốc',
}

type Props = {}

type Inputs = {
  userType: string
}

const RegisterForm: FC<Props> = (props) => {
  const { register, handleSubmit, setValue, watch } = useForm<Inputs>({
    defaultValues: {
      userType: '',
    },
  })

  const watchUserType = watch('userType', undefined)

  console.log(watch())

  const onSubmit = (data) => {
    console.log(data)
  }

  // Set user type on UserTypeCard click (in ChooseUserType)
  const setUserType = (value: UserType) => {
    setValue('userType', value)
  }

  return (
    <form className="new_account" onSubmit={handleSubmit(onSubmit)}>
      {/**
       *  Show ChooseUserType if userType is not chosen (empty string)
       *  Else show AccountInformationForm
       */}

      <div hidden={!!watchUserType} className="business-group">
        <ChooseUserType setUserType={setUserType} ref={register} />
      </div>

      <div hidden={!watchUserType} className="account-information">
        <WelcomeAccount
          userTypeName={userTypeMap[watchUserType]}
          onEditClick={() => setUserType(undefined)}
        />
        <AccountInformation ref={register} />
      </div>
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
