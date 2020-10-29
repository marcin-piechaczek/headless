import { storeTypes } from '../../actions/storeSettings';

const initialState = {
  activeLanguage: ''
};

export default function storeSettings(state = initialState, action) {
  switch (action.type) {
    case storeTypes.STORE_SETTINGS_SET_LANGUAGE:
      return {
        ...state,
        activeLanguage: action.data.language
      };
    default:
      return state;
  }
}

export const getStoreSettings = (state) => state.storeSettings;
