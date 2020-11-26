import { withTranslation } from 'i18n';
import { TFunction } from 'next-i18next';
import React from 'react';
import Button from 'src/components/Form/Button';
import ModalWithHeader from 'src/components/Layout/Modal/ModalWithHeader';
import { useModalControlDispatch, useModalControlState } from 'src/contexts/ModalControl';

import RessetPassForm from './RessetPassForm';

type RessetPassModalProps = {
  readonly t: TFunction;
};

const RessetPass = ({ t }: RessetPassModalProps): JSX.Element => {
  // Modal is open or not
  const { ressetPassIsOpen } = useModalControlState();

  // Dispatch to update ModalControl context
  const dispatch = useModalControlDispatch();

  return (
    <>
      <ModalWithHeader
        open={ressetPassIsOpen}
        title={t('password:resset_password')}
        onClose={() => dispatch({ type: 'CLOSE_RESSETPASS_MODAL' })}
        className="authentication signup">
        <RessetPassForm />
      </ModalWithHeader>
    </>
  );
};

export default withTranslation(['header', 'password'])(RessetPass);
