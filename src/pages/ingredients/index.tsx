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
import withToken from 'src/utils/withToken';

Ingredients.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired]
});

function Ingredients() {
  const { t } = useTranslation(['errors', 'navbar']);

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
        <title>Medofa - {t('navbar:ingredient')}</title>
        <meta
          content="Medofa là giải pháp công nghệ ngành dược kết nối nhà máy, nhà phân phối, nhà thuốc, dược sĩ nhằm hợp tác tạo mối liên kết trực tiếp và gia tăng doanh thu."
          name="description"
        />
        <meta content="index, follow" name="robots" />
        <meta content="website" property="og:type" />
        <meta content="vi_VN" property="og:locale" />
        <meta content="Ingredient" property="og:title" />
        <meta
          content="Medofa là giải pháp công nghệ ngành dược kết nối nhà máy, nhà phân phối, nhà thuốc, dược sĩ nhằm hợp tác tạo mối liên kết trực tiếp và gia tăng doanh thu."
          property="og:description"
        />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          property="og:image"
          content="https://medofa.com/icons/favicon-32x32-medofa-manifest-20129.png"
        />
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

export default withToken({ ssr: true })(Ingredients);
