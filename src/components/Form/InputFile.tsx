import React from 'react';

type Props = {
  name: string;
  iconClass: string;
  placeholder?: string;
  containerClass?: string;
};

const InputFile = (props: Props, ref) => {
  const { containerClass = '' } = props;

  return (
    <>
      {/* <div className={`input-group form__input-group ${containerClass}`}>
      <i className={`${props.iconClass} form__input-icon`}></i>
      <input
        name={props.name}
        ref={ref}
        className="form-control no-spinner"
        placeholder={props.placeholder}
        type={'file'}
      />
    </div> */}
      <div className={`input-group ${containerClass}`}>
        <div className="input-group-prepend">
          <span className="input-group-text text-small" id="upload">
            <div className={`${props.iconClass} mr-2`}></div>
            {props.name}
          </span>
        </div>
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="upload-file"
            aria-describedby="upload"
          />
          <label className="custom-file-label" htmlFor="upload-file">
            Choose file
          </label>
        </div>
      </div>
    </>
  );
};

export default React.forwardRef(InputFile);
