import { useLazyQuery } from '@apollo/client';
import { CircularProgress, useMediaQuery } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Button from 'src/components/Form/Button';
import Select from 'src/components/Form/Select';
import {
  SEARCH_MANUFACTURER,
  SearchManufacturerData,
  SearchManufacturerVars
} from 'src/graphql/search/search.manufacturer.query';
import {
  SEARCH_PRODUCT,
  SearchProductData,
  SearchProductVars,
  SearchResult
} from 'src/graphql/search/search.products.query';
import { useDebouncedEffect } from 'src/hooks/useDebouncedEffect';

const SearchResults = (props: {
  array: SearchResult[];
  value: string;
  type: 'products' | 'manufacturers';
  onTitleClick: (value: string) => void;
  onItemClick: (item: SearchResult) => void;
  generateHref: (item: SearchResult) => string;
}) => {
  const { t } = useTranslation(['searchBar']);

  return props.array.length > 0 ? (
    <>
      <button
        className="w-100 text-left border-bottom p-3"
        onClick={() => props.onTitleClick(props.value)}>
        <Link href={`/${props.type}?sort=best_match&search=${props.value}`}>
          <a>
            <em>{props.value}</em> {t('searchBar:in')}{' '}
            <b className="text-primary">{t(`searchBar:all_${props.type}`)}</b>
          </a>
        </Link>
      </button>

      {props.array.map((item) => (
        <button
          className="w-100 text-left border-bottom"
          key={item.id}
          onClick={() => props.onItemClick(item)}>
          <Link href={props.generateHref(item)}>
            <a className="search__result">{item.name}</a>
          </Link>
        </button>
      ))}
    </>
  ) : (
    <>
      <div className="search__result--empty">
        {t(`searchBar:no_${props.type}`)} <b>{props.value}</b>
      </div>
      <hr />
    </>
  );
};

const SearchBar = () => {
  const isSmallScreen = useMediaQuery('(max-width:576px)');

  const { t } = useTranslation(['searchBar']);

  const router = useRouter();

  const [searchProducts, { data: pData, loading: pLoading }] = useLazyQuery<
    SearchProductData,
    SearchProductVars
  >(SEARCH_PRODUCT, {
    onCompleted: () => setShowProducts(true)
  });

  const products = pData?.searchProduct || [];

  const [searchManufacturers, { data: mData, loading: mLoading }] = useLazyQuery<
    SearchManufacturerData,
    SearchManufacturerVars
  >(SEARCH_MANUFACTURER, {
    onCompleted: () => setShowManufacturers(true)
  });

  const manufacturers = mData?.searchManufactory || [];

  const [value, setValue] = useState('');

  const [isFocused, setIsFocused] = useState(false);

  const [showResults, setShowResults] = useState(false);

  const [showProducts, setShowProducts] = useState(false);

  const [showManufacturers, setShowManufacturers] = useState(false);

  const [searchType, setSearchType] = useState('product');

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

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
    event.preventDefault();

    if (!value) return;

    router.push({
      pathname: '/products',
      query: {
        search: value
      }
    });

    setShowResults(false);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setShowProducts(false);
    setShowManufacturers(false);
    setShowResults(true);
  };

  return (
    <div className="d-flex justify-content-sm-center justify-content-start flex-grow-1 mr-lg-5 ml-lg-3">
      <ClickAwayListener onClickAway={() => setIsFocused(false)}>
        <div className="search">
          <form onSubmit={handleSubmit} autoComplete="off" acceptCharset="UTF-8">
            <div className="input-group form__input-group">
              <input
                type="search"
                placeholder={t('searchBar:input')}
                aria-label="search"
                className={clsx(
                  'form-control form-control-sm search-input',
                  isSmallScreen && 'w-100'
                )}
                value={value}
                onChange={handleChange}
              />

              <Select
                value={searchType}
                onChange={handleSearchTypeChange}
                className={isSmallScreen && 'width-fit-content'}>
                <option value="product">Theo sản phẩm</option>
                <option value="manufacturer">Theo nhà sản xuất</option>
                <option value="ingredient">Theo hoạt chất</option>
              </Select>

              <div className="input-group-prepend">
                <Button type="submit" variant="primary">
                  {t('searchBar:submit_search')}
                </Button>
              </div>
            </div>
          </form>

          <div className={clsx('elevated search__results', isFocused && showResults && 'show')}>
            {showProducts && (
              <SearchResults
                type="products"
                array={products}
                value={value}
                onTitleClick={() => setIsFocused(false)}
                generateHref={(item) => `/products/${item.slug}`}
                onItemClick={() => setIsFocused(false)}
              />
            )}

            {showManufacturers && (
              <SearchResults
                type="manufacturers"
                array={manufacturers}
                value={value}
                onTitleClick={() => setIsFocused(false)}
                generateHref={(item) => `/products?manufacturer=${item.id}`}
                onItemClick={() => setIsFocused(false)}
              />
            )}

            {(pLoading || mLoading) && (
              <div className="search__result--empty text-center">
                <CircularProgress size={60} />
              </div>
            )}
          </div>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default SearchBar;
