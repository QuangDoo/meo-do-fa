import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { useRouter, withRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// type Props = {
//     arrayList:
// }

const SimpleBreadcrumbs = (props) => {
  const [nameBreadcrumbs, setNameBreadcrumbs] = useState<string>();

  const router = useRouter();

  console.log('router', router);

  useEffect(() => {
    router.pathname === '/products' && setNameBreadcrumbs('Sản phẩm');
    router.pathname === '/products/[productId]' && setNameBreadcrumbs('Sản phẩm');
  }, [router.pathname]);

  const pathnames = router.asPath.split('/').filter((path) => path);
  console.log('pathnames', pathnames);
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link href="/">
        <a>Trang chủ</a>
      </Link>
      {pathnames.map((item) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <Link href={`/${item}`}>
            <a>{item}</a>
          </Link>
        );
      })}
      {/* <Typography color="textPrimary">{router.query.productId?.split('-')}</Typography> */}
    </Breadcrumbs>
  );
};
export default withRouter(SimpleBreadcrumbs);
