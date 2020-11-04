import { useLazyQuery } from '@apollo/react-hooks';
import { Col } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { GET_PRODUCTS } from '../../graphql/product/product.query';
import { mockProducts } from '../../mockData/mockProducts';
import { mockTotalProducts } from '../../mockData/mockTotalProducts';
import { Product } from '../../types/Product';
import withApollo from '../../utils/withApollo';
import Pagination from '../Pagination';
import FilterTags from './BadgeTags';
import ProductList from './ProductList';
import ProductsHeader from './ProductsHeader';
import SideBar from './SidebarFilter';

const pageSize = 20;

const Products = (): JSX.Element => {
  const router = useRouter();

  // Products of the current pagination
  const [products, setProducts] = useState<Product[]>([]);

  // Total products (not just the current products)
  const [totalProducts, setTotalProducts] = useState<number>(0);

  // Get products from api
  const [getProducts, { data }] = useLazyQuery(GET_PRODUCTS);

  // Update products state when data arrives
  useEffect(() => {
    if (!data) return;

    setProducts(data.getProducts);

    // TODO: Get total products size, not the length of current products
    setTotalProducts(data.getProducts.totalProducts);
  }, [data]);

  // Get products again when query changes
  // TODO: Add variables for categories and manufacturers, based on query on router
  // ?category=abcxyz
  // ?manufacturer=abcxyz
  useEffect(() => {
    getProducts({
      variables: {
        page: +(router.query.page as string) || 1,
        pageSize: pageSize
      }
    });
  }, [router.query]);

  const page = +(router.query.page as string) || 1;

  const CustomPagination = () => (
    <Pagination
      count={Math.ceil(mockTotalProducts / pageSize)}
      page={page}
      siblingCount={4}
      onChange={(page) =>
        router.push({
          pathname: router.pathname,
          query: {
            ...router.query,
            page: page
          }
        })
      }
    />
  );

  return (
    <div className="products container-fluid mobile-content my-3 my-sm-5">
      <div className="row flex-nowrap justify-content-between px-lg-5 px-sm-3">
        <div className="products__sidebar pr-4 d-none d-sm-block">
          <SideBar />
        </div>
        <Col span={20} style={{ paddingLeft: '1.5rem' }}>
          <ProductsHeader totalProducts={mockTotalProducts} page={page} pageSize={pageSize} />

          <FilterTags />

          {mockProducts.length > 0 && (
            <Col>
              <CustomPagination />

              <ProductList products={mockProducts} />

              <CustomPagination />
            </Col>
          )}
        </Col>
      </div>
    </div>
  );
};

export default withApollo({ ssr: true })(Products);
