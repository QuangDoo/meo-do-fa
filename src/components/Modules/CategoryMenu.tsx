import { useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-toastify';
import { GET_CATEGORIES_LEVEL, GetCategoriesLevelData } from 'src/graphql/category/category.query';

const CategoryMenu = () => {
  const { t } = useTranslation(['navbar']);
  const { data: categoriesData } = useQuery<GetCategoriesLevelData, undefined>(
    GET_CATEGORIES_LEVEL,
    {
      onError: (error) => {
        toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
      }
    }
  );
  const categories = categoriesData?.getCategoriesLevel || [];

  return (
    <li className="category-menu rockland-nav__item">
      <div className="menu-title">
        <Link href="/products">
          <a className="rockland-nav__link">
            <i className="rockland-nav__icon fas fa-list-ul" />
            <span className="rockland-nav__title">{t('navbar:category')}</span>
          </a>
        </Link>
      </div>
      <ul className="container-menu">
        {categories.map(({ id, name, categorySub, priority }) => (
          <li className="menu-item" key={id}>
            <div className="item-title">
              <img
                src={`/assets/images/category_${priority}.png`}
                className="menu-icon"
                alt={`category-item-${priority}`}
                width="60"
                height="30"
              />
              <Link href={`/products?category=${id}`}>
                <a className="item-link">{name}</a>
              </Link>
            </div>
            <div className="sub-menu">
              <ul>
                {categorySub.map(({ id, name }) => (
                  <li className="sub-menu-item" key={id}>
                    <Link href={`/products?category=${id}`}>
                      <a className="sub-item-link">{name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default CategoryMenu;
