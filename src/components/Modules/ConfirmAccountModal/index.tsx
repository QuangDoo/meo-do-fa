import { useTranslation } from 'i18n';
import React from 'react';
import ModalWithHeader from 'src/components/Layout/Modal/ModalWithHeader';
import { useModalControlDispatch, useModalControlState } from 'src/contexts/ModalControl';

import ConfirmAccountForm from './ConfirmAccountForm';

// import ResetPassForm from './ResetPassForm';

const ConfirmAccountModal = () => {
  const { t } = useTranslation('register');

  const { closeModal } = useModalControlDispatch();

  const { confirmAccountIsOpen } = useModalControlState();

  return (
    <ModalWithHeader
      open={confirmAccountIsOpen}
      onClose={closeModal}
      title={t('register:confirm_account')}
      className="authentication signup">
      {/* <ResetPassForm /> */}
      <ConfirmAccountForm />
    </ModalWithHeader>
  );
};

export default ConfirmAccountModal;
