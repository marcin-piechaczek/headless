const intialState = {
  init: ''
};

export default function exampleReducer(state = intialState, action) {
  switch (action.type) {
    case 'TEST':
      return {
        ...state
      };
    default:
      return state;
  }
}

export const getInitState = (state) => state;
