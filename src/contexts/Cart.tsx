import { ApolloQueryResult, QueryLazyOptions, useLazyQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ADD_TO_CART, AddToCartData, AddToCartVars } from 'src/graphql/cart/addToCart';
import { DELETE_CART, DeleteCartData, DeleteCartVars } from 'src/graphql/cart/deleteCart.mutation';
import { GET_CART, GetCartData } from 'src/graphql/cart/getCart';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';

import { useCheckboxCarts } from './CheckboxCarts';
import { useUser } from './User';

type Props = {
  children: React.ReactNode;
};

type ContextValue = {
  data: GetCartData['getCart'];
  loading: boolean;
  refetch: () => Promise<ApolloQueryResult<GetCartData>>;
  getCart: (options?: QueryLazyOptions<undefined>) => void;
  addToCart: (variables: AddToCartVars) => void;
  buyNow: ContextValue['addToCart'];
  deleteCart: (variables: DeleteCartVars) => void;
};

const CartContext = createContext<ContextValue>(undefined);

const useCart = () => useContext(CartContext);

const CartProvider = (props: Props) => {
  const { t } = useTranslation(['errors']);

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const { setCheckboxCarts } = useCheckboxCarts();

  const router = useRouter();

  const { data: user } = useUser();

  // Lazy query to get cart
  const [fetch, { data, loading: gettingCart, refetch }] = useLazyQuery<GetCartData, undefined>(
    GET_CART,
    {
      fetchPolicy: 'network-only',
      onError: (error) => {
        const errorCode = error.graphQLErrors?.[0]?.extensions?.code;

        toast.error(t(`errors:code_${errorCode}`));
      },
      // Set all cart items to checked on first load
      onCompleted: () => {
        if (isFirstLoad) {
          setCheckboxCarts(data?.getCart?.carts.map((cart) => cart._id));
          setIsFirstLoad(false);
        }
      }
    }
  );

  const getCart = () => {
    fetch({
      context: {
        Headers: {
          authorization: cookies.get('token') || ''
        }
      }
    });
  };

  // Get cart on mount if has token in cookies
  useEffect(() => {
    const token = cookies.get('token');

    if (!token) return;

    getCart();
  }, []);

  // Mutation to add product to cart
  const [addToCartMutation, { loading: addingToCart }] = useMutationAuth<
    AddToCartData,
    AddToCartVars
  >(ADD_TO_CART, {
    onError: (err) => {
      const errorCode = err.graphQLErrors?.[0]?.extensions?.code;

      // Refetch cart, then toast error
      refetch().then(() => {
        switch (errorCode) {
          case 121: {
            toast.error(
              t('errors:code_121', {
                name: err.graphQLErrors[0].message.replace(
                  'Sales price changed. Please remove product on cart. Product: ',
                  ''
                )
              })
            );
            break;
          }
          case 140: {
            toast.error(t('errors:' + user.waiting ? 'code_140_waiting' : 'code_140'));
            break;
          }
          default: {
            toast.error(t(`errors:code_${errorCode}`));
          }
        }
      });
    }
  });

  // Mutation to delete cart item
  const [deleteCartMutation, { loading: deletingCart }] = useMutationAuth<
    DeleteCartData,
    DeleteCartVars
  >(DELETE_CART, {
    onCompleted: () => {
      refetch().then(() => {
        toast.success(t(`success:delete_cart`));
      });
    },
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  // Add product to cart
  const addToCart = (variables: AddToCartVars) => {
    addToCartMutation({ variables })
      .then(refetch)
      .then((data) => {
        setCheckboxCarts((checkboxCarts) => [
          ...checkboxCarts,
          data.data.getCart.carts.find((product) => product.productId === variables.productId)._id
        ]);
        toast.success(t(`success:update_cart`));
      });
  };

  // Buy product now
  const buyNow: typeof addToCart = (variables: AddToCartVars) => {
    addToCartMutation({ variables })
      .then(refetch)
      .then((cartData) => {
        setCheckboxCarts([
          cartData.data.getCart.carts.find((cart) => cart.productId === variables.productId)._id
        ]);
        toast.success(t(`success:update_cart`));
        router.push('/cart');
      });
  };

  // Delete cart item
  const deleteCart = (variables: DeleteCartVars) => {
    deleteCartMutation({ variables })
      .then(refetch)
      .then(() => {
        setCheckboxCarts((checkboxCarts) =>
          checkboxCarts.filter((checkbox) => checkbox !== variables._id)
        );
      });
  };

  return (
    <CartContext.Provider
      value={{
        data: data?.getCart,
        loading: gettingCart || addingToCart || deletingCart,
        refetch,
        getCart,
        addToCart,
        buyNow,
        deleteCart
      }}>
      {props.children}
    </CartContext.Provider>
  );
};

export { CartProvider, useCart };
