import { cartTypes } from '../../actions/cart';

const initialState = {
  cartId: '',
  items: [],
  itemsV2: [],
  totalItems: [],
  isCartOpen: false,
  loading: false,
  error: [],
  grandTotal: {}
};

export default function cart(state = initialState, action) {
  switch (action.type) {
    case cartTypes.CART_ADD_ITEM:
      const productInCart = state.items.some((cartItem) => cartItem.id === action.data.id);

      if (productInCart) {
        const product = state.items.filter((item) => item.id === action.data.id);
        product[0].quantity += 1;
        return {
          ...state,
          items: [...state.items],
          totalItems: [...state.totalItems, action.data]
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.data,
            quantity: 1
          }
        ],
        totalItems: [...state.totalItems, action.data]
      };
    case cartTypes.CART_ADD_ITEMV2:
      return {
        ...state,
        itemsV2: action.data
      };
    case cartTypes.STORE_SETTINGS_TOGGLE_CART:
      return {
        ...state,
        isCartOpen: action.data
      };
    case cartTypes.CART_CREATE:
      return {
        ...state,
        loading: true
      };
    case cartTypes.CART_GRAND_TOTAL:
      return {
        ...state,
        grandTotal: action.payload
      };
    case cartTypes.CART_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        cartId: action.data
      };
    case cartTypes.CART_CREATE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.data.error
      };
    default:
      return state;
  }
}

export const getCart = (state) => state.cart;
