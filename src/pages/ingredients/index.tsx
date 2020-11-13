import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import PageLayout from 'src/components/Layout/PageLayout';
import SearchScreen from 'src/components/Modules/SearchScreen';
import { GET_INGREDIENTS } from 'src/graphql/ingredient/ingredient.query';
import withApollo from 'src/utils/withApollo';

type TypeIngredients = {
  id: string;
  name: string;
  slug: string;
};
function Ingredients(): JSX.Element {
  const { data, loading } = useQuery(GET_INGREDIENTS, {
    variables: {
      page: 1,
      pageSize: 100
    },
    onError: (error) => {
      console.log('Get ingredients error:', error);
    }
  });

  const characters = [
    ...Array(26).map((val, i) => ({
      character: String.fromCharCode(i + 65),
      dataValue: String.fromCharCode(i + 65).toLowerCase()
    })),
    { character: '#', dataValue: '#' }
  ];

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>
      <Header />
      <Nav />
      <PageLayout>
        <SearchScreen dataList={data?.getIngredients || []} characters={characters} />
      </PageLayout>
      <Footer />
    </>
  );
}

export default withApollo({ ssr: true })(Ingredients);
