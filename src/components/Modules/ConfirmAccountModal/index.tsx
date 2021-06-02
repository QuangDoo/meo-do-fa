import { ClickAwayListener } from '@material-ui/core';
import { useTranslation } from 'i18n';
import cookies from 'js-cookie';
import React from 'react';
import ModalWithHeader from 'src/components/Layout/Modal/ModalWithHeader';
import { useModalControlDispatch, useModalControlState } from 'src/contexts/ModalControl';

import ConfirmAccountForm from './ConfirmAccountForm';

// import ResetPassForm from './ResetPassForm';

const ConfirmAccountModal = () => {
  const { t } = useTranslation('register');

  const { closeModal } = useModalControlDispatch();

  const { confirmAccountIsOpen } = useModalControlState();

  const logOut = () => {
    cookies.remove('token');
    window.location.href = '/';
    // window.location.reload();
    // closeModal();
  };

  const handleClickAway = () => {
    alert(`${t('register:otp_alert')}`);
  };

  return (
    <ModalWithHeader
      open={confirmAccountIsOpen}
      // onClose={logOut}
      onBackdropClick={handleClickAway}
      title={t('register:confirm_account')}
      className="authentication signup">
      {/* <ResetPassForm /> */}
      <ConfirmAccountForm />
    </ModalWithHeader>
  );
};

export default ConfirmAccountModal;
