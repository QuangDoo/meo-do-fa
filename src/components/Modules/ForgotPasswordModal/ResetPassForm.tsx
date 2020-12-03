import { useTranslation } from 'i18n';
import React from 'react';
import { DeepMap, FieldError, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { emailRegex } from 'src/assets/regex/email';
import Button from 'src/components/Form/Button';
import Input from 'src/components/Form/Input';

type Inputs = {
  email: string;
};

const ResetPassForm = (): JSX.Element => {
  const { register, handleSubmit } = useForm<Inputs>();

  const { t } = useTranslation(['password', 'errors', 'register']);

  const onFormError = (errors: DeepMap<Inputs, FieldError>) => {
    Object.keys(errors).forEach((field) => toast.error(errors[field].message));
  };

  const onSubmit = (data: Inputs) => {
    const { email } = data;
    return null;
  };

  return (
    <div>
      <form className="reset_pass" onSubmit={handleSubmit(onSubmit, onFormError)}>
        <Input
          name="email"
          ref={register({
            pattern: {
              value: emailRegex,
              message: `${t('register:input_email_error_invalid')}`
            }
          })}
          containerClass="mb-4"
          iconClass="icomoon icon-mail"
          placeholder={t('register:input_email_placeholder')}
        />

        <Button type="submit" variant="gradient" block>
          {t('password:send_recovery_link')}
        </Button>
      </form>
    </div>
  );
};

export default ResetPassForm;
