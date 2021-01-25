import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Dropdown from 'src/components/Form/Dropdown';
import {
  GET_MANUFACTURERS,
  GetManufacturersData,
  GetManufacturersVars,
  SEARCH_MANUFACTURERS
} from 'src/graphql/manufacturers/manufacturers.query';
import removeAccents from 'src/utils/removeAccents';

export default function ManufacturerFilter() {
  const { t } = useTranslation(['productsSidebar', 'searchBar']);

  const [inputValue, setInputValue] = useState<string>('');

  const router = useRouter();

  const { data: dataMS } = useQuery<GetManufacturersData, GetManufacturersVars>(
    SEARCH_MANUFACTURERS,
    {
      variables: { page: 1, pageSize: 20, name: inputValue },
      onError: (err) => {
        toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
      }
    }
  );

  const manufacturers = dataMS?.searchManufactory;

  const getAllHref = () => {
    const newQuery = { ...router.query };

    delete newQuery.manufacturer;

    return {
      pathname: router.pathname,
      query: newQuery
    };
  };

  return (
    <Dropdown label={t('productsSidebar:manufacturer')}>
      <div className="input-group form__input-group mb-3">
        <i className="fas fa-search form__input-icon" />

        <input
          type="search"
          className="form-control form-control-sm search-input"
          placeholder={t('searchBar:enter_name_manufacturers')}
          aria-label="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <Link href={getAllHref()}>
          <a className={clsx('products__filter-category', !router.query.manufacturer && 'active')}>
            {t('productsSidebar:all')}
          </a>
        </Link>
      </div>

      {manufacturers?.map(({ short_name, id }) => (
        <div
          hidden={!!inputValue && !removeAccents(short_name).includes(removeAccents(inputValue))}
          key={id}
          className="mb-2">
          <Link
            href={{
              pathname: router.pathname,
              query: {
                ...router.query,
                manufacturer: id
              }
            }}>
            <a
              className={clsx(
                'products__filter-category',
                router.query.manufacturer === id.toString() && 'active'
              )}>
              {short_name}
            </a>
          </Link>
        </div>
      ))}

      {inputValue &&
        !manufacturers?.some((manufacturer) =>
          removeAccents(manufacturer.short_name).includes(removeAccents(inputValue))
        ) && (
          <React.Fragment>
            <div className="search__result--empty">
              {t('searchBar:no_manufacturers')} <b>{inputValue}</b>
            </div>

            <hr />
          </React.Fragment>
        )}

      <div>
        <Link href="/manufacturers">
          <a className="products__filter-category">{t('productsSidebar:see_more')}</a>
        </Link>
      </div>
    </Dropdown>
  );
}
