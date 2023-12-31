import { useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import Head from 'src/components/Layout/Head';
import { ProductsContainer } from 'src/components/Modules/Home/ProductsContainer';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import { ProductsCarousel } from 'src/components/Modules/ProductsCarousel';
import ScrollableTabsButtonAuto from 'src/components/Modules/ScrollableTabsButtonAuto/ScrollableTabsButtonAuto';
import {
  GET_INGREDIENT_DETAILS,
  GetIngredientDetailsData,
  GetIngredientDetailsVars
} from 'src/graphql/ingredient/ingredient.query';
import {
  GET_PRODUCTS_BY_INGREDIENT,
  GetProductsByIngredientData,
  GetProductsByIngredientVars
} from 'src/graphql/product/getProductsByIngredient.query';
import asyncQuery from 'src/utils/asyncQuery';
import withToken from 'src/utils/withToken';

IngredientDetails.getInitialProps = async (ctx) => {
  const ingredientId = ctx.query.slug[0];

  await asyncQuery<GetIngredientDetailsData, GetIngredientDetailsVars>({
    ctx,
    query: GET_INGREDIENT_DETAILS,
    variables: {
      id: ingredientId
    }
  });

  await asyncQuery<GetProductsByIngredientData, GetProductsByIngredientVars>({
    ctx,
    query: GET_PRODUCTS_BY_INGREDIENT,
    variables: {
      page: 1,
      pageSize: 20,
      ingredientId
    }
  });

  return {
    namespacesRequired: [...mainLayoutNamespacesRequired, 'ingredientDetails']
  };
};

function IngredientDetails() {
  const router = useRouter();
  const { t } = useTranslation(['ingredientDetails', 'errors']);
  const ingredientId = router.query.slug[0];

  const { data: detailsData } = useQuery<GetIngredientDetailsData, GetIngredientDetailsVars>(
    GET_INGREDIENT_DETAILS,
    {
      variables: {
        id: +ingredientId
      },
      onError: (error) => {
        toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
      }
    }
  );

  const { data: productsData } = useQuery<GetProductsByIngredientData, GetProductsByIngredientVars>(
    GET_PRODUCTS_BY_INGREDIENT,
    {
      variables: {
        page: 1,
        pageSize: 20,
        ingredientId: ingredientId
      },
      onCompleted: (data) => {
        console.log('Product by ingredient data', data);
      },
      onError: (error) => {
        toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
      }
    }
  );

  const title = detailsData?.getIngredient?.name;

  return (
    <MainLayout>
      <Head>
        <title>Medofa - {title}</title>
      </Head>

      <main className="ingredient container py-3 py-sm-5">
        <div className="row justify-content-center">
          <div className="col-sm-10">
            <h1 className="mb-3">{title}</h1>
            <ScrollableTabsButtonAuto
              {...detailsData?.getIngredient}
              labelInfo={t('info_label')}
              labelIndication={t('indication_label')}
              labelContraindion={t('contraindication_label')}
              labelDirection={t('direction_label')}
              labelInteraction={t('interaction_label')}
              labelPreservation={t('preservation_label')}
              labelOverdose={t('overdose_label')}
              labelPharmacodynamics={t('pharmacodynamics_label')}
              labelPharmacokinetics={t('pharmacokinetics_label')}
              init={0}
              vari="scrollable"
            />
          </div>
        </div>
      </main>

      <hr />

      {productsData?.getProductByIngredient?.length > 0 && (
        <ProductsContainer
          title={t('products_containing_ingredient') + detailsData?.getIngredient.name}>
          <ProductsCarousel products={productsData?.getProductByIngredient} />
        </ProductsContainer>
      )}
    </MainLayout>
  );
}

export default withToken({ ssr: true })(IngredientDetails);
