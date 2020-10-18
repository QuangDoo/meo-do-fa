import React, { FC } from 'react'

type UserTypeCardProps = {
  active?: boolean
  imgUrl: string
  text: string
  onClick?: () => void
}

const UserTypeCard: FC<UserTypeCardProps> = (props) => {
  const activeClass = props.active ? 'active' : ''

  return (
    <div className={`col-6 business-group__item p-2 ${activeClass}`} onClick={props.onclick}>
      <img alt="" className="img-fluid" src={props.imgUrl} />
      <h6 className="business-group__item__text font-weight-bold">{props.text}</h6>
    </div>
  )
}

export default UserTypeCard
