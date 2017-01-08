/* eslint-disable import/prefer-default-export */

import { SET_EMPLOYEES } from '../constants';
import fetch from '../core/fetch';

export const setEmployees = (employees) => ({
  type: SET_EMPLOYEES,
  employees: employees,
});

export const getEmployees = input => dispatch => {
  var service = input.services.employees;
  const options = {
    "headers":{"Authorization":"JWT " + service.token}
  };
  return fetch(service.url, options)
  .then(response => response.json())
  .then(function(json){
    dispatch(setEmployees(json))
  });
};
