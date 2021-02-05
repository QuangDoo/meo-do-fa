import { useTranslation } from 'i18n';
import React from 'react';
import { Product } from 'src/graphql/product/getProducts';

import { ProductsContainer } from '../Home/ProductsContainer';
import { ProductsCarousel } from '../ProductsCarousel';

type Products = {
  relatedProducts?: Product[];
};

const RelativeProducts = ({ relatedProducts }: Products) => {
  const { t } = useTranslation(['productDetail']);

  return (
    <ProductsContainer title={t('productDetail:related_product')}>
      <ProductsCarousel products={relatedProducts} slidesToShow={5} />
    </ProductsContainer>
  );
};

export default RelativeProducts;
