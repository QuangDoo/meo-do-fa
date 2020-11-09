import { Card, CardActions, CardContent, Divider, makeStyles, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import ProfileSidebar from 'src/components/Modules/ProfileSidebar';
import withApollo from 'src/utils/withApollo';

const useStyles = makeStyles({});

const OrderDetails = () => {
  const router = useRouter();

  const { orderId } = router.query;

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <div className="my-order container py-5">
        <div className="row">
          <ProfileSidebar />

          <div className="col-xl-9 col-12">
            <Card>
              <CardContent>
                <Typography variant="h5" color="textPrimary">
                  Chi tiết đơn hàng #218781
                </Typography>

                <Divider />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default withApollo('')(OrderDetails);
