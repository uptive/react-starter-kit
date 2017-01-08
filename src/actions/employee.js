/* eslint-disable import/prefer-default-export */

import { SET_EMPLOYEE, EDIT_EMPLOYEE, SET_CAN_EDIT_EMPLOYEE, CANCEL_EDIT_EMPLOYEE } from '../constants';
import fetch from '../core/fetch';

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
  const options = {
    "headers":{"Authorization":"JWT " + service.token}
  };
  return fetch(service.url + "/" + input.id, options)
  .then(response => response.json())
  .then(function(json){
    dispatch(setEmployee(json))
    dispatch(setCanEditEmployee({employee:json, user:input.user}))
  });
};

export const saveEmployee = input => dispatch => {
  var service = input.services.employees;
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        dispatch(setEmployee(JSON.parse(xmlhttp.response)));
      }
  };

  xmlhttp.open("POST", service.url + "/save");
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.setRequestHeader("Authorization", "JWT " + service.token);
  xmlhttp.send(JSON.stringify(input.employee));
};
