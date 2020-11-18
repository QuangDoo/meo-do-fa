import styled from 'styled-components';

import { StyledNewDivider } from './New.styled';
import { StyledMyImage } from './New.styled';

export const StyledRecentPostBox = styled.div`
  width: 100%;
  text-align: left;
`;

export const StyledRecentPost = styled.ul`
  list-style: none;

  &:last-child {
    border: none;
  }
`;

export const StyledRecentPostItem = styled.li`
  margin-bottom: 0.3rem;
  border-bottom: 1px solid #ddd;
  color: green;
`;

export const StyledRecentPostTitle = styled.div`
  font-weight: 700;
  text-transform: uppercase;
  color: grey;
`;

export const StyledRecentPostDivider = styled(StyledNewDivider)`
  margin: 0.5rem 0;
  text-align: left;
`;

export const StyledRecentPostLink = styled.a`
  color: green;
  transition: 0.3s linear;
  cursor: pointer;

  &:hover {
    color: black;
  }
  &:active {
    color: black;
  }
`;

export const StyledRecentImg = styled(StyledMyImage)`
  max-width: 300px;
`;
