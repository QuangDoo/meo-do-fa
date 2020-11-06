import { useQuery } from '@apollo/react-hooks';
import React, { useEffect, useState } from 'react';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import PageLayout from '../../components/Layout/PageLayout';
import SearchScreen from '../../components/Modules/SearchScreen';
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
        <title>Medofa</title>
      </Head>
      <Header />
      <Nav />
      <PageLayout>
        <SearchScreen dataList={ingredients} characters={characters} />
      </PageLayout>
      <Footer />
    </>
  );
}

export default withApollo({ ssr: true })(Ingredients);
