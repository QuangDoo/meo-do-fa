import {
  ApolloError,
  ApolloQueryResult,
  QueryLazyOptions,
  ServerError,
  useApolloClient
} from '@apollo/client';
import { useTranslation } from 'i18n';
import cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ADD_TO_CART, AddToCartData, AddToCartVars } from 'src/graphql/cart/addToCart';
import { DELETE_CART, DeleteCartData, DeleteCartVars } from 'src/graphql/cart/deleteCart.mutation';
import { DELETE_CARTS, DeleteCartsData, DeleteCartsVars } from 'src/graphql/cart/deleteCarts';
import { GET_CART, GetCartData } from 'src/graphql/cart/getCart';
import {
  GET_CART_BY_PRODUCT,
  GetCartByProductData,
  GetCartByProductVars
} from 'src/graphql/cart/getCartByProduct';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';

import { useUser } from './User';

type Props = {
  children: React.ReactNode;
};

type ContextValue = {
  data: GetCartData['getCart'];
  checkedData: GetCartByProductData['getCartByProduct'];
  refetch: () => Promise<ApolloQueryResult<GetCartData>>;
  getCart: (options?: QueryLazyOptions<undefined>) => void;
  addToCart: (variables: AddToCartVars) => void;
  buyNow: ContextValue['addToCart'];
  deleteCart: (variables: DeleteCartVars) => void;
  deleteCarts: (variables: DeleteCartsVars) => void;
  checkboxCarts: string[];
  setCheckboxCarts: React.Dispatch<React.SetStateAction<string[]>>;
  checkCart: (id: string) => void;
  uncheckCart: (id: string) => void;
  loading: boolean;
};

const CartContext = createContext<ContextValue>(undefined);

const useCart = () => useContext(CartContext);

