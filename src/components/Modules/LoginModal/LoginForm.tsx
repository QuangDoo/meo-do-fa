import { useMutation } from '@apollo/react-hooks';
import { Trans, withTranslation } from 'i18n';
import { WithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { DeepMap, FieldError, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { viPhoneNumberRegex } from 'src/assets/regex/viPhoneNumber';
import Button from 'src/components/Form/Button';
import Checkbox from 'src/components/Form/Checkbox';
import Input from 'src/components/Form/Input';
import ModalWithHeader from 'src/components/Layout/Modal/ModalWithHeader';
import { useModalControlDispatch, useModalControlState } from 'src/contexts/ModalControl';
import { useUser } from 'src/contexts/User';
import { LOGIN_USER, LoginData, LoginVars } from 'src/graphql/user/login.mutation';
import withApollo from 'src/utils/withApollo';

import RessetPassForm from '../RessetPassModal/RessetPassForm';

type Inputs = {
  username: string;
  password: string;
};

const LoginForm = ({ t }: WithTranslation): JSX.Element => {
  const dispatch = useModalControlDispatch();

  const openRegisterModal = () => dispatch({ type: 'OPEN_REGISTER_MODAL' });
  const openRessetPassModal = () => dispatch({ type: 'OPEN_RESSETPASS_MODAL' });
  const { ressetPassIsOpen } = useModalControlState();
  const { registerIsOpen } = useModalControlState();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const [openRessetPass, setOpenRessetPass] = React.useState(false);

  const handleOpenRessetPass = () => {
    setOpenRessetPass(true);
    setOpen(false);
  };
  const handleCloseRessetPass = () => {
    setOpenRessetPass(false);
  };
  // const openLoginModal = () => modalControlDispatch({ type: 'OPEN_RESSETPASSS_MODAL' });
  const closeLoginModal = () => dispatch({ type: 'CLOSE_LOGIN_MODAL' });

  const router = useRouter();

  const { getUser } = useUser();

  const { register, handleSubmit } = useForm<Inputs>();

  const [login, { data, error }] = useMutation<LoginData, LoginVars>(LOGIN_USER);

  // onCompleted
  useEffect(() => {
    if (!data) return;

    localStorage.setItem('token', data.login.token);
    closeLoginModal();
    getUser();

    if (router.pathname === '/products' || router.pathname === '/products/[productId]') {
      router.reload();
    } else {
      router.push('/products');
    }
  }, [data]);

  // onError (GraphQL)
  useEffect(() => {
    if (!error) return;

    console.log('Login error:', { error });

    toast.error(t(`errors:code_${error.graphQLErrors[0].extensions.code}`));
  }, [error]);

  const onFormError = (errors: DeepMap<Inputs, FieldError>) => {
    Object.keys(errors).forEach((field) => toast.error(errors[field].message));
  };

  const onSubmit = (data: Inputs) => {
    login({
      variables: {
        inputs: {
          phone: data.username,
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
              value: viPhoneNumberRegex,
              message: t('login:invalid_phone')
            }
          })}
          containerClass="mb-4"
          iconClass="icomoon icon-phone"
          required
          placeholder={t('login:placeholder_phone')}
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

        <Checkbox
          name="remember_password"
          ref={register}
          label={t('login:remember_password')}
          containerClass="form-group align-self-start"
          labelClass="pt-1"
        />
        <span className="mb-4 ">
          <Trans
            i18nKey="login:forgot_password"
            components={{
              button: (
                <button
                  className="text-primary ml-1"
                  onClick={handleOpenRessetPass}
                  type="button"
                />
              ),
              b: <b />
            }}
          />
        </span>
        <ModalWithHeader
          open={openRessetPass}
          onClose={handleCloseRessetPass}
          title={t('password:resset_password')}
          // onClose={() => dispatch({ type: 'CLOSE_RESSETPASS_MODAL' })}
          className="authentication signup">
          <RessetPassForm />
        </ModalWithHeader>

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

const Translated = withTranslation(['login', 'errors'])(LoginForm);

export default withApollo({ ssr: true })(Translated);
