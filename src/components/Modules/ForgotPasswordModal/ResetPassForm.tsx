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

const ResetPassForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const { t } = useTranslation(['password', 'errors', 'register']);

  const { closeModal } = useModalControlDispatch();

  const onFormError = (errors: DeepMap<Inputs, FieldError>) => {
    Object.keys(errors).forEach((field) => toast.error(errors[field].message));
  };

  const [resetPassword, { loading: loadingResetPassword }] = useMutation(RESET_PASSWORD);

  const onSubmit = (data: Inputs) => {
    const { username } = data;
    resetPassword({
      variables: {
        username: username
      }
    })
      .then(() => {
        toast.success(t(`errors:send_password_to_email_success`));
        closeModal();
      })
      .catch((error) => {
        toast.error(t(`errors:code_${error.graphQLErrors[0]?.extensions.code}`));
      });
  };

  return (
    <div>
      <form className="reset_pass" onSubmit={handleSubmit(onSubmit, onFormError)}>
        <Input
          name="username"
          ref={register({
            pattern: {
              value: usernameRegex || emailRegex,
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
      <LoadingBackdrop open={loadingResetPassword} />
    </div>
  );
};

export default ResetPassForm;
