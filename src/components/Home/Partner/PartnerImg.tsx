import React, { FC } from 'react'

type PartnerImgProps = {
  imgUrl: string
}

const PartnerImg: FC<PartnerImgProps> = (props) => {
  return <img src={props.imgUrl} alt="" className="img-fluid" />
}

export default PartnerImg
