import { useQuery } from '@apollo/react-hooks';
import slugify from '@sindresorhus/slugify';
import React, { useEffect } from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import SearchScreen from 'src/components/Modules/SearchScreen';
import {
  GET_ALL_INGREDIENTS,
  GetAllIngredientsData
} from 'src/graphql/ingredient/ingredient.query';
import withApollo from 'src/utils/withApollo';

function Ingredients(): JSX.Element {
  const { data, error } = useQuery<GetAllIngredientsData, undefined>(GET_ALL_INGREDIENTS);

  // onError
  useEffect(() => {
    if (!error) return;

    console.log('Get ingredients error:', error);
  }, [error]);

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>
      <Header />

      <Nav />

      <SearchScreen
        data={data?.getIngredientsAll || []}
        getItemHref={(id, name) => `/ingredients/${id}/${slugify(name)}`}
      />

      <Footer />
    </>
  );
}

export default withApollo({ ssr: true })(Ingredients);
