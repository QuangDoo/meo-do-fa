import { useQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import ProductCard from 'src/components/Modules/ProductCard';
import { GET_PRODUCTS, GetProductsData, GetProductsVars } from 'src/graphql/product/getProducts';
import {
  GET_SUPPLIER_DETAIL,
  GetSupplierDetailsData,
  GetSupplierDetailsVars
} from 'src/graphql/suppliers/suppliers.query';
import asyncQuery from 'src/utils/asyncQuery';
import withToken from 'src/utils/withToken';

SupplierDetailPage.getInitialProps = async (ctx) => {
  const supplierId = ctx.query.id;

  await asyncQuery<GetSupplierDetailsData, GetSupplierDetailsVars>({
    ctx,
    query: GET_SUPPLIER_DETAIL,
    variables: {
      id: supplierId
    }
  });

  return {
    namespacesRequired: [...mainLayoutNamespacesRequired, 'general']
  };
};

function SupplierDetailPage() {
  const router = useRouter();
  const { t } = useTranslation(['general', 'errors']);
  const supplierId = router.query.id;

  const { data: detailsData } = useQuery<GetSupplierDetailsData, GetSupplierDetailsVars>(
    GET_SUPPLIER_DETAIL,
    {
      variables: {
        id: +supplierId
      },
      onError: (error) => {
        toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
      }
    }
  );
  const supplierName = detailsData?.getSupplier?.name;
  const supplierDescription = detailsData?.getSupplier?.description
    ? detailsData?.getSupplier?.description
    : t('general:updating');

  const { data: productsData, loading: productsLoading } = useQuery<
    GetProductsData,
    GetProductsVars
  >(GET_PRODUCTS, {
    variables: {
      page: 1,
      pageSize: 20,
      condition: {
        order_type: '',
        supplier_id: (supplierId as string) || null
      }
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  const productsBySupplier = productsData?.getProductByConditions;

  return (
    <MainLayout>
      <Head>
        <title>Medofa - {supplierName}</title>
      </Head>
      {productsLoading && <CircularProgress size={60} />}
      <main className="container py-5">
        <div className="row pl-3">
          <div className="col-12 mb-3">
            <h1>{supplierName}</h1>
          </div>
        </div>
        <div className="row pl-3">
          <div className="col-12 mb-3">
            <h3 className="h3 mb-3">{t('general:supplier_info')}</h3>
            <p
              className="text-sub ml-3 mb-3"
              dangerouslySetInnerHTML={{ __html: supplierDescription }}
            />
          </div>
          {productsBySupplier?.total !== 0 && (
            <div className="row no-gutters">
              <div className="col-12 mb-3 px-3">
                <h4 className="my-3">
                  {t('general:supplier_products')}
                  {supplierName}
                </h4>
              </div>
              <div className="col-12 my-3 px-3">
                <div className="products__cards mb-3">
                  {productsBySupplier?.Products.slice(0, 20).map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </div>
              <div className="col-12 text-center">
                <a href={`/products?supplier=${supplierId}`} className="btn btn-primary">
                  {t('general:see_more')}
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </MainLayout>
  );
}

export default withToken({ ssr: true })(SupplierDetailPage);
