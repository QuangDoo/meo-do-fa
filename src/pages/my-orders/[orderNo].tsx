import {
  Box,
  Button,
  Card,
  CardProps,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Step,
  StepConnector,
  StepConnectorProps,
  StepIconProps,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { AssignmentTurnedIn, Done, LocalShipping, Receipt, Update } from '@material-ui/icons';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PriceText from 'src/components/Form/PriceText';
import Head from 'src/components/Layout/Head';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import ProfileLayout from 'src/components/Modules/ProfileLayout';
import { GET_ORDER, GetOrderDetailData, GetOrderDetailVars } from 'src/graphql/order/getOrder';
import { useQueryAuth } from 'src/hooks/useApolloHookAuth';
import withToken from 'src/utils/withToken';

import ConfirmCancelOrder from '../../components/Modules/My-orders/ConfirmCancelOrder';

const useStyles = makeStyles((muiTheme) => {
  const stepIconSize = 75;

  const stepConnectorLineHeight = 3;

  const stepIconGradient = `linear-gradient(102.04deg, ${muiTheme.palette.primary.dark} 0%, ${muiTheme.palette.primary.main} 100%)`;

  const stepConnectorLineGradient = `linear-gradient(95deg,${muiTheme.palette.primary.main} 0%, ${muiTheme.palette.primary.dark} 100%)`;

  return {
    cardRoot: {
      padding: muiTheme.spacing(2)
    },
    stepIconRoot: {
      backgroundColor: muiTheme.palette.grey[500],
      zIndex: 1,
      color: muiTheme.palette.common.white,
      width: stepIconSize,
      height: stepIconSize,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      '& .MuiSvgIcon-root': {
        fontSize: '2rem'
      }
    },
    stepIconActive: {
      backgroundImage: stepIconGradient,
      boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.25)',
      '& .MuiSvgIcon-root': {
        fontSize: '2rem'
      }
    },
    stepIconCompleted: {
      backgroundImage: stepIconGradient
    },

    stepConnectorAlternativeLabel: {
      top: (stepIconSize - stepConnectorLineHeight) / 2
    },
    stepConnectorActive: {
      '& .MuiStepConnector-line': {
        backgroundImage: stepConnectorLineGradient
      }
    },
    stepConnectorCompleted: {
      '& .MuiStepConnector-line': {
        backgroundImage: stepConnectorLineGradient
      }
    },
    stepConnectorLine: {
      height: stepConnectorLineHeight,
      border: 0,
      backgroundColor: muiTheme.palette.grey[500]
    },
    textWithLabelContainer: {
      '&:not(:last-child)': {
        marginBottom: muiTheme.spacing(2)
      }
    },
    stepIconCancel: {
      background: 'linear-gradient(102.04deg, #c31e1e 0%, #f00 100%)'
    },
    table: {
      minWidth: 650
    }
  };
});

const CustomCard = (props: CardProps) => {
  const classes = useStyles();

  return (
    <Card
      classes={{
        root: classes.cardRoot
      }}
      {...props}
    />
  );
};

const CustomStepIcon = (props: StepIconProps) => {
  const { active, completed, icon } = props;

  const classes = useStyles();

  return (
    <div
      className={clsx(classes.stepIconRoot, {
        [classes.stepIconActive]: active,
        [classes.stepIconCompleted]: completed
      })}>
      {icon}
    </div>
  );
};

const CustomStepCancel = (props: StepIconProps) => {
  const { icon } = props;

  const classes = useStyles();

  return <div className={clsx(classes.stepIconRoot, classes.stepIconCancel)}>{icon}</div>;
};

const CustomStepConnector = (props: StepConnectorProps) => {
  const classes = useStyles();

  return (
    <StepConnector
      {...props}
      classes={{
        alternativeLabel: classes.stepConnectorAlternativeLabel,
        active: classes.stepConnectorActive,
        completed: classes.stepConnectorCompleted,
        line: classes.stepConnectorLine
      }}
    />
  );
};

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

OrderDetails.getinitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'myOrders']
});

