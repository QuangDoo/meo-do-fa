import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ProductDetails } from 'src/graphql/product/product.query';

type Props = {
  categories: ProductDetails['categories'];
};

const SimpleBreadcrumbs = (props: Props) => {
  const router = useRouter();

  const { t, i18n } = useTranslation(['breadcrumb']);

  const [parentCategory, setParentCategory] = useState([]);

  const { categories } = props;

  useEffect(() => {
    if (!categories) return;
    categories.map((child) => setParentCategory([child.parent_id, child.parent_name]));
  }, [categories]);

  const { productId } = router.query;

  const productPid = (productId as string).split('-');

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link href="/">
        <a>{t('breadcrumb:home_page')}</a>
      </Link>

      <Link
        href={`${i18n?.language === 'vi' ? '/san-pham' : '/products'}?category=${
          parentCategory[0]
        }`}>
        <a>{parentCategory[1]}</a>
      </Link>

      {categories?.map(({ name, id }) => (
        <>
          <Link
            key={id}
            href={`${i18n?.language === 'vi' ? '/san-pham' : '/products'}?category=${id}`}>
            <a>{name}</a>
          </Link>
        </>
      ))}
      <Typography color="textPrimary">
        <b className="text-uppercase">{productPid[0]}</b>
      </Typography>
    </Breadcrumbs>
  );
};
export default SimpleBreadcrumbs;
