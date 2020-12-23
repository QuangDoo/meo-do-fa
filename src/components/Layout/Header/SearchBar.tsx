import { useLazyQuery } from '@apollo/client';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SEARCH_MANUFACTURERS_BY_NAME } from 'src/graphql/search/search.manufacturer.query';
import { SEARCH_PRODUCTS_BY_NAME } from 'src/graphql/search/search.products.query';
import { useDebouncedEffect } from 'src/hooks/useDebouncedEffect';

import Loading from '../Loading';

const SearchBar = (): JSX.Element => {
  const { t } = useTranslation(['searchBar']);
  const router = useRouter();

  const [searchProducts, { data: pData, loading: pLoading }] = useLazyQuery(
    SEARCH_PRODUCTS_BY_NAME,
    {
      onCompleted: () => setShowProducts(true)
    }
  );

  const products = pData?.searchProduct || [];

  const [searchManufacturers, { data: mData, loading: mLoading }] = useLazyQuery(
    SEARCH_MANUFACTURERS_BY_NAME,
    {
      onCompleted: () => setShowManufacturers(true)
    }
  );

  const manufacturers = mData?.searchManufactory || [];

  const [value, setValue] = useState('');

  const [isFocused, setIsFocused] = useState(false);

  const [showResults, setShowResults] = useState(false);

  const [showProducts, setShowProducts] = useState(false);

  const [showManufacturers, setShowManufacturers] = useState(false);

  // Search with debounce
  useDebouncedEffect(
    () => {
      if (value === '') {
        setShowResults(true);
        setShowProducts(false);
        setShowManufacturers(false);
        return;
      }

      searchProducts({
        variables: {
          page: 1,
          pageSize: 15,
          name: value
        }
      });

      searchManufacturers({
        variables: {
          page: 1,
          pageSize: 15,
          name: value
        }
      });
    },
    200,
    [value]
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    router.push({
      pathname: '/products',
      query: {
        search: value
      }
    });
    setShowResults(false);
    event.preventDefault();
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setShowProducts(false);
    setShowManufacturers(false);
    setShowResults(true);
  };

  const renderProducts = (products) => {
    return products.map((product) => (
      <Link key={product.id} href={`/products/${product.slug}`}>
        <a className="search__result">{product.name}</a>
      </Link>
    ));
  };

  const renderManufacturers = (manufacturers) => {
    return manufacturers.map((manufacturer) => (
      <Link key={manufacturer.id} href={`/manufacturers/${manufacturer.id}`}>
        <a className="search__result">{manufacturer.name}</a>
      </Link>
    ));
  };

  const renderSearchTitle = (type) => {
    switch (type) {
      case 'products':
        return (
          <Link href={`/products?sort=best_match&search=${value}`}>
            <a className="search__result">
              <em>{value}</em> {t('searchBar:in')}{' '}
              <b className="text-primary">{t('searchBar:all_products')}</b>
            </a>
          </Link>
        );
      case 'manufacturers':
        return (
          <Link href={`/manufacturers?sort=best_match&search=${value}`}>
            <a className="search__result pt-0">
              <em>{value}</em> {t('searchBar:in')}{' '}
              <b className="text-primary">{t('searchBar:all_manufacturers')}</b>
            </a>
          </Link>
        );
    }
  };

  return (
    <div className="d-flex justify-content-sm-center justify-content-start flex-grow-1 mr-sm-3">
      <ClickAwayListener onClickAway={() => setIsFocused(false)}>
        <div className="search">
          <form onSubmit={handleSubmit} autoComplete="off" acceptCharset="UTF-8">
            <div className="input-group form__input-group">
              <i className="fas fa-search form__input-icon" />

              <input
                type="search"
                className="form-control form-control-sm search-input"
                placeholder={t('searchBar:input')}
                aria-label="search"
                value={value}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
              />
            </div>
          </form>
          {/* && showResults === 2 */}
          <div className={clsx('elevated search__results', isFocused && showResults && 'show')}>
            {showProducts &&
              (products.length > 0 ? (
                <>
                  {renderSearchTitle('products')}
                  {renderProducts(products)}
                </>
              ) : (
                <>
                  <div className="search__result--empty">
                    {t('searchBar:no_product')} <b>{value}</b>
                  </div>
                  <hr />
                </>
              ))}
            {showManufacturers &&
              (manufacturers.length > 0 ? (
                <>
                  {renderSearchTitle('manufacturers')}
                  {renderManufacturers(manufacturers)}
                </>
              ) : (
                <div className="search__result--empty">
                  {t('searchBar:no_manufacturer')} <b>{value}</b>
                </div>
              ))}
            {(pLoading || mLoading) && (
              <div className="search__result--empty text-center">
                <Loading />
              </div>
            )}
          </div>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default SearchBar;
