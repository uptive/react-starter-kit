/* eslint-disable import/prefer-default-export */

import { SET_EMPLOYEES } from '../constants';
import fetch from '../core/fetch';

export const setEmployees = (employees) => ({
  type: SET_EMPLOYEES,
  employees: employees,
});

export const getEmployees = input => dispatch => {
  const options = {
    "headers":{"Authorization":"JWT " + input.token}
  };
  return fetch('https://uptiverse-employee.herokuapp.com/employees', options)
  .then(response => response.json())
  .then(function(json){
    dispatch(setEmployees(json))
  });
};
