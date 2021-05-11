import { useTranslation } from 'i18n';
import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import withToken from 'src/utils/withToken';

Pathological.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired]
});

function Pathological() {
  const { t } = useTranslation(['common', 'navbar']);

  return (
    <MainLayout>
      <Head>
        <title>Medofa - {t('navbar:pathological')}</title>
        <meta property="og:title" content="Pathological" />
        <meta
          property="og:description"
          content="Medofa là giải pháp công nghệ ngành dược kết nối nhà máy, nhà phân phối, nhà thuốc, dược sĩ nhằm hợp tác tạo mối liên kết trực tiếp và gia tăng doanh thu."
        />
        <meta property="og:url" content="https://medofa.com/" />
        <meta
          property="og:image"
          content="https://medofa.com/icons/favicon-32x32-medofa-manifest-20129.png"
        />
      </Head>

      <div className="container text-center py-3">
        <h1 className="text-sub">{t('common:updating')}</h1>
      </div>
    </MainLayout>
  );
}

export default withToken({ ssr: true })(Pathological);
