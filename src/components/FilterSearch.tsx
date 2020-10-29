import React from 'react';

type PropsType = {
  dataValue: string;
  character: string;
  filter: () => void;
};

function FilterSearch(props: PropsType) {
  const filter1 = () => {
    return props.filter();
  };
  return (
    <div className="alphabet mix" data-value={props.dataValue} onClick={filter1} aria-hidden="true">
      {props.character}
    </div>
  );
}
export default FilterSearch;
