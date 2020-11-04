import styled, { keyframes } from 'styled-components';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { getCart } from '../../store/reducers/root/cart';
import { resolveImage } from '../../lib/resolve-image';
import { cartTypes } from '../../store/actions/cart';
import { useQuery } from '@apollo/client';
import CART_ID from '../../queries/cart/CartId.graphql';

/*
/ Przedmioty powinny zostać dodane do magento store na poziomie kliku w button "add to cart"
/ Inaczej trzeba ręcznie dodawać quantity oraz całkowitą wartość koszyka.
/ Ten komponent powinien pobierac dane z query koszyka podajac jego ID
 */
const Cart = () => {
  const dispatch = useDispatch();
  const { isCartOpen, items, totalGrand } = useSelector(getCart);
  const { data } = useQuery(CART_ID);

  return (
    <>
      {isCartOpen && (
        <CartWrapperStyled className="max-w-sm rounded overflow-hidden shadow-lg">
          {items.map((item, index) => (
            <CartItemStyled key={index}>
              <CartItemImageStyled>
                <Image src={resolveImage(item.thumbnail.url)} alt={item.thumbnail.label} unsized />
              </CartItemImageStyled>
              <CartItemQuantityStyled>{item.quantity}</CartItemQuantityStyled>
              <CartItemNameStyled>{item.name}</CartItemNameStyled>
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

export default Cart;

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
