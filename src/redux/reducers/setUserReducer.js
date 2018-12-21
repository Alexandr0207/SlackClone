import * as actionTypes from '../actions/type';

const startState = {
  currentUser: null,
  isLoading: true,
}



const user = (state = startState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
    return {
      currentUser: action.data.currentUser,
      isLoading: false
    }
    default: 
    return state;
  }
}

export default user;