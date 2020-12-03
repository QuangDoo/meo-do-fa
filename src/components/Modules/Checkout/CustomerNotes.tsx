import { useTranslation } from 'i18n';
import React from 'react';
import { ReactHookFormRegister } from 'src/types/ReactHookFormRegister';

import InputCard from './InputCard';

type Props = ReactHookFormRegister;

const CustomerNotes = (props: Props) => {
  const { register } = props;

  const { t } = useTranslation('checkout');

  return (
    <InputCard title={t('checkout:notes_title')} description={t('checkout:notes_description')}>
      <textarea
        ref={register}
        rows={4}
        placeholder={t('checkout:notes_placeholder')}
        className="form-control"
        name="customerNotes"
      />
    </InputCard>
  );
};

export default CustomerNotes;
