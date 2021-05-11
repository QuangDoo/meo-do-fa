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
        <meta
          content="Medofa là giải pháp công nghệ ngành dược kết nối nhà máy, nhà phân phối, nhà thuốc, dược sĩ nhằm hợp tác tạo mối liên kết trực tiếp và gia tăng doanh thu."
          name="description"
        />
        <meta content="index, follow" name="robots" />
        <meta content="website" property="og:type" />
        <meta content="vi_VN" property="og:locale" />
        <meta content="News" property="og:title" />
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

      <div className="container wrap-entry">
        <Grid container>
          <Grid item sm={12} lg={8}>
            <Box className="wrapper_content">
              <Entry />
              <Entry />
              <h2>PAGINATION HERE</h2>
            </Box>
          </Grid>
          <Grid item sm={12} lg={4}>
            <div className="post-sidebar">
              <aside className="widget widget-search">
                <Paper component="form" className="box-search">
                  <InputBase
                    placeholder="Search Google Maps"
                    inputProps={{ 'aria-label': 'search google maps' }}
                  />
                  <IconButton className="search-icon" aria-label="search">
                    <Search />
                  </IconButton>
                </Paper>
              </aside>

              <aside className="widget widget-recent-entries">
                <span className="widget-title">BÀI VIẾT MỚI NHẤT</span>
                <div className="is-devider"></div>
                <ul>{postNews}</ul>
              </aside>
            </div>
          </Grid>
        </Grid>

        {/* <div className="section_secondary">

        </div> */}
      </div>
    </MainLayout>
  );
}

export default withToken({ ssr: true })(NewsPage);
