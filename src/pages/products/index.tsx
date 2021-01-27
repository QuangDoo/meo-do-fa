import { useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { animateScroll } from 'react-scroll';
import { toast } from 'react-toastify';
import Head from 'src/components/Layout/Head';
import Loading from 'src/components/Layout/Loading';
import FilterTags from 'src/components/Modules/FilterTags';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import Pagination from 'src/components/Modules/Pagination';
import ProductCard from 'src/components/Modules/ProductCard';
import ProductsDrawerFilter from 'src/components/Modules/ProductDrawerFilter/ProductsDrawerFilter';
import ProductsSidebarFilter from 'src/components/Modules/ProductsSidebarFilter';
import {
  GET_CATEGORIES_LEVEL,
  GetCategoriesLevelData
} from 'src/graphql/category/getCategoriesLevel';
import { CategorySubData, CategoryVar, GET_CATEGORY } from 'src/graphql/category/getCategory';
import {
  GET_PATHOLOGY,
  GetPathologyData,
  GetPathologyVars
} from 'src/graphql/pathology/getPathology';
import {
  GET_PRODUCTS,
  GetProductsData,
  GetProductsVars,
  ProductTag
} from 'src/graphql/product/getProducts';

const PAGE_SIZE = 24;

const NAME_ASCENDING = '07'; // Name ascending

import withToken from 'src/utils/withToken';

Products.getInitialProps = async () => ({
  namespacesRequired: [
    ...mainLayoutNamespacesRequired,
    'products',
    'productCard',
    'productBadge',
    'productsSidebar',
    'filterTags'
  ]
});

function Products() {
  const { t } = useTranslation(['products', 'errors']);

  const router = useRouter();

  const page = +router.query.page || 1;

  const search = router.query.search as string;

  const { data: categoriesLevelData } = useQuery<GetCategoriesLevelData, undefined>(
    GET_CATEGORIES_LEVEL,
    {
      onError: (error) => {
        toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
      }
    }
  );
  const categoriesLevel = categoriesLevelData?.getCategoriesLevel;

  const { data: productsData, loading: productsLoading } = useQuery<
    GetProductsData,
    GetProductsVars
  >(GET_PRODUCTS, {
    variables: {
      page,
      pageSize: PAGE_SIZE,
      type: router.query.tag as ProductTag,
      condition: {
        manufacturer_id: router.query.manufacturer as string,
        category_id: router.query.category as string,
        name: search,
        order_type: (router.query.sort as string) || NAME_ASCENDING,
        min_price: Number(router.query.priceFrom) || 1,
        max_price: Number(router.query.priceTo) || 10000000,
        pathology_id: router.query.pathology as string
      }
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  const products = productsData?.getProductByConditions?.Products || [];

  const total = productsData?.getProductByConditions?.total || 0;

  const { data: categoryData } = useQuery<CategorySubData, CategoryVar>(GET_CATEGORY, {
    variables: {
      id: +router.query.category
    },
    onError: () => null,
    skip: !router.query.category
  });
  const category = categoryData?.getCategory;

  const { data: pathologyData } = useQuery<GetPathologyData, GetPathologyVars>(GET_PATHOLOGY, {
    variables: {
      id: Number(router.query.pathology)
    },
    skip: !router.query.pathology
  });
  const pathology = pathologyData?.getPathology;

  const categoryParent = categoriesLevel
    ?.filter((category) => category.id === Number(router.query.category))
    ?.shift();

  const categoryTitle = category?.name || categoryParent?.name;

  const pathologyTitle = categoryTitle || pathology?.name;

  const title = pathologyTitle || t('products:title');

  useEffect(() => {
    if (productsLoading) {
      animateScroll.scrollToTop();
    }
    router.query.page = '1';
  }, [productsLoading]);

  return (
    <MainLayout>
      <Head>
        <title>Medofa - {title}</title>
      </Head>

      {categoriesLevel ? (
        <div className="products container mobile-content my-3 my-sm-5">
          <div className="d-flex flex-nowrap justify-content-between">
            <div className="products__sidebar pr-4 d-none d-sm-block">
              <ProductsSidebarFilter />
            </div>

            <div className="flex-grow-1">
              <div className="px-2 px-sm-0 mb-2">
                <div className="d-block d-sm-none mb-3">
                  <ProductsDrawerFilter />
                </div>
                <h1 className="products__header text-capitalize mb-3">{title}</h1>
                {productsLoading ? (
                  <b></b>
                ) : total > 0 ? (
                  <>
                    {t('products:show')}{' '}
                    <b>
                      {(page - 1) * PAGE_SIZE + 1}&nbsp;-&nbsp;
                      {Math.min(page * PAGE_SIZE, total)}
                    </b>{' '}
                    {t('products:on_of')}
                    <b>{`${total} `}</b>
                    {search ? (
                      <>
                        {t('products:key')} <b>{search}</b>
                      </>
                    ) : (
                      t('products:products')
                    )}
                  </>
                ) : (
                  <div>
                    {t('products:no_products')} <b>{search}</b>
                  </div>
                )}
              </div>

              <div className="d-none d-sm-block mb-4">
                <FilterTags />
              </div>

              <main className="products__products">
                {productsLoading ? (
                  <div className="container text-center pb-5 pt-5">
                    <Loading />
                  </div>
                ) : (
                  <div className="products__cards mb-3">
                    {products.map((product, index) => (
                      <ProductCard key={index} {...product} />
                    ))}
                  </div>
                )}

                <Pagination
                  count={Math.ceil(total / PAGE_SIZE)}
                  page={page}
                  siblingCount={4}
                  onChange={(page) =>
                    router.push({
                      pathname: router.pathname,
                      query: {
                        ...router.query,
                        page
                      }
                    })
                  }
                />
              </main>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </MainLayout>
  );
}

export default withToken({ ssr: true })(Products);
