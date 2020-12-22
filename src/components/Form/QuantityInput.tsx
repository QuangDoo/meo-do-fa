import clsx from 'clsx';
import { withTranslation } from 'i18n';
import { WithTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { ADD_TO_CART } from 'src/graphql/order/order.mutation';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import useCart from 'src/hooks/useCart';

type Props = WithTranslation & {
  size?: 'normal' | 'large';
  quantity?: number;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  productId?: string;
  price?: number;
  name?: string;
  product_variant_ids?: string[];
};

function QuantityInput(props: Props) {
  const { size, productId, price, name, t } = props;

  const { refetchCart } = useCart();

  const [quantity, setQuantity] = useState<string>('0');

  const [addToCart, { loading: loadingAddToCart }] = useMutationAuth(ADD_TO_CART, {
    onCompleted: () => {
      toast.success(t(`errors:add_to_cart_success`));
      refetchCart();
    },
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  const handleClick = () => {
    if (+quantity === 0) {
      toast.error(t('errors:add_to_cart_quantity_0'));
      return;
    }

    if (+quantity < 0) {
      toast.error(t('errors:add_to_cart_less_than_0'));
      return;
    }

    addToCart({
      variables: {
        productId,
        quantity: +quantity,
        price,
        productName: name
      }
    });
  };

  const handleMinus = () => {
    setQuantity((quantity) => Math.max(0, +quantity - 1) + '');
  };

  const handlePlus = () => {
    setQuantity((quantity) => +quantity + 1 + '');
  };

  const handleKeyDown = (e) => {
    if ([13, 27].includes(e.keyCode)) {
      e.target.blur();
    }
  };

  const handleChangeNumber = (temp) => {
    if (isNaN(temp)) {
      return;
    }
    temp < 0 ? setQuantity('0') : setQuantity(temp);
  };

  const handleBlur = () => {
    setQuantity(isNaN(+quantity) ? '0' : +quantity + '');
  };

  return (
    <>
      <div className="product_qty">
        <div className={clsx('qty js-qty', size === 'large' && 'qty--lg')}>
          <button className="btn btn-sm qty__button qty__button--minus" onClick={handleMinus}>
            <i className="fas fa-minus" />
          </button>

          <input
            type="tel"
            className="form-control px-1 no-spinner text-center qty__input"
            min={0}
            max={100000}
            value={quantity}
            onChange={(e) => handleChangeNumber(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />

          <button className="btn btn-sm qty__button qty__button--plus" onClick={handlePlus}>
            <i className="fas fa-plus" />
          </button>

          <button className="ml-2 btn btn-sm qty__button qty__button--plus" onClick={handleClick}>
            <i className="fas fa-check" />
          </button>
        </div>
      </div>
      <LoadingBackdrop open={loadingAddToCart} />
    </>
  );
}

export default withTranslation(['errors'])(QuantityInput);
