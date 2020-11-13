import { useQuery } from '@apollo/react-hooks';
import React, { useEffect, useState } from 'react';
import { GET_MANUFACTURERS } from 'src/graphql/manufactures/manufacturers.query';
import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import PageLayout from '../../components/Layout/PageLayout';
import SearchScreen from '../../components/Modules/SearchScreen';

type TypeManufacturers = {
  id: string;
  name: string;
  slug: string;
  
};
function Manufacturers(props:TypeManufacturers): JSX.Element {
  const [manufacturers, setManufacturers] = useState<TypeManufacturers[]>([]);
  const { data: dataManufacturers, loading: loadingManufacturers, error: errorManufacturers } = useQuery(GET_MANUFACTURERS);
  useEffect(() => {
    if (!dataManufacturers) return;
    setManufacturers(dataManufacturers.getManufactoriesAll);
  }, [dataManufacturers]);

  const Manufacturers = [
    { name: 'Alamingo' },
    { name: 'Blamingo' },
    { name: 'Clamingo' },
    { name: 'Dlamingo' },
    { name: 'Elamingo' },
    { name: 'Flamingo' },
    { name: 'Glamingo' },
    { name: 'Hlamingo' },
    { name: 'Llamingo' },
    { name: 'Mlamingo' },
    { name: 'Nlamingo' },
    { name: 'Olamingo' },
    { name: 'Plamingo' },
    { name: 'Qlamingo' },
    { name: 'Rlamingo' },
    { name: 'Slamingo' },
    { name: 'Tlamingo' },
    { name: 'Ulamingo' },
    { name: 'Vlamingo' },
    { name: 'Wlamingo' },
    { name: 'Xlamingo' },
    { name: 'Ylamingo' },
    { name: 'Zlamingo' }
  ];
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
        <SearchScreen dataList={manufacturers} characters={characters} />
      </PageLayout>
      <Footer />
    </>
  );
}

export default Manufacturers;
