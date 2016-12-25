import { SET_EMPLOYEES } from '../constants';

export default function employee(state = {}, action) {
  switch (action.type) {
    case SET_EMPLOYEES:
      return {
        ...state,
        data: action.employees
      };
    default:
      return state;
  }
}
