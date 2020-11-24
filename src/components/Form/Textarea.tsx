import React from 'react';

type Props = {
  name: string;
  iconClass: string;
  placeholder?: string;
  containerClass?: string;
};

const Textarea = (props: Props, ref): JSX.Element => {
  const { containerClass = '' } = props;

  return (
    <div className={`input-group form__input-group ${containerClass} flex-column`}>
      <i className={`${props.iconClass} form__input-icon`}></i>
      <textarea
        name={props.name}
        ref={ref}
        className="form-control no-spinner w-100"
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default React.forwardRef(Textarea);
