import { combineReducers } from 'redux';
import storeSettings from './root/storeSettings';
import cart from './root/cart';
import checkout from './checkout/checkout';

export default combineReducers({
  storeSettings,
  cart,
  checkout
});
