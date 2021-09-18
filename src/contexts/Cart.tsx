import { ServerError } from '@apollo/client';
import { useTranslation } from 'i18n';
import cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ADD_TO_CART, AddToCartData, AddToCartVars } from 'src/graphql/cart/addToCart';
import { DeleteCartVars } from 'src/graphql/cart/deleteCart.mutation';
import { DELETE_CARTS, DeleteCartsData, DeleteCartsVars } from 'src/graphql/cart/deleteCarts';
import { GET_CART, GetCartData } from 'src/graphql/cart/getCart';
import {
  GET_CART_BY_PRODUCT,
  GetCartByProductData,
  GetCartByProductVars
} from 'src/graphql/cart/getCartByProduct';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import useAsyncQuery, { AsyncQueryFunction } from 'src/hooks/useAsyncQuery';

import { useUser } from './User';

type Props = {
  children: React.ReactNode;
};

type ContextValue = {
  cart: GetCartData['getCart'];
  checkedCart: GetCartByProductData['getCartByProduct'];
  getCart: AsyncQueryFunction<GetCartData, undefined>;
  addToCart: (variables: AddToCartVars) => void;
  buyNow: ContextValue['addToCart'];
  deleteCart: (variables: DeleteCartVars) => void;
  deleteCarts: (variables: DeleteCartsVars) => void;
  checkedCartIDs: string[];
  setCheckedCartIDs: React.Dispatch<React.SetStateAction<string[]>>;
  checkCart: (id: string) => void;
  uncheckCart: (id: string) => void;
  loading: boolean;
};

const CartContext = createContext<ContextValue>(undefined);

const useCart = () => useContext(CartContext);

const CartProvider = (props: Props) => {
  const { t } = useTranslation(['errors']);

  const router = useRouter();

  const { data: user } = useUser();

  // Loading state, used for all cart related queries and mutations
  const [loading, setLoading] = useState(false);

  // Whole cart data
  const [cart, setCart] = useState<GetCartData['getCart']>();

  // Checked cart IDs
  const [checkedCartIDs, setCheckedCartIDs] = useState<string[]>([]);

  // Checked cart data
  const [checkedCart, setCheckedCart] = useState<GetCartByProductData['getCartByProduct']>();

  const [getCart] = useAsyncQuery<GetCartData, undefined>(GET_CART, {
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setCart(data.getCart);
    },
    onError: (error) => {
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

      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  const [getCartByProduct] = useAsyncQuery<GetCartByProductData, GetCartByProductVars>(
    GET_CART_BY_PRODUCT,
    {
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        setCheckedCart(data.getCartByProduct);
      },
      onError: (error) => {
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

        toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
      }
    }
  );

  // Mutation to add a product to cart
  const [addToCartMutation] = useMutationAuth<AddToCartData, AddToCartVars>(ADD_TO_CART, {
    onError: (error) => {
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
    }
  });

  // Mutation to delete many cart items
  const [deleteCartsMutation] = useMutationAuth<DeleteCartsData, DeleteCartsVars>(DELETE_CARTS);

  // Get cart on mount if token is available
  useEffect(() => {
    const token = cookies.get('token');

    if (!token) return;

    getCart().then((data) => {
      setCheckedCartIDs(data.getCart.carts.map((cart) => cart._id));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update checked cart data when checked carts change
  useEffect(() => {
    const token = cookies.get('token') || '';

    if (!token) return;

    getCartByProduct({
      variables: {
        ids: checkedCartIDs
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedCartIDs]);

  // Check a cart item
  const checkCart = (id: string) => {
    setCheckedCartIDs((checkboxCarts) => [...checkboxCarts, id]);
  };

  // Uncheck a cart item
  const uncheckCart = (id: string) => {
    setCheckedCartIDs((checkboxCarts) => checkboxCarts.filter((cart) => cart !== id));
  };

  // Add a product to cart
  const addToCart = (variables: AddToCartVars) => {
    setLoading(true);

    addToCartMutation({ variables })
      .then(getCart)
      .then(() => {
        toast.success(t(`success:update_cart`));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Buy a product now
  const buyNow: typeof addToCart = (variables: AddToCartVars) => {
    setLoading(true);

    addToCartMutation({ variables })
      .then(getCart)
      .then((data) => {
        const cartID = data.getCart.carts.find(
          (cart) => cart.productId === variables.productId
        )._id;
        setCheckedCartIDs([cartID]);
        toast.success(t(`success:update_cart`));
        router.push('/cart');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Delete a cart item
  const deleteCart = (variables: DeleteCartVars) => {
    setLoading(true);

    deleteCartsMutation({
      variables: {
        ids: [variables._id]
      }
    })
      .then(getCart)
      .then(() => {
        setCheckedCartIDs((checkboxCarts) =>
          checkboxCarts.filter((checkbox) => checkbox !== variables._id)
        );
        toast.success(t(`success:delete_cart`));
        setLoading(false);
      })
      .catch((error) => {
        toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
      });
  };

  // Delete many cart items
  const deleteCarts = (variables: DeleteCartsVars) => {
    setLoading(true);

    deleteCartsMutation({ variables })
      .then(getCart)
      .then(() => {
        toast.success(t(`cart:delete_checked_success`));
        setCheckedCartIDs([]);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
      });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        checkedCart,
        loading,
        getCart,
        addToCart,
        buyNow,
        deleteCart,
        checkedCartIDs,
        setCheckedCartIDs,
        deleteCarts,
        checkCart,
        uncheckCart
      }}>
      {props.children}
    </CartContext.Provider>
  );
};

export { CartProvider, useCart };
