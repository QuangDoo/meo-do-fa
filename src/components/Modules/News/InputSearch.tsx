import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type PropsType = {
  placeholder: string;
  keySearch: (x) => void;
};
type Value = {
  toLowerCase: () => void;
};
type InputsSearch = {
  key: string;
};
function InputSearch(props: PropsType): JSX.Element {
  const { register, getValues, watch } = useForm<InputsSearch>();
  const value: Value = getValues('search');
  const res = value?.toLowerCase();
  useEffect(() => {
    props.keySearch(res);
  }, [value]);

  watch('search');

  return (
    <div className="news-search mb-4">
      <input
        name="search"
        className="news-search__input "
        placeholder={props.placeholder}
        ref={register()}
      />
      <button className="news-search__button">
        <SearchIcon />
      </button>
    </div>
  );
}
export default InputSearch;
