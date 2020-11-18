import React from 'react'
import Link from 'next/link'
import {
  StyledRecentPostBox,
  StyledRecentPost,
  StyledRecentPostDivider,
  StyledRecentPostItem,
  StyledRecentPostTitle,
  StyledRecentPostLink,
  StyledRecentImg
} from './RecentPost.styled'

const color="green"

function renderPost(links:any):JSX.IntrinsicElements {
  return links.map((item, index )=> (
    <StyledRecentPostItem key={index}> 
      <Link href={item.href}>
        <StyledRecentPostLink color={color}>{item.title}</StyledRecentPostLink>
      </Link>
    </StyledRecentPostItem>))
}

interface IProps {
  title: string
  links?: any
  imgUrl?: string
}

export default function RecentPost ({title, links, imgUrl, ...props}: IProps): JSX.Element {
  if(links){
    return (
      <StyledRecentPostBox>
        <StyledRecentPostTitle>{title}</StyledRecentPostTitle>
        <StyledRecentPostDivider/>
        <StyledRecentPost>
          {
            renderPost(links)
          }
        </StyledRecentPost>
      </StyledRecentPostBox>
    )
  }
  if(imgUrl) {
    return (
      <StyledRecentPostBox>
        <StyledRecentPostTitle>{title}</StyledRecentPostTitle>
        <StyledRecentPostDivider/>
        <StyledRecentImg src={imgUrl} alt={title}></StyledRecentImg>
      </StyledRecentPostBox>
    )
  }
}