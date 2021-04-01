import { useQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import MainLayout from 'src/components/Modules/MainLayout';
import {
  GET_POST,
  PostInputVars,
  PostType,
  WebsitePostData
} from 'src/graphql/news/getWebsitePost';
import useWebsitePost from 'src/hooks/useWebsitePost';
import withToken from 'src/utils/withToken';

import Head from '../../components/Layout/Head';

const Help = () => {
  const { t } = useTranslation(['common']);

  const router = useRouter();
  // const faqData = useWebsitePost('FAQ');
  const { data: postList, loading } = useQuery<WebsitePostData, PostInputVars>(GET_POST, {
    variables: {
      type: PostType.FAQ
    }
  });
  const faqData = postList?.getWebsitePost;

  useEffect(() => {
    if (faqData.length !== 0) {
      router.push(`/help/${faqData?.[0].id}`);
    }
  }, []);

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      {loading ? (
        <div className="search__result--empty text-center">
          <CircularProgress size={60} />
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center p-5">
          {t('common:updating')}
        </div>
      )}
    </MainLayout>
  );
};

export default withToken({ ssr: true })(Help);
