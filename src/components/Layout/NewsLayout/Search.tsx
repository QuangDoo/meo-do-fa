import SearchIcon from '@material-ui/icons/Search';
import React from 'react';

import { StyledSearchBox, StyledSearchButton, StyledSearchInput } from './Search.styled';

interface IProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onChange?: (event: React.FormEvent<HTMLElement>) => void;
  placeholder: string;
}
const Search: React.FC<IProps> = ({ placeholder, onClick, onChange, ...props }) => {
  return (
    <StyledSearchBox {...props}>
      <StyledSearchInput
        placeholder={placeholder}
        onChange={onChange}
        onClick={onClick}></StyledSearchInput>
      <StyledSearchButton>
        <SearchIcon></SearchIcon>
      </StyledSearchButton>
    </StyledSearchBox>
  );
};

export default Search;
