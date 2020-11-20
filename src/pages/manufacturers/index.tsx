import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import SearchScreen from 'src/components/Modules/SearchScreen';
import {
  GET_ALL_MANUFACTURERS,
  GetAllManufacturersData
} from 'src/graphql/manufacturers/manufacturers.query';

function Manufactures(): JSX.Element {
  const { data } = useQuery<GetAllManufacturersData, undefined>(GET_ALL_MANUFACTURERS, {
    onError: (error) => {
      console.log('Get manufacturers error:', error);
    }
  });

  return (
    <>
      <Head>
        <title>Tất cả nhà sản xuất - Medofa</title>
      </Head>

      <Header />

      <Nav />

      <SearchScreen
        data={data?.getManufactoriesAll.map((i) => ({ id: i.id, name: i.short_name })) || []}
        getItemHref={(id) => `/products?manufacturer=${id}`}
      />

      <Footer />
    </>
  );
}

export default Manufactures;
