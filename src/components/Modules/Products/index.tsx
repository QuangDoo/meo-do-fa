import { useRouter } from 'next/router';
import React from 'react';
import { Category } from 'src/types/Category';

import { mockTotalProducts } from '../../../mockData/mockTotalProducts';
import withApollo from '../../../utils/withApollo';
import FilterTags from './BadgeTags';
import ProductList from './ProductList';
import ProductsHeader from './ProductsHeader';
import SidebarFilter from './SidebarFilter';

const pageSize = 20;

type Props = {
  categories: Category[];
};

const Products = (props: Props) => {
  const router = useRouter();

  const page = +router.query.page || 1;

  return (
    <div className="products container-fluid mobile-content my-3 my-sm-5">
      <div className="row flex-nowrap justify-content-between px-lg-5 px-sm-3">
        <div className="products__sidebar pr-4 d-none d-sm-block">
          <SidebarFilter />
        </div>

        <div className="flex-grow-1">
          <ProductsHeader totalProducts={mockTotalProducts} page={page} pageSize={pageSize} />

          <FilterTags />

          <ProductList page={page} pageSize={pageSize} />
        </div>
      </div>
    </div>
  );
};

export default withApollo({ ssr: true })(Products);
