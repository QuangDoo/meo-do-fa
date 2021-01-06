import { useMutation } from '@apollo/client';
import { Trans, useTranslation } from 'i18n';
import cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { emailRegex, noSpecialChars } from 'src/assets/regex/email';
import { viPhoneNumberRegex } from 'src/assets/regex/viPhoneNumber';
import Button from 'src/components/Form/Button';
import Checkbox from 'src/components/Form/Checkbox';
import Input from 'src/components/Form/Input';
import Select from 'src/components/Form/Select';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { useModalControlDispatch } from 'src/contexts/ModalControl';
import { CREATE_USER, CreateUserData, CreateUserVars } from 'src/graphql/user/createUser';
import useUser from 'src/hooks/useUser';

// Form input fields
type Inputs = {
  account_type: string;
  name: string;
  email: string;
  password: string;
  phone: number;
  referEmail: string;
  acceptTerms: boolean;
};

const accountTypes = ['PHARMACY', 'CLINIC', 'DRUGSTORE'];

const RegisterForm = (): JSX.Element => {
  const { t } = useTranslation(['register', 'errors']);

  const router = useRouter();

  const { register, handleSubmit } = useForm<Inputs>();

  const { openModal, closeModal } = useModalControlDispatch();

  const openLoginModal = () => openModal('LOGIN');

  const { getUser } = useUser();

  const [createUser, { loading: creatingUser }] = useMutation<CreateUserData, CreateUserVars>(
    CREATE_USER,
    {
      onCompleted: (data) => {
        cookies.set('token', data.createUser.token);
        closeModal();
        getUser();
        router.reload();
      },
      onError: (error) => {
        toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
      }
    }
  );

  // On form submit
  const onFormSubmit = (data: Inputs) => {
    createUser({
      variables: {
        inputs: {
          account_type: data.account_type,
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone.toString(),
          ref_email: data.referEmail
        }
      }
    });
  };

  // On form error
  const onFormError = (errors) => {
    toast.error(errors[Object.keys(errors)[0]].message);
  };

  return (
    <form className="new_account" onSubmit={handleSubmit(onFormSubmit, onFormError)}>
      <div className="account-information">
        <div className="d-flex align-items-baseline mb-4">
          <div className="h6 flex-shrink-0 mr-2">{t('register:you_are') + ':'}</div>
          <Select name="account_type" ref={register}>
            {accountTypes.map((accountType) => (
              <option key={accountType} value={accountType}>
                {t(`register:${accountType.toLowerCase()}`)}
              </option>
            ))}
          </Select>
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
            },
            validate: {
              noSpecialChars: (value) =>
                noSpecialChars.test(value) || `${t('register:input_email_error_noSpecialChars')}`
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
          name="referEmail"
          ref={register({
            pattern: {
              value: emailRegex,
              message: `${t('register:input_referEmail_error_invalid')}`
            }
          })}
          containerClass="mb-4"
          iconClass="fas fa-user-friends"
          placeholder={t('register:input_referEmail_placeholder')}
        />

        <Checkbox
          ref={register({
            required: `${t('register:checkbox_acceptTerms_error_required')}`
          })}
          name="acceptTerms"
          containerClass="form-group"
          labelClass="pt-1"
          label={
            <>
              <Trans
                i18nKey="register:checkbox_acceptTerms_label"
                components={{
                  Link: (
                    <a href="/terms-of-use" target="_blank">
                      {' '}
                    </a>
                  )
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
              button: <button type="button" className="text-primary" onClick={openLoginModal} />,
              b: <b />
            }}
          />
        </div>

        <Button type="submit" variant="gradient" block>
          {t('register:submit_button_text')}
        </Button>
      </div>

      <LoadingBackdrop open={creatingUser} />
    </form>
  );
};

export default RegisterForm;
