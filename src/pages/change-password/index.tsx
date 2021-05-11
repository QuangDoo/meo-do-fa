import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from 'src/components/Form/Button';
import InputWithLabel from 'src/components/Form/InputWithLabel';
import Head from 'src/components/Layout/Head';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import FormCard from 'src/components/Modules/MyAccount/FormCard';
import ProfileLayout from 'src/components/Modules/ProfileLayout';
import { useUser } from 'src/contexts/User';
import {
  CHANGE_PASSWORD,
  ChangePasswordData,
  ChangePasswordVars
} from 'src/graphql/user/changePassword';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import withToken from 'src/utils/withToken';

type Inputs = {
  phone: string;
  oldPassword: string;
  newPassword: string;
  retype: string;
};

ChangePassWord.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'myAccount']
});

function ChangePassWord() {
  const { t } = useTranslation(['myAccount', 'common', 'login']);

  const { data: user } = useUser();

  const rotuer = useRouter();

  const [changePassword, { loading: changingPassword }] = useMutationAuth<
    ChangePasswordData,
    ChangePasswordVars
  >(CHANGE_PASSWORD, {
    onCompleted: () => {
      toast.success(t('myAccount:update_success'));
      window.scrollTo(0, 0);
      rotuer.push('/my-account');
    },
    onError: () => {
      toast.error(t('errors:error_wrong_cr_pw'));
    }
  });

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const { retype, oldPassword, newPassword } = data;
    if (retype !== newPassword) {
      toast.error(t('errors:error_retype_pw'));
    } else if (oldPassword === newPassword) {
      toast.error(t('errors:error_match_pw'));
    } else {
      changePassword({
        variables: {
          inputs: { phone: user.phone, oldPassword, newPassword }
        }
      });
    }
  };

  const onError = (error) => {
    toast.error(error[Object.keys(error)[0]].message);
  };

  return (
    <MainLayout>
      <Head>
        <title>Medofa - {t('myAccount:change_password')}</title>
        <meta
          content="Medofa là giải pháp công nghệ ngành dược kết nối nhà máy, nhà phân phối, nhà thuốc, dược sĩ nhằm hợp tác tạo mối liên kết trực tiếp và gia tăng doanh thu."
          name="description"
        />
        <meta content="index, follow" name="robots" />
        <meta content="website" property="og:type" />
        <meta content="vi_VN" property="og:locale" />
        <meta content="Change password" property="og:title" />
        <meta
          content="Medofa là giải pháp công nghệ ngành dược kết nối nhà máy, nhà phân phối, nhà thuốc, dược sĩ nhằm hợp tác tạo mối liên kết trực tiếp và gia tăng doanh thu."
          property="og:description"
        />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          property="og:image"
          content="https://medofa.com/icons/favicon-32x32-medofa-manifest-20129.png"
        />
      </Head>

      <ProfileLayout title={t('myAccount:title')}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <FormCard title={t('myAccount:change_password')}>
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
              type="password"
              tabIndex={0}
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
              type="password"
              tabIndex={0}
            />

            {/* Retype */}
            <InputWithLabel
              ref={register({
                required: `${t('myAccount:retype_newPassword_required')}`,
                minLength: {
                  value: 6,
                  message: t('login:invalid_password')
                }
              })}
              label={t('myAccount:retype_newPassword')}
              placeholder={t('myAccount:retype_newPassword')}
              required={true}
              name="retype"
              type="password"
              tabIndex={0}
            />
          </FormCard>

          <div className="col-12 d-flex justify-content-center">
            <Button type="submit" variant="primary" size="lg">
              {t('btn_change_password')}
            </Button>
          </div>
        </form>
      </ProfileLayout>

      <LoadingBackdrop open={changingPassword} />
    </MainLayout>
  );
}

export default withToken({ ssr: true, isProtected: true })(ChangePassWord);
