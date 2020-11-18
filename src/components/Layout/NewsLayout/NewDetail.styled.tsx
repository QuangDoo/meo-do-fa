import styled from 'styled-components';

export const StyledNewDetailBox = styled.div`
  width: 100%;
`;

export const StyledNewDetailHeader = styled.div`
  padding: 0 1rem 1rem;
`;

export const StyledNewDetailCategory = styled.h6`
  text-align: center;
  margin-bottom: 0.5 rem;
`;

export const StyledNewDetailCategoryLink = styled.a`
  line-height: 1.05;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 0.7rem;
  display: inline-block;
  color: green;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

export const StyledNewDetailContent = styled.div``;

export const StyledNewDetailTitle = styled.h1`
  margin-bottom: 0.5em;
  width: 100%;
  margin-top: 0;

  text-align: center;
  line-height: 1.3;
  font-weight: 700;
  font-size: 1.7em;

  color: #333;
`;

export const StyledNewDetailMeta = styled.div`
  text-align: center;
  font-size: 0.7em;
  color: grey;
  text-transform: uppercase;
`;

export const StyledNewDetailPostBy = styled.span``;

export const StyledNewDetailPostOn = styled(StyledNewDetailPostBy)``;

export const StyledNewDetailImg = styled.div`
  width: 100%;
  position: relative;
  padding: 0 1rem 0;
  margin-bottom: 1rem;
`;
