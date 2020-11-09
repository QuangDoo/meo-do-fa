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
    <div className="filter-search__search text-right mb-4">
      <input name="search" className="search " placeholder={props.placeholder} ref={register()} />
      <button className="btn-search">
        <i className="fa fa-search" />
      </button>
    </div>
  );
}
export default InputSearch;
