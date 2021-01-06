import { useTranslation } from 'i18n';
import React from 'react';
import MuiDialog from 'src/components/Layout/Modal/MuiDialog';

type Props = {
  open: boolean;
  onClose: () => void;
  onCompleted?: () => void;
};

export default function ChooseDeliveryAddressDialog(props: Props) {
  const { t } = useTranslation(['chooseDeliveryAddress']);

  return (
    <MuiDialog
      open={props.open}
      onClose={props.onClose}
      title={t('chooseDeliveryAddress:dialog_title')}></MuiDialog>
  );
}
