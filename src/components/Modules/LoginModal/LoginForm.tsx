import { useMutation, useQuery } from '@apollo/client';
import { Trans, useTranslation } from 'i18n';
import cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React from 'react';
import { DeepMap, FieldError, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { usernameRegex } from 'src/assets/regex/username';
import Button from 'src/components/Form/Button';
import Input from 'src/components/Form/Input';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { useModalControlDispatch } from 'src/contexts/ModalControl';
import { GET_WEBSITE_CONFIG, GetWebsiteConfigData } from 'src/graphql/configs/getWebsiteConfig';
import { LOGIN_USER, LoginData, LoginVars } from 'src/graphql/user/login';

type Inputs = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const { t } = useTranslation(['login', 'errors']);

  const { openModal, closeModal } = useModalControlDispatch();

  const openRegisterModal = () => openModal('REGISTER');

  const openResetPassModal = () => openModal('RESET_PASSWORD');

  const router = useRouter();

  const { register, handleSubmit } = useForm<Inputs>();

  const { data: configData } = useQuery<GetWebsiteConfigData, undefined>(GET_WEBSITE_CONFIG);

  const MAIN_PAGE = configData?.getWebsiteConfig?.find((config) => config.key === 'MAIN_PAGE')
    ?.value;

  const [login, { loading: loggingIn }] = useMutation<LoginData, LoginVars>(LOGIN_USER, {
    onCompleted: (data) => {
      cookies.set('token', data.login.token);

      closeModal();

      if (router.pathname === '/products' || router.pathname === '/products/[productId]') {
        router.reload();
      } else {
        //router.push("/products");
        MAIN_PAGE ? router.push(`/${MAIN_PAGE}`) : router.push('/');
      }
    },
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
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
      <LoadingBackdrop open={loggingIn} />

      <form className="new_account" onSubmit={handleSubmit(onSubmit, onFormError)}>
        <Input
          name="username"
          ref={register({
            pattern: {
              value: usernameRegex,
              message: t('login:invalid_username')
            },
            required: t('login:required_username') + ''
          })}
          containerClass="mb-4"
          iconClass="icomoon icon-user"
          placeholder={t('login:placeholder_username')}
        />

        <Input
          name="password"
          ref={register({
            minLength: {
              value: 6,
              message: t('login:invalid_password')
            },
            required: t('login:required_password') + ''
          })}
          containerClass="mb-3"
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
