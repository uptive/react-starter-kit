import { SET_EMPLOYEE, EDIT_EMPLOYEE, SET_CAN_EDIT_EMPLOYEE, CANCEL_EDIT_EMPLOYEE } from '../constants';
import request from 'superagent';

export const setEmployee = (employee) => ({
  type: SET_EMPLOYEE,
  employee,
});

export const setCanEditEmployee = (input) => ({
  type: SET_CAN_EDIT_EMPLOYEE,
  employee: input.employee,
  user: input.user,
});

export const editEmployee = () => ({
  type: EDIT_EMPLOYEE,
});

export const cancelEditEmployee = (employee) => ({
  type: CANCEL_EDIT_EMPLOYEE,
  employee: employee,
});

export const getEmployee = input => dispatch => {
  var service = input.services.employees;
  request
  .get(service.url + "/" + input.id)
  .set('Authorization', "JWT " + service.token)
  .end(function(err, res){
    var data = JSON.parse(res.text);
    dispatch(setEmployee(data))
    dispatch(setCanEditEmployee({employee:data, user:input.user}))
  });
};

export const saveEmployee = input => dispatch => {
  var service = input.services.employees;
  request
  .post(service.url + "/save")
  .send(input.employee)
  .set('Authorization', "JWT " + service.token)
  .set('Content-Type', "application/json;charset=UTF-8")
  .end(function(err, res){
    var data = JSON.parse(res.text);
    dispatch(setEmployee(data));
  });
};
