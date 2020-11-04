import ADD_SIMPLE_PRODUCTS_TO_CART from '../queries/cart/Add_Simple_Products_To_Cart.graphql';
import GET_CART_ITEMS from '../queries/cart/CartItems.graphql';
import { initializeApollo } from '../lib/apollo';

const useAddSimpleProductToCart = async (cartId, sku) => {
  const apolloClient = initializeApollo();

  if (cartId) {
    await apolloClient.mutate({
      mutation: ADD_SIMPLE_PRODUCTS_TO_CART,
      variables: {
        cartId,
        sku,
        quantity: 1.0
      },
      update: (cache, { data }) => {
        const updatedCart = data?.addSimpleProductsToCart.cart;
        const currentCart = cache.readQuery({
          query: GET_CART_ITEMS,
          variables: {
            cartId
          }
        });

        cache.writeQuery({
          query: GET_CART_ITEMS,
          data: {
            ...currentCart,
            updatedCart
          },
          variables: {
            cartId
          }
        });
      }
    });
  }
};

export default useAddSimpleProductToCart;
