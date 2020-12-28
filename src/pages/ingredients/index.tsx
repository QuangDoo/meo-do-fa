import { useQuery } from '@apollo/client';
import slugify from '@sindresorhus/slugify';
import { useTranslation } from 'i18n';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Loading from 'src/components/Layout/Loading';
import Nav from 'src/components/Layout/Nav';
import SearchScreen from 'src/components/Modules/SearchScreen';
import {
  GET_ALL_INGREDIENTS,
  GetAllIngredientsData
} from 'src/graphql/ingredient/ingredient.query';
import withApollo from 'src/utils/withApollo';

function Ingredients(): JSX.Element {
  const { t } = useTranslation('errors');

  const { data, loading, error } = useQuery<GetAllIngredientsData, undefined>(GET_ALL_INGREDIENTS, {
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  // onError
  useEffect(() => {
    if (!error) return;
  }, [error]);

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>
      <Header />

      <Nav />
      {loading ? (
        <div className="w-100 p-5 text-center">
          <Loading />
        </div>
      ) : data ? (
        <SearchScreen
          data={data?.getIngredientsAll || []}
          getItemHref={(id, name) => `/ingredients/${id}/${slugify(name)}`}
        />
      ) : (
        <div></div>
      )}

      <Footer />
    </>
  );
}

export default withApollo({ ssr: true })(Ingredients);
