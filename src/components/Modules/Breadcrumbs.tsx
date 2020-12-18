import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from '@material-ui/core';
import { useRouter, withRouter } from 'next/router';
import React from 'react';

const Breadcrumbs = (props: any) => {
  const {
    history,
    location: { pathname }
  } = props;

  const pathnames = pathname.split('/').filter((x) => x);
  return (
    <div>
      <MUIBreadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Link color="inherit" href="/getting-started/installation/">
          Core
        </Link>
        <Typography color="textPrimary">Breadcrumb</Typography>
      </MUIBreadcrumbs>
    </div>
  );
};

export default withRouter(Breadcrumbs);
