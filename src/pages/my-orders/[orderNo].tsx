import {
  Box,
  Button,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { Receipt } from '@material-ui/icons';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useTranslation } from 'i18n';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import PriceText from 'src/components/Form/PriceText';
import Head from 'src/components/Layout/Head';
import Loading from 'src/components/Layout/Loading';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import CustomCard from 'src/components/Modules/OrderDetails/CustomCard';
import CustomStepper from 'src/components/Modules/OrderDetails/CustomStepper';
import ProfileLayout from 'src/components/Modules/ProfileLayout';
import {
  GET_ORDER_DETAIL,
  GetOrderDetailData,
  GetOrderDetailVars
} from 'src/graphql/order/getOrder';
import { useQueryAuth } from 'src/hooks/useApolloHookAuth';
import asyncQuery from 'src/utils/asyncQuery';
import withToken from 'src/utils/withToken';

import ConfirmCancelOrder from '../../components/Modules/My-orders/ConfirmCancelOrder';

const useStyles = makeStyles((muiTheme) => ({
  textWithLabelContainer: {
    '&:not(:last-child)': {
      marginBottom: muiTheme.spacing(2)
    }
  },
  table: {
    minWidth: 650
  }
}));

const TextWithLabel = (props) => {
  const { label, text, inline } = props;

  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection={inline ? 'row' : 'column'}
      className={classes.textWithLabelContainer}>
      <Typography variant="button" color="primary">
        {label}
      </Typography>
      <Typography>{text}</Typography>
    </Box>
  );
};

OrderDetails.getInitialProps = async (ctx) => {
  await asyncQuery<GetOrderDetailData, GetOrderDetailVars>({
    ctx,
    query: GET_ORDER_DETAIL,
    variables: {
      orderNo: ctx.query.orderNo
    },
    fetchPolicy: 'network-only',
    auth: true
  });

  return {
    namespacesRequired: [...mainLayoutNamespacesRequired, 'myOrders']
  };
};

const flagSteps = [10, 15, 20, 30, 40, 80];

