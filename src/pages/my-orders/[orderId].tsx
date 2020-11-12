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
  Typography,
  withStyles
} from '@material-ui/core';
import { AssignmentTurnedIn, Done, LocalShipping, Receipt, Sms, Update } from '@material-ui/icons';
import clsx from 'clsx';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import ExportInvoice from 'src/components/Modules/ExportInvoice';
import ProfileSidebar from 'src/components/Modules/ProfileSidebar';
import { theme } from 'src/theme';
import withApollo from 'src/utils/withApollo';

const stepIconSize = 75;

const stepConnectorLineHeight = 3;

const stepIconGradient = `linear-gradient(102.04deg, ${theme.colors.blue} 0%, ${theme.colors.blue1} 100%)`;

const stepConnectorLineGradient = `linear-gradient(95deg,${theme.colors.blue1} 0%, ${theme.colors.blue} 100%)`;

const useStyles = makeStyles((materialTheme) => ({
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
      <Typography variant="button" color="primary">
        {label}
      </Typography>
      <Typography>{text}</Typography>
    </Box>
  );
};

const OrderDetails = () => {
  const router = useRouter();

  const { orderId } = router.query;

  const [activeStep, setActiveStep] = useState(2);

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
                  <Typography variant="h5" color="textPrimary">
                    Chi tiết đơn hàng #218781
                  </Typography>

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
                      Dự kiến giao vào <strong>Thứ hai (09/11/2020)</strong>
                    </Typography>

                    <Link
                      href={{
                        pathname: '/feedback',
                        query: {
                          orderId: orderId,
                          name: 'Phạm thị phương',
                          phone: '0964547987'
                        }
                      }}>
                      <Button size="small" startIcon={<Sms />} variant="outlined" color="primary">
                        Gửi phản hồi
                      </Button>
                    </Link>
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

                    <Box ml={2}>
                      Xem thông tin xuất hóa đơn đỏ{' '}
                      <Link href="/invoice-export-rules">tại đây</Link>.
                    </Box>
                  </Box>
                </CustomCard>
              </Grid>

              <Grid item xs={12}>
                <CustomCard>
                  <TextWithLabel label="Tên người nhận" text="Phạm thị phương" />

                  <TextWithLabel
                    label="Địa chỉ giao hàng"
                    text="12b/1e ấp đồng an 2, Phường Bình Hòa, Thành phố Thuận An, Bình Dương"
                  />

                  <TextWithLabel label="Số điện thoại" text="0964547987" />

                  <TextWithLabel label="Email" text="phamthiphuong0505@gmail.com" />
                </CustomCard>
              </Grid>

              <Grid container item xs={12} spacing={2}>
                <Grid item sm={6} xs={12}>
                  <CustomCard>
                    <TextWithLabel label="Đơn vị vận chuyển" text="Giaohangtietkiem.vn" />

                    <TextWithLabel label="Ngày giao" text="06/11/2020" />

                    <TextWithLabel label="Mã vận đơn" text="S616097.MN2.DA.2.974708080" />
                  </CustomCard>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <Box mb={2}>
                    <CustomCard>
                      <TextWithLabel
                        label="Hình thức thanh toán"
                        text="Thanh toán tiền mặt khi nhận hàng"
                      />
                    </CustomCard>
                  </Box>

                  <CustomCard>
                    <TextWithLabel label="Ghi chú" text="Không có ghi chú" />
                  </CustomCard>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <CustomCard></CustomCard>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
};

export default withApollo('')(OrderDetails);
