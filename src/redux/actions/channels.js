import * as actionTypes from './type';

export  const setCurrentChannel = channel => ({
  type: actionTypes.SET_CURRENT_CHANNEL,
  data: channel,
})