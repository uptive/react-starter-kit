import { SET_RECRUITS_SEARCH_RESULT } from '../constants';

export default function news(state = {}, action) {
  switch (action.type) {
    case SET_RECRUITS_SEARCH_RESULT:
      return {
        ...state,
        search_result: action.search_result
      };
    default:
      return state;
  }
}
