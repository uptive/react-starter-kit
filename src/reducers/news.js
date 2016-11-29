import { SET_NEWS, CREATE_NEWS, CANCEL_CREATE_NEWS } from '../constants';

export default function news(state = {}, action) {
  switch (action.type) {
    case SET_NEWS:
      return {
        data: action.data
      };
    case CREATE_NEWS:
      return {
        ...state,
        create: true
      };
    case CANCEL_CREATE_NEWS:
      return {
        ...state,
        create: false
      };
    default:
      return state;
  }
}
