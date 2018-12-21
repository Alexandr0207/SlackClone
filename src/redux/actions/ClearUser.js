import * as actionTypes from './type';

export  const clearUser = () => ({
  type: actionTypes.CLEAR_USER,
  data: {
    currentUser: null,
    isLoading: false,
  }
})