import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { useTranslation } from 'i18n';
import React from 'react';
import { toast } from 'react-toastify';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import {
  DELETE_DELIVERY_USER,
  DeleteDeliveryUserData,
  DeleteDeliveryUserVars
} from 'src/graphql/user/deleteDeliveryUser';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';

type Props = {
  open: boolean;
  onClose: () => void;
  id: number;
  onDeleteCompleted: () => void;
};

export default function DeleteDeliveryAddressDialog(props: Props) {
  const { t } = useTranslation(['myAddressBook', 'errors']);

  const [deleteDeliveryUser, { loading }] = useMutationAuth<
    DeleteDeliveryUserData,
    DeleteDeliveryUserVars
  >(DELETE_DELIVERY_USER, {
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
    },
    onCompleted: () => {
      props.onDeleteCompleted();
    }
  });

  const handleDeleteClick = () => {
    deleteDeliveryUser({
      variables: {
        id: props.id
      }
    });
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <LoadingBackdrop open={loading} />

      <DialogTitle>{t('myAddressBook:delete_dialog_title')}</DialogTitle>

      <DialogContent>
        <DialogContentText>{t('myAddressBook:delete_dialog_content')}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={props.onClose}>
          {t('myAddressBook:delete_no')}
        </Button>
        <Button color="primary" onClick={handleDeleteClick}>
          {t('myAddressBook:delete_yes')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
