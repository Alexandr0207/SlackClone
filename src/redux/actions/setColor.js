import * as actionTypes from './type';

const inititalColorsState = {
  primaryColor: "#4c3c4c",
  secondaryColor: "#eee"
}

export  const setColors = (primary, secondary) => ({
  type: actionTypes.SET_COLORS,
  data: {
    primary, 
    secondary,
  }
})