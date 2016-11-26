import React from 'react';
import Employee from './Employee';
import fetch from '../../core/fetch';

export default {

  path: '/employee/:id',

  async action(context) {
      return {
         title: 'Employee',
         component: <Employee id={ context.params.id } />,
       };
  },

};
