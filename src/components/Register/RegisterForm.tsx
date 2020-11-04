import { useMutation } from '@apollo/react-hooks';
import { WithTranslation } from 'next-i18next';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { Trans, withTranslation } from '../../../i18n';
import { emailRegex } from '../../assets/regex/email';
import { viPhoneNumberRegex } from '../../assets/regex/viPhoneNumber';
import { useModalControlDispatch } from '../../contexts/ModalControl';
import { AccountType } from '../../enums/AccountType';
import { REGISTER_USER } from '../../graphql/user/register.mutation';
import withApollo from '../../utils/withApollo';
import Button from '../Form/Button';
import Checkbox from '../Form/Checkbox';
import Input from '../Form/Input';
import UserTypeCard from './UserTypeCard';

// Form input fields
type Inputs = {
  accountType: string;
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

// Initial value for accountType
const initialAccountType = '';

const RegisterForm = (props: WithTranslation): JSX.Element => {
  const { t } = props;

  const { register, handleSubmit, setValue, watch, errors } = useForm<Inputs>();

  const modalControlDispatch = useModalControlDispatch();

  const openLoginModal = () => modalControlDispatch({ type: 'OPEN_LOGIN_MODAL' });

  const closeRegisterModal = () =>
    modalControlDispatch({
      type: 'CLOSE_REGISTER_MODAL'
    });

  const [registerUser, { data }] = useMutation(REGISTER_USER);

  // Watch accountType value, with initial state
  // This component re-renders when userType changes
  const currentAccountType = watch('accountType', initialAccountType);

  // Shows error toast when error changes
  useEffect(() => {
    const errorNames = Object.keys(errors);

    if (!errorNames.length) return;

    const errorMessage = errorNames.map((name) => errors[name].message).join('\n');

    toast.error(<ErrorToast>{errorMessage}</ErrorToast>);
  }, [errors]);

  // On submit button click
  const onSubmit = (data: Inputs) => {
    registerUser({
      variables: {
        accountType: data.accountType,
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone.toString()
      }
    });
  };

  // Set token when data is returned from backend
  useEffect(() => {
    if (!data) return;

    if (data.createUser.code !== 200) {
      toast.error(`Error ${data.createUser.code}: ${data.createUser.status}`);

      return;
    }

    localStorage.setItem('token', data.createUser.token);

    closeRegisterModal();
  }, [data]);

  return (
    <form className="new_account" onSubmit={handleSubmit(onSubmit)}>
      {/**
       * Hidden input for userType
       * Value changes when clicking a UserTypeCard
       */}
      <input name="accountType" hidden type="text" ref={register} />

      {/* Hide ChooseUserType if userType is in initial state */}
      <div hidden={currentAccountType !== initialAccountType} className="business-group">
        <div className="container text-center">
          <div className="row">
            <div className="col-12 mb-3">
              <h6>{t('register:you_are')}</h6>
            </div>
          </div>

          <div className="row no-gutters">
            {Object.values(AccountType).map((accountType) => (
              <UserTypeCard
                key={accountType}
                text={t(`register:${accountType.toLowerCase()}`)}
                imgUrl={`/assets/images/account-type__${accountType.toLowerCase()}.png`}
                onClick={() => setValue('accountType', accountType)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hide AccountInformation form if userType is chosen (NOT in initial state) */}
      <div hidden={currentAccountType === initialAccountType} className="account-information">
        <div className="welcome-account mb-3">
          {t('register:welcome')}
          <span className="welcome-account__business">
            {' '}
            {t(`register:${currentAccountType.toLowerCase()}`)}!
          </span>
          <button
            onClick={() => setValue('accountType', initialAccountType)}
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
