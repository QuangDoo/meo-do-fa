// import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
import PriceText from 'src/components/Form/PriceText';
import Loading from 'src/components/Layout/Loading';
import { useCart } from 'src/contexts/Cart';
import { useToken } from 'src/contexts/Token';
// import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
// import { CREATE_COUNSEL } from 'src/graphql/order/order.mutation';
import {
  GET_QUICK_ORDER_PRODUCTS,
  GetQuickOrderProductsData,
  GetQuickOrderProductsVars
} from 'src/graphql/product/getQuickOrderProducts';

import Pagination from '../Pagination';
// import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import QuickOrderItem from './QuickOrderItem';

function QuickOrderPage() {
  const token = useToken();

  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');

  const { data: cart } = useCart();

  const { t } = useTranslation(['cart', 'common', 'quickOrder']);

  useEffect(() => {
    router.query.page = '1';
  }, [searchTerm]);

  const page = +router.query.page || 1;

  const { data: quickOrderData, loading: getQuickOrderLoading } = useQuery<
    GetQuickOrderProductsData,
    GetQuickOrderProductsVars
  >(GET_QUICK_ORDER_PRODUCTS, {
    fetchPolicy: 'network-only',
    variables: {
      page: page,
      pageSize: 10,
      name: searchTerm
    }
  });

  const totalPagination = quickOrderData?.getProductByConditions?.total;
  const handleSearchQuickOrder = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container py-5 quickOrder">
      <div className="cart">
        <div className="row">
          <div className="col-12 mb-3">
            <h1 className="h3">{t('quickOrder:quick_order')}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-9 col-lg-9">
            {token && (
              <div className="product-search elevated cart__items mb-3">
                <input
                  type="text"
                  placeholder={t(`quickOrder:search_quick_order`)}
                  value={searchTerm}
                  onChange={handleSearchQuickOrder}
                />
                <button>
                  <i className="fa fa-search"></i>
                </button>
              </div>
            )}

            <div className="elevated cart__items mb-3">
              {getQuickOrderLoading ? (
                <div className="w-100 text-center">
                  <Loading />
                </div>
              ) : quickOrderData?.getProductByConditions?.Products?.length > 0 ? (
                quickOrderData?.getProductByConditions?.Products?.map((item, index) => (
                  <QuickOrderItem
                    key={index}
                    _id={item.id}
                    image={item.image_512}
                    price={item.old_price}
                    list_price={item.list_price}
                    sale_price={item.sale_price}
                    productId={item.id}
                    productName={item.name}
                    slug={item.slug}
                    discount_percentage={item.discount_percentage}
                  />
                ))
              ) : (
                <>
                  {t(`quickOrder:no_item_search`)} &#34;{searchTerm}&#34;
                </>
              )}
            </div>
          </div>
          <div className="col-12 col-md-3 col-lg-3">
            {token && cart && (
              <div className="cart__info">
                <div className="elevated row no-gutters mb-3">
                  <div className="col-md-12 col-lg-4 cart__info-quantity">
                    <div className="cart__info-item text-center">
                      <div className="mb-2">
                        <div>{t('cart:quantity')}</div>
                      </div>
                      <div className="cart__quantity text-secondary">
                        <b>{cart?.totalQty}</b>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-8 cart__info-total">
                    <div className="cart__info-item text-center text-lg-right">
                      <div className="mb-2">
                        <div>{t('cart:total')}</div>
                      </div>
                      <div className="cart__total">
                        <PriceText price={cart?.totalNetPrice} />
                      </div>
                    </div>
                  </div>
                  {cart?.totalNetPrice > 0 && (
                    <div className="col-12">
                      <div className="cart__info-item">
                        <Link href="/cart">
                          <a className="btn btn-secondary btn-block text-small">
                            {t('quickOrder:view_cart')}
                          </a>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <Pagination
          count={Math.ceil(totalPagination / 12)}
          page={page}
          siblingCount={4}
          onChange={(page) => {
            router.push({
              pathname: router.pathname,
              query: {
                ...router.query,
                page: page
              }
            });
          }}
        />
      </div>
    </div>
  );
}

export default QuickOrderPage;
