import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Dropdown from 'src/components/Form/Dropdown';
import { Manufacturer } from 'src/graphql/manufacturers/manufacturers.query';

import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import Sort from './Sort';

type Props = {
  manufacturers: Manufacturer[];
  onClose?: () => void;
};

const ProductsSidebarFilter = (props: Props) => {
  const { manufacturers } = props;

  const { t } = useTranslation(['productsSidebar, searchBar']);

  const router = useRouter();

  const handleManufacturersSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    router.push({
      pathname: '/manufacturers'
    });
    event.preventDefault();
  };

  const [valueManuInput, setValueManuInput] = useState('');

  const onValueManuChange = (e) => {
    e.preventDefault();
    setValueManuInput(e.target.value);
  };

  const manufacturersSearch = [...manufacturers]
    .slice()
    .sort((a, b) => a.short_name?.localeCompare(b.short_name))
    .filter(({ short_name, id }) => {
      if (short_name.toLocaleLowerCase().includes(valueManuInput.toLocaleLowerCase())) {
        return [short_name, id];
      }
    });

  return (
    <aside className="text-capitalize w-100">
      <header className="products__filters-header d-flex align-items-center justify-content-between">
        <div>
          <span className="text-muted icomoon icon-tune mr-3" />
          {t('productsSidebar:search_filters')}
        </div>

        <div className="d-block d-sm-none">
          <IconButton aria-label="close" onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </header>

      <hr className="hr my-3" />

      <Sort />

      <hr className="hr my-3" />

      <PriceFilter />

      <hr className="hr my-3" />

      <CategoryFilter />

      <hr className="hr my-3" />

      <Dropdown label={t('productsSidebar:manufacturer')}>
        <form onSubmit={handleManufacturersSubmit} autoComplete="off" acceptCharset="UTF-8">
          <div className="input-group form__input-group mb-3">
            <button>
              <i className="fas fa-search form__input-icon" />
            </button>

            <input
              type="search"
              className="form-control form-control-sm search-input"
              placeholder={t('searchBar:enter_name_manufacturers')}
              aria-label="search"
              onChange={onValueManuChange}
              onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault();
              }}
            />
          </div>
        </form>
        <div className="mb-2">
          <Link href="/manufacturers">
            <a
              className={clsx(
                'products__filter-category',
                !router.query.manufacturers && 'active'
              )}>
              {t('productsSidebar:all')}
            </a>
          </Link>
        </div>

        {valueManuInput
          ? manufacturersSearch
              .slice()
              .sort((a, b) => a.short_name?.localeCompare(b.short_name))
              .map(({ short_name, id }) => (
                <div key={id} className="mb-2">
                  <Link href={`/products?manufacturer=${id}`}>
                    <a
                      className={clsx(
                        'products__filter-category',
                        router.query.manufacturer === id.toString() && 'active'
                      )}>
                      {short_name}
                    </a>
                  </Link>
                </div>
              ))
          : manufacturers
              .slice()
              .sort((a, b) => a.short_name?.localeCompare(b.short_name))
              .map(({ short_name, id }) => (
                <div key={id} className="mb-2">
                  <Link href={`/products?manufacturer=${id}`}>
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
        {valueManuInput && manufacturersSearch.length === 0 && (
          <>
            <div className="search__result--empty">
              {t('searchBar:no_manufacturer')} <b>{valueManuInput}</b>
            </div>
            <hr />
          </>
        )}
        <div>
          <Link href="/manufacturers">
            <a className="products__filter-category">{t('productsSidebar:see_more')}</a>
          </Link>
        </div>
      </Dropdown>
    </aside>
  );
};

export default ProductsSidebarFilter;
