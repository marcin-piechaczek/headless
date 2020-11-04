import { initializeApollo } from '../lib/apollo';
import CREATE_CART from '../queries/cart/CreateCart.graphql';
import GET_CART_ID from '../queries/cart/CartId.graphql';

const useCreateCart = async () => {
  const apolloClient = initializeApollo();

  const { data, loading } = await apolloClient.query({
    query: GET_CART_ID
  });

  if (!data.CartId && !loading) {
    await apolloClient.mutate({
      mutation: CREATE_CART,
      update: (cache, { data }) => {
        const cartId = data?.id;
        localStorage.setItem('cartId', cartId);
        cache.writeQuery({
          query: GET_CART_ID,
          data: { CartId: cartId }
        });
      }
    });
  }

  const cartId = data.CartId || localStorage.getItem('cartId');

  return {
    data: cartId,
    loading
  };
};

export default useCreateCart;
