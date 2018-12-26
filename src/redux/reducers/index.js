import {combineReducers} from 'redux'
import user from './setUserReducer';
import channel from './channelReducer';
import setColor from './setColorReducers';

const rootReducer = combineReducers({
  user,
  channel,
  setColor,
})

export default rootReducer;