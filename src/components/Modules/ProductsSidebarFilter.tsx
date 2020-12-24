import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Category } from 'src/graphql/category/category.query';
import { Manufacturer } from 'src/graphql/manufacturers/manufacturers.query';

import Dropdown from '../Form/Dropdown';
import Select from '../Form/Select';

type Props = {
  categories: Category[];
  manufacturers: Manufacturer[];
  onClose?: () => void;
};

const ProductsSidebarFilter = (props: Props) => {
  const { categories, manufacturers } = props;
  const { t } = useTranslation(['productsSidebar']);
  const router = useRouter();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          sort: event.target.value
        }
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <aside className="text-capitalize w-100">
      <header className="products__filters-header d-flex align-items-center justify-content-between">
        <div>
          <span className="text-muted icomoon icon-tune mr-3" />
          {t('search_filters')}
        </div>

        <div className="d-block d-sm-none">
          <IconButton aria-label="close" onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </header>

      <hr className="hr my-3 d-none d-sm-block" />

      <div className="d-none d-sm-block">
        <div className="products__filter-header mb-2">{t('sort')}</div>

        <Select onChange={handleSortChange}>
          {/* <option value="01">Sản phẩm mới</option> */}
          {/* <option value="02">Bán chạy nhất</option> */}
          {/* <option value="03">Phù hợp nhất</option> */}
          <option value="04">{t('price_high_to_low')}</option>
          <option value="05">{t('price_low_to_high')}</option>
          <option value="06">{t('name_z_to_a')}</option>
          <option value="07" selected>
            {t('name_a_to_z')}
          </option>
        </Select>
      </div>

      <hr className="hr my-3" />

      <Dropdown label={t('category')}>
        <div className="mb-2">
          <Link href="/products">
            <a className={clsx('products__filter-category', !router.query.category && 'active')}>
              {t('all')}
            </a>
          </Link>
        </div>
        {categories
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(({ name, id, categorySub }) => (
            <div key={id} className="mb-2">
              <Link href={`/products?category=${id}`}>
                <Dropdown initialShow={false} label={name}>
                  <div className="mb-3">
                    {categorySub
                      .slice()
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map(({ name, id }) => (
                        <div key={id} className="ml-2 mb-1">
                          <Link href={`/products?category=${id}`}>
                            <a
                              className={clsx(
                                'products__filter-category',
                                router.query.category === id.toString() && 'active'
                              )}>
                              {name}
                            </a>
                          </Link>
                        </div>
                      ))}
                  </div>
                </Dropdown>
              </Link>
            </div>
          ))}
      </Dropdown>

      <hr className="hr my-3" />

      <Dropdown label={t('manufacturer')}>
        <div className="input-group form__input-group mb-3">
          <i className="fas fa-search form__input-icon" />
          <input
            type="search"
            className="form-control form-control-sm search-input"
            placeholder={t('search')}
            aria-label="search"
            // value={value}
            // onChange={handleChange}
            // onFocus={() => setIsFocused(true)}
          />
        </div>

        {manufacturers
          .slice()
          .sort((a, b) => a.short_name.localeCompare(b.short_name))
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

        <div>
          <Link href="/manufacturers">
            <a className="products__filter-category">{t('see_more')}</a>
          </Link>
        </div>
      </Dropdown>
    </aside>
  );
};

export default ProductsSidebarFilter;
