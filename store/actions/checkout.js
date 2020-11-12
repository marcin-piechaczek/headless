export const checkoutTypes = {
  CHECKOUT_SHIPPING_INFORMATION: 'CHECKOUT/SHIPPING_INFORMATION_STEP_COMPLETED'
};

export const setShippingInformationStepCompletedAction = (action) => ({
  type: checkoutTypes.CHECKOUT_SHIPPING_INFORMATION,
  payload: action
});
