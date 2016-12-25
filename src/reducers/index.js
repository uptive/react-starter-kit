import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import news from './news';
import employee from './employee';
import employees from './employees';
import recruits from './recruits';

export default combineReducers({
  user,
  runtime,
  news,
  employee,
  employees,
  recruits,
});
