import React, { PropTypes } from 'react';
import Employees from './Employees';
import fetch from '../../core/fetch';

export default {

  path: '/employees',

  async action(context) {
      return {
         title: 'Employees',
         component: <Employees />,
       };
  },
};
