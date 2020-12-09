import { useQuery } from '@apollo/client';
import { useTranslation, withTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import { ProductsContainer } from 'src/components/Modules/Home/ProductsContainer';
import { ProductsCarousel } from 'src/components/Modules/ProductsCarousel';
import Tab from 'src/components/Tab/Tab';
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
import withApollo from 'src/utils/withApollo';

const IngredientDetails = (): JSX.Element => {
  const router = useRouter();
  const { t } = useTranslation(['ingredientDetails']);
  const ingredientId = router.query.slug[0];

  const { data: detailsData } = useQuery<GetIngredientDetailsData, GetIngredientDetailsVars>(
    GET_INGREDIENT_DETAILS,
    {
      variables: {
        id: +ingredientId
      }
    }
  );

  const { data: productsData, error: productsError } = useQuery<
    GetProductsByIngredientData,
    GetProductsByIngredientVars
  >(GET_PRODUCTS_BY_INGREDIENT, {
    variables: {
      page: 1,
      pageSize: 20,
      ingredientId: ingredientId
    }
  });

  // onError
  useEffect(() => {
    if (!productsError) return;

    console.log('Get products by ingredient error:', { productsError });
    toast.error('Get products by ingredient error:' + productsError);
  }, [productsError]);

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <main className="ingredient container py-3 py-sm-5">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <h1 className="mb-3">{detailsData?.getIngredient.name}</h1>
          </div>

          <Tab
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
          />
        </div>
      </main>

      <hr />

      {productsData?.getProductsByIngredient && (
        <ProductsContainer
          title={t('products_containing_ingredient') + detailsData?.getIngredient.name}>
          <ProductsCarousel products={productsData?.getProductsByIngredient} />
        </ProductsContainer>
      )}

      <Footer />
    </>
  );
};

export default withApollo({ ssr: true })(IngredientDetails);
