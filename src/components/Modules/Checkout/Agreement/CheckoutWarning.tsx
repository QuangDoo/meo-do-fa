import { useTranslation } from 'i18n';
import React from 'react';

import DescriptionBox from '../DescriptionBox';

const CheckoutWarning = (): JSX.Element => {
  const { t } = useTranslation(['checkOut']);
  return (
    <DescriptionBox white>
      <ol className="pl-4 mb-0">
        <li>{t('checkOut:description1')}</li>

        <li>{t('checkOut:description2')}</li>
      </ol>
    </DescriptionBox>
  );
};

export default CheckoutWarning;
