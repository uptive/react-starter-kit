import { INITIATE_SERVICES_WITH_TOKEN } from '../constants';

export default function services(state = {}, action) {
  switch (action.type) {
    case INITIATE_SERVICES_WITH_TOKEN:
      return action.services;
    default:
      return state;
  }
}
