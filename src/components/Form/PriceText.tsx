import { useTranslation } from 'i18n';

type Props = {
  price: number;
};

const PriceText = (props: Props) => {
  const { t } = useTranslation(['common']);

  if (!props.price && props.price !== 0) return null;

  return <>{`${props.price.toLocaleString('de-DE')} ${t('common:vnd')}`}</>;
};

export default PriceText;
