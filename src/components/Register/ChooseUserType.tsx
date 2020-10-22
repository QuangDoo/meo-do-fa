import React from 'react'
import UserTypeCard, { UserType } from './UserTypeCard'

type ChooseUserTypeProps = {
  setUserType: (value: UserType) => void
}

const ChooseUserType = (props: ChooseUserTypeProps, ref) => {
  const { setUserType } = props

  return (
    <div className="business-group">
      <div className="container text-center">
        <div className="row">
          <div className="col-12 mb-3">
            <h6>Bạn là</h6>
          </div>
        </div>

        <input name="userType" hidden type="text" ref={ref} />

        <div className="row no-gutters">
          {/* Nhà thuốc */}
          <UserTypeCard
            userType="pharmacy"
            imgUrl="https://assets.thuocsi.vn/assets/business/pharmacy-75ebf6ea2091b10eafea512cd9d77debf72723e9888d8b2afc7e90885609b1fe.png"
            setUserType={setUserType}
          />

          {/* Phòng khám */}
          <UserTypeCard
            userType="clinic"
            imgUrl="https://assets.thuocsi.vn/assets/business/clinic-c2c574f6034efe31a30f33476ba2581cc85b24fb2d7b0abe2be2367cc175c2ed.png"
            setUserType={setUserType}
          />

          {/* Quầy thuốc */}
          <UserTypeCard
            userType="drugstore"
            imgUrl="https://assets.thuocsi.vn/assets/business/drugstore-1aada7d824b614c706a01efccb7608e67107a36623a14def79bdfebeacdc02d0.png"
            setUserType={setUserType}
          />
        </div>
      </div>
    </div>
  )
}

export default React.forwardRef(ChooseUserType)
