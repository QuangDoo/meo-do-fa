import clsx from 'clsx';
import React from 'react';

import DescriptionBox from '../DescriptionBox';

type Line = {
  label: string;
  content: string;
};

const TransferPaymentInfo = (props: any): JSX.Element => {
  const lines: Line[] = [
    {
      label: 'Chủ tài khoản',
      content: props.account_name
    },
    {
      label: 'Số tài khoản',
      content: props.account_no
    },
    {
      label: 'Ngân hàng',
      content: props.bank_name
    },
    {
      label: 'Nội dung',
      content: props.note
    }
  ];
  return (
    <>
      <br />

      <small className="text-muted">Giảm 0.5% cho đơn hàng chuyển khoản trước.</small>

      <DescriptionBox>
        <div className="bank-info">
          {lines.map((line, index) => (
            <div key={index} className={clsx('d-flex', index < lines.length - 1 && 'mb-2')}>
              <div className="bank-info__label">{line.label}</div>
              <div className="bank-info__content">{line.content}</div>
            </div>
          ))}
        </div>
      </DescriptionBox>
    </>
  );
};

export default TransferPaymentInfo;
