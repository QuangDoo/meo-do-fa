import Cookies from 'cookies';
import { useTranslation } from 'i18n';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { viPhoneNumberRegex } from 'src/assets/regex/viPhoneNumber';
import Button from 'src/components/Form/Button';
import InputWithLabel from 'src/components/Form/InputWithLabel';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import Nav from 'src/components/Layout/Nav';
import FormCard from 'src/components/Modules/MyAccount/FormCard';
import ProfileLayout from 'src/components/Modules/ProfileLayout';
import {
  CHANGE_PASSWORD,
  ChangePasswordData,
  ChangePasswordVars
} from 'src/graphql/user/changePassword';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';

import withApollo from '../../utils/withApollo';

type Inputs = {
  phone: string;
  oldPassword: string;
  newPassword: string;
};

const ChangePassWord = (): JSX.Element => {
  const { t } = useTranslation(['myAccount', 'common', 'login']);
  const { register, handleSubmit, watch, setValue } = useForm<Inputs>();

  const [changePassword, { loading: ChangingPassword }] = useMutationAuth<
    ChangePasswordData,
    ChangePasswordVars
  >(CHANGE_PASSWORD, {
    onCompleted: () => {
      toast.success(t('myAccount:update_success'));
      window.scrollTo(0, 0);
    },
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions.code}`));
    }
  });

  const onSubmit = async (data: Inputs) => {
    const { phone, oldPassword, newPassword } = data;
    console.log('data', data);
    changePassword({
      variables: {
        inputs: { phone, oldPassword, newPassword }
      }
    });
  };
  const onError = (error) => {
    toast.error(error[Object.keys(error)[0]].message);
  };
  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <ProfileLayout title={t('myAccount:title')}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <FormCard title={t('myAccount:change_password')}>
            {/* Full name */}

            {/* Phone number */}
            <InputWithLabel
              ref={register({
                required: `${t('register:input_phone_error_required')}`,
                pattern: {
                  value: viPhoneNumberRegex,
                  message: t('myAccount:invalid_phone')
                }
              })}
              required={true}
              label={t('myAccount:phone_label')}
              placeholder={t('myAccount:phone_label')}
              name="phone"
              type="text"
            />

            {/* old password */}
            <InputWithLabel
              ref={register({
                required: `${t('myAccount:oldPassword_required')}`,
                minLength: {
                  value: 6,
                  message: t('login:invalid_password')
                }
              })}
              required={true}
              label={t('myAccount:old_password')}
              placeholder={t('myAccount:old_password')}
              name="oldPassword"
              type="text"
            />

            {/* new password */}
            <InputWithLabel
              ref={register({
                required: `${t('myAccount:newPassword_required')}`,
                minLength: {
                  value: 6,
                  message: t('login:invalid_password')
                }
              })}
              label={t('myAccount:new_password')}
              placeholder={t('myAccount:new_password')}
              required={true}
              name="newPassword"
              type="text"
            />
          </FormCard>

          <div className="col-12 d-flex justify-content-center">
            <Button type="submit" variant="primary" size="lg">
              {t('btn_change_password')}
            </Button>
          </div>
        </form>
      </ProfileLayout>
      <LoadingBackdrop open={ChangingPassword} />
      <Footer />
    </>
  );
};

ChangePassWord.getInitialProps = async (ctx) => {
  if (typeof window === 'undefined') {
    const cookies = new Cookies(ctx.req, ctx.res);

    if (!cookies.get('token')) {
      ctx.res.writeHead(302, {
        Location: '/'
      });

      ctx.res.end();
    }
  }

  return {
    namespacesRequired: ['myAccount', 'common', 'login']
  };
};

export default withApollo({ ssr: true })(ChangePassWord);
