import { useTranslation } from 'i18n';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from 'src/components/Form/Button';
import Checkbox from 'src/components/Form/Checkbox';
import Inputs from 'src/components/Form/Input';
import Select from 'src/components/Form/Select';
import Textarea from 'src/components/Form/Textarea';
import ModalBase from 'src/components/Layout/Modal/ModalBase';
import { CANCEL_ORDER } from 'src/graphql/my-orders/cancelOrder';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';

type Props = {
  // Modal is open
  open: boolean;

  // On modal close
  onClose: () => void;

  orderNo: string;

  callBack?: () => void;
};

type Inputs = {
  reason: string;
  text: string;
  check: true;
};

const options = [
  { key: 'delivery_is_too_long', reason: 'Thời gian đặt hàng quá lâu', default: true },
  { key: 'change_of_mind', reason: 'Thay đổi ý', default: false },
  { key: 'duplicate_order', reason: 'Trùng đơn hàng', default: false },
  { key: 'change_delivery_address', reason: 'Thay đổi địa chỉ giao hàng', default: false }
];

const ConfirmCancelOrder = (props) => {
  const { open, onClose, orderNo, callBack } = props;

  const [cancelOrder] = useMutationAuth(CANCEL_ORDER, {
    onCompleted: () => {
      toast.success(t('cancelOrder:cancel_order_successful'));
      callBack();
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
    console.log(typeof orderNo, orderNo);
    cancelOrder({
      variables: {
        orderNo: orderNo
      }
    });
  };

  const hocTrans = (key) => t(`cancelOrder:${key}`);

  return (
    <ModalBase open={open} onClose={onClose}>
      <div className="container p-3">
        <div className="text-center">
          <h3>{t('cancelOrder:request_cancellation')}</h3>
        </div>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label className="my-1 mr-2">
            <b>{t('cancelOrder:reason_for_cancellation')}</b>
          </label>

          <Select ref={register} className="custom-select my-1 mr-sm-2" name="reason">
            {options &&
              options.map((option) => {
                const value = hocTrans(option.key);
                return (
                  <option key={value} value={value}>
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
