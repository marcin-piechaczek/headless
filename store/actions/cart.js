import { initializeApollo } from '../../lib/apollo';
import CREATE_CART from '../../queries/cart/CreateCart.graphql';
import ADD_SIMPLE_PRODUCTS_TO_CART from '../../queries/cart/Add_Simple_Products_To_Cart.graphql';
import { storeTypes } from './storeSettings';

export const cartTypes = {
  CART_ADD_ITEM: 'CART/ADD_ITEM',
  CART_ADD_ITEMV2: 'CART/ADD_ITEMV2',
  STORE_SETTINGS_TOGGLE_CART: 'STORE/SETTINGS_TOGGLE_CART',

  CART_CREATE: 'CART/CREATE',
  CART_CREATE_SUCCESS: 'CART/CREATE_SUCCESS',
  CART_CREATE_FAILED: 'CART/CREATE_FAILED',

  CART_GRAND_TOTAL: 'CART/GRAND_TOTAL'
};

export const addItem = (action) => ({
  type: cartTypes.CART_ADD_ITEM,
  payload: action
});

export const toggleCart = (action) => ({
  type: cartTypes.STORE_SETTINGS_TOGGLE_CART,
  payload: action
});

export const grandTotal = (action) => ({
  type: cartTypes.CART_GRAND_TOTAL,
  payload: action
});

export function createCartAction() {
  return async (dispatch) => {
    dispatch({ type: cartTypes.CART_CREATE });
    const apolloClient = initializeApollo();

    const { error, data } = await apolloClient.mutate({
      mutation: CREATE_CART
    });

    if (error) {
      dispatch({ type: cartTypes.CART_CREATE_FAILED, data: error });
    }

    if (data) {
      const { createEmptyCart } = data;
      dispatch({ type: cartTypes.CART_CREATE_SUCCESS, data: createEmptyCart });
    }
  };
}

export function addSimpleProduct(cartId, sku) {
  return async (dispatch) => {
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.mutate({
      mutation: ADD_SIMPLE_PRODUCTS_TO_CART,
      variables: {
        cartId,
        sku,
        quantity: 1.0
      }
    });

    if (data) {
      dispatch({
        type: cartTypes.CART_ADD_ITEMV2,
        data
      });
    }
  };
}
