import styled from 'styled-components';

export const StyledSearchBox = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

export const StyledSearchInput = styled.input`
  box-sizing: border-box;
  border: 1px solid #ddd;
  padding: 0 0.75em;
  height: 2.507em;
  font-size: 0.97em;
  border-radius: 0;
  max-width: 100%;
  width: 100%;
  vertical-align: middle;
  background-color: white;
  color: #333;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: color 0.3s, border 0.3s, background 0.3s, opacity 0.3s;
  flex: 1;
`;

export const StyledSearchButton = styled.button`
  background: green;
  min-width: 2.5em;
  color: white;
`;
