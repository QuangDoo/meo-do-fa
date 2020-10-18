import React, { FC } from 'react'

type UserTypeCardProps = {
  active?: boolean
  imgUrl: string
  text: string
<<<<<<< HEAD
  onClick?: any
=======
  onClick?: () => void
>>>>>>> 2f41003... Update.
}

const UserTypeCard: FC<UserTypeCardProps> = (props) => {
  const activeClass = props.active ? 'active' : ''

  return (
<<<<<<< HEAD
    <div className={`col-6 business-group__item p-2 ${activeClass}`} onClick={props.onClick}>
=======
    <div className={`col-6 business-group__item p-2 ${activeClass}`} onClick={props.onclick}>
>>>>>>> 2f41003... Update.
      <img alt="" className="img-fluid" src={props.imgUrl} />
      <h6 className="business-group__item__text font-weight-bold">{props.text}</h6>
    </div>
  )
}

export default UserTypeCard
