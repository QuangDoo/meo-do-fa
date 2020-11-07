import { withTranslation } from 'i18n';
import { TFunction } from 'next-i18next';
import React from 'react';

import { useModalControlDispatch, useModalControlState } from '../../../contexts/ModalControl';
import Button from '../../Form/Button';
import ModalWithHeader from '../../Layout/Modal/ModalWithHeader';
import RegisterForm from './RegisterForm';

type RegisterModalProps = {
  readonly t: TFunction;
};

const Register = ({ t }: RegisterModalProps): JSX.Element => {
  // Modal is open or not
  const { registerIsOpen } = useModalControlState();

  // Dispatch to update ModalControl context
  const dispatch = useModalControlDispatch();

  return (
    <>
      {/* Register button to open modal */}
      <Button
        onClick={() => dispatch({ type: 'OPEN_REGISTER_MODAL' })}
        size="sm"
        variant="primary"
        className="mr-2">
        {t('header:register')}
      </Button>

      {/* Register modal */}
      <ModalWithHeader
        open={registerIsOpen}
        title={t('register:create_an_account')}
        onClose={() => dispatch({ type: 'CLOSE_REGISTER_MODAL' })}
        className="authentication signup">
        <RegisterForm />
      </ModalWithHeader>
    </>
  );
};

export default withTranslation(['header', 'register'])(Register);
