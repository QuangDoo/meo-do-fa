import { useQuery } from '@apollo/react-hooks';
import React, { useEffect, useState } from 'react';

import Footer from '../../components/Footer';
import Head from '../../components/Head';
import { Header } from '../../components/Header';
import Layout from '../../components/Layout/Layout';
import { Nav } from '../../components/Nav';
import SearchScreen from '../../components/SearchScreen';
import { GET_INGREDIENTS } from '../../graphql/ingredient/ingredient.query';
import withApollo from '../../utils/withApollo';
type TypeIngredients = {
  id: string;
  name: string;
  slug: string;
};
function Ingredients(): JSX.Element {
  const [ingredients, setIngredients] = useState<TypeIngredients[]>([]);
  const { data: dataIngredients, loading: loadingIngredients, error: errorIngredients } = useQuery(
    GET_INGREDIENTS,
    {
      variables: { page: 1, pageSize: 100 }
    }
  );

  useEffect(() => {
    if (!dataIngredients) return;
    setIngredients(dataIngredients.getIngredients);
  }, [dataIngredients]);
  console.log('ingredients', ingredients);
  const characters = [
    { character: 'A', dataValue: 'a' },
    { character: 'B', dataValue: 'b' },
    { character: 'C', dataValue: 'c' },
    { character: 'D', dataValue: 'd' },
    { character: 'E', dataValue: 'e' },
    { character: 'F', dataValue: 'f' },
    { character: 'G', dataValue: 'g' },
    { character: 'H', dataValue: 'h' },
    { character: 'I', dataValue: 'i' },
    { character: 'J', dataValue: 'j' },
    { character: 'K', dataValue: 'k' },
    { character: 'L', dataValue: 'l' },
    { character: 'M', dataValue: 'm' },
    { character: 'N', dataValue: 'n' },
    { character: 'O', dataValue: 'o' },
    { character: 'P', dataValue: 'p' },
    { character: 'R', dataValue: 'r' },
    { character: 'S', dataValue: 's' },
    { character: 'T', dataValue: 't' },
    { character: 'U', dataValue: 'u' },
    { character: 'V', dataValue: 'v' },
    { character: 'W', dataValue: 'w' },
    { character: 'X', dataValue: 'x' },
    { character: 'Y', dataValue: 'y' },
    { character: 'Z', dataValue: 'z' },
    { character: '#', dataValue: '#' }
  ];
  return (
    <>
      <Head>
        <title>Thuoc N</title>
      </Head>
      <Header />
      <Nav />
      <Layout>
        <SearchScreen dataList={ingredients} characters={characters} />
      </Layout>
      <Footer />
    </>
  );
}

export default withApollo({ ssr: true })(Ingredients);
