import React from 'react';
import { DeepMap, FieldError, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from 'src/components/Form/Button';
import Checkbox from 'src/components/Form/Checkbox';
import Input from 'src/components/Form/Input';

import InputFile from '../../Form/InputFile';
import Textarea from '../../Form/Textarea';

type Inputs = {
  username: string;
  password: string;
};

const CareerForm = (): JSX.Element => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onFormError = (errors: DeepMap<Inputs, FieldError>) => {
    Object.keys(errors).forEach((field) => toast.error(errors[field].message));
  };

  const onSubmit = (data: Inputs) => {
    console.log(data);
  };

  return (
    <div>
      <form className="new_account" onSubmit={handleSubmit(onSubmit, onFormError)}>
        <Input
          name="fullname"
          containerClass="mb-4"
          iconClass="icomoon icon-user"
          required
          placeholder={'Full Name'}
        />
        <Input
          name="email"
          containerClass="mb-3"
          required
          iconClass="far fa-envelope"
          placeholder={'Email'}
          type="email"
        />
        <Input
          name="phone"
          containerClass="mb-3"
          required
          iconClass="fas fa-phone"
          placeholder={'Phone Number'}
          type="number"
        />
        <InputFile name="Upload Cv" containerClass="mb-3" iconClass="fas fa-file" />
        <Textarea containerClass="mb-3" placeholder={'Cover letter'} />
        <Checkbox
          name="apply"
          label={
            'By using this form you agree with the storage and handling of your data by this website. *'
          }
          containerClass="form-group align-self-start"
          labelClass="pt-1"
        />

        <Button type="submit" variant="gradient" block className="mb-5">
          apply
        </Button>
      </form>
    </div>
  );
};

export default CareerForm;
