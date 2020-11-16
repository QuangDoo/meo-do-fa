import { useMutation } from '@apollo/react-hooks';
import clsx from 'clsx';
import React from 'react';
import { useOrder } from 'src/contexts/Order';
import { ADD_TO_CART } from 'src/graphql/order/order.mutation';

type Props = {
  size?: 'normal' | 'large';
  quantity: number;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  productId?: string;
  price?: number;
  name?: string;
  product_variant_ids?: string[];
};

function QuantityInput(props: Props) {
  const { addToCart } = useOrder();

  const { size, productId, quantity, price, name } = props;

  const plus = () => {
    addToCart({
      variables: {
        productId,
        quantity: quantity + 1,
        price,
        productName: name
      }
    });
  };

  return (
    <div className={clsx('qty js-qty', size === 'large' && 'qty--lg')}>
      <button
        className="btn btn-sm qty__button qty__button--minus"
        onClick={() => console.log('tru')}>
        <i className="fas fa-minus" />
      </button>

      <input
        type="tel"
        name="item_quantity"
        className="form-control px-1 no-spinner text-center qty__input"
        inputMode="numeric"
        min={0}
        max={100000}
        step={1}
        autoComplete="off"
        placeholder="0"
        value={quantity}
        onChange={props.handleChange}
      />

      <button className="btn btn-sm qty__button qty__button--plus" onClick={plus}>
        <i className="fas fa-plus" />
      </button>
    </div>
  );
}
export default QuantityInput;
