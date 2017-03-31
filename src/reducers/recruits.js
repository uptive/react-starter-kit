import { SET_RECRUITS_SEARCH_RESULT, SET_RECRUIT, CREATE_RECRUIT, CREATE_RECRUIT_CANCEL, CREATE_RECRUIT_DONE } from '../constants';

export default function news(state = {}, action) {
  switch (action.type) {
    case SET_RECRUITS_SEARCH_RESULT:
      return {
        ...state,
        search_result: action.search_result,
      };
    case SET_RECRUIT:
      return {
        ...state,
        recruit: action.recruit
      };
    case CREATE_RECRUIT:
      return {
        ...state,
        create: true
      };
    case CREATE_RECRUIT_DONE:
        return {
          ...state,
          create: false
        };
    case CREATE_RECRUIT_CANCEL:
      return {
        ...state,
        create: false
      };
    default:
      return state;
  }
}
