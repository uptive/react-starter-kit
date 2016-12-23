import { SET_RECRUITS_SEARCH_RESULT, SET_RECRUIT } from '../constants';

export default function news(state = {}, action) {
  switch (action.type) {
    case SET_RECRUITS_SEARCH_RESULT:
      return {
        ...state,
        search_result: action.search_result
      };
    case SET_RECRUIT:
      return {
        ...state,
        recruit: action.recruit
      };
    default:
      return state;
  }
}
