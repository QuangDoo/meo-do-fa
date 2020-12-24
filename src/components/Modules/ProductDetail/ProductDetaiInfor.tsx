import { useTranslation } from 'i18n';
import Link from 'next/link';
import React from 'react';
import PriceText from 'src/components/Form/PriceText';
import { Category } from 'src/graphql/category/category.query';
import { Manufacturer } from 'src/graphql/manufacturers/manufacturers.query';
import useIsLoggedIn from 'src/hooks/useIsLoggedIn';
import manufacturers from 'src/pages/manufacturers';

import QuantityInput from '../../Form/QuantityInput';
import AddCart from '../AddCart';
import LoginModal from '../LoginModal';
import ProductBadge from '../ProductCard/ProductBadge';
import { ProductPrice } from '../ProductCard/ProductPrice';

type PropsType = {
  name: string;
  list_price: number;
  uom_name: string;
  id: string;
  is_quick_invoice: string;
  is_exclusive: string;
  is_vn: string;
  categories: Category[];
  manufacturers: Display_name;
  info?: string;
  indication?: string;
  contraindication?: string;
  direction?: string;
  interaction?: string;
  preservation?: string;
  overdose?: string;
  sale_price?: number;
  standard_price?: number;
};
type Display_name = {
  name: string;
  id: number;
  amount: string;
};
const ProductDetailInfor = (props: PropsType): JSX.Element => {
  const isLoggedIn = useIsLoggedIn();
  const { t } = useTranslation(['common', 'productDetail']);
  return (
    <div className="row">
      <div className="col-12">
        <h1 className="h3 text-capitalize">{props.name}</h1>
        <div className="product__status mb-1" />
        {!isLoggedIn ? (
          <LoginModal />
        ) : (
          <div className="d-flex align-items-center flex-wrap justify-content-between mb-4">
            <div>
              <div className="product__price-group">
                <span className="product__price">
                  <ProductPrice
                    price={props.list_price}
                    standard_price={props.standard_price}
                    sale_price={props.sale_price}
                  />
                  {props?.is_quick_invoice && (
                    <small className="text-muted"> ({t('productDetail:vat_included')})</small>
                  )}
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="product__status mb-3">
          {props.is_quick_invoice && <ProductBadge type="is_quick_invoice" />}

          {props.is_exclusive && <ProductBadge type="is_exclusive" />}

          {props.is_vn && <ProductBadge type="is_vn" />}
        </div>
        <div className="mb-3">
          {props.manufacturers && (
            <>
              <div className="product__info-label">{t('productDetail:manufacturer')}</div>
              <div className="text-capitalize">
                <Link href={`/manufacturers/${props.manufacturers?.id}`}>
                  <a>{props.manufacturers?.name}</a>
                </Link>
              </div>
            </>
          )}
        </div>
        <div className="mb-3" hidden={props.categories?.length === 0}>
          <div className="product__info-label">{t('productDetail:category')}</div>
          {props.categories?.map(({ id, name }, index, arr) => (
            <React.Fragment key={id}>
              <Link href={`/products?category=${id}`}>
                <a>{name}</a>
              </Link>
              {index < arr.length - 1 && '; '}
            </React.Fragment>
          ))}
        </div>
        <div className="product__status mb-4" />
        {!isLoggedIn ? null : (
          <AddCart productId={props.id} price={props.list_price} name={props.name} />
        )}
      </div>
    </div>
  );
};
export default ProductDetailInfor;
