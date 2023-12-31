import React from 'react';

type Props = {
  // name: string;
  // iconClass: string;
  placeholder?: string;
  containerClass?: string;
  htmlFor?: string;
  name?: string;
  rows?: number;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const Textarea = (props: Props, ref) => {
  const { containerClass = '' } = props;

  return (
    <div className={`form-group ${containerClass}`}>
      <label htmlFor={`${props.htmlFor || 'textarea'}`}>
        <span className="form__label">{props.label}</span>
      </label>

      <textarea
        onChange={props.onChange}
        ref={ref}
        placeholder={props.placeholder}
        className="form-control"
        name={props.name}
        id={`${props.htmlFor || 'textarea'}`}
        rows={props.rows}></textarea>
    </div>
  );
};

export default React.forwardRef(Textarea);
