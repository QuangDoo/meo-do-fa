import { withTranslation } from 'i18n';
import { WithTranslation } from 'next-i18next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UPDATE_CART, UpdateCartData, UpdateCartVars } from 'src/graphql/cart/updateCart.mutation';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import useCart from 'src/hooks/useCart';

import { ProductPrice } from '../ProductCard/ProductPrice';
import ConfirmDeleteModal from './ConfirmDeleteModal';

type Props = WithTranslation & {
  image: string;

  productName: string;

  productId: string;

  uom_name: string;

  price: number;

  standard_price: number;

  quantity: number;

  _id: string;

  refetchCart?: () => void;
};

function CartItem(props: Props): JSX.Element {
  const { t } = props;

  const [open, setOpen] = useState(false);

  // const [isImportant, setIsImportant] = useState(false);

  const [quantity, setQuantity] = useState<string>(props.quantity.toString());

  const { refetchCart } = useCart();

  const [updateCart, { data, error }] = useMutationAuth(UPDATE_CART);

  // onCompleted
  useEffect(() => {
    if (!data) return;

    toast.success('Update cart success');
    refetchCart();
  }, [data]);

  // onError
  useEffect(() => {
    if (!error) return;

    console.log('Update cart error:', { error });
    toast.error('Update cart error:' + error);
  }, [error]);

  const handlePlusClick = () => {
    const newQty = props.quantity + 1;

    updateCart({
      variables: {
        inputs: {
          _id: props._id,
          quantity: newQty
        }
      }
    });
  };

  const handleMinusClick = () => {
    const newQty = props.quantity - 1;

    if (newQty === 0) {
      toast.error(<div>{t('cart:quantity_smaller_than_1')}</div>);
      return;
    }

    updateCart({
      variables: {
        inputs: {
          _id: props._id,
          quantity: newQty
        }
      }
    });
  };

  // Blur on Esc or Enter
  const handleKeyDown = (e) => {
    if ([13, 27].includes(e.keyCode)) {
      e.target.blur();
    }
  };

  const handleBlur = () => {
    const newQuantity = +quantity;

    if (isNaN(newQuantity) || newQuantity === props.quantity) {
      setQuantity(props.quantity + '');
      return;
    }

    setQuantity(newQuantity + '');

    updateCart({
      variables: {
        inputs: {
          _id: props._id,
          quantity: newQuantity
        }
      }
    });
  };

  return (
    <div className="cart-item">
      <div className="row align-items-center">
        <div className="col-7 d-flex align-items-center pl-4">
          {/* <button
            className={clsx('cart-item__important-btn', isImportant ? 'active' : 'inactive')}
            onClick={() => setIsImportant((isImportant) => !isImportant)}>
            <i className="fas fa-star" />
          </button> */}
          <div
            className="cart-item__image lozad mr-2 loaded"
            style={{
              backgroundImage:
                props.image && props.image.length > 0
                  ? `url(data:image/png;base64,${props.image})`
                  : `url('/assets/images/no-image.jpg')`
            }}
          />

          <div>
            <Link href={'products/' + props.productId}>
              <a className="cart-item__name" title={props.productName}>
                {props.productName}
              </a>
            </Link>

            <div className="cart-item__package">
              <small>{props.uom_name}</small>
            </div>
          </div>
        </div>

        <div className="col-5 d-flex justify-content-between align-items-center">
          <div className="w-100">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <ProductPrice price={props.list_price} standard_price={props.standard_price} />
              </div>

              <div className="cart-item__qty">
                <div className="qty js-qty">
                  <button
                    className="btn btn-sm qty__button qty__button--minus"
                    onClick={handleMinusClick}>
                    <i className="fas fa-minus" />
                  </button>

                  <input
                    type="tel"
                    className="form-control px-1 no-spinner text-center qty__input"
                    min={0}
                    max={100000}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                  />

                  <button
                    className="btn btn-sm qty__button qty__button--plus"
                    onClick={handlePlusClick}>
                    <i className="fas fa-plus" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="ml-3">
            <button onClick={() => setOpen(true)} className="cart-item__remove">
              <i className="fas fa-trash" />
            </button>
          </div>
        </div>

        {/* {props.limit && (
          <div className="col-12">
            <small className="text-danger">
              Số lượng có hạn! Hãy mau thanh toán để được hưởng giá ưu đãi.
            </small>
          </div>
        )} */}
      </div>

      <ConfirmDeleteModal
        open={open}
        onClose={() => setOpen(false)}
        productName={props.productName}
        image={props.image}
        price={props.price}
        _id={props._id}
      />
    </div>
  );
}

export default withTranslation(['cart'])(CartItem);
