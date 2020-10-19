import React, { FC } from 'react'

export type UserType = 'pharmacy' | 'clinic' | 'drugstore'

export const userTypeMap: Record<UserType, string> = {
  pharmacy: 'Nhà thuốc',
  clinic: 'Phòng khám',
  drugstore: 'Quầy thuốc',
}

type UserTypeCardProps = {
  userType: UserType
  imgUrl: string
  setUserType: (value: UserType) => void
}

const UserTypeCard: FC<UserTypeCardProps> = ({ userType, setUserType, imgUrl }) => {
  return (
    <div className="col-6 business-group__item p-2" onClick={() => setUserType(userType)}>
      <img alt="" className="img-fluid" src={imgUrl} />
      <h6 className="business-group__item__text font-weight-bold">{userTypeMap[userType]}</h6>
    </div>
  )
}

export default UserTypeCard
