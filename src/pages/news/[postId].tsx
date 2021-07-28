import { useQuery } from '@apollo/client';
import { Trans, useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
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
  const { t, i18n } = useTranslation(['common', 'news']);
  const router = useRouter();
  const { data: newsDetailData } = useQuery<GetWebsitePostData, GetWebsitePostVariables>(
    GET_POST_DETAIL,
    {
      variables: { id: getPostId(router.query.postId as string) }
    }
  );

  const { name, content, content_en, create_date, signature } =
    newsDetailData?.getWebsitePostDetail || {};

  const addImageDomainToContent = (content: string) => {
    if (typeof window !== undefined && content) {
      const { hostname } = window.location;

      const imgDomain =
        hostname === 'medofa.com' ? 'https://erp.medofa.com' : 'https://erp.dev.medofa.com';

      return content.replaceAll(`src="/`, `src="${imgDomain}/`);
    }

    return content;
  };

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>
      <Header />
      <Nav />
      {newsDetailData ? (
        <div className="container py-5">
          <h2 className="mb-3 news-title">{name}</h2>
          <div className="mb-3 news-subtitle">
            <Trans
              i18nKey={'news:post_on'}
              values={{
                create_date: new Date(create_date).toLocaleDateString('en-GB'),
                signature: signature
              }}
              components={{ b: <b /> }}
            />
          </div>
          <hr className="my-3 hr" />

          <div
            dangerouslySetInnerHTML={{
              __html: addImageDomainToContent(i18n?.language === 'vi' ? content : content_en)
            }}
          />
        </div>
      ) : (
        <div className="p-5 d-flex justify-content-center align-items-center">
          {t('common:updating')}
        </div>
      )}

      <Footer />
    </>
  );
}

export default withToken({ ssr: true })(NewsDetailPage);
