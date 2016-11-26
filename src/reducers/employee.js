import { SET_EMPLOYEE } from '../constants';

export default function news(state = {}, action) {
  switch (action.type) {
    case SET_EMPLOYEE:
      return action.employee;
    default:
      return state;
  }
}
