import { useLazyQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Button from 'src/components/Form/Button';
import Select from 'src/components/Form/Select';
import {
  SEARCH_INGREDIENT,
  SearchIngredientData,
  SearchIngredientVars
} from 'src/graphql/search/searchIngredients';
import {
  SEARCH_MANUFACTURER,
  SearchManufacturerData,
  SearchManufacturerVars
} from 'src/graphql/search/searchManufacturers';
import {
  SEARCH_PRODUCT,
  SearchProductData,
  SearchProductVars,
  SearchResult
} from 'src/graphql/search/searchProducts';
import { useDebouncedEffect } from 'src/hooks/useDebouncedEffect';

const underlinedString = (str) => {
  return `<u>${str}</u>`;
};

type SearchType = 'products' | 'manufacturers' | 'ingredients';

type SearchResultsProps = {
  items: SearchResult[];
  value: string;
  previousValue: string;
  type: SearchType;
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

  const keywordInName = new RegExp(props.previousValue, 'gi');

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
            <a
              className="search__result"
              dangerouslySetInnerHTML={{
                __html: item.name.replace(keywordInName, underlinedString)
              }}
            />
          </Link>
        </button>
      ))}
    </React.Fragment>
  );
};

const SearchBar = () => {
  const { t } = useTranslation(['searchBar']);

  const router = useRouter();

  const [searchProducts, { data: productsData, loading: loadingProducts }] = useLazyQuery<
    SearchProductData,
    SearchProductVars
  >(SEARCH_PRODUCT);

  const [
    searchManufacturers,
    { data: manufacturersData, loading: loadingManufacturers }
  ] = useLazyQuery<SearchManufacturerData, SearchManufacturerVars>(SEARCH_MANUFACTURER);

  const [searchIngredients, { data: ingredientsData, loading: loadingIngredients }] = useLazyQuery<
    SearchIngredientData,
    SearchIngredientVars
  >(SEARCH_INGREDIENT);

  const [value, setValue] = useState('');

  const [previousValue, setPreviousValue] = useState('');

  const [isFocused, setIsFocused] = useState(false);

  const [type, setType] = useState<SearchResultsProps['type']>('products');

  const runSearch = (type: SearchType) => {
    const options = {
      variables: {
        page: 1,
        pageSize: 15,
        name: value
      }
    };

    switch (type) {
      case 'products':
        searchProducts(options);
        break;

      case 'manufacturers':
        searchManufacturers(options);
        break;

      case 'ingredients':
        searchIngredients(options);
        break;
    }
  };

  // Search with debounce
  useDebouncedEffect(
    () => {
      setPreviousValue(value);

      runSearch(type);
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
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleSearchTypeChange = (e) => {
    setType(e.target.value);
    runSearch(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const loading = loadingProducts || loadingManufacturers || loadingIngredients;

  const showResultWindow =
    (loading || productsData || manufacturersData || ingredientsData) && previousValue && isFocused;

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
                className="form-control form-control-sm search-input"
                value={value}
                onChange={handleValueChange}
                onFocus={handleFocus}
              />

              <Select value={type} onChange={handleSearchTypeChange} className="search-type-select">
                <option value="products">Theo sản phẩm</option>
                <option value="manufacturers">Theo nhà sản xuất</option>
                {/* <option value="ingredients">Theo hoạt chất</option> */}
              </Select>

              <div className="input-group-prepend">
                <Button type="submit" variant="primary">
                  {t('searchBar:submit_search')}
                </Button>
              </div>
            </div>
          </form>

          <div className={clsx('elevated search__results', showResultWindow && 'show')}>
            {type === 'products' && (
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

            {type === 'manufacturers' && (
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

            {type === 'ingredients' && (
              <SearchResults
                type="ingredients"
                items={ingredientsData?.searchIngredient || []}
                value={value}
                previousValue={previousValue}
                allHref={`/ingredients?search=${value}`}
                onAllClick={handleBlur}
                getItemHref={(ingredient) => `/ingredients/${ingredient.slug}`}
                onItemClick={handleBlur}
                loading={loadingIngredients}
              />
            )}
          </div>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default SearchBar;