function OrderDetails() {
  const { t, i18n } = useTranslation(['myOrders', 'common']);

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [activeStep, setActiveStep] = useState(-1);

  const {
    data: getOrderDetailData,
    refetch,
    loading: loadingOrderDetail
  } = useQueryAuth<GetOrderDetailData, GetOrderDetailVars>(GET_ORDER_DETAIL, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    variables: { orderNo: router.query.orderNo as string },
    onCompleted: (data) => {
      setActiveStep(flagSteps.indexOf(data.getOrderDetail?.flag));
    },
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  const flag = getOrderDetailData?.getOrderDetail?.flag;
  const name = getOrderDetailData?.getOrderDetail?.name;
  const partnerShipping = getOrderDetailData?.getOrderDetail?.partner_shipping;

  const classes = useStyles();
  return (
    <MainLayout>
      <Head>
        <title>Medofa - {t('myOrders:order_detail')}</title>
      </Head>

      <ProfileLayout>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomCard>
              <Typography variant="h5">
                {t('myOrders:order_detail')}
                {`: ${name || ''}`}
              </Typography>

              <Box my={2}>
                <Divider />
              </Box>
              {loadingOrderDetail ? (
                <div className="d-flex w-100 p-5 justify-content-center">
                  <Loading className="lds-roller-white" />
                </div>
              ) : (
                <CustomStepper flag={flag} activeStep={activeStep} />
              )}

              {flag !== 25 && (
                <>
                  <Box my={2}>
                    <Divider />
                  </Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    {flag !== 25 && flag !== 80 && (
                      <Typography>
                        {t('myOrders:expected_date')}{' '}
                        <strong>
                          {getOrderDetailData?.getOrderDetail?.expected_date &&
                            new Date(
                              getOrderDetailData?.getOrderDetail?.expected_date
                            ).toLocaleDateString('en-GB')}
                        </strong>
                      </Typography>
                    )}

                    {flag &&
                      ([10, 15].includes(flag) ? (
                        <Button
                          size="small"
                          startIcon={<DeleteForeverIcon />}
                          variant="contained"
                          onClick={() => setOpen(true)}
                          color="secondary">
                          {t('myOrders:cancel_the_order')}
                        </Button>
                      ) : (
                        flag !== 25 && (
                          <a href="tel:1900232436" className="text-right">
                            <Button
                              size="small"
                              startIcon={<Receipt />}
                              variant="contained"
                              color="primary">
                              {t('myOrders:help')}
                            </Button>
                          </a>
                        )
                      ))}
                    <ConfirmCancelOrder
                      open={open}
                      onClose={() => setOpen(false)}
                      orderNo={name}
                      onCancelCompleted={() => refetch()}
                    />
                  </Box>
                </>
              )}
            </CustomCard>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <CustomCard>
                  <TextWithLabel
                    label={t('myOrders:recipients_name')}
                    text={partnerShipping?.name}
                  />

                  <TextWithLabel
                    label={t('myOrders:delivery_address')}
                    text={partnerShipping?.street}
                  />

                  <TextWithLabel label={t('myOrders:phone_number')} text={partnerShipping?.phone} />

                  <TextWithLabel label={t('myOrders:email')} text={partnerShipping?.email} />
                </CustomCard>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <CustomCard>
              <TextWithLabel
                label={t('myOrders:note')}
                text={getOrderDetailData?.getOrderDetail?.note || t('myOrders:no_notes')}
              />
            </CustomCard>
          </Grid>

          <Grid item xs={12}>
            <TableContainer component={Paper} className="none">
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="button" color="primary">
                        {t('myOrders:product')}
                      </Typography>
                    </TableCell>
                    <TableCell></TableCell>

                    {['quantity', 'unit_price', 'tax', 'sub_total'].map((key) => (
                      <TableCell key={key} align="right">
                        <Typography variant="button" color="primary" noWrap>
                          {t(`myOrders:${key}`)}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {getOrderDetailData?.getOrderDetail?.order_lines?.map((product) => (
                    <TableRow key={product.name}>
                      <TableCell className="image-webs" align="right">
                        {product.product_type == 'reward' ? (
                          <img src="/assets/images/rewards.png" alt="reward" />
                        ) : (
                          <img
                            src={product.product.image_128 || '/assets/images/no_images.jpg'}
                            alt="product"
                          />
                        )}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {product.product_type !== 'product' ? (
                          <div>{product.name}</div>
                        ) : (
                          <Link
                            href={`${i18n?.language === 'vi' ? '/san-pham' : '/products'}/${
                              product.product.slug
                            }`}>
                            <a>{product.name}</a>
                          </Link>
                        )}
                      </TableCell>

                      <TableCell align="right">
                        <Box whiteSpace="nowrap">{product.product_uom_qty}</Box>
                      </TableCell>

                      {['price_unit', 'price_tax', 'price_total'].map((item) => (
                        <TableCell key={item} align="right">
                          <Box whiteSpace="nowrap">
                            <PriceText price={product[item]} />
                          </Box>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>

                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Typography color="initial" variant="h5" align="right">
                        {t('myOrders:total')}{' '}
                        <Typography color="primary" variant="h4" display="inline">
                          <PriceText price={getOrderDetailData?.getOrderDetail?.amount_total} />
                        </Typography>
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
            <div className="my-order__mobile-list">
              {getOrderDetailData?.getOrderDetail?.order_lines?.map((product) => (
                <div key={product.name} className="product-item">
                  {product.product_type == 'reward' ? (
                    <img src="/assets/images/rewards.png" alt="reward" />
                  ) : (
                    <Image
                      width={60}
                      height={60}
                      layout="responsive"
                      objectFit="contain"
                      src={product.product.image_128 || '/assets/images/no_images.jpg'}
                      alt="product"
                    />
                  )}
                  <div className="info">
                    <div className="name">
                      {product.product_type !== 'product' ? (
                        <div>{product.name}</div>
                      ) : (
                        <Link
                          href={`${i18n?.language === 'vi' ? '/san-pham' : '/products'}/${
                            product.product.slug
                          }`}>
                          <a>{product.name}</a>
                        </Link>
                      )}
                    </div>
                    <div className="my-order__item-price">
                      {product.product_uom_qty} x <PriceText price={product.price_unit} />
                    </div>
                    <div className="my-order__item-price">
                      {t('myOrders:tax')}: <PriceText price={product.price_tax} />
                    </div>
                    <div className="my-order__item-price">
                      {t('myOrders:sub_total')}: <PriceText price={product.price_total} />
                    </div>
                  </div>
                </div>
              ))}
              <div className="my-order__total-price">
                {t('myOrders:total')}
                {'  '} <PriceText price={getOrderDetailData?.getOrderDetail?.amount_total} />
              </div>
            </div>
          </Grid>
        </Grid>
      </ProfileLayout>
      <LoadingBackdrop open={loadingOrderDetail} />
    </MainLayout>
  );
}

export default withToken({ ssr: true, isProtected: true })(OrderDetails);
