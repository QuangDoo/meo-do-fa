import React, { useState } from 'react';

import Checkbox from '../../Form/Checkbox';
import Textarea from '../../Form/Textarea';

const initialData = {
  fullname: '',
  email: '',
  phone: '',
  coverletter: ''
};

export default function ApplyJobForm(props) {
  const [data, setData] = useState<any>(initialData);

  const onHandleChangeData = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const onSubmit = (e) => {
    const result = data;
    e.preventDefault();
    console.log(result);
  };

  return (
    <form className="form w-100" onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="fullname">
          <b>
            Full Name <span style={{ color: 'red' }}>*</span>
          </b>
        </label>
        <input
          onChange={(e) => onHandleChangeData('fullname', e.currentTarget.value)}
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
          type="email"
          className="form-control"
          id="email"
          placeholder="tranquochung6810@gmail.com"
          onChange={(e) => onHandleChangeData('email', e.currentTarget.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">
          <b>
            Phone <span style={{ color: 'red' }}>*</span>
          </b>
        </label>
        <input
          type="text"
          className="form-control"
          id="phone"
          placeholder="0912334674"
          onChange={(e) => onHandleChangeData('phone', e.currentTarget.value)}
        />
      </div>
      <Textarea
        onChange={(e) => onHandleChangeData('coverletter', e.currentTarget.value)}
        placeholder={`Cover Leter`}
        label={`Cover Letter`}
        htmlFor={'text'}
      />
      <div className="form-group mb-3">
        <label htmlFor="inputFile">
          <b>
            Upload CV <span style={{ color: 'red' }}>*</span>
          </b>
        </label>
        <div className="custom-file">
          <input type="file" className="custom-file-input" id="inputFile" />
          <label className="custom-file-label" htmlFor="inputFile">
            Choose file
          </label>
        </div>
      </div>

      <Checkbox
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
