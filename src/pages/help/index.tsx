import { useQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React from 'react';
import MainLayout from 'src/components/Modules/MainLayout';
import {
  GET_POST,
  PostInputVars,
  PostType,
  WebsitePostData
} from 'src/graphql/news/getWebsitePost';
import withToken from 'src/utils/withToken';

import Head from '../../components/Layout/Head';

const Help = () => {
  const { t } = useTranslation(['common']);

  const router = useRouter();
  const { data: postList, loading } = useQuery<WebsitePostData, PostInputVars>(GET_POST, {
    variables: {
      type: PostType.FAQ
    }
  });
  const faqData = postList?.getWebsitePost;

  if (faqData && faqData.length !== 0) {
    router.push(`/help/${faqData?.[0].id}`);
  }

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
        <meta
          content="Medofa là giải pháp công nghệ ngành dược kết nối nhà máy, nhà phân phối, nhà thuốc, dược sĩ nhằm hợp tác tạo mối liên kết trực tiếp và gia tăng doanh thu."
          name="description"
        />
        <meta content="index, follow" name="robots" />
        <meta content="website" property="og:type" />
        <meta content="vi_VN" property="og:locale" />
        <meta content="Help" property="og:title" />
        <meta
          content="Medofa là giải pháp công nghệ ngành dược kết nối nhà máy, nhà phân phối, nhà thuốc, dược sĩ nhằm hợp tác tạo mối liên kết trực tiếp và gia tăng doanh thu."
          property="og:description"
        />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          property="og:image"
          content="https://medofa.com/icons/favicon-32x32-medofa-manifest-20129.png"
        />
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
