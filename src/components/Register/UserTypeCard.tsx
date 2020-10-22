import React, { FC } from 'react'

type UserTypeCardProps = {
  text: string
  imgUrl: string
  onClick: () => void
}

const UserTypeCard: FC<UserTypeCardProps> = ({ text, onClick, imgUrl }) => {
  return (
    <div
      className="col-6 business-group__item p-2"
      onKeyPress={onClick}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <img alt="" className="img-fluid" src={imgUrl} />
      <h6 className="business-group__item__text font-weight-bold">{text}</h6>
    </div>
  )
}

export default UserTypeCard
