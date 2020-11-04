import { combineReducers } from 'redux';
import storeSettings from './root/storeSettings';
import cart from './root/cart';

export default combineReducers({
  storeSettings,
  cart
});
