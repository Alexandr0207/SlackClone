import {combineReducers} from 'redux'
import user from './setUserReducer';
import channel from './channelReducer';

const rootReducer = combineReducers({
  user,
  channel,
})

export default rootReducer;