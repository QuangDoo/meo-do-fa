import { useTranslation } from 'i18n';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { emailRegex } from 'src/assets/regex/email';
import Checkbox from 'src/components/Form/Checkbox';
import InputWithLabel from 'src/components/Form/InputWithLabel';
import SelectWithLabel from 'src/components/Form/SelectWithLabel';
import { useUser } from 'src/contexts/User';
import useAddress from 'src/hooks/useAddress';

import { CheckoutFormInputs } from '.';
import InputCard from './InputCard';

const InvoiceInfo = () => {
  const { register, watch } = useFormContext<CheckoutFormInputs>();

  const isInvoice = watch('isInvoice');

  const { cities, districts, wards } = useAddress({
    cityId: +watch('invoiceCity')?.split('__')[1],
    districtId: +watch('invoiceDistrict')?.split('__')[1],
    wardId: +watch('invoiceWard')?.split('__')[1]
  });

  const { t } = useTranslation(['checkout', 'myAccount']);

  const { data: user } = useUser();

  return (
    <Checkbox ref={register} name="isInvoice" label={t('checkout:billing_export')}>
      {isInvoice && (
        <div className="mt-2">
          <InputCard title={t('checkout:billing_info_title')} hasRequired>
            {/* Name input */}
            <InputWithLabel
              name="invoiceName"
              ref={register({
                required: t('checkout:name_required') + ''
              })}
              label={t('checkout:name_label_invoice')}
              type="text"
              placeholder={t('checkout:name_placeholder')}
              defaultValue={user?.name}
              required
            />

            <div className="row">
              {/* Tax_code input */}
              <InputWithLabel
                ref={register({
                  required: t('checkout:taxcode_required') + ''
                })}
                label={t('myAccount:tax_code_label')}
                name="invoiceTaxCode"
                type="text"
                placeholder={t('myAccount:tax_code_placeholder')}
                defaultValue={user?.vat}
                containerClass="col-sm-4"
                required
              />

              {/* Email input */}
              <InputWithLabel
                name="invoiceEmail"
                ref={register({
                  pattern: {
                    value: emailRegex,
                    message: t('checkout:email_invalid')
                  }
                })}
                type="text"
                label={t('checkout:email_label')}
                containerClass="col-sm-8"
                placeholder={t('checkout:email_placeholder')}
                defaultValue={user?.email}
                required
              />
            </div>

            {/* Address input */}
            <InputWithLabel
              name="invoiceStreet"
              ref={register({
                required: t('checkout:address_required') + ''
              })}
              label={
                <>
                  {t('checkout:address_label_invoice')}{' '}
                  <span className="text-muted">{t('checkout:address_instructions')}</span>
                </>
              }
              type="text"
              required
              defaultValue={user?.contact_address?.street || ''}
            />

            <div className="row">
              {/* Select city */}
              <SelectWithLabel
                name="invoiceCity"
                ref={register({
                  required: t('checkout:city_required') + ''
                })}
                label={t('checkout:city_label')}
                containerClass="col-md-4"
                required>
                <option value="">{t('checkout:city_placeholder')}</option>

                {/* Map cities from api */}
                {cities.map((city) => (
                  <option key={city.id} value={city.name + '__' + city.id}>
                    {city.name}
                  </option>
                ))}
              </SelectWithLabel>

              {/* Select district */}
              <SelectWithLabel
                disabled={!districts?.length}
                name="invoiceDistrict"
                ref={register({
                  required: t('checkout:district_required') + ''
                })}
                label={t('checkout:district_label')}
                labelClass="required"
                containerClass="col-md-4">
                <option value="">{t('checkout:district_placeholder')}</option>

                {/* Map districts from chosen city */}
                {districts.map((district) => (
                  <option key={district.id} value={district.name + '__' + district.id}>
                    {district.name}
                  </option>
                ))}
              </SelectWithLabel>

              {/* Select ward */}
              <SelectWithLabel
                disabled={!wards?.length}
                name="invoiceWard"
                ref={register({
                  required: t('checkout:ward_required') + ''
                })}
                label={t('checkout:ward_label')}
                labelClass="required"
                containerClass="col-md-4">
                <option value="">{t('checkout:ward_placeholder')}</option>

                {/* Map wards from chosen district */}
                {wards.map((ward) => (
                  <option key={ward.id} value={ward.name + '__' + ward.id}>
                    {ward.name}
                  </option>
                ))}
              </SelectWithLabel>
            </div>

            <Checkbox
              ref={register}
              name="invoiceSaveInfo"
              containerClass="mt-2"
              label={t('checkout:saveInfo_label')}
              labelClass="form__label"
            />
          </InputCard>
        </div>
      )}
    </Checkbox>
  );
};

export default InvoiceInfo;