function OrderDetails(props) {
  const { t } = useTranslation(['myOrders', 'common']);
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const { orderNo } = router.query;

  const [activeStep, setActiveStep] = useState(-1);

  const steps = [
    {
      icon: <Receipt />,
      text: t('myOrders:wait_for_confirm')
    },
    {
      icon: <AssignmentTurnedIn />,
      text: t('myOrders:confirmed')
    },
    {
      icon: <Update />,
      text: t('myOrders:in_proceed')
    },
    {
      icon: <LocalShipping />,
      text: t('myOrders:in_delivery')
    },
    {
      icon: <Done />,
      text: t('myOrders:complete')
    }
  ];

  const { data: orderDetail, refetch, loading: loadingOrderDetail } = useQueryAuth<
    GetOrderDetailData,
    GetOrderDetailVars
  >(GET_ORDER, {
    variables: { orderNo: orderNo as string }
  });

  useEffect(() => {
    if (!orderDetail) return;

    const flagSteps = [10, 20, 30, 40, 80];

    setActiveStep(flagSteps.indexOf(orderDetail?.getOrderDetail?.flag));
  }, [orderDetail]);

  const onCancelClick = () => {
    if (activeStep >= 3) {
      toast.error('cant cancel order');
      return;
    }
    setOpen(true);
  };

  const flag = orderDetail?.getOrderDetail?.flag;
  const name = orderDetail?.getOrderDetail?.name;
  const partnerShipping = orderDetail?.getOrderDetail?.partner_shipping;

  const classes = useStyles();

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
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

              <Stepper
                className="cancel"
                alternativeLabel
                activeStep={activeStep}
                connector={<CustomStepConnector />}>
                {flag === 25 ? (
                  <Step>
                    <StepLabel icon={<Receipt />} StepIconComponent={CustomStepCancel} error>
                      {t('myOrders:canceled')}
                    </StepLabel>
                  </Step>
                ) : (
                  steps.map((step) => (
                    <Step key={step.text}>
                      <StepLabel icon={step.icon} StepIconComponent={CustomStepIcon}>
                        {step.text}
                      </StepLabel>
                    </Step>
                  ))
                )}
              </Stepper>

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
                          {orderDetail?.getOrderDetail?.expected_date &&
                            new Date(orderDetail?.getOrderDetail?.expected_date).toLocaleDateString(
                              'en-GB'
                            )}
                        </strong>
                      </Typography>
                    )}
                    {flag !== 25 &&
                      (flag !== 80 ? (
                        <Button
                          size="small"
                          startIcon={<DeleteForeverIcon />}
                          variant="contained"
                          onClick={onCancelClick}
                          color="secondary">
                          {t('myOrders:cancel_the_order')}
                        </Button>
                      ) : (
                        <a href="tel:1900232436" className="text-right">
                          <Button
                            size="small"
                            startIcon={<Receipt />}
                            variant="contained"
                            color="secondary">
                            {t('myOrders:report')}
                          </Button>
                        </a>
                      ))}
                    <ConfirmCancelOrder
                      open={open}
                      onClose={() => setOpen(false)}
                      orderNo={name}
                      callBack={() => refetch()}
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
                text={orderDetail?.getOrderDetail?.note || t('myOrders:no_notes')}
              />
            </CustomCard>
          </Grid>

          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="button" color="primary">
                        {t('myOrders:product')}
                      </Typography>
                    </TableCell>

                    {['quantity', 'unit_price', 'tax', 'total'].map((key) => (
                      <TableCell key={key} align="right">
                        <Typography variant="button" color="primary" noWrap>
                          {t(`myOrders:${key}`)}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {orderDetail?.getOrderDetail?.order_lines?.map((product) => (
                    <TableRow key={product.name}>
                      <TableCell component="th" scope="row">
                        {product.product_type !== 'product' ? (
                          <div>{product.name}</div>
                        ) : (
                          <Link href={`/products/${product.product.slug}`}>
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
                    <TableCell colSpan={5}>
                      <Typography color="initial" variant="h5" align="right">
                        {t('myOrders:total')}{' '}
                        <Typography color="primary" variant="h4" display="inline">
                          <PriceText price={orderDetail?.getOrderDetail?.amount_total} />
                        </Typography>
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </ProfileLayout>
      <LoadingBackdrop open={loadingOrderDetail} />
    </MainLayout>
  );
}

export default withToken({ ssr: true, isProtected: true })(OrderDetails);
