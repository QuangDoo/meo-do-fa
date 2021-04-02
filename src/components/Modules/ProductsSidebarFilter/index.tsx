import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'i18n';
import React from 'react';

import FilterTags from '../FilterTags';
import CategoryFilter from './CategoryFilter';
import ManufacturerFilter from './ManufacturerFilter';
import PriceFilter from './PriceFilter';
import Sort from './Sort';

type Props = {
  onClose?: () => void;
};

const ProductsSidebarFilter = (props: Props) => {
  const { t } = useTranslation(['productsSidebar, searchBar']);

  return (
    <aside className="w-100">
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
      <div className="d-sm-none mb-3">
        <hr className="hr my-3 " />

        <FilterTags />

        <hr className="hr my-3" />
      </div>
      <hr className="hr my-3" />

      <Sort />

      <hr className="hr my-3" />

      <PriceFilter />

      <hr className="hr my-3" />

      <CategoryFilter />

      <hr className="hr my-3" />

      <ManufacturerFilter />
    </aside>
  );
};

export default ProductsSidebarFilter;
