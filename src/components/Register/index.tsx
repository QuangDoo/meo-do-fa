import { TFunction } from 'next-i18next'
import React, { FC, useState } from 'react'
import { withTranslation } from '../../../i18n'
<<<<<<< HEAD
import Button from '../Button'
import Modal from '../Modal'
import ChooseUserType from './ChooseUserType'
import RegisterForm from './RegisterForm'
=======
import Modal from '../Shared/Modal'
import ChooseUserType from './ChooseUserType'
>>>>>>> 2f41003... Update.

type RegisterModalProps = {
  readonly t: TFunction
}

<<<<<<< HEAD
export type UserType = 'pharmacy' | 'clinic' | 'drugstore'

=======
>>>>>>> 2f41003... Update.
const Register: FC<RegisterModalProps> = (props) => {
  const { t } = props

  // Open modal or not
  const [open, setOpen] = useState(false)

  // User type
<<<<<<< HEAD
  const [userType, setUserType] = useState<UserType>()
=======
  const [userType, setUserType] = useState<string>()
>>>>>>> 2f41003... Update.

  const openModal = () => setOpen(true)

  const closeModal = () => setOpen(false)

  return (
    <>
      {/* Register button to open modal */}
<<<<<<< HEAD
      <Button onClick={openModal} size="sm" variant="primary" className="mr-2">
        {t('header:register')}
      </Button>
=======
      <button onClick={openModal} className="btn btn-primary btn-sm mr-2">
        {t('header:register')}
      </button>
>>>>>>> 2f41003... Update.

      {/* Register modal */}
      <Modal
        open={open}
        title="Tạo Tài Khoản"
<<<<<<< HEAD
        onClose={closeModal}
        className="authentication signup"
      >
        <form className="new_account">
          {userType ? (
            <RegisterForm userType={userType} setUserType={setUserType} />
          ) : (
            <ChooseUserType setUserType={setUserType} />
          )}
=======
        closeModal={closeModal}
        className="authentication signup"
      >
        <form className="new_account">
          {userType && <ChooseUserType setUserType={setUserType} />}
>>>>>>> 2f41003... Update.
        </form>
      </Modal>
    </>
  )
}

export default withTranslation('header')(Register)
