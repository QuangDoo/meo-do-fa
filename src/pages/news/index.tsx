import { useTranslation } from 'i18n';
import Head from 'next/head';
import React from 'react';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import News from 'src/components/Modules/News';
import NewsList from 'src/components/Modules/News/NewsList';
import useWebsitePost from 'src/hooks/useWebsitePost';

const imgUrl =
  'https://mir-s3-cdn-cf.behance.net/project_modules/disp/c596bb11090425.560f16f7207b1.jpg';
const links = [
  { href: '', title: 'Contrary  Lorem Ipsum is not simply random text' },
  { href: '', title: 'Contrary to text Contrary to populartext Contrary to populartext' },
  { href: '', title: 'Contrary to popular belief, Lorem random text Contrary to populartext' },
  { href: '', title: 'Contrary Ipsum is not simply random text Contrary to populartext' },
  { href: '', title: 'Contrary is not simply random text Contrary to populartext' },
  { href: '', title: 'Contrary to to populartext Contrary to populartext Contrary to populartext' }
];

import withToken from 'src/utils/withToken';

NewsPage.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired]
});

function NewsPage() {
  const { t } = useTranslation(['common']);
  const newsData = useWebsitePost('NEWS');

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>
      <News bannerImgUrl={imgUrl} links={links}>
        {newsData?.length !== 0 ? (
          <NewsList news={newsData} />
        ) : (
          <div className="d-flex justify-content-center align-items-center p-5">
            {t('common:updating')}
          </div>
        )}
      </News>
    </MainLayout>
  );
}

export default withToken({ ssr: true })(NewsPage);
