import { Trans, useTranslation } from 'i18n';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import useWebsitePost from 'src/hooks/useWebsitePost';
import withToken from 'src/utils/withToken';

NewsPage.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired]
});

function NewsPage() {
  const { t } = useTranslation(['common', 'news', 'header']);
  const newsList = useWebsitePost('NEWS');

  return (
    <MainLayout>
      <Head>
        <title>Medofa - {t('header:news')}</title>
        <meta property="og:title" content="News" />
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
      {newsList ? (
        <div className="container py-5">
          <h1 className="text-center mb-5">{t('news:title')}</h1>
          {newsList.map(({ id, name, create_date, signature, slug }) => (
            <div key={id} className="news-container">
              <Link href={`news/${slug}`}>
                <a>
                  <h3 className="news-title">{name}</h3>
                  <div className="news-subtitle">
                    <Trans
                      i18nKey={'news:post_on'}
                      values={{
                        create_date: new Date(create_date).toLocaleDateString('en-GB'),
                        signature: signature
                      }}
                      components={{ b: <b /> }}
                    />
                  </div>
                </a>
              </Link>
              <hr className="hr my-3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center p-5">
          {t('common:updating')}
        </div>
      )}
    </MainLayout>
  );
}

export default withToken({ ssr: true })(NewsPage);
