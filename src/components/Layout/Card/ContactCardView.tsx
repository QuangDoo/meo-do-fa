import React from 'react'

type Props = {
  children?: React.ReactNode
  title?: string
  iconClass?: string
}

function ContactCardView (props: Props): JSX.Element {
  return (
    <div className="help-contact">
      <i className={props.iconClass}></i>
      <div className="help-content">
        <div className="help-title">{props.title}</div>
        <div className="text-small">{props.children}</div>
      </div>
    </div>
  )
}

export default ContactCardView