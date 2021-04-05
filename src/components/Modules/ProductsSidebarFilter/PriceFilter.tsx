import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import NumberFormat from 'react-number-format';

export default function PriceFilter() {
  const { t } = useTranslation(['productsSidebar']);

  const router = useRouter();

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      priceFrom: router.query.priceFrom,
      priceTo: router.query.priceTo
    }
  });

  useEffect(() => {
    if (!router.query.priceFrom && !router.query.priceTo) {
      setValue('priceFrom', '');
      setValue('priceTo', '');
    }
  }, [router]);

  const onPriceRangeSubmit = (data) => {
    const newQuery = {
      ...router.query
    };

    if (data.priceFrom) newQuery.priceFrom = data.priceFrom;
    else delete newQuery.priceFrom;

    if (data.priceTo) newQuery.priceTo = data.priceTo;
    else delete newQuery.priceTo;

    router.push({
      pathname: router.pathname,
      query: newQuery
    });
  };

  return (
    <form onSubmit={handleSubmit(onPriceRangeSubmit)}>
      <p>{t('productsSidebar:price_range')}</p>

      <div className="d-flex align-items-center row mb-3 mx-0">
        <Controller
          name="priceFrom"
          control={control}
          render={({ onChange, value }) => (
            <NumberFormat
              placeholder={t('productsSidebar:price_from')}
              className="form-control no-spinner col"
              inputMode="numeric"
              thousandSeparator="."
              decimalSeparator=","
              onValueChange={(values) => onChange(values.floatValue)}
              value={value}
              allowNegative={false}
            />
          )}
        />

        <div className="mx-2">&#8212;</div>

        <Controller
          name="priceTo"
          control={control}
          render={({ onChange, value }) => (
            <NumberFormat
              placeholder={t('productsSidebar:price_to')}
              className="form-control no-spinner col"
              inputMode="numeric"
              thousandSeparator="."
              decimalSeparator=","
              onValueChange={(values) => onChange(values.floatValue)}
              value={value}
              allowNegative={false}
            />
          )}
        />
      </div>

      <button className="btn btn-primary" type="submit">
        {t('productsSidebar:apply')}
      </button>
    </form>
  );
}
