// import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import React from 'react';
// import { toast } from 'react-toastify';
import PriceText from 'src/components/Form/PriceText';
import Loading from 'src/components/Layout/Loading';
import { useToken } from 'src/contexts/Token';
// import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
// import { CREATE_COUNSEL } from 'src/graphql/order/order.mutation';
import {
  GET_BEST_SELLING_PRODUCTS,
  GetBestSellingProductsData,
  GetBestSellingProductsVars
} from 'src/graphql/product/getBestSellingProducts';
import useCart from 'src/hooks/useCart';

// import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import QuickOrderItem from './QuickOrderItem';

function QuickOrderPage() {
  const token = useToken();

  const { cart } = useCart();

  const { t } = useTranslation(['cart', 'common', 'quickOrder']);

  // const router = useRouter();

  const paginationVars = {
    variables: {
      page: 1,
      pageSize: 10
    }
  };

  const { data: bestSellingData, loading: getBestSellingLoading } = useQuery<
    GetBestSellingProductsData,
    GetBestSellingProductsVars
  >(GET_BEST_SELLING_PRODUCTS, paginationVars);

  return (
    <div className="container py-5">
      <div className="cart">
        <div className="row">
          <div className="col-12 mb-3">
            <h1 className="h3">{t('quickOrder:quick_order')}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-9 col-lg-9">
            <div className="elevated cart__items mb-3">
              {getBestSellingLoading ? (
                <div className="w-100 text-center">
                  <Loading />
                </div>
              ) : (
                bestSellingData?.getProductByConditions.Products.map((item, index) => (
                  <QuickOrderItem
                    key={index}
                    _id={item.id}
                    image={item.image_512}
                    price={item.old_price}
                    list_price={item.list_price}
                    sale_price={item.sale_price}
                    productId={item.id}
                    productName={item.name}
                    quantity={0}
                    uom_name="Unit"
                    slug={item.slug}
                    discount_percentage={item.discount_percentage}
                  />
                ))
              )}
            </div>
            {/* <div className="elevated text-muted p-3 mb-4">
              <i className="fas fa-exclamation-circle mr-1" />
              {t('cart:back_to_products')} <a href="/products">{t('cart:products')}</a>
            </div> */}
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
                        <b>{cart?.getCart.totalQty}</b>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-8 cart__info-total">
                    <div className="cart__info-item text-center text-lg-right">
                      <div className="mb-2">
                        <div>{t('cart:total')}</div>
                      </div>
                      <div className="cart__total">
                        <PriceText price={cart?.getCart.totalPrice} />
                        <span className="unit">{t('common:vnd')}</span>
                      </div>
                    </div>
                  </div>
                  {cart?.getCart.totalPrice > 0 && (
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
      </div>
    </div>
  );
}

export default QuickOrderPage;
