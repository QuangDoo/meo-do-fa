import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'i18n';
import React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
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

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%'
  }
}));

export default function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<string, never>, newValue: number) => {
    setValue(newValue);
  };

  const { t } = useTranslation('common');

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
        {props.info !== 'false' ? props.info : t('updating')}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {props.indication !== 'false' ? props.indication : t('updating')}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {props.contraindication !== 'false' ? props.contraindication : t('updating')}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {props.direction !== 'false' ? props.direction : t('updating')}
      </TabPanel>
      <TabPanel value={value} index={4}>
        {props.interaction !== 'false' ? props.interaction : t('updating')}
      </TabPanel>
      <TabPanel value={value} index={5}>
        {props.preservation !== 'false' ? props.preservation : t('updating')}
      </TabPanel>
      <TabPanel value={value} index={6}>
        {props.overdose !== 'false' ? props.overdose : t('updating')}
      </TabPanel>
      <TabPanel value={value} index={7}>
        {props.pharmacodynamics !== 'false' ? props.pharmacodynamics : t('updating')}
      </TabPanel>
      <TabPanel value={value} index={8}>
        {props.pharmacokinetics !== 'false' ? props.pharmacokinetics : t('updating')}
      </TabPanel>
    </div>
  );
}

// const TabButtons = ({ buttons, changeTab, activeTab }): JSX.Element => {
//   return (
//     <div className="nav tab tab-header no-scrollbar">
//       {buttons.map((button, index) => {
//         return (
//           <span
//             className={button === activeTab ? 'tab__item active' : 'tab__item'}
//             onClick={() => changeTab(button)}
//             key={index}
//             aria-hidden="true">
//             {button}
//           </span>
//         );
//       })}
//     </div>
//   );
// };

// const Tabs = (props): JSX.Element => {
//   const [activeTab, setActiveTab] = useState(props.children[0].props.label);
//   const changeTab = (tab) => {
//     setActiveTab(tab);
//   };
//   let content;
//   const buttons = [];
//   return (
//     <div>
//       {React.Children.map(props.children, (child) => {
//         buttons.push(child.props.label);
//         if (child.props.label === activeTab) content = child.props.children;
//       })}
//       <TabButtons activeTab={activeTab} buttons={buttons} changeTab={changeTab} />
//       <div className="tab-content">{content}</div>
//     </div>
//   );
// };

// const TabContent = (props): JSX.Element => {
//   return (
//     <div className="tab-content">
//       <div className="tab-pane fade show active" id="description">
//         {props.children}
//       </div>
//     </div>
//   );
// };

// export default function Tab(props) {
//   const { t } = useTranslation(['common']);
//   return (
//     <div className="product__details">
//       <Tabs>
//         <TabContent label={props.labelInfo}>
//           {props.info !== 'false' ? props.info : t('updating')}
//         </TabContent>
//         <TabContent label={props.labelIndication}>
//           {props.indication !== 'false' ? props.indication : t('updating')}
//         </TabContent>
//         <TabContent label={props.labelContraindion}>
//           {props.contraindication !== 'false' ? props.contraindication : t('updating')}
//         </TabContent>
//         <TabContent label={props.labelDirection}>
//           {props.direction !== 'false' ? props.direction : t('updating')}
//         </TabContent>
//         <TabContent label={props.labelInteraction}>
//           {props.interaction !== 'false' ? props.interaction : t('updating')}
//         </TabContent>
//         <TabContent label={props.labelPreservation}>
//           {props.preservation !== 'false' ? props.preservation : t('updating')}
//         </TabContent>
//         <TabContent label={props.labelOverdose}>
//           {props.overdose !== 'false' ? props.overdose : t('updating')}
//         </TabContent>
//         <TabContent label={props.labelPharmacodynamics}>
//           {props.pharmacodynamics !== 'false' ? props.pharmacodynamics : t('updating')}
//         </TabContent>
//         <TabContent label={props.labelPharmacokinetics}>
//           {props.pharmacokinetics !== 'false' ? props.pharmacokinetics : t('updating')}
//         </TabContent>
//       </Tabs>
//     </div>
//   );
// }
