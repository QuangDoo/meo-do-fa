import {
  Box,
  Button,
  Card,
  CardProps,
  Divider,
  Grid,
  makeStyles,
  Step,
  StepConnector,
  StepConnectorProps,
  StepIconProps,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { AssignmentTurnedIn, Done, LocalShipping, Receipt, Sms, Update } from '@material-ui/icons';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PriceText from 'src/components/Form/PriceText';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import Nav from 'src/components/Layout/Nav';
import ProfileLayout from 'src/components/Modules/ProfileLayout';
import { GET_ORDER, GetOrderDetailData, GetOrderDetailVars } from 'src/graphql/order/getOrder';
import { useQueryAuth } from 'src/hooks/useApolloHookAuth';
import useUser from 'src/hooks/useUser';
import { theme } from 'src/theme';
import withApollo from 'src/utils/withApollo';

import ConfirmCancelOrder from '../../components/Modules/My-orders/ConfirmCancelOrder';

const stepIconSize = 75;

const stepConnectorLineHeight = 3;

const stepIconGradient = `linear-gradient(102.04deg, ${theme.colors.blue} 0%, ${theme.colors.blue1} 100%)`;

const stepConnectorLineGradient = `linear-gradient(95deg,${theme.colors.blue1} 0%, ${theme.colors.blue} 100%)`;

const useStyles = makeStyles((materialTheme) => ({
  primaryText: {
    color: theme.colors.blue1
  },
  cardRoot: {
    padding: materialTheme.spacing(2)
  },
  stepIconRoot: {
    backgroundColor: theme.colors['gray-500'],
    zIndex: 1,
    color: theme.colors.white,
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
    backgroundColor: theme.colors['gray-500']
  },
  textWithLabelContainer: {
    '&:not(:last-child)': {
      marginBottom: materialTheme.spacing(2)
    }
  },
  headCell: {
    padding: 0,
    paddingBottom: materialTheme.spacing(1),
    textAlign: 'right'
  },
  bodyCell: {
    padding: 0,
    paddingTop: materialTheme.spacing(2),
    paddingBottom: materialTheme.spacing(2),
    textAlign: 'right'
  },
  textAlignLeft: {
    textAlign: 'left'
  }
}));

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
      <Typography
        variant="button"
        classes={{
          root: classes.primaryText
        }}>
        {label}
      </Typography>
      <Typography>{text}</Typography>
    </Box>
  );
};

type CustomHeadCellProps = {
  label: string;
  textAlign?: 'left' | 'right';
};

const CustomHeadCell = ({ label, textAlign }: CustomHeadCellProps) => {
  const classes = useStyles();

  return (
    <TableCell
      classes={{
        head: clsx(classes.headCell, textAlign === 'left' && classes.textAlignLeft)
      }}>
      <Typography
        variant="button"
        classes={{
          root: classes.primaryText
        }}>
        {label}
      </Typography>
    </TableCell>
  );
};

type CustomBodyCellProps = {
  children: React.ReactNode;
  textAlign?: 'left' | 'right' | 'center';
};

const CustomBodyCell = ({ children, textAlign }: CustomBodyCellProps) => {
  const classes = useStyles();

  return (
    <TableCell
      classes={{
        root: clsx(classes.bodyCell, textAlign === 'left' && classes.textAlignLeft)
      }}>
      {children}
    </TableCell>
  );
};

