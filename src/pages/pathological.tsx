import { useTranslation } from 'i18n';
import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import getToken from 'src/utils/getToken';
import withApollo from 'src/utils/withApollo';

Pathological.getInitialProps = async (ctx) => ({
  namespacesRequired: [...mainLayoutNamespacesRequired],
  token: getToken(ctx)
});

function Pathological(props) {
  const { t } = useTranslation('common');

  return (
    <MainLayout token={props.token}>
      <Head>
        <title>Medofa</title>
      </Head>

      <div className="container text-center py-3">
        <h1>{t('common:updating')}</h1>
      </div>
    </MainLayout>
  );
}

export default withApollo({ ssr: true })(Pathological);
