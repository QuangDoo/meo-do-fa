type Props = {
  price: number;
};

const PriceText = (props: Props) => {
  if (!props.price && props.price !== 0) return null;

  return <>{props.price.toLocaleString('de-DE')}</>;
};

export default PriceText;
