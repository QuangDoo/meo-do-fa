import clsx from 'clsx';
import React, { useState } from 'react';

type Props = {
  size?: 'normal' | 'large';
  quantity: number;
};

function QuantityInput(props: Props) {
  const { size } = props;

  const [quantity, setQuantity] = useState(props.quantity);

  const plus = () => {
    setQuantity(quantity + 1);
  };

  const minus = () => {
    setQuantity(quantity - 1);
  };

  return (
    <div className={clsx('qty js-qty', size === 'large' && 'qty--lg')}>
      <button className="btn btn-sm qty__button qty__button--minus" onClick={minus}>
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
