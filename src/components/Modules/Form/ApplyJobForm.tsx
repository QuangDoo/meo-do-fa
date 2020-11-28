import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Checkbox from '../../Form/Checkbox';
import Textarea from '../../Form/Textarea';

export default function ApplyJobForm(props) {
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className="form w-100" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="fullname">
          <b>
            Full Name <span style={{ color: 'red' }}>*</span>
          </b>
        </label>
        <input
          ref={register}
          name="fullname"
          type="text"
          className="form-control"
          id="fullname"
          placeholder="Trần Quốc Hùng"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">
          <b>
            Email <span style={{ color: 'red' }}>*</span>
          </b>
        </label>
        <input
          ref={register}
          type="email"
          className="form-control"
          id="email"
          placeholder="tranquochung6810@gmail.com"
          name="email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">
          <b>
            Phone <span style={{ color: 'red' }}>*</span>
          </b>
        </label>
        <input
          ref={register}
          type="text"
          className="form-control"
          id="phone"
          placeholder="0912334674"
          name="phone"
        />
      </div>
      <Textarea
        ref={register}
        placeholder={`Cover Leter`}
        label={`Cover Letter`}
        htmlFor={'coverLetter'}
      />
      <div className="form-group mb-3">
        <label htmlFor="inputFile">
          <b>
            Upload CV <span style={{ color: 'red' }}>*</span>
          </b>
        </label>
        <div>
          <input ref={register} name="cv" type="file" id="inputFile" />
        </div>
      </div>

      <Checkbox
        ref={register}
        containerClass="my-1 mr-sm-2"
        name="check"
        label="By using this form you agree with the storage and handling of your data by this website. *"
      />
      <div className="form-group text-center">
        <button type="submit" className="btn btn-primary my-1">
          Apply this job
        </button>
      </div>
    </form>
  );
}
