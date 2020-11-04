import { TFunction } from 'next-i18next';
import React from 'react';

import { withTranslation } from '../../../i18n';
import { useModalControlDispatch, useModalControlState } from '../../contexts/ModalControl';
import Button from '../Button';
import Modal from '../Modal';
import RegisterForm from './RegisterForm';

type RegisterModalProps = {
  readonly t: TFunction;
};

const Register = ({ t }: RegisterModalProps): JSX.Element => {
  // Modal is open or not
  const { registerIsOpen } = useModalControlState();

  // Dispatch to update ModalControl context
  const dispatch = useModalControlDispatch();

  const openModal = () => {
    dispatch({
      type: 'OPEN_REGISTER_MODAL'
    });
  };

  const closeModal = () =>
    dispatch({
      type: 'CLOSE_REGISTER_MODAL'
    });

  return (
    <>
      {/* Register button to open modal */}
      <Button onClick={openModal} size="sm" variant="primary" className="mr-2">
        {t('header:register')}
      </Button>

      {/* Register modal */}
      <Modal
        open={registerIsOpen}
        title={t('register:create_an_account')}
        onClose={closeModal}
        className="authentication signup">
        <RegisterForm />
      </Modal>
    </>
  );
};

export default withTranslation(['header', 'register'])(Register);
