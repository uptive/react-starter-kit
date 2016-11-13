import React, { PropTypes } from 'react';
import Employees from './Employees';
import fetch from '../../core/fetch';

export default {

  path: '/employees',

  async action(context) {
      var data = [];
      const options = {
        "headers":{"Authorization":"JWT " + context.store.getState().runtime.jwtToken}
      };
      //
      await fetch('https://uptiverse-employee.herokuapp.com/employees', options)
      .then(function(response){
         return response.json();
      })
      .then(function(parsedData) {
        data = parsedData;
        return;
      });

      if (!data) throw new Error('Failed to load the employee list.');
      return {
         title: 'Employees',
         component: <Employees employees={ data } />,
       };
  },
};
