import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PriceText from 'src/components/Form/PriceText';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { useCart } from 'src/contexts/Cart';
import { GET_WEBSITE_CONFIG, GetWebsiteConfigData } from 'src/graphql/configs/getWebsiteConfig';
import { CREATE_COUNSEL } from 'src/graphql/order/order.mutation';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';

import CartItem from './CartItem';
import ConfirmModal from './ConfirmModal';

export default function CartPage() {
  const { cart, checkedCartIDs, setCheckedCartIDs, deleteCarts, checkedCart } = useCart();

  const { t, i18n } = useTranslation(['cart', 'common', 'errors']);

  const [deleteAllIsOpen, setDeleteAllIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const { data: configData } = useQuery<GetWebsiteConfigData, undefined>(GET_WEBSITE_CONFIG);

  const MIN_PRICE = +configData?.getWebsiteConfig.find((config) => config.key === 'MIN_PRICE')
    .value;

  const FREE_SHIP = +configData?.getWebsiteConfig.find((config) => config.key === 'FREESHIP_PRICE')
    .value;

  const [createCounsel, { loading: creatingCounsel }] = useMutationAuth(CREATE_COUNSEL, {
    onCompleted: () => {
      router.push('/checkout');
    },
    onError: (err) => {
      const errorCode = err.graphQLErrors?.[0]?.extensions?.code;

      switch (errorCode) {
        case 121: {
          toast.error(
            t('errors:code_121', {
              name: err.graphQLErrors[0].message.replace(
                'Sales price changed. Please remove product on cart. Product: ',
                ''
              )
            })
          );
          break;
        }
        case 141: {
          toast.error(
            t('errors:code_141', {
              name: err.graphQLErrors[0].message.replace('Product is unvailable. Product:', '')
            })
          );
          break;
        }
        default: {
          toast.error(t(`errors:code_${errorCode}`));
        }
      }
    }
  });

  const handleCheckoutClick = () => {
    if (cart?.carts.length === 0) return;

    const cartIds = checkedCartIDs;

    createCounsel({
      variables: {
        cartIds
      }
    });
  };

  const total = checkedCart?.totalNetPrice - checkedCart?.totalShippingFee;

  const checkoutDisabled = total < MIN_PRICE;

  const enableShippingFee = total > MIN_PRICE && total < FREE_SHIP;

  const handleOpenDeleteAllModal = () => setDeleteAllIsOpen(true);

  const handleCloseDeleteCheckedModal = () => setDeleteAllIsOpen(false);

  const handleConfirmDeleteChecked = () => {
    setDeleteAllIsOpen(false);

    deleteCarts({
      ids: checkedCartIDs
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedCartIDs(cart?.carts.map((item) => item._id));
    } else {
      setCheckedCartIDs([]);
    }
  };

  return (
    <>
      <div className="container py-5">
        <div className="cart">
          <div className="row">
            <div className="col-12 mb-3">
              <h1 className="h3">{t('cart:cart')}</h1>
              {cart?.totalQty !== 0 && (
                <div className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      cart?.carts?.length > 0 && checkedCartIDs?.length === cart?.carts?.length
                    }
                  />
                  <h1 className="h5 ml-2">
                    {t('cart:select_all')}
                    {checkedCartIDs?.length === cart?.carts?.length && ` (${cart?.totalQty})`}
                  </h1>
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className={clsx(cart?.totalQty === 0 ? 'col-md-12' : 'col-md-9', 'col-12')}>
              {cart?.carts
                .slice()
                .reverse()
                .map((item) => (
                  <div key={item._id} className="elevated cart__items mb-3">
                    <CartItem {...item} />
                  </div>
                ))}

              <div className="elevated text-muted p-3 mb-4">
                <i className="fas fa-exclamation-circle mr-1" />
                {t('cart:back_to_products')} <a href="/products">{t('cart:products')}</a>
              </div>
            </div>
            <div className="col-12 col-md-3" hidden={cart?.totalQty === 0}>
              {cart && (
                <div className="cart__info">
                  <div className="elevated row no-gutters mb-2">
                    <div className="col-md-12 col-lg-4 cart__info-quantity">
                      <div className="cart__info-item text-center">
                        <div className="mb-2">
                          <div>{t('cart:quantity')}</div>
                        </div>
                        <div className="cart__quantity text-secondary">
                          <b>{checkedCart?.totalQty}</b>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-8 cart__info-total">
                      <div className="cart__info-item text-center text-lg-right">
                        <div className="mb-2">
                          <div>{t('cart:total')}</div>
                        </div>
                        <div className="cart__total">
                          <PriceText price={total} />
                        </div>
                      </div>
                    </div>

                    <div hidden={!enableShippingFee} className="col-12 p-3 cart__info-total">
                      {t('cart:shipping_fee') + ': '}
                      <PriceText price={checkedCart?.totalShippingFee} />
                    </div>

                    <div className="col-12">
                      <div className="cart__info-item">
                        <button
                          disabled={checkoutDisabled}
                          onClick={handleCheckoutClick}
                          className="btn btn-secondary btn-block text-small">
                          {t('cart:continue_payment')}
                        </button>

                        <div hidden={!checkoutDisabled} className="text-center mt-1">
                          {t('cart:minimum_price') + ' '}
                          <PriceText price={MIN_PRICE} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    hidden={checkedCart?.carts?.length === 0}
                    onClick={handleOpenDeleteAllModal}
                    className="w-100 p-2 btn-link text-danger text-left">
                    <i className="fas fa-fw fa-trash mr-1" />
                    {t('cart:delete_checked_button_label')}
                  </button>

                  <ConfirmModal
                    open={deleteAllIsOpen}
                    title={t('cart:remove_title')}
                    question={t('cart:remove_checked_confirm')}
                    onClose={handleCloseDeleteCheckedModal}
                    onConfirm={handleConfirmDeleteChecked}
                  />

                  <Link href={`${i18n?.language === 'vi' ? '/san-pham' : '/products'}`}>
                    <a className="d-block">
                      <button className="w-100 p-2 btn-link text-left">
                        <i className="fas fa-fw fa-chevron-left mr-1" />
                        {t('cart:continue_order')}
                      </button>
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <LoadingBackdrop open={creatingCounsel} />
    </>
  );
}
