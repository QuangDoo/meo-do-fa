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
  return (
    <div className="col-12 col-sm-9 product__details">
      <Tabs>
        <TabContent label="Thông tin chung">
          {props.info !== 'false' ? props.info : 'Đang cập nhật'}
        </TabContent>
        <TabContent label="Chỉ định">
          {props.indication !== 'false' ? props.indication : 'Đang cập nhật'}
        </TabContent>
        <TabContent label="Liều lượng - Cách dùng">
          {props.contraindication !== 'false' ? props.contraindication : 'Đang cập nhật'}
        </TabContent>
        <TabContent label="Chống chỉ định">
          {props.direction !== 'false' ? props.direction : 'Đang cập nhật'}
        </TabContent>
        <TabContent label="Tương tác thuốc">
          {props.interaction !== 'false' ? props.interaction : 'Đang cập nhật'}
        </TabContent>
        <TabContent label="Bảo quản">
          {props.preservation !== 'false' ? props.preservation : 'Đang cập nhật'}
        </TabContent>
        <TabContent label="Quá liều">
          {props.overdose !== 'false' ? props.overdose : 'Đang cập nhật'}
        </TabContent>
        <TabContent label="Dược lực học">
          {props.pharmacodynamics !== 'false' ? props.pharmacodynamics : 'Đang cập nhật'}
        </TabContent>
        <TabContent label="Dược động học">
          {props.pharmacokinetics !== 'false' ? props.pharmacokinetics : 'Đang cập nhật'}
        </TabContent>
      </Tabs>
    </div>
  );
}
