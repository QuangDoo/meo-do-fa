import React, { FC } from 'react'

type UserTypeCardProps = {
  text: string
  imgUrl: string
  onClick: () => void
}

const UserTypeCard: FC<UserTypeCardProps> = ({ text, onClick, imgUrl }) => {
  return (
    <button type="button" className="col-6 business-group__item p-2" onClick={onClick}>
      <img alt="" className="img-fluid" src={imgUrl} />
      <h6 className="business-group__item__text font-weight-bold">{text}</h6>
    </button>
  )
}

export default UserTypeCard
