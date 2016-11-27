/* eslint-disable import/prefer-default-export */

import { SET_EMPLOYEE } from '../constants';
import fetch from '../core/fetch';

export const setEmployee = (employee) => ({
  type: SET_EMPLOYEE,
  employee,
});

export const getEmployee = input => dispatch => {
  const options = {
    "headers":{"Authorization":"JWT " + input.token}
  };
  return fetch('https://uptiverse-employee.herokuapp.com/employees/' + input.id, options)
  .then(response => response.json())
  .then(function(json){
    dispatch(setEmployee(json))
  });
};

export const saveEmployee = input => dispatch => {
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        dispatch(setEmployee(JSON.parse(xmlhttp.response)));
      }
  };

  xmlhttp.open("POST", "https://uptiverse-employee.herokuapp.com/employees/save");
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.setRequestHeader("Authorization", "JWT " + input.token);
  xmlhttp.send(JSON.stringify(input.employee));
};
