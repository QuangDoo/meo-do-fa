import { Box, Button, Grid, IconButton, InputBase, Paper } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Trans, useTranslation } from 'i18n';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import Entry from 'src/components/Modules/NewsPage/entry';
import Pagination from 'src/components/Modules/Pagination';
import useWebsitePost from 'src/hooks/useWebsitePost';
import withToken from 'src/utils/withToken';

NewsPage.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired]
});

function NewsPage() {
  const { t } = useTranslation(['common', 'news', 'header']);
  const newsList = useWebsitePost('NEWS');

  const arrNews = [
    { id: 1, content: 'simply dummy text of the printing and typesetting industry' },
    {
      id: 2,
      content:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout'
    },
    { id: 3, content: 'There are many variations of passages of Lorem Ipsum available' },
    {
      id: 4,
      content:
        'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested'
    },
    { id: 5, content: 'Lorem Ipsum is therefore always free from repetition' }
  ];

  const postNews = arrNews.map((value, idx) => {
    return (
      <li key={idx}>
        <a href="#">{value.content}</a>
      </li>
    );
  });

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
      {/* {newsList ? (
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
      )} */}

      <div className="d-flex justify-content-center align-items-center p-5">
        {t('common:updating')}
      </div>
    </MainLayout>
  );
}

export default withToken({ ssr: true })(NewsPage);
