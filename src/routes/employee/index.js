import React from 'react';
import Employee from './Employee';
import fetch from '../../core/fetch';

export default {

  path: '/employee/:id',

  async action(context) {
      var employee = null;
      const options = {
        "headers":{"Authorization":"JWT " + context.store.getState().runtime.jwtToken}
      };
      await fetch('https://uptiverse-employee.herokuapp.com/employees/' + context.params.id, options)
      .then(function(response){
         return response.json();
      })
      .then(function(parsedData) {
        employee = parsedData;
        return;
      });

      if (!employee) throw new Error('Failed to load the employee.');

      return {
         title: 'Employee',
         component: <Employee employee={ employee } />,
       };
  },

};
