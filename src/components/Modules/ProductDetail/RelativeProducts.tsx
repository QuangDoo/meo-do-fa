import { useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import React from 'react';
import {
  GET_RELATED_PRODUCTS,
  GetRelatedProductsData,
  GetRelatedProductsVars
} from 'src/graphql/product/getRelatedProducts';

import { ProductsContainer } from '../Home/ProductsContainer';
import { ProductsCarousel } from '../ProductsCarousel';

const RelativeProducts = () => {
  const { t } = useTranslation(['productDetail']);

  const { data } = useQuery<GetRelatedProductsData, GetRelatedProductsVars>(GET_RELATED_PRODUCTS, {
    variables: {
      page: 1,
      pageSize: 20
    }
  });

  const relatedProducts = data?.getProductByConditions.Products || [];

  return (
    <ProductsContainer title={t('productDetail:related_product')}>
      <ProductsCarousel products={relatedProducts} slidesToShow={4} />
    </ProductsContainer>
  );
};

export default RelativeProducts;
