import {
  makeStyles,
  Step,
  StepConnector,
  StepConnectorProps,
  StepIconProps,
  StepLabel,
  Stepper,
  useMediaQuery
} from '@material-ui/core';
import {
  AssignmentTurnedIn,
  CallReceived,
  Done,
  LocalShipping,
  Receipt,
  Update
} from '@material-ui/icons';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import React from 'react';

const useStyles = makeStyles((theme) => {
  const stepIconSize = 75;

  const stepConnectorLineHeight = 3;

  const stepIconGradient = `linear-gradient(102.04deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`;

  const stepConnectorLineGradient = `linear-gradient(95deg,${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`;

  return {
    stepIconRoot: {
      backgroundColor: theme.palette.grey[500],
      zIndex: 1,
      color: theme.palette.common.white,
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
      backgroundColor: theme.palette.grey[500]
    },
    stepIconCancel: {
      background: 'linear-gradient(102.04deg, #c31e1e 0%, #f00 100%)'
    }
  };
});

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

const steps = [
  {
    icon: <Receipt />,
    text: 'wait_for_confirm'
  },
  {
    icon: <CallReceived />,
    text: 'received'
  },
  {
    icon: <AssignmentTurnedIn />,
    text: 'confirmed'
  },
  {
    icon: <Update />,
    text: 'in_proceed'
  },
  {
    icon: <LocalShipping />,
    text: 'in_delivery'
  },
  {
    icon: <Done />,
    text: 'complete'
  }
];

type Props = {
  flag: number;
  activeStep: number;
};

const CustomStepper = ({ flag, activeStep }: Props) => {
  const { t } = useTranslation(['myOrders']);

  const isSmallScreen = useMediaQuery('(max-width: 575px)');

  return (
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
      ) : isSmallScreen ? (
        <Step>
          <StepLabel icon={steps[activeStep].icon} StepIconComponent={CustomStepIcon}>
            {t(`myOrders:${steps[activeStep].text}`)}
          </StepLabel>
        </Step>
      ) : (
        steps.map((step) => (
          <Step key={step.text}>
            <StepLabel icon={step.icon} StepIconComponent={CustomStepIcon}>
              {t(`myOrders:${step.text}`)}
            </StepLabel>
          </Step>
        ))
      )}
    </Stepper>
  );
};

export default CustomStepper;
