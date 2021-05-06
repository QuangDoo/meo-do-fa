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
  const { t } = useTranslation(['common', 'news']);
  const newsList = useWebsitePost('NEWS');

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>
      {newsList ? (
        <div className="container py-5">
          {newsList.map(({ id, name, create_date, signature, slug }) => (
            <div key={id}>
              <Link href={`news/${slug}`}>
                <a>
                  <h2>{name}</h2>
                  <div>
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
