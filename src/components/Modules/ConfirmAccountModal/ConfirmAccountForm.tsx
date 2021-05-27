import { useMutation } from '@apollo/client';
import { useTranslation } from 'i18n';
import React from 'react';
import { DeepMap, FieldError, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { emailRegex } from 'src/assets/regex/email';
import { usernameRegex } from 'src/assets/regex/username';
import Button from 'src/components/Form/Button';
import Input from 'src/components/Form/Input';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { useModalControlDispatch } from 'src/contexts/ModalControl';
import { RESET_PASSWORD } from 'src/graphql/user/forgotPassword';

type Inputs = {
  username: string;
};

const ConfirmAccountForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const { t } = useTranslation(['password', 'errors', 'register', 'success']);

  const { closeModal } = useModalControlDispatch();

  const onFormError = (errors: DeepMap<Inputs, FieldError>) => {
    Object.keys(errors).forEach((field) => toast.error(errors[field].message));
  };

  const onSubmit = (data: Inputs) => {
    console.log(`data`, data);
  };

  return (
    <div>
      <form className="reset_pass" onSubmit={handleSubmit(onSubmit, onFormError)}>
        <Input
          name="otp_code"
          ref={register}
          containerClass="mb-4"
          iconClass="icomoon icon-mail"
          placeholder={t('register:otp_code')}
        />

        <Button type="submit" variant="gradient" block>
          {t('password:send_otp')}
        </Button>
      </form>
    </div>
  );
};

export default ConfirmAccountForm;
