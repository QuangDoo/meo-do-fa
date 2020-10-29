import React, { useState } from 'react'

export default function Tab(props) {
  const Tabs = (props) => {
    const [activeTab, setActiveTab] = useState(props.children[0].props.label)
    const changeTab = (tab) => {
      setActiveTab(tab)
    }
    let content
    const buttons = []
    return (
      <div>
        {React.Children.map(props.children, (child) => {
          buttons.push(child.props.label)
          if (child.props.label === activeTab) content = child.props.children
        })}

        <TabButtons activeTab={activeTab} buttons={buttons} changeTab={changeTab} />
        <div className="tab-content">{content}</div>
      </div>
    )
  }

  const TabButtons = ({ buttons, changeTab, activeTab }) => {
    return (
      <div className="nav tab tab-header no-scrollbar">
        {buttons.map((button, index) => {
          return (
            <span
              className={button === activeTab ? 'tab__item active' : 'tab__item'}
              onClick={() => changeTab(button)}
              key={index}
              aria-hidden="true"
            >
              {button}
            </span>
          )
        })}
      </div>
    )
  }
  const Tab = (props) => {
    return (
      <div className="tab-content">
        <div className="tab-pane fade show active" id="description">
          {props.children}
        </div>
      </div>
    )
  }
  return (
    <div className="col-12 col-sm-9 product__details">
      <Tabs>
        <Tab label="Thông tin chung">{props.thongTinChung}</Tab>
        <Tab label="Chỉ định">Dang cap nhat1</Tab>
        <Tab label="Liều lượng - Cách dùng">Dang cap nhat</Tab>
        <Tab label="Chống chỉ định">Dang cap nhat</Tab>
        <Tab label="Tương tác thuốc">Dang cap nhat</Tab>
        <Tab label="Bảo quản">Dang cap nhat</Tab>
        <Tab label="Quá liều">Dang cap nhat</Tab>
      </Tabs>
    </div>
  )
}
