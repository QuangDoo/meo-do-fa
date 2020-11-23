import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type PropsType = {
  placeholder: string;
  keySearch: (x) => void;
};

type InputsSearch = {
  key: string;
};

function InputSearch(props: PropsType): JSX.Element {
  const { register, watch } = useForm<InputsSearch>();

  const value = watch('search', '');

  const res = value?.toLowerCase();

  useEffect(() => {
    props.keySearch(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="news-search ml-2 mb-2">
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
