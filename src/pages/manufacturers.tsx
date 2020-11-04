import React from 'react';

import Footer from '../components/Footer';
import Head from '../components/Head';
import { Header } from '../components/Header';
import PageLayout from '../components/layout/PageLayout';
import { Nav } from '../components/Nav';
import SearchScreen from '../components/SearchScreen';

function Manufactures(): JSX.Element {
  const manufactures = [
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
        <title>Thuoc N</title>
      </Head>
      <Header />
      <Nav />
      <PageLayout>
        <SearchScreen dataList={manufactures} characters={characters} />
      </PageLayout>
      <Footer />
    </>
  );
}

export default Manufactures;
