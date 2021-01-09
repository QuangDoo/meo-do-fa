import { useQuery } from '@apollo/client';
import slugify from '@sindresorhus/slugify';
import { useTranslation } from 'i18n';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import Head from 'src/components/Layout/Head';
import Loading from 'src/components/Layout/Loading';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import SearchScreen from 'src/components/Modules/SearchScreen';
import {
  GET_ALL_INGREDIENTS,
  GetAllIngredientsData
} from 'src/graphql/ingredient/ingredient.query';
import getToken from 'src/utils/getToken';
import withApollo from 'src/utils/withApollo';
import withToken from 'src/utils/withToken';

Ingredients.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired]
});

const WithToken = withToken(Ingredients);

function Ingredients(props) {
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
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

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
    </MainLayout>
  );
}

export default withApollo({ ssr: true })(WithToken);
