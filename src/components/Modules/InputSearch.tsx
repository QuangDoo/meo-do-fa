import React from 'react';
type PropsType = {
  placeholder: string;
};
function InputSearch(props: PropsType): JSX.Element {
  return (
    <div className="filter-search__search text-right mb-4">
      <input
        type="search"
        name="search"
        id="search"
        className="search "
        placeholder={props.placeholder}
      />
      <button className="btn-search">
        <i className="fa fa-search" />
      </button>
    </div>
  );
}
export default InputSearch;
