import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter, withRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

type Category = {
  id: string;
  name: string;
  parent_id: string[];
};

type Props = {
  categories: Category[];
};

const SimpleBreadcrumbs = (props: Props) => {
  const router = useRouter();

  const { t } = useTranslation(['breadcrumb']);

  const [parentCategory, setParentCategory] = useState([]);

  const { categories } = props;

  useEffect(() => {
    if (!categories) return;
    categories.map((child) => setParentCategory(child.parent_id));
  }, [categories]);

  const { productId } = router.query;

  const productPid = (productId as string).split('-');

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link href="/">
        <a>{t('breadcrumb:home_page')}</a>
      </Link>

      <Link href={`/products?category=${parentCategory[0]}`}>
        <a>{parentCategory[1]}</a>
      </Link>

      {categories?.map(({ name, id }) => (
        <>
          <Link key={id} href={`/products?category=${id}`}>
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
