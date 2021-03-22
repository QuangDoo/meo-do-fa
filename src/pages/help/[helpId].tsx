import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React from 'react';
import { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import withToken from 'src/utils/withToken';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import FAQ from '../../components/Modules/FAQ';
import QuestionDetail from '../../components/Modules/FAQ/QuestionDetail';

const HelpDetail = () => {
  const { t } = useTranslation(['common', 'help']);

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <FAQ title={t(`help:question_${router.query.helpId}`)}>
        <QuestionDetail answer={t(`help:answer_${router.query.helpId}`)} />
      </FAQ>

      <Footer />
    </>
  );
};

HelpDetail.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired]
});

export default withToken({ ssr: true })(HelpDetail);
