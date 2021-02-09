import React from 'react';
import { Product } from 'src/graphql/product/getProducts';
import { ProductDetails } from 'src/graphql/product/product.query';

import ProductBadge from './ProductBadge';

type Props = {
  product: Product | ProductDetails;
};

export default function ProductBadges(props: Props) {
  return (
    <React.Fragment>
      {props.product.is_quick_invoice && <ProductBadge type="invoice_exportable" />}

      {props.product.is_exclusive && <ProductBadge type="only_medofa" />}

      {props.product.is_vn && <ProductBadge type="use_vietnamese" />}

      {!props.product.is_available && <ProductBadge type="out_of_stocks" />}
    </React.Fragment>
  );
}
