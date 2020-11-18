import styled from 'styled-components'

const imgUrl = "https://via.placeholder.com/768/300"

export const StyledNewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: 0.3s linear;
  margin: 0 0 1rem;
  &: hover {
    box-shadow: 1px 2px 3px #999;
  }
`

export const StyledNewBoxImg = styled.div``

export const StyledNewBoxText = styled.div`
  padding: 0.75rem 1rem;
`

export const StyledNewTitle = styled.h5`
  text-align: center;
  font-size: 1.15em;
  line-height: 1.3;
  color: #555;
  font-weight: 700;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;

`

export const StyledNewDivider = styled.div`
  margin: 0.5rem auto;
  height: 2px;
  width: 100%;
  max-width: 30px;
  background: #ccc;
`

export const StyledNewDescription = styled.p`
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.9em;
  opacity: 0.7;
  transition: 0.3s linear;
  &:hover {
    opacity: 1;
  }
`

export const StyledBadgeBox = styled.div`
  display: table;
  position: absolute;
  top: 7%;
  left: 2px;
  pointer-events: none;
`

export const StyledBadge = styled.div`
  display: table-cell;
  background: white;
  line-height: 0.85;
  width: 100%;
  height: 100%;
  border: 2px solid green;
  padding: 0.5rem;
  transition: 0.3s linear;

  ${StyledNewWrapper}:hover & {
    background: green;
  }
`

export const StyledBadgeDateDay = styled.div`
  font-size: 0.7rem;
  color: green;
  transition: 0.3s linear;
  font-weight: bold;
  ${StyledNewWrapper}:hover & {
    color: white;
  }

`

export const StyledBadgeDateMonth = styled(StyledBadgeDateDay)``

export interface Props {
  onPress: any;
  src: any;
  width: string;
  height: string;
}

export const StyledMyImage = styled.img.attrs((props:any):void => {
  src: props.src || imgUrl ;
  alt: props.alt|| imgUrl ;
})`
  width: 100%;
`;
