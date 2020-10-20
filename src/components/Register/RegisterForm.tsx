import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import AccountInformation from './AccountInformation'
import ChooseUserType from './ChooseUserType'
import WelcomeAccount from './WelcomeAccount'

export type UserType = 'pharmacy' | 'clinic' | 'drugstore'

// Map from userType to text (replace with translation later like t('pharmacy') or something)
export const userTypeMap: Record<UserType, string> = {
  pharmacy: 'Nhà thuốc',
  clinic: 'Phòng khám',
  drugstore: 'Quầy thuốc',
}

// RegisterForm Props
type Props = {}

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

const RegisterForm: FC<Props> = (props) => {
  const { register, handleSubmit, setValue, watch } = useForm<Inputs>()

  // Watch userType value, with initial state
  // This component re-renders when userType changes
  const watchUserType = watch('userType', initialUserType)

  // On submit button click
  const onSubmit = (data: Inputs) => {
    console.log('submit data:', data)
  }

  // Set user type on UserTypeCard click (in ChooseUserType)
  const setUserType = (value: UserType) => {
    setValue('userType', value)
  }

  // Reset userType to initial state
  const resetUserType = () => setValue('userType', initialUserType)

  return (
    <form className="new_account" onSubmit={handleSubmit(onSubmit)}>
      {/* Hide ChooseUserType if userType is in initial state */}
      <div hidden={watchUserType !== initialUserType} className="business-group">
        <ChooseUserType setUserType={setUserType} ref={register} />
      </div>

      {/* Hide AccountInformation form if userType is chosen (NOT in initial state) */}
      <div hidden={watchUserType === initialUserType} className="account-information">
        <WelcomeAccount
          userTypeName={userTypeMap[watchUserType]} // Map from userType to text (to use on translation later)
          onEditClick={resetUserType}
        />
        <AccountInformation ref={register} />
      </div>
    </form>
  )
}

export default RegisterForm
