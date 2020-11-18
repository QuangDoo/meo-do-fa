import React from 'react'
import Link from 'next/link'
import {
  StyledNewWrapper,
  StyledNewBoxImg,
  StyledNewBoxText,
  StyledNewDescription,
  StyledNewTitle,
  StyledBadgeBox,
  StyledBadgeDateDay,
  StyledBadgeDateMonth,
  StyledNewDivider,
  StyledBadge,
  StyledMyImage
} from './New.styled'

interface IProps{
  imgUrl: string,
  title: string,
  description: string,
}

export default function New (props): JSX.Element {
  return (
    <div className="col-lg-6 col-sm-12 position-relative mb-2">
      <Link href={`/news/${props.children.title}`}>
        <StyledNewWrapper>
          <StyledNewBoxImg>
            <StyledMyImage src={props.children.imgUrl} alt={props.children.imgUrl}></StyledMyImage>
            {/* <img src={props.children.imgUrl} alt={props.children.imgUrl} style={{width: "100%"}}></img> */}
          </StyledNewBoxImg>
          <StyledNewBoxText>
            <StyledNewTitle>{props.children.title}</StyledNewTitle>
            <StyledNewDivider></StyledNewDivider>
            <StyledNewDescription>{props.children.description}</StyledNewDescription>
          </StyledNewBoxText>
          <StyledBadgeBox>
            <StyledBadge>
              <StyledBadgeDateDay>22</StyledBadgeDateDay>
              <StyledBadgeDateMonth>Jul</StyledBadgeDateMonth>
            </StyledBadge>
          </StyledBadgeBox>
        </StyledNewWrapper>
      </Link>
    </div>
  )
}
