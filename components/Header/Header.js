import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { resolveImage } from '../../lib/resolve-image';
import { getCart } from '../../store/reducers/root/cart';
import { cartTypes } from '../../store/actions/cart';
import GET_CART_ID from '../../queries/cart/CartId.graphql';
import GET_CART_ITEMS from '../../queries/cart/CartItems.graphql';
import Language from '../Language/Language';
import SignInWrapper from '../Signin/SignInWrapper';
import { getStoreSettings } from '../../store/reducers/root/storeSettings';
import {
  setSignIn,
  toggleSearchAction,
  toggleSearchResultAction,
  setSignInWrapper
} from '../../store/actions/storeSettings';
import Search from '../Search/Search';

const Header = ({ categoryList, store }) => {
  const dispatch = useDispatch();
  const { isCartOpen } = useSelector(getCart);
  const { signInWrapperOpen, signInOpen } = useSelector(getStoreSettings);
  const { data } = useQuery(GET_CART_ID);
  const cartId = data?.CartId;
  const { searchOpen } = useSelector(getStoreSettings);
  const { searchBlockResultItem } = useSelector(getStoreSettings);
  const router = useRouter();

  const toggleSearch = () => {
    dispatch(
      toggleSearchAction({
        data: {
          search: !searchOpen
        }
      })
    );

    dispatch(
      toggleSearchResultAction({
        data: {
          search: { state: false, value: '' }
        }
      })
    );
  };

  const { data: products } = useQuery(GET_CART_ITEMS, {
    variables: {
      cartId
    },
    skip: !cartId
  });

  const quantity = products?.cart.total_quantity;

  const logo = store?.header_logo_src
    ? resolveImage(`${store.base_media_url}logo/${store.header_logo_src}`)
    : '/static/logo.png';

  const toggleCart = () => {
    dispatch({
      type: cartTypes.STORE_SETTINGS_TOGGLE_CART,
      data: !isCartOpen
    });
  };

  const toggleSignInWrapper = () => {
    dispatch(
      setSignInWrapper({
        data: {
          signInWrapper: !signInWrapperOpen
        }
      })
    );
  };

  const toggleSignIn = () => {
    dispatch(
      setSignIn({
        data: {
          signIn: !signInOpen
        }
      })
    );
  };

  return (
    <>
      <header>
        <nav className="bg-gray-800">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
                  aria-label="Main menu"
                  aria-expanded="false">
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>

                  <svg
                    className="hidden h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0">
                  <Link href="/">
                    <a className="content-center">
                      <Image src={logo} alt={store?.logo_alt ?? 'Store'} width={40} height={40} />
                    </a>
                  </Link>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex">
                    {categoryList?.map((category) => (
                      <Link
                        key={category.id}
                        href={{
                          pathname: '_url-resolver',
                          query: {
                            pathname: `/${`${category.url_key}.html`}`,
                            type: 'CATEGORY'
                          }
                        }}
                        as={`${category.url_key}.html`}>
                        <a className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
                          {category.name}
                        </a>
                      </Link>
                    ))}
                    <Link locale={router.locale} href="reset-password">
                      <a className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
                        Reset password
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="content-center justify-items-center justify-center">
                  <button
                    onClick={toggleSearch}
                    className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon-icon-5Yc">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </button>
                  {/* <span className="text-gray-400">Search</span> */}
                </div>
                <button
                  onClick={toggleCart}
                  className="p-1 border-2 border-transparent text-gray-400 m-3 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                  aria-label="Notifications">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon-icon-5Yc">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  {quantity > 0 && <CartItemsStyled>{quantity}</CartItemsStyled>}
                </button>
                <Language />
                <div className="ml-3 relative">
                  <div>
                    <button
                      onClick={() => {
                        toggleSignIn();
                        toggleSignInWrapper();
                      }}
                      className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                      id="user-menu"
                      aria-label="User menu"
                      aria-haspopup="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon-icon-5Yc">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </button>
                  </div>
                  {/* <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"> */}
                  {/*  <div */}
                  {/*    className="py-1 rounded-md bg-white shadow-xs" */}
                  {/*    role="menu" */}
                  {/*    aria-orientation="vertical" */}
                  {/*    aria-labelledby="user-menu"> */}
                  {/*    <a */}
                  {/*      href="#" */}
                  {/*      className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" */}
                  {/*      role="menuitem"> */}
                  {/*      Your Profile */}
                  {/*    </a> */}
                  {/*    <a */}
                  {/*      href="#" */}
                  {/*      className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" */}
                  {/*      role="menuitem"> */}
                  {/*      Settings */}
                  {/*    </a> */}
                  {/*    <a */}
                  {/*      href="#" */}
                  {/*      className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" */}
                  {/*      role="menuitem"> */}
                  {/*      Sign out */}
                  {/*    </a> */}
                  {/*  </div> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:hidden">
            <div className="px-2 pt-2 pb-3">
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
                Dashboard
              </a>
              <a
                href="#"
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
                Team
              </a>
              <a
                href="#"
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
                Projects
              </a>
              <a
                href="#"
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
                Calendar
              </a>
            </div>
          </div>
        </nav>
      </header>

      {signInWrapperOpen ? <SignInWrapper /> : null}

      {searchOpen && <Search />}
    </>
  );
};

const CartItemsStyled = styled.span`
  position: absolute;
  font-size: 11px;
  background: white;
  border-radius: 50%;
  width: 17px;
  height: 17px;
  top: 5px;
  color: black;
  &:hover {
    color: black;
  }
`;

export default Header;
