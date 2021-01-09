import { useTranslation } from 'i18n';
import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import getToken from 'src/utils/getToken';
import withApollo from 'src/utils/withApollo';
import withToken from 'src/utils/withToken';

Pathological.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired]
});

const WithToken = withToken(Pathological);

function Pathological(props) {
  const { t } = useTranslation('common');

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <div className="container text-center py-3">
        <h1>{t('common:updating')}</h1>
      </div>
    </MainLayout>
  );
}

export default withApollo({ ssr: true })(WithToken);
