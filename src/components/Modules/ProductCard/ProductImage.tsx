import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type ProductImageProps = {
  imageId: string;
  productId: string;
};

export const ProductImage = (props: ProductImageProps): JSX.Element => {
  const img = props.imageId || '/assets/images/no-image.jpg';
  return (
    <Link href={`/products/${props.productId}`}>
      <a>
        <Image width="205" height="160" src={img} className="product-card__image mb-3 lozad" />
      </a>
    </Link>
  );
};
