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
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { AssignmentTurnedIn, Done, LocalShipping, Receipt, Sms, Update } from '@material-ui/icons';
import clsx from 'clsx';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PriceText from 'src/components/Form/PriceText';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import ExportInvoice from 'src/components/Modules/ExportInvoice';
import ProfileSidebar from 'src/components/Modules/ProfileSidebar';
import { useUserContext } from 'src/contexts/User';
import { GET_ORDER } from 'src/graphql/order/order.query';
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

const steps = [
  {
    icon: <Receipt />,
    text: 'Chờ xác nhận'
  },
  {
    icon: <AssignmentTurnedIn />,
    text: 'Đã xác nhận'
  },
  {
    icon: <Update />,
    text: 'Đang xử lý'
  },
  {
    icon: <LocalShipping />,
    text: 'Đang giao hàng'
  },
  {
    icon: <Done />,
    text: 'Hoàn tất'
  }
];

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
  textAlign?: 'left' | 'right';
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
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const { orderId } = router.query;

  const [activeStep, setActiveStep] = useState(0);

  const { data: orderDetail } = useQueryAuth(GET_ORDER, {
    variables: { id: orderId }
  });
  console.log('orderDetail', orderDetail);
  // useEffect(() => {
  //   if (orderDetail?.getOrderDetail.order_lines.state) {
  //   }
  // }, [orderDetail?.getOrderDetail.order_lines]);

  const onCancelClick = () => {
    if (activeStep >= 3) {
      toast.error('cant cancel order');
      return;
    }
    setOpen(true);
  };

  const { user } = useUserContext();

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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomCard>
                  <Typography variant="h5">Chi tiết đơn hàng #{orderId}</Typography>

                  <Box my={2}>
                    <Divider />
                  </Box>

                  <Stepper
                    alternativeLabel
                    activeStep={activeStep}
                    connector={<CustomStepConnector />}>
                    {steps.map((step) => (
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
                      Dự kiến giao vào
                      <strong>{orderDetail?.getOrderDetail?.expected_date}</strong>
                    </Typography>

                    <Link
                      href={{
                        pathname: '/feedback',
                        query: {
                          orderId: orderId,
                          name: user?.name,
                          phone: user?.phone
                        }
                      }}>
                      <Button size="small" startIcon={<Sms />} variant="outlined" color="primary">
                        Gửi phản hồi
                      </Button>
                    </Link>
                    <button className="btn btn-danger" onClick={onCancelClick}>
                      hủy đơn hàng
                    </button>

                    <ConfirmCancelOrder
                      open={open}
                      onClose={() => setOpen(false)}
                      orderNo={orderId.toString()}
                    />
                  </Box>
                </CustomCard>
              </Grid>

              <Grid item xs={12}>
                <CustomCard>
                  <Box display="flex" alignItems="center">
                    <ExportInvoice
                      confirmDate={DateTime.local()
                        .minus({
                          days: 5
                        })
                        .toJSDate()}
                    />

                    {/* <Box ml={2}>
                      Xem thông tin xuất hóa đơn đỏ{' '}
                      <Link href="/invoice-export-rules">tại đây</Link>.
                    </Box> */}
                  </Box>
                </CustomCard>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item sm={6} xs={12}>
                    <CustomCard>
                      <TextWithLabel
                        label="Tên người nhận"
                        text={orderDetail?.getOrderDetail?.partner_shipping?.name}
                      />
                      {/* nào có data địa chỉ thì bỏ vô đây nha <3 */}

                      <TextWithLabel
                        label="Địa chỉ giao hàng"
                        text={orderDetail?.getOrderDetail?.partner_shipping?.street}
                      />

                      <TextWithLabel
                        label="Số điện thoại"
                        text={orderDetail?.getOrderDetail?.partner_shipping?.phone}
                      />

                      <TextWithLabel
                        label="Email"
                        text={orderDetail?.getOrderDetail?.partner_shipping?.email}
                      />
                    </CustomCard>
                  </Grid>
                  {/* có data đơn vị vận chuyển thì fill vô nha <3 */}

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
                  <TextWithLabel label="Ghi chú" text={orderDetail?.getOrderDetail.note} />
                </CustomCard>
              </Grid>

              <Grid item xs={12}>
                <CustomCard>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <CustomHeadCell label="Sản phẩm" textAlign="left" />
                        <CustomHeadCell label="Đơn giá" />
                        <CustomHeadCell label="Số lượng" />
                        <CustomHeadCell label="Tổng cộng" />
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {orderDetail?.getOrderDetail.order_lines.map((product) => (
                        <TableRow key={product.id}>
                          <CustomBodyCell textAlign="left">
                            <Link href={`/products/${product.id}`}>
                              <a>{product.name}</a>
                            </Link>
                          </CustomBodyCell>

                          <CustomBodyCell>
                            <PriceText price={product.price_unit} /> đ
                          </CustomBodyCell>

                          <CustomBodyCell>{product.product_uom_qty}</CustomBodyCell>

                          <CustomBodyCell>
                            <PriceText price={product.price_total} /> đ
                          </CustomBodyCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CustomCard>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
};

export default withApollo({ ssr: true })(OrderDetails);
