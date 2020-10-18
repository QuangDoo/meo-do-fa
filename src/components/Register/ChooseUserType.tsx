import React, { FC } from 'react'
import UserTypeCard from './UserTypeCard'

type ChooseUserTypeProps = {
  setUserType: (userType: string) => void
}

const ChooseUserType: FC<ChooseUserTypeProps> = (props) => {
  return (
    <div className="business-group">
      <div className="container text-center">
        <div className="row">
          <div className="col-12 mb-3">
            <h6>Bạn là</h6>
          </div>
        </div>

        <div className="row no-gutters">
          {/* Nhà thuốc */}
          <UserTypeCard
            text="Nhà thuốc"
            imgUrl="https://assets.thuocsi.vn/assets/business/pharmacy-75ebf6ea2091b10eafea512cd9d77debf72723e9888d8b2afc7e90885609b1fe.png"
            onClick={() => setUserType('Nhà thuốc')}
          />

          {/* Phòng khám */}
          <UserTypeCard
            text="Phòng khám"
            imgUrl="https://assets.thuocsi.vn/assets/business/clinic-c2c574f6034efe31a30f33476ba2581cc85b24fb2d7b0abe2be2367cc175c2ed.png"
          />

          {/* Quầy thuốc */}
          <UserTypeCard
            text="Quầy thuốc"
            imgUrl="https://assets.thuocsi.vn/assets/business/drugstore-1aada7d824b614c706a01efccb7608e67107a36623a14def79bdfebeacdc02d0.png"
          />
        </div>
      </div>
    </div>
  )
}

export default ChooseUserType
