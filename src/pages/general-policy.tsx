import { useTranslation } from 'i18n';
import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import getToken from 'src/utils/getToken';
import withApollo from 'src/utils/withApollo';

GeneralPolicy.getInitialProps = async (ctx) => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'generalPolicy'],
  token: getToken(ctx)
});

function GeneralPolicy(props) {
  const { t } = useTranslation(['common', 'generalPolicy']);

  return (
    <MainLayout token={props.token}>
      <Head>
        <title>Medofa</title>
      </Head>

      <div className="container my-5">
        <h2 className="text-center my-5">{t('generalPolicy:title')}</h2>

        <div className="d-flex justify-content-center align-items-center p-5">
          {t('common:updating')}
        </div>
      </div>
    </MainLayout>
  );
}

export default withApollo({ ssr: true })(GeneralPolicy);
