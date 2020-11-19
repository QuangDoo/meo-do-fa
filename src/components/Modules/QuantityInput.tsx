import { useMutation } from '@apollo/react-hooks';
import clsx from 'clsx';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useCart } from 'src/contexts/Cart';
import { ADD_TO_CART } from 'src/graphql/order/order.mutation';

type Props = {
  size?: 'normal' | 'large';
  quantity?: number;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  productId?: string;
  price?: number;
  name?: string;
  product_variant_ids?: string[];
};

function QuantityInput(props: Props) {
  const { size, productId, price, name } = props;

  const { refetchCart } = useCart();

  const [quantity, setQuantity] = useState<string>('0');

  const [addToCart] = useMutation(ADD_TO_CART, {
    onCompleted: (data) => {
      if (data.createCart.code !== 200) return;

      toast.success('Add to cart success');
      refetchCart();
    },
    onError: (error) => {
      toast.error('Add to cart error: ' + error.message);
    }
  });

  const handleClick = () => {
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
    if (e.keyCode === 13) {
      e.target.blur();
    }
  };

  const handleBlur = () => {
    setQuantity(isNaN(+quantity) ? '0' : +quantity + '');
  };

  return (
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

      <button className="ml-2 btn btn-sm qty__button qty__button--plus" onClick={handleClick}>
        <i className="fas fa-check" />
      </button>
    </div>
  );
}

export default QuantityInput;
