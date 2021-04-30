import { useMutation } from '@apollo/client';
import axios from 'axios';
import { Trans, useTranslation } from 'i18n';
import cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { emailRegex, noSpecialChars } from 'src/assets/regex/email';
import { taxCodeRegex } from 'src/assets/regex/taxCode';
import { viPhoneNumberRegex } from 'src/assets/regex/viPhoneNumber';
import Button from 'src/components/Form/Button';
import Checkbox from 'src/components/Form/Checkbox';
import Input from 'src/components/Form/Input';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { useCart } from 'src/contexts/Cart';
import { useModalControlDispatch } from 'src/contexts/ModalControl';
import { useNotify } from 'src/contexts/Notify';
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

const accountTypes = ['PHARMACY', 'DRUGSTORE'];

const { publicRuntimeConfig } = getConfig();

type DECODE = { userId: number };

const RegisterForm = () => {
  const { t } = useTranslation(['register', 'errors']);

  const router = useRouter();

  const FILES_GATEWAY = `https://${
    publicRuntimeConfig.FILES_GATEWAY_EXT || process.env.NEXT_PUBLIC_FILES_GATEWAY
  }`;

  const [file, setFile] = useState<File>();

  const { register, handleSubmit, watch, setValue } = useForm<Inputs>();

  const businessLicense: FileList = watch('businessLicense');

  const { openModal, closeModal } = useModalControlDispatch();

  const openLoginModal = () => openModal('LOGIN');

  const { refetch: refetchUser } = useUser();

  const initialAccountType = '';
  const currentAccountType = watch('account_type', initialAccountType);

  const { getUser } = useUser();
  const { getCart } = useCart();
  const { getNotify } = useNotify();

  const [createUser, { loading: creatingUser }] = useMutation<CreateUserData, CreateUserVars>(
    CREATE_USER,
    {
      onCompleted: (data) => {
        cookies.set('token', data.createUser.token);

        const decode: DECODE = jwt_decode(data.createUser.token.substr(7));
        const { userId } = decode;
        if (file) {
          const formData = new FormData();

          formData.append('image', file);
          formData.append('id', userId + '');

          axios
            .post(`${FILES_GATEWAY}/certificate`, formData)

            .catch((err) => {
              console.log('Image upload error:', err);
            });
        }

        // Get user data, cart, notify
        getUser();
        getCart();
        getNotify();

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
    setFile(file);
    const isImage = file.type.startsWith('image');

    if (!isImage) {
      toast.error(t('cart:file_is_not_image'));
      return;
    }
  };

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
          ref_email: data.referEmail,
          vat: data.tax
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
                    <br />
                    <small>({t(`register:hospital_clinic`)})</small>
                  </h6>
                </button>
              ))}
              <button
                key="CUSTOMER"
                type="button"
                className="col-6 business-group__item p-2"
                onClick={() => setValue('account_type', 'CUSTOMER')}>
                <img
                  alt=""
                  className="img-fluid"
                  src={`/assets/images/account-type__customer.png`}
                />
                <h6 className="business-group__item__text font-weight-bold">
                  {t(`register:other`)}
                </h6>
              </button>
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
              required: `${t('register:input_name_error_required')}`
            })}
            containerClass="mb-4"
            iconClass="icomoon icon-user"
            placeholder={t('register:input_name_placeholder')}
            required
            maxLength={100}
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

          <Input
            name="tax"
            //type="text"
            ref={register({
              pattern: {
                value: taxCodeRegex,
                message: t('errors:tax_code_invalid')
                //as string
              }
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

          {/* <Input
            name="address"
            containerClass="mb-4"
            iconClass="icomoon icon-home"
            placeholder={t('register:input_address_placeholder')}
          /> */}

          <Input
            ref={register}
            name="referEmail"
            containerClass="mb-4"
            iconClass="fas fa-user-friends"
            placeholder={t('register:input_refer_placeholder')}
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
