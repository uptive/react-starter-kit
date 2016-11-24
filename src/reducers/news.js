import { SET_NEWS } from '../constants';

export default function news(state = {}, action) {
  switch (action.type) {
    case SET_NEWS:
      return {
        data: action.data
      };
    default:
      return state;
  }
}