const CartProvider = (props: Props) => {
  const { t } = useTranslation(['errors']);

  const client = useApolloClient();

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const router = useRouter();

  const { data: user } = useUser();

  // Contains IDs of checked cart items
  const [checkedCarts, setCheckedCarts] = useState<string[]>([]);

  // Loading state, used for all cart related queries and mutations
  const [loading, setLoading] = useState(false);

  // Data of checked cart items
  const [checkedCartsData, setCheckedCartsData] =
    useState<GetCartByProductData['getCartByProduct']>();

  // Update checked cart data when checkedCarts changes
  useEffect(() => {
    const token = cookies.get('token') || '';

    if (!token) return;

    const getCartByProduct = async () => {
      try {
        const response = await client.query<GetCartByProductData, GetCartByProductVars>({
          query: GET_CART_BY_PRODUCT,
          variables: { ids: checkedCarts },
          context: {
            headers: {
              authorization: token
            }
          },
          fetchPolicy: 'no-cache'
        });

        setCheckedCartsData(response.data.getCartByProduct);
      } catch (error) {
        if ((error.networkError as ServerError).statusCode === 401) {
          cookies.remove('token');
          router.reload();
          router.push('/');
          return;
        }

        const errorCode = error.graphQLErrors?.[0]?.extensions?.code;

        if ([500, 107].includes(errorCode)) {
          cookies.remove('token');
          router.reload();
          router.push('/');
        }

        toastError(error);
      }
    };

    getCartByProduct();
  }, [checkedCarts]);

  // Check a cart item
  const checkCart = (id: string) => {
    setCheckedCarts((checkboxCarts) => [...checkboxCarts, id]);
  };

  // Uncheck a cart item
  const uncheckCart = (id: string) => {
    setCheckedCarts((checkboxCarts) => checkboxCarts.filter((cart) => cart !== id));
  };

  // Handle general error
  const toastError = (error: ApolloError) => {
    toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
  };

  // Whole cart data
  const [cartData, setCartData] = useState<GetCartData['getCart']>();

  // Get cart function, returns a promise
  const getCart = async () => {
    try {
      setLoading(true);

      const response = await client.query<GetCartData, undefined>({
        query: GET_CART,
        context: {
          headers: {
            authorization: cookies.get('token') || ''
          }
        },
        fetchPolicy: 'no-cache'
      });

      setCartData(response.data.getCart);

      setLoading(false);

      // Check all cart if this is the first time loading
      if (isFirstLoad) {
        setCheckedCarts(response.data.getCart?.carts.map((cart) => cart._id));

        setIsFirstLoad(false);
      }

      return Promise.resolve(response);
    } catch (error) {
      if ((error.networkError as ServerError).statusCode === 401) {
        cookies.remove('token');
        router.reload();
        router.push('/');
        return Promise.reject(error);
      }

      const errorCode = error.graphQLErrors?.[0]?.extensions?.code;

      if ([500, 107].includes(errorCode)) {
        cookies.remove('token');
        router.reload();
        router.push('/');
      }

      toastError(error);
      return Promise.reject(error);
    }
  };

  // Get cart on mount if token is in cookies
  useEffect(() => {
    const token = cookies.get('token');

    if (!token) return;

    getCart();
  }, []);

  // Mutation to add a product to cart
  const [addToCartMutation] = useMutationAuth<AddToCartData, AddToCartVars>(ADD_TO_CART);

  // Handle add to cart special errors
  const handleAddToCartError = (error: ApolloError) => {
    const errorCode = error.graphQLErrors?.[0]?.extensions?.code;

    getCart().then(() => {
      switch (errorCode) {
        case 121: {
          toast.error(
            t('errors:code_121', {
              name: error.graphQLErrors[0].message.replace(
                'Sales price changed. Please remove product on cart. Product: ',
                ''
              )
            })
          );
          break;
        }
        case 140: {
          toast.error(t('errors:code_140' + user.waiting ? '_waiting' : ''));
          break;
        }
        default: {
          toast.error(t(`errors:code_${errorCode}`));
        }
      }
    });
  };

  // Add a product to cart
  const addToCart = (variables: AddToCartVars) => {
    setLoading(true);

    addToCartMutation({ variables })
      .then(getCart)
      .then((data) => {
        setCheckedCarts((checkboxCarts) => [
          ...checkboxCarts,
          data.data.getCart.carts.find((product) => product.productId === variables.productId)._id
        ]);
        toast.success(t(`success:update_cart`));
      })
      .catch(handleAddToCartError);
  };

  // Buy a product now
  const buyNow: typeof addToCart = (variables: AddToCartVars) => {
    setLoading(true);

    addToCartMutation({ variables })
      .then(getCart)
      .then((cartData) => {
        setCheckedCarts([
          cartData.data.getCart.carts.find((cart) => cart.productId === variables.productId)._id
        ]);
        toast.success(t(`success:update_cart`));
        router.push('/cart');
      })
      .catch(handleAddToCartError);
  };

  // Mutation to delete a cart item
  const [deleteCartMutation] = useMutationAuth<DeleteCartData, DeleteCartVars>(DELETE_CART);

  // Delete a cart item
  const deleteCart = (variables: DeleteCartVars) => {
    setLoading(true);

    deleteCartMutation({ variables })
      .then(getCart)
      .then(() => {
        setCheckedCarts((checkboxCarts) =>
          checkboxCarts.filter((checkbox) => checkbox !== variables._id)
        );
        toast.success(t(`success:delete_cart`));
      })
      .catch(toastError);
  };

  // Mutation to delete many cart items
  const [deleteCartsMutation] = useMutationAuth<DeleteCartsData, DeleteCartsVars>(DELETE_CARTS);

  // Delete many cart items
  const deleteCarts = (variables: DeleteCartsVars) => {
    setLoading(true);

    deleteCartsMutation({ variables })
      .then(getCart)
      .then(() => {
        toast.success(t(`cart:delete_checked_success`));
        setCheckedCarts([]);
      })
      .catch(toastError);
  };

  return (
    <CartContext.Provider
      value={{
        data: cartData,
        checkedData: checkedCartsData,
        loading,
        refetch: getCart,
        getCart,
        addToCart,
        buyNow,
        deleteCart,
        checkboxCarts: checkedCarts,
        setCheckboxCarts: setCheckedCarts,
        deleteCarts,
        checkCart,
        uncheckCart
      }}>
      {props.children}
    </CartContext.Provider>
  );
};

export { CartProvider, useCart };
