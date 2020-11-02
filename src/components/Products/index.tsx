import { useLazyQuery } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';
import { Col } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { GET_PRODUCTS } from '../../graphql/product/product.query';
import { Product } from '../../types/Product';
import withApollo from '../../utils/withApollo';
import FilterTags from './FilterTags';
import Pagination from './Pagination';
import ProductList from './ProductList';
import ProductsHeader from './ProductsHeader';
import SideBar from './SideBar';

export const productsPageSize = 20;

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
        pageSize: productsPageSize
      }
    });
  }, [router.query]);

  return (
    <div className="products container-fluid mobile-content my-3 my-sm-5">
      <div className="row flex-nowrap justify-content-between px-lg-5 px-sm-3">
        <div className="products__sidebar pr-4 d-none d-sm-block">
          <SideBar />
        </div>
        <Col span={20} style={{ paddingLeft: '1.5rem' }}>
          <ProductsHeader totalProducts={totalProducts} />

          <FilterTags />

          {products.length > 0 && (
            <Col>
              <Pagination totalProducts={totalProducts} />

              <ProductList products={products} />

              <Pagination totalProducts={totalProducts} />
            </Col>
          )}
        </Col>
      </div>
    </div>
  );
};

export default withApollo({ ssr: true })(Products);
