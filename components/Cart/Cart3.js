import { useQuery } from '@apollo/client';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import GET_CART_ID from '../../queries/cart/CartId.graphql';
import { getCart } from '../../store/reducers/root/cart';
import { resolveImage } from '../../lib/resolve-image';
import { cartTypes } from '../../store/actions/cart';
import GET_CART_ITEMS from '../../queries/cart/CartItems.graphql';

const Cart3 = () => {
  const { data } = useQuery(GET_CART_ID);
  const cartId = data?.CartId;

  const { data: products } = useQuery(GET_CART_ITEMS, {
    variables: {
      cartId
    }
  });

  const items = products?.cart.items;
  console.log('items', products);
  //
  // const dispatch = useDispatch();
  const { isCartOpen } = useSelector(getCart);

  return (
    <>
      {isCartOpen && (
        <CartWrapperStyled className="max-w-sm rounded overflow-hidden shadow-lg">
          {items &&
            items.map((item, index) => (
              <CartItemStyled key={index}>
                <CartItemImageStyled></CartItemImageStyled>
                <CartItemQuantityStyled>{item.quantity}</CartItemQuantityStyled>
                <CartItemNameStyled>{item.product.name}</CartItemNameStyled>
              </CartItemStyled>
            ))}
          <CheckoutButtonStyled>
            <Link href="/checkout">
              <a
                onClick={() =>
                  dispatch({
                    type: cartTypes.STORE_SETTINGS_TOGGLE_CART
                  })
                }>
                Checkout
              </a>
            </Link>
          </CheckoutButtonStyled>
        </CartWrapperStyled>
      )}
    </>
  );
};

export default Cart3;

const rotate = keyframes`
  from {
    top: 30px;
  }

  to {
    top: 74px;
  }
`;

const CartWrapperStyled = styled.div`
  display: flex;
  position: absolute;
  right: 10px;
  top: 74px;
  width: 360px;
  height: 475px;
  background: white;
  animation: ${rotate} 0.2s linear;
  flex-direction: column;
  overflow-y: scroll;
`;

const CartItemStyled = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
`;

const CartItemImageStyled = styled.div`
  max-width: 50px;
  height: auto;
`;
const CartItemNameStyled = styled.div`
  max-width: 100px;
`;
const CartItemQuantityStyled = styled.div``;

const CheckoutButtonStyled = styled.button``;
