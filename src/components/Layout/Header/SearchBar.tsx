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

type SearchResultsProps = {
  items: SearchResult[];
  value: string;
  previousValue: string;
  type: 'products' | 'manufacturers' | 'ingredients';
  loading: boolean;
  allHref: string;
  onAllClick: (value: string) => void;
  onItemClick: (item: SearchResult) => void;
  getItemHref: (item: SearchResult) => string;
};

const SearchResults = (props: SearchResultsProps) => {
  const { t } = useTranslation(['searchBar']);

  if (props.loading) {
    return (
      <div className="search__result--empty text-center">
        <CircularProgress size={60} />
      </div>
    );
  }

  if (!props.items) {
    return null;
  }

  if (props.items.length === 0) {
    return (
      <div className="search__result--empty">
        {t(`searchBar:no_${props.type}`)} <b>{props.value}</b>
      </div>
    );
  }

  return (
    <React.Fragment>
      <button
        className="w-100 text-left border-bottom p-3"
        onClick={() => props.onAllClick(props.value)}>
        <Link href={props.allHref}>
          <a>
            <em>{props.previousValue}</em> {t('searchBar:in')}{' '}
            <b className="text-primary">{t(`searchBar:all_${props.type}`)}</b>
          </a>
        </Link>
      </button>

      {props.items.map((item) => (
        <button
          className="w-100 text-left border-bottom"
          key={item.id}
          onClick={() => props.onItemClick(item)}>
          <Link href={props.getItemHref(item)}>
            <a className="search__result">{item.name}</a>
          </Link>
        </button>
      ))}
    </React.Fragment>
  );
};

const SearchBar = () => {
  const isSmallScreen = useMediaQuery('(max-width:576px)');

  const { t } = useTranslation(['searchBar']);

  const router = useRouter();

  const [searchProducts, { data: productsData, loading: loadingProducts }] = useLazyQuery<
    SearchProductData,
    SearchProductVars
  >(SEARCH_PRODUCT, {
    onCompleted: () => {
      setPreviousValue(value);
    }
  });

  const [
    searchManufacturers,
    { data: manufacturersData, loading: loadingManufacturers }
  ] = useLazyQuery<SearchManufacturerData, SearchManufacturerVars>(SEARCH_MANUFACTURER, {
    onCompleted: () => {
      setPreviousValue(value);
    }
  });

  const [value, setValue] = useState('');

  const [previousValue, setPreviousValue] = useState('');

  const [isFocused, setIsFocused] = useState(false);

  const [showResults, setShowResults] = useState(false);

  const [searchType, setSearchType] = useState<SearchResultsProps['type']>('products');

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  // Search with debounce
  useDebouncedEffect(
    () => {
      if (value === '') {
        setShowResults(false);
      }

      switch (searchType) {
        case 'products':
          searchProducts({
            variables: {
              page: 1,
              pageSize: 15,
              name: value
            }
          });
          break;

        case 'manufacturers':
          searchManufacturers({
            variables: {
              page: 1,
              pageSize: 15,
              name: value
            }
          });
          break;
      }
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
    setShowResults(true);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="d-flex justify-content-sm-center justify-content-start flex-grow-1 mr-lg-5 ml-lg-3">
      <ClickAwayListener onClickAway={handleBlur}>
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
                onFocus={handleFocus}
              />

              <Select
                value={searchType}
                onChange={handleSearchTypeChange}
                className={!isSmallScreen && 'width-fit-content'}>
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
            {searchType === 'products' && (
              <SearchResults
                type="products"
                items={productsData?.searchProduct}
                value={value}
                previousValue={previousValue}
                allHref={`/products?search=${value}`}
                onAllClick={handleBlur}
                getItemHref={(product) => `/products/${product.slug}`}
                onItemClick={handleBlur}
                loading={loadingProducts}
              />
            )}

            {searchType === 'manufacturers' && (
              <SearchResults
                type="manufacturers"
                items={manufacturersData?.searchManufactory || []}
                value={value}
                previousValue={previousValue}
                allHref={`/products?search=${value}`}
                onAllClick={handleBlur}
                getItemHref={(manufacturer) => `/products?manufacturer=${manufacturer.id}`}
                onItemClick={handleBlur}
                loading={loadingManufacturers}
              />
            )}
          </div>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default SearchBar;
