import React from 'react';

type Props = {
  // name: string;
  // iconClass: string;
  placeholder?: string;
  containerClass?: string;
  htmlFor?: string;
  rows?: number;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const Textarea = (props: Props, ref): JSX.Element => {
  const { containerClass = '' } = props;

  return (
    // <div className={`input-group form__input-group ${containerClass} flex-column`}>
    //   <i className={`${props.iconClass} form__input-icon`}></i>
    //   <textarea
    //     name={props.name}
    //     ref={ref}
    //     className="form-control no-spinner w-100"
    //     placeholder={props.placeholder}
    //   />
    // </div>
    <div className={`form-group ${containerClass}`}>
      <label htmlFor={`${props.htmlFor || 'textarea'}`}>
        <b>{props.label}</b>
      </label>
      <textarea
        onChange={props.onChange}
        ref={ref}
        placeholder={props.placeholder}
        className="form-control"
        name="text"
        id={`${props.htmlFor || 'textarea'}`}
        rows={props.rows}></textarea>
    </div>
  );
};

export default React.forwardRef(Textarea);
