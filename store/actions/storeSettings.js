export const storeTypes = {
  STORE_SETTINGS_SET_LANGUAGE: 'STORE/SETTINGS_SET_LANGUAGE'
};

export const setStoreLanguage = (action) => ({
  type: storeTypes.STORE_SETTINGS_SET_LANGUAGE,
  payload: action
});
