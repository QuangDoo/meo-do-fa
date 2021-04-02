import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import {
  GET_POST_DETAIL,
  GetWebsitePostData,
  GetWebsitePostVariables
} from 'src/graphql/news/getWebsitePostDetail';
import withToken from 'src/utils/withToken';

import Head from '../../components/Layout/Head';
import FAQ from '../../components/Modules/FAQ';
import QuestionDetail from '../../components/Modules/FAQ/QuestionDetail';

const HelpDetail = () => {
  const router = useRouter();

  const { data: helpData } = useQuery<GetWebsitePostData, GetWebsitePostVariables>(
    GET_POST_DETAIL,
    {
      variables: { id: +router.query.helpId }
    }
  );

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <FAQ>
        <QuestionDetail answer={helpData?.getWebsitePostDetail?.content} />
      </FAQ>
    </MainLayout>
  );
};

HelpDetail.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired]
});

export default withToken({ ssr: true })(HelpDetail);
