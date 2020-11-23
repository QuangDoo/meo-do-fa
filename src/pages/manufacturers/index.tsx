import { useQuery } from '@apollo/react-hooks';
import React, { useEffect } from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import SearchScreen from 'src/components/Modules/SearchScreen';
import {
  GET_ALL_MANUFACTURERS,
  GetAllManufacturersData
} from 'src/graphql/manufacturers/manufacturers.query';
import withApollo from 'src/utils/withApollo';

function Manufacturers(): JSX.Element {
  const { data, error } = useQuery<GetAllManufacturersData, undefined>(GET_ALL_MANUFACTURERS);

  // onError
  useEffect(() => {
    if (!error) return;

    console.log('Get manufacturers error:', error);
  }, [error]);

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

export default withApollo({ ssr: true })(Manufacturers);
