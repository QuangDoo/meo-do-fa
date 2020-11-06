import Link from 'next/link';
import React, { forwardRef } from 'react';
import Checkbox from 'src/components/Form/Checkbox';

import CheckoutWarning from './CheckoutWarning';

const Agreement = (props, register): JSX.Element => {
  return (
    <Checkbox
      ref={register}
      name="agreement"
      label={
        <>
          Tôi đồng ý với{' '}
          <Link href="/terms-of-service">
            <a>Điều khoản sử dụng</a>
          </Link>
        </>
      }>
      <CheckoutWarning />
    </Checkbox>
  );
};

export default forwardRef(Agreement);
