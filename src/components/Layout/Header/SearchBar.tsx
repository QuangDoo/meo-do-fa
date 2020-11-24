import { useLazyQuery } from '@apollo/react-hooks';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SEARCH_MANUFACTURERS_BY_NAME } from 'src/graphql/search/search.manufacturer.query';
import { SEARCH_PRODUCTS_BY_NAME } from 'src/graphql/search/search.products.query';
import { useDebouncedEffect } from 'src/hooks/useDebouncedEffect';

const SearchBar = (): JSX.Element => {
  const { t } = useTranslation(['searchBar']);
  const router = useRouter();

  const [searchProducts, { data: pData }] = useLazyQuery(SEARCH_PRODUCTS_BY_NAME, {
    onCompleted: () => setShowResults((showResults) => showResults + 1)
  });

  const products = pData?.searchProduct || [];

  const [searchManufacturers, { data: mData }] = useLazyQuery(SEARCH_MANUFACTURERS_BY_NAME, {
    onCompleted: () => setShowResults((showResults) => showResults + 1)
  });

  const manufacturers = mData?.searchManufactory || [];

  const [value, setValue] = useState('');

  const [isFocused, setIsFocused] = useState(false);

  const [showResults, setShowResults] = useState(0);

  // Search with debounce
  useDebouncedEffect(
    () => {
      if (value === '') {
        setShowResults(0);
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
        sort: 'best_match',
        search: value
      }
    });

    event.preventDefault();
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setShowResults(0);
  };

  return (
    <div className="d-flex justify-content-center flex-grow-1 mr-3">
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

          <div
            className={clsx('elevated search__results', isFocused && showResults === 2 && 'show')}>
            {products.length > 0 ? (
              <>
                <Link href={`/products?sort=best_match&search=${value}`}>
                  <a className="search__result">
                    <em>{value}</em> {t('searchBar:in')}{' '}
                    <b className="text-primary">{t('searchBar:all_products')}</b>
                  </a>
                </Link>

                {products.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <a className="search__result">{product.name}</a>
                  </Link>
                ))}
              </>
            ) : (
              <div className="search__result--empty">
                {t('searchBar:no_product')} {value}
              </div>
            )}

            <hr />

            {manufacturers.length > 0 ? (
              <>
                <Link href={`/manufacturers?sort=best_match&search=${value}`}>
                  <a className="search__result pt-0">
                    <em>{value}</em> {t('searchBar:in')}{' '}
                    <b className="text-primary">{t('searchBar:all_manufacturers')}</b>
                  </a>
                </Link>

                {manufacturers.map((manufacturer) => (
                  <Link key={manufacturer.id} href={`/manufacturers/${manufacturer.id}`}>
                    <a className="search__result">{manufacturer.name}</a>
                  </Link>
                ))}
              </>
            ) : (
              <div className="search__result--empty">
                {t('searchBar:no_manufacturer')} {value}
              </div>
            )}
          </div>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default SearchBar;
