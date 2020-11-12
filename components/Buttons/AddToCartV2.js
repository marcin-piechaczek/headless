import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import useCreateCart from '../../hooks/useCreateCart';
import GET_CART_ID from '../../queries/cart/CartId.graphql';
import useAddSimplePorductsToCart from '../../hooks/addSimpleProductsToCart';

const AddToCartV2 = ({ product }) => {
  const { data, loading } = useQuery(GET_CART_ID);
  const cartId = data?.CartId;

  const addItemToCart = async () => {
    if (!cartId && !loading) {
      const { data: newCartId } = await useCreateCart();
      await useAddSimplePorductsToCart(newCartId, product.sku);
    }

    if (cartId) {
      await useAddSimplePorductsToCart(cartId, product.sku);
    }
  };
  return (
    <>
      <button
        onClick={addItemToCart}
        className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
        Add to Card v2
      </button>
    </>
  );
};

export default AddToCartV2;
