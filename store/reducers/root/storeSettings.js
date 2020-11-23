import { storeTypes } from '../../actions/storeSettings';

const initialState = {
  activeLanguage: '',
  signInWrapperOpen: false,
  signInOpen: false,
  registerOpen: false,
  searchOpen: false,
  searchBlockResultItem: {state: false, value: ''},
  forgotPassOpen: false,
};

export default function storeSettings(state = initialState, action) {
  switch (action.type) {
    case storeTypes.STORE_SETTINGS_SET_LANGUAGE:
      return {
        ...state,
        activeLanguage: action.data.language
      };
    case storeTypes.STORE_SETTINGS_SIGN_IN_WRAPPER:
      return {
        ...state,
        signInWrapperOpen: action.payload.data.signInWrapper
      };
    case storeTypes.STORE_SETTINGS_SIGN_IN:
      return {
        ...state,
        signInOpen: action.payload.data.signIn
      };
    case storeTypes.STORE_SETTINGS_FORGOT_PASS:
      return {
        ...state,
        forgotPassOpen: action.payload.data.forgotPass
      };
    case storeTypes.STORE_SETTINGS_REGISTER:
      return {
        ...state,
        registerOpen: action.payload.data.register
      };
    case storeTypes.STORE_SEARCH:
      return {
        ...state,
        searchOpen: action.payload.data.search
      };
    case storeTypes.STORE_SEARCH_RESULT_ITEM:
      return {
        ...state,
        searchBlockResultItem: action.payload.data.search
      };
    default:
      return state;
  }
}

export const getStoreSettings = (state) => state.storeSettings;
