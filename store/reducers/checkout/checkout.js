import { checkoutTypes } from '../../actions/checkout';

const initialState = {
  stepShippingInformationCompleted: false
};

export default function checkout(state = initialState, action) {
  switch (action.type) {
    case checkoutTypes.CHECKOUT_SHIPPING_INFORMATION:
      return {
        ...state,
        stepShippingInformationCompleted: action.payload
      };
    default:
      return state;
  }
}

export const getCheckoutState = (state) => state.checkout;
