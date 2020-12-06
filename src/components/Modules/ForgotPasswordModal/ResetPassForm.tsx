import { useMutation } from '@apollo/client';
import { useTranslation } from 'i18n';
import React from 'react';
import { DeepMap, FieldError, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { emailRegex } from 'src/assets/regex/email';
import Button from 'src/components/Form/Button';
import Input from 'src/components/Form/Input';
import {
  RESET_PASSWORD,
  ResetPasswordData,
  ResetPasswordVars
} from 'src/graphql/user/forgotPassword';

type Inputs = {
  email: string;
};

const ResetPassForm = (): JSX.Element => {
  const { register, handleSubmit } = useForm<Inputs>();

  const { t } = useTranslation(['password', 'errors', 'register']);

  const onFormError = (errors: DeepMap<Inputs, FieldError>) => {
    Object.keys(errors).forEach((field) => toast.error(errors[field].message));
  };
  const [abc] = useMutation<ResetPasswordData, any>(RESET_PASSWORD, {
    onCompleted: (data) => {
      console.log('data', data);
    },
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors[0]?.extensions.code}`));
    }
  });

  const onSubmit = (data: Inputs) => {
    const { email } = data;
    abc({
      variables: {
        email
      }
    });
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
