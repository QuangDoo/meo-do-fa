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
  const { t } = useTranslation(['ingredientDetails', 'common']);
  return (
    <div className="product__details">
      <Tabs>
        <TabContent label={t('ingredientDetails:info_label')}>
          {props.info !== 'false' ? props.info : t('common:updating')}
        </TabContent>
        <TabContent label={t('ingredientDetails:indication_label')}>
          {props.indication !== 'false' ? props.indication : t('common:updating')}
        </TabContent>
        <TabContent label={t('ingredientDetails:direction_label')}>
          {props.contraindication !== 'false' ? props.contraindication : t('common:updating')}
        </TabContent>
        <TabContent label={t('ingredientDetails:contraindication_label')}>
          {props.direction !== 'false' ? props.direction : t('common:updating')}
        </TabContent>
        <TabContent label={t('ingredientDetails:interaction_label')}>
          {props.interaction !== 'false' ? props.interaction : t('common:updating')}
        </TabContent>
        <TabContent label={t('ingredientDetails:preservation_label')}>
          {props.preservation !== 'false' ? props.preservation : t('common:updating')}
        </TabContent>
        <TabContent label={t('ingredientDetails:overdose_label')}>
          {props.overdose !== 'false' ? props.overdose : t('common:updating')}
        </TabContent>
        <TabContent label={t('pharmacodynamics_label')}>
          {props.pharmacodynamics !== 'false' ? props.pharmacodynamics : t('common:updating')}
        </TabContent>
        <TabContent label={t('pharmacokinetics_label')}>
          {props.pharmacokinetics !== 'false' ? props.pharmacokinetics : t('common:updating')}
        </TabContent>
      </Tabs>
    </div>
  );
}
