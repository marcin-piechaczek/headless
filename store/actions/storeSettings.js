export const storeTypes = {
  STORE_SETTINGS_SET_LANGUAGE: 'STORE/SETTINGS_SET_LANGUAGE',
  STORE_SETTINGS_SIGN_IN_WRAPPER: 'STORE/SETTINGS_SIGN_IN_WRAPPER',
  STORE_SETTINGS_SIGN_IN: 'STORE/SETTINGS_SIGN_IN',
  STORE_SETTINGS_REGISTER: 'STORE/SETTINGS_REGISTER',
  STORE_SEARCH: 'STORE/SEARCH_TOGGLE',
  STORE_SEARCH_RESULT_ITEM: 'STORE/SEARCH_RESULT_ITEM',
  STORE_SETTINGS_FORGOT_PASS: 'STORE/STORE_SETTINGS_FORGOT_PASS',
};

export const setStoreLanguage = (action) => ({
  type: storeTypes.STORE_SETTINGS_SET_LANGUAGE,
  payload: action
});

export const setSignInWrapper = (action) => ({
  type: storeTypes.STORE_SETTINGS_SIGN_IN_WRAPPER,
  payload: action
});

export const setSignIn = (action) => ({
  type: storeTypes.STORE_SETTINGS_SIGN_IN,
  payload: action
});

export const setForgotPass = (action) => ({
  type: storeTypes.STORE_SETTINGS_FORGOT_PASS,
  payload: action
});

export const setRegister = (action) => ({
  type: storeTypes.STORE_SETTINGS_REGISTER,
  payload: action
});

export const toggleSearchAction = (action) => ({
  type: storeTypes.STORE_SEARCH,
  payload: action
});

export const toggleSearchResultAction = (action) => ({
  type: storeTypes.STORE_SEARCH_RESULT_ITEM,
  payload: action
});
