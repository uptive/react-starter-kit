import { SET_EMPLOYEE, SET_CAN_EDIT_EMPLOYEE, EDIT_EMPLOYEE, CANCEL_EDIT_EMPLOYEE } from '../constants';

export default function employee(state = {}, action) {
  switch (action.type) {
    case SET_EMPLOYEE:
      return {
        ...state,
        data: action.employee,
        isEditing: false,
      };
    case EDIT_EMPLOYEE:
      return {
        ...state,
        isEditing: true,
      };
    case CANCEL_EDIT_EMPLOYEE:
      return {
        ...state,
        isEditing: false,
      };
    case SET_CAN_EDIT_EMPLOYEE:
      if(!action.employee || !action.user){ return state; }
      var canEdit = false;
      if(action.employee.email === action.user.email){
        canEdit = true;
      }
      return {
        ...state,
        canEdit: canEdit,
      };
    default:
      return state;
  }
}
