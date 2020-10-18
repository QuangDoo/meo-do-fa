import { TFunction } from 'next-i18next'
import React, { FC, useState } from 'react'
import { withTranslation } from '../../../i18n'
import Modal from '../Shared/Modal'
import ChooseUserType from './ChooseUserType'

type RegisterModalProps = {
  readonly t: TFunction
}

const Register: FC<RegisterModalProps> = (props) => {
  const { t } = props

  // Open modal or not
  const [open, setOpen] = useState(false)

  // User type
  const [userType, setUserType] = useState<string>()

  const openModal = () => setOpen(true)

  const closeModal = () => setOpen(false)

  return (
    <>
      {/* Register button to open modal */}
      <button onClick={openModal} className="btn btn-primary btn-sm mr-2">
        {t('header:register')}
      </button>

      {/* Register modal */}
      <Modal
        open={open}
        title="Tạo Tài Khoản"
        closeModal={closeModal}
        className="authentication signup"
      >
        <form className="new_account">
          {userType && <ChooseUserType setUserType={setUserType} />}
        </form>
      </Modal>
    </>
  )
}

export default withTranslation('header')(Register)
