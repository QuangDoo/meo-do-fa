import { useQuery } from '@apollo/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { type } from 'os';
import React, { useEffect } from 'react';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import News from 'src/components/Modules/News';
import NewsList from 'src/components/Modules/News/NewsList';
import {
  GET_POST,
  PostInputVars,
  PostType,
  WebsitePostData
} from 'src/graphql/news/getWebsitePost';
const newsdata = [
  {
    id: 8,
    title:
      'Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form,',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
    when an unknown printer took a galley of type and scrambled it to make a type 
    specimen book. It has survived not only five centuries, but also the leap into 
    electronic typesetting, remaining essentially unchanged. 
    It was popularised in the 1960s with the release of Letraset sheets containing 
    Lorem Ipsum passages, and more recently with desktop publishing software like Aldus 
    PageMaker including versions of Lorem Ipsum.`,
    imgUrl: 'https://i1.sndcdn.com/avatars-xpq4R8nRHWRL7NiZ-pyJFyg-t500x500.jpg'
  },
  {
    id: 8,
    title:
      'Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form,',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
    when an unknown printer took a galley of type and scrambled it to make a type 
    specimen book. It has survived not only five centuries, but also the leap into 
    electronic typesetting, remaining essentially unchanged. 
    It was popularised in the 1960s with the release of Letraset sheets containing 
    Lorem Ipsum passages, and more recently with desktop publishing software like Aldus 
    PageMaker including versions of Lorem Ipsum.`,
    imgUrl: 'https://i1.sndcdn.com/avatars-xpq4R8nRHWRL7NiZ-pyJFyg-t500x500.jpg'
  },
  {
    id: 8,
    title:
      'Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form,',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
    when an unknown printer took a galley of type and scrambled it to make a type 
    specimen book. It has survived not only five centuries, but also the leap into 
    electronic typesetting, remaining essentially unchanged. 
    It was popularised in the 1960s with the release of Letraset sheets containing 
    Lorem Ipsum passages, and more recently with desktop publishing software like Aldus 
    PageMaker including versions of Lorem Ipsum.`,
    imgUrl: 'https://i1.sndcdn.com/avatars-xpq4R8nRHWRL7NiZ-pyJFyg-t500x500.jpg'
  },
  {
    id: 8,
    title:
      'Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form,',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
    when an unknown printer took a galley of type and scrambled it to make a type 
    specimen book. It has survived not only five centuries, but also the leap into 
    electronic typesetting, remaining essentially unchanged. 
    It was popularised in the 1960s with the release of Letraset sheets containing 
    Lorem Ipsum passages, and more recently with desktop publishing software like Aldus 
    PageMaker including versions of Lorem Ipsum.`,
    imgUrl: 'https://i1.sndcdn.com/avatars-xpq4R8nRHWRL7NiZ-pyJFyg-t500x500.jpg'
  },
  {
    id: 8,
    title:
      'Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form,',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
    when an unknown printer took a galley of type and scrambled it to make a type 
    specimen book. It has survived not only five centuries, but also the leap into 
    electronic typesetting, remaining essentially unchanged. 
    It was popularised in the 1960s with the release of Letraset sheets containing 
    Lorem Ipsum passages, and more recently with desktop publishing software like Aldus 
    PageMaker including versions of Lorem Ipsum.`,
    imgUrl: 'https://i1.sndcdn.com/avatars-xpq4R8nRHWRL7NiZ-pyJFyg-t500x500.jpg'
  }
];

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
  const router = useRouter();

  const { data: newsData } = useQuery<WebsitePostData, PostInputVars>(GET_POST, {
    variables: { type: PostType.NEWS }
  });
  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>
      <News bannerImgUrl={imgUrl} links={links}>
        <NewsList news={newsData?.getWebsitePost} />
      </News>
    </MainLayout>
  );
}

export default withToken({ ssr: true })(NewsPage);
