import React, { PropTypes } from 'react';
import Employees from './Employees';

export default {

  path: '/employees',

  async action(context) {
      return {
         title: 'Employees',
         component: <Employees />,
       };
  },
};
