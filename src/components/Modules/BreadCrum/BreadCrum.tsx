import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { useRouter, withRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// type Props = {
//     arrayList:
// }

const SimpleBreadcrumbs = (props) => {
  const router = useRouter();

  console.log('router', router);

  const pathnames = router.asPath.split('/').filter((path) => path);
  console.log('pathnames', pathnames);
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link href="/">
        <a>Trang chủ</a>
      </Link>
      {pathnames.map((name) => (
        <>
          <Link href={`/${name}`}>
            <a>{name}</a>
          </Link>
        </>
      ))}
      {/* <Typography color="textPrimary">{router.query.productId?.split('-')}</Typography> */}
    </Breadcrumbs>
  );
};
export default SimpleBreadcrumbs;
