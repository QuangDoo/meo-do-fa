import Link from 'next/link';
import React from 'react';

const TransferPaymentLabel = (): JSX.Element => {
  return (
    <>
      Chuyển khoản (
      <Link href="/transfer-instructions">
        <a>Hướng dẫn chuyển khoản</a>
      </Link>
      )
    </>
  );
};

export default TransferPaymentLabel;