const OrderDetails = () => {
  const { t } = useTranslation(['myOrders', 'common']);
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const { orderNo } = router.query;

  const [activeStep, setActiveStep] = useState(-1);

  const getActiveStep = (flag) => {
    switch (flag) {
      case 10:
        return setActiveStep(0);
      case 20:
        return setActiveStep(1);
      case 25:
        return setActiveStep(-1);
      case 30:
        return setActiveStep(2);
      case 40:
        return setActiveStep(3);
      case 80:
        return setActiveStep(4);
      default:
        return setActiveStep(-1);
    }
  };

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

    // orderDetail?.getOrderDetail?.flag === 10 && setActiveStep(0);
    // orderDetail?.getOrderDetail?.flag === 20 && setActiveStep(1);
    // orderDetail?.getOrderDetail?.flag === 30 && setActiveStep(2);
    // orderDetail?.getOrderDetail?.flag === 40 && setActiveStep(3);
    // orderDetail?.getOrderDetail?.flag === 80 && setActiveStep(4);

    setActiveStep(flagSteps.indexOf(orderDetail.getOrderDetail.flag));
  }, [orderDetail]);

  const onCancelClick = () => {
    if (activeStep >= 3) {
      toast.error('cant cancel order');
      return;
    }
    setOpen(true);
  };

  useEffect(() => {
    orderDetail?.getOrderDetail && getActiveStep(orderDetail?.getOrderDetail?.flag);
  }, [orderDetail]);

  const { user } = useUser();

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <ProfileLayout>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomCard>
              <Typography variant="h5">
                {t('myOrders:order_detail')}
                {`: ${orderDetail?.getOrderDetail?.name || ''}`}
              </Typography>

              <Box my={2}>
                <Divider />
              </Box>

              <Stepper
                className="cancel"
                alternativeLabel
                activeStep={activeStep}
                connector={<CustomStepConnector />}>
                {orderDetail?.getOrderDetail?.flag === 25 && (
                  <Step>
                    <StepLabel icon={<Receipt />} StepIconComponent={CustomStepIcon} error>
                      {t('myOrders:canceled')}
                    </StepLabel>
                  </Step>
                )}
                {orderDetail?.getOrderDetail?.flag !== 25 &&
                  steps.map((step) => (
                    <Step key={step.text}>
                      <StepLabel icon={step.icon} StepIconComponent={CustomStepIcon}>
                        {step.text}
                      </StepLabel>
                    </Step>
                  ))}
              </Stepper>

              <Box my={2}>
                <Divider />
              </Box>

              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography>
                  {t('myOrders:expected_date')}{' '}
                  <strong>
                    {orderDetail?.getOrderDetail?.flag !== 25 &&
                      orderDetail?.getOrderDetail?.expected_date &&
                      new Date(orderDetail?.getOrderDetail?.expected_date).toLocaleDateString(
                        'en-GB'
                      )}
                  </strong>
                </Typography>
                {activeStep > 2 ? (
                  <Link
                    href={{
                      pathname: '/feedback',
                      query: {
                        orderId: orderDetail?.getOrderDetail?.name,
                        name: user?.name,
                        phone: user?.phone
                      }
                    }}>
                    <Button size="small" startIcon={<Sms />} variant="outlined" color="primary">
                      {t('myOrders:report')}
                    </Button>
                  </Link>
                ) : orderDetail?.getOrderDetail?.flag === 25 ? (
                  <Button
                    style={{
                      color: 'red',
                      borderColor: 'red'
                    }}
                    size="small"
                    startIcon={<DeleteForeverIcon />}
                    variant="outlined"
                    color="inherit"
                    disabled>
                    {t('myOrders:canceled')}
                  </Button>
                ) : (
                  <Button
                    size="small"
                    startIcon={<DeleteForeverIcon />}
                    variant="outlined"
                    onClick={onCancelClick}
                    color="secondary">
                    {t('myOrders:cancel_the_order')}
                  </Button>
                )}
                <ConfirmCancelOrder
                  open={open}
                  onClose={() => setOpen(false)}
                  orderNo={orderDetail?.getOrderDetail.name}
                  callBack={() => refetch()}
                />
              </Box>
            </CustomCard>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <CustomCard>
                  <TextWithLabel
                    label={t('myOrders:recipients_name')}
                    text={orderDetail?.getOrderDetail?.partner_shipping?.name}
                  />

                  <TextWithLabel
                    label={t('myOrders:delivery_address')}
                    text={orderDetail?.getOrderDetail?.partner_shipping?.street}
                  />

                  <TextWithLabel
                    label={t('myOrders:phone_number')}
                    text={orderDetail?.getOrderDetail?.partner_shipping?.phone}
                  />

                  <TextWithLabel
                    label={t('myOrders:email')}
                    text={orderDetail?.getOrderDetail?.partner_shipping?.email}
                  />
                </CustomCard>
              </Grid>

              {/* <Grid item sm={6} xs={12}>
                    <CustomCard>
                      <TextWithLabel label="Đơn vị vận chuyển" text="Giaohangtietkiem.vn" />

                      <TextWithLabel label="Ngày giao" text="06/11/2020" />

                      <TextWithLabel label="Mã vận đơn" text="S616097.MN2.DA.2.974708080" />

                      <TextWithLabel
                        label="Hình thức thanh toán"
                        text="Thanh toán tiền mặt khi nhận hàng"
                      />
                    </CustomCard>
                  </Grid> */}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <CustomCard>
              <TextWithLabel label={t('myOrders:note')} text={orderDetail?.getOrderDetail.note} />
            </CustomCard>
          </Grid>

          <Grid item xs={12}>
            <CustomCard>
              <Table>
                <TableHead>
                  <TableRow>
                    <CustomHeadCell label={t('myOrders:product')} textAlign="left" />
                    <CustomHeadCell label={t('myOrders:unit_price')} />
                    <CustomHeadCell label={t('myOrders:quantity')} />
                    <CustomHeadCell label={t('myOrders:price_tax')} />
                    <CustomHeadCell label={t('myOrders:total')} />
                  </TableRow>
                </TableHead>

                <TableBody>
                  {orderDetail?.getOrderDetail.order_lines.map((product) => (
                    <TableRow key={product.id}>
                      <CustomBodyCell textAlign="left">
                        <Link href={`/products/${product.product.slug}`}>
                          <a>{product.name}</a>
                        </Link>
                      </CustomBodyCell>

                      <CustomBodyCell>
                        <PriceText price={product.price_unit} /> {t('common:vnd')}
                      </CustomBodyCell>

                      <CustomBodyCell textAlign="center">{product.product_uom_qty}</CustomBodyCell>

                      <CustomBodyCell textAlign="right">
                        <PriceText price={product.price_tax} /> {t('common:vnd')}
                      </CustomBodyCell>
                      <CustomBodyCell textAlign="center">
                        <PriceText price={product.price_total} /> {t('common:vnd')}
                      </CustomBodyCell>
                    </TableRow>
                  ))}
                </TableBody>

                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Typography variant="h5" align="right">
                        {t('myOrders:total')}{' '}
                        <PriceText price={orderDetail?.getOrderDetail.amount_total} /> đ
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CustomCard>
          </Grid>
        </Grid>
      </ProfileLayout>
      <LoadingBackdrop open={loadingOrderDetail} />
      <Footer />
    </>
  );
};

export default withApollo({ ssr: true })(OrderDetails);
