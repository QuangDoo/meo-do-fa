// import { useMutation } from '@apollo/client';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
// import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import Head from 'src/components/Layout/Head';
import Loading from 'src/components/Layout/Loading';
import {
  DEL_LIKEPRODUCT,
  delLikeProductData,
  delLikeProductVar
} from 'src/graphql/product/deleteLikeProduct';
import { GET_WISH_LIST, GetWishListData, GetWishListVar } from 'src/graphql/product/getWishList';
import { useMutationAuth, useQueryAuth } from 'src/hooks/useApolloHookAuth';

import MainLayout, { mainLayoutNamespacesRequired } from '../MainLayout';
import Pagination from '../Pagination';
import ProfileLayout from '../ProfileLayout';
// import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import WishListItem from './WishListItem';

WishList.getInitialProps = async (ctx) => {
  return {
    namespacesRequired: [...mainLayoutNamespacesRequired, 'myAddressBook']
  };
};

function WishList() {
  const { t } = useTranslation(['wishList', 'errors']);

  const router = useRouter();

  const page = +router.query.page || 1;

  const {
    data: dataWishList,
    loading: gettingWishList,
    refetch: refechDataListWish
  } = useQueryAuth<GetWishListData, GetWishListVar>(GET_WISH_LIST, {
    variables: { page, pageSize: 5 },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  const [delLikeProduct] = useMutationAuth<delLikeProductData, delLikeProductVar>(DEL_LIKEPRODUCT, {
    onCompleted: () => {
      refechDataListWish();
    },
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  const handleDelLikeProduct = (id) => {
    delLikeProduct({ variables: { productId: id } });
    // console.log(`id`, id);
  };
  return (
    <MainLayout>
      <Head>
        <title>Medofa - {t('myAddressBook:title')}</title>
        <meta property="og:title" content="Address" />
        <meta
          property="og:description"
          content="Medofa là giải pháp công nghệ ngành dược kết nối nhà máy, nhà phân phối, nhà thuốc, dược sĩ nhằm hợp tác tạo mối liên kết trực tiếp và gia tăng doanh thu."
        />
        <meta property="og:url" content="https://medofa.com/" />
        <meta
          property="og:image"
          content="https://medofa.com/icons/favicon-32x32-medofa-manifest-20129.png"
        />
      </Head>

      {/* <LoadingBackdrop open={loading} /> */}

      <ProfileLayout title={t('wishList:wish_list_title')}>
        <div className="elevated cart__items mb-3">
          {gettingWishList ? (
            <div className="w-100 text-center">
              <Loading />
            </div>
          ) : dataWishList?.getWishList.length > 0 ? (
            dataWishList?.getWishList?.map((item, index) => (
              <WishListItem
                key={index}
                _id={item.id}
                image={item.image_512}
                price={item.old_price}
                list_price={item.list_price}
                sale_price={item.sale_price}
                productId={item.id}
                productName={item.name}
                slug={item.slug}
                discount_percentage={item.discount_percentage}
                product={item}
                isAvailable={item.is_available}
                onDelete={handleDelLikeProduct}
              />
            ))
          ) : (
            <div className="search-quick-order__no-products">{t(`wishList:no_data`)}</div>
          )}
          <Pagination
            count={Math.ceil(5 / 5)}
            page={page}
            siblingCount={4}
            onChange={(page) => {
              router.push({
                pathname: router.pathname,
                query: {
                  ...router.query,
                  page: page
                }
              });
            }}
          />
        </div>
      </ProfileLayout>
    </MainLayout>
  );
}

export default WishList;
