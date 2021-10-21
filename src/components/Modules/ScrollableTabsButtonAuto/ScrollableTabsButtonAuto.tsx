import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'i18n';
import React, { Attributes, useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type ProducerInformation = {
  info?: string;
  indication?: string;
  contraindication?: string;
  direction?: string;
  interaction?: string;
  preservation?: string;
  overdose?: string;
  pharmacodynamics?: string;
  pharmacokinetics?: string;
  labelInfo?: string;
  labelIndication?: string;
  labelContraindion?: string;
  labelDirection?: string;
  labelInteraction?: string;
  labelPreservation?: string;
  labelOverdose?: string;
  labelPharmacodynamics?: string;
  labelPharmacokinetics?: string;
  init: number;
  vari;
  className?: string;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: '100%'
  }
}));

export default function ScrollableTabsButtonAuto(props: ProducerInformation) {
  const classes = useStyles();
  const [value, setValue] = useState<number>(props.init);

  const handleChange = (_, newValue: number) => {
    setValue(newValue);
  };

  const { t } = useTranslation('common');

  function parseHTML(string) {
    return ['<p><br></p>', 'false', null].includes(string) ? (
      <span>{t('updating')}</span>
    ) : (
      <p className={props.className} dangerouslySetInnerHTML={{ __html: string }} />
    );
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant={props.vari}
          aria-label="scrollable auto tabs example">
          <Tab
            label={props.labelInfo}
            {...a11yProps(0)}
            hidden={typeof props.info == 'undefined'}
          />
          <Tab
            label={props.labelIndication}
            {...a11yProps(1)}
            hidden={typeof props.indication == 'undefined'}
          />
          <Tab
            label={props.labelContraindion}
            {...a11yProps(2)}
            hidden={typeof props.contraindication == 'undefined'}
          />
          <Tab
            label={props.labelDirection}
            {...a11yProps(3)}
            hidden={typeof props.direction == 'undefined'}
          />
          <Tab
            label={props.labelInteraction}
            {...a11yProps(4)}
            hidden={typeof props.interaction == 'undefined'}
          />
          <Tab
            label={props.labelPreservation}
            {...a11yProps(5)}
            hidden={typeof props.preservation == 'undefined'}
          />
          <Tab
            label={props.labelOverdose}
            {...a11yProps(6)}
            hidden={typeof props.overdose == 'undefined'}
          />
          <Tab
            label={props.labelPharmacodynamics}
            {...a11yProps(7)}
            hidden={typeof props.pharmacodynamics == 'undefined'}
          />
          <Tab
            label={props.labelPharmacokinetics}
            {...a11yProps(8)}
            hidden={typeof props.pharmacokinetics == 'undefined'}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {parseHTML(props.info)}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {parseHTML(props.indication)}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {parseHTML(props.contraindication)}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {parseHTML(props.direction)}
      </TabPanel>
      <TabPanel value={value} index={4}>
        {parseHTML(props.interaction)}
      </TabPanel>
      <TabPanel value={value} index={5}>
        {parseHTML(props.preservation)}
      </TabPanel>
      <TabPanel value={value} index={6}>
        {parseHTML(props.overdose)}
      </TabPanel>
      <TabPanel value={value} index={7}>
        {parseHTML(props.pharmacodynamics)}
      </TabPanel>
      <TabPanel value={value} index={8}>
        {parseHTML(props.pharmacokinetics)}
      </TabPanel>
    </div>
  );
}
