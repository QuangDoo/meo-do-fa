import { useQuery } from '@apollo/client';
import { Drawer, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Category,
  GET_CATEGORIES_LEVEL,
  GetCategoriesLevelData
} from 'src/graphql/category/getCategoriesLevel';

import Dropdown from '../../Form/Dropdown';
import I18nLink from '../Link/I18nLink';

type Props = {
  categories: Category[];
  onClose: () => void;
};
const CategoryDropdownMenu = (props: Props) => {
  const { t, i18n } = useTranslation(['navbar']);
  const { categories, onClose } = props;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 text-uppercase">
        <div>
          <span className="text-muted icomoon icon-tune mr-3" />
          {t('navbar:product_category')}
        </div>

        <div className="d-block d-sm-none">
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      {categories.map(({ name, id, categorySub }) => (
        <div key={id} className="mb-2">
          <Link href={`${i18n?.language === 'vi' ? '/san-pham' : '/products'}?category=${id}`}>
            <Dropdown initialShow={false} label={name}>
              <div className="mb-3">
                {categorySub
                  .slice()
                  .sort((a, b) => a.name?.localeCompare(b.name))
                  .map(({ name, id }) => (
                    <div key={id} className="ml-2 mb-1">
                      <Link
                        href={`${
                          i18n?.language === 'vi' ? '/san-pham' : '/products'
                        }?category=${id}`}>
                        <a
                          type="button"
                          role="button"
                          onClick={onClose}
                          onKeyDown={onClose}
                          tabIndex={0}
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
    </>
  );
};

const CategoryMenu = () => {
  const { t, i18n } = useTranslation(['navbar']);
  const [open, setOpen] = useState(false);

  const { data: categoriesData, refetch } = useQuery<GetCategoriesLevelData, undefined>(
    GET_CATEGORIES_LEVEL,
    {
      onError: (error) => {
        toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
      }
    }
  );
  const categories = categoriesData?.getCategoriesLevel || [];

  useEffect(() => {
    if (categories[1]?.name === null && categories[2].name === null) {
      refetch();
    }
  }, [categoriesData]);

  return (
    <>
      <li className="main-menu rockland-nav__item d-none d-sm-block">
        <div className="menu-title">
          {/* <I18nLink href="/products" className="rockland-nav__link">
            <img className="nav__icon" src="/assets/images/sanpham.png" alt="icon_product" />
            <span className="rockland-nav__title">{t('navbar:product_category')}</span>
          </I18nLink> */}
          <Link href={`${i18n?.language === 'vi' ? '/san-pham' : '/products'}`}>
            <a className="rockland-nav__link">
              <img className="nav__icon" src="/assets/images/sanpham.png" alt="icon_product" />
              <span className="rockland-nav__title">{t('navbar:product_category')}</span>
            </a>
          </Link>
        </div>
        <ul className="container-menu">
          {categories.map(({ id, name, categorySub, priority }) => (
            <I18nLink
              href={`${i18n?.language === 'vi' ? '/san-pham' : '/products'}?category=${id}`}
              key={id}>
              <li className="menu-item">
                <div className="item-title">
                  <img
                    src={`/assets/images/cate_${priority}.png`}
                    className="menu-icon"
                    alt={`category-item-${priority}`}
                    width="60"
                    height="30"
                  />
                  {/* <Link href={`/products?category=${id}`}> */}
                  <a className="item-link">{name}</a>
                  {/* </Link> */}
                </div>
                <div className="sub-menu">
                  <ul>
                    {categorySub?.map(({ id, name }) => (
                      <Link
                        href={`${
                          i18n?.language === 'vi' ? '/san-pham' : '/products'
                        }?category=${id}`}
                        key={id}>
                        <li className="sub-menu-item">
                          <a className="sub-item-link">{name}</a>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              </li>
            </I18nLink>
          ))}
        </ul>
      </li>
      <li className="category-menu rockland-nav__item d-block d-sm-none">
        <div className="menu-title">
          <button onClick={() => setOpen(true)}>
            <a className="rockland-nav__link">
              <i className="rockland-nav__icon fas fa-list-ul" />
              <span className="rockland-nav__title">{t('navbar:product_category')}</span>
            </a>
          </button>
        </div>
        <Drawer anchor="top" open={open} onClose={() => setOpen(false)}>
          <div className="p-3 min-vh-100">
            <CategoryDropdownMenu categories={categories} onClose={() => setOpen(false)} />
          </div>
        </Drawer>
      </li>
    </>
  );
};

export default CategoryMenu;
