import { useMutation } from '@apollo/client';
import clsx from 'clsx';
import { withTranslation } from 'i18n';
import { WithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ADD_TO_CART } from 'src/graphql/order/order.mutation';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import useCart from 'src/hooks/useCart';
import useCountCart from 'src/hooks/useCountCart';

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

  const router = useRouter();

  const { refetchCart } = useCart();

  const { refetchCountCart } = useCountCart();

  const [quantity, setQuantity] = useState<string>('0');

  const [addToCart] = useMutationAuth(ADD_TO_CART);

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
    })
      .then(() => {
        toast.success(t(`errors:add_to_cart_success`));
        refetchCart();
        refetchCountCart();
      })
      .catch((error) => {
        console.log('Add to cart error:', { error });
        toast.error(t(`errors:code_${error.graphQLErrors[0].extensions.code}`));
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

  const handleBlur = () => {
    setQuantity(isNaN(+quantity) ? '0' : +quantity + '');
  };

  return (
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
          onChange={(e) => setQuantity(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />

        <button className="btn btn-sm qty__button qty__button--plus" onClick={handlePlus}>
          <i className="fas fa-plus" />
        </button>
        {router.pathname === '/products/[productId]' ? (
          <button className="ml-2 btn btn-sm qty__button qty__button--plus" onClick={handleClick}>
            <i className="fas fa-check" />
          </button>
        ) : (
          <button className="ml-2 btn btn-sm qty__button qty__button--plus" onClick={handleClick}>
            <i className="fas fa-check" />
          </button>
        )}
      </div>
    </div>
  );
}

export default withTranslation(['errors'])(QuantityInput);
