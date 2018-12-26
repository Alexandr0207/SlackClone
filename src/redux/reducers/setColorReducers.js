import * as actionTypes from '../actions/type';

const setColors = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_COLORS:
    return{ 
      primary: action.data.primary,
      secondary: action.data.secondary,
    }
    default: 
    return state
}
}

export default setColors;