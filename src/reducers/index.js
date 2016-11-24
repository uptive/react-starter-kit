import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import news from './news';

export default combineReducers({
  user,
  runtime,
  news,
});
