<<<<<<< HEAD
import React, { Dispatch, FC, SetStateAction } from 'react'
import { UserType } from '.'
import UserTypeCard from './UserTypeCard'

type ChooseUserTypeProps = {
  setUserType: Dispatch<SetStateAction<UserType>>
}

export const userTypeMap = {
  pharmacy: 'Nhà thuốc',
  clinic: 'Phòng khám',
  drugstore: 'Quầy thuốc',
}

const ChooseUserType: FC<ChooseUserTypeProps> = (props) => {
  const { setUserType } = props

=======
import React, { FC } from 'react'
import UserTypeCard from './UserTypeCard'

type ChooseUserTypeProps = {
  setUserType: (userType: string) => void
}

const ChooseUserType: FC<ChooseUserTypeProps> = (props) => {
>>>>>>> 2f41003... Update.
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
<<<<<<< HEAD
            text={userTypeMap['pharmacy']}
            imgUrl="https://assets.thuocsi.vn/assets/business/pharmacy-75ebf6ea2091b10eafea512cd9d77debf72723e9888d8b2afc7e90885609b1fe.png"
            onClick={() => setUserType('pharmacy')}
=======
            text="Nhà thuốc"
            imgUrl="https://assets.thuocsi.vn/assets/business/pharmacy-75ebf6ea2091b10eafea512cd9d77debf72723e9888d8b2afc7e90885609b1fe.png"
            onClick={() => setUserType('Nhà thuốc')}
>>>>>>> 2f41003... Update.
          />

          {/* Phòng khám */}
          <UserTypeCard
<<<<<<< HEAD
            text={userTypeMap['clinic']}
            imgUrl="https://assets.thuocsi.vn/assets/business/clinic-c2c574f6034efe31a30f33476ba2581cc85b24fb2d7b0abe2be2367cc175c2ed.png"
            onClick={() => setUserType('clinic')}
=======
            text="Phòng khám"
            imgUrl="https://assets.thuocsi.vn/assets/business/clinic-c2c574f6034efe31a30f33476ba2581cc85b24fb2d7b0abe2be2367cc175c2ed.png"
>>>>>>> 2f41003... Update.
          />

          {/* Quầy thuốc */}
          <UserTypeCard
<<<<<<< HEAD
            text={userTypeMap['drugstore']}
            imgUrl="https://assets.thuocsi.vn/assets/business/drugstore-1aada7d824b614c706a01efccb7608e67107a36623a14def79bdfebeacdc02d0.png"
            onClick={() => setUserType('drugstore')}
=======
            text="Quầy thuốc"
            imgUrl="https://assets.thuocsi.vn/assets/business/drugstore-1aada7d824b614c706a01efccb7608e67107a36623a14def79bdfebeacdc02d0.png"
>>>>>>> 2f41003... Update.
          />
        </div>
      </div>
    </div>
  )
}

export default ChooseUserType
