import { TFunction } from 'next-i18next'
import React, { FC, useState } from 'react'
import { withTranslation } from '../../../i18n'
import Button from '../Button'
import Modal from '../Modal'
import ChooseUserType from './ChooseUserType'
import RegisterForm from './RegisterForm'

type RegisterModalProps = {
  readonly t: TFunction
}

export type UserType = 'pharmacy' | 'clinic' | 'drugstore'

const Register: FC<RegisterModalProps> = (props) => {
  const { t } = props

  // Open modal or not
  const [open, setOpen] = useState(false)

  // User type
  const [userType, setUserType] = useState<UserType>()

  const openModal = () => setOpen(true)

  const closeModal = () => setOpen(false)

  return (
    <>
      {/* Register button to open modal */}
      <Button onClick={openModal} size="sm" variant="primary" className="mr-2">
        {t('header:register')}
      </Button>

      {/* Register modal */}
      <Modal
        open={open}
        title="Tạo Tài Khoản"
        onClose={closeModal}
        className="authentication signup"
      >
        <form className="new_account">
          {userType ? (
            <RegisterForm userType={userType} setUserType={setUserType} />
          ) : (
            <ChooseUserType setUserType={setUserType} />
          )}
        </form>
      </Modal>
    </>
  )
}

export default withTranslation('header')(Register)
