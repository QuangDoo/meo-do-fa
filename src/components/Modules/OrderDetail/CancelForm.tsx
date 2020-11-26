import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    console.log(data);
  }, [data]);

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder'
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div style={{ minHeight: '100px', minWidth: '100px' }}>
      <form className="form" onSubmit={onSubmit}>
        <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
          <b>Lý do hủy đơn</b>
        </label>
        <Select
          onChange={(e) => onHandleChangeData('reason', e.currentTarget.value)}
          className="custom-select my-1 mr-sm-2"
          name="why">
          {names &&
            names.map((name) => (
              <option key={name} value={name}>
                {name}
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
    </div>
  );
}
