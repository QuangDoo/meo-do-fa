import { useMutation } from '@apollo/client';
import { Trans, useTranslation } from 'i18n';
import cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React from 'react';
import { DeepMap, FieldError, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { usernameRegex } from 'src/assets/regex/username';
import { viPhoneNumberRegex } from 'src/assets/regex/viPhoneNumber';
import Button from 'src/components/Form/Button';
import Checkbox from 'src/components/Form/Checkbox';
import Input from 'src/components/Form/Input';
import { useModalControlDispatch } from 'src/contexts/ModalControl';
import { LOGIN_USER, LoginData, LoginVars } from 'src/graphql/user/login';
import useUser from 'src/hooks/useUser';

type Inputs = {
  username: string;
  password: string;
};

const LoginForm = (): JSX.Element => {
  const { t } = useTranslation(['login', 'errors']);

  const { openModal, closeModal } = useModalControlDispatch();

  const openRegisterModal = () => openModal('REGISTER');

  const openResetPassModal = () => openModal('RESET_PASSWORD');

  const router = useRouter();

  const { getUser } = useUser();

  const { register, handleSubmit } = useForm<Inputs>();

  const [login] = useMutation<LoginData, LoginVars>(LOGIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.token);
      cookies.set('token', data.login.token);

      closeModal();
      getUser();

      if (router.pathname === '/products' || router.pathname === '/products/[productId]') {
        router.reload();
      } else {
        router.push('/products');
      }
    },
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions.code}`));
    }
  });

  const onFormError = (errors: DeepMap<Inputs, FieldError>) => {
    Object.keys(errors).forEach((field) => toast.error(errors[field].message));
  };

  const onSubmit = (data: Inputs) => {
    login({
      variables: {
        inputs: {
          username: data.username,
          password: data.password
        }
      }
    });
  };

  return (
    <div>
      <form className="new_account" onSubmit={handleSubmit(onSubmit, onFormError)}>
        <Input
          name="username"
          ref={register({
            pattern: {
              value: usernameRegex,
              message: t('login:invalid_username')
            }
          })}
          containerClass="mb-4"
          iconClass="icomoon icon-user"
          required
          placeholder={t('login:placeholder_username')}
        />

        <Input
          name="password"
          ref={register({
            minLength: {
              value: 6,
              message: t('login:invalid_password')
            }
          })}
          containerClass="mb-3"
          required={true}
          iconClass="icomoon icon-lock"
          placeholder={t('login:placeholder_password')}
          type="password"
        />

        {/* <Checkbox
          name="remember_password"
          ref={register}
          label={t('login:remember_password')}
          containerClass="form-group align-self-start"
          labelClass="pt-1"
        /> */}

        <span className="mb-4 ">
          <Trans
            i18nKey="login:forgot_password"
            components={{
              button: (
                <button className="text-primary ml-1" onClick={openResetPassModal} type="button" />
              ),
              b: <b />
            }}
          />
        </span>

        <Button type="submit" variant="gradient" block className="mb-5">
          {t('login:login')}
        </Button>

        <span className="text-capitalize ">
          <Trans
            i18nKey="login:login_for_deals"
            components={{
              button: (
                <button className="text-primary ml-1" onClick={openRegisterModal} type="button" />
              ),
              b: <b />
            }}
          />
        </span>
      </form>
    </div>
  );
};

export default LoginForm;
