import React from 'react';

import { StyledCard, StyledCardBody, StyledCardButtonGroup, StyledCardImage } from './Card.styled';

interface CardProps {
  children: React.ReactNode;
  buttonGroups?: React.ReactNode;
  imageURL: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <StyledCard>
      <StyledCardImage src={props.imageURL} />
      <StyledCardBody>{props.children}</StyledCardBody>
      {props.buttonGroups && <StyledCardButtonGroup>{props.buttonGroups}</StyledCardButtonGroup>}
    </StyledCard>
  );
};

export default Card;
