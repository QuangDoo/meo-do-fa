import { useTranslation } from 'i18n';
import NumberFormat from 'react-number-format';

type Props = {
  price: number;
  negative?: boolean;
};

const PriceText = (props: Props) => {
  const { t } = useTranslation(['common']);

  return (
    <NumberFormat
      value={props.price}
      displayType="text"
      thousandSeparator="."
      decimalSeparator=","
      suffix={' ' + t('common:vnd')}
      prefix={props.negative && props.price > 0 && '- '}
    />
  );
};

export default PriceText;
