import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CANCEL_ORDER, CancelOrderData, CancelOrderVars } from 'src/graphql/my-orders/cancelOrder';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';

import Checkbox from '../../Form/Checkbox';
import Select from '../../Form/Select';
import Textarea from '../../Form/Textarea';

type Props = {
  orderId: string;
};

type Input = {
  reason: string;
  text: string;
  check: true;
};

export default function CancelForm(props: Props) {
  // const [cancelOrderFn, { data: cancelOrderData }] = useMutation(CANCEL_ORDER);
  const [cancelOrder, { data: cancelOrderData, error: cancelOrderError }] = useMutationAuth(
    CANCEL_ORDER
  );

  const { register, handleSubmit, watch, errors } = useForm();

  const options = [
    { reason: 'Thời gian đặt hàng quá lâu', default: true },
    { reason: 'Thay đổi ý', default: false },
    { reason: 'Trùng đơn hàng', default: false },
    { reason: 'Thay đổi địa chỉ giao hàng', default: false }
  ];
  const onSubmit = (data: Input) => {
    console.log(data);
    console.log(typeof props.orderId, props.orderId);
    cancelOrder({
      variables: {
        id: String(props.orderId)
      }
    }).catch((error) => {
      // toast.error(error);
      console.log(error);
    });
  };
  useEffect(() => {
    if (cancelOrderError) {
      toast.error('Get order list error: ' + cancelOrderError);
    }
    if (cancelOrderData) {
      toast.success(cancelOrderData);
    }
    return;
  }, [cancelOrderError, cancelOrderData]);

  return (
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
        htmlFor={'text'}
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
  );
}
