import { Button, Drawer } from '@material-ui/core';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Category } from 'src/graphql/category/category.query';
import { Manufacturer } from 'src/graphql/manufacturers/manufacturers.query';

import Dropdown from '../../Form/Dropdown';
import Select from '../../Form/Select';
import FilterTags from '../FilterTags';
import ProductsSidebarFilter from '../ProductsSidebarFilter';

type Props = {
  categories: Category[];
  manufacturers: Manufacturer[];
};

const ProductsDrawerFilter = (props: Props) => {
  const { categories, manufacturers } = props;

  const { t } = useTranslation(['productsSidebar']);

  const router = useRouter();

  const [open, setOpen] = useState(false);

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
    <div className="container">
      <div className="row justify-content-between align-items-center">
        <div className="col-xs">
          <div className="row align-items center">
            <div className="col-xs-4 products__filter-header m-0">{t('sort')}</div>
            <div className="col-xs-8 px-3">
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
          </div>
        </div>
        <div className="col-xs">
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            color="primary"
            style={{ borderRadius: '50px' }}>
            <i className="fas fa-filter mr-1"></i>
            {t('productsSidebar:filter')}
          </Button>

          <Drawer anchor="top" open={open} onClose={() => setOpen(false)}>
            <div className="p-3 min-vh-100">
              <ProductsSidebarFilter
                categories={categories}
                manufacturers={manufacturers}
                onClose={() => setOpen(false)}
              />
            </div>
          </Drawer>
        </div>
      </div>
      <div className="row justify-content-between align-items-center">
        <div className="col-xs">
          <FilterTags />
        </div>
      </div>
    </div>
  );
};

export default ProductsDrawerFilter;
