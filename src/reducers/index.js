import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import news from './news';
import employee from './employee';
import recruits from './recruits';

export default combineReducers({
  user,
  runtime,
  news,
  employee,
  recruits,
});
