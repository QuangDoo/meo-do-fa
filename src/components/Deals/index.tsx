import { useRouter } from 'next/router';
import React from 'react';

import { mockDealsProducts } from '../../mockData/mockDealsProducts';
import Pagination from '../Pagination';
import ProductCard from '../ProductCard';

const pageSize = 25;

const DealsPage = () => {
  const router = useRouter();

  // const page = router.query.page? ||

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
              <Pagination count={5} page={1} onChange={() => null} />
            </div>

            <div className="products__cards mb-3">
              {mockDealsProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  showBadges={false}
                  showCategories={false}
                  {...product}
                />
              ))}
            </div>

            <div className="mb-3">
              <Pagination count={5} page={1} onChange={() => null} />
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default DealsPage;
