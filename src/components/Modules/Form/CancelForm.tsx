import React, { useState } from 'react';

import Checkbox from '../../Form/Checkbox';
import Select from '../../Form/Select';
import Textarea from '../../Form/Textarea';

const initialData = {
  reason: '',
  description: ''
};

export default function CancelForm(props) {
  const [data, setData] = useState<any>(initialData);

  const onHandleChangeData = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const options = [
    { reason: 'Thời gian đặt hàng quá lâu', default: true },
    { reason: 'Thay đổi ý', default: false },
    { reason: 'Trùng đơn hàng', default: false },
    { reason: 'Thay đổi địa chỉ giao hàng', default: false }
  ];

  const onSubmit = (e) => {
    const result = data;
    e.preventDefault();
    console.log(result);
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
        <b>Lý do hủy đơn</b>
      </label>
      <Select
        onChange={(e) => onHandleChangeData('reason', e.currentTarget.value)}
        className="custom-select my-1 mr-sm-2"
        name="reason">
        {options &&
          options.map((option) => (
            <option key={option.reason} value={option.reason}>
              {option.reason}
            </option>
          ))}
      </Select>

      <Textarea
        onChange={(e) => onHandleChangeData('description', e.currentTarget.value)}
        placeholder={`Lý do hủy đơn`}
        label={`Thông tin thêm (không bắt buộc)`}
        containerClass="my-1 mr-sm-2"
        htmlFor={'text'}
      />

      <Checkbox containerClass="my-1 mr-sm-2" name="check" label="Chính Sách Hủy Đơn Hàng" />
      <button type="submit" className="btn btn-primary my-1">
        Hủy đơn
      </button>
    </form>
  );
}
