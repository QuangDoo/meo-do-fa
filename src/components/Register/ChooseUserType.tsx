import React from 'react'
import { UserType, userTypeMap } from './RegisterForm'
import UserTypeCard from './UserTypeCard'

type Props = {
  setUserType: (value: UserType) => void
}

const ChooseUserType = (props: Props) => {
  const { setUserType } = props

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-12 mb-3">
          <h6>Bạn là</h6>
        </div>
      </div>

      <div className="row no-gutters">
        {/* Nhà thuốc */}
        <UserTypeCard
          text={userTypeMap['pharmacy']}
          imgUrl="https://assets.thuocsi.vn/assets/business/pharmacy-75ebf6ea2091b10eafea512cd9d77debf72723e9888d8b2afc7e90885609b1fe.png"
          onClick={() => setUserType('pharmacy')}
        />

        {/* Phòng khám */}
        <UserTypeCard
          text={userTypeMap['clinic']}
          imgUrl="https://assets.thuocsi.vn/assets/business/clinic-c2c574f6034efe31a30f33476ba2581cc85b24fb2d7b0abe2be2367cc175c2ed.png"
          onClick={() => setUserType('clinic')}
        />

        {/* Quầy thuốc */}
        <UserTypeCard
          text={userTypeMap['drugstore']}
          imgUrl="https://assets.thuocsi.vn/assets/business/drugstore-1aada7d824b614c706a01efccb7608e67107a36623a14def79bdfebeacdc02d0.png"
          onClick={() => setUserType('drugstore')}
        />
      </div>
    </div>
  )
}

export default ChooseUserType
