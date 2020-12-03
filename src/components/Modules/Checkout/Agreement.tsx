import { Trans, useTranslation } from 'i18n';
import Link from 'next/link';
import React from 'react';
import Checkbox from 'src/components/Form/Checkbox';
import LinkText from 'src/components/Form/LinkText';
import { ReactHookFormRegister } from 'src/types/ReactHookFormRegister';

import DescriptionBox from './DescriptionBox';

type Props = ReactHookFormRegister;

const Agreement = (props: Props): JSX.Element => {
  const { register } = props;

  const { t } = useTranslation('checkout');

  return (
    <Checkbox
      ref={register({
        required: t('checkout:agreement_required') + ''
      })}
      name="agreement"
      label={
        <Trans
          i18nKey="checkout:agreement_label"
          components={{
            Link: <LinkText href="/terms_of_service"> </LinkText>
          }}
        />
      }>
      <DescriptionBox white>
        <ol className="pl-4 mb-0">
          <li>{t('checkout:warning_1')}</li>

          <li>{t('checkout:warning_2')}</li>
        </ol>
      </DescriptionBox>
    </Checkbox>
  );
};

export default Agreement;
