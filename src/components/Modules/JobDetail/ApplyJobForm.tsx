import React from 'react';

import Button from '../../Form/Button';
import Checkbox from '../../Form/Checkbox';
import Input from '../../Form/Input';

export default function ApplyJobForm() {
  return (
    <div className="job-detail-form">
      <div className="form-inner">
        <h3 className="text-center text-primary mb-4">Apply for this position</h3>
        <form>
          <Input
            iconClass={`fa fa-user`}
            required={true}
            name={`Full Name :`}
            placeholder={`Full name * `}
            containerClass="mb-4"
            type={'text'}></Input>
          <Input
            iconClass={`far fa-envelope`}
            required={true}
            name={`Your Email :`}
            placeholder={`Your Email * `}
            containerClass="mb-4"
            type={'text'}></Input>
          <Input
            name="phone"
            type="number"
            containerClass="mb-4"
            iconClass="icomoon icon-phone"
            placeholder={`your phone *`}></Input>
          <Input
            iconClass={`fas fa-file-alt`}
            required={true}
            name={`Cover Letter * :`}
            placeholder={`Cover Letter *: `}
            containerClass="mb-4"
            type={'text'}></Input>
          <Checkbox
            name="acceptTerms"
            containerClass="form-group"
            labelClass="pt-1"
            label={
              <>
                By using this form you agree with the storage and handling of your data by this
                website
                <span className="text-danger"> *</span>
              </>
            }></Checkbox>
          <Button type="submit" variant="gradient" block>
            {`Apply`}
          </Button>
        </form>
      </div>
    </div>
  );
}
