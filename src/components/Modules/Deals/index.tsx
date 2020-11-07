import { useLazyQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { GET_PRODUCTS } from 'src/graphql/product/product.query';
import { mockDealsProducts } from 'src/mockData/mockDealsProducts';
import { Product } from 'src/types/Product';

import Pagination from '../Pagination';
import ProductCard from '../ProductCard';

const pageSize = 25;

const DealsPage = () => {
  const router = useRouter();

  const page = +router.query.page || 1;

  const [products, setProducts] = useState<Product[]>([]);

  // Get products from api
  const [getProducts, { data }] = useLazyQuery(GET_PRODUCTS);

  console.log('deals rendered');

  const changePage = (page: number) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: page
      }
    });
  };

  useEffect(() => {
    setProducts(mockDealsProducts);
    getProducts({
      variables: {
        page: page,
        pageSize: pageSize
      }
    });
  }, [router.query.page]);

  return (
    <section className="deals deals--mobile py-5">
      <div className="container px-0">
        <div className="row no-gutters">
          <div className="col-12 mb-3 px-3 text-white">
            <h1 className="text-white">Khuyến mãi</h1>

            <p>
              Cập nhật hàng ngày tất cả những deal giá ưu đãi trên thuocsi. Hãy bookmark trang này
              (nhấn Ctrl+D) và quay lại thường xuyên để không bỏ lỡ bạn nhé!
            </p>
          </div>

          <main className="col-12">
            <div className="mb-3">
              <Pagination count={5} page={page} onChange={changePage} />
            </div>

            <div className="products__cards mb-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  showBadges={false}
                  showCategories={false}
                  {...product}
                />
              ))}
            </div>

            <div className="mb-3">
              <Pagination count={5} page={page} onChange={changePage} />
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default DealsPage;
