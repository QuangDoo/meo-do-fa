import Link from 'next/link';
import React from 'react';

type ProductImageProps = {
  imageId: string;
  productId: string;
};

export const ProductImage = (props: ProductImageProps): JSX.Element => {
  return (
    <Link href={`/products/${props.productId}`}>
      <a>
        <div
          className="product-card__image mb-3 lozad"
          style={{
            backgroundImage: `url(https://images.thuocsi.vn/${props.imageId})`,
            cursor: 'pointer'
          }}
        />
      </a>
    </Link>
  );
};
