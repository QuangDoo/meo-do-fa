import React, { useEffect } from 'react';
import toNumbersOnly from 'src/utils/removeNonNumerics';

type Props = {
  quantity: number;
  setQuantity?: React.Dispatch<React.SetStateAction<number>>;
  onMinusClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onPlusClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  isAvailable?: boolean;
};

export default function QuantityInput(props: Props) {
  const {
    quantity,
    setQuantity,
    min,
    max,
    onChange,
    onKeyDown,
    onBlur,
    onMinusClick,
    onPlusClick,
    isAvailable
  } = props;

  useEffect(() => {
    if (quantity < min) {
      setQuantity(min);
    }
  }, [min]);

  useEffect(() => {
    if (quantity > max) {
      setQuantity(max);
    }
  }, [max]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);

    if (setQuantity) {
      const newValue = toNumbersOnly(event.target.value);

      if (max !== undefined && newValue > max) {
        setQuantity(max);
        return;
      }

      if (min !== undefined && newValue < min) {
        setQuantity(min);
        return;
      }

      setQuantity(newValue);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);

    if (event.key === 'Enter') {
      event.currentTarget.blur();
    }
  };

  return (
    <div className="qty js-qty">
      <button
        disabled={quantity <= min || !isAvailable}
        className="btn btn-sm qty__button qty__button--minus"
        onClick={onMinusClick}>
        <i className="fas fa-minus" />
      </button>

      <input
        type="tel"
        className="form-control px-1 no-spinner text-center qty__input"
        min={min}
        max={max}
        value={quantity}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={onBlur}
      />

      <button
        disabled={quantity >= max || !isAvailable}
        className="btn btn-sm qty__button qty__button--plus"
        onClick={onPlusClick}>
        <i className="fas fa-plus" />
      </button>
    </div>
  );
}
