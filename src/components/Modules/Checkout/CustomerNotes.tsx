import { useTranslation } from 'i18n';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import InputCard from './InputCard';

const CustomerNotes = () => {
  const { register } = useFormContext();

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
