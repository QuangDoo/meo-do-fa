import { Button, Drawer } from '@material-ui/core';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Category } from 'src/graphql/category/category.query';
import { Manufacturer } from 'src/graphql/manufacturers/manufacturers.query';

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

  // const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   router.push(
  //     {
  //       pathname: router.pathname,
  //       query: {
  //         ...router.query,
  //         sort: event.target.value
  //       }
  //     },
  //     undefined,
  //     { shallow: true }
  //   );
  // };

  return (
    <div className="container">
      <div className="row justify-content-end align-items-center">
        <div className="col-xs">
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            color="primary"
            style={{ borderRadius: '50px' }}>
            <i className="fas fa-filter mr-1"></i>
            {t('productsSidebar:filter')}
          </Button>

          <Drawer anchor="top" open={open}>
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
