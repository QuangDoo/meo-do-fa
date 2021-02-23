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
import InputFile from 'src/components/Form/InputFile';
import InputWithLabel from 'src/components/Form/InputWithLabel';
import Select from 'src/components/Form/Select';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { useModalControlDispatch } from 'src/contexts/ModalControl';
import { useUser } from 'src/contexts/User';
import { CREATE_USER, CreateUserData, CreateUserVars } from 'src/graphql/user/createUser';

// Form input fields
type Inputs = {
  account_type: string;
  name: string;
  email: string;
  password: string;
  phone: number;
  referEmail: string;
  acceptTerms: boolean;
  businessLicense: FileList;
  tax: string;
};

const accountTypes = ['PHARMACY', 'DRUGSTORE', 'CLINIC', 'HOSPITAL'];

const RegisterForm = () => {
  const { t } = useTranslation(['register', 'errors']);

  const router = useRouter();

  const { register, handleSubmit, watch, setValue } = useForm<Inputs>();

  const businessLicense: FileList = watch('businessLicense');

  const { openModal, closeModal } = useModalControlDispatch();

  const openLoginModal = () => openModal('LOGIN');

  const { refetch: refetchUser } = useUser();

  const initialAccountType = '';
  const currentAccountType = watch('account_type', initialAccountType);

  const [createUser, { loading: creatingUser }] = useMutation<CreateUserData, CreateUserVars>(
    CREATE_USER,
    {
      onCompleted: (data) => {
        cookies.set('token', data.createUser.token);
        closeModal();
        refetchUser();
        router.reload();
      },
      onError: (error) => {
        toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
      }
    }
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files[0];

    const isImage = file.type.startsWith('image');

    if (!isImage) {
      setValue('businessLicense', undefined);
      toast.error(t('cart:file_is_not_image'));
    }
  };
  // On form submit
  const onFormSubmit = (data: Inputs) => {
    const regVat = /(^[0-9]{10}$)|(^[0-9]{13}$)/g;
    let userVat = data?.tax.replace(/-/g, '');
    if (userVat !== '' && !regVat.test(userVat)) {
      return toast.error(t('errors:tax_code_invalid'));
    }
    if (userVat.length === 13) {
      userVat = userVat.slice(0, 10) + '-' + userVat.slice(10, 13);
    }
    createUser({
      variables: {
        inputs: {
          account_type: data.account_type,
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone.toString(),
          ref_email: data.referEmail,
          vat: userVat
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
            required
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
            required
          />

          <Input
            name="address"
            containerClass="mb-4"
            iconClass="icomoon icon-home"
            placeholder={t('register:input_address_placeholder')}
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
            required
          />

          <Input
            name="tax"
            type="text"
            ref={register({
              required: `${t('register:input_tax_error_required')}`
            })}
            containerClass="mb-4"
            iconClass="fas fa-file-invoice-dollar"
            placeholder={t('register:input_tax_placeholder')}
          />

          <Input
            ref={register}
            name="businessLicense"
            type="file"
            accept="image/*"
            containerClass="mb-4"
            iconClass="fas fa-print"
            placeholder={
              businessLicense?.length
                ? businessLicense[0].name
                : t('register:input_business_license_placeholder')
            }
            onChange={handleFileChange}
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
            required
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
      </div>
      <LoadingBackdrop open={creatingUser} />
    </form>
  );
};

export default RegisterForm;
