import React, { forwardRef } from 'react';

import InputCard from './InputCard';

const CustomerNotes = (props, register): JSX.Element => {
  return (
    <InputCard
      title="Ghi chú khác"
      description="Trường hợp không tìm được thuốc mong muốn, Quý khách vui lòng điền yêu cầu bên dưới. Chúng tôi sẽ liên hệ mua thuốc và báo giá sớm nhất có thể.">
      <textarea
        ref={register}
        rows={4}
        placeholder="Ghi chú của khách hàng"
        className="form-control"
        name="customerNotes"
      />
    </InputCard>
  );
};

export default forwardRef(CustomerNotes);
