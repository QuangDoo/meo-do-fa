import { withTranslation } from 'i18n';
import { TFunction } from 'next-i18next';
import React from 'react';
import Button from 'src/components/Form/Button';
import ModalWithHeader from 'src/components/Layout/Modal/ModalWithHeader';
import { useModalControlDispatch, useModalControlState } from 'src/contexts/ModalControl';

import RegisterForm from './RegisterForm';

type RegisterModalProps = {
  readonly t: TFunction;
};

const Register = ({ t }: RegisterModalProps): JSX.Element => {
  // Modal is open or not
  const { registerIsOpen } = useModalControlState();

  // Dispatch to update ModalControl context
  const { openModal, closeModal } = useModalControlDispatch();

  const openRegisterModal = () => openModal('REGISTER');

  return (
    <>
      {/* Register button to open modal */}
      <Button onClick={openRegisterModal} size="sm" variant="primary" className="mr-2">
        {t('header:register')}
      </Button>

      {/* Register modal */}
      <ModalWithHeader
        open={registerIsOpen}
        title={t('register:create_an_account')}
        onClose={closeModal}
        className="authentication signup">
        <RegisterForm />
      </ModalWithHeader>
    </>
  );
};

export default withTranslation(['header', 'register'])(Register);
