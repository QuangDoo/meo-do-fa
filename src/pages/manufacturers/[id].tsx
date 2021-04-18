import { useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import ProductCard from 'src/components/Modules/ProductCard';
import {
  GET_MANUFACTORY_DETAILS,
  GetManufactoryDetailsData,
  GetManufactoryDetailsVars
} from 'src/graphql/manufacturers/manufacturers.query';
import { GET_PRODUCTS, GetProductsData, GetProductsVars } from 'src/graphql/product/getProducts';
import asyncQuery from 'src/utils/asyncQuery';
import withToken from 'src/utils/withToken';

ManufacturerDetail.getInitialProps = async (ctx) => {
  const manufacturerId = ctx.query.id;

  await asyncQuery<GetManufactoryDetailsData, GetManufactoryDetailsVars>({
    ctx,
    query: GET_MANUFACTORY_DETAILS,
    variables: {
      id: manufacturerId
    }
  });

  return {
    namespacesRequired: [...mainLayoutNamespacesRequired, 'manufacturerDetails']
  };
};

function ManufacturerDetail() {
  const router = useRouter();
  const { t } = useTranslation(['manufacturerDetails', 'errors']);
  const manufacturerId = router.query.id;

  const { data: detailsData } = useQuery<GetManufactoryDetailsData, GetManufactoryDetailsVars>(
    GET_MANUFACTORY_DETAILS,
    {
      variables: {
        id: +manufacturerId
      },
      onError: (error) => {
        toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
      }
    }
  );
  const manufacturerName = detailsData?.getManufactory?.name;
  const manufacturerDescription = detailsData?.getManufactory?.description
    ? detailsData?.getManufactory?.description
    : t('manufacturerDetails:updating');

  const { data: productsData, loading: productsLoading } = useQuery<
    GetProductsData,
    GetProductsVars
  >(GET_PRODUCTS, {
    variables: {
      page: 1,
      pageSize: 20,
      condition: {
        order_type: '',
        manufacturer_id: manufacturerId as string
      }
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  const productsByManufacturer = productsData?.getProductByConditions;

  return (
    <MainLayout>
      <Head>
        <title>Medofa -{manufacturerName}</title>
      </Head>
      <main className="container py-5">
        <div className="row">
          <div className="col-12 mb-3">
            <h1>{manufacturerName}</h1>
          </div>
        </div>
        <div className="row pl-3">
          <div className="col-12 mb-3">
            <h1 className="h3 mb-3">{t('manufacturerDetails:manu_info')}</h1>
            <div
              className="ml-3 mb-3"
              dangerouslySetInnerHTML={{ __html: manufacturerDescription }}
            />
          </div>
          {productsByManufacturer?.total !== 0 && (
            <div className="row no-gutters">
              <div className="col-12 mb-3 px-3">
                <h3 className="my-3">
                  {t('manufacturerDetails:manu_products')}
                  {manufacturerName}
                </h3>
              </div>
              <div className="col-12 my-3 px-3">
                <div className="products__cards mb-3">
                  {productsByManufacturer?.Products.slice(0, 20).map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </div>
              <div className="col-12 text-center">
                <a href={`/products?manufacturer=${manufacturerId}`} className="btn btn-primary">
                  {t('manufacturerDetails:see_more')}
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </MainLayout>
  );
}

export default withToken({ ssr: true })(ManufacturerDetail);
