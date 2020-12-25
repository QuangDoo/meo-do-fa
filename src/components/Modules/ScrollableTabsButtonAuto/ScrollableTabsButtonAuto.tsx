import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'i18n';
import React, { useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

export default function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const [value, setValue] = useState<number>(0);

  const handleChange = (_, newValue: number) => {
    setValue(newValue);
  };

  const { t } = useTranslation('common');

  function parseHTML(string) {
    return ['<p><br></p>', 'false'].includes(string) ? (
      t('updating')
    ) : (
      <p dangerouslySetInnerHTML={{ __html: string }} />
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
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example">
          <Tab label={props.labelInfo} {...a11yProps(0)} />
          <Tab label={props.labelIndication} {...a11yProps(1)} />
          <Tab label={props.labelContraindion} {...a11yProps(2)} />
          <Tab label={props.labelDirection} {...a11yProps(3)} />
          <Tab label={props.labelInteraction} {...a11yProps(4)} />
          <Tab label={props.labelPreservation} {...a11yProps(5)} />
          <Tab label={props.labelOverdose} {...a11yProps(6)} />
          <Tab label={props.labelPharmacodynamics} {...a11yProps(7)} />
          <Tab label={props.labelPharmacokinetics} {...a11yProps(8)} />
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
