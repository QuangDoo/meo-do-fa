import { useTranslation } from 'i18n';
import Link from 'next/link';
import React, { forwardRef } from 'react';
import Checkbox from 'src/components/Form/Checkbox';

import CheckoutWarning from './CheckoutWarning';

const Agreement = (props, register): JSX.Element => {
  const { t } = useTranslation(['checkOut']);

  return (
    <Checkbox
      ref={register({
        required: 'Xin vui lòng xác thực điều khoản'
      })}
      name="agreement"
      label={
        <>
          {t('checkOut:i_agree')}{' '}
          <Link href="/terms-of-service">
            <a>{t('checkOut:terms_of_use')}</a>
          </Link>
        </>
      }>
      <CheckoutWarning />
    </Checkbox>
  );
};

export default forwardRef(Agreement);
