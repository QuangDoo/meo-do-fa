import { useTranslation } from 'i18n';
import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import withToken from 'src/utils/withToken';

OperatingRegulations.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'operatingRegulations']
});

function OperatingRegulations() {
  const { t } = useTranslation(['common', 'operatingRegulations']);

  return (
    <MainLayout>
      <Head>
        <title>Medofa - {t('operatingRegulations:title')}</title>
        <meta property="og:title" content="Operating Regulations" />
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

      <div className="container my-5">
        <h2 className="text-center my-5">{t('operatingRegulations:title')}</h2>

        <p className="text-sub d-flex justify-content-center align-items-center p-5">
          {t('common:updating')}
        </p>
      </div>
    </MainLayout>
  );
}

export default withToken({ ssr: true })(OperatingRegulations);
