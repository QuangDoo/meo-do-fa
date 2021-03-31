import { Button, Drawer } from '@material-ui/core';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import FilterTags from '../FilterTags';
import ProductsSidebarFilter from '../ProductsSidebarFilter';

const ProductsDrawerFilter = () => {
  const { t } = useTranslation(['productsSidebar']);

  const [open, setOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setOpen(false);
  }, [router.query]);

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
              <ProductsSidebarFilter onClose={() => setOpen(false)} />
            </div>
          </Drawer>
        </div>
      </div>
      <div className="row justify-content-between align-items-center">
        <div className="col-xs"></div>
      </div>
    </div>
  );
};

export default ProductsDrawerFilter;
