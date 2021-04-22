import { onError } from '@apollo/client/link/error';
import { useTranslation } from 'i18n';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from 'src/components/Form/Button';
import Checkbox from 'src/components/Form/Checkbox';
import Select from 'src/components/Form/Select';
import Textarea from 'src/components/Form/Textarea';
import ModalBase from 'src/components/Layout/Modal/ModalBase';
import { CANCEL_ORDER } from 'src/graphql/my-orders/cancelOrder';
import {
  GET_ORDER_CANCEL_TYPES,
  GetOrderCancelTypesData
} from 'src/graphql/order/getOrderCancelTypes';
import { useMutationAuth, useQueryAuth } from 'src/hooks/useApolloHookAuth';

type Inputs = {
  reason: string;
  notes: string;
  check: true;
};

type Props = {
  open: boolean;
  onClose: () => void;
  orderNo: string;
  onCancelCompleted: () => void;
};

const ConfirmCancelOrder = (props: Props) => {
  const { open, onClose, orderNo, onCancelCompleted } = props;

  const [cancelOrder] = useMutationAuth(CANCEL_ORDER, {
    onCompleted: () => {
      toast.success(t('cancelOrder:cancel_order_successful'));
      onCancelCompleted();
      onClose();
    },
    onError: () => {
      toast.error(t('cancelOrder:cancel_order_unsuccessful'));
      onClose();
    }
  });

  const { register, handleSubmit } = useForm();

  const { t } = useTranslation('cancelOrder');

  const onSubmit = (data: Inputs) => {
    if (!data.check) {
      toast.error(t('cancelOrder:is_check'));
      return;
    }

    cancelOrder({
      variables: {
        orderNo: orderNo,
        type: +data.reason,
        content: data.notes
      }
    });
  };

  const { data: orderCancelTypes } = useQueryAuth<GetOrderCancelTypesData, undefined>(
    GET_ORDER_CANCEL_TYPES,
    {
      onError: (error) => {
        toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
      }
    }
  );

  const cancelOption = orderCancelTypes?.getOrderCancelTypes;

  const onError = (error) => {
    toast.error(error[Object.keys(error)[0]].message);
  };

  return (
    <ModalBase open={open} onClose={onClose}>
      <div className="container p-3">
        <div className="text-center">
          <h3>{t('cancelOrder:request_cancellation')}</h3>
        </div>

        <form className="form" onSubmit={handleSubmit(onSubmit, onError)}>
          <label className="my-1 mr-2">
            <b>{t('cancelOrder:reason_for_cancellation')}</b>
          </label>

          <Select ref={register} className="custom-select my-1 mr-sm-2" name="reason">
            {cancelOption &&
              cancelOption.map((option) => {
                const value = t(`cancelOrder:${option.name}`);
                return (
                  <option key={option.id} value={option.id}>
                    {value}
                  </option>
                );
              })}
          </Select>

          <Textarea
            ref={register}
            placeholder={t('cancelOrder:additional_information')}
            label={t('cancelOrder:additional_information')}
            containerClass="my-1 mr-sm-2"
            name="notes"
          />

          <Checkbox
            ref={register}
            containerClass="my-1 mr-sm-2"
            name="check"
            label={t('cancelOrder:cancellation_policy')}
          />

          <Button type="submit" variant="primary" className="my-1">
            {t('cancelOrder:button_title')}
          </Button>
        </form>
      </div>
    </ModalBase>
  );
};

export default ConfirmCancelOrder;
