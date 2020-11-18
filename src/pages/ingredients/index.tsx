import { useQuery } from '@apollo/react-hooks';
import slugify from '@sindresorhus/slugify';
import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import PageLayout from 'src/components/Layout/PageLayout';
import SearchScreen from 'src/components/Modules/SearchScreen';
import { GET_INGREDIENTS } from 'src/graphql/ingredient/ingredient.query';
import withApollo from 'src/utils/withApollo';

function Ingredients(): JSX.Element {
  const { data } = useQuery(GET_INGREDIENTS, {
    variables: {
      page: 1,
      pageSize: 100
    },
    onError: (error) => {
      console.log('Get ingredients error:', error);
    }
  });

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <SearchScreen
        data={data?.getIngredients || []}
        getItemHref={(id, name) => `/ingredients/${id}/${slugify(name)}`}
      />

      <Footer />
    </>
  );
}

export default withApollo({ ssr: true })(Ingredients);
