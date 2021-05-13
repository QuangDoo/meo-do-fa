import { useQuery } from '@apollo/client';
import { Trans, useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React from 'react';
import { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import {
  GET_POST_DETAIL,
  GetWebsitePostData,
  GetWebsitePostVariables
} from 'src/graphql/news/getWebsitePostDetail';
import withToken from 'src/utils/withToken';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';

NewsDetailPage.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired]
});

function getPostId(slug: string): number {
  return +slug.split('-').pop().replace('nid', '');
}

function NewsDetailPage() {
  const { t } = useTranslation(['common', 'news']);
  const router = useRouter();
  const { data: newsDetailData } = useQuery<GetWebsitePostData, GetWebsitePostVariables>(
    GET_POST_DETAIL,
    {
      variables: { id: getPostId(router.query.postId as string) }
    }
  );

  const { name, content, create_date, signature } = newsDetailData?.getWebsitePostDetail || {};

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>
      <Header />
      <Nav />
      {newsDetailData ? (
        <div className="container py-5">
          <h2 className="news-title mb-3">{name}</h2>
          <div className="news-subtitle mb-3">
            <Trans
              i18nKey={'news:post_on'}
              values={{
                create_date: new Date(create_date).toLocaleDateString('en-GB'),
                signature: signature
              }}
              components={{ b: <b /> }}
            />
          </div>
          <hr className="hr my-3" />
          <div
            dangerouslySetInnerHTML={{
              __html: content
            }}
          />
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center p-5">
          {t('common:updating')}
        </div>
      )}

      <Footer />
    </>
  );
}

export default withToken({ ssr: true })(NewsDetailPage);
