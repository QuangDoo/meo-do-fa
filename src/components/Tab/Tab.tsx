import { useTranslation } from 'i18n';
import React, { useState } from 'react';

const TabButtons = ({ buttons, changeTab, activeTab }): JSX.Element => {
  return (
    <div className="nav tab tab-header no-scrollbar">
      {buttons.map((button, index) => {
        return (
          <span
            className={button === activeTab ? 'tab__item active' : 'tab__item'}
            onClick={() => changeTab(button)}
            key={index}
            aria-hidden="true">
            {button}
          </span>
        );
      })}
    </div>
  );
};

const Tabs = (props): JSX.Element => {
  const [activeTab, setActiveTab] = useState(props.children[0].props.label);
  const changeTab = (tab) => {
    setActiveTab(tab);
  };
  let content;
  const buttons = [];
  return (
    <div>
      {React.Children.map(props.children, (child) => {
        buttons.push(child.props.label);
        if (child.props.label === activeTab) content = child.props.children;
      })}
      <TabButtons activeTab={activeTab} buttons={buttons} changeTab={changeTab} />
      <div className="tab-content">{content}</div>
    </div>
  );
};

const TabContent = (props): JSX.Element => {
  return (
    <div className="tab-content">
      <div className="tab-pane fade show active" id="description">
        {props.children}
      </div>
    </div>
  );
};
export default function Tab(props) {
  const { t } = useTranslation(['common']);
  return (
    <div className="product__details">
      <Tabs>
        <TabContent label={props.labelInfo}>
          {props.info !== 'false' ? props.info : t('updating')}
        </TabContent>
        <TabContent label={props.labelIndication}>
          {props.indication !== 'false' ? props.indication : t('updating')}
        </TabContent>
        <TabContent label={props.labelContraindion}>
          {props.contraindication !== 'false' ? props.contraindication : t('updating')}
        </TabContent>
        <TabContent label={props.labelDirection}>
          {props.direction !== 'false' ? props.direction : t('updating')}
        </TabContent>
        <TabContent label={props.labelInteraction}>
          {props.interaction !== 'false' ? props.interaction : t('updating')}
        </TabContent>
        <TabContent label={props.labelPreservation}>
          {props.preservation !== 'false' ? props.preservation : t('updating')}
        </TabContent>
        <TabContent label={props.labelOverdose}>
          {props.overdose !== 'false' ? props.overdose : t('updating')}
        </TabContent>
        <TabContent label={props.labelPharmacodynamics}>
          {props.pharmacodynamics !== 'false' ? props.pharmacodynamics : t('updating')}
        </TabContent>
        <TabContent label={props.labelPharmacokinetics}>
          {props.pharmacokinetics !== 'false' ? props.pharmacokinetics : t('updating')}
        </TabContent>
      </Tabs>
    </div>
  );
}
