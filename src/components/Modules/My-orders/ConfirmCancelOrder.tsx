import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Checkbox from 'src/components/Form/Checkbox';
import Input from 'src/components/Form/Input';
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

  orderId: string;
};

type Input = {
  reason: string;
  text: string;
  check: true;
};

const options = [
  { reason: 'Thời gian đặt hàng quá lâu', default: true },
  { reason: 'Thay đổi ý', default: false },
  { reason: 'Trùng đơn hàng', default: false },
  { reason: 'Thay đổi địa chỉ giao hàng', default: false }
];

const ConfirmCancelOrder: FC<Props> = (props) => {
  const { open, onClose, orderId } = props;

  const [cancelOrder, { data, error }] = useMutationAuth(CANCEL_ORDER);

  const { register, handleSubmit, watch, errors } = useForm();

  useEffect(() => {
    if (!data) return;

    toast.success('cancel success');

    onClose();
  }, [data]);

  // onError
  useEffect(() => {
    if (!error) return;

    // console.log('Delete cart error:', { error });
    toast.error(`errors:code_${error}`);
    onClose();
  }, [error]);

  const onSubmit = (data: Input) => {
    console.log(data);
    console.log(typeof orderId, orderId);
    cancelOrder({
      variables: {
        orderNo: orderId
      }
    }).catch((error) => {
      // toast.error(error);
      // console.log(error);
      onClose();
    });
  };

  return (
    <ModalBase open={open} onClose={onClose}>
      <div className="container p-3">
        <div className="text-center">
          <h3>hủy đơn</h3>
        </div>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
            <b>Lý do hủy đơn</b>
          </label>
          <Select ref={register} className="custom-select my-1 mr-sm-2" name="reason">
            {options &&
              options.map((option) => (
                <option key={option.reason} value={option.reason}>
                  {option.reason}
                </option>
              ))}
          </Select>

          <Textarea
            ref={register}
            placeholder={`Lý do hủy đơn`}
            label={`Thông tin thêm (không bắt buộc)`}
            containerClass="my-1 mr-sm-2"
            htmlFor={'note'}
          />

          <Checkbox
            ref={register}
            containerClass="my-1 mr-sm-2"
            name="check"
            label="Chính Sách Hủy Đơn Hàng"
          />
          <button type="submit" className="btn btn-primary my-1">
            Hủy đơn
          </button>
        </form>
      </div>
    </ModalBase>
  );
};

export default ConfirmCancelOrder;
