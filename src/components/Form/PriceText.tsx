import { useTranslation } from 'i18n';
import NumberFormat from 'react-number-format';

type Props = {
  price: number;
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
    />
  );
};

export default PriceText;
