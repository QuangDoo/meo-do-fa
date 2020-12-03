type Props = {
  price: number;
};

const PriceText = (props: Props) => {
  if (!props.price) return null;

  return <>{props.price.toLocaleString('de-DE')}</>;
};

export default PriceText;
