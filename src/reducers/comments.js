import { SET_COMMENTS } from '../constants';

export default function comments(state = {}, action) {
  switch (action.type) {
    case SET_COMMENTS:
      return {
        ...state,
        [action.key]: action.comments
      };
    default:
      return state;
  }
}
