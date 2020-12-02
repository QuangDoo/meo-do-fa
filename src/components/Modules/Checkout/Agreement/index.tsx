import { useTranslation } from 'i18n';
import Link from 'next/link';
import React from 'react';
import Checkbox from 'src/components/Form/Checkbox';
import { ReactHookFormRegister } from 'src/types/ReactHookFormRegister';

import DescriptionBox from '../DescriptionBox';

type Props = ReactHookFormRegister;

const Agreement = (props: Props): JSX.Element => {
  const { register } = props;
  const { t } = useTranslation('checkout');

  return (
    <Checkbox
      ref={register({
        required: t('checkout:error__agreement_required') + ''
      })}
      name="agreement"
      label={
        <>
          {t('checkout:i_agree')}{' '}
          <Link href="/terms-of-service">
            <a>{t('checkout:terms_of_use')}</a>
          </Link>
        </>
      }>
      <DescriptionBox white>
        <ol className="pl-4 mb-0">
          <li>{t('checkout:description1')}</li>

          <li>{t('checkout:description2')}</li>
        </ol>
      </DescriptionBox>
    </Checkbox>
  );
};

export default Agreement;
