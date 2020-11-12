import { useMutation } from '@apollo/react-hooks';
import { Trans, withTranslation } from 'i18n';
import { WithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { emailRegex } from 'src/assets/regex/email';
import { viPhoneNumberRegex } from 'src/assets/regex/viPhoneNumber';
import Button from 'src/components/Form/Button';
import Checkbox from 'src/components/Form/Checkbox';
import Input from 'src/components/Form/Input';
import { useModalControlDispatch } from 'src/contexts/ModalControl';
import { CREATE_USER, CreateUserData, CreateUserVars } from 'src/graphql/user/createUser.mutation';
import withApollo from 'src/utils/withApollo';
import styled from 'styled-components';

// Form input fields
type Inputs = {
  account_type: string;
  name: string;
  email: string;
  password: string;
  phone: number;
  referPhone: number;
  acceptTerms: boolean;
};

const ErrorToast = styled.div`
  white-space: pre-line;
`;

const accountTypes = ['PHARMACY', 'CLINIC', 'DRUGSTORE'];

// Initial value for account_type
const initialAccountType = '';

const RegisterForm = (props: WithTranslation): JSX.Element => {
  const { t } = props;

  const { register, handleSubmit, setValue, watch } = useForm<Inputs>();

  const modalControlDispatch = useModalControlDispatch();

  const openLoginModal = () => modalControlDispatch({ type: 'OPEN_LOGIN_MODAL' });

  const closeRegisterModal = () =>
    modalControlDispatch({
      type: 'CLOSE_REGISTER_MODAL'
    });

  const [createUser] = useMutation<CreateUserData, CreateUserVars>(CREATE_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.createUser.token);
      closeRegisterModal();
    },
    onError: (error) => {
      console.log('Create user error:', { error });
      toast.error('Error: ' + error.message);
    }
  });

  // Watch account_type value, with initial state
  // This component re-renders when account_type changes
  const currentAccountType = watch('account_type', initialAccountType);

  // On form submit
  const onSubmit = (data: Inputs) => {
    createUser({
      variables: {
        inputs: {
          account_type: data.account_type,
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone.toString()
        }
      }
    });
  };

  // On form error
  const onError = (errors) => {
    const errorMessage = Object.keys(errors)
      .map((name) => errors[name].message)
      .join('\n');

    toast.error(<ErrorToast>{errorMessage}</ErrorToast>);
  };

  return (
    <form className="new_account" onSubmit={handleSubmit(onSubmit, onError)}>
      <input name="account_type" hidden type="text" ref={register} />

      {/* Hide ChooseAccountType if account_type is in initial state */}
      <div hidden={currentAccountType !== initialAccountType} className="business-group">
        <div className="container text-center">
          <div className="row">
            <div className="col-12 mb-3">
              <h6>{t('register:you_are')}</h6>
            </div>
          </div>

          {/* Account type buttons */}
          <div className="row no-gutters">
            {accountTypes.map((accountType) => (
              <button
                key={accountType}
                type="button"
                className="col-6 business-group__item p-2"
                onClick={() => setValue('account_type', accountType)}>
                <img
                  alt=""
                  className="img-fluid"
                  src={`/assets/images/account-type__${accountType.toLowerCase()}.png`}
                />
                <h6 className="business-group__item__text font-weight-bold">
                  {t(`register:${accountType.toLowerCase()}`)}
                </h6>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hide AccountInformation form if account_type is chosen (not in initial state) */}
      <div hidden={currentAccountType === initialAccountType} className="account-information">
        <div className="welcome-account mb-3">
          {t('register:welcome')}
          <span className="welcome-account__business">
            {' '}
            {t(`register:${currentAccountType.toLowerCase()}`)}!
          </span>
          <button
            onClick={() => setValue('account_type', initialAccountType)}
            type="button"
            className="font-weight-bold text-primary ml-2">
            {t('register:edit')}
          </button>
        </div>

        <Input
          name="name"
          ref={register({
            required: `${t('input_name_error_required')}`
          })}
          containerClass="mb-4"
          iconClass="icomoon icon-user"
          placeholder={t('register:input_name_placeholder')}
        />

        <Input
          name="phone"
          type="number"
          ref={register({
            required: `${t('register:input_phone_error_required')}`,
            pattern: {
              value: viPhoneNumberRegex,
              message: `${t('register:input_phone_error_invalid')}`
            }
          })}
          containerClass="mb-4"
          iconClass="icomoon icon-phone"
          placeholder={t('register:input_phone_placeholder')}
        />

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

        <Input
          name="password"
          ref={register({
            required: `${t('register:input_password_error_required')}`,
            minLength: {
              value: 6,
              message: `${t('register:input_password_error_minLength')}`
            }
          })}
          containerClass="mb-4"
          iconClass="icomoon icon-lock"
          placeholder={t('register:input_password_placeholder')}
          type="password"
        />

        <Input
          name="referPhone"
          ref={register({
            pattern: {
              value: viPhoneNumberRegex,
              message: `${t('input_referPhone_error_invalid')}`
            },
            validate: () => true // Check with backend if referer phone number exists
          })}
          containerClass="mb-4"
          iconClass="fas fa-user-friends"
          placeholder={t('input_referPhone_placeholder')}
          type="number"
        />

        <Checkbox
          ref={register({
            required: `${t('checkbox_acceptTerms_error_required')}`
          })}
          name="acceptTerms"
          containerClass="form-group"
          labelClass="pt-1"
          label={
            <>
              <Trans
                i18nKey="register:checkbox_acceptTerms_label"
                components={{
                  Link: <a href="/terms-of-use">Terms of Use</a>
                }}
              />
              <span className="text-danger"> *</span>
            </>
          }
        />

        <div className="mb-4">
          <Trans
            i18nKey="register:go_to_login"
            components={{
              button: <button type="button" className="text-secondary" onClick={openLoginModal} />
            }}
          />
        </div>

        <Button type="submit" variant="gradient" block>
          {t('register:submit_button_text')}
        </Button>
      </div>
    </form>
  );
};

const Translated = withTranslation('register')(RegisterForm);

export default withApollo({ ssr: true })(Translated);
