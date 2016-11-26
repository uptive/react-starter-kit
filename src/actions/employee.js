/* eslint-disable import/prefer-default-export */

import { SET_EMPLOYEE } from '../constants';
import fetch from '../core/fetch';

export const setEmployee = (employee) => ({
  type: SET_EMPLOYEE,
  employee,
})

export const getEmployee = input => dispatch => {
  const options = {
    "headers":{"Authorization":"JWT " + input.token}
  };

  return fetch('https://uptiverse-employee.herokuapp.com/employees/' + input.id, options)
  .then(response => response.json())
  .then(function(json){
    dispatch(setEmployee(json))
  });

}
