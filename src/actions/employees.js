import { SET_EMPLOYEES } from '../constants';
import fetch from '../core/fetch';
import request from 'superagent';

export const setEmployees = (employees) => ({
  type: SET_EMPLOYEES,
  employees: employees,
});

export const getEmployees = input => dispatch => {
  var service = input.services.employees;
  request
  .get(service.url)
  .set('Authorization', "JWT " + service.token)
  .end(function(err, res){
    var data = JSON.parse(res.text);
    dispatch(setEmployees(data))
  });
};
