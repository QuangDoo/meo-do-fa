import { useQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Dropdown from 'src/components/Form/Dropdown';
import {
  GetManufacturersData,
  GetManufacturersVars,
  SEARCH_MANUFACTURERS
} from 'src/graphql/manufacturers/manufacturers.query';
import { useDebouncedEffect } from 'src/hooks/useDebouncedEffect';

export default function ManufacturerFilter() {
  const { t } = useTranslation(['productsSidebar', 'searchBar']);

  // INPUT VALUE
  const [inputValue, setInputValue] = useState<string>('');

  // VALUE USED TO SEARCH
  const [searchValue, setSearchValue] = useState<string>('');

  const router = useRouter();

  // SEARCH MANUFACTURERS
  const { data: searchManufacturersData, loading: searchingManufacturers } = useQuery<
    GetManufacturersData,
    GetManufacturersVars
  >(SEARCH_MANUFACTURERS, {
    variables: { page: 1, pageSize: 20, name: searchValue }, // TRIGGERED ON SEARCH VALUE CHANGE
    notifyOnNetworkStatusChange: true,
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  // SEARCH MANUFACTURERS DATA
  const manufacturers = searchManufacturersData?.searchManufactory;

  // DEBOUNCE SEARCH MANUFACTURERS
  // DEBOUNCE TIME: 400ms
  // BASED ON INPUT VALUE CHANGE
  // WILL SET SEARCH VALUE TO INPUT VALUE
  //   THEN THE NEW SEARCH VALUE WILL TRIGGER SEARCH MANUFACTURERS
  useDebouncedEffect(
    () => {
      setSearchValue(inputValue);
    },
    400,
    [inputValue]
  );

  // HREF FOR "ALL" LINK
  const getAllHref = () => {
    const newQuery = { ...router.query };

    delete newQuery.manufacturer;
    delete newQuery.page;

    return {
      pathname: router.pathname,
      query: newQuery
    };
  };

  // HREF FOR EACH MANUFACTURER LINK
  const getHref = (id) => {
    const newQuery = { ...router.query };

    delete newQuery.page;

    newQuery.manufacturer = id;

    return {
      pathname: router.pathname,
      query: newQuery
    };
  };

  if (manufacturers?.length === 0 && inputValue === '') return null;

  return (
    <Dropdown label={t('productsSidebar:manufacturer')}>
      <div className="input-group form__input-group has-icon mb-3">
        <i className="fas fa-search form__input-icon search-icon-input" />

        <input
          type="search"
          className="form-control form-control-sm search-input"
          placeholder={t('searchBar:enter_name_manufacturers')}
          aria-label="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      {searchingManufacturers && <CircularProgress size={60} />}

      <div className="mb-2" hidden={searchingManufacturers}>
        <Link href={getAllHref()}>
          <a className={clsx('products__filter-category', !router.query.manufacturer && 'active')}>
            {t('productsSidebar:all')}
          </a>
        </Link>
      </div>

      {!searchingManufacturers &&
        manufacturers?.map(({ name, short_name, id }) => (
          <div key={id} className="mb-2">
            <Link href={getHref(id)}>
              <a
                title={name}
                className={clsx(
                  'products__filter-category',
                  router.query.manufacturer === id.toString() && 'active'
                )}>
                {short_name || name}
              </a>
            </Link>
          </div>
        ))}

      {!searchingManufacturers && manufacturers?.length === 0 && (
        <React.Fragment>
          <div className="search__result--empty">
            {t('searchBar:no_manufacturers')} <b>{searchValue}</b>
          </div>

          <hr />
        </React.Fragment>
      )}

      <div hidden={searchingManufacturers || !manufacturers || manufacturers.length === 0}>
        <Link href="/manufacturers">
          <a className="products__filter-category">{t('productsSidebar:see_more')}</a>
        </Link>
      </div>
    </Dropdown>
  );
}
