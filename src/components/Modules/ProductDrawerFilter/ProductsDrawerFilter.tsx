import { Button, Drawer } from '@material-ui/core';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Category } from 'src/graphql/category/category.query';
import { Manufacturer } from 'src/graphql/manufacturers/manufacturers.query';

import Select from '../../Form/Select';
import FilterTags from '../FilterTags';
import ProductsSidebarFilter from '../ProductsSidebarFilter';

type Props = {
  categories: Category[];
  manufacturers: Manufacturer[];
};

const ProductsDrawerFilter = (props: Props) => {
  const { categories, manufacturers } = props;
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');

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

  const handlePriceRangeFilter = (e) => {
    e.preventDefault();

    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        priceFrom: priceFrom,
        priceTo: priceTo
      }
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-between align-items-center">
        <div className="col-xs">
          <div className="row align-items center">
            <div className="col-xs-4 products__filter-header m-0">{t('productsSidebar:sort')}</div>
            <div className="col-xs-8 px-3">
              <Select onChange={handleSortChange}>
                {/* <option value="01">Sản phẩm mới</option> */}
                {/* <option value="02">Bán chạy nhất</option> */}
                {/* <option value="03">Phù hợp nhất</option> */}
                <option value="04">{t('productsSidebar:price_high_to_low')}</option>
                <option value="05">{t('productsSidebar:price_low_to_high')}</option>
                <option value="06">{t('productsSidebar:name_z_to_a')}</option>
                <option value="07" selected>
                  {t('productsSidebar:name_a_to_z')}
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
      <div className="row justify-content-between align-items-center my-3">
        <div className="col-xs price-filter">
          <form onSubmit={handlePriceRangeFilter}>
            <div className="row justify-content-between align-items-center">
              <div>{t('productsSidebar:price_range')}</div>
              <div className="d-flex align-items-center ml-2">
                <div>
                  <input
                    name="price_from"
                    type="number"
                    min={0}
                    placeholder={t('productsSidebar:price_from')}
                    size={5}
                    value={priceFrom}
                    onChange={(e) => setPriceFrom(e.target.value)}
                  />
                </div>
                &nbsp;-&nbsp;
                <div>
                  <input
                    name="price_to"
                    type="number"
                    min={0}
                    placeholder={t('productsSidebar:price_to')}
                    size={5}
                    value={priceTo}
                    onChange={(e) => setPriceTo(e.target.value)}
                  />
                </div>
              </div>
              <div className="ml-2">
                <button className="btn btn-primary" type="submit">
                  {t('productsSidebar:apply')}
                </button>
              </div>
            </div>
          </form>
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
