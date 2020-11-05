import { useLazyQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { GET_PRODUCTS } from '../../../graphql/product/product.query';
import { mockProducts } from '../../../mockData/mockProducts';
import { mockTotalProducts } from '../../../mockData/mockTotalProducts';
import { Product } from '../../../types/Product';
import Pagination from '../Pagination';
import ProductCard from '../ProductCard';

type Props = {
  page: number;
  pageSize: number;
};

const ProductList = (props: Props): JSX.Element => {
  const { page, pageSize } = props;

  const router = useRouter();

  // Products of the current pagination
  const [products, setProducts] = useState<Product[]>([]);

  // Total products (not just the current products)
  const [totalProducts, setTotalProducts] = useState<number>(0);

  // Get products from api
  const [getProducts, { data }] = useLazyQuery(GET_PRODUCTS);

  // Update products state when data arrives
  useEffect(() => {
    // if (!data) return;

    setProducts(mockProducts);
    setTotalProducts(mockTotalProducts);

    // TOTO: Integration not done
    // setProducts(data.getProducts);

    // TODO: Get total products size, not the length of current products
    // setTotalProducts(data.getProducts.totalProducts);
  }, [data]);

  // Get products again when query changes
  useEffect(() => {
    getProducts({
      variables: {
        page,
        pageSize
      }
    });
  }, [router.query]);

  const CustomPagination = () => (
    <Pagination
      count={Math.ceil(totalProducts / pageSize)}
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

  if (products.length === 0) {
    return null;
  }

  return (
    <main className="products__products">
      <CustomPagination />

      <div className="products__cards mb-3">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>

      <CustomPagination />
    </main>
  );
};

export default ProductList;
