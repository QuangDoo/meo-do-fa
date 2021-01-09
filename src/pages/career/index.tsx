import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import withApollo from 'src/utils/withApollo';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import Career from '../../components/Modules/Career';

const CareerPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, []);

  return null;
  // return (
  //   <>
  //     <Head>
  //       <title>Medofa</title>
  //     </Head>

  //     <Header />

  //     <Nav />

  //     <Career />

  //     <Footer />
  //   </>
  // );
};

// CareerPage.getInitialProps = async (ctx) => ({
//   namespacesRequired: ['common', 'header', 'footer', 'productCard', 'productBadge']
// });

export default withApollo({ ssr: false })(CareerPage);
